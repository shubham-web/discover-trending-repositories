import { useReducer } from "react";
import "./App.css";
import { ACTION_TYPES, reducer } from "./appReducer";
import { AppState } from "./AppState";
import { Container } from "./components/common/styled";
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import { Route, Routes, useLocation } from "react-router-dom";
import FavoriteRepo from "./components/FavoriteRepo";
import TrendingRepo from "./components/TrendingRepo";
import { AppContext } from "./AppContext";

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
