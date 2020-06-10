'use strict'

var gElCanvas;
var gCtx;

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
        <div     onclick="renderModal(${img.id})"  onclick="createPic(${img.id})" class="card-img"> <img src="${img.url}" 
         width="250" height="250" >  </div>  `
    })
    elGallery.innerHTML = strHtml.join('')

}

function renderModal(imgId) {
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
    draw()
}



function renderTxt(txt, position) {
    var meme = getGmeme()
    gCtx.fillText(meme.lines[0], x, y);

}

function getGmeme() {
    return gMeme
}
function closeModal() {
    document.querySelector('.modal').classList.add('hidden')
}


function drawText(text, x, y) {
    console.log(text, x, y)
    var meme = getGmeme()

    gCtx.lineWidth = '2';
    // gCtx.strokeStyle = 'red';
    // gCtx.fillStyle = 'green';
    gCtx.font = '40px sans-serif';
    gCtx.textAlign = 'center';
    // gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
    meme.lines[meme.selectedLineIdx] = text

}



function draw() {
    var meme = getGmeme()
    renderModal(meme.selectedImgId)

    renderTxt(txt)


}
var x = 150;
var y = 50;

function writeTxt() {
    var txt = document.querySelector('.text-input').value
    drawText(txt, x, y)
}
function addLine() {

    var newLine = createLine()
    var meme = getGmeme()
    meme.selectedLineIdx++

    y += 50

    writeTxt(x, y)

}
function createLine() {
    var line =
    {
        txt: '',
        size: 20,
        align: 'left',
        color: 'red'
    }
    return line
}





function onNextPage() {
    nextPage();
    renderImgs();
}
function onPrevPage() {
    prevPage();
    renderImgs();
}