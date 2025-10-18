// Career Point Application - Professional Login & Dashboard
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username && password) {
        // If login is successful, redirect to dashboard.html
        window.location.href = "dashboard.html";
    } else {
        alert("Please enter both username and password.");
    }
});

class CareerPointApp {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.showPage('loginPage');
    }

    bindEvents() {
        // Login form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // Dashboard card interactions
        const dashboardCards = document.querySelectorAll('.dashboard-card');
        dashboardCards.forEach(card => {
            card.addEventListener('click', (e) => this.handleCardClick(e));
        });

        // Quick action buttons
        const actionButtons = document.querySelectorAll('.action-buttons .btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleQuickAction(e));
        });

        // Form input enhancements
        this.enhanceFormInputs();
    }

    enhanceFormInputs() {
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearError(input);
            });
        });
    }

    async handleLogin(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const loginBtn = document.getElementById('loginBtn');
        const btnText = loginBtn.querySelector('.btn-text');
        const spinner = loginBtn.querySelector('.loading-spinner');

        // Clear previous errors
        this.clearAllErrors();

        // Validate inputs
        if (!this.validateLoginForm(username, password)) {
            return;
        }

        // Show loading state
        this.setLoadingState(loginBtn, btnText, spinner, true);

        try {
            // Simulate API call delay for better UX
            await this.delay(1500);

            // Simple validation - accept any non-empty credentials
            if (username && password) {
                // Set current user
                this.currentUser = {
                    username: username,
                    email: username.includes('@') ? username : `${username}@example.com`,
                    name: this.formatName(username),
                    loginTime: new Date()
                };

                this.isLoggedIn = true;

                // Update dashboard with user info
                this.updateDashboard();

                // Show success animation
                this.showSuccessAnimation();

                // Transition to dashboard
                setTimeout(() => {
                    this.showPage('dashboardPage');
                }, 800);
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            this.showError('username', 'Login failed. Please check your credentials.');
        } finally {
            // Reset loading state
            setTimeout(() => {
                this.setLoadingState(loginBtn, btnText, spinner, false);
            }, 500);
        }
    }

    handleLogout() {
        this.currentUser = null;
        this.isLoggedIn = false;

        // Clear form
        document.getElementById('loginForm').reset();
        this.clearAllErrors();

        // Smooth transition back to login
        this.showPage('loginPage');

        // Show logout success message
        setTimeout(() => {
            this.showToast('Successfully logged out', 'success');
        }, 300);
    }

    handleCardClick(e) {
        const card = e.currentTarget;
        const section = card.dataset.section;

        // Add click animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);

        // Show feature message
        const cardTitle = card.querySelector('.card-title').textContent;
        this.showToast(`Opening ${cardTitle}...`, 'info');

        // In a real app, this would navigate to the specific section
        console.log(`Navigating to ${section} section`);
    }

    handleQuickAction(e) {
        const button = e.currentTarget;
        const action = button.textContent.trim();

        // Add button animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);

        this.showToast(`${action} feature coming soon!`, 'info');
    }

    validateLoginForm(username, password) {
        let isValid = true;

        if (!username) {
            this.showError('username', 'Username or email is required');
            isValid = false;
        } else if (username.length < 2) {
            this.showError('username', 'Username must be at least 2 characters');
            isValid = false;
        }

        if (!password) {
            this.showError('password', 'Password is required');
            isValid = false;
        } else if (password.length < 1) {
            this.showError('password', 'Password cannot be empty');
            isValid = false;
        }

        return isValid;
    }

    validateField(input) {
        const value = input.value.trim();
        const fieldName = input.name;

        if (!value && input.required) {
            this.showError(fieldName, `${this.capitalizeFirst(fieldName)} is required`);
            return false;
        }

        this.clearError(input);
        return true;
    }

    showError(fieldName, message) {
        const errorElement = document.getElementById(fieldName + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.opacity = '1';
            errorElement.style.transform = 'translateY(0)';
        }

        const field = document.getElementById(fieldName);
        if (field) {
            field.style.borderColor = 'var(--color-error)';
            field.classList.add('error');
        }
    }

    clearError(input) {
        const fieldName = input.name || input.id;
        const errorElement = document.getElementById(fieldName + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.opacity = '0';
        }

        input.style.borderColor = '';
        input.classList.remove('error');
    }

    clearAllErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => {
            el.textContent = '';
            el.style.opacity = '0';
        });

        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.style.borderColor = '';
            input.classList.remove('error');
        });
    }

    setLoadingState(button, textElement, spinner, isLoading) {
        if (isLoading) {
            textElement.style.opacity = '0';
            spinner.classList.remove('hidden');
            button.disabled = true;
        } else {
            textElement.style.opacity = '1';
            spinner.classList.add('hidden');
            button.disabled = false;
        }
    }

    updateDashboard() {
        if (this.currentUser) {
            const userNameElement = document.getElementById('userName');
            if (userNameElement) {
                userNameElement.textContent = this.currentUser.name;
            }
        }
    }

    showPage(pageId) {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Show target page with delay for smooth transition
        setTimeout(() => {
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
            }
        }, 50);
    }

    showSuccessAnimation() {
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.style.background = 'var(--color-success)';
        loginBtn.querySelector('.btn-text').textContent = 'Success!';

        setTimeout(() => {
            loginBtn.style.background = '';
            loginBtn.querySelector('.btn-text').textContent = 'Sign In';
        }, 1000);
    }

    showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        // Style the toast
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 24px',
            borderRadius: 'var(--radius-base)',
            color: 'white',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s var(--ease-standard)',
            maxWidth: '300px',
            boxShadow: 'var(--shadow-lg)'
        });

        // Set background color based on type
        const colors = {
            success: 'var(--color-success)',
            error: 'var(--color-error)',
            info: 'var(--cp-primary)',
            warning: 'var(--color-warning)'
        };
        toast.style.background = colors[type] || colors.info;

        // Add to page
        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 10);

        // Remove after delay
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // Utility functions
    formatName(username) {
        if (username.includes('@')) {
            username = username.split('@')[0];
        }

        return username
            .split(/[._-]/)
            .map(part => this.capitalizeFirst(part))
            .join(' ');
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CareerPointApp();
});

// Add some CSS animations via JavaScript for enhanced interactivity
const addDynamicStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .form-control.error {
            border-color: var(--color-error) !important;
            box-shadow: 0 0 0 3px rgba(var(--color-red-500-rgb), 0.1) !important;
        }
        
        .error-message {
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s var(--ease-standard);
        }
        
        .focused .form-label {
            color: var(--color-primary);
            transform: translateY(-2px);
        }
        
        .dashboard-card {
            transform: translateY(0);
        }
        
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
};

// Add dynamic styles when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addDynamicStyles);
} else {
    addDynamicStyles();
}