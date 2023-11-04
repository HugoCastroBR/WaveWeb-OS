import { Container } from "@mantine/core";
import ThreeScene from "./components/templates/ThreeScene";
import Scene from "./components/templates/ThreeScene";
import CustomButton from "./components/atoms/CustomWindowHeaderButton";
import CustomText from "./components/atoms/CustomText";
import CustomBox from "./components/organisms/CustomBox";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <ThreeScene>
        <div className="absolute  overflow-x-hidden flex flex-col items-end w-full p-12 h-screen">
          <CustomText 
            text="Welcome Friend" 
            className="
            text-8xl font-bebas bg-gradient-to-tl  pr-8
            from-pink-500 via-violet-500 to-blue-500
            text-transparent bg-clip-text
            drop-shadow-[0_4.0px_0.2px_rgba(0,0,0,0.8)]
            " 
          />
          <CustomBox />
        </div>
      </ThreeScene>
    </main>
  )
}
