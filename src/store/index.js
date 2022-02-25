import { makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react";
import { getRandomPoem } from "../repository";
import { alphabeticalSort } from "../utils";

enableStaticRendering(typeof window === "undefined");

let store;

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  loading = false;
  setLoading = (val) => (this.loading = val);

  poemList = [];
  setPoemList = (val) => (this.poemList = val);

  selectedPoem = null;
  setSelectedPoem = (val) => (this.selectedPoem = val);

  favorites = [];
  setFavorites = (val) => (this.setFavorites = val);
  addToFavorites = (val) => this.favorites.push(val);
  removeFromFavorites = (val) => {
    const index = this.favorites.indexOf(val);
    if (index !== -1) {
      this.setFavorites(this.favorites.splice(index, 1));
    }
  };
  getFavorites = () => {
    return this.poemList.filter((poem) => this.favorites.includes(poem.title));
  };

  getPoems = async () => {
    this.setLoading(true);
    const result = await getRandomPoem(20);
    if (result.success) {
      const poems = alphabeticalSort(result.data, "title");
      this.setPoemList(poems);
    }
    this.setLoading(false);
  };

  sortValue = "title";
  setSortValue = (val) => (this.sortValue = val);

  handleSortChange = (event) => {
    this.setSortValue(event.target.value);
    const poems = alphabeticalSort(this.poemList, event.target.value);
    this.setPoemList(poems);
  };

  //store
}

export function initializeStore() {
  const _store = store ?? new Store();
  if (typeof window === "undefined") return _store;
  if (!store) store = _store;
  return _store;
}

export function useStore() {
  return initializeStore();
}
