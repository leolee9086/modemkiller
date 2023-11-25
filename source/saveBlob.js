import { clientApi } from "./asyncModule.js";
export const saveCanvas=async(canvas,fileName,callBack)=>{
    const data= await canvasSaveBlobPromise(canvas,fileName)
    if(callBack){
        callBack(data)
    }
    return data
}
export const canvasSaveBlobPromise = (canvas,fileName) => {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            try {
                const formData = new FormData();
                formData.append("file", blob, fileName );
                formData.append("type", "image/png");
                clientApi.fetchPost("/api/export/exportAsFile", formData, (response) => {
                    resolve(response.data.file)
                });
            } catch (e) {
                reject(e)
            }
        })
    })
}
