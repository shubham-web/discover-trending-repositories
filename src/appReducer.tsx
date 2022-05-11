import { State } from "./AppState";

export enum ACTION_TYPES {
	CHANGE_LANGUAGE = "CHANGE_LANGUAGE",
}

export type Action = {
	type: ACTION_TYPES;
	payload: any;
};

export function reducer(state: State, action: Action) {
	switch (action.type) {
		case ACTION_TYPES.CHANGE_LANGUAGE:
			return state;
		default:
			return state;
	}
}
