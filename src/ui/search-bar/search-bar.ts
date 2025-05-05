import { searchWeatherDataByLocation } from "@/core";

const handleKeydown = (e: KeyboardEvent, input: HTMLInputElement) => {
  if (e.code !== "Enter") {
    return;
  }
  searchWeatherDataByLocation(input.value);
};
const handleClick = (input: HTMLInputElement) => {
  searchWeatherDataByLocation(input.value);
};

type ElemWithListeners = HTMLDivElement & {
  _keyHandler: (e: KeyboardEvent) => void;
  _clickHandler: (e: MouseEvent) => void;
};

export const addListenersToSearchBar = (searchBar: HTMLDivElement) => {
  const input = searchBar.querySelector("input");
  const button = searchBar.querySelector("button");
  if (!input) {
    console.error("Input not found in the passed search bar div");
    return;
  }
  if (!button) {
    console.error("Button not found in the passed search bar div");
    return;
  }

  const keyHandler = (e: KeyboardEvent) => handleKeydown(e, input);
  const clickHandler = () => handleClick(input);

  input.addEventListener("keydown", keyHandler);
  button.addEventListener("click", clickHandler);

  // store handlers in the searchBar for remove them later
  (searchBar as ElemWithListeners)._keyHandler = keyHandler;
  (searchBar as ElemWithListeners)._clickHandler = clickHandler;
};

export const removeListenersFromSearchBar = (searchBar: HTMLDivElement) => {
  const input = searchBar.querySelector("input");
  const button = searchBar.querySelector("button");
  if (!input) {
    console.error("Input not found in the passed search bar div");
    return;
  }
  if (!button) {
    console.error("Button not found in the passed search bar div");
    return;
  }

  // remove the listeners stored in the searchBar
  const keyHandler = (searchBar as ElemWithListeners)._keyHandler;
  const clickHandler = (searchBar as ElemWithListeners)._clickHandler;

  input.removeEventListener("keydown", keyHandler);
  button.removeEventListener("click", clickHandler);
};
