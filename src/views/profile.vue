<template>
  <div class="profile">
      <a-row class="profile">
        <a-col :span="6">
            <div class="profile-card">
                 <a-avatar :size="96" icon="user" />
                 <Span class="title">Name: <span class="title-content">{{technician.firstname}} {{technician.lastname}}</span></Span>
                <Span class="title">Email: <span class="title-content">{{technician.email}}</span></Span>
            </div>

            <div class="date-pick">
                <h2>Choose task date range</h2>
                 <a-range-picker @change="onChange" />
            </div>
            
        </a-col>

        <!--this displays the list of tasks-->
        <a-col class="profile"  :offset="1"  :span="8">
                <div class="task-pane">
                     <div v-if="tasks.length">
                        <div class="task" v-for="item in tasks" :key="item.timestamp">
                            <span class="time">{{item.timestamp | changeDate}}</span>
                            <div class="task-body">
                                <p>Type of work: <span >{{item.type_of_work}}</span></p>
                                 <p>Vehicle number: <span >{{item.vehicle_number}}</span></p>
                            </div>
                            <div class="task-footer">
                                <a-button @click="showTask(item)"  type="primary">View</a-button>
                            </div>
                         </div>
                    </div> 
                    <div  v-else class="ant-empty ant-empty-normal">
                        <div class="ant-empty-image">
                            <img alt="No Data" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K">
                        </div>
                            <p class="ant-empty-description">No task complete</p>
                    </div>
            </div>
        </a-col>


        <!-- displays selected task details -->
        <a-col class="profile" :offset="1" :span="8">
            <div class="task-detail">
                <div v-if="currentTask" class="task-data">

                </div>
                <div  v-else class="ant-empty ant-empty-normal">
                    <div class="ant-empty-image">
                        <img alt="No Data" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K">
                        </div>
                    <p class="ant-empty-description">No task chosen</p>
                </div>
            </div>            

        </a-col>

      </a-row>

  </div>
</template>

<script>
import { db } from '../firebase.js'

export default {

data(){
    return {
        technician:'',
        tasks:[],
        currentTask:null,
        date:'',
        dateString:''
    }
},
filters:{
    changeDate: (value)=>{
        if(!value)return ''
        value = new Date(value)
        return value
    }
},
beforeMount(){
db.collection('users').doc(this.$route.params.id).get().then(snapshot => {
    this.technician = snapshot.data()
    
   this.fetchtasks(snapshot.data().id)
  })
},methods:{

    showTask(item){
        this.currentTask = item
    },
    fetchtasks(id){
    db.collection('tasks').where("name", '==' ,id).get().then( snapshot =>{
           if (snapshot.empty) {
              this.tasks= []
    }

    snapshot.docs.forEach(doc => {
     if (doc.exists) {
            this.tasks.push(doc.data())
     } else {
      this.tasks= []
     }
        })
    })
    },
    onChange(date, dateString) {
       this.date = date,
       this.dateString = dateString
      },
    },
   
}
</script>

<style>
.profile{
    height: 100%;
    overflow-y: scroll;
    
}
.profile-card{
    background-color: white;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    min-height: 300px;
    border-radius: 7px;
   /* / box-shadow: 10px 10px 23px -19px rgba(84,81,84,1); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px

}

.title{
    font-size: 1.2em;
    color: rgb(0, 174, 255);
    text-transform: capitalize;
}
.title-content{
    color: black;
}
.date-pick{
    text-align: center;
   
}
.date-pick h2{
     color: rgb(0, 174, 255);
}
.task-pane{
    width: 100%;
    background-color: white;
    height: 100%;
    border-radius: 7px;
    box-sizing: border-box;
    padding: 20px;

}
.task{
    background-color: whitesmoke;
    height: fit-content;
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    flex-direction: column;
}
.task-detail{
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    background-color: white;
    border-radius: 7px;
}
.task-footer{
    display: flex;
    justify-content: flex-end;
}
.time{
    font-size: 0.8em;
    font-style: italic;
    text-align: right;
    
}
.task-body{
    margin-top: 20px;
}
.task-body p{
 color: rgb(0, 174, 255);

}
.task-body span{
    color: black;
}
</style>