let gameBoard = [];
let bgColor;
let colorSelected = false;


for(let i = 0; i < 49; i++){
    if (i === 0 || i === 43) {
        let html = `<div class="outer"><div class="lightblue"></div></div>`;  
        gameBoard[i] = html; 
    } else if ( i === 1 || i === 25) {
        let html = `<div class="outer"><div class="blue"></div></div>`;  
        gameBoard[i] = html; 
    } else if ( i === 2 || i === 17) {
        let html = `<div class="outer"><div class="yellow"></div></div>`;  
        gameBoard[i] = html; 
    } else if ( i === 12 || i === 32) {
        let html = `<div class="outer"><div class="green"></div></div>`;  
        gameBoard[i] = html; 
    } else if ( i === 15 || i === 30) {
        let html = `<div class="outer"><div class="red"></div></div>`;  
        gameBoard[i] = html; 
    } else if ( i === 22 || i === 48) {
        let html = `<div class="outer"><div class="orange"></div></div>`;  
        gameBoard[i] = html; 
    } else {
        let html = `<div class="outer"><div class="noColor"></div></div>`;  
        gameBoard[i] = html; 
    }  
}

$('.wires').html(gameBoard);


$('.lightblue').on('click', () => {
    if (colorSelected === false){
        colorSelected = true;
        bgColor = 'rgb(0, 255, 200)';
        $('.wires').css('cursor', 'url(img/brushlb.png) 12 32, pointer')        
    } else if (colorSelected === true) {
        bgColor = 'none';
        colorSelected = false;
        $('.wires').css('cursor', 'initial')  
    }    
})

$('.blue').click(() => {
    if (colorSelected === false){
        colorSelected = true;
        bgColor = 'rgb(36, 36, 173)';
        $('.wires').css('cursor', 'url(img/brushb.png) 12 32, pointer')  
    } else if (colorSelected === true) {
        bgColor = 'none';
        colorSelected = false;
        $('.wires').css('cursor', 'initial') 
    }    
})

$('.yellow').click(() => {
    if (colorSelected === false){
        colorSelected = true;
        bgColor = 'rgb(245, 245, 98)';
        $('.wires').css('cursor', 'url(img/brushy.png) 12 32, pointer')  
    } else if (colorSelected === true) {
        bgColor = 'none';
        colorSelected = false;
        $('.wires').css('cursor', 'initial') 
    }    
})

$('.green').click(() => {
    if (colorSelected === false){
        colorSelected = true;
        bgColor = 'rgb(84, 184, 84)';
        $('.wires').css('cursor', 'url(img/brushg.png) 12 32, pointer')  
    } else if (colorSelected === true) {
        bgColor = 'none';
        colorSelected = false;
        $('.wires').css('cursor', 'initial') 
    }    
})

$('.red').click(() => {
    if (colorSelected === false){
        colorSelected = true;
        bgColor = 'rgb(250, 59, 59)';
        $('.wires').css('cursor', 'url(img/brushr.png) 12 32, pointer')  
    } else if (colorSelected === true) {
        bgColor = 'none';
        colorSelected = false;
        $('.wires').css('cursor', 'initial') 
    }    
})

$('.orange').click(() => {
    if (colorSelected === false){
        colorSelected = true;
        bgColor = 'rgb(243, 143, 62)';
        $('.wires').css('cursor', 'url(img/brusho.png) 12 32, pointer')  
    } else if (colorSelected === true) {
        bgColor = 'none';
        colorSelected = false;
        $('.wires').css('cursor', 'initial') 
    }    
})


$('.noColor').mouseover(e => { 
    $(e.target).css('backgroundColor', bgColor);         
})

const tiles = $('.outer').children();

$('.btn').click(() => {
    let lb = 'rgb(0, 255, 200)';
    let b = 'rgb(36, 36, 173)';
    let y = 'rgb(245, 245, 98)';
    let g = 'rgb(84, 184, 84)';
    let r = 'rgb(250, 59, 59)';
    let o = 'rgb(243, 143, 62)';
    let lightblueDone = false;
    let blueDone = false;
    let yellowDone = false;
    let greenDone = false;
    let redDone = false;
    let orangeDone = false;
    
    if (tiles[7].style.backgroundColor === lb && tiles[14].style.backgroundColor === lb && tiles[21].style.backgroundColor === lb && tiles[28].style.backgroundColor === lb &&
        tiles[35].style.backgroundColor === lb && tiles[42].style.backgroundColor === lb) {
        lightblueDone = true;        
    }
    if (tiles[8].style.backgroundColor === b && tiles[9].style.backgroundColor === b && tiles[10].style.backgroundColor === b && tiles[18].style.backgroundColor === b) {
        blueDone = true;        
    }
    if (tiles[3].style.backgroundColor === y && tiles[4].style.backgroundColor === y && tiles[5].style.backgroundColor === y && tiles[6].style.backgroundColor === y &&
        tiles[13].style.backgroundColor === y && tiles[20].style.backgroundColor === y && tiles[27].style.backgroundColor === y && tiles[34].style.backgroundColor === y && 
        tiles[41].style.backgroundColor === y && tiles[40].style.backgroundColor === y && tiles[39].style.backgroundColor === y && tiles[38].style.backgroundColor === y && 
        tiles[31].style.backgroundColor === y && tiles[24].style.backgroundColor === y) {
        yellowDone = true;        
    }
    if (tiles[19].style.backgroundColor === g && tiles[26].style.backgroundColor === g && tiles[33].style.backgroundColor === g) {
        greenDone = true;        
    }
    if (tiles[16].style.backgroundColor === r && tiles[23].style.backgroundColor === r) {
        redDone = true;        
    }
    if (tiles[29].style.backgroundColor === o && tiles[36].style.backgroundColor === o && tiles[37].style.backgroundColor === o && tiles[44].style.backgroundColor === o &&
        tiles[45].style.backgroundColor === o && tiles[46].style.backgroundColor === o && tiles[47].style.backgroundColor === o) {
        orangeDone = true;        
    }
    if (lightblueDone, blueDone, yellowDone, greenDone, redDone, orangeDone) {
        basement.roomState = 5;
        basement.completion = 80;
        updateCompletion('Basement', basement.completion);                    
        clearCommandPrompt();
        $('.wires').css('display', 'none');
        $('.btn').css('display', 'none');
        stageTwoWriteText();
        changeImage('img/basementsafe.jpg');                    
    } 
})