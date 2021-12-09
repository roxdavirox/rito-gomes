import { useState } from "react";
import { getSumonner } from "../services/riot";

const useRiot = () => {
  const [sumonner, setSumonner] = useState({});

  const getSumonnerByName = name => getSumonner(name).then(data => setSumonner(data));
  
  return { sumonner, getSumonnerByName };
};

export default useRiot;
