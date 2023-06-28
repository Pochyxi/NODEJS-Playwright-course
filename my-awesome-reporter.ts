module.exports = class MyReporter {
    onBegin(config, suite) {
        console.log("========================================================================")
        console.log(`Starting the run with ${suite.allTests().length} tests`)
    }

    onTestBegin(test) {
        console.log("------------------------------------------------------------------------")
        console.log(`Starting test ${test.title}`)
    }

    onTestEnd(test, result) {
        console.log("------------------------------------------------------------------------")
        console.log(`Finished test ${test.title}: ${result.status}`)
    }

    onEnd(result) {
        console.log("========================================================================")
        console.log(`Finished the run: ${result.status}`)
    }
}