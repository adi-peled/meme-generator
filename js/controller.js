'use strict'

var gElCanvas;
var gCtx;
var x = 100;
var y = 100;

function init() {
    gElCanvas = document.getElementById('canvas-meme');
    gCtx = gElCanvas.getContext('2d');
    renderImgs()

    // gElCanvas.height = 450;
    // gElCanvas.width = 450;
}

function renderImgs(imgs = getImgsForDisplay()) {
    var elGallery = document.querySelector('.gallery')
    // var imgs = getImgsForDisplay()
    var strHtml = imgs.map(function (img) {
        return ` 
        <div onclick="createMeme(${img.id})"   > <img class="card-img" src="${img.url}" 
         >  </div>  `
    })
    elGallery.innerHTML = strHtml.join('')
}

function onResizeCanvas() {
    // console.log(elContainer)
    var elContainer = document.querySelector('.contain-canvas');

    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
    console.log(elContainer.offsetWidth)
    // gElCanvas.height = 450;
    // gElCanvas.width = 450;
}



function createMeme(imgId) {
    var meme = getGmeme()
    meme.selectedImgId = imgId
    renderMeme()
    onResizeCanvas()
    renderMeme()
}

function renderMeme() {
    var meme = getGmeme()
    renderImg(meme.selectedImgId)
    renderTxt()
    drawRect(meme.lines[meme.selectedLineIdx].position.x, meme.lines[meme.selectedLineIdx].position.y, meme.lines[meme.selectedLineIdx].txt)
}

function renderTxt(txt, position) {
    var meme = getGmeme()
    meme.lines.forEach(function (line, idx) {
        drawText(idx)
    })
}

function onUpLine() {
    upLine()
    renderMeme()
}

function onDownLine() {

    downLine()
    renderMeme()
}



function renderImg(imgId) {
    document.querySelector('.modal').classList.remove('hidden')
    var imgs = getImgs()
    var img = imgs.find(function (img) {
        return img.id === imgId
    })
    var elImg = new Image();
    var meme = getGmeme()
    meme.selectedImgId = imgId
    elImg.src = img.url
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);

}

function onSwitchLines() {
    switchLines()
    renderMeme()
}



function onAddLine() {
    var meme = getGmeme()
    addLine()
    meme.selectedLineIdx = meme.lines.length - 1

    renderMeme()

}



function drawText(idx) {
    var meme = getGmeme()
    var text = meme.lines[idx].txt
    var x = meme.lines[idx].position.x
    var y = meme.lines[idx].position.y
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = meme.lines[idx].color.outLine;
    gCtx.fillStyle = meme.lines[idx].color.fill;
    gCtx.font = meme.lines[idx].size + 'px impact'
    gCtx.textAlign = meme.lines[idx].align;

    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
    var widthWord = gCtx.measureText(meme.lines[idx].txt).width

    meme.lines[idx].width = widthWord


}
function writeTxt() {
    var txt = document.querySelector('.text-input').value
    var meme = getGmeme()
    meme.lines[meme.selectedLineIdx].txt = txt

    renderMeme()
}

function drawRect(x, y, txt) {
    var meme = getGmeme()
    gCtx.beginPath();
    gCtx.rect(x, y, meme.lines[meme.selectedLineIdx].width, -meme.lines[meme.selectedLineIdx].size);
    gCtx.strokeStyle = 'red';
    gCtx.stroke();
}

function onToggleMenu() {
    document.querySelector('.menu').classList.toggle('hidden')
}

function onSearchKey() {
    var sreachValue = document.querySelector('.search-input').value
    searchKey(sreachValue)

}



// var elem = document.getElementById('canvas-meme');
// var elemLeft = elem.offsetLeft + elem.clientLeft;
// var elemTop = elem.offsetTop + elem.clientTop;
// var context = elem.getContext('2d');
// var elements = [];
// console.log(elem, elemLeft, elemTop)

// elem.addEventListener('click', function (event) {
//     var x = event.pageX - elemLeft,
//         y = event.pageY - elemTop;

//     // Collision detection between clicked offset and element.
//     elements.forEach(function (element) {
//         if (y > element.top && y < element.top + element.height
//             && x > element.left && x < element.left + element.width) {
//             alert('clicked an element');
//         }
//     });

// }, false);