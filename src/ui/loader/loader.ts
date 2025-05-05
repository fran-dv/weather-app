import { emptyMainDiv } from "@/ui";

export const setLoading = (state: boolean) => {
  const loader = document.getElementById("loader");

  if (loader) {
    if (state) {
      emptyMainDiv();
      loader.classList.add("flex");
      loader.classList.remove("hidden");
    } else {
      loader.classList.add("hidden");
      loader.classList.remove("flex");
    }
  }
};
