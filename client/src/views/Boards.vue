<template>
  <div class="boards bg-board container-fluid">
    <div class="row" style="padding-top: 30px; margin-bottom: 10vh;">
      <div class="col-11">
        <h1>Welcome to your Journals</h1>
      </div>
      <div class="col-1">
        <button type="button" @click="logout" class="btn btn-outline-primary">Logout</button></div>
    </div>
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required>
      <input type="text" placeholder="description" v-model="newBoard.description">
      <button type="submit">Create Journal</button>
    </form>
    <div class="row journal-bg">
      <ol>
        <div v-for="board in boards" :key="board._id" class="journals col-12">
          <li class="journals-2">
            <div class="linkNBtn">
              <router-link :to="{name: 'board', params: {boardId: board._id}}" class="journal-text">
                <h3>{{board.title}}</h3>
              </router-link>
              <i @click="deleteBoard(board._id)" class="fas fa-trash-alt cursorHand" style="margin-top: 10px;"></i>
            </div>
            <p>{{board.description}}</p>
          </li>
        </div>
      </ol>
    </div>
  </div>
</template>

<script>
  export default {
    name: "boards",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      },
      logout() {
        this.$store.dispatch("logout")
      }
    }
  };
</script>

<style>
  .journals {
    border: 1px solid rgba(0, 0, 0, 0.329);
    margin-bottom: 3px;
    background-color: white;

  }

  .journals-2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .linkNBtn {
    display: flex;
    flex-direction: row;
  }

  .centered {
    display: flex;
    align-items: center;
  }

  .journal-text {
    color: purple;
  }

  .journal-bg {}
</style>