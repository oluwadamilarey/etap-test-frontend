import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Topic {
  id: number;
  title: string;
  videoURL: string;
  description: string;
}

interface TopicState {
  topics: Topic[];
}

const initialState: TopicState = {
  topics: [],
};

const topicSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    setTopics(state, action: PayloadAction<Topic[]>) {
      state.topics = action.payload;
    },
    addTopic(state, action: PayloadAction<Topic>) {
      state.topics.push(action.payload);
    },
    updateTopic(state, action: PayloadAction<Topic>) {
      const index = state.topics.findIndex(
        (topic) => topic.id === action.payload.id
      );
      if (index !== -1) {
        state.topics[index] = action.payload;
      }
    },
    deleteTopic(state, action: PayloadAction<number>) {
      state.topics = state.topics.filter(
        (topic) => topic.id !== action.payload
      );
    },
  },
});

export const { setTopics, addTopic, updateTopic, deleteTopic } =
  topicSlice.actions;

export default topicSlice.reducer;
