import { openByMobile } from "./util/fromSiyuan.js";
const 导出临时文件路径 = globalThis.siyuan.config.system.workspaceDir+'/temp/export'

export {openByMobile as 兼容移动端打开}
export const 打开临时文件夹 = () => {
    const { exec } = require('child_process')
    const dir = 导出临时文件路径;
    switch (process.platform) {
        case 'darwin':
            exec(`open "${dir}"`);
            break;
        case 'win32':
            exec(`start "" "${dir}"`);
            break;
        default:
            exec(`xdg-open "${dir}"`);
    }
}
