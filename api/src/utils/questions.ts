import { promisify } from 'util';
import client from '../config/redis';

const getAsync = promisify(client.get).bind(client);

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

	const questionsCachedForm = data.results.map(
		(question: any, index: number) => [
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

		// Get and randomize the array of questions.

		return parsedQuestion;
	} catch (error) {
		console.log(error);
	}
};
