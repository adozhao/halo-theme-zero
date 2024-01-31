window.main.currentColorScheme = localStorage.getItem('theme-mode') === 'dark' ? 'dark' : 'light'
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
            changeCommentMode('dark')
            themeMode = 'dark'
            localStorage.setItem('theme-mode', 'dark')
            html.dataset.colorScheme = 'dark'
            themeModeEl.innerText = "light"
        } else {
            changeCommentMode('light')
            themeMode = 'light'
            localStorage.setItem('theme-mode', 'light')
            html.dataset.colorScheme = 'light'
            themeModeEl.innerText = "dark"
        }
    }

    fontModeEl.onclick = function(){
        if (fontMode === 'serif') {
            fontMode = 'sans'
            localStorage.setItem('font-mode', 'sans');
            html.dataset.fontScheme = 'sans'
            fontModeEl.innerText = 'serif'
        } else {
            fontMode = 'serif'
            localStorage.setItem('font-mode', 'serif');
            html.dataset.fontScheme = 'serif'
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
        localStorage.setItem('theme-mode', 'light')
    }

    if (fontMode === 'sans') {
        html.dataset.fontScheme = 'sans'
        fontModeEl.innerText = "serif"
    }

}