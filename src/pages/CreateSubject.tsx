import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { addSubject } from "../store/slices/subjectSlice";

export default function CreateSubject() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/subject", { name });
      dispatch(addSubject(response.data));
      navigate("/subjects");
    } catch (err) {
      console.error(err);
      setError("Failed to create subject");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Create a New Subject</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Subject Name"
          required
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          Create Subject
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
  error: {
    color: "#e74c3c",
    marginBottom: "1rem",
    textAlign: "center" as "center",
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

