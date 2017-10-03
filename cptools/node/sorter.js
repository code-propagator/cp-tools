'use strict'
// SORTER
let sortByLength = (a, b) => { // CUSTOM SORTER: NOT STRING ORDER
  if (a.length === b.length) {
    return 0
  }
  return a.length > b.length ? 1 : -1
}

let sortByReverse = (a, b) => {
  // Reversed String abcxyz ---> zyxcba
  if (a === b) {
    return 0
  }
  const aReverse = a.split('').reverse().join('')
  const bReverse = b.split('').reverse().join('')
  return aReverse > bReverse ? 1 : -1
}

let sortByDate = (a, b) => {
  // console.log('##### sortByDate', a, b)
  // Date object
  if (a.getTime() === b.getTime()) {
    return 0
  }
  return a.getTime() > b.getTime() ? 1 : -1
}

module.exports = {
  sortByLength,
  sortByReverse,
  sortByDate
}
