const validateQuestionUpdate = (newData, updatorId) => {
    const { qText, answerList, rightAnswer } = newData;
    let errs = []
    let validatedNewData = {}

    if (qText) {
        if (typeof qText != "string") {
            errs.push("Question text must be a string. ")
        }
        validatedNewData.qText = qText;
    }
    if (answerList) {
        if (!Array.isArray(answerList)) {
            errs.push("Oops... Wrong data for answer list. ")
        }
        if (answerList.length != 4) {
            errs.push("List of answers must contain 4 variants")
        }
        answerList.forEach((answ) => {
            !answ && errs.push("Answers cant be empty")
        })
        // TODO
        // if(!answerList.includes(rightAnswer) ){      
        //     errs.push("List of answers must include right answer")
        // }
        validatedNewData.answerList = answerList;
    }
    if (rightAnswer) {
        if (typeof rightAnswer != "string") {
            errs.push("Answer must be a string. ")
        }
        validatedNewData.rightAnswer = rightAnswer;
    }
    validatedNewData.lastUpdatedBy = updatorId;
    validatedNewData.lastUpdateDate = new Date(Date.now()).toISOString();
    return { validatedNewData, errs }
}

module.exports = validateQuestionUpdate