import JsonTreeViewer from '@/components/JsonTreeViewer'
import JsonTreeViewItem from '@/components/JsonTreeViewItem'
import JsonTreeViewBase from '@/components/JsonTreeViewBase'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('JsonTreeViewer', JsonTreeViewer)
  window.Vue.component('JsonTreeViewItem', JsonTreeViewItem)
  window.Vue.component('JsonTreeViewBase', JsonTreeViewBase)
}

const install = (Vue) => {
  Vue.component('JsonTreeViewer', JsonTreeViewer)
  Vue.component('JsonTreeViewItem', JsonTreeViewItem)
  Vue.component('JsonTreeViewBase', JsonTreeViewBase)
}

export default install

export {
  JsonTreeViewer,
  JsonTreeViewItem,
  JsonTreeViewBase
}
