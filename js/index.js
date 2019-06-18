// Your code goes here

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const navA = document.querySelectorAll('nav a');
navA.forEach(current => {
    current.addEventListener('mouseover', event => {
        current.style.color = 'red';
    });
    current.addEventListener('mouseleave', event => {
        current.style.color = null;
    });
});

const body = document.querySelector('body');
const sandyBeach = '#FFEBCD';
const shark = '#212529';

let boxes = []; // should cap at 3

function createBox() {
    if(boxes.length >= 3) return null;
    let box = document.createElement('div');
    box.style.position = 'fixed';
    if(!boxes.length) box.style.bottom = 0;
    else box.style.bottom = `${boxes.length * 30}px`;
    box.style.left = '10px';
    box.style.border = `2px solid ${sandyBeach}`;
    box.style.backgroundColor = '#fff';
    box.style.color = shark;
    box.style.width = '20%';
    box.style.padding = '5px 20px';
    box.style.margin = '10px 0';
    return box;
}

function showBox(ms, str) {
    let box = createBox();
    async function boxTimer() {
        if (str && str.length) box.textContent = str;
        body.appendChild(box);
        await sleep(ms);
        TweenMax.to(box, 0.5, {opacity:0,left:'-50px'});
        await sleep(500);
        body.removeChild(box);
    }
    boxTimer();
}

[...body.children].forEach(current => {
    current.addEventListener('dblclick', () => {
        if(!body.style.backgroundColor) body.style.backgroundColor = sandyBeach;
        else body.style.backgroundColor = null;
    });
});

window.addEventListener('load', () => {
    showBox(500, 'Page Loaded!');
});

window.addEventListener('resize', () => {
    showBox(500, 'Waiting...');
});

const myInput = document.querySelector('#myInput');
myInput.addEventListener('focus', () => {
    myInput.style.backgroundColor = sandyBeach;
});
myInput.addEventListener('blur', () => {
    myInput.style.backgroundColor = null;
});
window.addEventListener('scroll', () => {
    showBox(500, `Scrolled: ${window.scrollY}`);
});
myInput.addEventListener('keyup', event => {
    showBox(100, `You pressed: ${event.key}`)
});
window.addEventListener('wheel', event => {
    showBox(100, `Wheel delta: ${event.deltaY}`);
});
window.addEventListener('drag', event => {
    dragged = event.target;
    showBox(350, `You're dragging: ${event.target}`);
})




