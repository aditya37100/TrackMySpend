import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Buttonfornav } from "./Buttonfornav";
import { motion } from "framer-motion";
import logo from '../assets/budgeting.gif';

export function Navbar1({onGetstarted, onGetstarted2}){
    const navigate = useNavigate();
    
    return (
        <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="sticky top-0 z-50 bg-customLightGray/80 dark:bg-customDarkBlue/80 backdrop-blur-md border-b border-customLavender dark:border-custom1Blue"
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex items-center space-x-3"
                    >
                        <img src={logo} className="w-10 h-10" alt="TrackMySpend Logo" />
                        <span className="text-2xl font-bold text-customBlue">
                            TrackMySpend
                        </span>
                    </motion.div>

                    {/* Navigation Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex items-center space-x-4"
                    >
                        {/* <button 
                            onClick={onGetstarted}
                            className="px-6 py-2 text-customIndigoDark dark:text-custom1Blue hover:text-customBlue dark:hover:text-custom1Blue transition-colors font-medium"
                        >
                            Sign In
                        </button> */}
                        <Button label="Get Started" trynow={onGetstarted2} />
                    </motion.div>
                </div>
            </div>
        </motion.nav>
    );
}