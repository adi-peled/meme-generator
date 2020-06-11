
'use strict'
var num = 19
const PAGE_SIZE = 6
var gPageIdx = 0;

var gId = 0
var gKeywords = { 'happy': 12, 'popular': 7, 'animals': 4, 'funny': 6, 'cute': 2, 'evil': 4, 'politicain': 3 }
// var gImgs = [{ id: 1, url: 'img/popo.jpg', keywords: ['happy'] }];
var gKeywordsImgs =
    [['popular', 'politician'], ['animals', 'cute'], ['animals', 'cute'], ['animals', 'cute'], ['funny', 'cute'],
    ['popular', 'politician'], ['animals', 'cute'], ['animals', 'cute'], ['animals', 'cute'], ['funny', 'cute'],
    ['popular', 'politician'], ['animals', 'cute'], ['animals', 'cute'], ['animals', 'cute'], ['funny', 'animals'],
    ['animals', 'cute'], ['politician', 'cute'], ['animals', 'funny'], ['cute', 'funny'],]
// var imgNames = ['trump', 'dogs', 'sleep', 'cat', 'strong baby']
var gImgs = createImgs()
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'text here',
            size: 50,
            align: 'left',
            color: { outLine: 'green', fill: 'blue' },
            position: { x: 150, y: 100 }
        },
        {
            txt: 'text here',
            size: 40,
            align: 'left',
            color: { outLine: 'yellow', fill: 'red' },
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
function resizeCanvas() {


}

function searchKey(value) {
    var imgs = []
    // var ids = []
    gImgs.filter(function (img) {
        img.keywords.filter(function (word) {
            if (word.includes(value)) {
                imgs.push(img)
            }
        })
    })
    if (value) {
        renderImgs(imgs)
    } else {
        renderImgs()
    }



}   