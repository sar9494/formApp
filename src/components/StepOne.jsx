"use client";

import { Header, InputBox, ContinueButton } from "./index";
import { useState } from "react";

const INPUTS = [
  { text: "First name ", placeholder: "Your first name" },
  { text: "Last name ", placeholder: "Your last name" },
  { text: "Username ", placeholder: "Your username" },
];

export const StepOne = (props) => {
  const { step, setStep } = props;
  const [formValue, setFormValue] = useState([]);
  const [errors, setErrors] = useState([]);
  const check = /^[a-zA-Z]+$/;

  const onChange = (e) => {
    if (e.target.placeholder.includes("first")) {
      setFormValue({ ...formValue, firstname: e.target.value });
    }
    if (e.target.placeholder.includes("last")) {
      setFormValue({ ...formValue, lastname: e.target.value });
    }
    if (e.target.placeholder.includes("user")) {
      setFormValue({ ...formValue, username: e.target.value });
    }
    console.log(formValue);
  };

  const checkValue = () => {
    let newErrors = {};

    // Validate each field and add errors if necessary
    if (!formValue.firstname || !check.test(formValue.firstname)) {
      newErrors.first = "Нэрээ оруулна уу";
    }

    if (!formValue.lastname || !check.test(formValue.lastname)) {
      newErrors.last = "Овгоо оруулна уу.";
    }

    if (!formValue.username) {
      newErrors.user = "Хэрэглэгчийн нэрээ оруулна уу";
    }

    setErrors(newErrors);
    Object.keys(newErrors).length==0&&setStep(2)
    
  };

  return (
    <div className="w-[480px] h-[655px] bg-white rounded-xl flex flex-col gap-4 justify-between p-8">
      <div key={1} className="flex flex-col gap-4 mx-auto">
        <Header />
        <div key={1} className="flex flex-col gap-2">
          {INPUTS.map((el, index) => (
            <div key={index}>
              <InputBox
                text={el.text}
                placeholder={el.placeholder}
                onChange={onChange}
                value={el.text}
                type={"text"}
              />
              {Object.keys(errors).map((each) => {
                // Check if the current error key matches the input field
                if (el.placeholder.includes(each)) {
                  return (
                    <p key={each} className="text-red-500">
                      {errors[each]}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>
      </div>
      <ContinueButton onClick={checkValue} text={"Continue 1/3"}/>
    </div>
  );
};
