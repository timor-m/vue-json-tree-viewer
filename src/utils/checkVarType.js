const SUPPORT_VARIABLE_TYPE = ['Number', 'Boolean', 'Null', 'Object', 'Function', 'Array', 'String', 'Undefined']
const checkFunction = {}
SUPPORT_VARIABLE_TYPE.map(item => {
  checkFunction[`is${item}`] = (value) => {
    return Object.prototype.toString.call(value) === `[object ${item}]`
  }
})
checkFunction.isBase = (value) => !checkFunction.isArray(value) && !checkFunction.isObject(value)
export default checkFunction
