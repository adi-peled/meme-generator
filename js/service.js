
'use strict'
var num = 19
const PAGE_SIZE = 5
var gPageIdx = 0;

var gId = 0
var gKeywords = { 'happy': 12, 'popular': 7, 'animals': 4, 'funny': 6, 'cute': 2, 'evil': 4 }
// var gImgs = [{ id: 1, url: 'img/popo.jpg', keywords: ['happy'] }];
var gKeywordsImgs =
    ['popular', 'animals', 'cute', 'animals', 'cute', 'funny', 'funny', 'funny', 'evil', 'funny', 'popular', 'funny', 'cute', 'evil', 'funny', 'popular', 'funny', 'cute']
var imgNames = ['trump', 'dogs', 'sleep', 'cat', 'strong baby']
var gImgs = createImgs()
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 40,
            align: 'left',
            color: 'red',
            position: { x: 100, y: 100 }
        },
        {
            txt: 'gdrgdr',
            size: 40,
            align: 'left',
            color: 'red',
            position: { x: 100, y: 400 }
        }
    ]
}

function createImg(url, keyword) {
    var img = {
        id: ++gId,
        url: url,
        keywords: [keyword]
    }
    return img
}
function createImgs() {
    var imgs = []
    for (var i = 1; i < num; i++) {
        var img = createImg(`/meme-imgs (square)/${i}.jpg`, gKeywordsImgs[i])
        imgs.push(img)
    }
    return imgs
}


function getImgs() {
    return gImgs
}

function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my_img';
}






function getImgsForDisplay() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gImgs.slice(startIdx, startIdx + PAGE_SIZE)
}

function nextPage() {
    if ((gPageIdx + 1) * PAGE_SIZE >= gImgs.length) gPageIdx = 0;
    else gPageIdx++;
}
function prevPage() {
    if (!gPageIdx) return
    gPageIdx--;
}



function addLine() {
    var line = {
        txt: 'edit txt',
        size: 40,
        align: 'left',
        color: 'red',
        position: { x: 100, y: 250 }

    }
    gMeme.lines.push(line)
}


function switchLines() {
    var meme = getGmeme()
    if (meme.selectedLineIdx + 1 > meme.lines.length - 1) meme.selectedLineIdx = 0
    else meme.selectedLineIdx++
}



function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size++
    console.log(gMeme)
}


function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size--
}





function downLine() {

}

function upLine() {

}
