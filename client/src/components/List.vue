<template>
  <div class="List">
    {{listData.title}}
    <button type="button" @click="logout" class="btn btn-outline-primary">Logout</button>
    <form @submit.prevent="addTask">
      <input type="text" placeholder="title" v-model="newTask.title" required>
      <button type="submit">Create Task</button>
    </form>
    <div v-for="task in tasks" :key="task._id">
      {{task.title}}
      <button @click="deleteTask(task._id)">DELETE TASK</button>
      <form @submit.prevent="addComment(task._id)">
        <input type="text" placeholder="description" v-model="newComment.description" required>
        <button type="submit" class="btn btn-outline-info">Add Comment</button>
      </form>
      <div v-if="task.comments">{{task.comments}}</div>
    </div>
  </div>
</template>

<script>
  import Lists from "@/components/Lists.vue"
  export default {
    name: "List",
    data() {
      return {
        boardId: this.$route.params.boardId,
        newTask: {
          title: "",
          boardId: this.$route.params.boardId,
          listId: this.listData._id
        },
        newComment: {
          description: ''
        }
      };
    },
    computed: {
      tasks() {
        console.log(this.$store.state.tasks[this.listData._id])
        return this.$store.state.tasks[this.listData._id] || []
      }
    },
    props: ["listData"],
    methods: {
      addTask() {
        // debugger
        console.log(this.newTask)
        this.$store.dispatch("addTask", this.newTask);
        this.newTask = { title: "", boardId: this.boardId, listId: this.listId };
      },
      deleteTask(taskId) {
        this.$store.dispatch('deleteTask', taskId)
      },
      logout() {
        this.$store.dispatch("logout")
      },
      addComment(taskId) {
        this.$store.dispatch("addComment", { taskId, data: this.newComment })
      }
    },
    components: {
      Lists
    }
  }
</script>

<style>

</style>