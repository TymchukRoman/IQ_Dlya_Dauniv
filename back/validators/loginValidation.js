const validateLogin = (email, password) => {
    let errs = []
    if (!email) {
        errs.push("Email is required")
    }
    if (!password) {
        errs.push("Password is required")
    }
    return errs
}

module.exports = validateLogin