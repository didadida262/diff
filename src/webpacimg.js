function packImg() {
    const olm = document.createElement('div')
    const img = document.createElement('img')
    img.src = require('../src/vue3.jpg').default
    olm.appendChild(img)
    return olm
}

document.body.appendChild(packImg())