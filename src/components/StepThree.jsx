"use client";

import { useState, useEffect } from "react";
import moment from "moment";
import { motion } from "motion/react";

import {
  Header,
  ContinueButton,
  BackButton,
  ImageInputIcon,
  BackIcon,
  InputBox,
} from "./index";

export const StepThree = (props) => {
  const { step, setStep } = props;
  const [formValue, setFormValue] = useState(() => {
    return JSON.parse(
      (typeof window !== "undefined" && localStorage.getItem("stepThree")) ||
        "{}"
    );
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, type, value, files } = e.target;
    if (e.target.name == "date") {
      setFormValue({ ...formValue, date: value });
      setErrors({...errors,date:""});
    }
    if (e.target.name === "profile" && e.target.type === "file") {
      const file = e.target.files[0];
      var reader = new FileReader();
  reader.onloadend = function() {
    setFormValue({ ...formValue, profile: reader.result });
  }
  reader.readAsDataURL(file);
      }
  };
  const checkValue = () => {
    let newError = {};
    if (!formValue.date) {
      newError.date = "Төрсөн өдрөө оруулна уу";
    } else if(formValue.date.length===0){
      newError.date = "Төрсөн өдрөө оруулна уу";
    }
    else {
      const year = parseInt(
        moment(formValue.date.split("-").join(""), "YYYYMMDD")
          .fromNow()
          .split(" ")[0]
      );
      if (year < 18) {
        newError.date = "Та 18 ба түүнээс дээш настай байх ёстой.";
      } else {
        localStorage.setItem("date", formValue.date);
      }
    }

    if (!formValue.profile) {
      newError.profile = "Профайл зурагаа оруулна уу";
    }
    setErrors(newError);
    Object.keys(newError).length == 0 && setStep(4);
    Object.keys(newError).length == 0 && localStorage.clear();
  };
  const backIconClick = () => {
    setFormValue({ ...formValue, profile: "" });
  };

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("stepThree", JSON.stringify(formValue));
  }, [formValue]);

  return (
    <motion.div
      className="w-[480px] h-fit bg-white rounded-xl flex flex-col gap-4 justify-between p-8"
      animate={{ x: [0, 100, 0] }}
    >
      <div className="flex flex-col gap-4 mx-auto">
        <Header />
        <div className="flex flex-col gap-2">
          <InputBox
            texts={{ text: "Date of birth", type: "date",name:"date"}}
            onChange={onChange}
            value={formValue.date || ""}
            errors={errors.date}
          />
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
