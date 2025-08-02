import Nav from "./components/Nav.jsx";
import Images from "./components/Images.jsx";
import Footer from "./components/Footer.jsx";
import { useState, createContext } from "react";

const ImagesContext = createContext();

function App(){
  const [images, setImages] = useState(null);

  return (
    <>
      <ImagesContext.Provider value={[images, setImages]}>
        <Nav />
        <Images />
      </ImagesContext.Provider>
      <Footer />
    </>
  );
}

export default App;
export { ImagesContext }
