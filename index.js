const { Plugin } = require("siyuan");
const clientApi = require("siyuan");
window[Symbol.for(`clientApi`)] = clientApi

class modemkiller extends Plugin {
    onload() {
        console.log('保护猫猫，人人有责')
        this.注册导出图片菜单()
        this.加载异步模块()
    }
    注册导出图片菜单() {
        this.eventBus.on("click-editortitleicon", (e) => this.插入导出图片菜单(e));
    }
    插入导出图片菜单(e) {
        const { menu, protyle } = e.detail
        menu.addItem({
            label: this.i18n.导出多图,
            click: async () => {
                await this.加载异步模块()
                this.eventBus.emit('显示导出对话框', e.detail)
            }
        })
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
}
module.exports = modemkiller