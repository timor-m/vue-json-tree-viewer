import checkVarType from './checkVarType'
import genJsonTree from './genTreeData'

const utils = {
  ...checkVarType,
  ...genJsonTree
}

const getKey = (data, keyNameQuote = 'double') => {
  if (!isNaN(data.key) || !keyNameQuote) {
    return data.key
  }
  switch (keyNameQuote) {
    case 'double':
      return `"${data.key}"`
    case 'single':
      return `'${data.key}'`
    default:
      throw new Error('Params Error at keyNameQuote.')
  }
}
const { isString, isNumber, isNull, isUndefined, isBoolean, isFunction } = utils
const getValue = (data, opt = { parseLink: true, valueNameQuote: 'double' }) => {
  const { value } = data
  const divider = opt.valueNameQuote === 'single' ? `'` : `"`
  if (isNumber(value) || isBoolean(value)) {
    return value
  } else if (isString(value)) {
    const linkReg = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim
    if (opt.parseLink && linkReg.test(value)) {
      return value.replace(linkReg, `<a href="$1" target="_blank"/>$1</a>`)
    } else {
      return `"${value}"`.replace(/^"|"$/g, divider)
    }
  } else if (isNull(value) || isUndefined(value)) {
    return `null`
  } else if (isFunction(value)) {
    return `&lt;function&gt;`
  } else {
    return `"${value}"`.replace(/^"|"$/g, divider)
  }
}
export default utils
export {
  genJsonTree,
  getKey,
  getValue
}
