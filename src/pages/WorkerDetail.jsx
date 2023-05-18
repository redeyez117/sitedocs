import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../helpers/axios";
import User from "../components/User";
import { Box } from "@mui/material";
const WorkerDetail = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState([]);

  useEffect(() => {
    fetchSelectedWorker()
  }, []);

  const fetchSelectedWorker = () => {
    API.get(`/${id}`)
      .then((res) => {
        setWorker(res.data);
      })
      .catch((err) => {
        alert(err.response.message);
      });
  };

  return (
    <Box sx={{ width: "80%", margin: "auto", my: 4 }}>
      <User user={worker} />
      <div style={{ paddingBlock: 15 }}>
        <Link to={".."}>Go Back</Link>
      </div>
    </Box>
  );
};

export default WorkerDetail;
