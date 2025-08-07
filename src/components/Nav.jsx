import { useEffect, useContext, useState } from "react";
import useFetchPinterestImages from "../useFetchPinterestImages.js";
import SearchInput from "./SearchInput.jsx";
import { ImagesContext } from "../App.jsx";
import logo from "../assets/logo.png";

function Nav(){
    const [images, setImages] = useContext(ImagesContext);
    const { data, loading, error, setError, fetcher } = useFetchPinterestImages();
    const [overlay, setOverlay] = useState(false);

    useEffect(() => {
        console.log(data);
        setImages(() => [...images, ...data]);
    }, [data]);

    return (
        <>
        <nav id="navbar">
            <div id="title-container">
                <img id="logo" src={logo} alt="logo" />
                <h3>&nbsp;PinScraper</h3>
            </div>
            <SearchInput setError={setError} fetcher={fetcher} setOverlay={setOverlay} loading={loading} />
        </nav>
        {error && <h2 id="searchText">Haulla ei löytynyt mitään tai siinä tapahtui virhe</h2>}
        {loading && <h2 id="searchText">Haetaan...</h2>}
        {overlay && <div id="overlay"></div>}
        </>
    );
}

export default Nav;