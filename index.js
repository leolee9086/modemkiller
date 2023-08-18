const { Plugin } = require("siyuan");
const clientApi = require("siyuan");
let Constants = {}
Constants.PROTYLE_CDN = "/stage/protyle"
Constants.ZWSP = "\u200b"
Constants.SIYUAN_CONFIG_APPEARANCE_LIGHT_CODE = ["ant-design",
    "a11y-light", "arduino-light", "ascetic", "atom-one-light", "base16/atelier-cave-light",
    "base16/atelier-dune-light", "base16/atelier-estuary-light", "base16/atelier-forest-light", "base16/atelier-heath-light",
    "base16/atelier-lakeside-light", "base16/atelier-plateau-light", "base16/atelier-savanna-light", "base16/atelier-seaside-light", "base16/atelier-sulphurpool-light", "base16/brush-trees",
    "base16/classic-light", "base16/cupcake", "base16/cupertino", "base16/default-light", "base16/dirtysea", "base16/edge-light", "base16/equilibrium-gray-light", "base16/equilibrium-light",
    "base16/fruit-soda", "base16/github", "base16/google-light", "base16/grayscale-light", "base16/gruvbox-light-hard", "base16/gruvbox-light-medium", "base16/gruvbox-light-soft",
    "base16/harmonic16-light", "base16/heetch-light", "base16/humanoid-light", "base16/horizon-light", "base16/ia-light", "base16/material-lighter", "base16/mexico-light",
    "base16/one-light", "base16/papercolor-light", "base16/ros-pine-dawn", "base16/sagelight", "base16/shapeshifter",
    "base16/silk-light", "base16/solar-flare-light", "base16/solarized-light", "base16/summerfruit-light", "base16/synth-midnight-terminal-light", "base16/tomorrow",
    "base16/unikitty-light", "base16/windows-10-light", "base16/windows-95-light", "base16/windows-high-contrast-light", "brown-paper", "base16/windows-nt-light",
    "color-brewer", "docco", "foundation", "github", "googlecode", "gradient-light", "grayscale", "idea", "intellij-light", "isbl-editor-light", "kimbie-light",
    "lightfair", "magula", "mono-blue", "nnfx-light", "panda-syntax-light", "paraiso-light", "purebasic", "qtcreator-light", "routeros", "school-book",
    "stackoverflow-light", "tokyo-night-light", "vs", "xcode", "default"];

Constants.SIYUAN_CONFIG_APPEARANCE_DARK_CODE = ["a11y-dark", "agate", "an-old-hope", "androidstudio",
    "arta", "atom-one-dark", "atom-one-dark-reasonable", "base16/3024", "base16/apathy", "base16/apprentice", "base16/ashes", "base16/atelier-cave", "base16/atelier-dune",
    "base16/atelier-estuary", "base16/atelier-forest", "base16/atelier-heath", "base16/atelier-lakeside", "base16/atelier-plateau", "base16/atelier-savanna", "base16/atelier-seaside", "base16/atelier-sulphurpool",
    "base16/atlas", "base16/bespin", "base16/black-metal", "base16/black-metal-bathory", "base16/black-metal-burzum", "base16/black-metal-dark-funeral", "base16/black-metal-gorgoroth", "base16/black-metal-immortal", "base16/black-metal-khold", "base16/black-metal-marduk", "base16/black-metal-mayhem", "base16/black-metal-nile", "base16/black-metal-venom", "base16/brewer", "base16/bright", "base16/brogrammer",
    "base16/brush-trees-dark", "base16/chalk", "base16/circus", "base16/classic-dark", "base16/codeschool", "base16/colors", "base16/danqing", "base16/darcula", "base16/dark-violet",
    "base16/darkmoss", "base16/darktooth", "base16/decaf", "base16/default-dark", "base16/dracula", "base16/edge-dark", "base16/eighties", "base16/embers", "base16/equilibrium-dark",
    "base16/equilibrium-gray-dark", "base16/espresso", "base16/eva", "base16/eva-dim", "base16/flat", "base16/framer", "base16/gigavolt", "base16/google-dark", "base16/grayscale-dark", "base16/green-screen", "base16/gruvbox-dark-hard", "base16/gruvbox-dark-medium",
    "base16/gruvbox-dark-pale", "base16/gruvbox-dark-soft", "base16/hardcore", "base16/harmonic16-dark", "base16/heetch-dark", "base16/helios", "base16/hopscotch", "base16/horizon-dark", "base16/humanoid-dark", "base16/ia-dark", "base16/icy-dark", "base16/ir-black", "base16/isotope",
    "base16/kimber", "base16/london-tube", "base16/macintosh", "base16/marrakesh", "base16/materia", "base16/material", "base16/material-darker", "base16/material-palenight", "base16/material-vivid",
    "base16/mellow-purple", "base16/mocha", "base16/monokai", "base16/nebula", "base16/nord", "base16/nova", "base16/ocean", "base16/oceanicnext", "base16/onedark", "base16/outrun-dark",
    "base16/papercolor-dark", "base16/paraiso", "base16/pasque", "base16/phd", "base16/pico", "base16/pop", "base16/porple", "base16/qualia", "base16/railscasts", "base16/rebecca",
    "base16/ros-pine", "base16/ros-pine-moon", "base16/sandcastle", "base16/seti-ui", "base16/silk-dark", "base16/snazzy", "base16/solar-flare", "base16/solarized-dark", "base16/spacemacs", "base16/summercamp", "base16/summerfruit-dark",
    "base16/synth-midnight-terminal-dark", "base16/tango", "base16/tender", "base16/tomorrow-night", "base16/twilight", "base16/unikitty-dark", "base16/vulcan",
    "base16/windows-10", "base16/windows-95", "base16/windows-high-contrast", "base16/windows-nt", "base16/woodland", "base16/xcode-dusk", "base16/zenburn", "codepen-embed", "dark",
    "devibeans", "far", "felipec", "github-dark", "github-dark-dimmed", "gml", "gradient-dark", "hybrid", "ir-black", "isbl-editor-dark", "kimbie-dark", "lioshi",
    "monokai", "monokai-sublime", "night-owl", "nnfx-dark", "nord", "obsidian", "panda-syntax-dark", "paraiso-dark", "pojoaque", "qtcreator-dark", "rainbow", "shades-of-purple", "srcery", "stackoverflow-dark",
    "sunburst", "tomorrow-night-blue", "tomorrow-night-bright", "tokyo-night-dark", "vs2015", "xt256"
];

//一堆工具方法
const addScript = (path, id) => {
    return new Promise((resolve) => {
        if (document.getElementById(id)) {
            // 脚本加载后再次调用直接返回
            resolve(false);
            return false;
        }
        const scriptElement = document.createElement("script");
        scriptElement.src = path;
        scriptElement.async = true;
        // 循环调用时 Chrome 不会重复请求 js
        document.head.appendChild(scriptElement);
        scriptElement.onload = () => {
            if (document.getElementById(id)) {
                // 循环调用需清除 DOM 中的 script 标签
                scriptElement.remove();
                resolve(false);
                return false;
            }
            scriptElement.id = id;
            resolve(true);
        };
    });
};
const addStyle = (url, id) => {
    if (!document.getElementById(id)) {
        const styleElement = document.createElement("link");
        styleElement.id = id;
        styleElement.rel = "stylesheet";
        styleElement.type = "text/css";
        styleElement.href = url;
        document.getElementsByTagName("head")[0].appendChild(styleElement);
    }
};

