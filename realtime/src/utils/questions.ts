import { promisify } from 'util';
import client from '../config/redis';

const hgetAsync = promisify(client.hget).bind(client);

// Fisher-Yates (Knuth) Shuffle.
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array: string[]) => {
	let currentIndex = array.length;
	let temporaryValue: string;
	let randomIndex: number;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

interface CacheQuestionsOptions {
	gameId: string;
	category?: number;
	difficulty?: 'easy' | 'medium' | 'hard';
	rounds?: number;
}

export const cacheQuestions = async ({
	gameId,
	category,
	difficulty,
	rounds
}: CacheQuestionsOptions) => {
	let apiUrl = `https://opentdb.com/api.php?type=multiple`;
	apiUrl += `&amount=${rounds || 10}`;
	if (category) apiUrl += `&category=${category}`;
	if (difficulty) apiUrl += `&difficulty=${difficulty}`;

	const response = await fetch(apiUrl, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});

	const data = await response.json();
	const cacheInput = [];

	for (let i = 0; i < (rounds || 10); i++) {
		cacheInput.push((i + 1).toString());
		cacheInput.push(
			JSON.stringify({
				question: data.results[i].question,
				correct: data.results[i].correct_answer,
				incorrect: data.results[i].incorrect_answers
			})
		);
	}

	client.hset(gameId, ...cacheInput, (error: Error) => {
		if (error) console.log('Error when caching questions for quiz: ', gameId);
	});
};

interface GetQuestionOptions {
	gameId: string;
	round: number;
}

export const getQuestion = async ({ gameId, round }: GetQuestionOptions) => {
	try {
		const question = await hgetAsync(gameId, `${round}`);
		console.log(question);
		const parsedQuestion = JSON.parse(question);

		return {
			question: parsedQuestion,
			options: shuffle([parsedQuestion.correct, ...parsedQuestion.incorrect])
		};
	} catch (error) {
		console.log(error);
	}
};

export const checkAnswerCorrect = async ({ gameId, round, option }) => {
	try {
		const question = await hgetAsync(gameId, `${round}`);
		const parsedQuestion = JSON.parse(question);

		return {
			isCorrect: parsedQuestion.correct === option,
			correctAnswer: parsedQuestion.correct
		};
	} catch (error) {
		console.log(error);
	}
};
