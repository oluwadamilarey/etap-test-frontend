import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { updateTopic } from "../store/slices/topicSlice";

export default function EditTopic() {
  const [title, setTitle] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopic = async () => {
      const response = await axios.get(`/topic/${id}`);
      setTitle(response.data.title);
      setVideoURL(response.data.videoURL); // Updated to match property name
      setDescription(response.data.description);
    };
    fetchTopic();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTopic = { id: Number(id), title, videoURL, description };
    await axios.patch(`/topic/${id}`, updatedTopic);
    dispatch(updateTopic(updatedTopic));
    navigate("/topics");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Edit Topic</h1>
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
        <button type="submit" style={styles.button}>
          Update Topic
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
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
    textAlign: "center" as const,
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
    resize: "vertical" as const,
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
  },
};
