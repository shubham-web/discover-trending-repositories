import { Repository } from "./components/RepoList";

const KEY = "REPO_FAVORITES";

export class BrowserStorage {
	static isFavorite(repoId: number): boolean {
		let favorites = BrowserStorage.getFavorites();
		return !!favorites.find((innerItem) => innerItem.id === repoId);
	}

	static addFavorite(repo: Repository) {
		let existingList = BrowserStorage.getFavorites();
		repo.isFav = true;
		existingList.unshift(repo);
		BrowserStorage.setFavorites(existingList);
	}

	static removeFavorite(target: Repository) {
		let existingList = BrowserStorage.getFavorites();
		target.isFav = false;
		existingList = existingList.filter((repo) => {
			return repo.id !== target.id;
		});
		BrowserStorage.setFavorites(existingList);
	}

	static setFavorites(newValue: Repository[]) {
		localStorage.setItem(KEY, JSON.stringify(newValue));
	}

	static getFavorites(): Repository[] {
		let value = localStorage.getItem(KEY);
		if (!value) {
			BrowserStorage.setFavorites([]);
			return [];
		}
		return JSON.parse(value);
	}
}
