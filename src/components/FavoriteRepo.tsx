import { BrowserStorage } from "../LocalStorageHelper";
import RepoList, { Repository } from "./RepoList";

// Renders the Repository list marked as favorite from localStorage

function FavoriteRepo() {
	const data = BrowserStorage.getFavorites();
	return <RepoList isFavoritePage={true} data={data as Repository[]} />;
}

export default FavoriteRepo;
