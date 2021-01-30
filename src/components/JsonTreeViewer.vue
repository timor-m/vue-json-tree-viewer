<template>
    <div class="json-tree-container">
        <JsonTreeViewItem
          class="json-tree-item-root"
          v-model="treeData"
          :options="options"
        />
    </div>
</template>

<script>
import {genJsonTree} from '@/utils'
import JsonTreeViewItem from './JsonTreeViewItem'
export default {
  name: 'JsonTreeViewer',
  model: {
    prop: 'viewData',
    event: 'update'
  },
  components: {
    JsonTreeViewItem
  },
  data () {
    return {
      treeData: {}
    }
  },
  props: {
    viewData: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({
        defaultOpen: true,
        rootKeyName: 'root',
        editable: false,
        styles: {},
        parseLink: true
      })
    }
  },
  created () {
    const {rootKeyName, defaultOpen} = this.options
    this.treeData = genJsonTree(rootKeyName, this.viewData, defaultOpen)
  }
}
</script>

<style lang="less">
  .json-tree-container{
    position: relative;
    width: 100%;
    color: #666;
  }
</style>