const genIconHTML = () => {
    return `<div class="protyle-icons">
    <span aria-label="${window.siyuan.languages.edit}" class="b3-tooltips__nw b3-tooltips protyle-icon protyle-icon--first protyle-action__edit"><svg><use xlink:href="#iconEdit"></use></svg></span>
    <span aria-label="${window.siyuan.languages.more}" class="b3-tooltips__nw b3-tooltips protyle-icon protyle-action__menu protyle-icon--last"><svg><use xlink:href="#iconMore"></use></svg></span>
</div>`;
};

const hasNextSibling = (element) => {
    let nextSibling = element.nextSibling;
    while (nextSibling) {
        if (nextSibling.textContent === "" && nextSibling.nodeType === 3) {
            nextSibling = nextSibling.nextSibling;
        } else {
            return nextSibling;
        }
    }
    return false;
};
const hasClosestBlock = (element) => {
    const nodeElement = hasClosestByAttribute(element, "data-node-id", null);
    if (nodeElement && nodeElement.tagName !== "BUTTON" && nodeElement.getAttribute("data-type")?.startsWith("Node")) {
        return nodeElement;
    }
    return false;
};
const hasClosestByClassName = (element, className, top = false) => {
    if (!element) {
        return false;
    }
    if (element.nodeType === 3) {
        element = element.parentElement;
    }
    let e = element;
    let isClosest = false;
    while (e && !isClosest && (top ? e.tagName !== "BODY" : !e.classList.contains("protyle-wysiwyg"))) {
        if (e.classList?.contains(className)) {
            isClosest = true;
        } else {
            e = e.parentElement;
        }
    }
    return isClosest && e;
};
const hasTopClosestByClassName = (element, className, top = false) => {
    let closest = hasClosestByClassName(element, className, top);
    let parentClosest = false;
    let findTop = false;
    while (closest && (top ? closest.tagName !== "BODY" : !closest.classList.contains("protyle-wysiwyg")) && !findTop) {
        parentClosest = hasClosestByClassName(closest.parentElement, className, top);
        if (parentClosest) {
            closest = parentClosest;
        } else {
            findTop = true;
        }
    }
    return closest || false;
};
const looseJsonParse = (text) => {
    return Function(`"use strict";return (${text})`)();
};
const hasClosestByAttribute = (element, attr, value, top = false) => {
    if (!element) {
        return false;
    }
    if (element.nodeType === 3) {
        element = element.parentElement;
    }
    let e = element;
    let isClosest = false;
    while (e && !isClosest && (top ? e.tagName !== "BODY" : !e.classList.contains("protyle-wysiwyg"))) {
        if (typeof value === "string" && e.getAttribute(attr)?.split(" ").includes(value)) {
            isClosest = true;
        } else if (typeof value !== "string" && e.hasAttribute(attr)) {
            isClosest = true;
        } else {
            e = e.parentElement;
        }
    }
    return isClosest && e;
};


const abcRender = (element, cdn = Constants.PROTYLE_CDN) => {
    let abcElements = [];
    if (element.getAttribute("data-subtype") === "abc") {
        // 编辑器内代码块编辑渲染
        abcElements = [element];
    } else {
        abcElements = Array.from(element.querySelectorAll('[data-subtype="abc"]'));
    }
    if (abcElements.length === 0) {
        return;
    }
    if (abcElements.length > 0) {
        addScript(`${cdn}/js/abcjs/abcjs-basic-min.js?v=6.2.2`, "protyleAbcjsScript").then(() => {
            abcElements.forEach((e) => {
                if (e.getAttribute("data-render") === "true") {
                    return;
                }
                if (!e.firstElementChild.classList.contains("protyle-icons")) {
                    e.insertAdjacentHTML("afterbegin", genIconHTML());
                }
                if (e.childElementCount < 4) {
                    e.lastElementChild.insertAdjacentHTML("beforebegin", `<span style="position: absolute">${Constants.ZWSP}</span>`);
                }
                const renderElement = e.firstElementChild.nextElementSibling;
                ABCJS.renderAbc(renderElement, Lute.UnEscapeHTMLStr(e.getAttribute("data-content")), {
                    responsive: "resize"
                });
                renderElement.setAttribute("contenteditable", "false");
                e.setAttribute("data-render", "true");
            });
        });
    }
};
const htmlRender = (element) => {
    let htmlElements = [];
    if (element.getAttribute("data-type") === "NodeHTMLBlock") {
        // 编辑器内代码块编辑渲染
        htmlElements = [element];
    } else {
        htmlElements = Array.from(element.querySelectorAll('[data-type="NodeHTMLBlock"]'));
    }
    if (htmlElements.length === 0) {
        return;
    }
    if (htmlElements.length > 0) {
        htmlElements.forEach((e) => {
            e.firstElementChild.firstElementChild.setAttribute("aria-label", window.siyuan.languages.edit);
            e.firstElementChild.lastElementChild.setAttribute("aria-label", window.siyuan.languages.more);
        });
    }
};

const plantumlRender = (element, cdn = Constants.PROTYLE_CDN) => {
    let plantumlElements = [];
    if (element.getAttribute("data-subtype") === "plantuml") {
        // 编辑器内代码块编辑渲染
        plantumlElements = [element];
    } else {
        plantumlElements = Array.from(element.querySelectorAll('[data-subtype="plantuml"]'));
    }
    if (plantumlElements.length === 0) {
        return;
    }


    addScript(`${cdn}/js/plantuml/plantuml-encoder.min.js?v=0.0.0`, "protylePlantumlScript").then(() => {
        plantumlElements.forEach((e) => {
            if (e.getAttribute("data-render") === "true") {
                return;
            }
            if (!e.firstElementChild.classList.contains("protyle-icons")) {
                e.insertAdjacentHTML("afterbegin", genIconHTML());
            }
            const renderElement = e.firstElementChild.nextElementSibling;
            try {
                renderElement.innerHTML = `<img src=${window.siyuan.config.editor.plantUMLServePath}${plantumlEncoder.encode(Lute.UnEscapeHTMLStr(e.getAttribute("data-content")))}">`;
                renderElement.classList.remove("ft__error");
                e.setAttribute("data-render", "true");
            } catch (error) {
                renderElement.classList.add("ft__error");
                renderElement.innerHTML = `plantuml render error: <br>${error}`;
            }
        });
    });
};
const mermaidRender = (element, cdn = Constants.PROTYLE_CDN) => {
    let mermaidElements = [];
    if (element.getAttribute("data-subtype") === "mermaid") {
        // 编辑器内代码块编辑渲染
        mermaidElements = [element];
    } else {
        mermaidElements = Array.from(element.querySelectorAll('[data-subtype="mermaid"]'));
    }
    if (mermaidElements.length === 0) {
        return;
    }
    addScript(`${cdn}/js/mermaid/mermaid.min.js?v=10.3.0`, "protyleMermaidScript").then(() => {
        const config = {
            securityLevel: "loose", // 升级后无 https://github.com/siyuan-note/siyuan/issues/3587，可使用该选项
            altFontFamily: "sans-serif",
            fontFamily: "sans-serif",
            startOnLoad: false,
            flowchart: {
                htmlLabels: true,
                useMaxWidth: !0
            },
            sequence: {
                useMaxWidth: true,
                diagramMarginX: 8,
                diagramMarginY: 8,
                boxMargin: 8,
                showSequenceNumbers: true // Mermaid 时序图增加序号 https://github.com/siyuan-note/siyuan/pull/6992 https://mermaid.js.org/syntax/sequenceDiagram.html#sequencenumbers
            },
            gantt: {
                leftPadding: 75,
                rightPadding: 20
            }
        };
        if (window.siyuan.config.appearance.mode === 1) {
            config.theme = "dark";
        }
        mermaid.initialize(config);
        if (mermaidElements[0].firstElementChild.clientWidth === 0) {
            const hideElement = hasClosestByAttribute(mermaidElements[0], "fold", "1");
            if (!hideElement) {
                return;
            }
            const observer = new MutationObserver(() => {
                initMermaid(mermaidElements);
                observer.disconnect();
            });
            observer.observe(hideElement, { attributeFilter: ["fold"] });
        } else {
            initMermaid(mermaidElements);
        }
    });
};

