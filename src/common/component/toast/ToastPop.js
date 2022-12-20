import React, { useState } from "react";
import {toast, ToastContainer} from "react-toastify";

/**
 * Toast Pop
 * @param toastOpenYn
 * @param type
 * @param message
 * @param options
 * @returns {JSX.Element}
 * @constructor
 */
function ToastPop({toastOpenYn, type, message, options}) {
    if (toastOpenYn) {
        if(options === null || options === undefined) {
            options = {
                position: "bottom-center",  // top-left, top-right, top-center, bottom-left, bottom-right, bottom-center
                sec: 5000,                     // 기본 5초로 지정
                hideProgressBar: null,
                closeOnClick: null,
                pauseOnHover: null,
                draggable: null,
                progress: null,
                theme: null,                // light, dark, colored
            };
        }
        const toastOptions = {
            position: options.position === undefined ? "bottom-center" : options.position,
            autoClose: options.sec === undefined ? 5000 : options.sec,
            hideProgressBar: options.hideProgressBar === undefined ? false : options.hideProgressBar,
            closeOnClick: options.closeOnClick === undefined ? true : options.closeOnClick,
            pauseOnHover: options.pauseOnHover === undefined ? true : options.pauseOnHover,
            draggable: options.draggable === undefined ? true : options.draggable,
            progress: options.progress === undefined ? undefined : options.progress,
            theme: options.theme === undefined ? "light" : options.theme
        };

        let notify;
        switch (type) {
            case 'success' :
                notify = () => toast.success(message, toastOptions);
                break;
            case 'warning' :
                notify = () => toast.warning(message, toastOptions);
                break;
            case 'error':
                notify = () => toast.error(message, toastOptions);
                break;
            case 'info':
                notify = () => toast.info(message, toastOptions);
                break;
            default:
                notify = () => toast.default(message, toastOptions);
                break;
        }

        notify();
    }


    return(
        <>
            <ToastContainer/>
        </>
    )
}

export default ToastPop;
