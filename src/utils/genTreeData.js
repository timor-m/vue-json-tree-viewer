import checkVarType from './checkVarType'
const { isArray, isObject, isBase } = checkVarType

const transformArray = (key, value, isOpen = false) => ({
  key,
  type: 'array',
  children: genChildTreeData(value, isOpen),
  isOpen
})

const transformObject = (key, value, isRoot = false, isOpen = false) => ({
  key,
  children: genChildTreeData(value, isOpen),
  isRoot,
  type: 'object',
  isOpen
})

const transformBase = (key, value) => ({
  key,
  value,
  type: 'base'
})

const genChildTreeData = (list, isOpen = false) => {
  const children = []
  for (let key in list) {
    const item = list[key]
    if (isArray(item)) {
      children.push(transformArray(key, item, isOpen))
    } else if (isObject(item)) {
      children.push(transformObject(key, item, false, isOpen))
    } else if (isBase(item)) {
      children.push(transformBase(key, item))
    } else {
      children.push('unknow')
    }
  }
  return children
}

const genJsonTree = (rootName, data, isOpen = false) => {
  if (isBase(data)) {
    return transformBase(data)
  }
  return transformObject(rootName, data, true, isOpen)
}

export default genJsonTree
