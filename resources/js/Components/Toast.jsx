import React from 'react';
import {ToastContainer} from "react-toastify";

export default function Toast() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            // pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    );
}
