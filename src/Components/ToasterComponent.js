import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ToasterComponent = (i, time) => {
  toast.error(i, {
    position: "top-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export default ToasterComponent;
