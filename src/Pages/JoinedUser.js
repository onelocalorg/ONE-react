import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleUserDetails } from "../api/services";

const JoinedUser = () => {
  const params = useParams();
  console.log(params);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params?.recentUserId !== "") {
          const data = await getSingleUserDetails(params?.recentUserId);
          console.log(data?.data);
        } else {
          console.log(params?.recentUserId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <div>{params?.recentUserId}</div>;
};

export default JoinedUser;
