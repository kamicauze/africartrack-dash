<template>
<!-- displays list of technicians -->
  <div class="technicians">
     <a-row>
       <a-col class="table-col"  :span="18" :offset="3">
           <a-table bordered :dataSource="technicians" :columns="columns" rowKey='id'>
                    <div
      slot="filterDropdown"
      slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
      style="padding: 8px"
    >
      <a-input
        v-ant-ref="c => searchInput = c"
        :placeholder="`Search ${column.dataIndex}`"
        :value="selectedKeys[0]"
        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="() => handleSearch(selectedKeys, confirm)"
        style="width: 188px; margin-bottom: 8px; display: block;"
      />
      <a-button
        type="primary"
        @click="() => handleSearch(selectedKeys, confirm)"
        icon="search"
        size="small"
        style="width: 90px; margin-right: 8px"
        >Search</a-button
      >
      <a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px"
        >Reset</a-button
      >
    </div>
    <a-icon
      slot="filterIcon"
      slot-scope="filtered"
      type="search"
      :style="{ color: filtered ? '#108ee9' : undefined }"
    />
    <!-- <template slot="customRender" slot-scope="text">
      <span v-if="searchText">
        <template
          v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            :key="i"
            class="highlight"
            >{{fragment}}</mark
          >
          <template v-else
            >{{fragment}}</template
          >
        </template>
      </span>
      <template v-else
        >{{text}}</template
      >
    </template> -->
       
                     <template slot="action" slot-scope="record">
                         <a-button @click="view(record.id)" type="primary">View</a-button>
                    
                  </template>
           </a-table>
           
       </a-col>
     </a-row>
  </div>
  
</template>

<script>
import { db } from '../firebase.js'

export default {
data(){
   return {
       technicians: [],
       key:'',
        columns: [
            {
            title: 'Firstname',
            dataIndex: 'firstname',
            key: 'firstname',
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'customRender',
            },
            onFilter: (value, record) => record.firstname.toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
              if (visible) {
                setTimeout(() => {
                  this.searchInput.focus();
                }, 0);
              }
            },
            },
            {
            title: 'Lastname',
            dataIndex: 'lastname',
            key: 'lastname',
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'customRender',
            },
            onFilter: (value, record) => record.lastname.toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
              if (visible) {
                setTimeout(() => {
                  this.searchInput.focus();
                });
              }
            },
            },
            {
            title: 'Email',
            dataIndex: 'email'
            },
            {
            title: 'View profile',
            key: 'action',
            scopedSlots: { customRender: 'action' },
        },

        ]
   } 
},
 firestore: {
     technicians:db.collection('users')
},
methods:{
// search table
     handleSearch(selectedKeys, confirm) {
        confirm();
        this.searchText = selectedKeys[0];
      },
// reset search
      handleReset(clearFilters) {
        clearFilters();
        this.searchText = '';
      },
//go to technician profile 
      view(id){
       this.key = id
       this.$router.push({path: `/technician/${id}` })
      }


}
}
</script>

<style>
.technicians{
      height: 100%;

}
.table-col{
  background-color: #e2edfc75;
}
</style>