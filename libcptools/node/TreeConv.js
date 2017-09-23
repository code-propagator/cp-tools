'use strict';

/* TREE
0 'ROOT'
1   'GROUP ONE'
2     'LEAF AAA'
3   'GROUP TWO'
4     'LEAF BBB'
5     'LEAF CCC'
6   'GROUP THREE'
*/

var sampleTree = [{ // 0
  // tree root which is not displayed
  depth: 0,
  children: [1, 3, 6],
  title: 'ROOT'
}, { // 1
  depth: 1,
  children: [2], // folder ( leaf for 'undefined' )
  parentIndex: 0,
  title: 'GROUP ONE'
}, { // 2
  depth: 2,
  parentIndex: 1,
  title: 'LEAF AAA'
}, { // 3
  depth: 1,
  children: [4, 5],
  parentIndex: 0,
  title: 'GROUP TWO'
}, { // 4
  depth: 2,
  parentIndex: 3,
  title: 'LEAF BBB'
}, { // 5
  depth: 2,
  parentIndex: 3,
  title: 'LEAF CCC'
}, { // 6
  depth: 1,
  children: [], // EMPTY FOLDER (NOT A LEAF)
  parentIndex: 0,
  title: 'GROUP THREE'
}];

var leafOrNode = function leafOrNode(elem) {
  var ch = elem.children;
  try {
    if (ch.length >= 0) {
      return 'node';
    }
  } catch (err) {
    return 'leaf';
  }
};

var getLeafs = function getLeafs(treeItems) {
  var leafs = [];
  treeItems.map(function (elem, index) {
    console.log('TREE ELEMENT', elem, index);
    if (leafOrNode(elem) === 'leaf') {
      leafs.push(elem);
    }
  });
  return leafs;
};

module.exports = {
  sampleTree: sampleTree,
  getLeafs: getLeafs
};