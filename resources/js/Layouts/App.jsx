import React from "react";
import Navigation from "@/Layouts/Navigation.jsx";
import Footer from "@/Components/Footer.jsx";

export default function App({children}){
    return(
        <div>
            <Navigation/>
            <div className="pt-8">{children}</div>
            <Footer/>
        </div>
    )
}
