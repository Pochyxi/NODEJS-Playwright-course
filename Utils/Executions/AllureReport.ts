const {executeCommand} = require("../traceManager")
const {executePlayWrightCommand} = require("../utils")

executeCommand("npx allure open")
executePlayWrightCommand("show-trace")
