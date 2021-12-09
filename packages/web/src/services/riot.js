const url = process.env.REACT_APP_RIOT_API;

export const getSumonner = (name) => fetch(`${url}/summoner?name=${name}`)
  .then(res => res.json());
