export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
  { _id: "5b21ca3eeb7f6fbccd471821", name: "Documentary" },
];

export function getGenres() {
  // what is the point?
  // why not just return genres here.
  // Why are we processing a filter which always returns all the items.?
  return genres.filter((g) => g);
}
