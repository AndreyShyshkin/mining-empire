export function CreateImageByPath(path){
    let img = new Image();
    img.src = path;
    return img;
}