(function (global){
//addTest // adds a test function to an array of functions
//assert. {pass,fail,equal,deepEqual, HTMLEqual}
//result object from assertion {message: msg , passed: true/false, actual: actualValue, expected: expectedValue }

    let tests= {}
    let addTest = (testDescription, testFunction) => {
        if(!tests[testDescription]){
            tests[testDescription] = testFunction 
            return true 
        }else{
            console.log("A test with a similar description is already Registered")
            return false
        }
    }

    let assert = {}

    assert.pass = test => Object.assign({message: "Test Passed", passed: true}, test)

    assert.fail = test => Object.assign({message: "Test Failed", passed: false}, test)

    assert.equal = (actual, expected) => Object.assign({
        passed: actual === expected,
        message: `Expected ${test.actual} to be ${test.expected} `
    })

    assert.deepEqual = (actual, expected) => { //compares *objects* deeply and not just their references
        assert.equal(JSON.stringify(actual), JSON.stringify(expected))
    } 

    assert.HTMLEqual = (actual, expected) =>{
        // assert.
    }
    
    global.TestRunner = {
        //what do we export
        addTest,
        assert, 

    }

})(window)