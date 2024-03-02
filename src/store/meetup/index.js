import { getDatabase, ref, push, get, child, update } from "firebase/database";

export default {
  state: {
    loadedMeetups: [
      {
        imageUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        id: "sdgarg56",
        title: "Meetup in New York",
        date: "2024-07-17",
        location: "New York",
        description: "New York, New York!",
      },
      {
        imageUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
        id: "sdgfhfarg56",
        title: "Meetup in Paris",
        date: "2024-07-19",
        location: "Paris",
        description: "It's Paris!",
      },
    ],
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },

    featuredMeetups(_, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },

    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId;
        });
      };
    },
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },

    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },

    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find((meetup) => {
        return meetup.id === payload.id;
      });
      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
    },
  },
  actions: {
    loadMeetups(context) {
      context.commit("setLoading", true);
      const db = getDatabase();
      const dbRef = ref(db, "meetups");
      get(dbRef, "value")
        .then((data) => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId,
            });
          }
          context.commit("setLoadedMeetups", meetups);
          context.commit("setLoading", false);
        })
        .catch((error) => {
          console.log(error);
          context.commit("setLoading", false);
        });
    },

    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id,
      };
      const db = getDatabase();
      const dbRef = ref(db, "meetups");
      push(dbRef, meetup)
        .then((data) => {
          const key = data.key;
          commit("createMeetup", {
            ...meetup,
            id: key,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateMeetupData(context, payload) {
      context.commit("setLoading", true);
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      const db = getDatabase();
      const dbRef = ref(db, "meetups");
      const childRef = child(dbRef, payload.id);
      const updateDb = update(childRef, updateObj);
      updateDb
        .then(() => {
          context.commit("setLoading", false);
          context.commit("updateMeetup", payload);
        })
        .catch((error) => {
          console.log(error);
          context.commit("setLoading", false);
        });
    },
  },
};
