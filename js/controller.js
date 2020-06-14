'use strict'

var gElCanvas;
var gCtx;
var x = 100;
var y = 100;
var gIsDrag = false

function init() {
    gElCanvas = document.getElementById('canvas-meme');
    gCtx = gElCanvas.getContext('2d');
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
    var elContainer = document.querySelector('.contain-canvas');

    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
    console.log(elContainer.offsetWidth)

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
    updateColors()
    drawRect(meme.lines[meme.selectedLineIdx].position.x, meme.lines[meme.selectedLineIdx].position.y, meme.lines[meme.selectedLineIdx].txt)
}

function renderTxt() {
    var meme = getGmeme()
    meme.lines.forEach(function (line) {
        drawText(line)
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

function onDragTxt(ev) {
    var meme = getGmeme()
    ev.preventDefault()
    if (!gIsDrag) return
    if (ev.type === 'mousemove') {
        var { offsetX, offsetY } = ev;
        meme.lines[meme.selectedLineIdx].position.y = offsetY
        meme.lines[meme.selectedLineIdx].position.x = offsetX
        renderMeme()
    } else {
        var rect = ev.target.getBoundingClientRect();
        var x = ev.targetTouches[0].pageX - rect.left;
        var y = ev.targetTouches[0].pageY - rect.top;
        meme.lines[meme.selectedLineIdx].position.y = y
        meme.lines[meme.selectedLineIdx].position.x = x
        renderMeme()
    }
    // drawLine(x, y)
}

function onStopDrag() {
    gIsDrag = false
    // stopDrag()
}

function onStartDrag() {
    gIsDrag = true
}

function drawText(line) {
    const { txt, position } = line
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = line.color.outLine;
    gCtx.fillStyle = line.color.fill;
    gCtx.font = line.size + 'px impact'
    gCtx.textAlign = line.align;
    gCtx.fillText(txt, position.x, position.y);
    gCtx.strokeText(txt, position.x, position.y);
    var widthWord = gCtx.measureText(txt).width
    line.width = widthWord
}

function writeTxt() {
    var txt = document.querySelector('.text-input').value
    var meme = getGmeme()
    meme.lines[meme.selectedLineIdx].txt = txt

    renderMeme()
}

function drawRect(x, y) {
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

function updateColors() {
    var meme = getGmeme()
    document.querySelector('.outline').value = meme.lines[meme.selectedLineIdx].color.outLine
    document.querySelector('.fill').value = meme.lines[meme.selectedLineIdx].color.fill
}
