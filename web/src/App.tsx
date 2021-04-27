import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Game from './pages/game';
import CreateGame from './pages/create-game';
import Lobby from './pages/lobby';
import Home from './pages/home';
import { GameProvider } from './contexts/GameContext';

const AppWrapper = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const App = () => (
	<GameProvider>
		<AppWrapper>
			<BrowserRouter>
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route exact path='/game'>
						<Game />
					</Route>
					<Route path='/create-game'>
						<CreateGame />
					</Route>
					<Route path='/lobby/:gameId'>
						<Lobby />
					</Route>
				</Switch>
			</BrowserRouter>
		</AppWrapper>
	</GameProvider>
);

export default App;
