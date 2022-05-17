import React, { Dispatch, useEffect } from "react";
import { AppContext } from "../AppContext";
import { Action, ACTION_TYPES } from "../appReducer";
import { REQ_STATE } from "../AppState";
import { BrowserStorage } from "../LocalStorageHelper";
import Loader from "./common/Loader";
import RepoList, { Repository } from "./RepoList";
function TrendingRepo() {
	const { state, dispatch } = React.useContext(AppContext);

	// Fetch repositories if not yet fetched or was failed earlier
	useEffect(() => {
		if (state.repositories.reqState === REQ_STATE.INITIAL) {
			fetchRepositories(state.selectedLanguage, dispatch);
		}
	}, [state.repositories.reqState, dispatch, state.selectedLanguage]);

	// Fetch repositories if language is changed and is not already failed/fetching
	useEffect(() => {
		if (
			state.repositories.language !== state.selectedLanguage &&
			![REQ_STATE.FETCHING, REQ_STATE.FAILED].includes(state.repositories.reqState)
		) {
			fetchRepositories(state.selectedLanguage, dispatch);
		}
	}, [state, dispatch]);

	return (
		<>
			{/* Show Loading while FETCHING */}
			{[REQ_STATE.INITIAL, REQ_STATE.FETCHING].includes(state.repositories.reqState) && <Loader />}

			{/* Render ERROR message if request is failed */}
			{REQ_STATE.FAILED === state.repositories.reqState && (
				<span>
					{state.repositories.data.length > 0
						? JSON.stringify(state.repositories.data[0])
						: "Something went wrong. Refresh the page to try again!"}
				</span>
			)}

			{/* if request is SUCCEEDED render the repo list */}
			{REQ_STATE.SUCCEEDED === state.repositories.reqState && (
				<RepoList data={state.repositories.data as Repository[]} />
			)}
		</>
	);
}
const twoDigit = (num: number): string => {
	if (num >= 10) {
		return num.toString();
	} else {
		return "0".concat(num.toString());
	}
};

const prepareURL = (selectedLanguage: string): string => {
	let date = new Date();
	let sevenDaysBefore = new Date(date.setDate(date.getDate() - 7));
	let filterDate = {
		year: sevenDaysBefore.getFullYear(),
		month: twoDigit(sevenDaysBefore.getMonth() + 1),
		date: twoDigit(sevenDaysBefore.getDate()),
	};

	const endpoint = `https://api.github.com/search/repositories?q=created:>${filterDate.year}-${filterDate.month}-${filterDate.date}+language:${selectedLanguage}&sort=stars&order=desc`;
	return endpoint;
};
const fetchRepositories = async (selectedLanguage: string, dispatch: Dispatch<Action>) => {
	dispatch({
		type: ACTION_TYPES.FETCH_LIST,
		payload: {
			reqState: REQ_STATE.FETCHING,
		},
	});

	let response = await fetch(prepareURL(selectedLanguage))
		.then((e) => e.json())
		.catch((err) => {
			dispatch({
				type: ACTION_TYPES.FETCH_LIST,
				payload: {
					reqState: REQ_STATE.FAILED,
					data: err,
				},
			});
		});

	if (!response) return;

	if (!response.items) {
		// Request Succeeded but items aren't received, most probably API rate limit exceeded
		dispatch({
			type: ACTION_TYPES.FETCH_LIST,
			payload: {
				reqState: REQ_STATE.FAILED,
				data: [response?.message] || [],
			},
		});
		return;
	}

	let usefulData: Repository[] = response.items.map((item: any): Repository => {
		return {
			id: item.id,
			name: item.full_name,
			description: item.description,
			url: item.html_url,
			language: item.language,
			userAvatar: item.owner.avatar_url,
			stars: item.stargazers_count,
			isFav: BrowserStorage.isFavorite(item.id),
		};
	});

	dispatch({
		type: ACTION_TYPES.FETCH_LIST,
		payload: {
			reqState: REQ_STATE.SUCCEEDED,
			language: selectedLanguage,
			data: usefulData,
		},
	});
};

export default TrendingRepo;
