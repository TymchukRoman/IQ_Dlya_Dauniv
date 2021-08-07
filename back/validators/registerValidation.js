const registerValidation = (nickname, age, password, email) => {
    let errs = []

    if(!nickname){
        errs.push("Nickname is required")
    } else {
        if(typeof(nickname) != "string"){
            errs.push("Nickname must be a string")
        }
    }

    if(!age){
        errs.push("Age is required")
    } else {
        if(typeof(age) != "number"){
            errs.push("Age must be a number")
        }
    }

    if(!email){
        errs.push("Email is required")
    } else {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(email).toLowerCase())){
            errs.push("Wrong email")
        }
    }

    if(!password){
        errs.push("Password is required")
    } else {
        if(password.length < 6){
            errs.push("Password must contain at least 6 characers")
        }
        if(!/\d/.test(password)){
            errs.push("Password must contain at least 1 number")
        }
        if(!/[a-zA-Z]/g.test(password)){
            errs.push("Password must contain at least 1 letter")
        }
    }

    return errs
}

module.exports = registerValidation
