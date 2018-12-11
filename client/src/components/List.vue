<template>
  <div class="List">
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
              <td>{{list.title}}</td>
            </tr>
          </div>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'List',
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
        return this.$store.state.lists
      }
    },
    mounted() {
      this.$store.dispatch("getLists");
    },
    methods: {
      addList() {
        console.log(this.newList)
        this.$store.dispatch("addList", this.newList);
        this.newList = { title: "" };
      }
    }
  }
</script>

<style scoped>
  .row-length {
    width: 100vh
  }
</style>