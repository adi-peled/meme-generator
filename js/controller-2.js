
function closeModal() {
    document.querySelector('.modal').classList.add('hidden')
}
function getGmeme() {
    return gMeme
}

function onIncreaseFont() {
    increaseFont()
    renderMeme()
}

function changeOutlineColor() {
    var meme = getGmeme()
    meme.lines[meme.selectedLineIdx].color.outLine = document.querySelector('.outline').value
    renderMeme()
}

function changeFillColor() {
    var meme = getGmeme()
    meme.lines[meme.selectedLineIdx].color.fill = document.querySelector('.fill').value
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}


function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}

function onNextPage() {
    nextPage();
    renderImgs();
}
function onPrevPage() {
    prevPage();
    renderImgs();
}
