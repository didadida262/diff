import { myVnode, myH, createElement } from './sn'
import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
  } from "snabbdom";
  
  const container = document.getElementById("container")
  const btn = document.getElementById("btn")
  

  const myPatch = (oldNode, newNode) => {
    //   改造dom为虚拟节点，主义elm属性
      if (!oldNode.sel) {
          oldNode = myVnode(oldNode.tagName.toLowerCase(), {}, [], undefined, oldNode)
      } 
    //   判断是否为同一个dom
      if (oldNode.key === newNode.key && oldNode.sel === newNode.sel) {
        console.log('同一节点')
        // 判断新旧节点是否为同一个对象，是，就是啥都不做，返回。
        if (oldNode === newNode) return
        // 新节点存在text属性，即：没有children。
        if (newNode.text !== '' && (newNode.children === undefined || newNode.children.length === 0)) {
            if (oldNode.text !== newNode.text) {
                oldNode.elm.innerText = newNode.text
            }
        } else {
            // 新节点没有text，有children
            // 判断老得有没有children
            if (Array.isArray(oldNode.children) && oldNode.children.length > 0) {

            } else {
                // oldNode.elm.innerHtml = ''
                console.log('老东西没有儿子')
                // for (const item of newNode.children) {
                //     oldNode.elm.appendChild(createElement(item))
                // }
            }
        }





      } else {
        //   不是同一个节点,暴力删除
        console.log('不同节点')
        const newNodeElm = createElement(newNode)
        oldNode.elm.parentNode.insertBefore(newNodeElm, oldNode.elm)
        oldNode.elm.parentNode.removeChild(oldNode.elm)
      }
  }

  const newNode = myH('ul', {}, [ myH('li', {}, 'a'), myH('li', {}, 'b'), myH('li', {}, 'c')])
  const newNode2 = myH('div', {}, 'oldnode')

  myPatch(container, newNode)

  btn.onclick = () => {
    myPatch(newNode, newNode2)
  }
  