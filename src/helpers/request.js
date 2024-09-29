import axios from "axios";

export function makeGetRequest (url) {
  return new Promise (async (resolve, reject) => {
    axios
      .get(`http://localhost:9000/api/${url}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response);
        } else {
          reject();
        }
      })
      .catch(error => reject(error));
  });
}