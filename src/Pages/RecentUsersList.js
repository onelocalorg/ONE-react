import React, { useEffect, useRef, useState } from "react";
import Style from "../Styles/UserData.module.css";
import { useSelector } from "react-redux";
import UserBadgeComponent from "../Components/UserBadgeComponent";
import { getRecentJoinedUsers } from "../api/services";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

function RecentUserList() {
  const userInfo = useSelector((state) => state?.userInfo);
  const [recentJoinedusers, setRecentJoinedusers] = useState([
    { status: "pending", data: [] },
  ]);

  const containerRef = useRef(null);
  const [paddingOffset, setPaddingOffset] = useState(8);

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

  useEffect(() => {
    const updatePadding = () => {
      setPaddingOffset(window.innerWidth <= 768 ? 4 : 8);
    };

    updatePadding();

    window.addEventListener("resize", updatePadding);

    // Cleanup event listener
    return () => window.removeEventListener("resize", updatePadding);
  }, []);

  const scroll = (direction) => {
    const { current: container } = containerRef;
    if (container) {
      const scrollAmount = container.firstChild.offsetWidth + paddingOffset;
      // console.log(scrollAmount); // Assuming all children have the same width
      container.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className={Style.userJoined}>
      {userInfo?.userData !== null && (
        <>
          <button
            onClick={() => scroll("prev")}
            className={`${Style.buttonPrevNext}`}
          >
            <MdNavigateBefore />
          </button>
          <div ref={containerRef} className={`${Style.userWraper}`}>
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
          <button
            onClick={() => scroll("next")}
            className={`${Style.buttonPrevNext}`}
          >
            <MdNavigateNext />
          </button>
        </>
      )}
    </div>
  );

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
