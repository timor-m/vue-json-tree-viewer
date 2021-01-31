<template>
  <div id="app">
      <JsonTreeViewer
        :value="json"
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
        home:"https://lby.link",
        wifi:null,
        phone:undefined,
        fff:function(){}
      },
      options:{
        defaultOpen:true,
        rootKeyName:'root',
        editable:false,
        sortable:true,
        defaultOpenDepth: 1,
        styles:{
          key:{
            string:'#555',
            number:'#881391',
          },
          value:{
            string:'#c41a16',
            number:' #1c00cf',
            boolean:'#0d22aa',
            null:'#e08331',
            undefined:'#e08331',
            function:'#067bca'
          }
        },
        parseLink:true,
        keyNameQuote:false,// false / single / double
        valueNameQuote: 'double',//  single / double
        hints:false // when hints is false will show ellipsis 
        // hints:{
        //   array:['item','items'],
        //   object:['property','propertys']
        // }
      }
    }
  },
  methods:{

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
  
  *::-webkit-scrollbar{
    width: 8px;
    height: 8px;
    background-color: #f5f5f5;
}

   *::-webkit-scrollbar-track{
    border-radius: 3px;
    background-color: #eee;
}

::-webkit-scrollbar-thumb{
    height: 20px;
    border-radius: 10px;
    background-color: #ccc;
}
</style>
