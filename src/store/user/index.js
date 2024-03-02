import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, push, get, child, remove } from "firebase/database";

export default {
  state: {
    user: null,
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    registerUserForMeetup(state, payload) {
      const id = payload.id;
      if (
        state.user.registeredMeetups.findIndex((meetup) => meetup.id === id) >=
        0
      ) {
        return;
      }
      state.user.registeredMeetups.push(id);
      state.user.fbKeys[id] = payload.fbKey;
    },

    unRegisterUserFromMeetup(state, payload) {
      const registeredMeetups = state.user.registeredMeetups;
      registeredMeetups.splice(
        registeredMeetups.findIndex((meetup) => meetup.id === payload),
        1
      );
      Reflect.deleteProperty(state.user.fbKeys, payload);
    },

    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    registerUserForMeetup({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      const db = getDatabase();
      const dbRef = ref(db, "/users/" + user.id);
      const childRef = child(dbRef, "/registrations/");
      push(childRef, payload)
        .then((data) => {
          commit("setLoading", false);
          commit("registerUserForMeetup", {
            id: payload,
            fbKey: data.key,
          });
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },

    unRegisterUserFromMeetup({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      if (!user.fbKeys) {
        return;
      }
      const fbKey = user.fbKeys[payload];
      const db = getDatabase();
      const dbRef = ref(db, "/users/" + user.id + "/registrations/");
      const childRef = child(dbRef, fbKey);
      remove(childRef)
        .then(() => {
          commit("setLoading", false);
          commit("unRegisterUserFromMeetup", payload);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },

    signUserUp(context, payload) {
      context.commit("setLoading", true);
      context.commit("clearError");
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then((user) => {
          context.commit("setLoading", false);
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {},
          };
          context.commit("setUser", newUser);
        })
        .catch((error) => {
          context.commit("setLoading", false);
          context.commit("setError", error);
          console.log(error);
        });
    },

    signUserIn(context, payload) {
      context.commit("setLoading", true);
      context.commit("clearError");
      const auth = getAuth();
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((user) => {
          context.commit("setLoading", false);
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {},
          };
          context.commit("setUser", newUser);
        })
        .catch((error) => {
          context.commit("setLoading", false);
          context.commit("setError", error);
          console.log(error);
        });
    },

    autoSignIn(context, payload) {
      context.commit("setUser", {
        id: payload.uid,
        registeredMeetups: [],
        fbKeys: {},
      });
    },

    fetchUserData({ commit, getters }) {
      commit("setLoading", true);
      const db = getDatabase();
      const dbRef = ref(db, "/users/" + getters.user.id + "/registrations/");
      get(dbRef, "value")
        .then((data) => {
          const dataPairs = data.val();
          let registeredMeetups = [];
          let swappedPairs = {};
          for (let key in dataPairs) {
            registeredMeetups.push(dataPairs[key]);
            swappedPairs[dataPairs[key]] = key;
          }
          const updatedUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            fbKeys: swappedPairs,
          };
          commit("setLoading", false);
          commit("setUser", updatedUser);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },

    logout(context) {
      const auth = getAuth();
      signOut(auth);
      context.commit("setUser", null);
    },
  },
};
