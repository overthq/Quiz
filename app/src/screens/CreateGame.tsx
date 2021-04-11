import React from 'react';
import {
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	View,
	LayoutAnimation,
	Platform,
	UIManager
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { Formik } from 'formik';
import web3 from 'web3';

import Button from '../components/Button';
import Category from '../components/create-game/Category';
import Difficulty from '../components/create-game/Difficulty';
import Nickname from '../components/create-game/Nickname';
import Rounds from '../components/create-game/Rounds';
import Stake from '../components/create-game/Stake';
import { setupGame } from '../utils/game';

interface Values {
	nickname: string;
	stake: string;
	category?: number;
	difficulty: 'easy' | 'medium' | 'hard';
	rounds: number;
}

const slides = [
	{
		title: 'Choose a nickname',
		description:
			'This will be your identifier, and can be seen by other players.',
		content: <Nickname />
	},
	{
		title: 'Set stake',
		description:
			'This amount (in ETH) will be contributed by every player, including yourself. It will be used to fund the prize fund for the winner.',
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

if (
	Platform.OS === 'android' &&
	UIManager.setLayoutAnimationEnabledExperimental
) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CreateGame = () => {
	const [slideIndex, setSlideIndex] = React.useState(0);
	const [loading, setLoading] = React.useState(false);

	const { navigate } = useNavigation();
	const { accounts, sendTransaction } = useWalletConnect();
	const listRef = React.useRef<FlatList>();

	const { isLastSlide } = React.useMemo(
		() => ({
			isLastSlide: slideIndex === slides.length - 1,
			isFirstSlide: slideIndex === 0
		}),
		[slideIndex, slides]
	);

	const handleNext = () => {
		if (listRef.current) {
			listRef.current.scrollToIndex({ index: slideIndex + 1, animated: true });
		}
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
	};

	const handleSubmit = async (values: Values) => {
		setLoading(true);

		const { nickname, stake, category, difficulty, rounds } = values;

		const stakeInWei = web3.utils.toWei(stake, 'ether');

		const data = await setupGame({
			address: accounts[0],
			category,
			difficulty,
			nickname,
			rounds,
			stake: Number(stakeInWei)
		});

		const result = await sendTransaction({
			from: accounts[0],
			to: data.contract,
			gas: 5000, // Don't hardcode this.
			gasPrice: web3.utils.toWei('40', 'gwei'), // Copy algo to generate optimal gasPrice
			value: stakeInWei
		});

		console.log(result);

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
			<Formik
				initialValues={{
					nickname: '',
					stake: '',
					rounds: 10,
					category: undefined,
					difficulty: 'easy'
				}}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit }) => (
					<>
						<FlatList
							ref={listRef}
							horizontal
							keyExtractor={s => s.title}
							data={slides}
							renderItem={({ item }) => (
								<View style={styles.slide}>
									<Text style={styles.slideHeader}>{item.title}</Text>
									<Text style={styles.slideDescription}>
										{item.description}
									</Text>
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
						<View style={styles.buttonContainer}>
							{isLastSlide ? (
								<Button onPress={handleSubmit} loading={loading}>
									Create game
								</Button>
							) : (
								<Button onPress={handleNext}>Next</Button>
							)}
						</View>
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
		backgroundColor: '#FFFFFF',
		width,
		paddingHorizontal: 16
	},
	slideHeader: {
		fontWeight: 'bold',
		fontSize: 32,
		color: '#000000',
		marginVertical: 8
	},
	slideDescription: {
		fontSize: 16,
		marginBottom: 8
	},
	buttonContainer: {
		marginBottom: 16,
		paddingHorizontal: 16,
		width: '100%'
	}
});

export default CreateGame;
