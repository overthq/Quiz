import fetch from 'node-fetch';
import { promisify } from 'util';
import client from '../config/redis';

const hgetAsync = promisify(client.hget).bind(client);
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

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
	const token = await getSessionToken();

	let apiUrl = `https://opentdb.com/api.php?token=${token}&type=multiple`;
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

	// Hopefully, this works.
	// If the token has expired, reset the token, and then re-run this function.
	// This might also mean I should look into handling the other response codes except 0 (1 through 3)
	if (data.response_code === 4) {
		await createSessionToken();
		return cacheQuestions({ gameId, category, difficulty, rounds });
	}

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
		const parsedQuestion = JSON.parse(question);

		return {
			question: parsedQuestion.question,
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

const createSessionToken = async () => {
	try {
		const response = await fetch(
			'https://opentdb.com/api_token.php?command=request',
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		);
		const { token } = await response.json();
		await setAsync('OPENTDB_TOKEN', token);
		return token;
	} catch (error) {
		console.log(error);
	}
};

const getSessionToken = async () => {
	try {
		let token = await getAsync('OPENTDB_TOKEN');
		if (!token) token = await createSessionToken();
		return token;
	} catch (error) {
		console.log(error);
	}
};
