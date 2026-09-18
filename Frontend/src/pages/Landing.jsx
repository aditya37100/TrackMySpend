import React, { useEffect, useState } from "react";
import irregularImg from "../assets/Screenshot-2025-06-17-013357.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar1 } from "../components/navbar1";
import { Button } from "../components/Button";
import { FooterComponent } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Splash from "../components/SplashScreen";
import { 
  HiChartBar, 
  HiCreditCard, 
  HiTrendingUp, 
  HiBell, 
  HiDocumentReport,
  HiArrowRight,
  HiCheckCircle,
  HiStar,
  HiCamera,
  HiDocumentText,
  HiEye
} from "react-icons/hi";
import { FaFileAlt } from "react-icons/fa";

export default function Landing() {
    const navigate = useNavigate();
    const [showSplash, setShowSplash] = useState(false);
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const handlestart = function() {
        setShowSplash(true);
        setTimeout(() => {
            navigate("/signin");
        }, 3000);
    }
    
    const handlestart2 = function() {
        setShowSplash(true);
        setTimeout(() => {
            navigate("/dashboard");
        }, 3000);
    }
    
    if (showSplash) return <Splash />;

    const features = [
        {
            icon: HiCreditCard,
            title: "Smart Expense Tracking",
            description: "Log every transaction with intelligent categorization and real-time insights",
            color: "bg-customBlue"
        },
        {
            icon: HiTrendingUp,
            title: "Income Management",
            description: "Track all income sources and visualize your earning growth over time",
            color: "bg-customTealLight"
        },
        {
            icon: HiChartBar,
            title: "Budget Planning",
            description: "Set flexible budgets with smart alerts to keep you on track",
            color: "bg-customLavender"
        },
        {
            icon: HiDocumentReport,
            title: "Advanced Analytics",
            description: "Generate detailed reports and uncover saving opportunities",
            color: "bg-customOrange"
        },
        {
            icon: HiBell,
            title: "Smart Reminders",
            description: "Never miss a payment with intelligent notification system",
            color: "bg-custom1Blue"
        },
        {
            icon: FaFileAlt,
            title: "Auto-filling",
            description: "OCR-powered receipt scanning that automatically extracts and fills transaction details from your receipts",
            color: "bg-customPurple"
        }
    ];

    const stats = [
        { number: "10K+", label: "Active Users" },
        { number: "₹50M+", label: "Tracked Expenses" },
        { number: "95%", label: "User Satisfaction" },
        { number: "24/7", label: "Support Available" }
    ];

    return (
        <div className="min-h-screen bg-customLightGray dark:bg-customDarkBlue overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-customBlue/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-customTealLight/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            {/* Navigation */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10"
            >
                <Navbar1 onGetstarted={handlestart} onGetstarted2={handlestart2} />
            </motion.div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-8"
                        >
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="text-5xl lg:text-7xl font-bold text-customIndigoDark dark:text-custom1Blue"
                            >
                                TrackMy
                                <span className="block text-customBlue">
                                    Spend
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-xl text-customIndigoDark dark:text-custom1Blue leading-relaxed"
                            >
                                Your personal finance sidekick that transforms how you manage money. 
                                Track expenses, set budgets, and gain insights that lead to smarter financial decisions.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <Button label="Get Started " trynow={handlestart2} />
                                <button className="flex items-center gap-2 px-6 py-3 text-customIndigoDark dark:text-custom1Blue hover:text-customBlue dark:hover:text-custom1Blue transition-colors">
                                    <span>Watch Demo</span>
                                    <HiArrowRight className="w-5 h-5" />
                                </button>
                            </motion.div>

                          
                        </motion.div>

                        {/* Right Content - Image */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="relative"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-customBlue/20 rounded-3xl blur-xl"></div>
                                <img
                                    src={irregularImg}
                                    alt="TrackMySpend Dashboard"
                                    className="relative rounded-3xl shadow-2xl w-full max-w-lg mx-auto"
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-customIndigoDark dark:text-custom1Blue mb-6">
                            Everything you need to
                            <span className="block text-customBlue">
                                manage your finances
                            </span>
                        </h2>
                        <p className="text-xl text-customIndigoDark/70 dark:text-custom1Blue/70 max-w-3xl mx-auto">
                            Powerful features designed to give you complete control over your financial life
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-customBlue/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="relative bg-white dark:bg-customBlack rounded-2xl p-8 shadow-lg border border-customLavender dark:border-custom1Blue hover:shadow-xl transition-all duration-300">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-customIndigoDark dark:text-customLavender mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-customIndigoDark/70 dark:text-custom1Blue/70 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="relative">
                <FooterComponent />
            </section>
        </div>
    );
}
