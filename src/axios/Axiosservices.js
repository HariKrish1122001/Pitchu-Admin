import axios from "axios";
import config from "../config/config"

export const makeApiRequest = async (params) => {
  try {
    let headers = {
      "Access-Control-Allow-Origin": "*",  
    };

    let requestData = params.data;
    
    if (requestData instanceof FormData) {
      headers = { ...headers };  // No need to add 'Content-Type'
    } else {
      // If not FormData, set Content-Type to JSON
      headers['Content-Type'] = 'application/json';

      // Convert BigInt values to strings in the request data
      requestData = convertBigIntToString(requestData);
    }

    let response;

    // console.log('params---', params);

    switch (params.method.toUpperCase()) {
      case "GET":
        response = await axios.get(`${config.BACKEND_URL}${params.url}`, { headers });
        break;
      case "POST":
        response = await axios.post(`${config.BACKEND_URL}${params.url}`, requestData, { headers });
        break;
      //   case "PUT":
      //     response = await axios.put(`${config.BACKEND_URL}${params.url}`, requestData, { headers });
      //     break;
      //   case "DELETE":
      //     response = await axios.delete(`${config.BACKEND_URL}${params.url}`, { headers });
      //     break;
      default:
        throw new Error(`Unsupported method: ${params.method}`);
    }
    // console.log('response----', response.data);
    return response.data;
  } catch (error) {
    console.log("axios error", error);
    throw error;
  }
};

// Helper function to convert BigInt values to strings
const convertBigIntToString = (obj) => {
  if (typeof obj === 'bigint') {
    return obj.toString();
  } else if (typeof obj === 'object') {
    for (const key in obj) {
      obj[key] = convertBigIntToString(obj[key]);
    }
  }
  return obj;
};



