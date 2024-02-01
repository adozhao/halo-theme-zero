let main=function(n){"use strict";const e="";function t(u,c){return u+c}return n.count=t,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),n}({});
main.currentColorScheme = localStorage.getItem('theme-mode') === 'dark' ? 'dark' : 'light'
window.onload = () => {
    let themeMode = localStorage.getItem('theme-mode')
    let fontMode = localStorage.getItem('font-mode')
    let html = document.documentElement
    let themeModeEl = document.getElementById("dark-mode")
    let fontModeEl = document.getElementById("sans-font")

    function changeCommentMode(mode) {
        html.dataset.colorScheme = mode
        const shadowRootParent = document.querySelectorAll("#comment div div");
        if(shadowRootParent.length){
            shadowRootParent.forEach(parent => {
                    let shadowRoot = parent.shadowRoot
                    if(shadowRoot){
                        const commentWidget = shadowRoot.querySelector('.halo-comment-widget')
                        if(commentWidget){
                            commentWidget.classList.remove('light', 'dark')
                            commentWidget.classList.add(mode)
                        }
                    }
                }
            )
        }
    }

    themeModeEl.onclick = function(){
        if (themeMode === 'light') {
            html.dataset.colorScheme = 'dark'
            changeCommentMode('dark')
            themeMode = 'dark'
            localStorage.setItem('theme-mode', 'dark')
            themeModeEl.innerText = "light"
        } else {
            html.dataset.colorScheme = 'light'
            changeCommentMode('light')
            themeMode = 'light'
            localStorage.setItem('theme-mode', 'light')
            themeModeEl.innerText = "dark"
        }
    }

    fontModeEl.onclick = function(){
        if (fontMode === 'serif') {
            html.dataset.fontScheme = 'sans'
            fontMode = 'sans'
            localStorage.setItem('font-mode', 'sans');
            fontModeEl.innerText = 'serif'
        } else {
            html.dataset.fontScheme = 'serif'
            fontMode = 'serif'
            localStorage.setItem('font-mode', 'serif');
            fontModeEl.innerText = "sans"
        }
    }

    if (!themeMode) {
        delete html.dataset.hidden
        themeMode = 'light'
        localStorage.setItem('theme-mode', 'light')
    }

    if (themeMode === 'dark') {
        html.dataset.colorScheme = 'dark'
        delete html.dataset.hidden
        themeModeEl.innerText = "light"
    }
    else{
        delete html.dataset.hidden
    }

    if (!fontMode) {
        fontMode = 'serif'
        localStorage.setItem('theme-mode', 'light')
    }

    if (fontMode === 'sans') {
        html.dataset.fontScheme = 'sans'
        fontModeEl.innerText = "serif"
    }

}