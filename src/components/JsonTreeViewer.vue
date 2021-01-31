<template>
    <div class="json-tree-container">
        <JsonTreeViewItem
          class="json-tree-item-root"
          :treeNode="treeData"
          :options="opt"
          :current-depth="0"
        />
    </div>
</template>

<script>
import {genJsonTree} from '@/utils'
import JsonTreeViewItem from './JsonTreeViewItem'
import defaultOptions from './options'
export default {
  name: 'JsonTreeViewer',
  components: {
    JsonTreeViewItem
  },
  data () {
    return {
      treeData: {},
      opt: {}
    }
  },
  props: {
    value: {
      type: [Object, Array, String],
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => (defaultOptions)
    }
  },
  created () {
    this.opt = Object.assign({}, defaultOptions, this.options)
    this.treeData = genJsonTree(this.value, this.opt)
  }
}
</script>

<style lang="less">
  .json-tree-container{
    font-family: "Consolas", "Menlo", "Courier", "monospace";
    position: relative;
    width: 100%;
    color: #666;
    font-size: 14px;
  }
</style>
