const amountBlockMain = document.querySelector('.profile-header__amount');
const activeBlock = document.querySelector('.profile-header__active-block-v2');
let fullBlock = document.querySelector('.profile-header__full-block-v2');

const amountBlocks = document.querySelectorAll('.profile-header__amount-block-v2');

let amoutFromFullBlock = fullBlock.querySelectorAll('.profile-header__amount-block-v2');

amountBlockMain.addEventListener('click', function() {
  amountBlockMain.classList.toggle('profile-header__amount_active');
})

amoutFromFullBlock.forEach(function(amountBlock) {
  amountBlock.addEventListener('click', checker)
})

function checker(event) {
  let activeContent = activeBlock.querySelector('.profile-header__amount-block-v2');

  let html ;
  if(event.target.parentElement.className === 'profile-header__full-block-v2') {
    html = event.target;
  }  else if (event.target.parentElement.className === 'profile-header__active-block-v2') {
    html = event.target.parentElement;
  } else if (event.target.parentElement.id === '') {
    html = event.target.parentElement.parentElement.parentElement;
  } else {
    html = event.target.parentElement;
  }
  activeBlock.innerHTML = '';
  activeBlock.appendChild(html);
  fullBlock.appendChild(activeContent);

  setTimeout(function(){
    activeContent = activeBlock.querySelector('.profile-header__amount-block-v2');
    activeContent.removeEventListener('click', checker);
  },100);

  fullBlock = document.querySelector('.profile-header__full-block-v2');
  amoutFromFullBlock = fullBlock.querySelectorAll('.profile-header__amount-block-v2');

  amoutFromFullBlock.forEach(function(amountBlock) {
    amountBlock.addEventListener('click', checker)
  })
}

