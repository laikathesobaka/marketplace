import stringSimilarity from "string-similarity";

export function compareSimilarity(target = "", compareTo = []) {
  const matches = stringSimilarity.findBestMatch(target, compareTo);
  return matches;
}
