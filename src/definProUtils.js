
let uid = 0
let uuid = 0
// 一道算法题
const parsePath = (str) => {
    const segments = str.split('.')
    return (obj) => {
        for (let i = 0; i < segments.length; i++) {
            obj = obj[segments[i]]
        }
        return obj
    }
}
const b = {
    a: {
        b: {
            c: {
                d: 1000
            }
        }
    }
}

class Watcher {
    constructor (target, expression, callback) {
        console.log('我是watcher构造器')
        this.id = uuid++
        this.target = target
        this.getter = parsePath(expression)
        this.callback = callback
        this.value = this.get()
    }
    update() {
        this.run()
    }
    run () {
        this.getAndInvoke(this.callback)
    }
    getAndInvoke (cb) {
        const value = this.get()
        if (value !== this.value || typeof value === 'object') {
            const oldValue = this.value
            this.value = value
            cb.call(this.target, value, oldValue)
        }
    }
    get () {
        Dep.target = this
        const obj = this.target
        let value
        try {
            value = this.getter(obj)
        } finally {
            Dep.target = null
        }
        return value
    }
}

class Dep {
    constructor () {
        console.log('我是dep构造器-----')
        this.subs = []
        this.id = uid++
    }
    addSub (sub) {
        this.subs.push(sub)
    }
    depend () {
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }
    notify () {
        console.log('我是notify')
        const subs = this.subs.slice()
        for (let i = 0; i < subs.length; i++) {
            subs[i].update()
        }
        
    }
}


const defineReactive = function(data, key, val) {
    if (arguments.length === 2) {
        val = data[key]
    }
    const dep = new Dep()
    let childob = observe(val)
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get () {
            if (Dep.target) {
                dep.depend()
                if (childob) {
                    childob.dep.depend()
                }
            }
            return val
        },
        set (newVal) {
            if (newVal === val) return
            console.log('我是set')
            val = newVal
            // 此处貌似不需要下一行代码
            observe(val)
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
        // 每一个observer都有一个dep实例
        this.dep = new Dep()
        def(value, '__ob__', this, false)
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
    if (typeof val.__ob__ !== 'undefined') {
        ob = val.__ob__
    } else {
        ob = new Observer(val)
    }
    return ob
}



export { defineReactive, observe, Observer, Watcher }

