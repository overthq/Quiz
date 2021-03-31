export const fetchCategories = async () => {
	try {
		const response = await fetch('https://opentdb.com/api_category.php', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});
		const { trivia_categories } = await response.json();
		return trivia_categories;
	} catch (error) {
		console.log(error);
	}
};
