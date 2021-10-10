class Dep {
    constructor () {
        console.log('我是dep')
    }
    notify () {
        console.log('我是notify')
    }
}

class Watcher {
    constructor () {
        console.log('我是watcher')
    }
}

const defineReactive = function(data, key, val) {
    if (arguments.length === 2) {
        val = data[key]
    }
    const dep = new Dep()
    observe(val)
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get () {
            return val
        },
        set (newVal) {
            if (newVal === val) return
            console.log('改变值了')
            val = newVal
            // 此处貌似不需要下一行代码
            // observe(val)
            dep.notify()
        }
    })
}

const def = (obj, key, target, enumerable) => {
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: enumerable,
        writable: true,
        value: target
    })  
}
// 将obj的每个对象属性都变成响应式的（可被侦测的）,标志就是添加一个__ob__隐藏属性
class Observer {
    constructor (value) {
        this.dep = new Dep()
        def(value, '__ob__', this, false)
        console.log('我是observer', value)
        this.walk(value)
    }
    walk (value) {
        for (const key in value) {
            defineReactive(value, key)
        }
    }
}

const observe = (val) => {
    if (typeof val !== 'object') return
    let ob
    console.log('val.__ob__:', val.__ob__)
    if (typeof val.__ob__ !== 'undefined') {
        ob = val.__ob__
    } else {
        ob = new Observer(val)
    }
    return ob
}



export { defineReactive, observe, Observer }

