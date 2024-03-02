<template>
  <v-app>
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.link">
        </v-list-item>
      </v-list>
      <v-list v-if="userIsAuthenticated" @click="onLogout">
        <v-list-item prepend-icon="mdi-exit-to-app" title="Logout">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="bg-purple-darken-1">
      <v-app-bar-nav-icon @click.stop="sideNav = !sideNav" class="d-sm-none">
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link
          to="/"
          class="cursor-pointer text-decoration-none text-white"
          >DevMeetup</router-link
        >
      </v-toolbar-title>
      <v-toolbar-items class="d-none d-sm-flex">
        <v-btn
          v-for="item in menuItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :to="item.link">
          {{ item.title }}
        </v-btn>
        <v-btn
          v-if="userIsAuthenticated"
          prepend-icon="mdi-exit-to-app"
          @click="onLogout">
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    sideNav: false,
  }),
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "mdi-face", title: "Sign up", link: "/signup" },
        { icon: "mdi-lock-open-outline", title: "Sign in", link: "/signin" },
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "mdi-account-supervisor",
            title: "View Meetups",
            link: "/meetups",
          },
          {
            icon: "mdi-map-marker",
            title: "Organize Meetup",
            link: "/meetup/new",
          },
          { icon: "mdi-account", title: "Profile", link: "/profile" },
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
