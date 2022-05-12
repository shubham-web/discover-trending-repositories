import React, { Dispatch, useReducer } from "react";
import "./App.css";
import { Action, ACTION_TYPES, reducer } from "./appReducer";
import { AppState, State } from "./AppState";
import { Container } from "./components/common/styled";
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import { useLocation, useRoutes } from "react-router-dom";
import FavoriteRepo from "./components/FavoriteRepo";
import TrendingRepo from "./components/TrendingRepo";

interface ContextProps {
	state: State;
	dispatch: Dispatch<Action>;
}

export const AppContext = React.createContext({} as ContextProps);

function AppRoutes() {
	const routes = useRoutes([
		{ path: "/", element: <TrendingRepo /> },
		{ path: "/favorites", element: <FavoriteRepo /> },
	]);
	return routes;
}

function App() {
	const [state, dispatch] = useReducer(reducer, AppState);

	const location = useLocation();
	if (state.list !== location.pathname) {
		dispatch({ type: ACTION_TYPES.CHANGE_LIST, payload: location.pathname });
	}

	return (
		<div className="app">
			<AppContext.Provider value={{ state, dispatch }}>
				<Hero />

				<Container>
					<Navigation />
					<AppRoutes />
				</Container>
			</AppContext.Provider>
		</div>
	);
}

export default App;
