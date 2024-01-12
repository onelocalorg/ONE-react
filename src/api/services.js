import { axiosClient } from "../api/api";
export const logInApi = async (data) => {
  try {
    const response = await axiosClient.post("/admin/login", data);
    //to store refrence token
    const access_token = response.data.data.access_token;
    const refresh_token = response.data.data.refresh_token;
    const success = response.data.success;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("success_key", success);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const forgotApi = async (data) => {
  try {
    const response = await axiosClient.post("/admin/forgot-password", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const resetApi = async (token, data) => {
  try {
    const response = await axiosClient.post(
      `/admin/reset-password/?token=${token}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserList = async () => {
  try {
    const response = await axiosClient.get("/admin/users?pagination=false", {});
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const listEvents = async (page, data) => {
  try {
    const response = await axiosClient.post(
      `/open/events?limit=8&page=${page}`,
      data
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// baseUrl =https://app.onelocal.one/api/v1
export const singleEvents = async (eventId) => {
  try {
    const response = await axiosClient.get(`/open/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//to get final purchase link to buy tickets
export const getAmountOfTickets = async (ticketId, quantity) => {
  try {
    const response = await axiosClient.post(
      `/open/ticket-calculation/${ticketId}/${quantity}`,
      {
        isPaymentLink: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//to get amount , taxes and total amount
export const getTaxAndAmout = async (ticketId, quantity) => {
  try {
    const response = await axiosClient.post(
      `/open/ticket-calculation/${ticketId}/${quantity}`,
      {
        isPaymentLink: false,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const subscriptionsPlansApi = async () => {
  try {
    const response = await axiosClient.get("/subscriptions/plans", {});
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const response = { data: { isAvailable: false } };
    await delay(2000);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
