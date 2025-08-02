import { useEffect, useRef, useContext } from "react";
import { ImagesContext } from "../App.jsx";

function SearchInput({ setError, fetcher, setOverlay, loading }) {
    const [images, setImages] = useContext(ImagesContext);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleSearch = (e) => {
            const inputValue = inputRef.current.value.trim();
            if(e.key == "Enter" && !inputValue == "" && document.activeElement === inputRef.current && !loading){
                inputRef.current.blur();
                setImages(null);
                fetcher(inputValue);
            }
        }

        window.addEventListener("keypress", handleSearch);

        return () => window.removeEventListener("keypress", handleSearch);
    }, []);

    const clearInput = () => {
        if(inputRef.current.value != ""){
            inputRef.current.value = "";
        }
    }

    const handleInputFocus = () => {
        if(images){
            setOverlay(true);
        }
    }

    const handleInputBlur = () => setOverlay(false);

    const handleInputChange = () => setError(false);
    
    return (
        <>
        <div id="input-container">
            <svg 
                fill="#5f5f5f"
                height="28" 
                viewBox="0 -960 960 960" 
                width="28">
                <path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z"/>
            </svg>
            <input 
                ref={inputRef} 
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onInput={handleInputChange}
                type="text" 
                placeholder="Hae pinterestistä..." 
                spellCheck="false" 
                />
            <svg 
                id="input-clear-icon"
                onClick={clearInput}
                fill="#5f5f5f"
                height="28" 
                viewBox="0 -960 960 960" 
                width="28">
                <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/>
            </svg>
        </div>
        </>
    );
}

export default SearchInput;