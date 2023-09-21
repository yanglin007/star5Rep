import axiosClient from "./axios.client";

export const chatCompletion = async ({ prompt }) => {
  try {
    const response = await axiosClient.post("ask", { prompt });

    return { response };
  } catch (err) {
    return { err };
  }
};
export const summaryCompletion = async ({ prompt }) => {
  try {
    const response = await axiosClient.post("summary", { prompt });

    return { response };
  } catch (err) {
    return { err };
  }
};