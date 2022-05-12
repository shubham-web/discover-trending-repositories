import { State } from "./AppState";
import { Repository } from "./components/RepoList";

export enum ACTION_TYPES {
	CHANGE_LANGUAGE = "CHANGE_LANGUAGE",
	CHANGE_LIST = "CHANGE_LIST",
	FETCH_LIST = "FETCH_LIST",
	TOGGLE_FAVORITE = "TOGGLE_FAVORITE",
}

export type Action = {
	type: ACTION_TYPES;
	payload: any;
};

export function reducer(state: State, action: Action): State {
	switch (action.type) {
		case ACTION_TYPES.CHANGE_LANGUAGE:
			return {
				...state,
				language: action.payload,
			};
		case ACTION_TYPES.CHANGE_LIST:
			return {
				...state,
				list: action.payload,
			};
		case ACTION_TYPES.FETCH_LIST:
			return {
				...state,
				repositories: {
					...state.repositories,
					...action.payload,
				},
			};
		case ACTION_TYPES.TOGGLE_FAVORITE:
			return {
				...state,
				repositories: {
					...state.repositories,
					data: [
						...((state.repositories.data as Repository[]).map((repo: Repository) => {
							if (action.payload.id === repo.id) {
								return {
									...repo,
									isFav: action.payload.isFav,
								};
							}
							return repo;
						}) as []),
					],
				},
			};
		default:
			return state;
	}
}
