'use client';
import { StepOne , StepTwo} from "@/components";
import { useState } from "react";

export default function Home() {
  const [page,setPage] = useState(2)
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#F4F4F4] ">
      {page==1&&(<StepOne/>)}
      {page==2&&(<StepTwo/>)}
    </div>
  );
}
