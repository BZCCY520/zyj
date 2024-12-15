document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const passwordToggle = document.querySelector('.password-toggle');
    
    passwordToggle.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const icon = this.querySelector('i');
        const span = this.querySelector('span');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
            span.textContent = '隐藏密码';
            this.classList.add('active');
        } else {
            input.type = 'password';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
            span.textContent = '显示密码';
            this.classList.remove('active');
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            simulateLogin();
        }
    });

    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
});

function validateForm() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let isValid = true;

    if (!validateEmail(email.value)) {
        showError(email, '请输入有效的电子邮箱地址');
        isValid = false;
    } else {
        clearError(email);
    }

    if (!password.value) {
        showError(password, '请输入密码');
        isValid = false;
    } else {
        clearError(password);
    }

    return isValid;
}

function validateField(field) {
    if (field.type === 'email') {
        if (!validateEmail(field.value)) {
            showError(field, '请输入有效的电子邮箱地址');
        } else {
            clearError(field);
        }
    } else if (field.type === 'password') {
        if (!field.value) {
            showError(field, '请输入密码');
        } else {
            clearError(field);
        }
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(element, message) {
    const errorElement = element.closest('.form-group').querySelector('.error-message');
    errorElement.textContent = message;
    element.classList.add('error');
}

function clearError(element) {
    const errorElement = element.closest('.form-group').querySelector('.error-message');
    errorElement.textContent = '';
    element.classList.remove('error');
}

function simulateLogin() {
    const loginButton = document.querySelector('.login-button');
    const originalContent = loginButton.innerHTML;
    
    loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 登录中...';
    loginButton.disabled = true;

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
} 
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            simulateLogin();
        }
    });

    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
});

