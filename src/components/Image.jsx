function Image({ image }){
    const gre = Math.ceil((image.height/10));
    return (
        <div className="image-div" 
            style={{
                height: `${image.height}px`, 
                gridRowEnd: `span ${gre}`
            }}>
            <img src={image.src} alt="pin" loading="lazy" />
        </div>
    );
}

export default Image;
