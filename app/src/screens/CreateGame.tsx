import { useNavigation } from '@react-navigation/native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import ethers from 'ethers';
import { Formik } from 'formik';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import Category from '../components/create-game/Category';
import Difficulty from '../components/create-game/Difficulty';
import Nickname from '../components/create-game/Nickname';
import Rounds from '../components/create-game/Rounds';
import Stake from '../components/create-game/Stake';
import { setupGame } from '../utils/game';

type Values = {
	readonly nickname: string;
	readonly stake: number;
	readonly category?: number;
	readonly difficulty: 'easy' | 'medium' | 'hard';
	readonly rounds: number;
};

const slides = [
	{
		title: 'Choose a nickname',
		description: 'This will be your identifier, and can be seen by other players.',
		content: <Nickname />
	},
	{
		title: 'Set stake',
		description: 'This amount (in ETH) will be contributed by every player, including yourself. It will be used to fund the prize fund for the winner.',
		content: <Stake />
	},
	{
		title: 'Choose category',
		description: 'Select a category to limit questions to a certain genre.',
		content: <Category />
	},
	{
		title: 'Set difficulty',
		description: 'Choose a difficulty for the quiz questions',
		content: <Difficulty />
	},
	{
		title: 'Number of rounds',
		description: 'Select the number of rounds you would like the game to last',
		content: <Rounds />
	}
];

const { width } = Dimensions.get('window');

const CreateGame = () => {
	const [slideIndex, setSlideIndex] = React.useState(0);
	const [loading, setLoading] = React.useState(false);

	const { navigate } = useNavigation();
	const { accounts, sendTransaction } = useWalletConnect();

	const { isLastSlide, isFirstSlide } = React.useMemo(() => ({
		isLastSlide: slideIndex === slides.length - 1,
		isFirstSlide: slideIndex === 0
	}), [slideIndex, slides]);

	const handleSubmit = async (values: Values) => {
		setLoading(true);
		const { nickname, stake, category, difficulty, rounds } = values;

		const data = await setupGame({
			address: accounts[0],
			category,
			difficulty,
			nickname,
			rounds,
			stake
		});

		// Pay split to contract using WalletConnect
		// Should I copy over the ABI fron the server to the client?
		// How do I call a contract function using WalletConnect's sendTransaction API?

		await sendTransaction({
			from: accounts[0],
			gas: 0,
			gasPrice: 0,
			nonce: '',
			to: data.insert_games_one.contract,
			value: ethers.utils.parseEther(stake.toString()).toString()
		});

		// Listen for the result from the wallet, and update the UI accordingly.

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
								<View style={styles.slide}>
									<Text style={styles.slideHeader}>{item.title}</Text>
									<Text style={styles.slideDescription}>{item.description}</Text>
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
	},
	slideHeader: {
		fontWeight: 'bold',
		fontSize: 32
	},
	slideDescription: {
		fontSize: 16
	}
});

export default CreateGame;
