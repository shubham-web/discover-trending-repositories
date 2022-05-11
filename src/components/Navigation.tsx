import { Link } from "react-router-dom";
import styled from "styled-components";

import { Button, ButtonGroup, Chips, ChipsGroup } from "./common/styled";

const navLinks = [
	{
		label: "All",
		href: "/",
	},
	{
		label: "Favorites",
		href: "/favorites",
	},
];

const languages = [
	{
		label: "All",
		value: "",
	},
	{
		label: "JavaScript",
		value: "javascript",
	},
	{
		label: "HTML",
		value: "html",
	},
	{
		label: "CSS",
		value: "css",
	},
];
function Navigation() {
	return (
		<NavWrapper>
			{/* Navigation Buttons */}
			<ButtonGroup>
				{navLinks.map((link) => {
					return (
						<Link key={link.href} to={link.href}>
							<Button>{link.label}</Button>
						</Link>
					);
				})}
			</ButtonGroup>

			{/* Language Filter */}
			<ChipsGroup>
				{languages.map((lang) => {
					return <Chips key={lang.value}>{lang.label}</Chips>;
				})}
			</ChipsGroup>
		</NavWrapper>
	);
}

const NavWrapper = styled.nav`
	display: grid;
	grid-template-columns: 1fr auto;
	justify-content: space-around;
	padding: 1rem;
	gap: 1rem;
`;

export default Navigation;
