document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type');
            input.setAttribute('type', type === 'password' ? 'text' : 'password');
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            showSuccessMessage();
        }
    });

    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
});

function validateForm() {
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const starter = document.querySelector('input[name="starter"]:checked');
    const terms = document.getElementById('terms');

    let isValid = true;

    if (!username.value.trim() || username.value.length < 3) {
        showError(username, '用户名至少需要3个字符');
        isValid = false;
    } else {
        clearError(username);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError(email, '请输入有效的电子邮箱地址');
        isValid = false;
    } else {
        clearError(email);
    }

    if (password.value.length < 8) {
        showError(password, '密码至少需要8个字符');
        isValid = false;
    } else {
        clearError(password);
    }

    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, '两次输入的密码不一致');
        isValid = false;
    } else {
        clearError(confirmPassword);
    }

    if (!starter) {
        showError(document.querySelector('.starter-pokemon'), '请选择一个初始宝可梦');
        isValid = false;
    } else {
        clearError(document.querySelector('.starter-pokemon'));
    }

    if (!terms.checked) {
        showError(terms.parentElement, '请同意服务条款和隐私政策');
        isValid = false;
    } else {
        clearError(terms.parentElement);
    }

    return isValid;
}

function validateField(field) {
    switch(field.id) {
        case 'username':
            if (!field.value.trim() || field.value.length < 3) {
                showError(field, '用户名至少需要3个字符');
            } else {
                clearError(field);
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showError(field, '请输入有效的电子邮箱地址');
            } else {
                clearError(field);
            }
            break;
        case 'password':
            if (field.value.length < 8) {
                showError(field, '密码至少需要8个字符');
            } else {
                clearError(field);
            }
            break;
        case 'confirmPassword':
            const password = document.getElementById('password');
            if (field.value !== password.value) {
                showError(field, '两次输入的密码不一致');
            } else {
                clearError(field);
            }
            break;
    }
}

function showError(element, message) {
    const errorElement = element.parentElement.nextElementSibling;
    errorElement.textContent = message;
    element.classList.add('error');
}

function clearError(element) {
    const errorElement = element.parentElement.nextElementSibling;
    errorElement.textContent = '';
    element.classList.remove('error');
}

function showSuccessMessage() {
    const form = document.getElementById('registerForm');
    form.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h2>注册成功！</h2>
            <p>欢迎加入神奇宝可梦的世界！</p>
            <a href="login.html" class="login-redirect">立即登录</a>
        </div>
    `;
} 
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type');
            input.setAttribute('type', type === 'password' ? 'text' : 'password');
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            showSuccessMessage();
        }
    });

    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
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
    });
});