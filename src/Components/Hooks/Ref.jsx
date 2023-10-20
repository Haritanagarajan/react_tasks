import { useRef } from "react";
import ReactDOM from "react-dom/client";

const Ref = () => {
    const inputElement = useRef();

    const focusInput = () => {
        inputElement.current.focus();
    };

    return (
        <div>
            <input type="text" ref={inputElement} />
            {console.log("Ref")}
            <button onClick={focusInput}>Focus Input</button>
        </div>
    );
}

export default Ref