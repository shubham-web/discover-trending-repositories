import styled from "styled-components";

type ButtonProps = {
	active?: boolean;
};
type ChipsProps = {
	active?: boolean;
};

export const ButtonGroup = styled.div`
	display: flex;
	gap: 1rem;
`;

export const Button = styled.button`
	border-radius: 0.8rem;
	font-size: 1.5rem;
	cursor: pointer;
	padding: 1rem 1.5rem;
	font-family: var(--font);
	font-weight: 400;
	border: ${(props: ButtonProps) => (props.active ? "none" : "1px solid #7868e6")};
	background-color: ${(props) => (props.active ? "#7868e6" : "transparent")};
	color: ${(props) => (props.active ? "white" : "#7868e6")};
`;

export const Container = styled.section`
	max-width: 80vw;
	border: 1px solid red;
	margin: 0 auto;
	@media (max-width: 768px) {
		max-width: 100vw;
	}
`;

export const ChipsGroup = styled.div`
	display: flex;
	gap: 1rem;
`;
export const Chips = styled.span`
	background: ${(props: ChipsProps) => (props.active ? "#7868e6" : "black")};
	color: white;
	align-self: center;
	padding: 0.8rem 1rem;
	border-radius: 2rem;
	cursor: pointer;
`;
