const url = 'http://localhost:3003/api/riot'

export const getSumonner = (name) => fetch(`${url}/summoner?name=${name}`)
  .then(res => res.json());
