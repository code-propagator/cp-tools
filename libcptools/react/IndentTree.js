'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _List = require('material-ui/List');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uuidv4 = require('uuid/v4');

var NAME = 'name';
var CHILDREN = 'children';

var i2o = require('indent2obj');
i2o.defaultIndent = '\t';
i2o.keys = {
  name: NAME,
  children: CHILDREN
};

var o2i = require('obj2indent');
o2i.defaultIndent = i2o.defaultIndent;
o2i.keys = i2o.keys;

var tabbedTextToObject = function tabbedTextToObject(tabbedText) {
  console.log(tabbedText);
  console.log('---> indent to object');
  var obj = i2o(tabbedText);
  console.log('i2o', (0, _stringify2.default)(obj));
  return obj;
};
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
var objectToTabbedText = function objectToTabbedText(obj) {
  var indent = o2i(obj);
  console.log('o2i', indent);
  return indent;
};
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

var traverse = function traverse(level, treeNode) {
  // console.log('level', level, 'treeNode', treeNode)
  var name = treeNode[NAME];
  var children = getChildren(treeNode);
  if (children === null) {
    console.log('---> LEAF', name);
  } else {
    // handle each children
    children.map(function (elem, index) {
      // traverse each child element
      level = level + 1;
      traverse(level, elem);
      level = level - 1;
    });
  }
};

var getChildren = function getChildren(d) {
  if (!d[CHILDREN]) return null;
  if (d[CHILDREN].length === 0) return null;
  return d[CHILDREN];
};

/*
let leaves = IndentTree.getLeaves(obj[0])
console.log('FOUND LEAVES', leaves)
*/
var getLeaves = function getLeaves(treeNode) {
  var traverseThis = function traverseThis(level, treeNode) {
    // console.log('level', level, 'treeNode', treeNode)
    var name = treeNode[NAME];
    var children = getChildren(treeNode);
    if (children === null) {
      console.log('---> LEAF', name);
      leaves.push(name);
    } else {
      // handle each children
      children.map(function (elem, index) {
        // traverse each child element
        level = level + 1;
        traverseThis(level, elem);
        level = level - 1;
      });
    }
  };

  var level = 0;
  var leaves = [];
  traverseThis(level, treeNode);
  return leaves;
};

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
var processTree = function processTree(treeNode) {
  var key = -1;

  var traverseThis = function traverseThis(level, parent, treeNode) {
    // console.log('level', level, 'parent', parent, 'treeNode', treeNode)

    var name = treeNode[NAME];
    var children = getChildren(treeNode);

    if (children === null) {
      key++;

      var thisleaf = {
        level: level,
        parent: parent,
        name: name,
        key: key,
        children: []
      };
      return thisleaf;
    } else {
      key++;

      var thisnode = {
        level: level,
        parent: parent, // parent for this node
        name: name,
        key: key,
        children: []
        // parent for children
      };parent = name;
      children.map(function (elem, index) {
        level = level + 1;
        var ch = traverseThis(level, parent, elem);
        thisnode.children.push(ch);
        level = level - 1;
      });
      return thisnode;
    }
  };

  var level = 0;
  var parent = null;
  var resTree = traverseThis(level, parent, treeNode);
  return resTree;
};

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
var renderTree = function renderTree(treeNode) {
  var key = -1; // init with -1

  var traverseThis = function traverseThis(level, parent, treeNode) {
    // console.log('level', level, 'parent', parent, 'treeNode', treeNode)

    var name = treeNode[NAME];
    var children = getChildren(treeNode);

    if (children === null) {
      key++;
      // let thisleaf = {
      //   level: level,
      //   parent: parent,
      //   name: name,
      //   children: []
      // }
      return '<leaf name=\'' + name + '\' key=\'' + key + '\' />'; // NOTE: NOT ESPACED
      // return thisleaf
    } else {
      key++;
      // let thisnode = {
      //   level: level,
      //   parent: parent, // parent for this node
      //   name: name,
      //   children: []
      // }
      // parent for children
      parent = name;
      var s = '<node name=\'' + name + '\' key=\'' + key + '\' ><children>'; // NOTE: NOT ESCAPED
      children.map(function (elem, index) {
        level = level + 1;
        var ch = traverseThis(level, parent, elem);
        // thisnode.children.push(ch)
        s += ch;
        level = level - 1;
      });
      s += '</children>' + '</node>';
      return s;
      // return thisnode
    }
  };

  var level = 0;
  var parent = null;
  var resTree = traverseThis(level, parent, treeNode);
  return resTree;
};

