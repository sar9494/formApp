'use client';
import { StepOne, StepTwo, StepThree ,StepFour} from "@/components";
import { useState } from "react";
export default function Home() {
  const [step, setStep] = useState(1)
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#F4F4F4]  ">
      {step == 1 && (<StepOne step={step} setStep={setStep} />)}
      {step == 2 && (<StepTwo step={step} setStep={setStep} />)}
      {step == 3 && (<StepThree step={step} setStep={setStep} />)}
      {step == 4 && (<StepFour step={step} setStep={setStep} />)}
    </div>
  );
}
