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

export const packageListApi = async () => {
  try {
    const response = await axiosClient.get(`subscriptions/packages`, {});
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const memberShipCheckoutAPI = async (id) => {
  try {
    const response = await axiosClient.get(
      `subscriptions/packages/${id}/checkout`,
      {}
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
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
    console.log(response?.data?.data);
    console.log(response?.data?.data?.location);
    console.log(response?.data?.data?.location?.coordinates[0], "lang");
    console.log(response?.data?.data?.location?.coordinates[1], "lat");

    //to store refrence token
    if (response?.data?.data) {
      const access_token = response?.data?.data?.access_token;
      const lang = response?.data?.data?.location?.coordinates[0];
      const lat = response?.data?.data?.location?.coordinates[1];
      const refresh_token = response?.data?.data?.refresh_token;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("lang", lang);
      localStorage.setItem("lat", lat);
      localStorage.setItem(
        "loggedIn",
        response?.data?.data?.access_token !== "" ? true : false
      );
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

export const resetPasswordApi = async (data) => {
  try {
    const response = await axiosClient.post(`/auth/reset-password/`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await axiosClient.get(`/users/${userId}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const submitOtpApi = async (data) => {
  try {
    const response = await axiosClient.post(`/auth/verify-otp`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserProfileApi = async (userId, data) => {
  try {
    const response = await axiosClient.patch(`/users/${userId}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const myEventsList = async (page, data, userId) => {
  try {
    const response = await axiosClient.post(
      `/events/list/${userId}?limit=8&page=${page}`,
      data
    );

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getConnectLinkAPI = async () => {
  try {
    const response = await axiosClient.post(`/users/connect-link`);

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadImageAPI = async (data) => {
  try {
    const response = await axiosClient.post(`/users/upload/file`, data);

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecentJoinedUsers = async (data) => {
  try {
    const response = await axiosClient.post(`/users/recently-joined`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleUserDetails = async (id) => {
  try {
    const response = await axiosClient.get(`/users/userprofile/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFilterBadgeButtons = async () => {
  try {
    const response = await axiosClient.get(`/web/resources`);
    console.log(response);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const adminToolUpdate = async (adminId, data) => {
  try {
    const response = await axiosClient.patch(`/events/${adminId}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const createTicket = async (data) => {
  try {
    const response = await axiosClient.post(`/tickets`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTicket = async (ticketId, data) => {
  try {
    const response = await axiosClient.patch(`/tickets/${ticketId}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPostListAPI = async (page, data) => {
  try {
    const response = await axiosClient.post(
      `/posts/list?limit=10&page=${page}`,
      data
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPayout = async (eventId) => {
  try {
    const response = await axiosClient.get(
      `/events/event-financial/${eventId}`
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const whoSearcher = async (query) => {
  try {
    const response = await axiosClient.get(
      `/users/search-user?searchtext=${query}`
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const createTicketApi = async (data) => {
  try {
    const response = await axiosClient.post(`/events/`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const expensePayoutDraft = async (userId, type, data) => {
  try {
    const response = await axiosClient.post(
      `events/event-financial/${userId}/draft/${type}`,
      data
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const expensePayoutEdit = async (userId, type, data) => {
  try {
    const response = await axiosClient.post(
      `events/event-financial/${userId}/edit/${type}`,
      data
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePayoutDelete = async (userId, type, data) => {
  try {
    const response = await axiosClient.post(
      `events/event-financial/${userId}/delete/${type}`,
      data
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const ListCheckins = async (ticketId, limit = 5, page = 1) => {
  try {
    const response = await axiosClient.get(
      `events/getTicketHolders/${ticketId}?limit=${limit}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const onCheckin = async (EventId, data) => {
  try {
    const response = await axiosClient.patch(
      `tickets/checkedInEvent/${EventId}`,
      data
    );
    return response.data.success;
  } catch (error) {
    console.log(error);
  }
};

export const eventFinance = async (EventId) => {
  const res = await axiosClient.post(
    `events/event-financial/${EventId}/create`
  );
  return res.data;
};

export const cancelEvent = async (EventId) => {
  const res = await axiosClient.post(`events/cancel-event/${EventId}`);
  return res.data;
};

export const deleteUSer = async (userId) => {
  const res = await axiosClient.post(`users/delete/${userId}`);
  return res.data;
};

export const configList = async () => {
  try {
    const res = await axiosClient.get("config/list");
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const cardStripeAPI = async (
  stripeId,
  cardnumber,
  cardExpmonth,
  cardExpyear,
  cardCvv
) => {
  const genCard = {
    "card[number]": cardnumber,
    "card[exp_month]": cardExpmonth,
    "card[exp_year]": cardExpyear,
    "card[cvc]": cardCvv,
  };

  try {
    const results = await fetch("https://api.stripe.com/v1/tokens", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + stripeId,
      },
      body: Object.keys(genCard)
        .map((key) => key + "=" + genCard[key])
        .join("&"),
    })
      .then((response) => response.json())
      .then((res) => res);
    return results;
  } catch (error) {
    return error;
  }
};

export const purchaseSubscription = async (id, data) => {
  try {
    const res = await axiosClient.post(`subscriptions/${id}/purchase`, data);
    console.log("Res", res);
    return res.data;
  } catch (error) {
    return error;
  }
};
