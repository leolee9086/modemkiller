import { plugin, clientApi } from "./asyncModule.js";
import kernelApi from "./polyfills/kernelApi.js";
import {
    addScript,
    processRender,
    highlightRender,

} from './util/fromSiyuan.js'
import { 兼容移动端打开, 打开临时文件夹 } from './openFile.js'
import { checkPermission, saveCanvas as 保存画布, saveCanvases as 批量保存画布 } from './saveBlob.js'
import { template } from "./dialogTemplate.js";
import { 等待参数达到长度后执行 } from "./util/functionTools.js";
let dirHandle
const refreshPreview = (content, previewElement, exportBgLayer) => {
    previewElement.innerHTML = content;
    // Create a set to track seen data-node-id
    let seenIds = new Set();

    // Get all div elements
    let divs = previewElement.getElementsByTagName('div');

    // Iterate over the div elements in reverse order (to avoid issues with removing elements)
    for (let i = divs.length - 1; i >= 0; i--) {
        console.log(divs[i])
        let nodeId = divs[i].getAttribute('data-node-id');
        if (nodeId&&seenIds.has(nodeId)) {
            // If we've seen this data-node-id before, remove the element
            divs[i].parentNode.removeChild(divs[i]);
        } else {
            // Otherwise, add the data-node-id to our set
            seenIds.add(nodeId);
        }
    }

    processRender(previewElement);
    highlightRender(previewElement);
    //https://github.com/siyuan-note/siyuan/commit/fffc5a56e8ec67a1985ced3bee164cd5cd324670
    previewElement.querySelectorAll('[data-type~="mark"]').forEach((markItem) => {
        markItem.childNodes.forEach((item) => {
            let spanHTML = ""
            Array.from(item.textContent).forEach(str => {
                spanHTML += `<span data-type="mark">${str}</span>`
            })
            const templateElement = document.createElement("template");
            templateElement.innerHTML = spanHTML;
            item.after(templateElement.content);
            item.remove();
        })
        if (markItem.childNodes.length > 0) {
            markItem.setAttribute("data-type", markItem.getAttribute("data-type").replace("mark", ""))
        }
    });

    previewElement.querySelectorAll("table").forEach((item) => {
        if (item.clientWidth > item.parentElement.clientWidth) {
            item.setAttribute("style", `margin-bottom:${item.parentElement.clientWidth * item.clientHeight / item.clientWidth - item.parentElement.clientHeight + 1}px;transform: scale(${item.parentElement.clientWidth / item.clientWidth});transform-origin: top left;`);
            item.parentElement.style.overflow = "hidden";
        }
    });
    previewElement.querySelectorAll(".li > .protyle-action > svg").forEach(item => {
        const id = item.firstElementChild.getAttribute("xlink:href");
        const symbolElements = document.querySelectorAll(id);
        let viewBox = "0 0 32 32";
        if (id === "#iconDot") {
            viewBox = "0 0 20 20";
        }
        item.setAttribute("viewBox", viewBox);
        item.innerHTML = symbolElements[symbolElements.length - 1].innerHTML;
    });
    /**
     * 这里是为了适配背景图插件
     */
    let bgLayer = document.getElementById('bglayer');
    if (bgLayer) {
        previewElement.style.backgroundColor = 'transparent'
        exportBgLayer.style.setProperty('background-image', bgLayer.style.backgroundImage)
        exportBgLayer.style.setProperty('background-repeat', 'no-repeat')
        exportBgLayer.style.setProperty('background-attachment', 'fixed')
        exportBgLayer.style.setProperty('background-size', 'cover')
        exportBgLayer.style.setProperty('opacity', '30%')
        exportBgLayer.style.setProperty('top', '0px')
        exportBgLayer.style.setProperty('left', '0px')
        exportBgLayer.style.setProperty('z-index', '0')
    }
    else {
        exportBgLayer.style.display = 'none'
    }

}
const 显示导出对话框 = async (ids) => {
    let { Dialog, fetchPost, fetchPostSync } = clientApi
    const frontEnd = clientApi.getFrontend();
    console.log(frontEnd, clientApi)
    plugin.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile";
    const 导出对话框 = new Dialog({
        title: window.siyuan.languages.exportAsImage,
        content: template(),
        width: plugin.isMobile ? "92vw" : "990px",
        height: "70vh"
    });
    const 导出比例选择器 = 导出对话框.element.querySelector("#ratio");
    const 按钮元素数组 = 导出对话框.element.querySelectorAll(".b3-button");
    const 取消按钮 = 按钮元素数组[0]
    const 确定按钮 = 按钮元素数组[1]
    const previewElement = 导出对话框.element.querySelector("#preview");
    const exportBgLayer = 导出对话框.element.querySelector("#export-bglayer");
    const foldElement = (导出对话框.element.querySelector("#keepFold"));
    foldElement.addEventListener("change", async () => {
        按钮元素数组[0].setAttribute("disabled", "disabled");
        确定按钮.setAttribute("disabled", "disabled");
        确定按钮.parentElement.insertAdjacentHTML("afterend", '<div class="fn__loading"><img height="128px" width="128px" src="stage/loading-pure.svg"></div>');
        window.siyuan.storage['local-exportimg'].keepFold = foldElement.checked;

        let contents = '';
        for (let id of ids) {
            let data = await kernelApi.exportPreviewHTML({
                id,
                keepFold: foldElement.checked,
                image: true,
            })
            contents += data.content;

        }
        refreshPreview(contents, previewElement, exportBgLayer);
        导出对话框.element.querySelector(".fn__loading").remove();
    });
    let contents = '';
    for (let id of ids) {
        let data = await kernelApi.exportPreviewHTML({
            id,
            keepFold: foldElement.checked,
            image: true,
        })
        console.log(data)
        contents += data.content;

        !确定按钮.getAttribute("data-title") ? 确定按钮.setAttribute("data-title", data.name) : null

    }
    refreshPreview(contents, previewElement, exportBgLayer);
    按钮元素数组[0].removeAttribute("disabled");
    确定按钮.removeAttribute("disabled");
    导出对话框.element.querySelector(".fn__loading").remove();

    取消按钮.addEventListener("click", () => {
        导出对话框.destroy();
    });
    确定按钮.addEventListener("click", async () => {
        try {
            //桌面平台直接打开导出临时文件夹就可以了
            dirHandle = frontEnd !== 'desktop' && window.isSecureContext && (dirHandle || await window.showDirectoryPicker());
            await dirHandle.requestPermission({ mode: 'readwrite' });
            let permission = (await dirHandle.queryPermission({ mode: 'readwrite' })) === "granted"
            dirHandle = permission ? dirHandle : undefined
        } catch (e) {
            console.warn(e)
        }
        const 当前导出比例模式 = 导出比例选择器.value;
        //按照分割线导出
        if (当前导出比例模式 == '按分割线') {
            (导出对话框.element.querySelector(".b3-dialog__container")).style.height = "";
            await addScript("/stage/protyle/js/html2canvas.min.js?v=1.4.1", "protyleHtml2canvas")
            //按照分割线导出
            previewElement.parentElement.style.maxHeight = ""
            let separatorElements = previewElement.querySelectorAll(':scope > .hr');
            let 画布数组 = []
            if (separatorElements[0]) {
                previewElement.scrollTo({ top: 0 });
                previewElement.style.maxHeight = separatorElements[0].offsetTop - parseInt(getComputedStyle(previewElement).paddingBottom) + 'px'
                previewElement.style.height = separatorElements[0].offsetTop + 'px'
                let canvas = await html2canvas(previewElement.parentElement, {
                    width: previewElement.parentElement.clientWidth,
                    height: previewElement.parentElement.clientHeight,
                    useCORS: true
                })
                画布数组.push({ canvas, fileName: 确定按钮.getAttribute("data-title") + 0 + ".png" })
                let file = await 保存画布(canvas, 确定按钮.getAttribute("data-title") + 0 + ".png")
                兼容移动端打开(file.url)
                for (let i = 0; i < separatorElements.length; i++) {
                    const separator = separatorElements[i];
                    const nextSeparator = separatorElements[i + 1];
                    if (nextSeparator) {
                        let h = nextSeparator.offsetTop - separator.offsetTop - separator.offsetHeight
                        previewElement.style.height = h + 'px'

                        previewElement.style.maxHeight = h + 'px'
                    } else {
                        let h = previewElement.scrollHeight - separator.offsetTop - separator.offsetHeight
                        previewElement.style.height = h + 'px'
                        previewElement.style.maxHeight = h + 'px'
                    }
                    separator.nextElementSibling.scrollIntoView()
                    let canvas = await html2canvas(previewElement.parentElement, {
                        width: previewElement.parentElement.clientWidth,
                        height: previewElement.parentElement.clientHeight,
                        useCORS: true
                    })
                    画布数组.push({ canvas, fileName: 确定按钮.getAttribute("data-title") + i + 1 + ".png" })
                    let file = await 保存画布(canvas, 确定按钮.getAttribute("data-title") + i + 1 + ".png")
                    兼容移动端打开(file.url)
                }
                frontEnd === 'desktop' ? 打开临时文件夹() : await 批量保存画布(画布数组, dirHandle)

            } else {
                previewElement.scrollTo({ top: 0 });
                previewElement.style.maxHeight = previewElement.scrollHeight + 'px'
                previewElement.style.height = previewElement.scrollHeight + 'px'
                let canvas = await html2canvas(previewElement.parentElement, {
                    width: previewElement.parentElement.clientWidth,
                    height: previewElement.parentElement.clientHeight,
                    useCORS: true
                })
                画布数组.push({ canvas, fileName: 确定按钮.getAttribute("data-title") + 0 + ".png" })
                let file = await 保存画布(canvas, 确定按钮.getAttribute("data-title") + 0 + ".png")
                兼容移动端打开(file.url)
            }


        }
        else if (当前导出比例模式 == '按大纲最高级') {
            (导出对话框.element.querySelector(".b3-dialog__container")).style.height = "";
            await addScript("/stage/protyle/js/html2canvas.min.js?v=1.4.1", "protyleHtml2canvas")
            //按照分割线导出
            previewElement.parentElement.style.maxHeight = ""
            let selector = 'r'
            let separatorElements = []
            for (let i = 1; i < 6; i++) {
                selector = `:scope > [data-subtype="h${i}"]`
                if (previewElement.querySelectorAll(selector) && !separatorElements[0]) {
                    separatorElements = previewElement.querySelectorAll(selector);
                }
            }
            let 画布数组 = []
            if (separatorElements[0]) {
                previewElement.scrollTo({ top: 0 });
                previewElement.style.maxHeight = separatorElements[0].offsetTop - parseInt(getComputedStyle(previewElement).paddingBottom) + 'px'
                previewElement.style.height = separatorElements[0].offsetTop - parseInt(getComputedStyle(previewElement).paddingBottom) + 'px'
                let canvas = await html2canvas(previewElement.parentElement, {
                    width: previewElement.parentElement.clientWidth,
                    height: previewElement.parentElement.clientHeight,
                    useCORS: true
                })
                画布数组.push({ canvas, fileName: 确定按钮.getAttribute("data-title") + 0 + ".png" })
                let file = await 保存画布(canvas, 确定按钮.getAttribute("data-title") + 0 + ".png")
                兼容移动端打开(file.url)
                for (let i = 0; i < separatorElements.length; i++) {
                    const separator = separatorElements[i];
                    const nextSeparator = separatorElements[i + 1];
                    if (nextSeparator) {
                        let h = nextSeparator.offsetTop - separator.offsetTop
                        console.log(h, i)
                        previewElement.style.height = h + 'px'
                        previewElement.style.maxHeight = h + 'px'
                    } else {
                        let h = previewElement.scrollHeight - separator.offsetTop
                        console.log(h, i)
                        previewElement.style.height = h + 'px'
                        previewElement.style.maxHeight = h + 'px'
                    }
                    separator.scrollIntoView()

                    let canvas = await html2canvas(previewElement.parentElement, {
                        width: previewElement.parentElement.clientWidth,
                        height: previewElement.parentElement.clientHeight,
                        useCORS: true
                    })
                    画布数组.push({ canvas, fileName: 确定按钮.getAttribute("data-title") + i + ".png" })
                    let file = await 保存画布(canvas, 确定按钮.getAttribute("data-title") + i + ".png")
                    兼容移动端打开(file.url)
                }
                frontEnd === 'desktop' ? 打开临时文件夹() : await 批量保存画布(画布数组, dirHandle)
            } else {
                previewElement.scrollTo({ top: 0 });
                previewElement.style.maxHeight = previewElement.scrollHeight + 'px'
                previewElement.style.height = previewElement.scrollHeight + 'px'
                let canvas = await html2canvas(previewElement.parentElement, {
                    width: previewElement.parentElement.clientWidth,
                    height: previewElement.parentElement.clientHeight,
                    useCORS: true
                })
                画布数组.push({ canvas, fileName: 确定按钮.getAttribute("data-title") + 0 + ".png" })
                let file = await 保存画布(canvas, 确定按钮.getAttribute("data-title") + 0 + ".png")
                兼容移动端打开(file.url)
                frontEnd === 'desktop' ? 打开临时文件夹() : await 批量保存画布(画布数组, dirHandle)

            }
        }
        else if (当前导出比例模式.indexOf('/') > 0) {
            //按照宽高比导出
            const [widthRatio, heightRatio] = 当前导出比例模式.split("/");
            const RatioValue = parseInt(heightRatio) / parseInt(widthRatio)
            const width = previewElement.parentElement.clientWidth;
            const height = width * RatioValue;
            const innerWidth = previewElement.clientWidth
            const innerHeight = Math.min(innerWidth * RatioValue, height - 60);
            (导出对话框.element.querySelector(".b3-dialog__container")).style.height = "";
            previewElement.parentElement.style.height = height + 'px'
            previewElement.parentElement.style.maxHeight = height + 'px'
            previewElement.style.height = innerHeight + 'px'
            previewElement.style.maxHeight = innerHeight + 'px'
            await addScript("/stage/protyle/js/html2canvas.min.js?v=1.4.1", "protyleHtml2canvas")
            //按照宽高比导出
            const totalHeight = previewElement.scrollHeight;  // HTML内容的总高度
            const numImages = Math.ceil(totalHeight / innerHeight);  // 需要的图片数量
            let 画布数组 = []
            for (let i = 0; i < numImages; i++) {
                previewElement.scrollTo({ top: innerHeight * i })
                let canvas = await html2canvas(previewElement.parentElement, {
                    width: width,
                    height: height,
                    useCORS: true
                })
                画布数组.push({ canvas, fileName: 确定按钮.getAttribute("data-title") + i + ".png" })
                let file = await 保存画布(canvas, 确定按钮.getAttribute("data-title") + i + ".png")
                兼容移动端打开(file.url)
            }
            frontEnd === 'desktop' ? 打开临时文件夹() : await 批量保存画布(画布数组, dirHandle)
        }
    });
}
plugin.eventBus.on('显示导出对话框', (e) => {
    if (e.detail.blockElements) {
        let ids = e.detail.blockElements.map(blockElement => blockElement.dataset.nodeId);
        显示导出对话框(ids);
    } else if (e.detail.protyle && e.detail.protyle.block.id) {
        显示导出对话框([e.detail.protyle.block.id])
    }
})

