import { apiError } from "../constants/apiError.const";
import axiosInstance from "../services/api.service";
import axiosInstance2 from '../services/api.service2';
import CustomError from "../customClass/CustomError.class";
import axios from "axios";

/**
 * Performs an asynchronous API call using Axios.
 *
 * @param {string} endPoint - The API endpoint to call.
 * @returns {Promise<any | CustomError>} A promise that resolves with the fetched data or rejects with an error.
 */
export async function getApiCall(endPoint: string): Promise<any | CustomError> {
  try {
    const fetchedData = await axiosInstance.get(endPoint);
    if (fetchedData.data?.status === 200 || fetchedData.data?.status === 201) {
      return fetchedData?.data;
    }
    throw new CustomError(
      apiError.DATA_NOT_FOUND,
      fetchedData.data?.message || fetchedData.data?.msg || "Unknown error"
    );
  } catch (error: any) {
    if (error.response) {
      // Extract API Error Message
      const apiErrorMessage = error.response.data?.message || error.response.data?.error || 'Unknown API Error';
      throw new Error(apiErrorMessage); // Throw the exact error message from API
    } else {
      // Handle Network or Other Errors
      throw new Error(error.message || 'Network Error');
    }
  }
}

export async function postApiCall<T>(
  endPoint: string,
  body: T | any
): Promise<any | CustomError> {
  try {
    const fetchedData = await axiosInstance.post(endPoint, body);
    // console.log("data...", fetchedData);
    if (fetchedData.data?.status === 200 || fetchedData.data?.status === 201 || fetchedData?.status === 200 || fetchedData?.status === 201) {
      return fetchedData?.data;
    } 
    throw new CustomError(
      apiError.DATA_NOT_FOUND,
      fetchedData.data?.message || fetchedData.data?.msg || "Unknown error"
    );
  } catch (error: any) {
    if (error.response) {
      // Extract API Error Message
      const apiErrorMessage = error.response.data?.message || error.response.data?.error || 'Unknown API Error';
      throw new Error(apiErrorMessage); // Throw the exact error message from API
    } else {
      // Handle Network or Other Errors
      throw new Error(error.message || 'Network Error');
    }
  }
}

export async function postApiCall2<T>(
  endPoint: string,
  body: T | any,
  token: string
): Promise<any | CustomError> {
  try {
    const fetchedData = await axiosInstance2.post(endPoint, body, {headers: {'Authorization': `Bearer ${token}`}});
    // console.log("data...", fetchedData);
    if (fetchedData.data?.status === 200 || fetchedData.data?.status === 201) {
      return fetchedData?.data;
    } else if (
      fetchedData.data?.status === 401 ||
      fetchedData.data?.status === 400 ||
      fetchedData.data?.status === 410
    ) {
      throw new CustomError(
        apiError.TOKEN_EXPIRED,
        fetchedData.data?.message || fetchedData.data?.msg
      );
    } else {
      throw new CustomError(
        apiError.DATA_NOT_FOUND,
        fetchedData.data?.message || fetchedData.data?.msg
      );
    }
  } catch (error: any) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(apiError.API_CALL_FAILED, error?.message);
  }
}

/**
 * Performs an asynchronous PUT API call using Axios.
 *
 * @template T - The type of the request body.
 * @param {string} endPoint - The API endpoint to call.
 * @param {T | any} body - The data to be sent in the request body.
 * @returns {Promise<any | CustomError>} A promise that resolves with the fetched data or rejects with a CustomError.
 */
export async function putApiCall<T>(
  endPoint: string,
  body: T | any
): Promise<any | CustomError> {
  try {
    const fetchedData = await axiosInstance.put(endPoint, body);
    if (fetchedData.data.status === 200 || fetchedData.data.status === 201) {
      return fetchedData?.data;
    } else if (
      fetchedData.data?.status === 401 ||
      fetchedData.data?.status === 400 ||
      fetchedData.data?.status === 410
    ) {
      throw new CustomError(
        apiError.TOKEN_EXPIRED,
        fetchedData.data?.message || fetchedData.data?.msg
      );
    } else {
      throw new CustomError(
        apiError.DATA_NOT_FOUND,
        fetchedData.data?.message || fetchedData.data?.msg
      );
    }
  } catch (error: any) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(apiError.API_CALL_FAILED, error?.message);
  }
}

/**
 * Performs an asynchronous DELETE API call using Axios.
 *
 * @param {string} endPoint - The API endpoint to call.
 * @returns {Promise<any | CustomError>} A promise that resolves with the fetched data or rejects with a CustomError.
 */
export async function deleteApiCall(
  endPoint: string
): Promise<any | CustomError> {
  try {
    const fetchedData = await axiosInstance.delete(endPoint);
    if (fetchedData.data?.status === 200 || fetchedData.data?.status === 201) {
      return fetchedData?.data;
    } else if (
      fetchedData.data?.status === 401 ||
      fetchedData.data?.status === 400 ||
      fetchedData.data?.status === 410
    ) {
      throw new CustomError(
        apiError.TOKEN_EXPIRED,
        fetchedData.data?.message || fetchedData.data?.msg
      );
    } else {
      throw new CustomError(
        apiError.DATA_NOT_FOUND,
        fetchedData.data?.message || fetchedData.data?.msg
      );
    }
  } catch (error: any) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(apiError.API_CALL_FAILED, error?.message);
  }
}





export async function uploadImageApiCall(
  endPoint: string,
  image: any,
  user_id: string,
  staff_id:string,
  is_staff:Boolean,
): Promise<any | CustomError> {
  try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("user_id", user_id);
    formData.append("staff_id", staff_id);
    formData.append("is_staff", is_staff);
    const fetchedData = await axiosInstance.post(endPoint, formData, {
      headers:{
        "Content-Type": "multipart/form-data",
      }
    });
    if (fetchedData?.status === 200 || fetchedData?.status === 201) {
      return fetchedData?.data;
    } else if (
      fetchedData?.status === 401 ||
      fetchedData?.status === 400 ||
      fetchedData?.status === 410
    ) {
      throw new CustomError(
        apiError.TOKEN_EXPIRED,
        fetchedData.data?.message || fetchedData.data?.msg
      );
    } else {
      throw new CustomError(
        apiError.DATA_NOT_FOUND,
        fetchedData.data?.message || fetchedData.data?.msg
      );
    }
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(apiError.API_CALL_FAILED, error?.message);
  }
}