import React from 'react';
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	ActivityIndicator
} from 'react-native';

interface ButtonProps {
	onPress(): void;
	loading?: false;
}

const Button: React.FC<ButtonProps> = ({ children, onPress, loading }) => (
	<TouchableOpacity
		onPress={onPress}
		style={styles.container}
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
		backgroundColor: '#FFFFFF'
	},
	loader: {
		position: 'absolute',
		right: 16
	}
});

export default Button;
