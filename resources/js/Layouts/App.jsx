import React from "react";
import Navigation from "@/Layouts/Navigation.jsx";
import Footer from "@/Components/Footer.jsx";
import {ToastContainer} from "react-toastify";
import Toast from "@/Components/Toast.jsx";

export default function App({children}){
    return(
        <div>
            <Toast/>
            <Navigation/>
            <div className="pt-8">{children}</div>
            <Footer/>
        </div>
    )
}
