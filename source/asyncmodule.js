let pluginName  = import.meta.resolve('../').split('/').filter(item=>{return item}).pop()
const plugin = siyuan.ws.app.plugins.find(
    plugin => {
        return plugin.name ===pluginName
    }
)
export {plugin as plugin}
export let clientApi= window[Symbol.for(`clientApi`)] 
