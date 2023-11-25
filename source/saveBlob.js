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
                    resolve({url:response.data.file,data:blob})
                });
            } catch (e) {
                reject(e)
            }
        })
    })
}
export const saveCanvases = async (canvases, dirHandle) => {
    const blobs = await Promise.all(canvases.map(({ canvas, fileName }) => canvasSaveBlobPromise(canvas, fileName)));

    if (dirHandle) {
        const files = blobs.map((blob, index) => ({
            name: canvases[index].fileName,
            contents: blob.data
        }));

        await saveFiles(files,dirHandle);
    }else {
        blobs.forEach((blob, index) => {
            console.log(blob)
            const url = URL.createObjectURL(blob.data);
            const a = document.createElement('a');
            a.href = url;
            a.download = canvases[index].fileName;
            a.click();
        });
    }

    return blobs;
}
export async function saveFiles(files,dirHandle) {
    // 请求用户选择一个文件夹
    for (const file of files) {
        // 创建一个新的文件句柄
        const fileHandle = await dirHandle.getFileHandle(file.name, { create: true });

        // 创建一个可写的流
        const writable = await fileHandle.createWritable();

        // 写入文件内容
        await writable.write(file.contents);

        // 关闭流
        await writable.close();
    }
}
export async function requestPermission(dirHandle) {
    if (window.FileSystemHandlePermissionDescriptor) {
        const permission = await dirHandle.queryPermission({ mode: 'readwrite' });
        if (permission !== 'granted') {
            await dirHandle.requestPermission({ mode: 'readwrite' });
        }
    }
}

// 检查持久访问权限
export async function checkPermission(dirHandle) {
    if (window.FileSystemHandlePermissionDescriptor) {
        const permission = await dirHandle.queryPermission({ mode: 'readwrite' });
        return permission === 'granted';
    }
    return false;
}