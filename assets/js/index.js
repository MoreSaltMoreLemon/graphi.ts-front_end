window.addEventListener("load", main);

function main() {
    // Create graph start
    let canvas = document.querySelector("canvas");
    let g = new Graphi(canvas);
    g.draw(canvas);
    const sine = g.genFn(Math.sin, { x: 0, y: 200 }, canvas.width, 200, 50, 5);
    g.drawLine(sine, "blue");
    // end
    let mobileNav = document.querySelector('.mobile-nav');
    mobileNav.addEventListener('click', menuToggle);

    window.addEventListener('hashchange', () => {
        console.log('you are now viewing a new page')
    })

    let examples = document.querySelectorAll('.links a')
    examples.forEach((link) => { link.addEventListener('click', (evnt) => {
        let hash = evnt.target.hash.split('#')
        let url = hash[1]
        if (url) {
            fetch(`/pages/${url}.html`).then(results => results.text())
           .then(text => {
            let page = document.getElementById('content')
                page.innerHTML = text
            })
        }
    })})
}

function menuToggle() {
    let nav = document.querySelector('.links');
    nav.classList.toggle('menu-closed');
}

function naturalLog(x) {
    return Math.log(x);
}
function sahirFn(x) {
    return Math.pow(Math.atan(x), 1 / 3);
}