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
    const response = await axiosClient.post(`/web/auth/checkEmail`, {
      email,
    });

    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginWithEmailApi = async (data) => {
  try {
    const response = await axiosClient.post("/web/auth/login", data);

    //to store refrence token
    if (response?.data?.data) {
      const access_token = response?.data?.data?.access_token;
      const refresh_token = response?.data?.data?.refresh_token;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    }

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCardListAPI = async () => {
  try {
    const response = await axiosClient.get("/subscriptions/cards");
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewCardAPI = async (data) => {
  try {
    const response = await axiosClient.post(
      "/subscriptions/cards/create",
      data
    );

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const appendNewCardAPI = async (data) => {
  try {
    const response = await axiosClient.post(
      "/subscriptions/cards/append",
      data
    );

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const submitPurchaseData = async (ticketId, quantity, payment_card) => {
  try {
    const response = await axiosClient.post(
      `/tickets/web/${ticketId}/${quantity}`,
      {
        isPaymentLink: true,
        payment_source: payment_card,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const userRegistrationWithPayment = async (payloadData) => {
  const {
    email,
    password,
    cpassword,
    token,
    ticketId,
    quantity,
    payment_source,
  } = payloadData;

  try {
    const response = await axiosClient.post(`/web/auth/signup`, {
      email,
      password,
      cpassword,
      token,
      ticketId,
      quantity,
      isPaymentLink: true,
      payment_source,
    });

    //to store refrence token for login after register
    if (response?.data?.data) {
      const access_token = response?.data?.data?.userDetail?.access_token;
      const refresh_token = response?.data?.data?.userDetail?.refresh_token;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const forgotPasswordApi = async (data) => {
  try {
    const response = await axiosClient.post("/auth/forgot-password", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const resetPasswordApi = async (token, data) => {
  try {
    const response = await axiosClient.post(
      `/auth/reset-password/?token=${token}`,
      data
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
