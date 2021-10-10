import { defineReactive, observe, Observer, Watcher } from './definProUtils.js'


const obj = {
    a: {
        m: {
            n: 5,
            t: 100
        }
    }
}
// defineReactive(obj, 'b')

observe(obj)
new Watcher(obj, 'a.m.n', (val) => {
    console.log('⭐️', val)
})
obj.a.m.n = 88
// console.log(obj.a.m.n)