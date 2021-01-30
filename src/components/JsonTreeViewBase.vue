<template>
  <div class="json-tree-view-base">
    <span class="json-tree-view-base-key" :class="`json-tree-view-base-key-${keyClassName}`">{{key}}:</span>
    <span class="json-tree-view-base-value" :class="`json-tree-view-base-value-${valueClassName}`" v-html="value"></span>
  </div>
</template>

<script>
import utils, {getKey, getValue} from '../utils'
const {isString, isNull, isNumber, isBoolean, isFunction} = utils
export default {
  name: 'JsonTreeViewBase',
  props: ['treeNode', 'options'],
  data () {
    return {
      key: '',
      value: '',
      className: '',
      keyClassName: '',
      typemaps: {
        isString,
        isNull,
        isNumber,
        isBoolean,
        isFunction
      }
    }
  },
  created () {
    this.key = getKey(this.treeNode)
    this.value = getValue(this.treeNode, this.options.parseLink)
    this.valueClassName = this.getClassName()
    this.keyClassName = isNaN(this.treeNode.key) ? typeof this.treeNode.key : 'number'
  },
  methods: {
    getClassName () {
      for (let key in this.typemaps) {
        if (this.typemaps[key](this.treeNode.value)) {
          return key.replace(/is/g, '').toLowerCase()
        }
      }
    }
  }
}
</script>

<style lang="less">
  .json-tree-view-base{
    .json-tree-view-base-key{
      &.json-tree-view-base-key-number{
        font-weight: normal;
        color: #881391;
      }
    }
    .json-tree-view-base-value{
      &.json-tree-view-base-value-string{
        color: #c41a16;
      }
      &.json-tree-view-base-value-number{
        color: #1c00cf;
      }
      &.json-tree-view-base-value-boolean{
        color: #0d22aa;
      }
    }
  }
</style>