const initMermaid = (mermaidElements) => {
    mermaidElements.forEach((item, index) => {
        if (item.getAttribute("data-render") === "true") {
            return;
        }
        if (!item.firstElementChild.classList.contains("protyle-icons")) {
            item.insertAdjacentHTML("afterbegin", `<div class="protyle-icons">
    <span aria-label="${window.siyuan.languages.edit}" class="b3-tooltips__sw b3-tooltips protyle-icon protyle-icon--first protyle-action__edit"><svg><use xlink:href="#iconEdit"></use></svg></span>
    <span aria-label="${window.siyuan.languages.more}" class="b3-tooltips__sw b3-tooltips protyle-icon protyle-action__menu protyle-icon--last"><svg><use xlink:href="#iconMore"></use></svg></span>
</div>`);
        }
        const renderElement = item.firstElementChild.nextElementSibling;
        renderElement.removeAttribute("data-processed");
        renderElement.textContent = Lute.UnEscapeHTMLStr(item.getAttribute("data-content"));
        setTimeout(() => {
            mermaid.init(undefined, renderElement);
        }, Constants.TIMEOUT_LOAD * index);
        item.setAttribute("data-render", "true");
        renderElement.setAttribute("contenteditable", "false");
        if (!item.textContent.endsWith(Constants.ZWSP)) {
            item.insertAdjacentHTML("beforeend", `<span style="position: absolute">${Constants.ZWSP}</span>`);
        }
    });
};

const flowchartRender = (element, cdn = Constants.PROTYLE_CDN) => {
    let flowchartElements = [];
    if (element.getAttribute("data-subtype") === "flowchart") {
        // 编辑器内代码块编辑渲染
        flowchartElements = [element];
    } else {
        flowchartElements = Array.from(element.querySelectorAll('[data-subtype="flowchart"]'));
    }
    if (flowchartElements.length === 0) {
        return;
    }
    addScript(`${cdn}/js/flowchart.js/flowchart.min.js?v=0.0.0`, "protyleFlowchartScript").then(() => {
        if (flowchartElements[0].firstElementChild.clientWidth === 0) {
            const hideElement = hasClosestByAttribute(flowchartElements[0], "fold", "1");
            if (!hideElement) {
                return;
            }
            const observer = new MutationObserver(() => {
                initFlowchart(flowchartElements);
                observer.disconnect();
            });
            observer.observe(hideElement, { attributeFilter: ["fold"] });
        } else {
            initFlowchart(flowchartElements);
        }
    });
};

const initFlowchart = (flowchartElements) => {
    flowchartElements.forEach((item) => {
        if (item.getAttribute("data-render") === "true") {
            return;
        }
        //  preview 不需要进行设置
        if (item.getAttribute("data-node-id")) {
            if (!item.firstElementChild.classList.contains("protyle-icons")) {
                item.insertAdjacentHTML("afterbegin", genIconHTML());
            }
            if (item.childElementCount < 4) {
                item.lastElementChild.insertAdjacentHTML("beforebegin", `<span style="position: absolute">${Constants.ZWSP}</span>`);
            }
        }
        const renderElement = (item.firstElementChild.nextElementSibling || item.firstElementChild);
        const flowchartObj = flowchart.parse(Lute.UnEscapeHTMLStr(item.getAttribute("data-content")));
        renderElement.innerHTML = "";
        try {
            flowchartObj.drawSVG(renderElement);
        } catch (error) {
            renderElement.classList.add("ft__error");
            renderElement.innerHTML = `Flow Chart render error: <br>${error}`;
        }
        renderElement.setAttribute("contenteditable", "false");
        item.setAttribute("data-render", "true");
    });
};

const chartRender = (element, cdn = Constants.PROTYLE_CDN) => {
    let echartsElements = [];
    if (element.getAttribute("data-subtype") === "echarts") {
        // 编辑器内代码块编辑渲染
        echartsElements = [element];
    } else {
        echartsElements = Array.from(element.querySelectorAll('[data-subtype="echarts"]'));
    }
    if (echartsElements.length === 0) {
        return;
    }
    if (echartsElements.length > 0) {
        addScript(`${cdn}/js/echarts/echarts.min.js?v=5.3.2`, "protyleEchartsScript").then(() => {
            addScript(`${cdn}/js/echarts/echarts-gl.min.js?v=2.0.9`, "protyleEchartsGLScript").then(() => {
                let width = undefined;
                if (echartsElements[0].firstElementChild.clientWidth === 0) {
                    const tabElement = hasClosestByClassName(echartsElements[0], "layout-tab-container", true);
                    if (tabElement) {
                        Array.from(tabElement.children).find(item => {
                            if (item.classList.contains("protyle") && !item.classList.contains("fn__none")) {
                                width = item.querySelector(".protyle-wysiwyg").firstElementChild.clientWidth;
                                return true;
                            }
                        });
                    }
                }
                echartsElements.forEach(async (e) => {
                    if (e.getAttribute("data-render") === "true") {
                        return;
                    }
                    if (!e.firstElementChild.classList.contains("protyle-icons")) {
                        e.insertAdjacentHTML("afterbegin", genIconHTML());
                    }
                    const renderElement = e.firstElementChild.nextElementSibling;
                    try {
                        renderElement.style.height = e.style.height;
                        const option = await looseJsonParse(Lute.UnEscapeHTMLStr(e.getAttribute("data-content")));
                        echarts.init(renderElement, window.siyuan.config.appearance.mode === 1 ? "dark" : undefined, { width }).setOption(option);
                        e.setAttribute("data-render", "true");
                        renderElement.classList.remove("ft__error");
                        if (!renderElement.textContent.endsWith(Constants.ZWSP)) {
                            renderElement.firstElementChild.insertAdjacentText("beforeend", Constants.ZWSP);
                        }
                    } catch (error) {
                        echarts.dispose(renderElement);
                        renderElement.classList.add("ft__error");
                        renderElement.innerHTML = `echarts render error: <br>${error}`;
                    }
                });
            });
        });
    }
};

