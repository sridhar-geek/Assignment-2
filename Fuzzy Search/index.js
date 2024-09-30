import Fuse from "fuse.js";
import array from './array.js'


/**  Task 3 Fuzzy Search  */
const options = {
  keys:["title"],
  threshold: 0.5,
  isCaseSensitive: false,
  shouldSort: false,
  includeScore: false,
  includeMatches :true,
};

  function fuzzySearch(query) {
    const fuse = new Fuse(array, options);
    const results = fuse.search(query);
    return results.map((result) => result.item);
  }

  const query = 'Jae'
  console.log(fuzzySearch(query));
  