'use strict'

var gElCanvas;
var gCtx;
var x = 100;
var y = 100;

function init() {
    gElCanvas = document.getElementById('canvas-meme');
    gCtx = gElCanvas.getContext('2d');

    gElCanvas.height = 450;
    gElCanvas.width = 450;
    renderImgs()
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
    // gElCanvas.height = 450;
    // gElCanvas.width = 450;
    var elContainer = document.querySelector('#canvas-meme');
    // if(screen.width<1000)
    // gElCanvas.width -= 5;
    // gElCanvas.height -= 5;
    // renderMeme()
}



function createMeme(imgId) {
    var meme = getGmeme()
    meme.selectedImgId = imgId
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


// line.txt, line.position.x, line.position.y,
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
    // gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
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