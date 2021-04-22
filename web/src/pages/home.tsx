import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div>
			<h1>Welcome to Quiz!</h1>
			<Link to='/create-game'>Create game</Link>
			<Link to='/join-game'>Join game</Link>
		</div>
	);
};

export default Home;
