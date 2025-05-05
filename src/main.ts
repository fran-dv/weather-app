import "@/index.css";
import { addListenersToSearchBar, DataClick, Ids } from "@/ui";

const searchBar: HTMLDivElement | null = document.querySelector(
  `#${Ids.searchBar}`,
);
if (searchBar) {
  addListenersToSearchBar(searchBar);
} else {
  console.error(`Search bar not found. Tried with id ${Ids.searchBar}`);
}

// Click events delegation
type Target = HTMLElement | null;

const handleClick = (e: MouseEvent) => {
  if (e.target === null) {
    return;
  }

  const target: Target = (e.target as HTMLElement).closest("[data-click]");

  if (!target) {
    return;
  }

  switch (target.dataset.click) {
    case DataClick.toggleTempScale:
      break;
  }
};

const clickHandler = () => handleClick;

document.addEventListener("click", clickHandler);
