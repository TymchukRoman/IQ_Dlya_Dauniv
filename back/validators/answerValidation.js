const answerValidation = (answers) => {
    let errs = []
    if( answers.length != 10 ){
        errs.push("Array must contain 10 items")
    }
    answers.forEach((item) => {
        if(!item.id){
            errs.push("Each element must have id key")
        }
        if(!item.answer){
            errs.push("Each element must have answer key")
        }
    })
    return errs
}

module.exports = answerValidation