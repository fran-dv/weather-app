import { Ids } from "@/ui";

export const emptyMainDiv = () => {
  const mainDiv = document.querySelector(`#${Ids.mainContainer}`);
  if (!mainDiv) {
    console.error(`Main div with id "${Ids.mainContainer}" not found`);
    return;
  }

  while (mainDiv.firstChild) {
    mainDiv.firstChild.remove();
  }
};
