<template>
  <div class="col-4 card-stuff">
    <div class="List card text-white bg-primary mb-3" style="max-width: 20rem; padding: 0">
      <!-- <div class="card"> -->
      <div class="card-header header-border">
        <h3>{{listData.title}}</h3>
      </div>
      <form @submit.prevent="addTask">
        <input type="text" placeholder="Create Task" v-model="newTask.title" required>
        <button type="submit">Create Task</button>
      </form>
      <div class="card-body">
        <div div v-for="task in tasks" :key="task._id">
          <ul>
            <!-- <div class="card-header">{{listData.title}} <i @click="deleteList(listData._id)" class="fas fa-trash-alt cursorHand"></i></div> -->
            <li>
              <h4 class="card-title">{{task.title}} <i @click="deleteTask(task._id)" class="fas fa-trash-alt cursorHand"></i>
                <select @change="moveTask(task)" v-model="newListId">
                  <option value="" disabled selected>Move to another list</option>
                  <option v-for="list in lists" :value="list._id">{{list.title}}</option>
                </select></h4>
            </li>
            <p v-for="comment in task.comments" class="card-text comment-text">- {{comment.description}} <i @click="deleteComment(task._id, comment._id)"
                class="fas fa-trash-alt cursorHand"></i></p>
            <form @submit.prevent="addComment(task._id)">
              <input type="text" placeholder="Add Comment" v-model="description" required>
              <button type="submit" class="btn btn-primary">Add Comment</button>
            </form>
          </ul>
        </div>
        <!-- </div> -->
      </div>
    </div>


    <!-- 
    List Title: {{listData.title}} <i @click="deleteList(listData._id)" class="fas fa-trash-alt cursorHand"></i>
    <form @submit.prevent="addTask">
      <input type="text" placeholder="title" v-model="newTask.title" required>
      <button type="submit">Create Task</button>
    </form> -->



    <!-- card -->

    <!-- card -->
    <!-- <div v-for="task in tasks" :key="task._id">
      Task Title: {{task.title}}

      <i @click="deleteTask(task._id)" class="fas fa-trash-alt cursorHand"></i>
        <form @submit.prevent="addComment(task._id)">
          <input type="text" placeholder="description" v-model="newComment.description" required>
          <button type="submit" class="btn btn-primary">Add Comment</button>
        </form>
      <div v-for="comment in task.comments">
        {{comment.description}}
        <i @click="deleteComment(task._id, comment._id)" class="fas fa-trash-alt cursorHand"></i>
      </div>
    </div> -->
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
        console.log(this.newTask)
        this.$store.dispatch("addTask", this.newTask);
        this.newTask = { title: "", boardId: this.boardId, listId: this.listData._id };
      },
      deleteTask(taskId) {
        this.$store.dispatch('deleteTask', taskId)
      },
      addComment(taskId) {
        debugger
        this.$store.dispatch("addComment", { taskId, data: { description: this.description } })
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

  .card-stuff {
    display: flex;
    justify-content: center;
  }

  ul {
    padding-left: 012px;
  }

  .comment-text {
    display: flex;
    justify-content: start;
    text-align: left;
  }
</style>