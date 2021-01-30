<template>
  <div class="json-tree-item">
      <component
      :is="renderComponent"
      :treeNode="treeNode"
      :options="options"
      />
  </div>
</template>

<script>
import renderComponentMaps from './render'
export default {
  name: 'JsonTreeViewItem',
  model: {
    prop: 'treeNode'
  },
  props: ['treeNode', 'options'],
  data () {
    return {
      renderComponent: null
    }
  },
  created () {
    this.renderComponent = renderComponentMaps[this.treeNode.type]
  }
}
</script>

<style lang="less">
    .json-tree-item{
        padding-left: 14px;
    }
</style>
