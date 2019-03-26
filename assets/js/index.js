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