import React, { useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "../App";
import { ACTION_TYPES } from "../appReducer";

function FavoriteRepo() {
	const { state, dispatch } = React.useContext(AppContext);
	return <ListWrapper>favorite repo</ListWrapper>;
}

const ListWrapper = styled.section`
	border: 1px solid green;
`;

export default FavoriteRepo;
