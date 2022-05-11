export enum LIST_TYPE {
	"ALL" = "ALL",
	"FAVORITES" = "FAVORITES",
}

export type State = {
	list: LIST_TYPE;
	language: null | string;
};

export const AppState: State = {
	list: LIST_TYPE.ALL,
	language: null,
};
