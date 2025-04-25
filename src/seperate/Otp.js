import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import frame2 from "../assets/images/otp.png";
import Profile from "../assets/images/profile.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import isEmpty from "is-empty";
import { otpRequest } from "../api/authapi";
import { encryptData, decryptData } from "./utils/securedata";
import { ToastContainer, toast } from "react-toastify";
import { CheckTokenIslogin } from "./utils/helper";
import render from "../assets/images/Asset-1.png"

function Otp() {
  const [otp, setOtp] = useState("");
  const [errorOtp, setErrorOtp] = useState({});
  const [isload, setIsload] = useState(false);
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const navigate = useNavigate();

  // useEffect(() => {
  //     if (!email) {
  //         navigate('/');
  //     }
  // }, [email, navigate]);

  const CheckTokenExpired = async () => {
    try {
      const TokenData = await CheckTokenIslogin();
      if (TokenData) {
        window.location.href = "/dashboard/domestic";
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    CheckTokenExpired();
  }, []);

  const OtpOnchange = (val) => {
    try {
      setOtp(val);
      setErrorOtp((preverr) => ({ ...preverr, otp: "" }));
    } catch (error) {
      console.log("OtpOnchange Error:", error);
    }
  };

  const validateValues = (otp) => {
    const error = {};

    if (isEmpty(otp)) {
      error.otp = "Otp is required!";
    } else if (otp.length < 4) {
      error.otp = "Valid otp is required!";
    }
    return error;
  };

  const HandleOtpsubmit = async (e) => {
    try {
      e.preventDefault();
      const fielderror = validateValues(otp);
      setErrorOtp(fielderror);

      if (Object.keys(fielderror).length === 0) {
        setIsload(true);
        const Obj = { otp, email };
        const enData = encryptData(Obj);
        const response = await otpRequest(enData);
        if (response.status) {
          setIsload(false);
          localStorage.setItem("Admtoken", response.data);
          toast.success("Login Sucessfully!");
          setTimeout(() => {
            navigate("/dashboard/domestic");
            setOtp("");
          }, 1500);
        } else if (response.message === "Admin doesn't exist!") {
          toast.warn("Please Login again otp"); //
          setIsload(false);
        } else if (response.message === "Please enter a valid OTP!") {
          toast.warn("Please enter a valid OTP!"); //
          setIsload(false);
        } else if (response.message === "Your OTP has expired!") {
          toast.error("Your OTP has expired!");
          setIsload(false);
          window.history.replaceState({}, "");
          setEmail("");
        } else {
          toast.error("Error VerifyOtp!");
          setIsload(false);
          window.history.replaceState({}, "");
          setEmail("");
        }
      }
    } catch (error) {
      console.log("HandleOtpsubmit Error:", error);
      toast.error("Error VerifyOtp!");
      setIsload(false);
    }
  };

  return (
    <div className="App">
      <ToastContainer />
      <div className="container-fluid">
        <div className="custom-sign min-vh-100 ">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex flex-row pt-2 mb-2 text-center">
                <div className="  text-lign-center">
                  <a
                    className="navbar-brand"
                    href="/dashboard/domestic"
                    style={{ color: "#2b6d00", fontWeight: "bold" }}
                  >
                    <img src={render}></img> Pitchu Daily Chit
                  </a>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-lg-5">
                  <div className="custom-inside-sign">
                    <div className="text-center">
                      <img style={{ width: "50px" }} src={Profile}></img>
                      <p className="fw-bold">OTP</p>
                    </div>

                    <form onSubmit={HandleOtpsubmit}>
                      <div className="mt-3 text-center justify-content-center align-items-center d-flex custom-otp-1">
                        <OtpInput
                          value={otp}
                          onChange={OtpOnchange}
                          numInputs={4}
                          renderSeparator={<span>-</span>}
                          renderInput={(props) => <input {...props} />}
                        />
                      </div>
                      {errorOtp.otp && (
                        <span style={{ color: "red", fontSize: "smaller" }}>
                          {errorOtp.otp}
                        </span>
                      )}

                      <div className="text-center w-100 mt-3 mb-3">
                        {isload ? (
                          <button
                            type="submit"
                            class="custom-sign-btn w-100"
                            disabled={isload}
                          >
                            <div
                              class="spinner-border text-light"
                              role="status"
                            >
                              <span class="sr-only"></span>
                            </div>
                          </button>
                        ) : (
                          <button type="submit" class="custom-sign-btn w-100">
                            Submit
                          </button>
                        )}
                      </div>
                    </form>

                    {email ? (
                      ""
                    ) : (
                      <div className="text-center mt-3">
                        <p>
                          Otp is faied!{" "}
                          <Link to="/">
                            <span className="costom-forgot-color">Login</span>
                          </Link>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-7 animi">
                  <div className="custom-sign-right">
                    <img
                      src={frame2}
                      class="animated-image"
                      alt="Animated Image"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
