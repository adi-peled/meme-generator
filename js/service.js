
'use strict'
var num = 18
const PAGE_SIZE = 10
var gPageIdx = 0;

var gId = 0
var gKeywords = { 'happy': 12, 'popular': 7, 'animals': 4, 'funny': 6, 'cute': 2, 'evil': 4, 'politicain': 3, 'baby': 2 }
// var gImgs = [{ id: 1, url: 'img/popo.jpg', keywords: ['happy'] }];
var gKeywordsImgs =
    [['popular', 'politician', 'trump'], ['animals', 'cute'], ['animals', 'cute'], ['animals', 'cute'], ['baby', 'cute'],
    ['popular', 'history'], ['baby', 'cute'], ['funny', 'cute'], ['evil', 'cute'], ['obama', 'politician'],
    ['popular', 'sport'], ['haim', 'popular'], ['leonardo', 'funny'], ['animals', 'cute'], ['funny', 'animals'],
    ['x-men', 'cute'], ['politician', 'popular'], ['doll', 'funny'], ['cute', 'funny'],]
var gImgs = createImgs()
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'text here',
            size: 50,
            align: 'left',
            color: { outLine: '#f45364', fill: '#454332' },
            position: { x: 150, y: 100 }
        },
        {
            txt: 'text here',
            size: 40,
            align: 'left',
            color: { outLine: '#333444', fill: '#488991' },
            position: { x: 150, y: 400 }
        }
    ]
}

function createImg(url, keywords) {
    var img = {
        id: ++gId,
        url: url,
        keywords: keywords
    }
    return img
}
function createImgs() {
    var imgs = []
    for (var i = 0; i < num; i++) {
        var img = createImg(`imgs/${i + 1}.jpg`, gKeywordsImgs[i])
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
        txt: 'text here',
        size: 40,
        align: 'left',
        color: { outLine: 'green', fill: 'blue' },
        position: { x: 180, y: 250 }
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
}


function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size--
}

function downLine() {
    gMeme.lines[gMeme.selectedLineIdx].position.y += 10
}

function upLine() {
    gMeme.lines[gMeme.selectedLineIdx].position.y -= 10
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)

}


function searchKey(value) {
    var imgs = gImgs.filter(function (img) {
        return img.keywords.some(function (word) {
            return word.includes(value)
        })
    })
    if (value) {
        renderImgs(imgs)
    } else {
        renderImgs()
    }
}





