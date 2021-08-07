const validateLogin = (login, password) => {
    let errs = []
    if(!login){
        errs.push("Login is required")
    }
    if(!password){
        errs.push("Password is required")
    }
    return errs
}

module.exports = validateLogin