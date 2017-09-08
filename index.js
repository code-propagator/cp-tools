const hello = (name) => {
  console.log('hello', name)
}

let nodereact = require('./libcptools/index.js')

module.exports = {
  hello: hello,
  cptools: nodereact
}
