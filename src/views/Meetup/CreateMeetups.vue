<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <h4 class="text-h4">Create a new Meetup</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form @submit.prevent="onCreateMeetup">
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-text-field
                v-model="title"
                :rules="rules"
                label="Title"
                id="title"
                required></v-text-field>
              <v-text-field
                v-model="location"
                :rules="rules"
                label="Location"
                id="location"
                required></v-text-field>
              <v-text-field
                v-model="imageUrl"
                :rules="rules"
                label="Image URL"
                id="image-url"
                required></v-text-field>
              <v-img :src="imageUrl" height="300"></v-img>
              <v-textarea
                v-model="description"
                :rules="rules"
                label="Description"
                id="description"
                class="mt-4"
                required></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <h4 class="text-h4">Choose a Date & Time</h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-date-picker
                v-model="date"
                show-adjacent-months
                color="purple-darken-1"></v-date-picker>
              <p>{{ date }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-btn
                type="submit"
                class="bg-purple-darken-1"
                :disabled="!formIsValid"
                >Create Meetup</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: "",
    location: "",
    imageUrl: "",
    description: "",
    date: new Date(),
    image: null,
    rules: [
      (value) => {
        if (value) return true;

        return "The input most not be empty.";
      },
    ],
  }),
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
      );
    },
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }

      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: new Date(),
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    },
  },
};
</script>