const mindmapRender = (element, cdn = Constants.PROTYLE_CDN) => {
    let mindmapElements = [];
    if (element.getAttribute("data-subtype") === "mindmap") {
        // 编辑器内代码块编辑渲染
        mindmapElements = [element];
    } else {
        mindmapElements = Array.from(element.querySelectorAll('[data-subtype="mindmap"]'));
    }
    if (mindmapElements.length === 0) {
        return;
    }
    addScript(`${cdn}/js/echarts/echarts.min.js?v=0.0.0`, "protyleEchartsScript").then(() => {
        let width = undefined;
        if (mindmapElements[0].firstElementChild.clientWidth === 0) {
            const tabElement = hasClosestByClassName(mindmapElements[0], "layout-tab-container", true);
            if (tabElement) {
                Array.from(tabElement.children).find(item => {
                    if (item.classList.contains("protyle") && !item.classList.contains("fn__none") && item.querySelector(".protyle-wysiwyg").firstElementChild) {
                        width = item.querySelector(".protyle-wysiwyg").firstElementChild.clientWidth;
                        return true;
                    }
                });
            }
        }
        mindmapElements.forEach((e) => {
            if (e.getAttribute("data-render") === "true") {
                return;
            }
            if (!e.firstElementChild.classList.contains("protyle-icons")) {
                e.insertAdjacentHTML("afterbegin", genIconHTML());
            }
            const renderElement = e.firstElementChild.nextElementSibling;
            try {
                renderElement.style.height = e.style.height;
                echarts.init(renderElement, window.siyuan.config.appearance.mode === 1 ? "dark" : undefined, {
                    width,
                }).setOption({
                    series: [
                        {
                            data: [JSON.parse(Lute.EChartsMindmapStr(Lute.UnEscapeHTMLStr(e.getAttribute("data-content"))))],
                            initialTreeDepth: -1,
                            itemStyle: {
                                borderWidth: 0,
                                color: "#4285f4",
                            },
                            label: {
                                backgroundColor: "#f6f8fa",
                                borderColor: "#d1d5da",
                                borderRadius: 6,
                                borderWidth: 0.5,
                                color: "#586069",
                                lineHeight: 20,
                                offset: [-5, 0],
                                padding: [0, 5],
                                position: "insideRight",
                            },
                            lineStyle: {
                                color: "#d1d5da",
                                width: 1,
                            },
                            roam: true,
                            // @ts-ignores
                            symbol: (value, params) => {
                                if (params?.data?.children) {
                                    return "circle";
                                } else {
                                    return "path://";
                                }
                            },
                            type: "tree",
                        },
                    ],
                    tooltip: {
                        trigger: "item",
                        triggerOn: "mousemove",
                    },
                    backgroundColor: "transparent",
                });
                e.setAttribute("data-render", "true");
                if (!renderElement.textContent.endsWith(Constants.ZWSP)) {
                    renderElement.firstElementChild.insertAdjacentText("beforeend", Constants.ZWSP);
                }
                renderElement.classList.remove("ft__error");
            } catch (error) {
                renderElement.classList.add("ft__error");
                renderElement.innerHTML = `Mindmap render error: <br>${error}`;
            }
        });
    });
};

const graphvizRender = (element, cdn = Constants.PROTYLE_CDN) => {
    let graphvizElements = [];
    if (element.getAttribute("data-subtype") === "graphviz") {
        // 编辑器内代码块编辑渲染
        graphvizElements = [element];
    } else {
        graphvizElements = Array.from(element.querySelectorAll('[data-subtype="graphviz"]'));
    }
    if (graphvizElements.length === 0) {
        return;
    }
    addScript(`${cdn}/js/graphviz/viz.js?v=0.0.0`, "protyleGraphVizScript").then(() => {
        graphvizElements.forEach((e) => {
            if (e.getAttribute("data-render") === "true") {
                return;
            }
            if (!e.firstElementChild.classList.contains("protyle-icons")) {
                e.insertAdjacentHTML("afterbegin", genIconHTML());
            }
            const renderElement = e.firstElementChild.nextElementSibling;
            try {
                const blob = new Blob([`importScripts('${(document.getElementById("protyleGraphVizScript")).src.replace("viz.js", "full.render.js")}');`],
                    { type: "application/javascript" });
                const url = window.URL || window.webkitURL;
                const blobUrl = url.createObjectURL(blob);
                const worker = new Worker(blobUrl);
                new Viz({ worker })
                    .renderSVGElement(Lute.UnEscapeHTMLStr(e.getAttribute("data-content"))).then((result) => {
                        renderElement.innerHTML = result.outerHTML;
                        renderElement.classList.remove("ft__error");
                        renderElement.setAttribute("contenteditable", "false");
                        if (!e.textContent.endsWith(Constants.ZWSP)) {
                            e.insertAdjacentHTML("beforeend", `<span style="position: absolute">${Constants.ZWSP}</span>`);
                        }
                    }).catch((error) => {
                        renderElement.innerHTML = `graphviz render error: <br>${error}`;
                        renderElement.classList.add("ft__error");
                    });
            } catch (e) {
                console.error("Graphviz error", e);
            }
            e.setAttribute("data-render", "true");
        });
    });
};


