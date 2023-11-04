'use client'
import ThreeScene from "../components/templates/ThreeScene";
import CustomText from "../components/atoms/CustomText";
import LoginForm from "@/components/organisms/LoginForm";
import { useState } from "react";
import RegisterForm from "@/components/organisms/RegisterForm";



export default function Home() {

  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false)


  return (
    <main className="overflow-hidden">
      <ThreeScene>
        <div className="absolute   overflow-x-hidden flex flex-col items-center w-full p-12 h-screen">
          <CustomText 
            text="Wave OS" 
            className="
            text-9xl font-bebas text-gray-200 -mt-8
            " 
          />
          <CustomText 
            text="Wave OS" 
            className="
            text-9xl font-bebas text-gray-200  -mt-10 mr-48
            " 
          />
          <CustomText 
            text="Wave OS" 
            className="
            text-9xl font-bebas text-gray-200 -mt-10 ml-48
            " 
          />
          <CustomText 
            text="Wave OS" 
            className="
            text-9xl font-bebas text-gray-200  -mt-10 mr-48
            " 
          />
          <CustomText 
            text="Wave OS" 
            className="
            text-9xl font-bebas text-gray-200 -mt-10 ml-48
            " 
          />
          <CustomText 
            text="Wave OS" 
            className="
            text-9xl font-bebas text-gray-200  -mt-10 mr-48
            " 
          />
          <CustomText 
            text="Wave OS" 
            className="
            text-9xl font-bebas text-gray-200 -mt-10 ml-48
            " 
          />
          <CustomText 
            text="Wave OS" 
            className="
            text-9xl font-bebas text-gray-200  -mt-10 mr-48
            " 
          />
          <CustomText 
            text="Wave OS" 
            className="
            text-9xl font-bebas text-gray-200 -mt-10 ml-48
            " 
          />
          <CustomText 
            text="Wave OS" 
            className="
            text-9xl font-bebas text-gray-200 -mt-10
            " 
          />
          {
            isRegisterFormOpen && (
              <RegisterForm
                onSubmit={() => {}}
                onClosed={() => {
                  setIsRegisterFormOpen(false)
                }}
                closed={!isRegisterFormOpen}
              />
            )
          }
          <LoginForm
            onOpenRegisterForm={() => {
              setIsRegisterFormOpen(true)
            }}
            onSubmit={() => {
              console.log("login")
            }}
          />
        </div>
      </ThreeScene>
    </main>
  )
}
