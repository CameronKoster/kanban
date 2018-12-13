<template>
  <div class="List">
    List Title: {{listData.title}} <i @click="deleteList(listData._id)" class="fas fa-trash-alt cursorHand"></i>
    <form @submit.prevent="addTask">
      <input type="text" placeholder="title" v-model="newTask.title" required>
      <button type="submit">Create Task</button>
    </form>
    <div v-for="task in tasks" :key="task._id">
      Task Title: {{task.title}}
      <select @change="moveTask(task)" v-model="newListId">
        <option v-for="list in lists" :value="list._id">{{list.title}}</option>
      </select>
      <i @click="deleteTask(task._id)" class="fas fa-trash-alt cursorHand"></i>
      <form @submit.prevent="addComment(task._id)">
        <input type="text" placeholder="description" v-model="newComment.description" required>
        <button type="submit" class="btn btn-outline-info">Add Comment</button>
      </form>
      <div v-for="comment in task.comments">
        {{comment.description}}
        <i @click="deleteComment(task._id, comment._id)" class="fas fa-trash-alt cursorHand"></i>
      </div>
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
        },
        newListId: ''
      };
    },
    computed: {
      tasks() {
        console.log(this.$store.state.tasks[this.listData._id])
        return this.$store.state.tasks[this.listData._id] || []
      },
      lists() {
        console.log(this.$store.state.lists[this.boardId])
        return this.$store.state.lists[this.boardId] || []
      }
    },
    props: ["listData"],
    methods: {
      addTask() {
        debugger
        console.log(this.newTask)
        this.$store.dispatch("addTask", this.newTask);
        this.newTask = { title: "", boardId: this.boardId, listId: this.listData._id };
      },
      deleteTask(taskId) {
        this.$store.dispatch('deleteTask', taskId)
      },
      addComment(taskId) {
        this.$store.dispatch("addComment", { taskId, data: this.newComment })
      },
      deleteComment(taskId, commentId) {
        this.$store.dispatch('deleteComment', { taskId, commentId })
      },
      deleteList(listId) {
        this.$store.dispatch('deleteList', listId)
      },
      moveTask(task) {
        this.$store.dispatch('moveTask', { newListId: this.newListId, task })
      }
    },
    components: {
      Lists
    }
  }
</script>

<style>
  .cursorHand {
    cursor: pointer;
  }
</style>