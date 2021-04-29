import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
	height: 100%;
	width: 100%;
	max-width: 600px;
	max-height: 800px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 16px;

	a {
		font-family: monospace;
		font-size: 22px;
		color: black;

		&:not(:last-child) {
			margin-right: 16px;
		}
	}
`;

const Home = () => (
	<HomeContainer>
		<h1>Welcome to Quiz!</h1>
		<div>
			<Link to='/create-game'>Create game</Link>
			<Link to='/join-game'>Join game</Link>
		</div>
	</HomeContainer>
);

export default Home;
