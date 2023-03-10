import { createSlice} from "@reduxjs/toolkit";
const initialState = [
  {
    id: "1",
    pets: "snappy",
    title: "de-worm",
    date: "2023-01-24",
    start_time: "13:00",
    description: "revolution plus deworm is the best",
  },
  {
    id: "2",
    pets: "eggy",
    title: "annunal health exam",
    date: "2023-01-24",
    start_time: "10:00",
    description: "Fremont Animal Hospital",
  },
  {
    id: "3",
    pets: "eggy",
    title: "grooming",
    date: "2023-01-28",
    start_time: "14:00",
    description: "University Way Petco",
  },
  {
    id: "4",
    pets: "eggy",
    title: "Orijen Pickup",
    date: "2023-02-01",
    start_time: "15:00",
    description: "Shoreline PetSmart",
  },
  {
    id: "5",
    pets: "snappy",
    title: "Annual Wellness Check",
    date: "2023-03-15",
    start_time: "18:00",
    description: "Fremont Animal Hospital, brings a little poop",
  },
];

const petEventsSlice = createSlice({
  name: "petsEvents",
  initialState,
  reducers: {
    petEventAdded: {
      reducer(state, action) {
        // console.log("im petenentadded reducer");
        state.push(action.payload);
      },
      //prepare callback function to generate random value
      prepare(id, pets, title, date, start_time, description) {
        return {
          payload: {
            id,
            pets,
            title,
            date,
            start_time,
            description,
          },
        };
      },
    },
    petEventUpdated(state, action) {
      const { id, pets, title, date, start_time, description } = action.payload;
      const updatedEvent = state.find((event) => event.id === id);
      if (updatedEvent) {
        updatedEvent.pets = pets;
        updatedEvent.title = title;
        updatedEvent.date = date;
        updatedEvent.start_time = start_time;
        updatedEvent.description = description;
      }
    },
    petEventNameUpdated(state, action) {
      const updatedName = action.payload.updatedName;
      const oldName = action.payload.originalName;
      let updatedEvent = state.filter((event) => event.pets === oldName);
      for (let i = 0; i < updatedEvent.length; i++) {
        updatedEvent[i].pets = updatedName;
      }
    },
    petEventDeletedById(state, action) {
      const eventId = action.payload.eventId;
      // state = state.filter((event)=> event.id !== eventId)
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === eventId) {
          state.splice(i, 1);
          break;
        }
      }
    },
    petEventDeletedByPet(state, action) {
      const petname = action.payload.petsName;
      for (let i = 0; i < state.length; i++) {
        if (state[i].pets === petname) {
          state.splice(i, 1);
          i--;
        }
      }
    },
  },
});

export const {
  petEventAdded,
  petEventUpdated,
  petEventNameUpdated,
  petEventDeletedById,
  petEventDeletedByPet,
} = petEventsSlice.actions;
export default petEventsSlice.reducer;
