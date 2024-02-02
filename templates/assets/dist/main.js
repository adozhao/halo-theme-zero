window.main=function(n){"use strict";const e="";function t(u,c){return u+c}return n.count=t,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),n}({});
const html = document.documentElement
const doc = document
if(localStorage.getItem('theme-mode') === 'dark'){
    main.currentColorScheme = 'dark'
    html.dataset.colorScheme = 'dark'
}
else{
    main.currentColorScheme = 'light'
    html.dataset.colorScheme = 'light'
}
document.addEventListener('DOMContentLoaded', function () {
    let themeMode = localStorage.getItem('theme-mode')
    let fontMode = localStorage.getItem('font-mode')
    const themeModeEl = doc.getElementById("dark-mode")
    const fontModeEl = doc.getElementById("sans-font")

    function changeCommentMode(mode) {
        html.dataset.colorScheme = mode
        const shadowRootParent = doc.querySelectorAll("#comment div div")
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

    function setModeAnimation(cx, cy, pos){
        const clip = [`circle(0px at ${cx}px ${cy}px)`, `circle(${pos}px at ${cx}px ${cy}px)`]
        html.animate({
            clipPath: themeMode === "dark" ? clip : [...clip].reverse()
        }, {
            duration: 350,
            easing: "ease-in",
            pseudoElement: themeMode === "dark" ? "::view-transition-new(root)" : "::view-transition-old(root)"
        })
    }

    function changeThemeMode(mode){
        html.dataset.colorScheme = mode
        changeCommentMode(mode)
        themeMode = mode
        localStorage.setItem('theme-mode', mode)
        themeModeEl.innerText = mode === "light"? 'dark' : 'light'
    }

    themeModeEl.onclick = function(e){
        const cx = e.clientX
        const cy = e.clientY
        const pos = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy))
        if (themeMode === 'light') {
            if(doc.startViewTransition){
                doc.startViewTransition(() =>{
                    changeThemeMode('dark')
                })
                .ready.then(()=>{
                    setModeAnimation(cx, cy, pos)
                })
            }
            else{
                changeThemeMode('dark')
            }
           
           
        } else {
            if(doc.startViewTransition){
                doc.startViewTransition(() =>{
                    changeThemeMode('light')
                })
                .ready.then(()=>{
                    setModeAnimation(cx, cy, pos)
                })
            }
            else{
                changeThemeMode('light')
            }
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
        themeMode = 'light'
        localStorage.setItem('theme-mode', 'light')
    }

    if (themeMode === 'dark') {
        html.dataset.colorScheme = 'dark'
        themeModeEl.innerText = "light"
    }

    if (!fontMode) {
        fontMode = 'serif'
        localStorage.setItem('font-mode', 'serif')
    }

    if (fontMode === 'sans') {
        html.dataset.fontScheme = 'sans'
        fontModeEl.innerText = "serif"
    }
});