async function copyAsPng(element) {
    await addScript("/stage/protyle/js/html2canvas.min.js?v=1.4.1", "protyleHtml2canvas")
    const canvas = await html2canvas(element);
    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            resolve(blob);
        }, 'image/png');
    });
}

async function copyElementToClipboard(element, tempStyle) {
    // Save the original style
    const originalStyle = element.getAttribute('style');

    // Set the temporary style
    element.setAttribute('style', tempStyle);

    // Temporarily remove the class
    element.classList.remove('protyle-wysiwyg--select');

    const blob = await copyAsPng(element);
    const data = [new ClipboardItem({ 'image/png': blob })];
    try {
        await navigator.clipboard.write(data);
        console.log('Image copied to clipboard');
    } catch (error) {
        console.error('Error: ', error);
    }

    // Reset the style to the original
    element.setAttribute('style', originalStyle);

    // Add the class back
    element.classList.add('protyle-wysiwyg--select');
}

plugin.eventBus.on('复制到剪贴版',(e)=>{
    let tempStyle=plugin.currentStyle.value||""
    if (e.detail.blockElements) {
        copyElementToClipboard(e.detail.blockElements[e.detail.blockElements.length - 1], tempStyle)
    } else if (e.detail.protyle && e.detail.protyle.block.id) {
        copyElementToClipboard(e.detail.protyle.element, tempStyle)
    }
})
let styleSql = `select * from attributes where name = 'style' limit 102400`
let styles = kernelApi.sql.sync({ stmt: styleSql })

// Create a Set to store unique style values
let uniqueStyles = new Set();

styles = styles.filter(style => {
    // Create a temporary element
    let tempElement = document.createElement('div');

    // Set the style string as the element's style
    tempElement.style.cssText = style.value;

    // Check if the style object only contains the width property
    let keys = Object.keys(tempElement.style);
    if (keys.length === 1 && keys[0] === 'width') {
        return false;
    }

    // Check if the style value is unique
    let styleValue = tempElement.style.cssText;
    if (uniqueStyles.has(styleValue)) {
        // If the style value is not unique, filter it out
        return false;
    } else {
        // If the style value is unique, add it to the Set and keep it
        uniqueStyles.add(styleValue);
        return true;
    }
});

plugin.styles = plugin.styles.concat(styles);