const mathRender = (element, cdn = Constants.PROTYLE_CDN, maxWidth = false) => {
    let mathElements = [];
    if (element.getAttribute("data-subtype") === "math") {
        // 编辑器内代码块编辑渲染
        mathElements = [element];
    } else {
        mathElements = Array.from(element.querySelectorAll('[data-subtype="math"]'));
    }
    if (mathElements.length === 0) {
        return;
    }
    addStyle(`${cdn}/js/katex/katex.min.css?v=0.16.0`, "protyleKatexStyle");
    addScript(`${cdn}/js/katex/katex.min.js?v=0.16.0`, "protyleKatexScript").then(() => {
        addScript(`${cdn}/js/katex/mhchem.min.js?v=0.16.0`, "protyleKatexMhchemScript").then(() => {
            mathElements.forEach((mathElement) => {
                if (mathElement.getAttribute("data-render") === "true") {
                    return;
                }
                mathElement.setAttribute("data-render", "true");
                let renderElement = mathElement;
                if (mathElement.tagName === "DIV") {
                    renderElement = mathElement.firstElementChild;
                }
                let macros = {};
                try {
                    macros = JSON.parse(window.siyuan.config.editor.katexMacros || "{}");
                } catch (e) {
                    console.warn("KaTex macros is not JSON", e);
                }
                try {
                    renderElement.innerHTML = katex.renderToString(Lute.UnEscapeHTMLStr(mathElement.getAttribute("data-content")), {
                        displayMode: mathElement.tagName === "DIV",
                        output: "html",
                        macros,
                        trust: true, // REF: https://katex.org/docs/supported#html
                        strict: (errorCode) => errorCode === "unicodeTextInMathMode" ? "ignore" : "warn",
                    });
                    renderElement.classList.remove("ft__error");
                    const blockElement = hasClosestBlock(mathElement);
                    if (mathElement.tagName === "DIV") {
                        renderElement.firstElementChild.setAttribute("contenteditable", "false");
                        if (renderElement.childElementCount < 2) {
                            renderElement.insertAdjacentHTML("beforeend", `<span style="position: absolute">${Constants.ZWSP}</span>`);
                        }
                        // https://github.com/siyuan-note/siyuan/issues/3541
                        const baseElements = renderElement.querySelectorAll(".base");
                        if (baseElements.length > 0) {
                            baseElements[baseElements.length - 1].insertAdjacentHTML("afterend", "<span class='fn__flex-1'></span>");
                        }
                        // https://github.com/siyuan-note/siyuan/issues/4334
                        const newlineElement = renderElement.querySelector(".katex-html > .newline");
                        if (newlineElement) {
                            newlineElement.parentElement.style.display = "block";
                        }
                    } else {
                        if (blockElement && mathElement.getBoundingClientRect().width > blockElement.clientWidth) {
                            mathElement.style.maxWidth = "100%";
                            mathElement.style.overflowX = "auto";
                            mathElement.style.overflowY = "hidden";
                            mathElement.style.display = "inline-block";
                        } else {
                            mathElement.style.maxWidth = "";
                            mathElement.style.overflowX = "";
                            mathElement.style.overflowY = "";
                            mathElement.style.display = "";
                        }
                        const nextSibling = hasNextSibling(mathElement);
                        if (!nextSibling) {
                            // 表格编辑问题 https://ld246.com/article/1629191424824
                            if (mathElement.parentElement.tagName !== "TH" && mathElement.parentElement.tagName !== "TD") {
                                // 光标无法移动到末尾 https://github.com/siyuan-note/siyuan/issues/2112
                                mathElement.insertAdjacentText("afterend", "\n");
                            } else {
                                // https://ld246.com/article/1651595975481，https://ld246.com/article/1658903123429
                                // 随着浏览器的升级，从 beforeend 修改为 afterend
                                mathElement.insertAdjacentText("afterend", Constants.ZWSP);
                            }
                        } else if (nextSibling && nextSibling.nodeType !== 3 && (nextSibling).getAttribute("data-type")?.indexOf("inline-math") > -1) {
                            // 相邻的数学公式删除或光标移动有问题
                            mathElement.after(document.createTextNode(Constants.ZWSP));
                        } else if (nextSibling &&
                            !nextSibling.textContent.startsWith("\n") && // https://github.com/siyuan-note/insider/issues/1089
                            // 输入 $a$ 后，光标移动到其他块，再点击 a 后，光标不显示 https://github.com/siyuan-note/insider/issues/1076#issuecomment-1253215515
                            nextSibling.textContent !== Constants.ZWSP) {
                            // 数学公式后一个字符删除多 br https://ld246.com/article/1647157880974
                            // 数学公式后有 \n 不能再添加 &#xFEFF; https://ld246.com/article/1647329437541
                            mathElement.insertAdjacentHTML("beforeend", "&#xFEFF;");
                        }
                        // 光标无法移动到段首 https://ld246.com/article/1623551823742
                        if (mathElement.previousSibling?.textContent.endsWith("\n")) {
                            mathElement.insertAdjacentText("beforebegin", Constants.ZWSP);
                        } else if (!hasPreviousSibling(mathElement) && ["TH", "TD"].includes(mathElement.parentElement.tagName)) {
                            // 单元格中只有数学公式时，光标无法移动到数学公式前
                            mathElement.insertAdjacentText("afterbegin", Constants.ZWSP);
                        }
                    }

                    // export pdf
                    if (maxWidth) {
                        setTimeout(() => {
                            if (mathElement.tagName === "DIV") {
                                const katexElement = mathElement.querySelector(".katex-display");
                                if (katexElement.clientWidth < katexElement.scrollWidth) {
                                    katexElement.firstElementChild.setAttribute("style", `font-size:${katexElement.clientWidth * 100 / katexElement.scrollWidth}%`);
                                }
                            } else {
                                if (blockElement && mathElement.offsetWidth > blockElement.clientWidth) {
                                    mathElement.firstElementChild.setAttribute("style", `font-size:${blockElement.clientWidth * 100 / mathElement.offsetWidth}%`);
                                }
                            }
                        });
                    }
                } catch (e) {
                    renderElement.innerHTML = e.message;
                    renderElement.classList.add("ft__error");
                }
            });
        });
    });
};
const processRender = (previewPanel) => {
    const language = previewPanel.getAttribute("data-subtype");
    if (!["abc", "plantuml", "mermaid", "flowchart", "echarts", "mindmap", "graphviz", "math"].includes(language) || previewPanel.getAttribute("data-type") !== "NodeHTMLBlock") {
        abcRender(previewPanel);
        htmlRender(previewPanel);
        plantumlRender(previewPanel);
        mermaidRender(previewPanel);
        flowchartRender(previewPanel);
        chartRender(previewPanel);
        mindmapRender(previewPanel);
        graphvizRender(previewPanel);
        mathRender(previewPanel);
        return;
    }
    if (language === "abc") {
        abcRender(previewPanel);
    } else if (language === "plantuml") {
        plantumlRender(previewPanel);
    } else if (language === "mermaid") {
        mermaidRender(previewPanel);
    } else if (language === "flowchart") {
        flowchartRender(previewPanel);
    } else if (language === "echarts") {
        chartRender(previewPanel);
    } else if (language === "mindmap") {
        mindmapRender(previewPanel);
    } else if (language === "graphviz") {
        graphvizRender(previewPanel);
    } else if (language === "math") {
        mathRender(previewPanel);
    } else if (previewPanel.getAttribute("data-type") === "NodeHTMLBlock") {
        htmlRender(previewPanel);
    }
};


const setCodeTheme = (cdn = Constants.PROTYLE_CDN) => {
    const protyleHljsStyle = document.getElementById("protyleHljsStyle");
    let css;
    if (window.siyuan.config.appearance.mode === 0) {
        css = window.siyuan.config.appearance.codeBlockThemeLight;
        if (!Constants.SIYUAN_CONFIG_APPEARANCE_LIGHT_CODE.includes(css)) {
            css = "default";
        }
    } else {
        css = window.siyuan.config.appearance.codeBlockThemeDark;
        if (!Constants.SIYUAN_CONFIG_APPEARANCE_DARK_CODE.includes(css)) {
            css = "github-dark";
        }
    }
    const href = `${cdn}/js/highlight.js/styles/${css}.min.css?v=11.5.0`;
    if (!protyleHljsStyle) {
        addStyle(href, "protyleHljsStyle");
    } else if (!protyleHljsStyle.href.includes(href)) {
        protyleHljsStyle.remove();
        addStyle(href, "protyleHljsStyle");
    }
};


