import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Game from './pages/game';
import CreateGame from './pages/create-game';
import Lobby from './pages/lobby';
import Home from './pages/home';
import { GameProvider } from './contexts/GameContext';

const App = () => {
	return (
		<GameProvider>
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
		</GameProvider>
	);
};

export default App;
