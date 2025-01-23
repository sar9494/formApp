"use client";

import { useState, useEffect } from "react";
import moment from "moment";
import {
  Header,
  ContinueButton,
  BackButton,
  ImageInputIcon,
  BackIcon,
} from "./index";

export const StepThree = (props) => {
  const { step, setStep } = props;
  const [formValue, setFormValue] = useState({});
  const [errors, setErrors] = useState({});
  const [isClick, setIsClick] = useState(true);

  const onChange = (e) => {
    const { name, type, value, files } = e.target;
    if (name == "date") {
      setFormValue({ ...formValue, date: value });
      setErrors({});
    }

    if (name === "profile" && type === "file") {
      const file = files[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        setFormValue({ ...formValue, profile: fileUrl });
        setIsClick(false);
      }
    }
  };
  const checkValue = () => {
    let newError = {};
    if (!formValue.date) {
      newError.date = "Төрсөн өдрөө оруулна уу";
    } else {
      const year = parseInt(
        moment(formValue.date.split("-").join(""), "YYYYMMDD")
          .fromNow()
          .split(" ")[0]
      );
      if (year < 18) {
        newError.date = "Та 18 ба түүнээс дээш настай байх ёстой.";
      }
    }
    setErrors(newError);
    Object.keys(newError).length == 0 && setStep(4);
  };
  const backIconClick = () => {
    setFormValue({...formValue,profile:""})
    setIsClick(true)
  }

  return (
    <div className="w-[480px] h-[655px] bg-white rounded-xl flex flex-col gap-4 justify-between p-8">
      <div className="flex flex-col gap-4 mx-auto">
        <Header />
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="date">
            Date of birth <b className="text-red-500">*</b>
          </label>
          <input
            type="date"
            className="p-3 outline-blue-600 border rounded-md"
            name="date"
            onChange={onChange}
          />
          <p className="text-red-500">{errors?.date}</p>
          <div className="">
            <label className="font-semibold">
              Profile image <b className="text-red-500">*</b>
            </label>
            <label
              name="profile"
              className="cursor-pointer w-[416px] h-[180px] bg-[#F4F4F4] rounded-md flex flex-col justify-center items-center relative"
            >
              {formValue.profile && (
                <>
                  <img
                    src={formValue.profile}
                    className="w-full h-full rounded-md"
                  ></img>
                  <BackIcon className="absolute top-[20px] right-[20px]" onClick={backIconClick} />
                </>
              )}
              {!formValue.profile &&isClick && (
                <>
                  <ImageInputIcon />
                  <h3>Browse or Drop Image</h3>
                  <input
                  hidden
                  type="file"
                  accept="image/*"
                  name="profile"
                  onChange={onChange}
                />
                </>
              )}
            </label>
          </div>
        </div>
      </div>
      <div className="flex gap-[10px]">
        <BackButton step={step} setStep={setStep} />
        <ContinueButton text={"Continue 3/3"} onClick={checkValue} />
      </div>
    </div>
  );
};
//local storage
