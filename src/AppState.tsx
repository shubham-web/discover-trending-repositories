import { Repository } from "./components/RepoList";

export enum LIST_TYPE {
	"ALL" = "/",
	"FAVORITES" = "/favorites",
}
export enum REQ_STATE {
	INITIAL = "INITIAL",
	FETCHING = "FETCHING",
	SUCCEEDED = "SUCCEEDED",
	FAILED = "FAILED",
}

export type SortType = "ascending" | "descending";
export type State = {
	list: LIST_TYPE;
	language: string;
	repositories: {
		reqState: REQ_STATE;
		language: string;
		data: string[] | Repository[];
	};
	sortBy: SortType;
};

export const AppState: State = {
	list: LIST_TYPE.ALL,
	language: "",
	sortBy: "ascending",
	repositories: {
		reqState: REQ_STATE.INITIAL,
		language: "",
		data: [],
	},
};
