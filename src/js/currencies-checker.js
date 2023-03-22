const amountBlock = document.querySelector('.profile-header__amount');
const activeBlock = document.querySelector('.profile-header__active-block');

amountBlock.addEventListener('click', function(event) {
  amountBlock.classList.toggle('profile-header__amount_active');

  const html = event.target.parentElement;
  activeBlock.innerHTML = '';
  activeBlock.appendChild(html);
})