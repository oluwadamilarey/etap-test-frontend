import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import { setSubjects } from "../store/slices/subjectSlice";

export default function EditSubject() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubject = async () => {
      const response = await axios.get(`/subject/${id}`);
      setName(response.data.name);
    };
    fetchSubject();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`/subject/${id}`, { name }); // Updated endpoint to match fetchSubject
      const response = await axios.get("/subject");
      dispatch(setSubjects(response.data));
      navigate("/subjects");
    } catch (err) {
      setError("Failed to update subject");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Edit Subject</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          Update Subject
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
  error: {
    color: "#e74c3c",
    marginBottom: "1rem",
    textAlign: "center" as const,
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
