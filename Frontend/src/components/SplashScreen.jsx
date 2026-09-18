import logo from "../assets/budgeting.gif";
import { AnimatedHeading } from "./AnimatedHeading";

const Splash= function(){
  return <div className="flex h-screen items-center justify-center bg-white">
  {/* your centered content */}
  <div className="flex items-center ">
        <img src={logo} alt="my logo" className="w-20 h-20" />
         <AnimatedHeading/>
  </div>
</div>

}
export default Splash;