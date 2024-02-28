import { plugin } from "./asyncModule.js"
const languages=()=>{
    return globalThis.siyuan.languages||{}
}
export const template=()=> `
<div class="b3-dialog__content" style="${plugin.isMobile ? "padding:8px;" : ""};background-color: var(--b3-theme-background)">
        <canvas id="export-bglayer" class="bglayer" style="background-image: url(&quot;/public/siyuan-plugin-background-cover/assets/images/hash-6130f530e783c70.png&quot;); filter: blur(0px); background-position: 50% 50%;overflow:hidden"></canvas>       
        <div 
            style="${plugin.isMobile ? "padding: 16px;margin: 16px 0" : "padding: 48px;margin: 8px 0 8px"};
                    border: 1px solid var(--b3-border-color);
                    border-radius: var(--b3-border-radius-b);
                    max-height:calc(100% - 48px);overflow:auto" 
                    class="export-img export-img-multi protyle-wysiwyg${window.siyuan.config.editor.displayBookmarkIcon ? " protyle-wysiwyg--attr" : ""}" id="preview">
                </div>
        <div class="config-about__logo fn__flex" style="z-index:1">
        <div>
            <img src="/stage/icon.png">
            <span>${plugin.i18n.思源笔记}</span>
            <span class="fn__space"></span>
            <span class="ft__on-surface">${plugin.i18n.重构你的思维}</span>
        </div>
        <div class='fn__space fn__flex-1' style='text-align:center;color:transparent'>
         知行合一&nbsp;经世致用
        </div>
            <div>
                <span class="ft__on-surface">${plugin.i18n.匠造为常}</span>
                <span class="fn__space"></span>
                <span>${plugin.i18n.椽承设计}</span>
                <img src="/plugins/modemkiller/logo.png">
            </div> 
        </div>
    </div>
        <div class="fn__hr--b"></div>
    <div class="fn__hr--b"></div>
</div>
<div class="b3-dialog__action" style='z-index:1'>
    <label class="fn__flex">
        ${languages().exportPDF5}
        <span class="fn__space"></span>
        <input id="keepFold" class="b3-switch fn__flex-center" type="checkbox" ${window.siyuan.storage['local-exportimg'].keepFold ? "checked" : ""}>
    </label>
    <span class="fn__flex-1"></span>
    <select id="ratio" class="b3-select fn__flex-center fn__size200">
    <option value="4/3">4:3</option>
    <option value="3/4">3:4</option>
    <option value="16/9">16:9</option>
    <option value="9/16">9:16</option>
    <option value="21/9">21:9</option>
    <option value="9/21">9:21</option>
    <option value="9/32">9:32</option>
    <option value="32/9">32/9</option>
    <option value="1/1">1:1</option>
    <option value="按分割线">${plugin.i18n.使用分割线}</option>
    <option value="按大纲最高级">${plugin.i18n.按大纲最高级}</option>
    <option value="小红书模式">${plugin.i18n.小红书模式}</option>

</select>

    <button disabled class="b3-button b3-button--cancel">${languages().cancel}</button><div class="fn__space"></div>
    <button disabled class="b3-button b3-button--text">${languages().confirm}</button>
</div>
 <div class="fn__loading"><img height="128px" width="128px" src="stage/loading-pure.svg"></div>`
