import React from "react";
import Navigation from "@/Layouts/Navigation.jsx";

export default function App({children}){
    return(
        <div>
            <Navigation/>
            <div className="pt-8">{children}</div>
        </div>
    )
}
