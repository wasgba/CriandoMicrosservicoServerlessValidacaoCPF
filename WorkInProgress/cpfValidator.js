function formatCPF(input) {
    // Remove todos os caracteres que não sejam dígitos
    let value = input.value.replace(/\D/g, '');

    // Aplica a máscara do CPF
    if (value.length > 3) {
        value = value.substring(0, 3) + '.' + value.substring(3);
    }
    if (value.length > 7) {
        value = value.substring(0, 7) + '.' + value.substring(7);
    }
    if (value.length > 11) {
        value = value.substring(0, 11) + '-' + value.substring(11);
    }
    if (value.length > 14) {
        value = value.substring(0, 14); // Limita a 14 caracteres
    }

    input.value = value;
}

// Função que remove formatação e valida o CPF
function isCPFValid(cpf) {
    // Remove todos os caracteres que não sejam dígitos
    const cleanedCPF = cpf.replace(/\D/g, '');

    // CPF precisa ter 11 dígitos
    if (cleanedCPF.length !== 11) return false;

    // Verifica se todos os dígitos são iguais (caso inválido)
    if (/^(\d)\1{10}$/.test(cleanedCPF)) return false;

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanedCPF.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    let firstCheckDigit = (remainder < 2) ? 0 : 11 - remainder;
    if (parseInt(cleanedCPF.charAt(9)) !== firstCheckDigit) return false;

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanedCPF.charAt(i)) * (11 - i);
    }
    remainder = sum % 11;
    let secondCheckDigit = (remainder < 2) ? 0 : 11 - remainder;
    if (parseInt(cleanedCPF.charAt(10)) !== secondCheckDigit) return false;

    return true;
}

// Manipula o envio do formulário
document.getElementById('cpfForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cpfInput = document.getElementById('cpfInput').value;
    const resultElement = document.getElementById('result');

    if (isCPFValid(cpfInput)) {
        resultElement.textContent = "CPF válido!";
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = "CPF inválido!";
        resultElement.style.color = "red";
    }
});
