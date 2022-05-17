import React, { useEffect } from "react";
import { AppContext } from "../AppContext";
import { ACTION_TYPES } from "../appReducer";
import { REQ_STATE } from "../AppState";
import { BrowserStorage } from "../LocalStorageHelper";
import Loader from "./common/Loader";
import RepoList, { Repository } from "./RepoList";

function TrendingRepo() {
	const { state, dispatch } = React.useContext(AppContext);

	const twoDigit = (num: number): string => {
		if (num >= 10) {
			return num.toString();
		} else {
			return "0".concat(num.toString());
		}
	};

	const prepareURL = (): string => {
		let date = new Date();
		let sevenDaysBefore = new Date(date.setDate(date.getDate() - 7));
		let filterDate = {
			year: sevenDaysBefore.getFullYear(),
			month: twoDigit(sevenDaysBefore.getMonth() + 1),
			date: twoDigit(sevenDaysBefore.getDate()),
		};

		const endpoint = `https://api.github.com/search/repositories?q=created:>${filterDate.year}-${filterDate.month}-${filterDate.date}+language:${state.language}&sort=stars&order=desc`;
		return endpoint;
	};

	const fetchRepositories = async () => {
		if (state.repositories.reqState === REQ_STATE.FETCHING) {
			return;
		}

		dispatch({
			type: ACTION_TYPES.FETCH_LIST,
			payload: {
				reqState: REQ_STATE.FETCHING,
			},
		});

		let response = await fetch(prepareURL())
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
				language: state.language,
				data: usefulData,
			},
		});
	};

	useEffect(() => {
		// Fetch repositories if not yet fetched or was failed earlier
		if ([REQ_STATE.INITIAL, REQ_STATE.FAILED].includes(state.repositories.reqState)) {
			fetchRepositories();
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (state.repositories.language !== state.language) {
			fetchRepositories();
		}
		// eslint-disable-next-line
	}, [state.language]);

	return (
		<>
			{/* Show Loading while FETCHING */}
			{[REQ_STATE.INITIAL, REQ_STATE.FETCHING].includes(state.repositories.reqState) ? <Loader /> : null}

			{/* Render ERROR message if request is failed */}
			{REQ_STATE.FAILED === state.repositories.reqState ? (
				<span>
					{state.repositories.data.length > 0
						? JSON.stringify(state.repositories.data[0])
						: "Something went wrong. Refresh the page to try again!"}
				</span>
			) : null}

			{/* if request is SUCCEEDED render the repo list */}
			{REQ_STATE.SUCCEEDED === state.repositories.reqState ? (
				<RepoList data={state.repositories.data as Repository[]} />
			) : null}
		</>
	);
}

export default TrendingRepo;
