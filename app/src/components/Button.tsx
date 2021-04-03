import React from 'react';
import {
	ActivityIndicator,
	StyleProp,
	StyleSheet,
	Text,
	TouchableOpacity,
	ViewStyle
} from 'react-native';

interface ButtonProps {
	onPress(): void;
	loading?: boolean;
	style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({
	children,
	onPress,
	loading,
	style
}) => (
	<TouchableOpacity
		onPress={onPress}
		style={[styles.container, style]}
		disabled={loading}
	>
		<Text style={styles.text}>{children}</Text>
		{loading && <ActivityIndicator style={styles.loader} />}
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 40,
		borderRadius: 6,
		backgroundColor: '#000000',
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		fontSize: 17,
		fontWeight: '500',
		color: '#FFFFFF'
	},
	loader: {
		position: 'absolute',
		right: 16
	}
});

export default Button;
