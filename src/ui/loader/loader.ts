import { emptyMainDiv } from "@/ui";

let loading: boolean;

export const setLoading = (state: boolean) => {
  loading = state;
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
