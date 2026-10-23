document.querySelector('#login-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.querySelector('#login-message');

  message.hidden = false;
  message.textContent = 'Login admin memerlukan backend; halaman ini hanya mockup tampilan.';
  event.currentTarget.reset();
});
