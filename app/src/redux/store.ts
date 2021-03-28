import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { createStore, applyMiddleware, combineReducers, Action } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import thunk, { ThunkAction } from 'redux-thunk';

import gameReducer from './game/reducer';

const rootReducer = combineReducers({
	game: persistReducer({ key: 'game', storage: AsyncStorage }, gameReducer)
});

const middleware = applyMiddleware(thunk);

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	null,
	Action<string>
>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const store = createStore(rootReducer, middleware);
export const persistor = persistStore(store);
