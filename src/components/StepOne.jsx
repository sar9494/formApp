"use client";

import { Header, InputBox, ContinueButton } from "./index";
import { useEffect, useState } from "react";
import { motion } from "motion/react"

export const StepOne = (props) => {
  const { step, setStep } = props;
  const [formValue, setFormValue] = useState(() => {
    return JSON.parse(localStorage.getItem("stepOne") || "{}");
  });
  const [errors, setErrors] = useState({});
  const check = /^[a-zA-Z]+$/;

  useEffect(() => {
    localStorage.setItem("stepOne", JSON.stringify(formValue));
  }, [formValue]);

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
  };

  const checkValue = () => {
    let newErrors = {};
    if (!formValue.firstname || !check.test(formValue.firstname)) {
      newErrors.firstname = "Нэрээ оруулна уу";
    }

    if (!formValue.lastname || !check.test(formValue.lastname)) {
      newErrors.lastname = "Овгоо оруулна уу.";
    }

    if (!formValue.username) {
      newErrors.username = "Хэрэглэгчийн нэрээ оруулна уу";
    }

    setErrors(newErrors);
    Object.keys(newErrors).length == 0 && setStep(2);
  };

  return (
    <motion.div className="w-[480px] h-[655px] bg-white rounded-xl flex flex-col gap-4 justify-between p-8 w3-animation-top"
    animate={{ x: [0, 100, 0] }}>
      <div key={1} className="flex flex-col gap-4 mx-auto">
        <Header />
        <div key={1} className="flex flex-col gap-2">
          <InputBox
            texts={{text:"First name", placeholder:"Your first name", type:"text"}}
            onChange={onChange}
            value={formValue.firstname||""}
            errors={errors.firstname}
          />
          <p className="text-red-500">{errors?.firstname}</p>
          <InputBox
          texts={{text:"Last name", placeholder:"Your last name", type:"text"}}
            onChange={onChange}
            value={formValue.lastname||""}
            errors={errors.lastname}
          />
          <p className="text-red-500">{errors?.lastname}</p>
          <InputBox
          texts={{text:"Username", placeholder:"Your username", type:"text"}}
            onChange={onChange}
            value={formValue.username||""}
            errors={errors.username}
          />
          <p className="text-red-500">{errors?.username}</p>
        </div>
      </div>
      <ContinueButton onClick={checkValue} text={"Continue 1/3"} />
    </motion.div>
  );
};
