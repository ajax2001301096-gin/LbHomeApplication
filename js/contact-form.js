// ==============================================
// CONTACT FORM - Mailto Handler
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const company = document.getElementById('company').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Build email body
            let emailBody = `お名前: ${name}%0D%0A`;
            emailBody += `メールアドレス: ${email}%0D%0A`;
            
            if (phone) {
                emailBody += `電話番号: ${phone}%0D%0A`;
            }
            
            if (company) {
                emailBody += `会社名: ${company}%0D%0A`;
            }
            
            emailBody += `%0D%0A`;
            emailBody += `お問い合わせ内容:%0D%0A`;
            emailBody += `${encodeURIComponent(message)}`;
            
            // Build mailto URL
            const mailtoLink = `mailto:saikimao29@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Optional: Show success message
            showSuccessMessage();
        });
    }
    
    // ==========================================
    // SUCCESS MESSAGE
    // ==========================================
    function showSuccessMessage() {
        // Create success message element
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = `
            <i class="fas fa-check-circle"></i>
            メールソフトが開きました。送信を完了してください。
        `;
        
        // Add CSS for success message if not exists
        if (!document.getElementById('successMessageStyle')) {
            const style = document.createElement('style');
            style.id = 'successMessageStyle';
            style.textContent = `
                .success-message {
                    position: fixed;
                    top: 100px;
                    right: 30px;
                    background: #4CAF50;
                    color: white;
                    padding: 20px 30px;
                    border-radius: 3px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 14px;
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .success-message i {
                    font-size: 20px;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to page
        document.body.appendChild(successMsg);
        
        // Remove after 5 seconds
        setTimeout(function() {
            successMsg.style.opacity = '0';
            successMsg.style.transform = 'translateX(400px)';
            setTimeout(function() {
                if (successMsg.parentNode) {
                    successMsg.parentNode.removeChild(successMsg);
                }
            }, 300);
        }, 5000);
    }
    
    // ==========================================
    // FORM VALIDATION
    // ==========================================
    const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(function(input) {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            
            // Add error class
            input.classList.add('error');
            
            // Remove error class on input
            input.addEventListener('input', function() {
                input.classList.remove('error');
            }, { once: true });
        });
    });
    
    // Add error styles
    if (!document.getElementById('formValidationStyle')) {
        const style = document.createElement('style');
        style.id = 'formValidationStyle';
        style.textContent = `
            .form-group input.error,
            .form-group select.error,
            .form-group textarea.error {
                border-color: #f44336;
                background: #fff5f5;
            }
        `;
        document.head.appendChild(style);
    }
    
});