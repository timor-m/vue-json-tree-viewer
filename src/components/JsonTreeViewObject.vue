<template>
  <div class="json-tree-item-leaf">
      <div class="json-tree-item-node" :class="{opened:isOpen}">
         <span class="json-tree-item-key" @click="toggle" :class="`json-tree-item-key-${keyClassName}`">{{key}}:</span>
         <span class="json-tree-item-hint" v-if="!isOpen">{{len}} {{property}}</span>
      </div>
      <div v-if="isOpen">
        <JsonTreeViewItem
      v-for="childNode in treeNode.children"
      :key="childNode.key"
      :treeNode="childNode"
      :options="options"
      />
      </div>
  </div>
</template>

<script>
import {getKey} from '../utils'
export default {
  name: 'JsonTreeViewObject',
  props: ['treeNode', 'options'],
  data () {
    return {
      key: '',
      len: 0,
      unit: {
        object: ['property', 'propertys'],
        array: ['item', 'items']
      },
      property: '',
      keyClassName: '',
      isOpen: false
    }
  },
  methods: {
    toggle () {
      this.isOpen = !this.isOpen
      this.treeNode.isOpen = this.isOpen
    }
  },
  created () {
    this.isOpen = this.treeNode.isOpen
    this.key = getKey(this.treeNode)
    this.len = this.treeNode.children.length
    const unit = this.unit[this.treeNode.type]
    this.property = this.len > 1 ? unit[1] : unit[0]
    this.keyClassName = isNaN(this.treeNode.key) ? typeof this.treeNode.key : 'number'
  }
}
</script>

<style lang="less">
.json-tree-item-leaf{
  position: relative;
  .json-tree-item-node{
    .json-tree-item-key{
      font-weight: bold;
      cursor: pointer;
      &.json-tree-item-key-number{
        font-weight: normal;
        color:  #881391;
      }
      &::before{
        content: "";
        position: absolute;
        width: 1px;
        height: 0;
        border: 10px solid transparent;
        border-top-color: #555;
        border-width: 10px 8px;
        border-radius: 3px;
        overflow: hidden;
        top: 5px;
        left: -16px;
        color: #555;
        font-size: 12px;
        transform-origin: center 5px;
        transform: scale(0.7) rotate(-90deg);
        transition: all 0.35s;
      }
    }
    &.opened .json-tree-item-key::before{
        transform: scale(0.8) rotate(0);
      }
    .json-tree-item-hint{
      color: #ddd;
    }
  }
}
</style>
