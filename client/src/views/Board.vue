<template>
  <div class="board container-fluid">
    <div class="row">
      <div class="col10"></div>
      <div class="col-2">
        <router-link :to="{name: 'boards'}">
          <button type="button" class="btn btn-outline-primary">Home</button></router-link>
        <button type="button" @click="logout" class="btn btn-outline-primary">Logout</button>
      </div>
    </div>
    <h1>{{board.title}}</h1>
    <form @submit.prevent="addList">
      <input type="text" placeholder="List Title" v-model="newList.title" required>
      <button type="submit" class="btn btn-outline-info">Add List</button>
    </form>
    <!-- <Lists :boardId="boardId"></Lists> -->
    <List v-for="list in lists" :listData="list"></List>
  </div>
</template>

<script>
  import List from "@/components/List.vue"
  export default {
    name: "board",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      } else {
        this.$store.dispatch("getLists", this.boardId);
        this.$store.dispatch('getTasks');
      }
    },
    props: ["boardId"],
    data() {
      return {
        newList: {
          title: "",
          boardId: this.boardId
        }
      }
    },
    computed: {
      lists() {
        return this.$store.state.lists[this.boardId]
        debugger
      },
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId)
      }
    },
    methods: {
      logout() {
        this.$store.dispatch("logout")
      },
      addList() {
        this.$store.dispatch('addList', this.newList)
      }
    },
    components: {
      List
    },
  };
</script>

<style>

</style>