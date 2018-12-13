<template>
  <div class="board">
    <h1>{{board.title}}</h1>
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
        this.$store.dispatch("getLists");
        this.$store.dispatch('getTasks');
      }
    },
    props: ["boardId"],
    data() {
      return {

      }
    },
    computed: {
      lists() {
        return this.$store.state.lists[this.boardId]
      },
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId)
      }
    },
    methods: {},
    components: {
      List
    },
  };
</script>

<style>

</style>