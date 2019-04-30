<template>
  <section class="real-app">
    <input 
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="请输入详细地址"
      @keyup.enter="addTodo">
    <item 
      v-for="item in filteredTodos" 
      :key="item.id"
      @del="deleteTodo"
      :todo="item"/>
    <tabs 
      @toggle="toggleFilter"
      @clearAll="clearAllCompleted"
      :filter="filter" 
      :todos="todos"/>
      
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'

let id = 0;

export default {
  data(){
    return{
      config: {
        api: {
          postcode: '/post/index.php?m=postsearch&c=index&a=ajax_addr'
        }
      },  
      todos: [],
      filter: 'all',
    }
  },
  components: {
    Item,
    Tabs,
  },
  computed: {
    filteredTodos(){
      if(this.filter === 'all'){
        return this.todos
      }else if(this.filter === 'completed'){
        return this.todos.filter(todo => todo.completed)
      }else if(this.filter === 'active'){
        return this.todos.filter(todo => !todo.completed)
      }
    }
  },
  created(){
  },
  methods: {
    getPostcode(address){
      let self = this,
          api = this.config.api;
      let params = {
        'm': 'postsearch',
        'c': 'index',
        'a': 'ajax_addr',
        'searchkey': '广东省深圳市罗湖区爱国路'
      }
      this.axios({
            method: "get",
            // url: api.postcode + '&searchkey=' + address,
            url: '/post',
          }).then(function(res){
            console.log(res)
                  //控制台打印请求成功时返回的数据
               //bind(this)可以不用
          }
      )
    },
    addTodo(e){
      let val = e.target.value;
      if(!val)return;

      this.getPostcode(val);

      this.todos.unshift({
        id: id++,
        content: val.trim(),
        completed: false,
      })
      e.target.value = ''
    },
    deleteTodo(id){
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
    },
    toggleFilter(state){
      this.filter = state;
    },
    clearAllCompleted(){
      this.todos = this.todos.filter(todo => !todo.completed);
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>
