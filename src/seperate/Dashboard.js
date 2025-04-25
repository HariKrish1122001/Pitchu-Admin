
import React, { useEffect, useState } from "react";


import $ from 'jquery'
import { GrClose } from 'react-icons/gr';

import { MdWebAsset } from 'react-icons/md';
import { RiWallet3Fill } from 'react-icons/ri';
import { RiExchangeDollarLine } from 'react-icons/ri';
import { PiClockClockwiseBold } from 'react-icons/pi';
import { FaListAlt } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb';
import { AiOutlineSecurityScan } from 'react-icons/ai';
import { ImProfile } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import render from "../assets/images/Asset-1.png"
import { ToastContainer,toast } from 'react-toastify';
import { FaWpforms } from "react-icons/fa6";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { TbCreditCardPay } from "react-icons/tb";
import Domestic from "./Domestic";
import International from "./International";
import Plan from "./Plan";
import Support from "./Support";




$(document).ready(function () {
  if ($(window).width() < 600) {       // if width is less than 600px
    $(".nav-link").click(function () {
      $("#mySidenav").css("width", "0px");
    });
  }
  else {
    // $('#v-pills-asset-tab').click(function () {
    //   location.reload();
    // });
  }

  $("#mobile-three-line-collapse").click(function () {
    $("#mySidenav").css("width", "250px");
  });
  $("#mobile-close-collapse").click(function () {
    $("#mySidenav").css("width", "0px");
  });
  $(".dashboard-profile-table-tabs-section-hide").hide();
  $(".details-button-navigation button").click(function () {
    $(".dashboard-profile-section-hide").hide();
    $(".dashboard-profile-table-tabs-section-hide").show();
    $("#mySidenav").css("width", "100px");
    $(".dashboard-main-section").css("margin-left", "100px");
    $(".dashboard-navbar-brand img").css("width", "50px");
    $(".dashboard-navbar-brand img").css("height", "50px");
    $("#mobile-close-arrow-left").hide();
    $(".dashboard-text-1").hide();
    $("#mobile-close-arrow-right").show();
  });
  $(".button-dashboard-table-back").click(function () {
    $(".dashboard-profile-section-hide").show();
    $(".dashboard-profile-table-tabs-section-hide").hide();
    $("#mySidenav").css("width", "250px");
    $(".dashboard-main-section").css("margin-left", "250px");
    $(".dashboard-navbar-brand img").css("width", "80px");
    $(".dashboard-navbar-brand img").css("height", "80px");
    $("#mobile-close-arrow-left").show();
    $(".dashboard-text-1").show();
    $("#mobile-close-arrow-right").hide();
  });
  



  $("#mobile-close-arrow-right").hide();
  $("#mobile-close-arrow-left").click(function () {
    $("#mySidenav").css("width", "100px");
    $(".dashboard-main-section").css("margin-left", "100px");
    $(".dashboard-navbar-brand img").css("width", "50px");
    $(".dashboard-navbar-brand img").css("height", "50px");
    $("#mobile-close-arrow-left").hide();
    $(".dashboard-text-1").hide();
    $("#mobile-close-arrow-right").show();
  });
  $("#mobile-close-arrow-right").click(function () {
    $("#mySidenav").css("width", "250px");
    $(".dashboard-main-section").css("margin-left", "250px");
    $(".dashboard-navbar-brand img").css("width", "80px");
    $(".dashboard-navbar-brand img").css("height", "80px");
    $("#mobile-close-arrow-left").show();
    $(".dashboard-text-1").show();
    $("#mobile-close-arrow-right").hide();
  });


  if ($('#mySidenav').css('width') === '100px') {
    $('#mySidenav').css('a');
  }
});

const Logout = ()=>{
  localStorage.removeItem('Admtoken');
}

