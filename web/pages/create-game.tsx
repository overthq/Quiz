import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';
import { toWei } from 'web3-utils';
import { setupGame } from '../utils/game';
import { fetchCategories } from '../utils/quizApi';

let ethereum: any;
let web3: any;

const CreateGame = () => {
	const [categories, setCategories] = React.useState<
		{ id: number; name: string }[]
	>([]);
	const router = useRouter();

	React.useEffect(() => {
		(async () => {
			const fetchedCategories = await fetchCategories();
			setCategories(fetchedCategories);
		})();
	}, []);

	return (
		<div>
			<Formik
				initialValues={{
					nickname: '',
					stake: '',
					category: undefined,
					rounds: '',
					difficulty: 'easy' as 'easy' | 'medium' | 'hard'
				}}
				onSubmit={async values => {
					const { nickname, stake, category, rounds, difficulty } = values;
					const stakeInWei = toWei(stake, 'ether');

					const [account] = await ethereum.enable();

					const data = await setupGame({
						address: account,
						category: Number(category),
						difficulty,
						nickname,
						rounds: Number(rounds),
						stake: stakeInWei
					});

					await ethereum.sendAsync(
						{
							method: 'eth_sendTransaction',
							params: [
								{
									nonce: '0x00',
									gasPrice: '0x09184e72a000',
									gas: '0x2710',
									to: data.contract,
									from: ethereum.selectedAddress,
									value: stake,
									chainId: 3
								}
							],
							from: account
						},
						(error, result) => {
							if (error) console.error(error);
							else console.log(result);
						}
					);

					router.push({
						pathname: '/lobby',
						query: { gameId: data.insert_games_one.id }
					});
				}}
			>
				{({ setFieldValue }) => (
					<Form>
						<label htmlFor='nickname'>Nickname</label>
						<Field name='nickname' placeholder='Your nickname' />

						<label htmlFor='stake'>Stake</label>
						<Field name='stake' placeholder='Stake (in ETH)' />

						<label htmlFor='category'>Category</label>
						<select
							name='category'
							onChange={event => {
								setFieldValue('category', event.target.value);
							}}
						>
							{categories.map(category => (
								<option key={category.id.toString()} value={category.id}>
									{category.name}
								</option>
							))}
						</select>

						<label htmlFor='difficulty'>Difficulty</label>
						<select
							name='difficulty'
							onChange={event => {
								setFieldValue('difficulty', event.target.value);
							}}
						>
							<option value='easy'>Easy</option>
							<option value='medium'>Medium</option>
							<option value='hard'>Hard</option>
						</select>
						<button type='submit'>Create Game</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default CreateGame;
