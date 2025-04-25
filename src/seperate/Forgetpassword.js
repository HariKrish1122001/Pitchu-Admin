import React, { useState, useEffect } from "react";
import frame2 from "../assets/images/password-1.png";
import Profile from "../assets/images/profile.png";
import config from "../config/config";
import isEmpty from "is-empty";
import { forgetRequest } from "../api/authapi";
import { encryptData, decryptData } from "./utils/securedata";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import render from "../assets/images/Asset-1.png";

function Forgetpassword() {
  const [email, setEmail] = useState(null);
  const [errormsg, setErrormsg] = useState({});
  const [isload, setIsload] = useState(false);
  const navigate = useNavigate();

  const validateValues = async (inputvalues) => {
    const err = {};

    if (isEmpty(inputvalues)) {
      err.inputvalues = "Email is required!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputvalues)) {
      err.inputvalues = "Invalid email address!";
    }
    console.log("err", err);
    return err;
  };

  const HandleSubmit = async (e) => {
    try {
      e.preventDefault();
      const fieldError = await validateValues(email);
      setErrormsg(fieldError);
      if (Object.keys(fieldError).length === 0) {
        // Api forget request

        setIsload(true);
        const enData = encryptData(email);
        const response = await forgetRequest(enData);
        console.log("response==", response);
        if (response.status === true) {
          setIsload(false);
          toast.success("Email sent successfully");
          setTimeout(() => {
            navigate("/");
          }, 4000);
        } else if (response.message === "Admin doesn't exist!") {
          toast.warn("Please check your email");
          setIsload(false);
        } else if (response.message === "something went error email") {
          toast.error("something went error email");
          setIsload(false);
        } else {
          toast.error("Error On Server");
          setIsload(false);
        }
      }
    } catch (error) {
      console.log("HandleSubmit Error:", error);
      setIsload(false);
    }
  };

  return (
    <div className="App">
      <ToastContainer />
      <div className="container-fluid">
        <div className="custom-sign min-vh-100">
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
              <div className="row align-items-center justify-content-center mt-5 ">
                <div className="col-lg-5">
                  <div className="custom-inside-sign">
                    <div className="text-center">
                      <img style={{ width: "50px" }} src={Profile}></img>
                      <p className="fw-bold">Email Address</p>
                    </div>

                    <form onSubmit={HandleSubmit}>
                      <div class="mb-3 mt-3">
                        {/* <label for="exampleInputEmail1" class="form-label fw-bold">Email</label> */}
                        <input
                          type="email"
                          class="form-control custom-input"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Email"
                          name="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErrormsg((preverr) => ({
                              ...preverr,
                              inputvalues: "",
                            }));
                          }}
                        />
                        {errormsg.inputvalues && (
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errormsg.inputvalues}
                          </span>
                        )}
                      </div>
                      <div className="text-center w-100 mt-4 mb-3">
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
                            Forgetpassword
                          </button>
                        )}
                      </div>
                    </form>

                    <div></div>
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

export default Forgetpassword;
