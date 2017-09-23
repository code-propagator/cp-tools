'use strict'

/* TREE
0 'ROOT'
1   'GROUP ONE'
2     'LEAF AAA'
3   'GROUP TWO'
4     'LEAF BBB'
5     'LEAF CCC'
6   'GROUP THREE'
*/

let sampleTree = [
  {// 0
    // tree root which is not displayed
    depth: 0,
    children: [1, 3, 6],
    title: 'ROOT'
  },
  {// 1
    depth: 1,
    children: [2], // folder ( leaf for 'undefined' )
    parentIndex: 0,
    title: 'GROUP ONE'
  },
  {// 2
    depth: 2,
    parentIndex: 1,
    title: 'LEAF AAA'
  },
  {// 3
    depth: 1,
    children: [4, 5],
    parentIndex: 0,
    title: 'GROUP TWO'
  },
  {// 4
    depth: 2,
    parentIndex: 3,
    title: 'LEAF BBB'
  },
  {// 5
    depth: 2,
    parentIndex: 3,
    title: 'LEAF CCC'
  },
  {// 6
    depth: 1,
    children: [], // EMPTY FOLDER (NOT A LEAF)
    parentIndex: 0,
    title: 'GROUP THREE'
  }
]

let leafOrNode = (elem) => {
  let ch = elem.children
  try {
    if (ch.length >= 0) {
      return 'node'
    }
  } catch (err) {
    return 'leaf'
  }
}

let getLeafs = (treeItems) => {
  let leafs = []
  treeItems.map((elem, index) => {
    console.log('TREE ELEMENT', elem, index)
    if (leafOrNode(elem) === 'leaf') {
      leafs.push(elem)
    }
  })
  return leafs
}

module.exports = {
  sampleTree,
  getLeafs
}
