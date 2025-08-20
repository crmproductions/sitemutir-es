document.addEventListener('DOMContentLoaded', () => {
  // Splash Screen
  const splashScreen = document.getElementById('splashScreen');
  
  // Remover splash screen após animação
  setTimeout(() => {
    splashScreen.style.display = 'none';
    // Fade-in no body após o splash
    document.body.classList.add('opacity-100');
  }, 2000);
  
  // Inicialização do Swiper (carrossel)
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
  });
  
  // Controle do modal de autenticação
  const authModal = document.getElementById('authModal');
  const loginHeaderBtn = document.getElementById('loginHeaderBtn');
  const registerHeaderBtn = document.getElementById('registerHeaderBtn');
  const closeModal = document.getElementById('closeModal');
  
  // Abrir modal no login
  loginHeaderBtn.addEventListener('click', () => {
    authModal.classList.remove('hidden');
    document.getElementById('loginTab').click();
  });
  
  // Abrir modal no cadastro
  registerHeaderBtn.addEventListener('click', () => {
    authModal.classList.remove('hidden');
    document.getElementById('registerTab').click();
  });
  
  // Fechar modal
  closeModal.addEventListener('click', () => {
    authModal.classList.add('hiding');
    setTimeout(() => {
      authModal.classList.add('hidden');
      authModal.classList.remove('hiding');
    }, 300);
  });
  
  // Fechar modal ao clicar fora
  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
      closeModal.click();
    }
  });
  
  // Seleção de abas
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  loginTab.addEventListener('click', () => {
    loginTab.classList.add('text-amber-600', 'border-amber-600');
    loginTab.classList.remove('text-gray-500');
    registerTab.classList.add('text-gray-500');
    registerTab.classList.remove('text-amber-600', 'border-amber-600');
    
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
  });
  
  registerTab.addEventListener('click', () => {
    registerTab.classList.add('text-amber-600', 'border-amber-600');
    registerTab.classList.remove('text-gray-500');
    loginTab.classList.add('text-gray-500');
    loginTab.classList.remove('text-amber-600', 'border-amber-600');
    
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  });
  
  // Seleção de tipo de usuário
  const userTypeButtons = document.querySelectorAll('.user-type-btn');
  const loginRoleInput = document.getElementById('loginRole');
  
  userTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active de todos os botões
      userTypeButtons.forEach(btn => btn.classList.remove('active'));
      
      // Adiciona active ao botão clicado
      button.classList.add('active');
      
      // Atualiza o valor do input hidden
      const role = button.getAttribute('data-role');
      loginRoleInput.value = role;
    });
  });
  
  // Toggle de senha
  const togglePassword = document.getElementById('togglePassword');
  const loginPassword = document.getElementById('loginPassword');
  
  togglePassword.addEventListener('click', () => {
    const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    loginPassword.setAttribute('type', type);
    
    const icon = togglePassword.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
  });
  
  // Toggle de senha para formulário de registro
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  togglePasswordButtons.forEach(button => {
    button.addEventListener('click', () => {
      const input = button.parentElement.querySelector('input');
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      
      const icon = button.querySelector('i');
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  });
  
  // Login com usuários de demonstração
  const demoButtons = document.querySelectorAll('.demo-login');
  demoButtons.forEach(button => {
    button.addEventListener('click', () => {
      const email = button.getAttribute('data-email');
      const password = button.getAttribute('data-password');
      const role = button.getAttribute('data-role');
      
      document.getElementById('loginEmail').value = email;
      document.getElementById('loginPassword').value = password;
      document.getElementById('loginRole').value = role;
      
      // Atualizar seleção visual do tipo de usuário
      userTypeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-role') === role) {
          btn.classList.add('active');
        }
      });
      
      // Simular login
      performLogin(email, password, role);
    });
  });
  
  // Botão de login
  const loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;
    
    if (!email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    performLogin(email, password, role);
  });
  
  // Botão de registro
  const registerButton = document.getElementById('registerButton');
  registerButton.addEventListener('click', () => {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const role = document.getElementById('registerRole').value;
    
    if (!name || !email || !password || !confirmPassword) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    
    // Simular registro
    alert(`Cadastro realizado com sucesso!\nNome: ${name}\nE-mail: ${email}\nTipo: ${role}`);
    
    // Limpar formulário
    document.getElementById('registerName').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('registerConfirmPassword').value = '';
    
    // Voltar para aba de login
    loginTab.click();
  });
  
  // Função para realizar login
  function performLogin(email, password, role) {
    // Simular autenticação
    console.log('Login realizado:', { email, password, role });
    
    // Mostrar mensagem de sucesso
    alert(`Login realizado com sucesso!\nTipo de usuário: ${getRoleDisplayName(role)}`);
    
    // Fechar modal
    closeModal.click();
    
    // Aqui você redirecionaria para o dashboard específico do tipo de usuário
    // Por exemplo:
    // if (role === 'lawyer') window.location.href = 'advogado/dashboard.html';
    // if (role === 'admin') window.location.href = 'admin/dashboard.html';
    // if (role === 'client') window.location.href = 'cliente/dashboard.html';
  }
  
  // Função auxiliar para obter nome de exibição do tipo de usuário
  function getRoleDisplayName(role) {
    const roleNames = {
      'lawyer': 'Advogado',
      'admin': 'Administrador',
      'client': 'Cliente'
    };
    return roleNames[role] || role;
  }
});
