<template>
  <v-dialog max-width="350" persistent v-model="dialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps">Edit Meetup</v-btn>
    </template>
    <v-card title="Edit Meetup Date">
      <v-container>
        <v-row>
          <v-date-picker
            v-model="editableData"
            show-adjacent-months
            color="purple-darken-1"></v-date-picker>
        </v-row>
      </v-container>

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
      dialog: false,
      editableData: null,
    };
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);
      const newDay = new Date(this.editableData).getUTCDate();
      const newMonth = new Date(this.editableData).getUTCMonth();
      const newYear = new Date(this.editableData).getUTCFullYear();
      newDate.setUTCDate(newDay);
      newDate.getUTCMonth(newMonth);
      newDate.getUTCFullYear(newYear);
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate,
      });
    },
  },
  created() {
    this.editableData = new Date(this.meetup.date);
  },
};
</script>
