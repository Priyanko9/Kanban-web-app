import { useEffect, useState } from "react";
import axios from "axios";

const useResponseData = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get("data.json").then((response) => {
      setData(response.data);
    });
  }, [JSON.stringify(data)]);

  return data;
};

export default useResponseData;
