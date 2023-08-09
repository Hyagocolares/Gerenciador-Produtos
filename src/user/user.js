document.addEventListener('DOMContentLoaded', () => {
  const createForm = document.getElementById('createForm');
  const message = document.getElementById('message');

  createForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('https://hcimports.hyagocolares.repl.co/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        message.textContent = data.message;
        message.style.color = 'green';
      } else {
        message.textContent = 'Erro ao criar usuário';
        message.style.color = 'red';
      }
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
      message.textContent = 'Erro ao criar usuário';
      message.style.color = 'red';
    }
  });

    const entrarButton = document.getElementById('entrarButton');
  entrarButton.addEventListener('click', () => {
    window.location.href = '/index.html'; // Redireciona para a página de entrar
  });
});
