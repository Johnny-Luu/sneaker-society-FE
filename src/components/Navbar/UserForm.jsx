import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserForm.css";
import sneaker from "../../assets/images/logo.png";
import recover from "../../assets/icons/recover.png";
import register from "../../assets/icons/register.jpg";
import {
  getCustomerLogin,
  getCustomerByEmail,
  createCustomerAccount,
} from "../../api/customerAPI";
import { getCurrent } from "../../api/cartAPI";
import { getFavourites } from "../../api/favouriteAPI";
import { login } from "../../features/customerSlice";
import { initFavouriteList } from "../../features/favouriteSlice";
import { initCartList } from "../../features/cartSlice";
import ToastMessage from "../ToastMessage/ToastMessage";
import { createFavouriteList } from "../../api/favouriteAPI";

function UserForm({ handleOpen }) {
  const [loginDisplay, setLoginDisplay] = useState("block");
  const [registerDisplay, setRegisterDisplay] = useState("none");
  const [recoverDisplay, setRecoverDisplay] = useState("none");

  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    getCustomerLogin(emailLogin, passwordLogin).then((customer) => {
      if (customer) {
        // Dispatch customer's data to redux
        dispatch(
          login({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            gender: customer.gender,
            phone: customer.phone,
            address: customer.address,
          })
        );

        // HANDLE UI UPDATE WHEN LOGIN SUCCESS HERE
        ToastMessage("success", "Logged in successfully!");

        // get favourite list of logged in user and dispatch to redux
        dispatchFavouriteList(customer._id);

        // get current cart of logged in user and dispatch to redux
        dispatchCartList(customer._id);

        handleOpen(false);
      } else {
        // HANDLE LOGIN FAIL HERE
        ToastMessage("error", "Login failed!");
      }
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    getCustomerByEmail(emailSignup)
      .then((customer) => {
        if (customer) {
          ToastMessage("error", "Customer already exists!");
        } else {
          createCustomerAccount(emailSignup, passwordSignup).then((res) => {
            ToastMessage("success", "Sign up successfully!");
            console.log(res);

            // find customer has just created by email
            getCustomerByEmail(emailSignup).then((customer) => {
              // create favourite list for new customer
              createFavouriteList(customer._id);
            });
          });
          SetFormDisplay("Login");
        }
      })
      .catch((err) => {
        ToastMessage("error", "Something went wrong!");
        console.log(err);
      });
  };

  const dispatchFavouriteList = (customerID) => {
    getFavourites(customerID).then((res) => {
      if (res) {
        dispatch(initFavouriteList(res.productIDs));
      }
    });
  };

  const dispatchCartList = (customerID) => {
    getCurrent(customerID).then((res) => {
      if (res) {
        let list = [];

        res.products.forEach((product) => {
          list.push(product.id);
        });

        dispatch(initCartList(list));
      }
    });
  };

  function SetFormDisplay(form) {
    setLoginDisplay("none");
    setRecoverDisplay("none");
    setRegisterDisplay("none");
    switch (form) {
      case "Login":
        setLoginDisplay("block");
        break;
      case "Register":
        setRegisterDisplay("block");
        break;
      case "Recover":
        setRecoverDisplay("block");
        break;
    }
  }

  return (
    <>
      <div className="user_form text-center justify-center text_default">
        <div
          className="form_login_popup form"
          style={{ display: `${loginDisplay}` }}
        >
          <div className="logo_login_form logo">
            <img src={sneaker} alt="brand logo"></img>
          </div>
          <h2 className="greeting_login">Great to have you back!</h2>
          <form className="login_form">
            <input
              type="text"
              className="mb-1"
              id="Email_Address"
              placeholder="Email Address"
              required
              value={emailLogin}
              onChange={(e) => setEmailLogin(e.target.value)}
            ></input>
            <input
              type="password"
              className="mb-1"
              id="Password"
              placeholder="Password"
              required
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
            ></input>
            <a
              className="recover_form_change"
              href="javascript:void(0)"
              onClick={() => SetFormDisplay("Recover")}
            >
              Forget your password?{" "}
            </a>
            <input
              type="submit"
              className="btn"
              value="SIGN IN"
              onClick={(e) => handleLogin(e)}
            ></input>
            <div className="register_form_change">
              <span>Don't have an account? </span>
              <a
                href="javascript:void(0)"
                onClick={() => SetFormDisplay("Register")}
              >
                Register now{" "}
              </a>
              {/* <i className='arrow-right'>
                            ::before
                        </i> */}
            </div>
          </form>
        </div>
        <div
          className="form_register_popup form"
          style={{ display: `${registerDisplay}` }}
        >
          <div className="logo_register_form logo">
            <img src={register}></img>
          </div>
          <h2 className="title_register">REGISTER</h2>
          <form className="register_form">
            <input
              type="text"
              className="mb-1"
              id="Email_Address"
              placeholder="Email Address"
              required
              value={emailSignup}
              onChange={(e) => setEmailSignup(e.target.value)}
            ></input>
            <input
              type="password"
              className="mb-1"
              id="Password"
              placeholder="Password"
              required
              value={passwordSignup}
              onChange={(e) => setPasswordSignup(e.target.value)}
            ></input>
            <input
              type="submit"
              className="btn"
              value="REGISTER"
              onClick={(e) => handleSignup(e)}
            ></input>
            <div className="sign_up_form_change">
              <a
                href="javascript:void(0)"
                onClick={() => SetFormDisplay("Login")}
              >
                Cancel{" "}
              </a>
            </div>
          </form>
        </div>
        <div
          className="form_recover_popup form"
          style={{ display: `${recoverDisplay}` }}
        >
          <div className="logo_recover_form logo">
            <img src={recover}></img>
          </div>
          <h2 className="title_recover">RESET YOUR PASSWORD</h2>
          <form>
            <input
              type="text"
              id="Email_Address"
              placeholder="Email Address"
              required
            ></input>
            <input type="submit" className="btn" value="SUBMIT"></input>
            <div className="sign_up_form_change">
              <a
                href="javascript:void(0)"
                onClick={() => SetFormDisplay("Login")}
              >
                Cancel{" "}
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserForm;
