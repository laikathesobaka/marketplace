import stringSimilarity from "string-similarity";

const formatString = (str) => {
  //   const reg = new RegExp("[^a-zA-Z]");
  //   if (str.length) {
  //     return str.replace(reg, "");
  //   }
  //   return str;
};

export function compareSimilarity(target = "", compareTo = []) {
  console.log("INCOMING TARGET STR --- ", target);
  console.log("COMPARE TO ARR ---- ", compareTo);
  const matches = stringSimilarity.findBestMatch(target, compareTo);
  console.log("MATCHES --------- ", matches);
  return matches;
}
