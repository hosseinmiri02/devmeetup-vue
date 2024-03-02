<template>
  <v-dialog max-width="340" persistent v-model="dialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" icon="mdi-pencil"></v-btn>
    </template>

    <v-card title="Edit Meetup">
      <v-card-text>
        <v-text-field
          v-model="editedTitle"
          label="Title"
          id="title"
          required></v-text-field>
        <v-textarea
          v-model="editedDescription"
          label="Description"
          id="description"
          class="mt-4"
          required></v-textarea>
      </v-card-text>

      <template v-slot:actions>
        <v-card-actions>
          <v-btn
            class="text-blue-darken-1"
            text="Close"
            @click="dialog = false"></v-btn>
          <v-btn
            class="text-blue-darken-1"
            text="Save"
            @click="onSaveChanges"></v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
      dialog: false,
    };
  },
  methods: {
    onSaveChanges() {
      if (
        this.editedTitle.trim() === "" ||
        this.editedDescription.trim() === ""
      ) {
        return;
      }
      this.dialog = false;
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription,
        date: this.meetup.date,
      });
    },
  },
};
</script>
