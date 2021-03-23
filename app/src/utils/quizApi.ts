export const fetchCategories = async () => {
	try {
		const response = await fetch('https://opentdb.com/api_category.php', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
