<template>
  <v-dialog max-width="340" persistent v-model="dialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" class="bg-purple-darken-1">{{
        userIsRegistered ? "Unregister" : "Register"
      }}</v-btn>
    </template>
    <v-card>
      <v-card-title v-if="userIsRegistered"
        >Unregister from Meetup?</v-card-title
      >
      <v-card-title v-else>Register for Meetup?</v-card-title>
      <v-card-text>You can always change your decision later on.</v-card-text>

      <template v-slot:actions>
        <v-card-actions>
          <v-btn
            class="text-red-darken-1"
            text="Cancel"
            @click="dialog = false"></v-btn>
          <v-btn
            class="text-green-darken-1"
            text="Confirm"
            @click="onAgree"></v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetupId"],
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex((meetupId) => {
          return meetupId === this.meetupId;
        }) >= 0
      );
    },
  },
  methods: {
    onAgree() {
      if (this.userIsRegistered) {
        this.$store.dispatch("unRegisterUserFromMeetup", this.meetupId);
      } else {
        this.$store.dispatch("registerUserForMeetup", this.meetupId);
      }
    },
  },
};
</script>
