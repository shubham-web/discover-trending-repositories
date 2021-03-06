import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../AppContext";
import { ACTION_TYPES } from "../appReducer";
import { LIST_TYPE } from "../AppState";

import { Button, ButtonGroup, Chip, ChipsGroup } from "./common/styled";

type lang = {
	label: string;
	value: string;
};

// Renders the navigation (as buttons for All/Favorites tab) + the filter by language
function Navigation() {
	const { state, dispatch } = React.useContext(AppContext);

	const changeLanguage = (lang: lang) => {
		dispatch({ type: ACTION_TYPES.CHANGE_LANGUAGE, payload: lang.value });
	};

	return (
		<NavWrapper data-testid="navigation-wrapper">
			{/* Navigation Buttons */}
			<ButtonGroup>
				{navLinks.map((link) => {
					return (
						<Link key={link.value} to={link.value}>
							<Button tabIndex={-1} active={state.list === link.value}>
								{link.label}
							</Button>
						</Link>
					);
				})}
			</ButtonGroup>

			{/* Language Filter */}
			{state.list === LIST_TYPE.FAVORITES ? null : (
				<fieldset>
					<legend>Language Filter</legend>
					<ChipsGroup>
						{languages.map((lang) => {
							return (
								<Chip
									onClick={() => changeLanguage(lang)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											changeLanguage(lang);
										}
									}}
									active={state.selectedLanguage === lang.value}
									key={lang.value}
								>
									{lang.label}
								</Chip>
							);
						})}
					</ChipsGroup>
				</fieldset>
			)}
		</NavWrapper>
	);
}

// Navigation Links and Language Filter Data
const navLinks = [
	{
		label: "All",
		value: LIST_TYPE.ALL,
	},
	{
		label: "Favorites",
		value: LIST_TYPE.FAVORITES,
	},
];

const languages: lang[] = [
	{
		label: "All",
		value: "",
	},
	{
		label: "HTML",
		value: "html",
	},
	{
		label: "JavaScript",
		value: "javascript",
	},
	{
		label: "CSS",
		value: "css",
	},
	{
		label: "Python",
		value: "python",
	},
];

// Styled Components
const NavWrapper = styled.nav`
	display: grid;
	grid-template-columns: 1fr auto;
	justify-content: space-around;
	align-items: center;
	padding: 1rem;
	gap: 1rem;

	& fieldset {
		border-radius: 1rem;
	}

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		justify-content: center;
	}
`;

export default Navigation;
