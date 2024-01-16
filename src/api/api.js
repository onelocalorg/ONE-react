import axios from "axios";

const token = localStorage.getItem("access_token");

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "X-Custom-Header": "foobar", Authorization: `Bearer ${token}` },
});
axiosClient.interceptors.response.use(
  function (response) {
    // console.log(response);
    return response;
  },
  async function (error) {
    let res = error.response;
    const originalConfig = error.config;
    // console.log(res);
    // console.log(originalConfig);

    if (res.data.code === 401) {
      if (originalConfig.url !== "/auth/refresh-tokens") {
        try {
          res = await axiosClient.post("/auth/refresh-tokens", {
            refreshToken: localStorage.getItem("refresh_token"),
          });

          const { token } = res?.data?.data?.access;
          localStorage.setItem("access_token", token);

          if (token) {
            originalConfig.headers["Authorization"] = `Bearer ${token}`;
            // console.log(res);
            return axiosClient(originalConfig);
          } else {
            console.log("Token refresh failed");
            window.location.href = "/login";
            return Promise.reject(error);
          }
        } catch (refreshError) {
          // console.log("Token refresh error:", refreshError);
          window.location.href = "/login";
          return Promise.reject(error);
        }
      } else {
        // If URL is "/auth/refresh-tokens", navigate to "/dashboard"
        // console.log("Navigating to dashboard");
        localStorage.clear();
        // window.location.href = "/dashboard";
        window.location.href = "/";
        return Promise.reject(error);
      }
    }

    if (res.data.code === 429) {
      console.log("Too Many Requests (429)");
    }
  }
);

// axiosClient.interceptors.response.use(
//   function (response) {
//     console.log(response);
//     return response;
//   },
//   async function (error) {
//     let res = error.response;
//     const originalConfig = error.config;
//     console.log(res)
//     console.log(originalConfig)
//     if (res.data.code === 401) {
//       if (originalConfig.url != "/auth/refresh-tokens") {
//         console.log(originalConfig)
//         console.log(res.data.code)
//         res = await axiosClient.post("/auth/refresh-tokens", {
//           refreshToken: localStorage.getItem("refresh_token"),
//         })

//         const { token } = res?.data?.data?.access;
//         localStorage.setItem("access_token", token)
//         if (token) {
//           originalConfig.headers["Authorization"] = `Bearer ${token}`;
//           console.log(res);
//           return axiosClient(originalConfig);
//         } else {
//           console.log("else", res.data.code)
//           window.location.href = "/login"
//           return Promise.reject(error);
//         }

//       } else {

//       }
//     }

//     if (res.data.code === 429) {
//       console.log("Hellllo")
//     }

//   }
// );

axiosClient.interceptors.request.use(
  function (request) {
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);
