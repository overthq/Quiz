import React from 'react';
import { Formik, Form, Field } from 'formik';
import { toWei } from 'web3-utils';
import { fetchCategories } from '../utils/quizApi';
import { socket } from '../utils/socket';
import { useHistory } from 'react-router-dom';

const CreateGame = () => {
	const [categories, setCategories] = React.useState<
		{ id: number; name: string }[]
	>([]);
	const history = useHistory();

	React.useEffect(() => {
		(async () => {
			const fetchedCategories = await fetchCategories();
			setCategories(fetchedCategories);
		})();
	}, []);

	React.useEffect(() => {
		// Get gas price: https://gist.github.com/thrilok209/8b19dbd8d46b2805ab8bb8973611aea2
		socket.on('game-created', data => {
			(window as any).ethereum.sendAsync(
				{
					method: 'eth_sendTransaction',
					params: [
						{
							nonce: '0x00',
							gasPrice: '30000',
							gas: '21000',
							to: data.contract,
							from: (window as any).ethereum.selectedAddress,
							value: parseInt(data.stake).toString(16),
							chainId: 3
						}
					]
				},
				(error: Error) => {
					if (error) console.error(error);
					else {
						history.push(`/lobby/${data.gameId}`);
					}
				}
			);
		});
	}, [history]);

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
					const [account] = await (window as any).ethereum.enable();

					socket.emit('setup-game', {
						address: account,
						category,
						difficulty,
						nickname,
						rounds,
						stake: stakeInWei
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
