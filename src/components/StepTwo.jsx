'use client'
import {useState} from 'react'
import { Header, InputBox, ContinueButton } from "./index";
const INPUTS = [
    { text: "Email ", placeholder: "Your email" },
    { text: "Phone number ", placeholder: "Your phone number" },
    { text: "Password ", placeholder: "Your password" },
    { text: "Confirm password ", placeholder: "Confirm password" },
  ]

export const StepTwo = () =>{
    const [formValue,setFormValue] = useState([])
        const [errors,setErrors] = useState([])
        const check =/^[a-zA-Z]+$/ ;
    
        const onChange = (e) => {
            if (e.target.placeholder.includes("email")) {
                setFormValue({...formValue,email:e.target.value})
            }
            if (e.target.placeholder.includes("phone")) {
                setFormValue({...formValue,phone:e.target.value})
            }
            if (e.target.placeholder.includes("firm")) {
                setFormValue({...formValue,confirm:e.target.value})
            }else if (e.target.placeholder.includes("password")) {
                setFormValue({...formValue,pass:e.target.value})
            }
            
            console.log(formValue);
        }
    
        const checkValue = () => {
            let newErrors = {};
        
            // Validate each field and add errors if necessary
            if (!formValue.email || !check.test(formValue.email)) {
              newErrors.email = "Мэйл хаягаа оруулна уу";
            }
        
            if (!formValue.phone || !check.test(formValue.phone)) {
              newErrors.phone = "Утасны дугаараа оруулна уу.";
            }
        
            if (!formValue.pass) {
              newErrors.pass = "Нууц үгээ оруулна уу";
            }
            if (!formValue.confirm||formValue.confirm) {
                newErrors.confirm = "Нууц үгээ давтаж оруулна уу";
              }
        
            setErrors(newErrors);
          };

    return (
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
                                if (el.placeholder.toLocaleLowerCase().includes(each)) {
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