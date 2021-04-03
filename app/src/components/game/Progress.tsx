import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

const Progress = () => {
	const translateX = useAnimatedStyle(() => {});

	return (
		<View style={{ height: 10 }}>
			<Animated.View style={{ transform: [{ translateX }] }} />
		</View>
	);
};

export default Progress;
