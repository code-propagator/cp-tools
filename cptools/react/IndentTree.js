'use strict'

import React from 'react'
import {ListItem} from 'material-ui/List'
let uuidv4 = require('uuid/v4')

const NAME = 'name'
const CHILDREN = 'children'

const i2o = require('indent2obj')
i2o.defaultIndent = '\t'
i2o.keys = {
  name: NAME,
  children: CHILDREN
}

const o2i = require('obj2indent')
o2i.defaultIndent = i2o.defaultIndent
o2i.keys = i2o.keys

let tabbedTextToObject = (tabbedText) => {
  console.log(tabbedText)
  console.log('---> indent to object')
  let obj = i2o(tabbedText)
  console.log('i2o', JSON.stringify(obj))
  return obj
}
// ===> obj is array of roots
/* Just take first one.
// ---> obj[0]
{"name":"ROOT",
  "children":[
      {"name":"NODE ONE",
        "children":[
            {"name":"LEAF A","children":[]},
            {"name":"NODE TWO",
              "children":[
                {"name":"LEAF C","children":[]},
                {"name":"NODE FOUR",
                  "children":[
                    {"name":"LEAF G","children":[]},
                    {"name":"LEAF B","children":[]}
                  ]}
              ]}
        ]},
      {"name":"NODE THREE",
        "children":[
          {"name":"LEAF D","children":[]}
        ]},
      {"name":"LEAF E","children":[]},
      {"name":"LEAF F","children":[]}
  ]}
*/
let objectToTabbedText = (obj) => {
  let indent = o2i(obj)
  console.log('o2i', indent)
  return indent
}
/*
ROOT
\tNODE ONE
\t\tLEAF A
\t\tNODE TWO
\t\t\tLEAF C
\t\t\tNODE FOUR
\t\t\t\tLEAF G
\t\t\t\tLEAF B
\tNODE THREE
\t\tLEAF D
\tLEAF E
\tLEAF F
*/

let traverse = (level, treeNode) => {
  // console.log('level', level, 'treeNode', treeNode)
  let name = treeNode[NAME]
  let children = getChildren(treeNode)
  if (children === null) {
    console.log('---> LEAF', name)
  } else {
    // handle each children
    children.map((elem, index) => {
      // traverse each child element
      level = level + 1
      traverse(level, elem)
      level = level - 1
    })
  }
}

let getChildren = (d) => {
  if (!d[CHILDREN]) return null
  if (d[CHILDREN].length === 0) return null
  return d[CHILDREN]
}

/*
let leaves = IndentTree.getLeaves(obj[0])
console.log('FOUND LEAVES', leaves)
*/
let getLeaves = (treeNode) => {
  let traverseThis = (level, treeNode) => {
    // console.log('level', level, 'treeNode', treeNode)
    let name = treeNode[NAME]
    let children = getChildren(treeNode)
    if (children === null) {
      console.log('---> LEAF', name)
      leaves.push(name)
    } else {
      // handle each children
      children.map((elem, index) => {
        // traverse each child element
        level = level + 1
        traverseThis(level, elem)
        level = level - 1
      })
    }
  }

  let level = 0
  let leaves = []
  traverseThis(level, treeNode)
  return leaves
}

/*
let treeRes = IndentTree.processTree(obj[0])
console.log(JSON.stringify(treeRes))
// https://github.com/gre/json-beautify
var beautify = require('json-beautify')
console.log(beautify(treeRes, null, 2, 80))

{
  "level": 0,
  "parent": null,
  "name": "ROOT",
  "key": 0,
  "children": [
    {
      "level": 1,
      "parent": "ROOT",
      "name": "NODE ONE",
      "key": 1,
      "children": [
        {
          "level": 2,
          "parent": "NODE ONE",
          "name": "LEAF A",
          "key": 2,
          "children": []
        },
        {
          "level": 2,
          "parent": "NODE ONE",
          "name": "NODE TWO",
          "key": 3,
          "children": [
            {
              "level": 3,
              "parent": "NODE TWO",
              "name": "LEAF C",
              "key": 4,
              "children": []
            },
            {
              "level": 3,
              "parent": "NODE TWO",
              "name": "NODE FOUR",
              "key": 5,
              "children": [
                {
                  "level": 4,
                  "parent": "NODE FOUR",
                  "name": "LEAF G",
                  "key": 6,
                  "children": []
                },
                {
                  "level": 4,
                  "parent": "NODE FOUR",
                  "name": "LEAF B",
                  "key": 7,
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "level": 1,
      "parent": "ROOT",
      "name": "NODE THREE",
      "key": 8,
      "children": [
        {
          "level": 2,
          "parent": "NODE THREE",
          "name": "LEAF D",
          "key": 9,
          "children": []
        }
      ]
    },
    {
      "level": 1,
      "parent": "ROOT",
      "name": "LEAF E",
      "key": 10,
      "children": []
    },
    {
      "level": 1,
      "parent": "ROOT",
      "name": "LEAF F",
      "key": 11,
      "children": []
    }
  ]
}
*/
let processTree = (treeNode) => {
  let key = -1

  let traverseThis = (level, parent, treeNode) => {
    // console.log('level', level, 'parent', parent, 'treeNode', treeNode)

    let name = treeNode[NAME]
    let children = getChildren(treeNode)

    if (children === null) {
      key++

      let thisleaf = {
        level: level,
        parent: parent,
        name: name,
        key: key,
        children: []
      }
      return thisleaf
    } else {
      key++

      let thisnode = {
        level: level,
        parent: parent, // parent for this node
        name: name,
        key: key,
        children: []
      }
      // parent for children
      parent = name
      children.map((elem, index) => {
        level = level + 1
        let ch = traverseThis(level, parent, elem)
        thisnode.children.push(ch)
        level = level - 1
      })
      return thisnode
    }
  }

  let level = 0
  let parent = null
  let resTree = traverseThis(level, parent, treeNode)
  return resTree
}

