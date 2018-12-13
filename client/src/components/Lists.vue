<template>
  <div class="Lists">
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <button type="submit" class="btn btn-outline-primary">Add List</button>
    </form>
    <div>
      <table class="table table-hover">
        <tbody>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">List Title</th>
            <th scope="col">Number of tasks</th>
          </tr>
          <div v-for="list in Lists">
            <tr class="table-dark">
              <th scope="row row-length">Dark</th>
              <td>
                <router-link :to="{name: 'List', params:{'listId': list._id, 'boardId': boardId}}">{{list.title}}</router-link>
                <button @click="deleteList(list._id)" type="button" class="btn btn-outline-danger">Delete</button>
              </td>
            </tr>
          </div>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Lists',
    data() {
      return {
        newList: {
          title: "",
          boardId: this.boardId
        }
      };
    },
    props: ["boardId"],
    computed: {
      Lists() {
        return this.$store.state.lists[this.boardId] || []
      }
    },
    mounted() {
      this.$store.dispatch("getLists");
    },
    methods: {
      addList() {
        console.log(this.newList)
        this.$store.dispatch("addList", this.newList);
        this.newList = { title: "", boardId: this.boardId };
      },
      deleteList(listId) {
        this.$store.dispatch("deleteList", listId)
      },
      switchPage(listId) {
        this.$store.dispatch("switchPage", listId)
      }
    }
  }
</script>

<style scoped>
  .row-length {
    width: 100vh
  }
</style>