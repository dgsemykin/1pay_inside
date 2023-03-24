const amountBlockMain = document.querySelector('.profile-header__amount');
const activeBlock = document.querySelector('.profile-header__active-block-v2');
const fullBlock = document.querySelector('.profile-header__full-block-v2');

const amountBlocks = document.querySelectorAll('.profile-header__amount-block-v2');

amountBlockMain.addEventListener('click', function(event) {
  amountBlockMain.classList.toggle('profile-header__amount_active');
})

amountBlocks.forEach(function(amountBlock) {
  amountBlock.addEventListener('click', function(event) {
    console.log(activeBlock);
    let activeContent = activeBlock.querySelector('.profile-header__amount-block-v2');
    console.log('active content is' + activeContent);
    console.log(event.target.parentElement)

    let html;
    if(event.target.parentElement.className === 'profile-header__full-block-v2') {
      html = event.target;
    } else if (event.target.parentElement.id === '') {
      html = event.target.parentElement.parentElement.parentElement;
    } else {
      html = event.target.parentElement;
    }
    // const htmlClone = html.cloneNode(true);
    activeBlock.innerHTML = '';
    activeBlock.appendChild(html);
    fullBlock.appendChild(activeContent);
  })
})

