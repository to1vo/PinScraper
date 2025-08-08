class Session {
    id;
    loadedImagesNum = 0;
    scroll = 150;

    constructor(id = 0, searchValue){
        this.id = id;
        this.searchValue = searchValue;
    }

    addImage(){
        this.loadedImagesNum += 1;
    }

    update(){
        this.scroll += 1000;
    }
}

export default Session;