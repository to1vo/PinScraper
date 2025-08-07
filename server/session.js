class Session {
    id;
    searchValue = "";
    loadedImages = [];
    scroll = 150;

    constructor(id = 0, searchValue){
        this.id = id;
        this.searchValue = searchValue;
    }

    addImage(image){
        this.loadedImages.push(image);
    }

    imageAlreadyLoaded(imageSrc){
        for(let i=0; i<this.loadedImages.length; i++){
            if(this.loadedImages[i].src = imageSrc) return true;
        }
        return false;
    }

    update(){
        this.scroll += 400;
    }
}

export default Session;