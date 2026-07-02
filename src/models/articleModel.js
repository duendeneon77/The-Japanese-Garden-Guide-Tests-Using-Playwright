export function normalizeArticle(data) {
  return {
    id: data.id,
    title: (data.title || "").trim(),
    content: (data.content || "").trim()
  };
}