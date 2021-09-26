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
        const domNode = document.createElement(vnode.sel)
        if (vnode.text !== ''  && (vnode.children === undefined || vnode.children.length === 0)) {
            domNode.innerText = vnode.text
        } else if (Array.isArray(vnode.children) && vnode.children.length > 0){
            for (const item of vnode.children) {
                domNode.appendChild(createElement(item))
            }
        }
        vnode.elm = domNode
        return domNode
    }


  const myVnode = (sel, data, children, text, elm, key) => {
      return {
        sel: sel,
        data: data,
        children: children,
        text: text,
        elm: elm,
        key: data.key
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

  const checkSameNode = (oldNode, newNode) => {
      return oldNode.sel === newNode.sel && oldNode.key === newNode.key
  }

  const updateChildren = (oldElm, oldCh, newCh) => {
      let oldStartIdx = 0
      let oldEndIdx = oldCh.length - 1
      let newStartIdx = 0
      let newEndIdx = newCh.length - 1
      let oldStartVnode = oldCh[0]
      let oldEndVnode = oldCh[oldEndIdx]
      let newStartVnode = newCh[0]
      let newEndVnode = newCh[newEndIdx]


      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
          if (checkSameNode(oldStartVnode, newStartVnode)) {
              patchVnode(oldStartVnode, newStartVnode)
              oldStartVnode = oldCh[++oldStartIdx]
              newStartVnode = newCh[++newStartIdx]
          }
      }
  }

  const patchVnode = (oldNode, newNode) => {
        if (oldNode === newNode) return
        // 新节点存在text属性，即：没有children。
        if (newNode.text !== '' && (newNode.children === undefined || newNode.children.length === 0)) {
            if (oldNode.text !== newNode.text) {
                console.log('jinlaile')
                oldNode.elm.innerText = newNode.text
                newNode.elm = oldNode.elm
            }
        } else {
            // 新节点没有text，有children
            // 判断老得有没有children
            if (Array.isArray(oldNode.children) && oldNode.children.length > 0) {
              // 有,diff的精华
              // for (let i =0; i < )
              updateChildren(oldNode.elm, oldNode.children, newNode.children)
            } else {
                // o没有
                console.log('老东西没有儿子')
                newNode.elm = oldNode.elm
                oldNode.elm.innerText = ''
                for (const item of newNode.children) {
                  oldNode.elm.appendChild(createElement(item))                  
                }
                // for (const item of newNode.children) {
                //     oldNode.elm.appendChild(createElement(item))
                // }
            }
        }      
  }



  export {myH, myVnode, createElement, patchVnode }
