import Nav from "./components/Nav.jsx";
import Images from "./components/Images.jsx";
import Footer from "./components/Footer.jsx";
import { useState, useRef, useEffect, createContext } from "react";

const ImagesContext = createContext();

function App() {
  const [images, setImages] = useState(null);
  const sessionIdRef = useRef(null);

  const handleSessionClosing = () => {
    //no session currently (refreshing)
    if(sessionIdRef.current == null) return;
    const blob = new Blob([JSON.stringify({ sessionId: sessionIdRef.current })], { type: "application/json" });
    navigator.sendBeacon("http://localhost:3000/session", blob);
  }
  
  useEffect(() => {
    window.addEventListener("beforeunload", handleSessionClosing);
      
    return () => {
      window.removeEventListener("beforeunload", handleSessionClosing);
    }
  }, []);

  return (
    <>
      <ImagesContext.Provider value={[images, setImages]}>
        <Nav sessionIdRef={sessionIdRef} handleSessionClosing={handleSessionClosing} />
        <Images />
      </ImagesContext.Provider>
      <Footer />
    </>
  );
}

export default App;
export { ImagesContext }
