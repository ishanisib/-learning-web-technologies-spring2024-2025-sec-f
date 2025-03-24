// Form validation functions

// Generic validation function
function validateField(field, validationFunction, errorMessage) {
    const value = field.value.trim();
    const isValid = validationFunction(value);
    
    if (!isValid) {
        showError(field, errorMessage);
        return false;
    } else {
        showSuccess(field);
        return true;
    }
}

// Show error message
function showError(field, message) {
    const formControl = field.parentElement;
    const errorDiv = formControl.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerText = message;
    
    if (!formControl.querySelector('.error-message')) {
        formControl.appendChild(errorDiv);
    }
    
    field.classList.add('invalid-input');
}

// Show success
function showSuccess(field) {
    const formControl = field.parentElement;
    const errorDiv = formControl.querySelector('.error-message');
    
    if (errorDiv) {
        formControl.removeChild(errorDiv);
    }
    
    field.classList.remove('invalid-input');
    field.classList.add('valid-input');
}

// Check if field is empty
function isRequired(value) {
    return value !== '';
}

// Check email format
function isEmailValid(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Check password length
function isPasswordValid(password) {
    return password.length >= 8;
}

// Check if passwords match
function doPasswordsMatch(password1, password2) {
    return password1 === password2;
}

// Check if string is number
function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

// Check if price is valid (positive number)
function isValidPrice(price) {
    const numPrice = parseFloat(price);
    return !isNaN(numPrice) && numPrice > 0;
}

// Validate registration form
function validateRegistration() {
    const form = document.querySelector('form');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const userName = document.getElementById('userName');
    const password = document.getElementById('password');
    const email = document.getElementById('email');
    const termsCheckbox = document.getElementById('terms');
    
    let isValid = true;
    
    isValid = validateField(firstName, isRequired, 'First name is required') && isValid;
    isValid = validateField(lastName, isRequired, 'Last name is required') && isValid;
    isValid = validateField(userName, isRequired, 'Username is required') && isValid;
    isValid = validateField(password, isPasswordValid, 'Password must be at least 8 characters') && isValid;
    isValid = validateField(email, isEmailValid, 'Please enter a valid email') && isValid;
    
    if (!termsCheckbox.checked) {
        showError(termsCheckbox, 'You must agree to the terms and conditions');
        isValid = false;
    } else {
        showSuccess(termsCheckbox);
    }
    
    return isValid;
}

// Validate login form
function validateLogin() {
    const userName = document.getElementById('userName');
    const password = document.getElementById('password');
    
    let isValid = true;
    
    isValid = validateField(userName, isRequired, 'Username is required') && isValid;
    isValid = validateField(password, isRequired, 'Password is required') && isValid;
    
    return isValid;
}

// Validate forgot password form
function validateForgotPassword() {
    const userName = document.getElementById('userName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    let isValid = true;
    
    isValid = validateField(userName, isRequired, 'Username is required') && isValid;
    isValid = validateField(email, isEmailValid, 'Please enter a valid email') && isValid;
    isValid = validateField(password, isPasswordValid, 'Password must be at least 8 characters') && isValid;
    
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    } else {
        showSuccess(confirmPassword);
    }
    
    return isValid;
}

// Validate add product form
function validateAddProduct() {
    const name = document.getElementById('Name');
    const buyingPrice = document.getElementById('buyingPrice');
    const sellingPrice = document.getElementById('sellingPrice');
    
    let isValid = true;
    
    isValid = validateField(name, isRequired, 'Product name is required') && isValid;
    isValid = validateField(buyingPrice, isValidPrice, 'Buying price must be a positive number') && isValid;
    isValid = validateField(sellingPrice, isValidPrice, 'Selling price must be a positive number') && isValid;
    
    return isValid;
}

// Attach event listeners based on the current page
document.addEventListener('DOMContentLoaded', function() {
    // Check which form is on the current page and attach appropriate event listeners
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('form2.html')) {
        // Registration form
        const form = document.querySelector('form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateRegistration()) {
                // Normally you would submit the form here
                alert('Registration successful!');
                // form.submit();
            }
        });
    } else if (currentPath.includes('LogIn.html')) {
        // Login form
        const form = document.querySelector('form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateLogin()) {
                // Normally you would submit the form here
                alert('Login successful!');
                // form.submit();
            }
        });
    } else if (currentPath.includes('ForgotPass.html')) {
        // Forgot password form
        const form = document.querySelector('form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForgotPassword()) {
                // Normally you would submit the form here
                alert('Password reset request submitted!');
                // form.submit();
            }
        });
    } else if (currentPath.includes('AddProduct.html') || currentPath.includes('Performance1.html')) {
        // Add product form
        const saveButton = document.querySelector('button[type="save"]');
        saveButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (validateAddProduct()) {
                saveProduct();
            }
        });
    }
});