import checkVarType from './checkVarType'
import genJsonTree from './genTreeData'

const utils = {
  ...checkVarType,
  ...genJsonTree
}

const getKey = (data) => {
  if (!isNaN(data.key)) {
    return data.key
  }
  return `"${data.key}"`
}
const { isString, isNumber, isNull, isUndefined, isBoolean, isFunction } = utils
const getValue = (data, parseLink = true) => {
  const { value } = data
  if (isNumber(value) || isBoolean(value) || isNull(value) || isUndefined(value) || isFunction(value)) {
    return value
  } else if (isString(value)) {
    const linkReg = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim
    if (parseLink && linkReg.test(value)) {
      return value.replace(linkReg, `<a href="$1" target="_blank"/>$1</a>`)
    } else {
      return `"${value}"`
    }
  } else {
    return `"${value}"`
  }
}
export default utils
export {
  genJsonTree,
  getKey,
  getValue
}
