import { useState, useEffect } from "react";

const FetchApi = (url) => {
  const [data, setData] = useState(null);
  console.log(url)
  useEffect(() => {
    console.log(url)
    fetch(url)
      .then((res) => {console.log(res); return res.json()})
      .then((data) => setData(data));
  }, [url]);
console.log([data]);
  return data;
};

export default FetchApi;