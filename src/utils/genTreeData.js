import checkVarType from './checkVarType'
const { isArray, isObject, isBase } = checkVarType

const transformArray = (key, value, isOpen = false, isSortable = false, isEditable = false) => ({
  key,
  type: 'array',
  children: genChildTreeData(value, isOpen, isSortable),
  isOpen,
  init: false,
  editable: isEditable
})

const transformObject = (key, value, isRoot = false, isOpen = false, isSortable = false, isEditable = false) => ({
  key,
  children: genChildTreeData(value, isOpen, isSortable, isEditable),
  isRoot,
  type: 'object',
  isOpen,
  init: false,
  editable: isEditable
})

const transformBase = (key, value, isEditable = false) => ({
  key,
  value,
  type: 'base',
  editable: isEditable
})

const genChildTreeData = (list, isOpen = false, isSortable = false, isEditable = false) => {
  const children = []
  for (let key in list) {
    const item = list[key]
    if (isArray(item)) {
      children.push(transformArray(key, item, isOpen, isSortable, isEditable))
    } else if (isObject(item)) {
      children.push(transformObject(key, item, false, isOpen, isSortable, isEditable))
    } else if (isBase(item)) {
      children.push(transformBase(key, item, isEditable))
    } else {
      children.push('unknow')
    }
  }
  if (isSortable) {
    children.sort((a, b) => {
      const aKey = a.key
      const bKey = b.key
      if (aKey > bKey) {
        return 1
      } else {
        return -1
      }
    })
  }
  return children
}

const genJsonTree = (data, options) => {
  const { rootKeyName, defaultOpen, sortable, editable } = options
  if (isBase(data)) {
    return transformBase(rootKeyName, data, editable)
  }
  return transformObject(rootKeyName, data, true, defaultOpen, sortable, editable)
}

export default genJsonTree
