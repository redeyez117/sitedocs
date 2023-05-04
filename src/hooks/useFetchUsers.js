import { useEffect, useState } from "react";
import API from "../helpers/axios";
export const useFetchUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchWorkers();
  }, []);

   const fetchWorkers = async () => {
    setLoading(true);
    try {
      const { data } = await API.get();
      setUsers([...data]);
      setLoading(false);
    } catch (e) {
      alert(e.response.message);
      setLoading(false);
    }
  };

  return [ loading, users, fetchWorkers ];
};
