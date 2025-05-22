

const getProcessNumber = (token) => {
    if (!token) return {
        token,
        status: true
    }
    else {
        return {
        message: 'token inválido',
        status: false
        }
    }
}

module.exports = getProcessNumber;