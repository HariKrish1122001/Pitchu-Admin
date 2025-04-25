import { makeApiRequest } from "../axios/Axiosservices";


export const getPlan = async () => {
    try {
      let params = {
        url: "admin/getPlan",
        method: "POST",
      }
      const response = await makeApiRequest(params);
      return {
        data: response.data,
        status: response.status,
        message: response.message
      }
    } catch (error) {
      console.error("loginRequest", error)
      return {
        status: false,
        message: "Error On Server"
      }
    }
  }

  export const getSupportmsg = async () => {
    try {
      let params = {
        url: "admin/getSupport",
        method: "POST",
      }

      const response = await makeApiRequest(params);
      return {
        data: response.data,
        status: response.status,
        message: response.message
      }
    } catch (error) {
      console.error("loginRequest", error)
      return {
        status: false,
        message: "Error On Server"
      }
    }
  }
  

  export const deleteMsg = async (data) => {
    try {
      let params = {
        url: "admin/deleteMsg",
        method: "POST",
        data: { enData: data }
      }
      console.log("params>>>>",params)
      const response = await makeApiRequest(params);
      return {
        status: response.status,
        message: response.message
      }
    } catch (error) {
      console.error("loginRequest", error)
      return {
        status: false,
        message: "Error On Server"
      }
    }
  }

  export const updatePlan = async (data) => {
    try {
      let params = {
        url: "admin/updatePlan",
        method: "POST",
        data: { enData: data }
      }
  
      const response = await makeApiRequest(params);
      return {
        data: response.data,
        status: response.status,
        message: response.message
      }
    } catch (error) {
      console.error("loginRequest", error)
      return {
        status: false,
        message: "Error On Server"
      }
    }
  }
  
  export const getDomesticWinners = async () => {
    try {
      let params = {
        url: "admin/getDomesticWinners",
        method: "POST",
      }
      const response = await makeApiRequest(params);
      return {
        data: response.data,
        status: response.status,
        message: response.message
      }
    } catch (error) {
      console.error("loginRequest", error)
      return {
        status: false,
        message: "Error On Server"
      }
    }
  }

  export const getInternationalWinners = async () => {
    try {
      let params = {
        url: "admin/getInternationalWinners",
        method: "POST",
        
      }
      const response = await makeApiRequest(params);
      return {
        data: response.data,
        status: response.status,
        message: response.message
      }
    } catch (error) {
      console.error("loginRequest", error)
      return {
        status: false,
        message: "Error On Server"
      }
    }
  }

  export const getDomesticSendReward = async (data) => {
    try {
      let params = {
        url: "admin/getDomesticSendReward",
        method: "POST",
        data: { enData: data }
      }
      const response = await makeApiRequest(params);
      return {
        data: response.data,
        status: response.status,
        message: response.message
      }
    } catch (error) {
      console.error("loginRequest", error)
      return {
        status: false,
        message: "Error On Server"
      }
    }
  }

  export const getInternationalSendReward = async (data) => {
    try {
      let params = {
        url: "admin/getInternationalSendReward",
        method: "POST",
        data: { enData: data }
      }
      const response = await makeApiRequest(params);
      return {
        data: response.data,
        status: response.status,
        message: response.message
      }
    } catch (error) {
      console.error("loginRequest", error)
      return {
        status: false,
        message: "Error On Server"
      }
    }
  }