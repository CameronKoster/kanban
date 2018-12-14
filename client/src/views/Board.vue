<template>
  <div class="board container-fluid bg-board">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-9"></div>
      <div class="col-6 menu-buttons">
        <router-link :to="{name: 'boards'}">
          <button type="button" class="btn btn-primary menu-buttons">Home</button></router-link>
        <button type="button" @click="logout" class="btn btn-primary menu-buttons">Logout</button>
      </div>
      <div class="col-6 list-form">
        <form @submit.prevent="addList">
          <input type="text" placeholder="List Title" v-model="newList.title" required>
          <button type="submit" class="btn btn-primary">Add List</button>
        </form>
      </div>
    </div>
    <div class="row board-title">
      <div class="col-12">
        <h1>{{board.title}}</h1>
      </div>
    </div>
    <!-- <Lists :boardId="boardId"></Lists> -->
    <div class="row">
      <List v-for="list in lists " :listData="list"></List>
    </div>
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
        return this.$store.state.boards.find(b => b._id == this.boardId) || { title: 'loading' }
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
  .bg-board {
    background-image: url('C:/Users/blasp/source/codeworks/kanban-checkpoint/kanban-chekpoint/client/src/assets/334600edce0d44ad506bd34739a8445d.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    height: fit-content;
    min-height: 100vh;
  }

  .menu-buttons {
    /* margin-left: 5px; */
    display: flex;
    margin-top: 5px;
    justify-content: start;
  }

  .list-form {
    display: flex;
    margin-top: 5px;
    justify-content: flex-end;
  }
</style>