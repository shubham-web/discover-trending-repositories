import { createContext, Dispatch } from "react";
import { Action } from "./appReducer";
import { State } from "./AppState";

interface ContextProps {
	state: State;
	dispatch: Dispatch<Action>;
}

export const AppContext = createContext({} as ContextProps);
