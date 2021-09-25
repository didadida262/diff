import { myVnode, myH, createElement, patchVnode } from './sn'
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
      console.log('oldNode:', oldNode)
      console.log('newNode:', newNode)
    //   判断是否为同一个dom
      if (oldNode.key === newNode.key && oldNode.sel === newNode.sel) {
        patchVnode(oldNode, newNode)
      } else {
        //   不是同一个节点,暴力删除
        console.log('不同节点')
        const newNodeElm = createElement(newNode)
        // console.log('newNodeElm:', newNodeElm)
        oldNode.elm.parentNode.insertBefore(newNodeElm, oldNode.elm)
        oldNode.elm.parentNode.removeChild(oldNode.elm)
      }
  }

  // const newNode1 = myH('div', {}, 'oldnode')
  const newNode1 = myH('div', {}, [ myH('li', {}, 'a'), myH('li', {}, 'b'), myH('li', {}, 'c')])

  // const newNode2 = myH('div', {}, 'newnode')
  const newNode2 = myH('div', {}, [ 
    myH('li', {}, 'a'), myH('li', {}, 'b'), myH('li', {}, 'c'), myH('li', {}, 'd')])

  myPatch(container, newNode1)

  btn.onclick = () => {
    myPatch(newNode1, newNode2)
  }

  