import React from 'react';
import Link from 'next/link';

const Home = () => {
	return (
		<div>
			<h1>Welcome to Quiz!</h1>
			<Link href='/create-game'>Create game</Link>
			<Link href='/join-game'>Join game</Link>
		</div>
	);
};

export default Home;
