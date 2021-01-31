<template>
  <div class="json-tree-item-leaf">
      <div class="json-tree-item-node" :class="{opened:isOpen}">
         <span class="json-tree-item-key"
          @click="toggle" :class="`json-tree-item-key-${keyClassName}`"
          :style="{
             color:options.styles.key[keyClassName]
             }">{{key}}:</span>
         <span class="json-tree-item-hint" v-if="isShowHint">{{len}} {{property}}</span>
         <span v-if="!isOpen && !isShowHint && treeNode.type=='object'" class="json-tree-item-ellipsis">{<i @click="toggle">...</i>}</span>
         <span v-if="!isOpen && !isShowHint && treeNode.type=='array'" class="json-tree-item-ellipsis">[<i @click="toggle">...</i>]</span>
      </div>
      <div v-if="isOpen">
        <JsonTreeViewItem
      v-for="childNode in treeNode.children"
      :key="childNode.key"
      :treeNode="childNode"
      :options="options"
      :current-depth="currentDepth+1"
      />
      </div>
  </div>
</template>

<script>
import {getKey} from '../utils'
export default {
  name: 'JsonTreeViewObject',
  props: ['treeNode', 'options', 'currentDepth'],
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
      this.treeNode.init = true
    }
  },
  created () {
    if (!this.treeNode.init) {
      this.isOpen = this.treeNode.isOpen && this.currentDepth < this.options.defaultOpenDepth
    } else {
      this.isOpen = this.treeNode.isOpen
    }

    if (this.options.hints) {
      this.unit = this.options.hints
      this.len = this.treeNode.children.length
      const unit = this.unit[this.treeNode.type]
      this.property = this.len > 1 ? unit[1] : unit[0]
    }
    this.key = getKey(this.treeNode, this.options.keyNameQuote)
    this.keyClassName = isNaN(this.treeNode.key) ? typeof this.treeNode.key : 'number'
  },
  computed: {
    isShowHint () {
      return !this.isOpen && this.options.hints
    }
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
        top: 3px;
        left: -16px;
        width: 1px;
        height: 0;
        border: 10px solid transparent;
        border-top-color: #555;
        border-width: 10px 8px;
        border-radius: 3px;
        overflow: hidden;
        color: #555;
        font-size: 12px;
        transform-origin: center 5px;
        transform: scale(0.7) rotate(-90deg);
        transition: all 0.35s;
      }
    }
    &.opened .json-tree-item-key::before{
        transform: scale(0.7) rotate(0);
      }
    .json-tree-item-hint{
      color: #ddd;
    }
    .json-tree-item-ellipsis{
      i{
        display: inline-block;
        height: 14px;
        line-height: 7px;
        background-color: #f9f9f9;
        color: orangered;
        letter-spacing: -2px;
        border-radius: 3px;
        vertical-align: middle;
        padding: 0 3px;
        margin: 0 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
