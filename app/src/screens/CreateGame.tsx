import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import ethers from 'ethers';
import Button from '../components/Button';
import { setupGame } from '../utils/game';

import Nickname from '../components/create-game/Nickname';
import Stake from '../components/create-game/Stake';
import Category from '../components/create-game/Category';
import Difficulty from '../components/create-game/Difficulty';
import Rounds from '../components/create-game/Rounds';

interface Values {
	nickname: string;
	stake: number;
	category?: number;
	difficulty: 'easy' | 'medium' | 'hard';
	rounds: number;
}

const slides = [
	{
		title: 'Choose a nickname',
		content: <Nickname />
	},
	{
		title: 'Set stake',
		content: <Stake />
	},
	{
		title: 'Choose category',
		content: <Category />
	},
	{
		title: 'Set difficulty',
		content: <Difficulty />
	},
	{
		title: 'Number of rounds',
		content: <Rounds />
	}
];

const { width } = Dimensions.get('window');

const CreateGame = () => {
	const [slideIndex, setSlideIndex] = React.useState(0);
	const [loading, setLoading] = React.useState(false);

	const { navigate } = useNavigation();
	const { accounts, sendTransaction } = useWalletConnect();

	const handleSubmit = async (values: Values) => {
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

		await sendTransaction({
			from: accounts[0],
			to: data.insert_games_one.contract,
			gas: 0,
			gasPrice: 0,
			value: ethers.utils.parseEther(stake.toString()).toString(),
			nonce: ''
		});

		// Listen for the result from the wallet, and update the UI accordingly

		setLoading(false);

		navigate('Lobby', {
			gameId: data.insert_games_one.id,
			role: 'creator'
		});
	};

	const handleViewableItemsChanged = React.useCallback(({ viewableItems }) => {
		viewableItems[0] && setSlideIndex(viewableItems[0].index);
	}, []);

	return (
		<View style={styles.container}>
			<Text>Create game</Text>
			<Text>
				This form will guide you through the process of creating a game
			</Text>
			<Formik
				initialValues={{
					nickname: '',
					stake: 0,
					rounds: 10,
					category: undefined,
					difficulty: 'easy'
				}}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit }) => (
					<>
						<FlatList
							horizontal
							keyExtractor={s => s.title}
							data={slides}
							renderItem={({ item }) => (
								<View>
									<Text>{item.title}</Text>
									{item.content}
								</View>
							)}
							viewabilityConfig={{ itemVisiblePercentThreshold: 90 }}
							onViewableItemsChanged={handleViewableItemsChanged}
							showsHorizontalScrollIndicator={false}
							pagingEnabled
							snapToInterval={width}
							snapToAlignment='center'
							decelerationRate='fast'
							scrollEventThrottle={16}
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
		flex: 1
	},
	slide: {
		width,
		paddingHorizontal: 16
	}
});

export default CreateGame;
