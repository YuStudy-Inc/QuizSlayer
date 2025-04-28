export const validEmail = ((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
})

export const validPassword = ((password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{9,}$/
    return passwordRegex.test(password)
})

//26 shift-left caesar cipher for pw authentication and security
export const caesarCipher = (str, shift) => {
    return str.split('').map(char => {
        if (char.match(/[a-z]/)) {
            let code = char.charCodeAt(0);
            return String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
        } else if (char.match(/[A-Z]/)) {
            let code = char.charCodeAt(0);
            return String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
        } else {
            return char;
        }
    }).join('');
}
