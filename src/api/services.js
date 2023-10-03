import {axiosClient} from '../api/api'
export const logInApi = async (data) =>{
    try {
        const response = await axiosClient.post("/admin/login", data);
        //to store refrence token
        const access_token = response.data.data.access_token;
        const refresh_token = response.data.data.refresh_token;
        const success = response.data.success;
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        localStorage.setItem('success_key', success)

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const forgotApi = async (data) =>{
    try {
        const response = await axiosClient.post("/admin/forgot-password", data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const resetApi = async (token,data) =>{
    try {
        const response = await axiosClient.post(`/admin/reset-password/?token=${token}`,data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getUserList = async () => {
    try {
        const response = await axiosClient.get("/admin/users?pagination=false", {

        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const listEvents = async (page,data) => {
    try {
        const response = await axiosClient.post(`/open/events?limit=8&page=${page}`, data)
        // console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const subscriptionsPlansApi = async () => {
    try {
        const response = await axiosClient.get("/subscriptions/plans", {

        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}