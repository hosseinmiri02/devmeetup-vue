<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="auto" class="text-center">
        <v-btn size="large" to="/meetups" class="bg-purple">
          Explore Meetups
        </v-btn>
      </v-col>

      <v-col cols="12" sm="auto" class="text-center">
        <v-btn size="large" to="/meetup/new" class="bg-purple"
          >Organize Meetup</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-if="!loading">
      <v-col cols="12">
        <v-carousel class="cursor-pointer">
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imageUrl"
            :key="meetup.id"
            @click="onLoadMeetup(meetup.id)"
            cover>
            <div class="d-flex fill-height justify-center align-end text-white">
              <div class="title pa-4 text-h5">{{ meetup.title }}</div>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row justify="center">
      <p>Join our awesome meetups!</p>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push("/meetups/" + id);
    },
  },
};
</script>

<style scoped>
.title {
  margin-bottom: 50px;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