function Dashboard() {

  const location = useLocation();


  return (
    <div className='App'>
      <ToastContainer/>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div>
            <span id="mobile-three-line-collapse">&#9776;</span>
            <div className="dashboard-sidenav-section" id="mySidenav">
              <nav
                id="sidebar"
                className="col-md-12 col-lg-12 d-md-block sidebar component-navbar"
              >
                <div className="d-flex flex-row">
                  <div className="ms-auto me-3">
                    <span id="mobile-close-collapse"><GrClose />
                    </span>
                  </div>
                </div>

                <div className="d-flex flex-row pt-2 mb-2 text-center">
                  <div className="mx-auto  text-lign-center">
                    <a className="navbar-brand" href="/dashboard/domestic" style={{color:"#2b6d00",fontWeight:"bold"}}><img src={render}></img> Pitchu Daily Chit</a>
                  </div>
                </div>

                <div className="position-sticky">
                  <ul className="nav flex-column nav-pills">


                    {/* <li className="nav-item">
                      <a
                        className={`nav-link component-tabs ${location.pathname === "/dashboard/liquidity" ? "active" : ""
                          }`}
                        href="/dashboard/liquidity"
                      >
                        <MdWebAsset className="sidenav-icon-size-css" />Liquidity Pool
                      </a>
                    </li> */}
                    {/* <li className="nav-item">
                      <a
                        className={`nav-link component-tabs ${location.pathname === "/dashboard/form" ? "active" : ""
                          }`}
                        href="/dashboard/form"
                      >
                        <FaWpforms className="sidenav-icon-size-css" />Forms
                      </a>
                    </li> */}


                  


                    {/* <li className="nav-item">
                      <a
                        className={`nav-link component-tabs ${location.pathname === "/dashboard/my-crypto-wallet" ? "active" : ""
                          }`}
                        href="/dashboard/my-crypto-wallet"
                      >
                        <RiWallet3Fill className="sidenav-icon-size-css" /> My Crypto wallet
                      </a>
                    </li> */}

                    {/* <li className="nav-item">
                      <a
                        className={`nav-link component-tabs ${location.pathname === "/dashboard/my-asset-transaction" ? "active" : ""
                          }`}
                        href="/dashboard/my-asset-transaction"
                      >
                        <RiExchangeDollarLine className="sidenav-icon-size-css" /> My Asset Transaction
                      </a>
                    </li> */}

                    {/* <li className="nav-item">
                      <a
                        className={`nav-link component-tabs ${location.pathname === "/dashboard/my-crypto-transaction" ? "active" : ""
                          }`}
                        href="/dashboard/my-crypto-transaction"
                      >
                        <FaListAlt className="sidenav-icon-size-css" /> My Crypto Transaction
                      </a>
                    </li> */}

                    {/* <li className="nav-item">
                      <a
                        className={`nav-link component-tabs ${location.pathname === "/dashboard/trade-hisory" ? "active" : ""
                          }`}
                        href="/dashboard/trade-hisory"
                      >
                        <PiClockClockwiseBold className="sidenav-icon-size-css" /> Orders History
                      </a>
                    </li> */}

                    {/* <li className="nav-item">
                      <a
                        className={`nav-link component-tabs ${location.pathname === "/dashboard/security" ? "active" : ""
                          }`}
                        href="/dashboard/security"
                      >0..............................................................................

                        <AiOutlineSecurityScan className="sidenav-icon-size-css" /> Security
                      </a>
                    </li> */}

                     <li className="nav-item">
                      <a
                        className={`nav-link component-tabs ${location.pathname === "/dashboard/domestic" ? "active" : ""
                          }`}
                        href="/dashboard/domestic"
                      >

                        <AiOutlineSecurityScan className="sidenav-icon-size-css" /> Domestic
                      </a>
                    </li>

                     <li className="nav-item">
                      <a
                        className={`nav-link component-tabs ${location.pathname === "/dashboard/international" ? "active" : ""
                          }`}
                        href="/dashboard/international"
                      >

                        <AiOutlineSecurityScan className="sidenav-icon-size-css" /> International
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className={`nav-link component-tabs ${location.pathname === "/dashboard/plan" ? "active" : ""
                          }`}
                        href="/dashboard/plan"
                      >

                        <AiOutlineSecurityScan className="sidenav-icon-size-css" /> Plan
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className={`nav-link component-tabs ${location.pathname === "/dashboard/support" ? "active" : ""
                          }`}
                        href="/dashboard/support"
                      >

                        <AiOutlineSecurityScan className="sidenav-icon-size-css" /> Support
                      </a>
                    </li>
                 


                    <li className="nav-item">
                      <a
                        className="nav-link component-tabs"
                        href="/" 
                        onClick={Logout}
                      >
                        <IoMdLogOut  className="sidenav-icon-size-css" /> Logout
                      </a>
                    </li>


                  </ul>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <main className="col-md-12 ms-sm-auto col-lg-10 px-md-4 ">
            {/* {location.pathname === "/dashboard/domestic" && <Profile />}
            {location.pathname === "/dashboard/my-crypto-wallet" && <Cryptowalllet />}
            {location.pathname === "/dashboard/my-asset-transaction" && <Myassettransaction />}
            {location.pathname === "/dashboard/my-crypto-transaction" && <Cryptotransaction />}
            {location.pathname === "/dashboard/trade-hisory" && <Tradehistory />}
            {location.pathname === "/dashboard/security" && <Googleauthenticator />}
            {location.pathname === "/dashboard/reedemorder" && <Reedemorder />} */}
             {location.pathname === "/dashboard/domestic" && <Domestic />} 
             {location.pathname === "/dashboard/international" && <International />} 
             {location.pathname === "/dashboard/plan" && <Plan />} 
             {location.pathname === "/dashboard/support" && <Support />} 
          </main>
        </div>
      </div>
    </div>
  )
}

export default Dashboard