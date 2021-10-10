console.log('definepro')
import { defineReactive, observe, Observer } from './definProUtils.js'


const obj = {
    a: {
        m: {
            n: 5,
            t: 100
        }
    },
    b: [1, 2, 4]
}
// defineReactive(obj, 'b')

observe(obj)
obj.b[0] = 100
console.log(obj.b[0])
