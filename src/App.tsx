import React, { Dispatch, useReducer } from "react";
import "./App.css";
import { Action, ACTION_TYPES, reducer } from "./appReducer";
import { AppState, State } from "./AppState";
import { Container } from "./components/common/styled";
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import RepoList from "./components/RepoList";
import { Routes, Route } from "react-router-dom";
import FavoriteRepo from "./components/FavoriteRepo";
import TrendingRepo from "./components/TrendingRepo";

interface ContextProps {
	state: State;
	dispatch: Dispatch<Action>;
}

export const AppContext = React.createContext({} as ContextProps);

function App() {
	const [state, dispatch] = useReducer(reducer, AppState);

	return (
		<div className="app">
			<AppContext.Provider value={{ state, dispatch }}>
				<Hero />
				<Container>
					<Navigation />
					<Routes>
						<Route path="/" element={<TrendingRepo />} />
						<Route path="/favorites" element={<FavoriteRepo />} />
					</Routes>
				</Container>
			</AppContext.Provider>
		</div>
	);
}

export default App;