/*
let render = IndentTree.renderTree(obj[0])
console.log(render)
var html = require("html")
let pretty = html.prettyPrint(render, {indent_size: 2})
console.log(pretty)

<node name='ROOT' key='0'>
  <children>
    <node name='NODE ONE' key='1'>
      <children>
        <leaf name='LEAF A' key='2' />
        <node name='NODE TWO' key='3'>
          <children>
            <leaf name='LEAF C' key='4' />
            <node name='NODE FOUR' key='5'>
              <children>
                <leaf name='LEAF G' key='6' />
                <leaf name='LEAF B' key='7' />
              </children>
            </node>
          </children>
        </node>
      </children>
    </node>
    <node name='NODE THREE' key='8'>
      <children>
        <leaf name='LEAF D' key='9' />
      </children>
    </node>
    <leaf name='LEAF E' key='10' />
    <leaf name='LEAF F' key='11' />
  </children>
</node>
*/
let renderTree = (treeNode) => {
  let key = -1 // init with -1

  let traverseThis = (level, parent, treeNode) => {
    // console.log('level', level, 'parent', parent, 'treeNode', treeNode)

    let name = treeNode[NAME]
    let children = getChildren(treeNode)

    if (children === null) {
      key++
      // let thisleaf = {
      //   level: level,
      //   parent: parent,
      //   name: name,
      //   children: []
      // }
      return ('<leaf name=\'' + name + '\' key=\'' + key + '\' />') // NOTE: NOT ESPACED
      // return thisleaf
    } else {
      key++
      // let thisnode = {
      //   level: level,
      //   parent: parent, // parent for this node
      //   name: name,
      //   children: []
      // }
      // parent for children
      parent = name
      let s = ('<node name=\'' + name + '\' key=\'' + key + '\' ><children>') // NOTE: NOT ESCAPED
      children.map((elem, index) => {
        level = level + 1
        let ch = traverseThis(level, parent, elem)
        // thisnode.children.push(ch)
        s += ch
        level = level - 1
      })
      s += ('</children>' + '</node>')
      return s
      // return thisnode
    }
  }

  let level = 0
  let parent = null
  let resTree = traverseThis(level, parent, treeNode)
  return resTree
}

// generate ListItem tree
let renderMuiList = (treeNode, onClickCallback) => {
  let key = -1 // init with -1

  let handlerForKey = (key, refId) => {
    return () => {
      console.log('handlerForKey', key, refId)
      onClickCallback(key, refId)
    }
  }

  let traverseThis = (level, parent, treeNode) => {
    // console.log('level', level, 'parent', parent, 'treeNode', treeNode)

    let name = treeNode[NAME]
    let children = getChildren(treeNode)
    let refId = uuidv4()

    if (children === null) {
      key++
      // let thisleaf = {
      //   level: level,
      //   parent: parent,
      //   name: name,
      //   key: key,
      //   children: []
      // }
      name = name + ' [' + key + ']'
      // leaf true
      return (<ListItem key={key} ref={refId} onClick={handlerForKey(key, refId)} primaryText={name} />)
      // return thisleaf
    } else {
      key++
      // let thisnode = {
      //   level: level,
      //   parent: parent, // parent for this node
      //   name: name,
      //   key: key,
      //   children: []
      // }
      // parent for children
      parent = name
      let ch = []
      name = name + ' [' + key + ']'
      let node = <ListItem key={key} ref={refId} onClick={handlerForKey(key, refId)} primaryText={name}
        initiallyOpen
        primaryTogglesNestedList
        nestedItems={ch}
      />
      children.map((elem, index) => {
        level = level + 1
        ch.push(traverseThis(level, parent, elem))
        level = level - 1
      })
      node.nestedItems = ch
      return node
    }
  }

  let level = 0
  let parent = null
  let resTree = traverseThis(level, parent, treeNode)
  return resTree
}

let JefNode = require('json-easy-filter').JefNode
// var beautify = require('json-beautify')

let findTreeNodeByKey = (treeItemsToRender, key, omitChildren) => {
  let treeJson = processTree(treeItemsToRender)
  // console.log(beautify(treeJson, null, 2, 80))
  // https://github.com/gliviu/json-easy-filter
  var found = new JefNode(treeJson).filter((item) => {
    // console.log('FILTER', item)
    // item is temporal object generated JefNode traverser
    let k = item.key
    let v = item.value
    // if current object has property with name 'key'
    // and it's value is same as key
    //
    // key: 5
    //
    if (k === 'key' && v === key) {
      if (omitChildren === true) {
        return {
          key: item.parent.value.key,
          level: item.parent.value.level,
          name: item.parent.value.name,
          parent: item.parent.value.parent
          // ### omit children ###
        }
      } else {
        // ### This contains whole info including children.
        // return the node in treeJson itself, not the item
        return item.parent.value
      }
    }
  })
  // console.log('FOUND AFTER FILTER', found)
  let foundObj = null
  if (found !== null && found.length > 0) {
    foundObj = found[0]
  }
  // console.log('FIRST FOUND OBJECT BY FILTER', foundObj)
  return foundObj
}

module.exports = {
  tabbedTextToObject,
  objectToTabbedText,
  getLeaves,
  processTree,
  renderTree,
  renderMuiList,
  findTreeNodeByKey
}