const highlightRender = (element, cdn = Constants.PROTYLE_CDN) => {
    let codeElements;
    let isPreview = false;
    if (element.classList.contains("code-block")) {
        // 编辑器内代码块编辑渲染
        codeElements = element.querySelectorAll("[spellcheck]");
    } else {
        if (element.classList.contains("item__readme")) {
            // bazaar reademe
            codeElements = element.querySelectorAll("pre code");
            codeElements.forEach(item => {
                item.parentElement.setAttribute("lineNumber", "false");
            });
        } else if (element.classList.contains("b3-typography")) {
            // preview & export html markdown
            codeElements = element.querySelectorAll(".code-block code");
            isPreview = true;
        } else {
            codeElements = element.querySelectorAll(".code-block [spellcheck]");
        }
    }
    if (codeElements.length === 0) {
        return;
    }

    setCodeTheme(cdn);

    addScript(`${cdn}/js/highlight.js/highlight.min.js?v=11.7.0`, "protyleHljsScript").then(() => {
        addScript(`${cdn}/js/highlight.js/third-languages.js?v=1.0.1`, "protyleHljsThirdScript").then(() => {
            codeElements.forEach((block) => {
                const iconElements = block.parentElement.querySelectorAll(".protyle-icon");
                if (iconElements.length === 2) {
                    iconElements[0].setAttribute("aria-label", window.siyuan.languages.copy);
                    iconElements[1].setAttribute("aria-label", window.siyuan.languages.more);
                }
                if (block.getAttribute("data-render") === "true") {
                    return;
                }
                const wbrElement = block.querySelector("wbr");
                let startIndex = 0;
                if (wbrElement) {
                    let previousSibling = wbrElement.previousSibling;
                    while (previousSibling) {
                        startIndex += previousSibling.textContent.length;
                        while (!previousSibling.previousSibling && previousSibling.parentElement.tagName !== "DIV") {
                            // 高亮 span 中输入
                            previousSibling = previousSibling.parentElement;
                        }
                        previousSibling = previousSibling.previousSibling;
                    }
                    wbrElement.remove();
                }

                let language;
                if (isPreview) {
                    language = block.parentElement.getAttribute("data-language"); // preview
                } else if (block.previousElementSibling) {
                    language = block.previousElementSibling.firstElementChild.textContent;
                } else {
                    // bazaar readme
                    language = block.className.replace("language-", "");
                }
                if (!hljs.getLanguage(language)) {
                    language = "plaintext";
                }
                block.classList.add("hljs");
                block.setAttribute("data-render", "true");
                const autoEnter = block.parentElement.getAttribute("linewrap");
                const ligatures = block.parentElement.getAttribute("ligatures");
                const lineNumber = block.parentElement.getAttribute("linenumber");
                if (autoEnter === "true" || (autoEnter !== "false" && window.siyuan.config.editor.codeLineWrap)) {
                    block.style.setProperty("white-space", "pre-wrap");
                    block.style.setProperty("word-break", "break-all");
                } else {
                    // https://ld246.com/article/1684031600711 该属性会导致有 tab 后光标跳至末尾，目前无解
                    block.style.setProperty("white-space", "pre");
                    block.style.setProperty("word-break", "initial");
                }
                if (ligatures === "true" || (ligatures !== "false" && window.siyuan.config.editor.codeLigatures)) {
                    block.style.fontVariantLigatures = "normal";
                } else {
                    block.style.fontVariantLigatures = "none";
                }
                const languageElement = block.parentElement.querySelector(".protyle-action__language");
                if (!isPreview && (lineNumber === "true" || (lineNumber !== "false" && window.siyuan.config.editor.codeSyntaxHighlightLineNum))) {
                    // 需要先添加 class 以防止抖动 https://ld246.com/article/1648116585443
                    block.classList.add("protyle-linenumber");
                    setTimeout(() => {
                        // windows 需等待字体下载完成再计算，否则导致不换行，高度计算错误
                        lineNumberRender(block);
                    }, 20);
                    if (languageElement) {
                        languageElement.style.marginLeft = "3.6em";
                    }
                } else if (block.nextElementSibling?.classList.contains("protyle-linenumber__rows")) {
                    block.classList.remove("protyle-linenumber");
                    block.nextElementSibling.remove();
                    if (languageElement) {
                        languageElement.style.marginLeft = "";
                    }
                }
                // 搜索定位
                const layoutElement = hasClosestByClassName(block, "search__layout", true);
                if (layoutElement && block.parentElement.getAttribute("data-node-id") === layoutElement.querySelector("#searchList > .b3-list-item--focus")?.getAttribute("data-node-id")) {
                    const matchElement = block.querySelector('span[data-type="search-mark"]');
                    if (matchElement) {
                        matchElement.scrollIntoView();
                    }
                }
                block.innerHTML = hljs.highlight(
                    block.textContent + (block.textContent.endsWith("\n") ? "" : "\n"), // https://github.com/siyuan-note/siyuan/issues/4609
                    {
                        language,
                        ignoreIllegals: true
                    }).value;
                if (wbrElement && getSelection().rangeCount > 0) {
                    focusByOffset(block, startIndex, startIndex);
                }
            });
        });
    });
};

