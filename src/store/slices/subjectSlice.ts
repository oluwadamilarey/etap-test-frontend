import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Topic {
  id: number;
  title: string;
  videoURL: string;
  description: string;
}

interface Subject {
  id: number;
  name: string;
  topics: Topic[];
}

interface SubjectState {
  subjects: Subject[];
}

const initialState: SubjectState = {
  subjects: [],
};

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    setSubjects(state, action: PayloadAction<Subject[]>) {
      state.subjects = action.payload;
    },
    addSubject: (state, action: PayloadAction<Subject>) => {
      state.subjects.push(action.payload);
    },
    deleteSubject: (state, action: PayloadAction<number>) => {
      state.subjects = state.subjects.filter(
        (subject) => subject.id !== action.payload
      );
    },
  },
});

export const { setSubjects, addSubject, deleteSubject } = subjectSlice.actions;
export default subjectSlice.reducer;
