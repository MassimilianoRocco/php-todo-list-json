const { createApp } = Vue

createApp({
  data() {
    return {
        tasks: [],
        userNewTask:"",
        modifyInputVisibility: false,
        modifyTaskText:"",
        indexToModify: 0,

        apiUrl: "./server/server.php",
        cancelUrl:"./server/cancel.php",
        modifyUrl:"./server/modify.php",
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
    showModifyInput(){
      setTimeout(() => {
        this.modifyInputVisibility = !this.modifyInputVisibility;
      }, 50);
    },
    modifyInputOFF(){
      this.modifyInputVisibility = false;
    },

    //Metodo per settare il data indexToModify con l'indice effettivo della task, che verrà ripreso dalla funzione per modificare la task.
    setIndexToModify(index){
      this.indexToModify = index;
    },


    // ADD NEW TASK FUNCTION
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

    // REMOVE TASK FUNCTION
    cancelTask(indexToCancel){
      const index = { id: indexToCancel};
      axios.post(this.apiUrl, index, this.postRequestConfig).then(results => {
        console.log("Risultati: ", results.data);
        this.tasks = results.data;
      });

      // this.getTaskList();
    },

    // MODIFY TASK FUNCTION 
    modifyTask(){
      const index = { 
        id_toModify: this.indexToModify,
        newTaskName: this.modifyTaskText
      };
      axios.post(this.apiUrl, index, this.postRequestConfig).then(results => {
        console.log("Risultati: ", results.data);
        this.tasks = results.data;
      });

      this.modifyTaskText = "";
      this.modifyInputVisibility = false;

      // this.getTaskList();
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