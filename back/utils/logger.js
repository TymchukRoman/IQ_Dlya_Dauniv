const Log = require('../models/log')

const logger = async (key, msg, func, data) => {
    console.log("Log created ", key)
    const log = new Log({
        key,
        msg,
        func,
        data: JSON.stringify(data),
        timeStamp: new Date(Date.now()).toISOString(),
    })
    await log.save()
    return log
}

module.exports = logger