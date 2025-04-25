import React, { useState, useEffect } from "react";
import "../assets/css/Sign.css";
import frame2 from "../assets/images/Frame-2.png";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Profile from "../assets/images/profile.png";
import { Link, useNavigate } from "react-router-dom";
import isEmpty from "is-empty";
import { loginRequest, getisAdmincheck } from "../api/authapi";
import { ToastContainer, toast } from "react-toastify";
import { encryptData, decryptData } from "./utils/securedata";
import { CheckTokenIslogin } from "./utils/helper";
import render from "../assets/images/Asset-1.png";
import login from "../assets/images/login.png"

function Login() {
  const year = new Date().getFullYear();
  const [inputfields, setInputfield] = useState({
    email: "",
    password: "",
  });
  const [errormsg, setErrormsg] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isload, setIsload] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

  const validateValues = (inputValues) => {
    let errors = {};

    if (inputValues.email !== undefined) {
      if (isEmpty(inputValues.email)) {
        errors.email = "Email is required!";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputValues.email)
      ) {
        errors.email = "Invalid email address!";
      }
    }

    if (inputValues.password !== undefined) {
      if (isEmpty(inputValues.password)) {
        errors.password = "Password is required!";
      } else if (inputValues.password.length < 5) {
        errors.password = "Password must be at least 5 characters";
      }
    }
    return errors;
  };

  const Handlechange = async (e) => {
    try {
      // console.log("onchage",{[e.target.name]: e.target.value})
      const { name, value } = e.target;
      const updatedFields = { ...inputfields, [name]: value };
      setInputfield(updatedFields);

      const fieldError = validateValues({ [name]: value });
      setErrormsg((prevErrors) => ({
        ...prevErrors,
        ...fieldError,
        [name]: fieldError[name] || "",
      }));
    } catch (error) {
      console.log("Handlechange Error:", error);
    }
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const errors = validateValues(inputfields);
      setErrormsg(errors);

      if (Object.keys(errors).length === 0) {
        //Api login request
        setIsload(true);
        const enData = encryptData(inputfields);
        const response = await loginRequest(enData);

        if (response.status === true) {
          toast.success("Otp send mail Sucessfully!");
          setTimeout(() => {
            navigate("/otp", { state: { email: inputfields.email } });
          }, 2500);
          setIsload(false);
        } else if (response.message === "data is not found!") {
          setIsload(false);
          toast.warn("Please check your email");
        } else if (response.message === "Invalid password") {
          setIsload(false);
          toast.warn("Please check your password");
        } else if (response.message === "Please Enter Otp") {
          setIsload(false);
          toast.error("Otp Generate is fail!");
        } else {
          toast.error("Err Login failed");
          setIsload(false);
        }
      }
    } catch (error) {
      console.log("HandleLogin Error:", error);
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
              <div className="row align-items-center justify-content-center mt-5">
                <div className="col-lg-5">
                  <div className="custom-inside-sign">
                    <div className="text-center">
                      <img style={{ width: "50px" }} src={Profile}></img>
                      <p className="fw-bold">Login</p>
                    </div>

                    <form onSubmit={handleLogin}>
                      <div class="mb-3">
                        <label
                          for="exampleInputEmail1"
                          class="form-label fw-bold"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          class="form-control custom-input"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Example@email.com"
                          name="email"
                          value={inputfields.email}
                          onChange={Handlechange}
                        />
                        {errormsg.email ? (
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errormsg.email}
                          </span>
                        ) : null}
                      </div>
                      <div className="mb-3 position-relative">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label fw-bold"
                        >
                          Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control custom-input"
                          id="exampleInputPassword1"
                          placeholder="At least 8 characters"
                          name="password"
                          value={inputfields.password}
                          onChange={Handlechange}
                        />
                        <span
                          onClick={togglePasswordVisibility}
                          className="position-absolute"
                          style={{
                            right: "10px",
                            top: "39px",
                            cursor: "pointer",
                            color: "black",
                          }}
                        >
                          {showPassword ? (
                            <BsFillEyeFill />
                          ) : (
                            <BsFillEyeSlashFill />
                          )}
                        </span>
                        {errormsg.password && (
                          <span style={{ color: "red", fontSize: "smaller" }}>
                            {errormsg.password}
                          </span>
                        )}
                      </div>
                      <div className="text-end">
                        <Link to="/forgetpassword">
                          <p className="costom-forgot-color">
                            Forgot Password?
                          </p>
                        </Link>
                      </div>
                      <div className="text-center w-100">
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
                      <div className="text-center mt-3">
                        {/* <p>Don't you have an account? <span className='costom-forgot-color'>Sign up</span></p> */}
                      </div>
                      <div className="text-center">
                        <p>@ {year} ALL RIGHTS RESERVED</p>
                      </div>
                    </form>

                    <div>{/* <Darklight/> */}</div>
                  </div>
                </div>
                <div className="col-lg-7 animi">
                  <div className="custom-sign-right">
                    <img
                      src={login}
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

export default Login;
