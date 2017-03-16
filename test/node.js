require('../index')
console._intercept = (type, args) => {
  console._log('I intercepted this '+type+' message!')
  console._collect(type, args)
}
console.error('Hello World!')

console._log(console.history)
