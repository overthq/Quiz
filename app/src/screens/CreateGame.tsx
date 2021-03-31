import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import Button from '../components/Button';
import { setupGame } from '../utils/game';

const CreateGame = () => {
	const [loading, setLoading] = React.useState(false);

	const { navigate } = useNavigation();
	const { accounts, sendTransaction } = useWalletConnect();

	const handleSubmit = async (values: any) => {
		setLoading(true);
		const { nickname, stake, category, difficulty, rounds } = values;

		const data = await setupGame({
			nickname,
			address: accounts[0],
			stake,
			category,
			difficulty,
			rounds
		});

		// - Pay split to contract using WalletConnect
		// Convert split amount to ETH using ethers.toWei

		sendTransaction({
			from: accounts[0],
			to: data.insert_games_one.contract,
			gas: 0,
			gasPrice: 0,
			value: '',
			nonce: ''
		});

		setLoading(false);

		navigate('Lobby', {
			gameId: data.insert_games_one.id,
			role: 'creator'
		});
	};

	return (
		<View style={styles.container}>
			<Text>Create game</Text>
			<Text>
				This form will guide you through the process of creating a game
			</Text>
			<Formik
				initialValues={{
					nickname: '',
					stake: '',
					rounds: '',
					category: '',
					difficulty: ''
				}}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit }) => (
					<>
						<FlatList
							keyExtractor={s => s.title}
							data={[]}
							renderItem={({ item }) => <View />}
						/>
						<Button onPress={handleSubmit}>Create game</Button>
					</>
				)}
			</Formik>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16
	}
});

export default CreateGame;
