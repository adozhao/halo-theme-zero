let main=function(n){"use strict";const e="";function t(u,c){return u+c}return n.count=t,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),n}({});
main.currentColorScheme = localStorage.getItem('theme-mode') === 'dark' ? 'dark' : 'light'
window.onload = () => {
    let themeMode = localStorage.getItem('theme-mode')
    let fontMode = localStorage.getItem('font-mode')
    let html = document.documentElement
    let doc = document
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

    function setModeAnimation(cx, cy, pos){
        const clip = [`circle(0px at ${cx}px ${cy}px)`, `circle(${pos}px at ${cx}px ${cy}px)`];
        document.documentElement.animate({
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