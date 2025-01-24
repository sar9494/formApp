"use client";

import { useState , useEffect} from "react";
import moment from "moment";
import { motion } from "motion/react"

import {
  Header,
  ContinueButton,
  BackButton,
  ImageInputIcon,
  BackIcon,
} from "./index";

export const StepThree = (props) => {
  const { step, setStep } = props;
  const [formValue, setFormValue] = useState(() => {
    return JSON.parse(localStorage.getItem("stepThree") || "{}");
  });
  const [errors, setErrors] = useState({});

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
      else{
        localStorage.setItem("date",formValue.date)
      }
    }
    if(!formValue.profile){
      newError.profile="Профайл зурагаа оруулна уу"
    }
    setErrors(newError);
    Object.keys(newError).length == 0 && setStep(4); 
    Object.keys(newError).length == 0 && localStorage.clear();
  };
  const backIconClick = () => {
    setFormValue({ ...formValue, profile: "" });
  };

  useEffect(()=>{
    localStorage.setItem("stepThree",JSON.stringify(formValue))
  },[formValue])

  return (
    <motion.div className="w-[480px] h-[655px] bg-white rounded-xl flex flex-col gap-4 justify-between p-8"
    animate={{ x: [0, 100, 0] }}>
      <div className="flex flex-col gap-4 mx-auto">
        <Header />
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="date">
            Date of birth <b className="text-red-500">*</b>
          </label>
          <input
            type="date" //"p-3 outline-blue-600 border rounded-md"
            className={!errors?.date?("p-3 outline-blue-600 border rounded-md") :("p-3 border-red-500 border rounded-md w3-animation-top")}
            name="date"
            onChange={onChange}
            value={formValue.date||""}
            
          />
          <p className="text-red-500">{errors?.date}</p>
          <div className="">
            <label className="font-semibold">
              Profile image <b className="text-red-500">*</b>
            </label>
            {formValue?.profile && (
              <div
                name="profile"
                className="cursor-pointer w-[416px] h-[180px] bg-[#F4F4F4] rounded-md flex flex-col justify-center items-center relative"
              >
                <img
                  src={formValue.profile}
                  className="w-full h-full rounded-md object-cover"
                ></img>
                <BackIcon
                  className="absolute top-[20px] right-[20px]"
                  onClick={backIconClick}
                />
              </div>
            )}
            {!formValue?.profile && (
              <>
              <label
                name="profile"
                className="cursor-pointer w-[416px] h-[180px] bg-[#F4F4F4] rounded-md flex flex-col justify-center items-center relative"
              >
                <ImageInputIcon />
                <h3>Browse or Drop Image</h3>
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  name="profile"
                  onChange={onChange}
                />
              </label>
                <p className="text-red-600">{errors?.profile}</p>
              </>
              
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-[10px]">
        <BackButton step={step} setStep={setStep} />
        <ContinueButton text={"Continue 3/3"} onClick={checkValue} />
      </div>
    </motion.div>
  );
};
//local storage
