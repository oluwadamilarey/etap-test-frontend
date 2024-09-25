import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { addTopic } from "../store/slices/topicSlice";
import { useNavigate, useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function CreateTopic() {
  const [title, setTitle] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [description, setDescription] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await axios.get("/subject");
      setSubjects(response.data);
      const subjectIdFromQuery = query.get("subjectId");
      if (subjectIdFromQuery) {
        setSubjectId(Number(subjectIdFromQuery)); // Set subjectId from query param
      }
    };
    fetchSubjects();
  }, [query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTopic = { title, videoURL, description, subjectId };
    const response = await axios.post(`/topic/${subjectId}`, newTopic);
    dispatch(addTopic(response.data));
    navigate("/topics");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Create Topic</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Title"
          style={styles.input}
        />
        <input
          type="text"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
          required
          placeholder="Video URL"
          style={styles.input}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Description"
          style={{ ...styles.input, ...styles.textarea }}
        />
        <select
          value={subjectId || ""}
          onChange={(e) => setSubjectId(Number(e.target.value))}
          required
          style={styles.select}
        >
          <option value="" disabled>
            Select a subject
          </option>
          {subjects.map((subject: any) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
        <button type="submit" style={styles.button}>
          Create Topic
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#fff",
    padding: "0 1rem",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "300",
    marginBottom: "2rem",
    textAlign: "center" as "center",
    color: "#333",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    marginBottom: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    outline: "none",
  },
  textarea: {
    minHeight: "100px",
    resize: "vertical" as "vertical",
  },
  select: {
    width: "100%",
    padding: "0.75rem 1rem",
    marginBottom: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    backgroundColor: "#fff",
    appearance: "none" as "none",
  },
  button: {
    width: "100%",
    padding: "0.75rem 1rem",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#2980b9",
    },
  },
};
