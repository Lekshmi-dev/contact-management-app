const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Error", message: err.message, stackRace: err.stack });
            break;
        case constants.UNAUTHORISED:
            res.json({ title: "UNAUTHORISED", message: err.message, stackRace: err.stack });
            break;
        case constants.FORBIDDEN:
            res.json({ title: "FORBIDDEN", message: err.message, stackRace: err.stack });
            break;
        case constants.NOT_FOUND:
            res.json({ title: "NOT FOUND", message: err.message, stackRace: err.stack });
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "SERVER ERROR", message: err.message, stackRace: err.stack });
            break;
        default:
            console.log("No error, all good");
            res.json({ title: "SERVER ERROR", message: err.message, stackRace: err.stack });
            break;
    }


}

module.exports = errorHandler;