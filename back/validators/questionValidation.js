const validateQuestion = (text, rightAnswer, answerList) => {
    let errs = []
    if(!answerList.includes(rightAnswer) ){
        errs.push("List of answers must include right answer")
    }
    if(answerList.length != 4){
        errs.push("List of answers must contain 4 variants")
    }
    if(text == ""){
        errs.push("Question text can`t be empty")
    }
    return errs
}

module.exports = validateQuestion