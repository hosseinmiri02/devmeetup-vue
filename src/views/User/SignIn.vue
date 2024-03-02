<template>
  <v-container>
    <v-row justify="center" v-if="error">
      <v-col cols="12" sm="6">
        <base-alert @dismissed="onDismissed" :text="error.message"></base-alert>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-text>
            <v-container>
              <v-form @submit.prevent="onSignin">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      type="email"
                      v-model="email"
                      :rules="[rules.required, rules.email]"
                      label="Email"
                      id="email"
                      required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required]"
                      :type="show1 ? 'text' : 'password'"
                      label="Password"
                      id="password"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn type="submit" :disabled="loading" :loading="loading"
                      >Sign in</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: "",
    show1: false,
    show2: true,
    password: "",

    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) => value.length <= 20 || "Max 20 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),
  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) this.$router.push("/");
    },
  },
  methods: {
    onSignin() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password,
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>
