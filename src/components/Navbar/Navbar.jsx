import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { Brands } from "./BrandData";
import UserForm from "./UserForm";
import "./Navbar.css";
import "./NavbarResponsive.css";
import ModalAccount from "./ModalAccount";
import logo from "../../assets/images/logo.png";

import {
  addNavFindFilter,
  deleteNavFindFilter,
  resetFilter,
  addBrandFilter,
  deleteBrandFilter,
} from "../../features/productArrangeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectCustomer } from "../../features/customerSlice";

Modal.setAppElement("#root");

function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const [navbarMobile, setNavbarMobile] = useState(false);
  const [inputSearch, setInputSearch] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const customerState = useSelector(selectCustomer);

  const isLoggedIn = customerState != null;

  const dispatch = useDispatch();
  const history = useHistory();

  // change navbar background when scroll
  const changeNavbar = () => {
    if (window.scrollY >= 65) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeNavbar);

  function handleSearchValue(e) {
    const value = e.target.value;
    setSearchValue(value);
  }

  function handleSearchKeyUp(e) {
    if (e.keyCode === 13) {
      dispatch(deleteNavFindFilter());
      dispatch(resetFilter());

      dispatch(
        addNavFindFilter({
          navFind: `${searchValue}&name[options]=i`,
        })
      );

      if (searchValue !== "") {
        history.push("/product/find/" + searchValue);
      }

      setSearchValue("");
    }
  }

  function handleSearchByClick() {
    dispatch(deleteNavFindFilter());
    dispatch(resetFilter());

    dispatch(
      addNavFindFilter({
        navFind: `${searchValue}&name[options]=i`,
      })
    );

    if (searchValue !== "") {
      history.push("/product/find/" + searchValue);
    }

    setSearchValue("");
  }

  function handleNavBrand(navigationBrand) {
    let FilterBrand = "";
    switch (navigationBrand) {
      case "/product/Nike":
        FilterBrand = "Nike";
        break;
      case "/product/Adidas":
        FilterBrand = "Adidas";
        break;
      case "/product/Puma":
        FilterBrand = "Puma";
        break;
      case "/product/Jordan":
        FilterBrand = "Jordan";
        break;
      case "/product/NewBalance":
        FilterBrand = "NewBalance";
        break;
      case "/product/Converse":
        FilterBrand = "Converse";
        break;
      default:
    }

    dispatch(resetFilter());
    dispatch(
      addBrandFilter({
        brand: FilterBrand,
      })
    );

    history.push(navigationBrand);
    
    setNavbarMobile(false)
  }

  function navigationMainProduct() {
    dispatch(resetFilter());

    history.push("/product");

    setNavbarMobile(false)
  }

  function handleOpenModal(state) {
    setModalIsOpen(state);
  }

  return (
    <>
      <div
        className={
          navbar ? "header__container navbar-on-scroll" : "header__container"
        }
      >
        <div
          className="mobile-menu-icon"
          onClick={() => setNavbarMobile(!navbarMobile)}
        >
          {navbarMobile ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </div>

        <h3 className="header__logo">
          <Link to="/">
            <img className="header__logo-brand" src={logo} alt="brand logo" />
          </Link>
        </h3>

        <ul
          className={navbarMobile ? "header__navbar-mobile" : "header__navbar"}
        >
          <li className="header__navbar-item">
            <Link to="/">
              <p onClick={() => setNavbarMobile(false)} >Home</p>
            </Link>
          </li>

          <li className="header__navbar-item" id="navbar__product">
            <p onClick={navigationMainProduct}>Product</p>
            <i className="fas fa-chevron-right navbar__product-icon"></i>

            <div className="navbar__product-dropdown invisible">
              {Brands.map((item, index) => {
                return (
                  <div className="navbar__product-container" key={index}>
                    <li
                      className="navbar__product-item"
                      onClick={() => {
                        handleNavBrand(item.path);
                      }}
                    >
                      <img
                        className="navbar__product-item__img"
                        src={item.logo}
                        alt="brand-logo"
                      />
                      <h4>{item.title}</h4>
                    </li>
                  </div>
                );
              })}
            </div>
          </li>

          <li className="header__navbar-item">
            <Link to="/contact">
              <p onClick={() => setNavbarMobile(false)}>Contact</p>
            </Link>
          </li>

          <li className="header__navbar-item">
            <Link to="/about-us">
              <p onClick={() => setNavbarMobile(false)}>About</p>
            </Link>
          </li>
        </ul>

        <div className="header__btn-container">
          <div
            className={
              navbar
                ? "header__search-container search-on-scroll"
                : "header__search-container"
            }
          >
            <i
              className="far fa-search header__btn-search"
              onClick={() => {
                setInputSearch(!inputSearch);

                if (inputSearch === true && searchValue !== "") {
                  handleSearchByClick();
                }
              }}
            ></i>
            {/* INPUT */}
            <input
              className={
                inputSearch
                  ? "header__input-search appear"
                  : "header__input-search"
              }
              type="text"
              placeholder="Search something..."
              value={searchValue}
              onChange={handleSearchValue}
              onKeyUp={handleSearchKeyUp}
            />
            {/* --------------------------------- */}
          </div>
          <Link to="/cart">
            <i className="far fa-shopping-cart cart-btn"></i>
          </Link>
          <div className="header__btn-login">
            {isLoggedIn ? (
              <ModalAccount />
            ) : (
              <i className="far fa-user" onClick={() => setModalIsOpen(true)} />
            )}
            <Modal
              className="ModalReact__Content"
              overlayClassName="ModalReact__Overlay"
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              // onAfterOpen={() => { document.body.style.overflow = 'hidden' }}
              // onAfterClose={() => { document.body.style.overflow = 'visible' }}
            >
              <UserForm handleOpen={handleOpenModal}></UserForm>
              <a
                href="javascript:void(0)"
                className="close_btn"
                onClick={() => setModalIsOpen(false)}
              >
                x
              </a>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
