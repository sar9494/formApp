"use client";

import { useState, useEffect } from "react";
import moment from "moment";
import { Header, ContinueButton, BackButton, ImageInputIcon } from "./index";

export const StepThree = (props) => {
  const { step, setStep } = props;
  const [formValue, setFormValue] = useState({});
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    if (e.target.name == "date") {
      setFormValue({ ...formValue, date: e.target.value });
      setErrors({});
    }
  };
  const checkValue = () => {
    let newError = {};
    if (!formValue.date) {
      newError.date = "Төрсөн өдрөө оруулна уу";
      console.log(newError);
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
    Object.keys(newError).length==0&&setStep(4)
  };
  //   useEffect(()=>{
  //     console.log(formValue);

  //     console.log(errors);
  //   },[formValue,errors])

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
          <div className="cursor-pointer ">
          <label className="font-semibold">
            Profile image <b className="text-red-500">*</b>
          </label>
          <div className="w-[416px] h-[180px] bg-[#F4F4F4] rounded-md flex flex-col justify-center items-center relative">
            <ImageInputIcon />
            <h3>Browse or Drop Image</h3>
          </div>
          <input hidden type="file" accept="image/*"/>
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
