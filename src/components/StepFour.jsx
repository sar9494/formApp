import {Logo} from "./index"
import { motion } from "motion/react"

export const StepFour = () => {
  return <motion.div className="w3-animation-top w-[480px] h-fit bg-white rounded-xl flex flex-col gap-4 justify-between p-8"
  animate={{ x: [-100,0] }}>
        <div className="flex flex-col gap-4 mx-auto">
          <div className="w-[400px] h-fit bg-gray-400 rounded-xl bg-white flex flex-col gap-2.5">
                      <Logo/>
                      <p className="text-3xl font-bold">You're All Set! 🔥</p>
                      <p className="text-[#8E8E8E] font-normal text-[18px]">We've received your submission. Thank you!</p>
                  </div>
        </div>
      </motion.div>
};
