import React, { useState } from "react";
import style from "./MainPartInfo.module.css";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { selectCustomer } from "../../features/customerSlice";
import { update } from "../../features/customerSlice";
import { updateCustomerAccount } from "../../api/customerAPI";
import ToastMessage from "../ToastMessage/ToastMessage";

function MainPartInfo() {
  const dispatch = useDispatch();
  const customerState = useSelector(selectCustomer);
  console.log(customerState);

  // const [selectedDate, setSelectedDate] = useState(null);
  const [inputName, setInputName] = useState(customerState.name);
  const [inputPhoneNumber, setInputPhoneNumber] = useState(customerState.phone);
  const [inputAddress, setInputAddress] = useState(customerState.address);
  const [inputGender, setInputGender] = useState(customerState.gender);

  function handleNameChange(e) {
    setInputName(e.target.value);
  }

  function handlePhoneNumberChange(e) {
    setInputPhoneNumber(e.target.value);
  }

  function handleAddressChange(e) {
    setInputAddress(e.target.value);
  }

  function handleGender(e) {
    setInputGender(e.target.value);
  }

  function handleSave() {
    console.log("save");

    if (customerState != null) {
      dispatch(
        update({
          name: inputName,
          phone: inputPhoneNumber,
          address: inputAddress,
          gender: inputGender,
        })
      );

      updateCustomerAccount(
        customerState.id,
        inputGender,
        inputAddress,
        inputName,
        inputPhoneNumber
      );

      ToastMessage("success", "Update information successfully!");
    }
  }

  return (
    <div className={style.container}>
      <h1 className={style.h1}>Information</h1>
      <p>Manage information to protect your account</p>
      <hr />
      <table>
        <tr>
          <td className={style.rightAlign}>Email</td>
          <td>
            {customerState != null ? customerState.email : "email@gmail.com"}
          </td>
        </tr>
        <tr>
          <td className={style.rightAlign}>Full Name</td>
          <td>
            <input
              className={style.inputBox}
              type="text"
              value={inputName}
              onChange={handleNameChange}
            />
          </td>
        </tr>
        <tr>
          <td className={style.rightAlign}>Phone Number</td>
          <td>
            <input
              className={style.inputBox}
              type="tel"
              value={inputPhoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </td>
        </tr>
        <tr>
          <td className={style.rightAlign}>Address</td>
          <td>
            <input
              className={style.inputBox}
              type="text"
              value={inputAddress}
              onChange={handleAddressChange}
            />
          </td>
        </tr>
        <tr>
          <td className={style.rightAlign}>Gender</td>
          <td>
            <input
              className="w3-radio"
              type="radio"
              name="gender"
              value="true"
              onChange={handleGender}
              checked={inputGender === true ? true : null}
            />
            <label> Male </label>
            <input
              className="w3-radio"
              type="radio"
              name="gender"
              value="false"
              onChange={handleGender}
              checked={inputGender === false ? true : null}
            />
            <label> Female </label>
          </td>
        </tr>
        {/* <tr>
          <td className={style.rightAlign}>Day of Birth</td>
          <td>
            <DatePicker
              className={style.date}
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
            />
          </td>
        </tr> */}
        <tr>
          <td></td>
          <td>
            <div onClick={handleSave} className={style.button}>
              Save
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default MainPartInfo;
