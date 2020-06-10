'use strict'

var gElCanvas;
var gCtx;
var x = 100;
var y = 100;
function init() {
    gElCanvas = document.getElementById('canvas-meme');
    gCtx = gElCanvas.getContext('2d');
    renderImgs()
}

function renderImgs() {
    var elGallery = document.querySelector('.gallery')
    var imgs = getImgsForDisplay()
    var strHtml = imgs.map(function (img) {
        return ` 
        <div onclick="createMeme(${img.id})"  onclick="createPic(${img.id})" class="card-img"> <img src="${img.url}" 
         width="250" height="250" >  </div>  `
    })
    elGallery.innerHTML = strHtml.join('')

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
}

function renderTxt(txt, position) {
    var meme = getGmeme()
    meme.lines.forEach(function (line, idx) {

        console.log(line.position)
        drawText(line.txt, line.position.x, line.position.y, idx)
    })

}

function onUpline() {

    upLine()
}


function onDownLine() {

    downLine()
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
    SwitchLines()
    renderMeme()
}



function onAddLine() {
    var meme = getGmeme()
    addLine()
    meme.selectedLineIdx = meme.lines.length - 1

    renderMeme()
}



function drawText(text, x, y, idx) {
    var meme = getGmeme()
    gCtx.lineWidth = '2';
    // gCtx.strokeStyle = 'red';
    // gCtx.fillStyle = 'green';
    gCtx.font = meme.lines[idx].size + 'px impact'
    gCtx.textAlign = 'center';
    // gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);

}
function writeTxt() {
    var txt = document.querySelector('.text-input').value
    var meme = getGmeme()
    meme.lines[meme.selectedLineIdx].txt = txt
    renderMeme()
}



function onIncreaseFont() {
    increaseFont()
    renderMeme()
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}


function closeModal() {
    document.querySelector('.modal').classList.add('hidden')
}
function getGmeme() {
    return gMeme
}

function onNextPage() {
    nextPage();
    renderImgs();
}
function onPrevPage() {
    prevPage();
    renderImgs();
}


