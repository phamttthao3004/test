export const callApi = page => {
  return fetch(`https://reqres.in/api/users?page=${page}&&per_page=3`)
    .then(res => res.json())
    .then(
      result => {
        return result;
      },
      error => {
        return error;
      }
    );
};
