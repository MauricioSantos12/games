// basic
// var characterOne = "X";
// var characterTwo = "O";

//icons
// var characterOne = "🔴";
// var characterTwo = "🔵";


//emojis
var characterOne = "😎";
var characterTwo = "🤖";



var roundWon = false;
let character = characterOne;
var adjusted_moveX = 0;
var adjusted_moveY = 0;

const INPUT_NAME = document.querySelector('input');
const STATUS_DISPLAY = document.querySelector('.game-notification');
const USER_DISPLAY = document.querySelector('.user');
const CONTAINER_PIANO = document.querySelector('.piano');
const GENERAL_CARD = document.querySelector('.card');
const CONTAINER_TRIQUI = document.querySelector('.triqui');

const BUTTON_TRIQUI = document.getElementById('triqui');
const BUTTON_PIANO = document.getElementById('piano');
const pianoKeys = document.querySelectorAll('.piano-keys .key');
const volumeSlider = document.querySelector('.volume-slider input');
const ARROW_LEFT = document.getElementById('arrow-left');
const IMAGE_CENTER = document.querySelector('.image_center');
const IMAGE_BOTTOM = document.querySelector('.image_bottom');

let audio = new Audio('tunes/a.wav');
let allKeys = []
audio.volume = 0;

//hide games

CONTAINER_PIANO.classList.toggle('hide');
CONTAINER_TRIQUI.classList.toggle('hide');
ARROW_LEFT.classList.toggle('hide');
IMAGE_CENTER.classList.toggle('hide');

//general

BUTTON_TRIQUI.addEventListener('click', ()=> {
  GENERAL_CARD.classList.toggle('hide');
  if(!CONTAINER_PIANO.classList.contains( 'hide' )){
    CONTAINER_PIANO.classList.toggle('hide');
  }
  if(!IMAGE_BOTTOM.classList.contains( 'hide' )){
    IMAGE_BOTTOM.classList.toggle('hide');
  }
  if(ARROW_LEFT.classList.contains( 'hide' )){
    ARROW_LEFT.classList.remove('hide');
  }
  if(IMAGE_CENTER.classList.contains( 'hide' )){
    IMAGE_CENTER.classList.remove('hide');
  }
  CONTAINER_TRIQUI.classList.remove("hide");
  USER_DISPLAY.innerHTML = `Hola ${INPUT_NAME.value}👋, mucha suerte ✌`;
  adjusted_moveY = -320;
  adjusted_moveX = 20
})

BUTTON_PIANO.addEventListener('click', ()=> {
  GENERAL_CARD.classList.toggle('hide');
  if(!CONTAINER_TRIQUI.classList.contains( 'hide' )){
    CONTAINER_TRIQUI.classList.toggle('hide');
  }
  if(!IMAGE_CENTER.classList.contains( 'hide' )){
    IMAGE_CENTER.classList.toggle('hide');
  }
  if(ARROW_LEFT.classList.contains( 'hide' )){
    ARROW_LEFT.classList.toggle('hide');
  }
  if(IMAGE_BOTTOM.classList.contains( 'hide' )){
    IMAGE_BOTTOM.classList.toggle('hide');
  }
  adjusted_moveX = 15
  adjusted_moveY = -120;
  audio.volume = 0.5;
  CONTAINER_PIANO.classList.remove("hide");
  USER_DISPLAY.innerHTML = `Hola ${INPUT_NAME.value} ✌`;
})

function principalView(){
  if(!CONTAINER_TRIQUI.classList.contains( 'hide' )){
    CONTAINER_TRIQUI.classList.toggle('hide');
  }
  if(!CONTAINER_PIANO.classList.contains( 'hide' )){
    CONTAINER_PIANO.classList.toggle('hide');
  }
  if(GENERAL_CARD.classList.contains( 'hide' )){
    GENERAL_CARD.classList.remove('hide');
  }
  if(!IMAGE_CENTER.classList.contains( 'hide' )){
    IMAGE_CENTER.classList.toggle('hide');
  }
  if(IMAGE_BOTTOM.classList.contains( 'hide' )){
    IMAGE_BOTTOM.classList.toggle('hide');
  }
  audio.volume = 0;
  USER_DISPLAY.innerHTML = ``;
  ARROW_LEFT.classList.toggle('hide');
  adjusted_moveY = 0;
}

//triqui
var GAME_STATE = ["", "", "", "", "", "", "", "", ""];
const WINNINGS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

document.querySelectorAll(".grid div").forEach((element) => {
  element.addEventListener("click", (clickedCellEvent ) => {
    if(!roundWon){
      if (element.innerHTML === "") {
        const clickedCell = clickedCellEvent.target;
        element.innerHTML = character;
        const clickedCellIndex = Array.from(clickedCellEvent.target.parentNode.children).indexOf(clickedCell);
        GAME_STATE[clickedCellIndex] = character;
      }
      
      for (let i = 0; i < WINNINGS.length; i++) { // Itera cada uno de las posibles combinaciones ganadores
        const winCondition = WINNINGS[i] // Guarda la combinación por ejemplo: [0, 1, 2]
        let position1 = GAME_STATE[winCondition[0]],
          position2 = GAME_STATE[winCondition[1]],
          position3 = GAME_STATE[winCondition[2]] // Almacena el valor del estado actual del juego según las posiciones de winCondition
        if (position1 === position2 && position2 === position3 && position1 != '' && position2 != '' && position3 != '') {
          roundWon = true // Si todas las posiciones coinciden entonces, dicho jugador ha ganado la partida
          STATUS_DISPLAY.innerHTML = `${character} ha ganado 🤘!`
        }
      }
      if(!roundWon) character = character === characterOne ? characterTwo : characterOne;
    }
  });
});

function reset() {
  document.querySelectorAll(".grid div").forEach((element) => {
    element.innerHTML = "";
    STATUS_DISPLAY.innerHTML = "";
    roundWon = false;
    GAME_STATE = ["", "", "", "", "", "", "", "", ""];
  });
}

// Piano  

const playTune = (key) => {
    audio.src = `assets/tunes/${key}.wav`
    audio.play(); 

    const clickedKey = document.querySelector(`[data-key="${key}"]`)
    clickedKey.classList.add('active');
    setTimeout(() => {
        clickedKey.classList.remove('active')
    }, 150)
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key)
    key.addEventListener('click', () => {
        playTune(key.dataset.key)
    })
});

const pressedKey = (e) => {
    if( allKeys.includes(e.key) ) playTune(e.key)
}

const handleVolume = (e) => {
    audio.volume = e.target.value // pass value volume
}

volumeSlider.addEventListener('input', handleVolume);
document.addEventListener('keydown', pressedKey);

//effect mouse

const CURSOR_SMALL = document.querySelector('.small');

const positionElement = (e)=> {
  const mouseY = e.clientY;
  const mouseX = e.clientX;
  CURSOR_SMALL.style.transform = `translate3d(${adjusted_moveX + mouseX - screen.width*0.5}px, ${adjusted_moveY + mouseY  - screen.height*0.4}px, 0)`;
 
}

window.addEventListener('mousemove', positionElement)
