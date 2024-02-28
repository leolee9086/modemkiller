import { addScript } from "../util/fromSiyuan.js";
import { 兼容移动端打开 } from "../openFile.js";
import { saveCanvas as 保存画布 } from "../saveBlob.js";
import { clientApi } from "../asyncModule.js";
import { 打开临时文件夹 } from "../openFile.js";
export const 按大纲最高级导出 = async (导出对话框, dirHandle) => {
    const previewElement = await 初始化导出环境(导出对话框);
    const 确定按钮 = 导出对话框.element.querySelectorAll(".b3-button")[1];
    const separatorElements = 获取分隔元素(previewElement);
    const 画布数组 = await 生成画布(previewElement, 确定按钮, separatorElements);
    await 保存或打开画布(画布数组, dirHandle);
}
async function 初始化导出环境(导出对话框) {
    (导出对话框.element.querySelector(".b3-dialog__container")).style.height = "";
    await addScript("/stage/protyle/js/html2canvas.min.js?v=1.4.1", "protyleHtml2canvas");
    return 导出对话框.element.querySelector("#preview");
}

function 获取分隔元素(previewElement) {
    let selector = 'r';
    let separatorElements = [];
    for (let i = 1; i < 6; i++) {
        selector = `:scope > [data-subtype="h${i}"]`;
        if (previewElement.querySelectorAll(selector) && !separatorElements[0]) {
            separatorElements = previewElement.querySelectorAll(selector);
        }
    }
    return separatorElements;
}

async function 生成画布(previewElement, 确定按钮, separatorElements) {
    let 画布数组 = [];
    if (separatorElements[0]) {
        await 处理有分隔元素的画布(previewElement, 确定按钮, separatorElements, 画布数组);
    } else {
        await 处理无分隔元素的画布(previewElement, 确定按钮, 画布数组);
    }
    return 画布数组;
}

// 划分导出区段
function 划分导出区段(previewElement, separatorElements) {
    const sections = [];
    const originalChildren = Array.from(previewElement.children);
    originalChildren.forEach(child => child.style.display = 'none');

    separatorElements.forEach((separator, index) => {
        const nextSeparator = separatorElements[index + 1] || null;
        let currentIndex = originalChildren.indexOf(separator);
        let nextIndex = nextSeparator ? originalChildren.indexOf(nextSeparator) : originalChildren.length;

        sections.push({ start: currentIndex, end: nextIndex });
    });

    return { sections, originalChildren };
}

// 批量导出区段
async function 批量导出区段(previewElement, 确定按钮, sections, originalChildren, 画布数组) {
    for (let i = 0; i < sections.length; i++) {
        const { start, end } = sections[i];
        for (let j = start; j < end; j++) {
            originalChildren[j].style.display = '';
        }
        let canvas = await html2canvas(previewElement.parentElement, {
            width: previewElement.parentElement.clientWidth,
            height: previewElement.parentElement.clientHeight,
            useCORS: true
        });
        const fileName = 确定按钮.getAttribute("data-title") + i + ".png";
        画布数组.push({ canvas, fileName });
        let file = await 保存画布(canvas, fileName);
        兼容移动端打开(file.url);
        for (let j = start; j < end; j++) {
            originalChildren[j].style.display = 'none';
        }
    }
    originalChildren.forEach(child => child.style.display = '');
}

// 主函数调用
async function 处理有分隔元素的画布(previewElement, 确定按钮, separatorElements, 画布数组) {
    const { sections, originalChildren } = 划分导出区段(previewElement, separatorElements);
    await 批量导出区段(previewElement, 确定按钮, sections, originalChildren, 画布数组);
}

async function 处理无分隔元素的画布(previewElement, 确定按钮, 画布数组) {
    previewElement.scrollTo({ top: 0 });
    previewElement.style.maxHeight = previewElement.scrollHeight + 'px';
    previewElement.style.height = previewElement.scrollHeight + 'px';
    let canvas = await html2canvas(previewElement.parentElement, {
        width: previewElement.parentElement.clientWidth,
        height: previewElement.parentElement.clientHeight,
        useCORS: true
    });
    画布数组.push({ canvas, fileName: 确定按钮.getAttribute("data-title") + 0 + ".png" });
    let file = await 保存画布(canvas, 确定按钮.getAttribute("data-title") + 0 + ".png");
    兼容移动端打开(file.url);
}

async function 保存或打开画布(画布数组, dirHandle) {
    if (clientApi.getFrontend() === 'desktop') {
        打开临时文件夹();
    } else {
        await 批量保存画布(画布数组, dirHandle);
    }
}
