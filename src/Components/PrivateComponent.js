import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const PrivateComponent = () => {
  const userInfo = useSelector((state) => state?.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.userData) {
      navigate("/");
    }
  }, []);

  return <></>;
};
