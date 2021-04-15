import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFormikContext } from 'formik';
import { fetchCategories } from '../../utils/quizApi';

interface CategoryType {
	id: number;
	name: string;
}

const Category = () => {
	const [categories, setCategories] = React.useState<CategoryType[]>([]);
	const { values, setFieldValue } = useFormikContext<{ category: number }>();

	React.useEffect(() => {
		(async () => {
			const fetchedCategories = await fetchCategories();
			setCategories(fetchedCategories);
		})();
	}, []);

	const handleSelect = (id: number) => {
		setFieldValue('category', id);
	};

	return (
		<View style={styles.container}>
			<Picker
				selectedValue={values.category}
				onValueChange={value => handleSelect(value)}
			>
				{categories.map(({ id, name }) => (
					<Picker.Item key={id} label={name} value={id} />
				))}
			</Picker>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default Category;
