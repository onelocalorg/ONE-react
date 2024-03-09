import React, { useEffect, useState } from "react";
import Style from "../Styles/UserData.module.css";
import { useSelector } from "react-redux";
import UserBadgeComponent from "../Components/UserBadgeComponent";
import { getRecentJoinedUsers } from "../api/services";

function RecentUserList() {
  const userInfo = useSelector((state) => state?.userInfo);
  const [recentJoinedusers, setRecentJoinedusers] = useState([
    { status: "pending", data: [] },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          localStorage.getItem("loggedIn") === "true" ||
          localStorage.getItem("loggedIn") === true
        ) {
          const data1 = {
            user_lat: Number(localStorage.getItem("lat")),
            user_long: Number(localStorage.getItem("lang")),
            radius: 25,
          };
          const data = await getRecentJoinedUsers(data1);
          setRecentJoinedusers({
            status: data?.success ? "fullfilled" : "pending",
            data: data?.data,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={Style.userJoined}>
      {userInfo?.userData !== null &&
        recentJoinedusers?.status === "fullfilled" &&
        recentJoinedusers?.data?.map((user) => (
          <UserBadgeComponent
            src={user?.pic}
            key={user?.user_unique_id}
            recentUserId={user?.id}
          />
        ))}
    </div>
  );
}

export default RecentUserList;
