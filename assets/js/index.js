window.addEventListener("load", main);

function main() {
    let canvas = document.querySelector("canvas");

    updateGraph();

    let button = document.getElementById('input-button');
    button.addEventListener('click', (evnt)=>{
        updateGraph();
    })

    let clear = document.getElementById('clear');
    clear.addEventListener('click', () => {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    })

    let save = document.getElementById('save');
    save.addEventListener('click', () => {
        console.log(getInput())
    })


    let mobileNav = document.querySelector('.mobile-nav');
    mobileNav.addEventListener('click', menuToggle);

    window.addEventListener('hashchange', () => {
        console.log('you are now viewing a new page');
    })

    let examples = document.querySelectorAll('.links a')
    examples.forEach((link) => { link.addEventListener('click', (evnt) => {
        let hash = evnt.target.hash.split('#');
        let url = hash[1];
        if (url) {
            fetch(`/pages/${url}.html`).then(results => results.text())
           .then(text => {
            let page = document.getElementById('content');
                page.innerHTML = text;
            })
        }
    })})
}

function menuToggle() {
    let nav = document.querySelector('.links');
    nav.classList.toggle('menu-closed');
}

function updateGraph() {
    getInput()
    eval(input.value);
}

function getInput() {
    let input = document.getElementById('input');
    return input.value
}

function naturalLog(x) {
    return Math.log(x);
}
function sahirFn(x) {
    return Math.pow(Math.atan(x), 1 / 3);
}