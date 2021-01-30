<template>
  <div id="app">
      <JsonTreeViewer
        v-model="json"
        :options="options"
      />
  </div>
</template>

<script>
export default {
  data(){
    return {
      json:{
        name:"张三",
        age:200,
        hob:["唱歌","睡觉","游戏","游泳"],
        friends:[
          {
            name:"张三",
            age:201,
            sex:"男"
          }, {
            name:"李四",
            age:202,
            sex:"女"
          }, {
            name:"王五",
            age:203,
            sex:"男"
          }
        ],
        fat:true,
        height:1.8,
        home:"https://lby.link"
      },
      options:{
        defaultOpen:true,
        rootKeyName:"root",
        editable:false,
        styles:{},
        parseLink:true
      }
    }
  }
}
</script>

<style>
  #app{
    width: 80%;
    margin: 20px auto;
    height: calc(100vh - 50px);
    border: 1px solid #ccc;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 5px;
    overflow: auto;
  }
</style>
