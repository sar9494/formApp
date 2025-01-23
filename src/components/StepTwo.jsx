"use client";
import { useState } from "react";
import { Header, InputBox, ContinueButton, BackButton } from "./index";
const INPUTS = [
  { text: "Email ", placeholder: "Your email", type: "email" },
  { text: "Phone number ", placeholder: "Your phone number", type: "number" },
  { text: "Password ", placeholder: "Your password", type: "password" },
  {
    text: "Confirm password ",
    placeholder: "Confirm password",
    type: "password",
  },
];

export const StepTwo = (props) => {
  const { step, setStep } = props;
  const [formValue, setFormValue] = useState([]);
  const [errors, setErrors] = useState([]);
  const checkPassword = /^(?=.*\d)(?=.*[a-zA-Z]).+$/;
  const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onChange = (e) => {
    if (e.target.placeholder.includes("email")) {
      setFormValue({ ...formValue, email: e.target.value });
    }
    if (e.target.placeholder.includes("phone")) {
      setFormValue({ ...formValue, phone: e.target.value });
    }
    if (e.target.placeholder.includes("firm")) {
      setFormValue({ ...formValue, confirm: e.target.value });
    } else if (e.target.placeholder.includes("password")) {
      setFormValue({ ...formValue, pass: e.target.value });
    }
  };

  const checkValue = () => {
    let newErrors = {};

    // Validate each field and add errors if necessary
    if (!formValue.email) {
      newErrors.mail = "Мэйл хаягаа оруулна уу";
    } else if (!checkEmail.test(formValue.email)) {
      newErrors.mail = "Зөв мэйл хаягаа оруулна уу";
    }

    if (!formValue.phone || formValue.phone.length != 8) {
      newErrors.number = "Утасны дугаараа оруулна уу.";
    } else if (formValue.phone.length != 8) {
      newErrors.number = "Зөв утасны дугаараа оруулна уу.";
    }

    if (!formValue.pass) {
      newErrors.Password = "Нууц үгээ оруулна уу";
    } else if (
      !formValue.pass.length >= 6 ||
      !checkPassword.test(formValue.pass)
    ) {
      newErrors.Password = "Үсэг тоо агуулсан 6 орон оруулна уу";
    }

    if (!formValue.confirm || formValue.confirm != formValue.pass) {
      newErrors.Confirm = "Нууц үгээ давтаж оруулна уу";
    }

    setErrors(newErrors);
    Object.keys(newErrors).length == 0 && setStep(3);
  };

  return (
    <div className="w-[480px] h-[655px] bg-white rounded-xl flex flex-col gap-4 justify-between p-8">
      <div className="flex flex-col gap-4 mx-auto">
        <Header />
        <div className="flex flex-col gap-2">
          {INPUTS.map((el, index) => (
            <div key={index}>
              <InputBox
                text={el.text}
                placeholder={el.placeholder}
                onChange={onChange}
                type={el.type}
              />
              {Object.keys(errors).map((each) => {
                // Check if the current error key matches the input field
                if (el.text.includes(each)) {
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
      <div className="flex gap-[10px]">
        <BackButton step={step} setStep={setStep} />
        <ContinueButton onClick={checkValue} text={"Continue 2/3"} />
      </div>
    </div>
  );
};
