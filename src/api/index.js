import _ from "lodash";
import songs from "./songs";

export const contains = ({ name, email }, query) => {
  const { first, last } = name;
  if (first.includes(query) || last.includes(query) || email.includes(query)) {
    return true;
  }

  return false;
};

export const getSongs = (limit = 20, query = "") => {
  return new Promise((resolve, reject) => {
    if (query.length === 0) {
      resolve(_.take(songs, limit));
    } else {
      const formattedQuery = query.toLowerCase();
      const results = _.filter(songs, (song) => {
        return contains(song, formattedQuery);
      });
      resolve(_.take(results, limit));
    }
  });
};

export default getSongs;
