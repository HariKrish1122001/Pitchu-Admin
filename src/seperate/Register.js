import React, { useState } from 'react';
import '../assets/css/Sign.css'
import frame2 from '../assets/images/Frame-2.png'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import Profile from '../assets/images/profile.png'

function Register() {


    const [registerData , setRegister] = useState({
        name:"",
        email:"",
        password:"",
    });

    const year = new Date().getFullYear();


    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='custom-sign min-vh-100'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='row align-items-center'>
                                <div className='col-lg-7  animi'>
                                    <div className='custom-sign-right'>
                                        <img src={frame2} class='animated-image-right' alt='Animated Image'></img>
                                    </div>
                                </div>
                                <div className='col-lg-5'>
                                    <div className='custom-inside-sign'>

                                        <div className='text-center'>
                                            <img style={{ width: '50px' }} src={Profile}></img>
                                            <p className='fw-bold'>Register</p>
                                        </div>
                                        <form>
                                            <div class="mb-3">
                                                <label for="exampleInputEmail1" class="form-label fw-bold">Name</label>
                                                <input type="email" class="form-control custom-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Name' />

                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleInputEmail1" class="form-label fw-bold">Email</label>
                                                <input type="email" class="form-control custom-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Example@email.com' />

                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleInputEmail1" class="form-label fw-bold">Phone Number</label>
                                                <input type="text" class="form-control custom-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Number' />

                                            </div>
                                            <div className="mb-3 position-relative">
                                                <label htmlFor="exampleInputPassword1" className="form-label fw-bold">Password</label>
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    className="form-control custom-input"
                                                    id="exampleInputPassword1"
                                                    placeholder='At least 8 characters'
                                                />
                                                <span
                                                    onClick={togglePasswordVisibility}
                                                    className="position-absolute"
                                                    style={{ right: '10px', top: '39px', cursor: 'pointer' }}
                                                >
                                                    {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                                                </span>
                                            </div>
                                            <div className='text-center w-100'>
                                                <button type="submit" class="custom-sign-btn w-100">Submit</button>
                                            </div>
                                            <div className='text-center mt-3'>
                                                <p>Don't you have an account? <span className='costom-forgot-color'>Sign up</span></p>
                                            </div>
                                            <div className='text-center'>
                                                <p>@ {year} ALL RIGHTS RESERVED</p>
                                            </div>
                                        </form>

                                        <div>
                                            {/* <Darklight/> */}
                                        </div>
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

export default Register