import { promisify } from 'util';
import client from '../config/redis';

const getAsync = promisify(client.get).bind(client);

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

interface OTDQuestion {
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
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

	const questionsCachedForm = data.results.map(
		(question: OTDQuestion, index: number) => [
			`${gameId}-${index}`,
			JSON.stringify({
				question: question.question,
				correct: question.correct_answer,
				incorrect: question.incorrect_answers
			})
		]
	);

	client.mset(...questionsCachedForm, error => {
		if (error) console.log('Error when caching questions for quiz: ', gameId);
	});
};

interface GetQuestionOptions {
	gameId: string;
	round: number;
}

export const getQuestion = async ({ gameId, round }: GetQuestionOptions) => {
	try {
		const question = await getAsync(`${gameId}-${round}`);
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
		const question = await getAsync(`${gameId}-${round}`);
		const parsedQuestion = JSON.parse(question);

		return {
			isCorrect: parsedQuestion.correct === option,
			correctAnswer: parsedQuestion.correct
		};
	} catch (error) {
		console.log(error);
	}
};
