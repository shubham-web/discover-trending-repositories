import { BrowserStorage } from "../LocalStorageHelper";
import RepoList, { Repository } from "./RepoList";

// Renders the Repository list marked as favorite from localStorage

function FavoriteRepo() {
	const data = BrowserStorage.getFavorites();
	return (
		<section>
			<RepoList isFavoritePage={true} data={data as Repository[]} />
		</section>
	);
}

export default FavoriteRepo;
