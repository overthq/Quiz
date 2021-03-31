const Wrapper = () => {
	return (
		<Formik
			initialValues={{
				nickname: '',
				stake: '',
				rounds: '',
				category: '',
				difficulty: ''
			}}
			onSubmit={handleSubmit}
		>
			{({ handleSubmit }) => (
				<>
					<FlatList
						keyExtractor={s => s.title}
						data={[]}
						renderItem={({ item }) => <View />}
					/>
					<Button onPress={handleSubmit}>Create game</Button>
				</>
			)}
		</Formik>
	);
};
