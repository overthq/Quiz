import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue
} from 'react-native-reanimated';

interface ProgressProps {
	ended: boolean;
}

const { width } = Dimensions.get('window');

const Progress: React.FC<ProgressProps> = ({ ended }) => {
	const timeLeft = useSharedValue(10);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			if (timeLeft.value > 0 && !ended) {
				timeLeft.value -= 1;
			}
		}, 1000);

		return () => {
			clearTimeout(timeout);
		};
	});

	const barStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: timeLeft.value * (width - 32) }]
		};
	});

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.bar, barStyle]} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 4
	},
	bar: {
		height: '100%',
		width: '100%',
		borderRadius: 2,
		backgroundColor: '#000000'
	}
});

export default Progress;