const lineNumberRender = (block) => {
    if (block.parentElement.getAttribute("lineNumber") === "false") {
        return;
    }
    if (block.nextElementSibling && block.nextElementSibling.clientHeight === block.clientHeight) {
        return;
    }
    block.classList.add("protyle-linenumber");
    const lineNumberTemp = document.createElement("div");
    lineNumberTemp.className = "hljs protyle-linenumber";
    lineNumberTemp.setAttribute("style", `padding-top:0 !important;padding-bottom:0 !important;min-height:auto !important;white-space:${block.style.whiteSpace};word-break:${block.style.wordBreak};font-variant-ligatures:${block.style.fontVariantLigatures};`);
    lineNumberTemp.setAttribute("contenteditable", "true");
    block.insertAdjacentElement("afterend", lineNumberTemp);

    let lineNumberHTML = "";
    const lineList = block.textContent.split(/\r\n|\r|\n|\u2028|\u2029/g);
    if (lineList[lineList.length - 1] === "" && lineList.length > 1) {
        lineList.pop();
    }
    const isWrap = block.style.wordBreak === "break-all";
    lineList.map((line) => {
        let lineHeight = "";
        if (isWrap) {
            lineNumberTemp.textContent = line || "\n";
            const height = lineNumberTemp.getBoundingClientRect().height;
            lineHeight = ` style="height:${height}px;"`;
        }
        lineNumberHTML += `<span${lineHeight}></span>`;
    });

    lineNumberTemp.remove();
    if (block.nextElementSibling?.classList.contains("protyle-linenumber__rows")) {
        block.nextElementSibling.innerHTML = lineNumberHTML;
    } else {
        block.insertAdjacentHTML("afterend", `<span contenteditable="false" class="protyle-linenumber__rows">${lineNumberHTML}</span>`);
    }
};
const openByMobile = (uri) => {
    if (!uri) {
        return;
    }
    if (window.siyuan.config.system.container === "ios") {
        window.location.href = uri;
    } else if (window.siyuan.config.system.container === "android" && window.JSAndroid) {
        window.JSAndroid.openExternal(uri);
    } else {
        window.open(uri);
    }
};
class modemkiller extends Plugin {
    onload() {
        console.log('保护猫猫，人人有责')
        this.注册导出图片菜单()
    }
    注册导出图片菜单() {
        this.eventBus.on("click-editortitleicon", (e) => this.插入导出图片菜单(e));
    }
    插入导出图片菜单(e) {
        console.log(e, this)
        const { menu, protyle } = e.detail
        menu.addItem({
            label: this.i18n.导出多图,
            click: () => {
                console.log(protyle)
                this.显示导出对话框(protyle)
            }
        })
    }
    显示导出对话框(protyle) {
        let { Dialog, fetchPost } = clientApi
        let { id } = protyle.block
        console.log(Dialog)
        const frontEnd = clientApi.getFrontend();
        this.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile";

        const exportDialog = new Dialog({
            title: window.siyuan.languages.exportAsImage,
            content: `<div class="b3-dialog__content" style="${this.isMobile ? "padding:8px;" : ""};background-color: var(--b3-theme-background)">
            <canvas id="export-bglayer" class="bglayer" style="background-image: url(&quot;/public/siyuan-plugin-background-cover/assets/images/hash-6130f530e783c70.png&quot;); filter: blur(0px); background-position: 50% 50%;overflow:hidden"></canvas>       
            <div 
                style="${this.isMobile ? "padding: 16px;margin: 16px 0" : "padding: 48px;margin: 8px 0 8px"};
                        border: 1px solid var(--b3-border-color);
                        border-radius: var(--b3-border-radius-b);
                        max-height:calc(100% - 48px);overflow:auto" 
                        class="export-img export-img-multi protyle-wysiwyg${window.siyuan.config.editor.displayBookmarkIcon ? " protyle-wysiwyg--attr" : ""}" id="preview">
                    </div>
            <div class="config-about__logo fn__flex" style="z-index:1">
            <div>
                <img src="/stage/icon.png">
                <span>${this.i18n.思源笔记}</span>
                <span class="fn__space"></span>
                <span class="ft__on-surface">${this.i18n.重构你的思维}</span>
            </div>
            <div class='fn__space fn__flex-1' style='text-align:center;color:transparent'>
             知行合一&nbsp;经世致用
            </div>
                <div>
                    <span class="ft__on-surface">${this.i18n.匠造为常}</span>
                    <span class="fn__space"></span>
                    <span>${this.i18n.椽承设计}</span>
                    <img src="/plugins/modemkiller/logo.png">
                </div> 
            </div>
        </div>
            <div class="fn__hr--b"></div>
        <div class="fn__hr--b"></div>
    </div>
    <div class="b3-dialog__action" style='z-index:1'>
        <label class="fn__flex">
            ${window.siyuan.languages.exportPDF5}
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
        <option value="按分割线">${this.i18n.使用分割线}</option>
        <option value="按大纲最高级">${this.i18n.按大纲最高级}</option>

    </select>

        <button disabled class="b3-button b3-button--cancel">${window.siyuan.languages.cancel}</button><div class="fn__space"></div>
        <button disabled class="b3-button b3-button--text">${window.siyuan.languages.confirm}</button>
    </div>
     <div class="fn__loading"><img height="128px" width="128px" src="stage/loading-pure.svg"></div>`,
            width: this.isMobile ? "92vw" : "990px",
            height: "70vh"
        });
        const ratioSelect = exportDialog.element.querySelector("#ratio");

        const btnsElement = exportDialog.element.querySelectorAll(".b3-button");
        btnsElement[0].addEventListener("click", () => {
            exportDialog.destroy();
        });
        btnsElement[1].addEventListener("click", () => {
            const selectedRatio = ratioSelect.value;
            //按照分割线导出
            if (selectedRatio == '按分割线') {
                setTimeout(async () => {
                    (exportDialog.element.querySelector(".b3-dialog__container")).style.height = "";
                    addScript("/stage/protyle/js/html2canvas.min.js?v=1.4.1", "protyleHtml2canvas").then(async () => {
                        //按照分割线导出
                        previewElement.parentElement.style.maxHeight = ""
                        let separatorElements = previewElement.querySelectorAll(':scope > .hr');
                        console.log(separatorElements)
                        if (separatorElements[0]) {
                            previewElement.scrollTo({ top: 0 });
                            previewElement.style.maxHeight = separatorElements[0].offsetTop - parseInt(getComputedStyle(previewElement).paddingBottom) + 'px'
                            previewElement.style.height = separatorElements[0].offsetTop + 'px'
                            let canvas = await html2canvas(previewElement.parentElement, {
                                width: previewElement.parentElement.clientWidth,
                                height: previewElement.parentElement.clientHeight,
                                useCORS: true
                            })
                            const blobPromise = () => {
                                return new Promise((resolve, reject) => {
                                    canvas.toBlob((blob) => {
                                        try {
                                            const formData = new FormData();
                                            formData.append("file", blob, btnsElement[1].getAttribute("data-title") + 0 + ".png");
                                            formData.append("type", "image/png");
                                            fetchPost("/api/export/exportAsFile", formData, (response) => {
                                                openByMobile(response.data.file);
                                            });
                                            resolve(true)
                                        } catch (e) {
                                            reject(e)
                                        }
                                    })

                                })

                            }
                            await blobPromise()

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
                                const blobPromise = () => {
                                    return new Promise((resolve, reject) => {
                                        canvas.toBlob((blob) => {
                                            try {
                                                const formData = new FormData();
                                                formData.append("file", blob, btnsElement[1].getAttribute("data-title") + i + 1 + ".png");
                                                formData.append("type", "image/png");
                                                fetchPost("/api/export/exportAsFile", formData, (response) => {
                                                    openByMobile(response.data.file);
                                                });
                                                resolve(true)
                                            } catch (e) {
                                                reject(e)
                                            }
                                        })

                                    })

                                }
                                await blobPromise()

                            }
                        } else {
                            previewElement.scrollTo({ top: 0 });
                            previewElement.style.maxHeight = previewElement.scrollHeight + 'px'
                            previewElement.style.height = previewElement.scrollHeight + 'px'
                            let canvas = await html2canvas(previewElement.parentElement, {
                                width: previewElement.parentElement.clientWidth,
                                height: previewElement.parentElement.clientHeight,
                                useCORS: true
                            })
                            const blobPromise = () => {
                                return new Promise((resolve, reject) => {
                                    canvas.toBlob((blob) => {
                                        try {
                                            const formData = new FormData();
                                            formData.append("file", blob, btnsElement[1].getAttribute("data-title") + 0 + ".png");
                                            formData.append("type", "image/png");
                                            fetchPost("/api/export/exportAsFile", formData, (response) => {
                                                openByMobile(response.data.file);
                                            });
                                            resolve(true)
                                        } catch (e) {
                                            reject(e)
                                        }
                                    })

                                })

                            }
                            await blobPromise()

                        }
                    });
                }, 500);
            }
            else if (selectedRatio == '按大纲最高级') {
                setTimeout(async () => {
                    (exportDialog.element.querySelector(".b3-dialog__container")).style.height = "";
                    addScript("/stage/protyle/js/html2canvas.min.js?v=1.4.1", "protyleHtml2canvas").then(async () => {
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

                        console.log(separatorElements)
                        if (separatorElements[0]) {
                            previewElement.scrollTo({ top: 0 });
                            previewElement.style.maxHeight = separatorElements[0].offsetTop - parseInt(getComputedStyle(previewElement).paddingBottom) + 'px'
                            previewElement.style.height = separatorElements[0].offsetTop - parseInt(getComputedStyle(previewElement).paddingBottom) + 'px'
                            let canvas = await html2canvas(previewElement.parentElement, {
                                width: previewElement.parentElement.clientWidth,
                                height: previewElement.parentElement.clientHeight,
                                useCORS: true
                            })
                            const blobPromise = () => {
                                return new Promise((resolve, reject) => {
                                    canvas.toBlob((blob) => {
                                        try {
                                            const formData = new FormData();
                                            formData.append("file", blob, btnsElement[1].getAttribute("data-title") + 0 + ".png");
                                            formData.append("type", "image/png");
                                            fetchPost("/api/export/exportAsFile", formData, (response) => {
                                                openByMobile(response.data.file);
                                            });
                                            resolve(true)
                                        } catch (e) {
                                            reject(e)
                                        }
                                    })

                                })

                            }
                            await blobPromise()

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
                                const blobPromise = () => {
                                    return new Promise((resolve, reject) => {
                                        canvas.toBlob((blob) => {
                                            try {
                                                const formData = new FormData();
                                                formData.append("file", blob, btnsElement[1].getAttribute("data-title") + i + 1 + ".png");
                                                formData.append("type", "image/png");
                                                fetchPost("/api/export/exportAsFile", formData, (response) => {
                                                    openByMobile(response.data.file);
                                                });
                                                resolve(true)
                                            } catch (e) {
                                                reject(e)
                                            }
                                        })

                                    })

                                }
                                await blobPromise()

                            }
                        } else {
                            previewElement.scrollTo({ top: 0 });
                            previewElement.style.maxHeight = previewElement.scrollHeight + 'px'
                            previewElement.style.height = previewElement.scrollHeight + 'px'
                            let canvas = await html2canvas(previewElement.parentElement, {
                                width: previewElement.parentElement.clientWidth,
                                height: previewElement.parentElement.clientHeight,
                                useCORS: true
                            })
                            const blobPromise = () => {
                                return new Promise((resolve, reject) => {
                                    canvas.toBlob((blob) => {
                                        try {
                                            const formData = new FormData();
                                            formData.append("file", blob, btnsElement[1].getAttribute("data-title") + 0 + ".png");
                                            formData.append("type", "image/png");
                                            fetchPost("/api/export/exportAsFile", formData, (response) => {
                                                openByMobile(response.data.file);
                                            });
                                            resolve(true)
                                        } catch (e) {
                                            reject(e)
                                        }
                                    })

                                })

                            }
                            await blobPromise()

                        }
                    });
                }, 500);
            }
            else if (selectedRatio.indexOf('/') > 0) {
                //按照宽高比导出
                const [widthRatio, heightRatio] = selectedRatio.split("/");
                const RatioValue = parseInt(heightRatio) / parseInt(widthRatio)
                const width = previewElement.parentElement.clientWidth;
                const height = width * RatioValue;
                const innerWidth = previewElement.clientWidth
                const innerHeight = Math.min(innerWidth * RatioValue, height - 60);
                (exportDialog.element.querySelector(".b3-dialog__container")).style.height = "";
                previewElement.parentElement.style.height = height + 'px'
                previewElement.parentElement.style.maxHeight = height + 'px'
                previewElement.style.height = innerHeight + 'px'
                previewElement.style.maxHeight = innerHeight + 'px'
                setTimeout(async () => {
                    addScript("/stage/protyle/js/html2canvas.min.js?v=1.4.1", "protyleHtml2canvas").then(async () => {
                        //按照宽高比导出
                        const totalHeight = previewElement.scrollHeight;  // HTML内容的总高度
                        const numImages = Math.ceil(totalHeight / innerHeight);  // 需要的图片数量
                        for (let i = 0; i < numImages; i++) {
                            console.log(i)
                            console.log(innerHeight * i)
                            previewElement.scrollTo({ top: innerHeight * i })
                            let canvas = await html2canvas(previewElement.parentElement, {
                                width: width,
                                height: height,
                                useCORS: true
                            })
                            const blobPromise = () => {
                                return new Promise((resolve, reject) => {
                                    canvas.toBlob((blob) => {
                                        try {
                                            const formData = new FormData();
                                            formData.append("file", blob, btnsElement[1].getAttribute("data-title") + i + ".png");
                                            formData.append("type", "image/png");
                                            fetchPost("/api/export/exportAsFile", formData, (response) => {
                                                openByMobile(response.data.file);
                                            });
                                            resolve(true)
                                        } catch (e) {
                                            reject(e)
                                        }
                                    })

                                })

                            }
                            await blobPromise()
                        }
                    });
                }, 500);
            }

        });
        const previewElement = exportDialog.element.querySelector("#preview");
        const exportBgLayer = exportDialog.element.querySelector("#export-bglayer");

        const foldElement = (exportDialog.element.querySelector("#keepFold"));
        foldElement.addEventListener("change", () => {
            btnsElement[0].setAttribute("disabled", "disabled");
            btnsElement[1].setAttribute("disabled", "disabled");
            btnsElement[1].parentElement.insertAdjacentHTML("afterend", '<div class="fn__loading"><img height="128px" width="128px" src="stage/loading-pure.svg"></div>');
            window.siyuan.storage['local-exportimg'].keepFold = foldElement.checked;
            fetchPost("/api/export/exportPreviewHTML", {
                id,
                keepFold: foldElement.checked,
                image: true,
            }, (response) => {
                refreshPreview(response);
            });
        });
        const refreshPreview = (response) => {
            previewElement.innerHTML = response.data.content;
            processRender(previewElement);
            highlightRender(previewElement);
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
            btnsElement[0].removeAttribute("disabled");
            btnsElement[1].removeAttribute("disabled");
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
            exportDialog.element.querySelector(".fn__loading").remove();
        };
        fetchPost("/api/export/exportPreviewHTML", {
            id,
            keepFold: foldElement.checked,
            image: true,
        }, (response) => {
            refreshPreview(response);
            btnsElement[1].setAttribute("data-title", response.data.name);
        });

    }
}
module.exports = modemkiller