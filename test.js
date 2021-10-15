const f = function () {
    let i = 1
    return function () {
        i++
        console.log(i)
    }
}

const test = f()
test()
test()
test()
test()