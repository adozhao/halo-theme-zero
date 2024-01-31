window.main.currentColorScheme = localStorage.getItem('s') == 1 ? 'dark' : 'light'
window.onload = () => {
    let d = document,
        l = localStorage,
        s = l.getItem('s'),
        n = l.getItem('n'),
        h = d.documentElement,
        m = d.getElementById("dark-mode"),
        b = () => {
            h.dataset.colorScheme = 'light'
            m.innerHTML = "dark"
        },
        c = () => {
            h.dataset.colorScheme = 'dark'
            m.innerHTML = "light"
        },
        o = d.getElementById("sans-font"),
        e = () => {
            h.dataset.fontScheme = 'serif'
            o.innerHTML = "sans"
        },
        g = () => {
            h.dataset.fontScheme = 'sans'
            o.innerHTML = "serif"
        };

    function changeCommentMode(mode) {
        h.dataset.colorScheme = mode
        const e = document.querySelectorAll("#comment div div");
        e.length && e.forEach(n => {
            let s;
            const r = (s = n.shadowRoot) == null ? void 0 : s.querySelector(".halo-comment-widget");
            r && (r.classList.remove('light', 'dark'), r.classList.add(mode))
        }
        )
    }

    m.onclick = () => {
        if (s == 2) {
            changeCommentMode('dark')
            s = 1;
            l.setItem('s', s);
            c()
        } else {
            changeCommentMode('light')
            s = 2;
            l.setItem('s', s);
            b()
        }
    };
    o.onclick = () => {
        if (n == 2) {
            n = 1;
            l.setItem('n', n);
            g()
        } else {
            n = 2;
            l.setItem('n', n);
            e()
        }
    };
    if (!s) {
        s = 2;
        l.setItem('s', 2)
    };
    if (s == 1) {
        c()
    };
    if (!n) {
        n = 2;
        l.setItem('n', 2)
    };
    if (n == 1) {
        g()
    };

}