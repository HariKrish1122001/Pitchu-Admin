import React, { useState, useEffect } from 'react'
import frame2 from "../assets/images/password-1.png";
import Profile from '../assets/images/profile.png'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import isEmpty from 'is-empty';
import { ToastContainer, toast } from 'react-toastify';
import { encryptData, decryptData } from "./utils/securedata"
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { resetRequest } from '../api/authapi';
import render from "../assets/images/Asset-1.png";


function ResetPassword() {

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [errorpassword, setErrorPassword] = useState({});
  const [isload, setIsload] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const queryparms = new URLSearchParams(location.search);
  const token = queryparms.get("Admtoken")

  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmpass, setShowconfirmpass] = useState(false);

  const validateValues = (inputvalues) => {
    const error = {}

    if (inputvalues.password !== undefined) {
      if (isEmpty(inputvalues.password)) {
        error.password = "Password is required!"
      } else if (inputvalues.password.length < 5) {
        error.password = "Password must be at least 5 characters!";
      }
    }

    if (inputvalues.confirmpassword !== undefined) {
      if (isEmpty(inputvalues.confirmpassword)) {
        error.confirmpassword = "Confirm Password is required!"
      } else if (inputvalues.confirmpassword !== inputvalues.password) {
        error.confirmpassword = "Passwords do not match!";
      }
    }
    return error;
  }

  const HandleChange = (e) => {
    try {
      const { name, value } = e.target;

      if (name === 'password') {
        setPassword(value);
      } else if (name === 'confirmpassword') {
        setConfirmpassword(value);
      }

      const inputValues = { password, confirmpassword, [name]: value };
      const validationErrors = validateValues(inputValues);
      setErrorPassword((preverror) => ({
        ...preverror,
        ...validationErrors,
        [name]: validationErrors[name] || "",
      }))
    } catch (error) {
      console.log("HandleChange Error:", error);
    }
  }

  const HandleResetSubmit = async (e) => {
    try {
      e.preventDefault();
      const inputValues = { password, confirmpassword };
      const fieldError = validateValues(inputValues)
      setErrorPassword(fieldError)

      if (Object.keys(fieldError).length === 0) {
        setIsload(true)
        const Obj = { token, password };
        const enData = encryptData(Obj);
        const response = await resetRequest(enData);
        console.log("password", password, "token", token);

        if (response.status === true) {
          toast.success("ResetPassword Successfully Submited")
          setTimeout(() => { navigate("/") }, 4000);
          setIsload(false);
        } else if (response.message === "invalid token") {
          setIsload(false);
          toast.error("Your password reset link has expired.")
          setTimeout(() => { navigate("/") }, 4000);
        } else if (response.message === "expired token") {
          setIsload(false);
          toast.error("Your password reset link has expired.")
          setTimeout(() => { navigate("/") }, 4000);
        } else {
          setIsload(false);
          toast.error("Your password reset link has expired.")
          setTimeout(() => { navigate("/") }, 4000);
        }
      }

    } catch (error) {
      console.log("HandleResetSubmit Error:", error);
      setIsload(false)
    }
  }

  return (
    <div className='App'>
      <ToastContainer />
      <div className='container-fluid'>
        <div className='custom-sign min-vh-100'>
          <div className='row'>
            <div className='col-lg-12'>
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
              <div className='row align-items-center mt-5'>
                <div className='col-lg-5'>
                  <div className='custom-inside-sign'>
                    <div className='text-center'>
                      <img style={{ width: '50px' }} src={Profile}></img>
                      <p className='fw-bold'>ResetPassword</p>
                    </div>

                    <form onSubmit={HandleResetSubmit}>
                      <div class="mb-3  position-relative">
                        <label for="exampleInputpassword" class="form-label fw-bold">Password</label>
                        <input
                          type={`${showPassword ? "text" : "password"}`}
                          class="form-control custom-input"
                          id="exampleInputpassword"
                          aria-describedby="emailHelp"
                          placeholder='password'
                          name='password'
                          value={password}
                          onChange={HandleChange}
                        />
                        <span className='position-absolute'
                          style={{ right: '10px', top: '39px', cursor: 'pointer', color:"black" }}
                          onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                        </span>
                        {errorpassword.password && (<span style={{ color: "red", fontSize: "smaller" }}>{errorpassword.password}</span>)}
                      </div>
                      <div className="mb-3 position-relative">
                        <label htmlFor="exampleInputPassword1" className="form-label fw-bold">Confirm Password</label>
                        <input
                          type={`${showconfirmpass ? "text" : "password"}`}
                          className="form-control custom-input"
                          id="exampleInputPassword1"
                          placeholder='Confirm password'
                          name='confirmpassword'
                          value={confirmpassword}
                          onChange={HandleChange}
                        />
                        <span className='position-absolute'
                          style={{ right: '10px', top: '39px', cursor: 'pointer', color:"black" }}
                          onClick={() => setShowconfirmpass(!showconfirmpass)}>
                          {showconfirmpass ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                        </span>
                        {errorpassword.confirmpassword && (<span style={{ color: "red", fontSize: "smaller" }}>{errorpassword.confirmpassword}</span>)}
                      </div>
                      <div className='text-end'>
                      </div>
                      <div className='text-center w-100'>
                        {isload
                          ? (<button type="submit" class="custom-sign-btn w-100" disabled={isload}>
                            <div class="spinner-border text-light" role="status">
                              <span class="sr-only"></span>
                            </div>
                          </button>)
                          : (<button type="submit" class="custom-sign-btn w-100">Reset</button>)}
                      </div>
                    </form>

                    <div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-7 animi'>
                  <div className='custom-sign-right'>
                    <img src={frame2} class='animated-image' alt='Animated Image'></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword