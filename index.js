const { Plugin } = require("siyuan");
const clientApi = require("siyuan");
window[Symbol.for(`clientApi`)] = clientApi
class modemkiller extends Plugin {
    onload() {
        console.log('保护猫猫，人人有责')
        this.styles=[]
        this.currentStyle={value:""}
        this.注册导出图片菜单()
        this.加载异步模块()
    }
    注册导出图片菜单() {
        this.eventBus.on("click-editortitleicon", (e) => this.插入导出图片菜单(e));
        this.eventBus.on("click-blockicon", (e) => this.插入导出图片菜单(e));

    }
    插入导出图片菜单(e) {
        const { menu } = e.detail
        menu.addItem({
            label: this.i18n.导出多图,
            click: async () => {
                await this.加载异步模块()
                this.eventBus.emit('显示导出对话框', e.detail)
            }
        })
        if(!e.detail.blockElements||!e.detail.blockElements[1]){
            menu.addItem({
                label: this.i18n.复制为图片,
                click: async () => {
                    await this.加载异步模块()
                    this.eventBus.emit('复制到剪贴版', e.detail)
                },
                submenu:this.styles.map(
                    style=>{
                        return {
                            label:`<span style="${style.value};max-width:400px !important;display:block;max-height:3rem !important">${this.i18n.复制为图片}=>使用来自块${style.block_id}的样式</span>`,
                            click: async () => {
                                this.currentStyle= style
                                await this.加载异步模块()
                                this.eventBus.emit('复制到剪贴版', e.detail)
                            },
                        }
                    }
                )
            })
        }
    }
    async 加载异步模块() {
        if (!this.异步模块已加载) {
            try {
                await import(`/plugins/${this.name}/source/index.js`)
                this.异步模块已加载 = true
            } catch (e) {
                console.error(e)
            }
        }
    }
    onunload(){
        window.location.reload()
    }
}
module.exports = modemkiller