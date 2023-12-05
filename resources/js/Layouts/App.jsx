import React from "react";
import Navigation from "@/Layouts/Navigation.jsx";
import Footer from "@/Components/Footer.jsx";
import {ToastContainer} from "react-toastify";
import Toast from "@/Components/Toast.jsx";
import Contact from "@/Components/Contact.jsx";

export default function App({children}){
    return(
        <div>
            <Toast/>
            <Navigation/>
            <div className="py-8 dark:bg-gray-800">{children}</div>
            <Contact/>
            <Footer/>
        </div>
    )
}
