document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const messageDiv = document.getElementById('message');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário

    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
      const response = await fetch('https://hcimports.hyagocolares.repl.co/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

if (response.ok) {
        const token = data.token;
        localStorage.setItem('token', token);
        window.location.href = '/src/product/product.html'; // Redireciona para a página protegida após o login
      } else {
        messageDiv.textContent = 'Credenciais inválidas. Por favor, tente novamente.';
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      messageDiv.textContent = 'Erro ao fazer login. Por favor, tente novamente mais tarde.';
    }
  });

  const cadastroButton = document.getElementById('cadastroButton');
  cadastroButton.addEventListener('click', () => {
    window.location.href = '/src/user/user.html'; // Redireciona para a página de cadastro
  });
});
