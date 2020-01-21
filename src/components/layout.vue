<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed">
      <div class="logo">
        <img src="@/assets/logo.png">
      </div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['0']">
        <a-menu-item v-for="(item, index) in pages" :key="index">
           <router-link :to="item.to">
          <a-icon :type="item.icon" />
          <span>{{item.text}}</span>
          </router-link>
        </a-menu-item> 
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <div id="toolbar" class="right-align-bar">
         
   
    <a-dropdown>
    <a class="ant-dropdown-link" href="#">
    <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    <span>Name</span>
    </a>
    <a-menu slot="overlay">
      <a-menu-item>
       <a-icon type="setting" />
       <span>Account settings</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <a-icon type="logout" />
        <span>Logout</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '10px', background: 'transparent', minHeight:'85vh'  }">
        <router-view>
         
        </router-view>
      </a-layout-content>
      <a-layout-footer>
        <a-icon type="copyright" />
        <span> Copyright AfricaTrack {{year}}</span>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data(){
    return {
      collapsed: true,
      year:null,
      pages:[
      {icon:'home',text:'Home',to:'/'},
      {icon:'user',text:'Technicians',to:'/technicians'},
    //   {icon:'dollar',text:'Finances',to:'/finances'},
    //   {icon:'message',text:'Sms',to:'/campaign'}
      ]
    }
  },
  methods: {
    onSearch (value) {
      alert(value)
    },
    initialize(){
      var d = new Date()
     this.year= d.getFullYear();
    }
  },
  created(){
    this.initialize();
  }
}
</script>
<style>
#components-layout-demo-custom-trigger{
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo img {
 width: 60%
}

.right-align-bar{
  float: right;
 
  width: fit-content;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}
.right-align-bar .anticon {
  font-size: 1.4em;
}
.footer-right{
  float:right;

}
.footer-right .anticon {
  font-size: 1.4em;
  margin-right: 10px;
}.logo{
    height:fit-content;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
