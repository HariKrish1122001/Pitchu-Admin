import React from 'react'
import { Link } from 'react-router-dom';
import errorimg from "../assets/images/3derror.webp";

function Error() {
    return (
        <div className='error-page'>
            <div className='container-fluid'>

                <div class="row justify-content-center align-items-center min-vh-100">
                    <div className='col-lg-6 text-center text-lg-end'>
                        <img src={errorimg} alt='errorimg' className='error-img' />
                    </div>
                    <div class="col-lg-6 text-center text-lg-start">
                        <h1 class="text">404</h1>
                        <h3 class="">Look like you're lost</h3>
                        <p>the page you are looking for not available!</p>
                        <a href="/" class="">
                            <button class="border-0 rounded-4 p-3 goto-bt">Go to Home</button>
                        </a>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default Error