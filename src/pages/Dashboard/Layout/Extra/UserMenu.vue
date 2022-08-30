<template>
  <div class="user">
    <div class="photo">
      <img :src="avatar" :alt="userName" />
    </div>

    <div class="user-info">
      <a data-toggle="collapse" :aria-expanded="!isClosed" href="#/pages/user">
        <span>
          {{ userName }}
        </span>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isClosed: true,
      userName: localStorage.getItem("BF_name"),
      avatar: process.env.VUE_APP_BF_USER_AVATAR_DEFAULT
    };
  },
  methods: {
    clicked: function(e) {
      e.preventDefault();
    },
    toggleMenu: function() {
      this.isClosed = !this.isClosed;
    }
  }
};
</script>
<style>
.collapsed {
  transition: opacity 1s;
}
</style>
