import React from "react";
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
function ToastPop({toastOpenYn, type, message, options, callback}) {
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
            position: (options.position === undefined || options.position === null) ? "bottom-center" : options.position,
            autoClose: (options.sec === undefined || options.sec === null) ? 5000 : options.sec,
            hideProgressBar: (options.hideProgressBar === undefined || options.hideProgressBar === null) ? false : options.hideProgressBar,
            closeOnClick: (options.closeOnClick === undefined || options.closeOnClick === null) ? true : options.closeOnClick,
            pauseOnHover: (options.pauseOnHover === undefined || options.pauseOnHover === null) ? true : options.pauseOnHover,
            draggable: (options.draggable === undefined || options.draggable === null) ? true : options.draggable,
            progress: (options.progress === undefined || options.progress === null) ? undefined : options.progress,
            theme: (options.theme === undefined || options.theme === null) ? "light" : options.theme,
            onClose: (callback === undefined || callback === null) ? null : callback,
        };

        let notify;
        switch (type) {
            case 'success' :
                toast.success(message, toastOptions);
                break;
            case 'warning' :
                toast.warning(message, toastOptions);
                break;
            case 'error':
                toast.error(message, toastOptions);
                break;
            case 'info':
                toast.info(message, toastOptions);
                break;
            default:
                toast.default(message, toastOptions);
                break;
        }

        // notify();
    }


    return(
        <>
            <ToastContainer/>
        </>
    )
}

export default ToastPop;
