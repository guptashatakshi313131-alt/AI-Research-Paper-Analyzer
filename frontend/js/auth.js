/**
 * Authentication Handler
 * Manages Login, Registration, and Password Visibility Toggles
 */

document.addEventListener('DOMContentLoaded', () => {
  setupPasswordToggle();
  setupLoginForm();
  setupRegisterForm();
});

function setupPasswordToggle() {
  const toggleBtns = document.querySelectorAll('.toggle-password');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      const icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('bi-eye', 'bi-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
      }
    });
  });
}

function showAlert(message, type = 'danger') {
  const alertEl = document.getElementById('authAlert');
  if (!alertEl) return;
  alertEl.className = `alert alert-${type} d-block`;
  alertEl.textContent = message;
}

function hideAlert() {
  const alertEl = document.getElementById('authAlert');
  if (alertEl) alertEl.classList.add('d-none');
}

function setLoading(isLoading, text = 'Processing...') {
  const btn = document.getElementById('submitBtn');
  if (!btn) return;

  const btnText = btn.querySelector('span:not(.spinner-border)');
  const spinner = btn.querySelector('.spinner-border');

  if (isLoading) {
    btn.disabled = true;
    if (btnText) btnText.textContent = text;
    if (spinner) spinner.classList.remove('d-none');
  } else {
    btn.disabled = false;
    if (spinner) spinner.classList.add('d-none');
  }
}

function setupLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      showAlert('Please fill in all required fields.');
      return;
    }

    setLoading(true, 'Signing in...');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('authToken', 'mock_jwt_token_12345');
      localStorage.setItem('userEmail', email);

      showAlert('Login successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1200);
    } catch (err) {
      showAlert('Invalid email or password. Please try again.');
      setLoading(false);
    }
  });
}

function setupRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (!fullName || !email || !password || !confirmPassword) {
      showAlert('Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      showAlert('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('Passwords do not match.');
      return;
    }

    setLoading(true, 'Creating account...');

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      localStorage.setItem('authToken', 'mock_jwt_token_12345');
      localStorage.setItem('userName', fullName);

      showAlert('Account created successfully! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1200);
    } catch (err) {
      showAlert('Failed to create account. Please try again.');
      setLoading(false);
    }
  });
}