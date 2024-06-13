const { createApp } = Vue

createApp({
  data() {
    return {
        tasks: [],
    }
  },
  methods: {
    setCompleted(task){
        task.completed = !task.completed;
    }
  },
  mounted() {
    axios.get("./server/server.php").then(results => {
        console.log("Risultati: ", results);
        this.tasks = results.data;
    });
  }
}).mount('#app')