const $boxRow = document.querySelector('.box_row');
const $plusButton = document.querySelector('.plus_button');
let box = null;
let num = 0; // 박스 num

// 박스 생성
function createItem() {
  const box = document.createElement('div');
  
  box.initialMousePos = { x: 0, y: 0 };
  box.offset = { x: 0, y: 0 };
  box.num = ++num;
  box.textContent = 'BLUE' + box.num;

  box.classList.add('box');
  box.classList.add('color');
  box.addEventListener('pointerdown', enableMove);
  box.addEventListener('contextmenu', evt => evt.preventDefault());

  $boxRow.appendChild(box);
}

$plusButton.addEventListener('click', () => {
  createItem();
});

// 박스 현재 위치 계산
const enableMove = ({ clientX, clientY, target }) => {
  box = target;
  box.initialMousePos.x = clientX - box.offset.x;
  box.initialMousePos.y = clientY - box.offset.y;

  document.addEventListener('pointermove', move);
  document.addEventListener('touchmove', move);
};

// 박스 움직임 및 위치에 따른 색상, 이름 변경
const move = ({ clientX, clientY, touches }) => {
  if (touches) {
    clientX = touches[0].clientX;
    clientY = touches[0].clientY;
  }

  if (!clientX || !clientY) {
    return;
  }

  box.offset.x = clientX - box.initialMousePos.x;
  box.offset.y = clientY - box.initialMousePos.y;
  box.style.transform = `translate3d(${box.offset.x}px, ${box.offset.y}px, 0)`;
  switchColor();
};

document.addEventListener('pointerup', () => {
  document.removeEventListener('pointermove', move);
  document.removeEventListener('touchmove', move);
});

// 위치에 따라 박스의 색상, 이름 변경
const switchColor = () => {
  if((box.getBoundingClientRect().left + box.getBoundingClientRect().right ) / 2 >= window.innerWidth / 2) {
    box.textContent = 'Purple' + box.num;
    box.style.backgroundColor = '#7F00FF';

  } else {
    box.textContent = 'BLUE' + box.num;
    box.style.backgroundColor = '#1b69ce';
  }
}