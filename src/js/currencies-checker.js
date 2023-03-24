const amountBlockMain = document.querySelector('.profile-header__amount');
const activeBlock = document.querySelector('.profile-header__active-block');

const amountBlocks = document.querySelectorAll('.profile-header__amount-block');

amountBlockMain.addEventListener('click', function(event) {
  amountBlockMain.classList.toggle('profile-header__amount_active');

  // const html = event.target.parentElement;
  // activeBlock.innerHTML = '';
  // activeBlock.appendChild(html);
})

amountBlocks.forEach(function(amountBlock) {
  amountBlock.addEventListener('click', function(event) {
    let html;
    if(event.target.parentElement.id === '') {
      html = event.target.parentElement.parentElement.parentElement;
    } else {
      html = event.target.parentElement;
    }
    const htmlClone = html.cloneNode(true);
    activeBlock.innerHTML = '';
    activeBlock.appendChild(htmlClone);
  })
})