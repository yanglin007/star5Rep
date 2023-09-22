import axiosClient from "./axios.client";
import { message } from 'antd';

export const getList = async ({ action, filter }) => {
    try {
        const response = await axiosClient.post(action, filter);
        return { response };
    } catch (err) {
        message.error(err);
        return { err };
    }
};

export const handleData= async ({ action, data }) => {
    try {
        const response = await axiosClient.post(action, data);
        if (response.code == 1) {
                message.success(response.msg);
                return { response };
        } else {
                message.error(response.msg);
            return { response };
        }
    } catch (err) {
        message.error(err);
        return { err };
    }
};