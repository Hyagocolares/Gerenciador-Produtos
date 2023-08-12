document.addEventListener('DOMContentLoaded', () => {
  const createForm = document.getElementById('createForm');
  const message = document.getElementById('message');

  createForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const enteredAdminPassword = document.getElementById('adminPassword').value;

    try {
      const adminPasswordResponse = await fetch('https://backhcimports.hyagocolares.repl.co/admin-password');
      const adminPasswordData = await adminPasswordResponse.json();

      if (adminPasswordResponse.ok) {
        const adminPassword = adminPasswordData.mySecret; // Ajuste para o nome correto da variável no JSON

        if (enteredAdminPassword === adminPassword) {
          try {
            const registerResponse = await fetch('https://backhcimports.hyagocolares.repl.co/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ username, password, adminPasswordEntered: enteredAdminPassword })
            });

            const registerData = await registerResponse.json();

            if (registerResponse.ok) {
              message.textContent = 'Usuário criado com sucesso.';
              message.style.color = 'green';
            } else {
              message.textContent = 'Erro ao criar usuário.';
              message.style.color = 'red';
            }
          } catch (error) {
            console.error('Erro ao fazer a solicitação:', error);
            message.textContent = 'Erro ao criar usuário.';
            message.style.color = 'red';
          }
        } else {
          message.textContent = 'Senha de administrador incorreta. Não é possível criar o usuário.';
          message.style.color = 'red';
        }
      } else {
        console.error('Erro ao obter a senha do administrador');
      }
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
      message.textContent = 'Erro ao criar usuário.';
      message.style.color = 'red';
    }
  });

  const entrarButton = document.getElementById('entrarButton');
  entrarButton.addEventListener('click', () => {
    window.location.href = './index.html'; // Redireciona para a página de login
  });
});
