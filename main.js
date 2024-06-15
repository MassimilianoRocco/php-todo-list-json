const { createApp } = Vue

createApp({
  data() {
    return {
        tasks: [],
        userNewTask:"",

        apiUrl: "./server/server.php",
        cancelUrl:"./server/cancel.php",
        postRequestConfig: {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        },
    }
  },
  methods: {
    setCompleted(task){
        task.completed = !task.completed;
    },

    addNewTask(){
      const userTask = 
        {
          name: this.userNewTask,
          completed: false
        }

      axios.post(this.apiUrl, userTask, this.postRequestConfig).then(results => {
        console.log("Risultati: ", results.data);
        this.tasks = results.data;
      });



      this.userNewTask = "";
    },

    cancelTask(indexToCancel){
      const index = { id: indexToCancel};
      axios.post(this.apiUrl, index, this.postRequestConfig).then(results => {
        console.log("Risultati: ", results.data);
        // this.tasks = results.data;
      });

      this.getTaskList();
    },



    getTaskList(){
      axios.get("./server/server.php").then(results => {
        console.log("Risultati: ", results);
        this.tasks = results.data;
      });
    },


  },
  mounted() {
    this.getTaskList();
  }
}).mount('#app')