import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
  } from "snabbdom";
  
    //   将vnode --> 真实dom，返回
    const createElement = (vnode) => {
        const vdom = document.createElement(vnode.sel)
        if (vnode.text !== ''  && (vnode.children === undefined || vnode.children.length === 0)) {
            vdom.innerText = vnode.text
        } else if (Array.isArray(vnode.children) && vnode.children.length > 0){
            for (const item of vnode.children) {
                vdom.appendChild(createElement(item))
            }
        }
        return vdom
    }


  const myVnode = (sel, data, children, text, elm, key) => {
      return {
        sel: sel,
        data: data,
        children: children,
        text: text,
        elm: elm,
        key: key
      }
  }
//   只识别三种情况：
// h('div', {}, '文字')
// h('div', {}, [])
// h('div', {}, h())
  const myH = (sel, data, c) => {
      if (typeof c === 'string') {
          return myVnode(sel, data, undefined, c, undefined, undefined)
      } else if (Array.isArray(c)) {
          const children = []
          for (const item of c) {
              if (!(typeof item === 'object' && item.hasOwnProperty('sel'))) {
                  throw new Error('数组中包含不是h的像')
              } 
              children.push(item)
          }
          return myVnode(sel, data, children, undefined, undefined, undefined)

      } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
          return myVnode(sel, data, [c], undefined, undefined, undefined)
      } else {
          throw new Error('输入不符合要求')
      }
  }



  export {myH, myVnode, createElement }