// generate ListItem tree
var renderMuiList = function renderMuiList(treeNode, onClickCallback) {
  var key = -1; // init with -1

  var handlerForKey = function handlerForKey(key, refId) {
    return function () {
      console.log('handlerForKey', key, refId);
      onClickCallback(key, refId);
    };
  };

  var traverseThis = function traverseThis(level, parent, treeNode) {
    // console.log('level', level, 'parent', parent, 'treeNode', treeNode)

    var name = treeNode[NAME];
    var children = getChildren(treeNode);
    var refId = uuidv4();

    if (children === null) {
      key++;
      // let thisleaf = {
      //   level: level,
      //   parent: parent,
      //   name: name,
      //   key: key,
      //   children: []
      // }
      name = name + ' [' + key + ']';
      // leaf true
      return _react2.default.createElement(_List.ListItem, {
        key: key,
        ref: refId,
        onClick: handlerForKey(key, refId),
        primaryText: name
      });
      // return thisleaf
    } else {
      key++;
      // let thisnode = {
      //   level: level,
      //   parent: parent, // parent for this node
      //   name: name,
      //   key: key,
      //   children: []
      // }
      // parent for children
      parent = name;
      var ch = [];
      name = name + ' [' + key + ']';
      // ### To avoid 'object is not extensible' error for nestedItems property,
      // ### You shuld set up ch array first.
      children.map(function (elem, index) {
        level = level + 1;
        ch.push(traverseThis(level, parent, elem));
        level = level - 1;
      });
      // ### Assign ch to nestedItems.
      return _react2.default.createElement(_List.ListItem, {
        key: key,
        ref: refId,
        onClick: handlerForKey(key, refId),
        primaryText: name,
        initiallyOpen: true,
        primaryTogglesNestedList: true,
        nestedItems: ch
      });
    }
  };

  var level = 0;
  var parent = null;
  var resTree = traverseThis(level, parent, treeNode);
  return resTree;
};

var JefNode = require('json-easy-filter').JefNode;
// var beautify = require('json-beautify')

var findTreeNodeByKey = function findTreeNodeByKey(treeItemsToRender, key, omitChildren) {
  var treeJson = processTree(treeItemsToRender);
  // console.log(beautify(treeJson, null, 2, 80))
  // https://github.com/gliviu/json-easy-filter
  var found = new JefNode(treeJson).filter(function (item) {
    // console.log('FILTER', item)
    // item is temporal object generated JefNode traverser
    var k = item.key;
    var v = item.value;
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
        };
      } else {
        // ### This contains whole info including children.
        // return the node in treeJson itself, not the item
        return item.parent.value;
      }
    }
  });
  // console.log('FOUND AFTER FILTER', found)
  var foundObj = null;
  if (found !== null && found.length > 0) {
    foundObj = found[0];
  }
  // console.log('FIRST FOUND OBJECT BY FILTER', foundObj)
  return foundObj;
};

module.exports = {
  tabbedTextToObject: tabbedTextToObject,
  objectToTabbedText: objectToTabbedText,
  getLeaves: getLeaves,
  processTree: processTree,
  renderTree: renderTree,
  renderMuiList: renderMuiList,
  findTreeNodeByKey: findTreeNodeByKey
};