import { useState } from "react";
import { getMatchHistory } from "../services/riot";

const useRiot = () => {
  const [matchHistory, setMatchHistory] = useState({});

  const searchMatchHistoryByName = name => getMatchHistory(name).then(setMatchHistory);
  
  return { matchHistory, searchMatchHistoryByName };
};

export default useRiot;
