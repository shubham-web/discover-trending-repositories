import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { ACTION_TYPES } from "../appReducer";
import FavFill from "./../assets/images/fav-fill.png";
import FavHollow from "./../assets/images/fav-hollow.png";
import NewTabIcon from "./../assets/images/export.png";
import { BrowserStorage } from "../LocalStorageHelper";
import { AppContext } from "../AppContext";

export type Repository = {
	id: number;
	name: string;
	userAvatar: string;
	url: string;
	description: string;
	language: string;
	stars: number;
	isFav: boolean;
};

type ListData = {
	data: Repository[];
	isFavoritePage?: boolean;
};

// Renders the repository list based on the data provided in props
function RepoList(props: ListData) {
	const { dispatch } = useContext(AppContext);

	const toggleFavorite = (repo: Repository) => {
		if (repo.isFav) {
			BrowserStorage.removeFavorite(repo);
		} else {
			BrowserStorage.addFavorite(repo);
		}
		dispatch({ type: ACTION_TYPES.TOGGLE_FAVORITE, payload: { id: repo.id, isFav: repo.isFav } });
	};

	if (props.isFavoritePage && props.data.length === 0) {
		return <h1>There Are No Repositories Marked as Favorite</h1>;
	}

	return (
		<ListWrapper>
			{/* Loop over the data (repository list) provided */}
			{props.data.map((repository, index) => {
				return (
					<ItemWrapper key={repository.id} style={{ animationDelay: `${0.1 * index}s` }}>
						<TwoCols>
							<UserAvatar>
								<img src={repository.userAvatar} width={45} height={45} alt="Owner" />
							</UserAvatar>

							<MarkAsFavorite
								title={repository.isFav ? "Remove from Favorites" : "Mark as Favorite"}
								onClick={() => toggleFavorite(repository)}
							>
								<img
									src={repository.isFav ? FavFill : FavHollow}
									width={30}
									draggable={false}
									alt={repository.isFav ? "Remove from Favorites" : "Mark as Favorite"}
								/>
							</MarkAsFavorite>
						</TwoCols>

						<Name>
							{props.isFavoritePage ? null : <RankBadge>#{index + 1}</RankBadge>}
							<a target="_blank" rel="noreferrer" href={repository.url}>
								{limitChar(repository.name, 25)}
								<img src={NewTabIcon} width={18} alt="open in new tab" />
							</a>
						</Name>

						<p title={repository.description}>{limitChar(repository.description, 100)}</p>

						<Footer>
							{repository.language ? <span>{repository.language}</span> : null}

							<span> ⭐ {repository.stars} GitHub Stars</span>
						</Footer>
					</ItemWrapper>
				);
			})}
		</ListWrapper>
	);
}

const limitChar = (text: string, limit: number): string => {
	if (!text) {
		return "";
	}
	if (text.length <= limit) {
		return text;
	}
	return text.slice(0, limit).concat("...");
};

// Styled Components
const TwoCols = styled.div`
	display: grid;
	grid-template-columns: auto auto;
	justify-content: space-between;
	align-items: flex-start;
`;

const MarkAsFavorite = styled.div`
	cursor: pointer;
	padding: 5px;
`;

const zoomIn = keyframes`
    from{
        transform: scale(0.5);
        opacity: 0;
    }
    to{
        transform: scale(1);
        opacity: 1;
    }
`;

const Name = styled.h3`
	& a {
		text-decoration: none;
		color: black;
		transition: 0.3s;
	}
	& a:hover {
		color: #7868e6;
	}
	& img {
		display: none;
		margin-left: 0.5rem;
	}
`;

const ItemWrapper = styled.div`
	padding: 1rem;
	position: relative;
	box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
	background-color: white;
	border-radius: 1rem;
	animation: ${zoomIn} 0.3s ease forwards;
	transition: 0.3s;
	opacity: 0;
	transform: scale(0.5);
	&:hover {
		box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px,
			rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
		${Name} img {
			display: inline;
		}
	}
`;

const RankBadge = styled.span`
	margin-right: 5px;
	font-weight: normal;
`;

const UserAvatar = styled.div`
	& img {
		border-radius: 50%;
	}
`;

const ListWrapper = styled.section`
	margin: 1rem 0 5rem;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 2.5rem;
	@media (max-width: 1024px) {
		grid-template-columns: 1fr 1fr;
	}
	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		padding: 1rem;
	}
`;

const Footer = styled.div``;

export default RepoList;
