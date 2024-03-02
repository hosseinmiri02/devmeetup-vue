<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-card
          class="bg-purple mb-2"
          v-for="meetup in meetups"
          :key="meetup.id">
          <v-container>
            <v-row>
              <v-col cols="5" sm="4" md="3">
                <v-img :src="meetup.imageUrl" height="130px" cover></v-img>
              </v-col>
              <v-col cols="7" sm="8" md="9">
                <v-card-item>
                  <v-card-title class="text-h5">{{
                    meetup.title
                  }}</v-card-title>
                  <v-card-subtitle>{{ meetup.date }}</v-card-subtitle>
                </v-card-item>
                <v-card-actions>
                  <v-btn
                    prepend-icon="mdi-arrow-right"
                    :to="'/meetups/' + meetup.id"
                    >View Meetup</v-btn
                  >
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    },
  },
};
</script>
