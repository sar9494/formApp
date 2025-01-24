"use client";
import { useState ,useEffect} from "react";
import { Header, InputBox, ContinueButton, BackButton } from "./index";
import { motion } from "motion/react"


export const StepTwo = (props) => {
  const { step, setStep } = props;
  const [formValue, setFormValue] = useState(()=>{
    return JSON.parse(localStorage.getItem("stepTwo")||"{}")
  });
  const [errors, setErrors] = useState({});
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
      setFormValue({ ...formValue, password: e.target.value });
    }
  };

  useEffect(()=>{
    localStorage.setItem("stepTwo",JSON.stringify(formValue))
    console.log(formValue);
    
  },[formValue])
  const checkValue = () => {
    let newErrors = {};
     
    if (!formValue.email) {
      newErrors.email = "Мэйл хаягаа оруулна уу";
    } else if (!checkEmail.test(formValue.email)) {
      newErrors.email = "Зөв мэйл хаягаа оруулна уу";
    }

    if (!formValue.phone ) {
      newErrors.phone = "Утасны дугаараа оруулна уу.";
    } else if (formValue.phone.length != 8) {
      newErrors.phone = "Зөв утасны дугаараа оруулна уу.";
    }

    if (!formValue.password) {
      newErrors.password = "Нууц үгээ оруулна уу";
    } else if (
      !formValue.password.length >= 6 ||
      !checkPassword.test(formValue.password)
    ) {
      newErrors.password = "Үсэг тоо агуулсан 6 орон оруулна уу";
    }

    if (!formValue.confirm) {
      newErrors.confirm = "Нууц үгээ давтаж оруулна уу";
    }else if(formValue.confirm != formValue.password){
      newErrors.confirm = "Нууц үг таарахгүй байна.";
    }

    setErrors(newErrors);
    Object.keys(newErrors).length == 0 && setStep(3);
    console.log(newErrors);
    
  };

  return (
    <motion.div className="w-[480px] h-fit bg-white rounded-xl flex flex-col gap-4 justify-between p-8 w3-animation-top"
    animate={{ x: [0, 100, 0] }}>
      <div className="flex flex-col gap-4 mx-auto">
        <Header />
        <div className="flex flex-col gap-2">
        <InputBox
            texts={{text:"Email", placeholder:"Your email", type:"email"}}
            onChange={onChange}
            value={formValue.email||""}
            errors={errors.email}
          />
          <p className="text-red-500">{errors.email}</p>
          <InputBox
            texts={{text:"Phone number", placeholder:"Your phone number", type:"number"}}
            onChange={onChange}
            value={formValue.phone||""}
            errors={errors.phone}
          />
          <p className="text-red-500">{errors.phone}</p>
          <InputBox
            texts={{text:"Password", placeholder:"Your password", type:"password"}}
            onChange={onChange}
            value={formValue.password||""}
            errors={errors.password}
          />
          <p className="text-red-500">{errors?.password}</p>
          <InputBox
            texts={{text:"Confirm password", placeholder:"Your confirm password", type:"password"}}
            onChange={onChange}
            value={formValue.confirm||""}
            errors={errors.confirm}
          />
          <p className="text-red-500">{errors?.confirm}</p>
        </div>
      </div>
      <div className="flex gap-[10px]">
        <BackButton step={step} setStep={setStep} />
        <ContinueButton onClick={checkValue} text={"Continue 2/3"} />
      </div>
    </motion.div>
  );
};
