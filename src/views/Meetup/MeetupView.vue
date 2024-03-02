<template>
  <v-container>
    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
          :width="7"
          :size="70"></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h4 text-purple-darken-1">
            {{ meetup.title }}
            <template v-if="userIsCreator">
              <edit-meetup-details-dialog
                :meetup="meetup"></edit-meetup-details-dialog>
            </template>
          </v-card-title>

          <v-img :src="meetup.imageUrl" max-height="500px" cover></v-img>
          <v-card-text>
            <div class="text-purple">
              {{ meetup.date }} - {{ meetup.location }}
            </div>
            <div class="my-2">
              <edit-meetup-date-dialog
                :meetup="meetup"
                v-if="userIsCreator"></edit-meetup-date-dialog>
            </div>
            <div>
              {{ meetup.description }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <meetup-register-dialog
              :meetupId="meetup.id"
              v-if="
                userIsAuthenticated && !userIsCreator
              "></meetup-register-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>
