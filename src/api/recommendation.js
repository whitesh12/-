const DEFAULT_RECOMMENDATION = {
  brand: "Maison Margiela",
  name: "REPLICA\nLazy Sunday Morning",
  summary: "막 세탁한 침구처럼 깨끗하고 포근한 향",
  description:
    "막 세탁한 흰 셔츠처럼 깨끗하게 시작하고, 시간이 지나면 포근한 머스크 잔향이 남는 향.",
  reason:
    "깨끗하고 은은한 향을 선호하고 강한 단 향을 피하는 사용자에게 잘 맞음.",
  tags: ["#Top: Aldehydes", "#Middle: Iris", "#Base: Musk"],
  purchaseLink: "",
  isFallback: true
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "" : "https://toy-4-be.onrender.com");

const RECOMMEND_API_URL =
  import.meta.env.VITE_RECOMMEND_API_URL ||
  `${API_BASE_URL}/api/perfumes/recommend`;

function normalizeText(value, fallback) {

  return (value || fallback)
    .replace(/\s*\n\s*/g, " ")
    .trim();
}

function normalizeNote(value) {

  return String(value || "")
    .split("/")
    .map((note) => note.trim())
    .filter(Boolean)[0];
}

function normalizeRecommendation(data) {

  const source =
    data?.data ||
    data?.recommendation ||
    data?.result ||
    data ||
    {};
  const notes = source.notes || {};
  const noteTags = Array.isArray(notes)
    ? notes
    : [
      notes.top && `#Top: ${normalizeNote(notes.top)}`,
      notes.middle && `#Middle: ${normalizeNote(notes.middle)}`,
      notes.base && `#Base: ${normalizeNote(notes.base)}`
    ].filter(Boolean);
  const scentTags = Array.isArray(source.scentTags)
    ? source.scentTags
    : [];
  const rawTags =
    source.tags ||
    (noteTags.length > 0 ? noteTags : scentTags);
  const tags = Array.isArray(rawTags)
    ? rawTags
    : rawTags
      ? [rawTags]
      : [];

  return {
    brand:
      source.brand ||
      source.perfumeBrand ||
      source.brandName ||
      DEFAULT_RECOMMENDATION.brand,
    name: normalizeText(
      source.name ||
      source.perfumeName ||
      source.title,
      DEFAULT_RECOMMENDATION.name
    ),
    summary: normalizeText(
      source.summary ||
      source.scentSummary ||
      source.shortDescription ||
      (scentTags.length > 0 ? scentTags.join(" · ") : ""),
      DEFAULT_RECOMMENDATION.summary
    ),
    description: normalizeText(
      source.description ||
      source.simpleDescription ||
      source.detail ||
      source.reasonDescription,
      DEFAULT_RECOMMENDATION.description
    ),
    reason: normalizeText(
      source.reason ||
      source.matchReason ||
      source.recommendReason ||
      source.recommendationReason,
      DEFAULT_RECOMMENDATION.reason
    ),
    tags: tags.length > 0 ? tags : DEFAULT_RECOMMENDATION.tags,
    purchaseLink:
      source.purchaseLink ||
      DEFAULT_RECOMMENDATION.purchaseLink,
    isFallback: false
  };
}

export async function fetchRecommendation(preferenceData) {

  if (!preferenceData) {
    throw new Error("Preference data is missing");
  }

  const response = await fetch(RECOMMEND_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(preferenceData)
  });

  if (!response.ok) {

    const errorBody = await response.text();

    throw new Error(
      `Recommendation request failed: ${response.status} ${errorBody}`
    );
  }

  const data = await response.json();

  return normalizeRecommendation(data);
}

export { DEFAULT_RECOMMENDATION };
