import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { toWei } from 'web3-utils';
import { fetchCategories } from '../utils/quizApi';
import { socket } from '../utils/socket';
import { useHistory } from 'react-router-dom';

const VerticalForm = styled(Form)`
	display: flex;
	flex-direction: column;

	input,
	select {
		margin: 4px 0;
		height: 40px;
		padding-left: 4px;
		font-size: 16px;
	}

	button {
		height: 40px;
		background-color: #000000;
		color: #ffffff;
		border-radius: 6px;
	}
`;

const CreateGame = () => {
	const [loading, setLoading] = React.useState(true);
	const [categories, setCategories] = React.useState<
		{ id: number; name: string }[]
	>([]);
	const history = useHistory();

	React.useEffect(() => {
		(async () => {
			const fetchedCategories = await fetchCategories();
			setCategories(fetchedCategories);
			setLoading(false);
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
			{loading ? (
				<p>Loading...</p>
			) : (
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
						<VerticalForm>
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
						</VerticalForm>
					)}
				</Formik>
			)}
		</div>
	);
};

export default CreateGame;
