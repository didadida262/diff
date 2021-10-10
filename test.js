const debounce = function () {
    let timer = null
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            console.log('click')
        }, 1000);
    }
}