import { makeApiRequest } from "../axios/Axiosservices";


export const loginRequest = async (data) => {
  try {
    console.log('data--login', data);

    let params = {
      url: "admin/Login",
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


export const otpRequest = async (data) => {
  try {
    let params = {
      url: "admin/verifyOtp",
      method: "POST",
      data: { enData: data }
    }

    const response = await makeApiRequest(params);
    return {
      data: response.token,
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

export const forgetRequest = async (data) => {
  try {
    let params = {
      url: "admin/forgetpass",
      method: "POST",
      data: { enData: data }
    }

    const response = await makeApiRequest(params);
    return {
      data: response.userToken,
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

export const resetRequest = async (data) => {
  try {
    let params = {
      url: "admin/resetpass",
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

export const getisAdmincheck = async () => {
  try {

    let params = {
      url: "admin/getadmincheck",
      method: "GET",
    }

    const response = await makeApiRequest(params);
    return {
      data: response.data,
      status: response.status,
      message: response.message
    }

  } catch (error) {
    console.error("getisAdmincheck", error)
    return {
      status: false,
      message: "Error On Server"
    }
  }
}
