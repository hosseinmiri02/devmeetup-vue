import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import BaseAlert from "./components/Shared/BaseAlert.vue";
import EditMeetupDetailsDialog from "./components/Meetup/Edit/EditMeetupDetailsDialog.vue";
import EditMeetupDateDialog from "./components/Meetup/Edit/EditMeetupDateDialog.vue";
import RegisterDialog from "./components/Meetup/Registration/RegisterDialog.vue";

loadFonts();

const app = createApp(App).use(router).use(store).use(vuetify);

const firebaseConfig = {
  apiKey: "AIzaSyDFjRScpainBeUJ-5uTJbmlAjLFQfe93nc",
  authDomain: "devmeetup-3caa6.firebaseapp.com",
  projectId: "devmeetup-3caa6",
  storageBucket: "gs://devmeetup-3caa6.appspot.com",
  messagingSenderId: "966488150877",
  appId: "1:966488150877:web:1e0baf1b8c27dc71e14eb4",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch("autoSignIn", user);
    store.dispatch("fetchUserData");
  }
});
store.dispatch("loadMeetups");
app.component("base-alert", BaseAlert);
app.component("edit-meetup-details-dialog", EditMeetupDetailsDialog);
app.component("edit-meetup-date-dialog", EditMeetupDateDialog);
app.component("meetup-register-dialog", RegisterDialog);

app.mount("#app");
