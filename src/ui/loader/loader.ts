let loading: boolean;

export const setLoading = (state: boolean) => {
  loading = state;
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = state ? "flex" : "none";
};
