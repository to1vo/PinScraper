import { useContext } from "react";
import { ImagesContext } from "../App.jsx";
import Image from "./Image.jsx";

function Images(){
    const [images] = useContext(ImagesContext);

    if(!images){
        return null;
    }

    return (
        <div id="image-container">
            {images.map((image, index) => <Image image={image} key={index} />)}
        </div>
    );
}

export default Images;
