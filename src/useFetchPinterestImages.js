import { useState } from "react";

function useFetchPinterestImage(){
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    //Lähetetään pyyntö serverille hakusanalla
    const fetcher = async (inputValue) => {
        try {
            setLoading(true);
            const result = await fetch(`http://localhost:3000?q=${inputValue}`);
            if(!result.ok) setError(true);
            const data = await result.json();
            if(data == null) setError(true);
            setData(data);
            setLoading(false);
        } catch(err){
            console.log("Yhteys serveriin ei onnistunut?");
            console.error(err);
            setError(true);
        }
    }

    return { data, loading, error, setError, fetcher };
}

export default useFetchPinterestImage;