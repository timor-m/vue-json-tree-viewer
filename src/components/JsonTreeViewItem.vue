<template>
  <div class="json-tree-item">
      <component
      :is="renderComponent"
      :treeNode="treeNode"
      :options="options"
      :current-depth="currentDepth"
      />
  </div>
</template>

<script>
import renderComponentMaps from './render'
export default {
  name: 'JsonTreeViewItem',
  props: ['treeNode', 'options', 'currentDepth'],
  data () {
    return {
      renderComponent: null
    }
  },
  created () {
    console.log(this.treeNode)
    this.renderComponent = renderComponentMaps[this.treeNode.type]
  }
}
</script>

<style lang="less">
    .json-tree-item{
        padding-left: 14px;
    }
</style>
