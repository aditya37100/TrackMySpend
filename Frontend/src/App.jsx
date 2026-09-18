// App.jsx

import { BrowserRouter, Route, Routes } from "react-router-dom";
import logo from "./assets/budgeting.gif";
import { lazy, useEffect, useState,Suspense } from "react";
import { AnimatedHeading } from "./components/AnimatedHeading";
import Splash from "./components/SplashScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Landing= lazy(() => import('./pages/Landing'));
const Signin= lazy(() => import('./pages/Signin'));
const Signup= lazy(() => import('./pages/Signup'));
const Dashboard= lazy(()=> import('./pages/Dashboard'));
const Income= lazy(()=> import('./pages/Income'));
const Expense= lazy(()=> import('./pages/Expense'));
const Budget= lazy(() =>import('./pages/Budget'));
const Report= lazy(()=> import('./pages/Report'));
const RepAnalysis= lazy(()=> import('./pages/RepAnalysis'));
const OCRupload= lazy(()=> import('./pages/OCRupload'));
function App() {
 
  const [showSplash,setShowSplash]= useState(true);
   
  useEffect(function(){
  const timer= setTimeout(function(){
    setShowSplash(false)
  },3000)

  return function(){
    clearTimeout(timer);
  }
  },[]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(reg => console.log('✅ Service Worker registered', reg))
        .catch(err => console.error('❌ Service Worker registration failed', err));
    }
  }, []);


  if(showSplash){
    return <Splash/>
    }

  return (
  <>
        <ToastContainer position="top-right" />

  <BrowserRouter>
    <Routes>
       <Route path="/dashboard" element={<Suspense fallback={<Splash/>}><Dashboard/></Suspense>}></Route>
        <Route path="/" element={<Suspense fallback={<Splash />}><Landing /></Suspense>}/> 
        <Route path="/signin" element={<Suspense fallback={<Splash />}><Signin/></Suspense>}></Route>
        <Route path="/signup" element={<Suspense fallback={<Splash/>}><Signup/></Suspense>}></Route> 
        <Route path="/income" element={<Suspense fallback={<Splash/>}><Income/></Suspense>}></Route> 
        <Route path="/expense" element={<Suspense fallback={<Splash/>}><Expense/></Suspense>}></Route>
        <Route path="/budget" element={<Suspense fallback-={<Splash/>}><Budget/></Suspense>}></Route>
        <Route path="/report" element={<Suspense fallback={<Splash/>}><Report/></Suspense>}></Route>
        <Route path="/repanalysis" element={<Suspense fallback={<Splash/>}><RepAnalysis/></Suspense>}></Route>
        <Route path="/upload" element={<Suspense fallback={<Splash/>}><OCRupload/></Suspense>}></Route>
         </Routes>
  </BrowserRouter>
  
  
  </>
  );
}

export default App;
