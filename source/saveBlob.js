import { openByMobile } from "./util/fromSiyuan.js";
import { clientApi } from "./asyncModule.js";
export const canvasSaveBlobPromise = (canvas,fileName) => {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            try {
                const formData = new FormData();
                formData.append("file", blob, fileName );
                formData.append("type", "image/png");
                clientApi.fetchPost("/api/export/exportAsFile", formData, (response) => {
                    openByMobile(response.data.file);
                });
                resolve(true)
            } catch (e) {
                reject(e)
            }
        })
    })
}
