import JsonTreeViewBase from './JsonTreeViewBase'
import JsonTreeViewObject from './JsonTreeViewObject'
const renderComponentMaps = {
  base: JsonTreeViewBase,
  array: JsonTreeViewObject,
  object: JsonTreeViewObject
}

export default renderComponentMaps
