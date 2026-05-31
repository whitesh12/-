const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "";

const SCENT_SEARCH_API_URL =
  import.meta.env.VITE_SCENT_SEARCH_API_URL ||
  `${API_BASE_URL}/api/v1/scents/search`;

export async function searchScentTerms(keyword, signal) {

  const url = new URL(SCENT_SEARCH_API_URL, window.location.origin);

  url.searchParams.set("keyword", keyword);

  const response = await fetch(url, {
    method: "GET",
    signal
  });

  if (
    response.status === 400 ||
    response.status === 404
  ) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Scent search request failed");
  }

  const data = await response.json();

  return Array.isArray(data) ? data : [];
}
