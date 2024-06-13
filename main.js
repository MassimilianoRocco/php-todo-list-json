const { createApp } = Vue

createApp({
  data() {
    return {
        tasks: [],
        userNewTask:"",
    }
  },
  methods: {
    setCompleted(task){
        task.completed = !task.completed;
    },

    addNewTask(){
      let userTask = [
        {
          name: "",
          completed: false,
        }
      ]
      userTask.name = this.userNewTask;

      this.tasks.push(userTask);
      this.userNewTask = "";
    },

    cancelTask(index){
      this.tasks.splice(index,1);
    }


  },
  mounted() {
    axios.get("./server/server.php").then(results => {
        console.log("Risultati: ", results);
        this.tasks = results.data;
    });
  }
}).mount('#app')