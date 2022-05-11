import React, { useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "../App";
import { ACTION_TYPES } from "../appReducer";

function RepoList() {
	return <ListWrapper>List is here</ListWrapper>;
}

const ListWrapper = styled.section`
	border: 1px solid green;
`;

export default RepoList;
