/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Style from "../Styles/MyEventPage.module.css";
import { PrivateComponent } from "./PrivateComponent";
import HeaderComponent from "./HeaderComponent";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const AndroildApp = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to download the file
    const downloadFile = () => {
      // Replace 'your-file-url' with the actual URL of the file you want to download
      const fileUrl =
        "https://one-light.s3.us-east-1.amazonaws.com/androidapk/Android-APK-Live.apk";
      // Create a link element
      const link = document.createElement("a");
      // Set the href attribute to the file URL
      link.href = fileUrl;
      // Set the download attribute to prompt download
      link.download = "filename"; // You can specify the file name here
      // Append the link to the body
      document.body.appendChild(link);
      // Trigger a click event on the link
      link.click();
      // Clean up by removing the link from the body
      document.body.removeChild(link);
      setLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    };

    // Call the download function when the component mounts
    downloadFile();

    // Clean up if needed
    return () => {
      // Any clean-up code goes here
    };
  }, []);

  return (
    <div className={Style.mainDiv}>
      <PrivateComponent />
      <HeaderComponent />
      <div className={Style.dataContainer}></div>
      {loading && <Loader />}
    </div>
  );
};

export default AndroildApp;
