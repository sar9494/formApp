'use client';

import { Header, InputBox, ContinueButton } from "./index";
import { useState } from "react";

const INPUTS = [
    { text: "First name ", placeholder: "Your first name" },
    { text: "Last name ", placeholder: "Your last name" },
    { text: "Username ", placeholder: "Your username" },
  ]

export const StepOne = () => {
    const [formValue,setFormValue] = useState([])
    const [errors,setErrors] = useState([])
    const check =/^[a-zA-Z]+$/ ;

    const onChange = (e) => {
        if (e.target.placeholder.includes("first")) {
            setFormValue({...formValue,firstname:e.target.value})
        }
        if (e.target.placeholder.includes("last")) {
            setFormValue({...formValue,lastname:e.target.value})
        }
        if (e.target.placeholder.includes("user")) {
            setFormValue({...formValue,username:e.target.value})
        }
        console.log(formValue);
    }

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
      };
  
    return(
        <div className="w-[480px] h-[655px] bg-white rounded-xl flex flex-col gap-4 justify-between p-8">
        <div className="flex flex-col gap-4 mx-auto" >
          <Header/>
          <div className="flex flex-col gap-2">
            {
              INPUTS.map((el, index) => (<div>
                <InputBox text={el.text} placeholder={el.placeholder} key={index} onChange={onChange} />
                {
                    Object.keys(errors).map((each) => {
                        // Check if the current error key matches the input field
                        if (el.placeholder.includes(each)) {
                          return <p key={each} className="text-red-500">{errors[each]}</p>;
                        }
                        return null;
                      })
                }
              </div>
                
              ))
            }
          </div>
        </div>
        <ContinueButton onClick={checkValue}/>
      </div>
    )
}