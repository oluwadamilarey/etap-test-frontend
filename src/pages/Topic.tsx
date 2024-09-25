import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { setTopics, deleteTopic } from "../store/slices/topicSlice";
import { RootState } from "../store";
import { Link } from "react-router-dom";

export default function Topics() {
  const topics = useSelector((state: RootState) => state.topics.topics);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await axios.get("/topic");
      dispatch(setTopics(response.data));
    };
    fetchTopics();
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this topic?")) {
      await axios.delete(`/topic/${id}`);
      dispatch(deleteTopic(id));
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Topics</h1>
      <ul style={styles.topicList}>
        {topics.map((topic) => (
          <li key={topic.id} style={styles.topicItem}>
            <span style={styles.topicTitle}>{topic.title}</span>
            <div style={styles.actions}>
              <Link to={`/topics/${topic.id}/edit`} style={styles.link}>
                Edit
              </Link>
              <button
                onClick={() => handleDelete(topic.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/topics/create" style={styles.createButton}>
        Create New Topic
      </Link>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem 1rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "300",
    textAlign: "center" as const,
    color: "#333",
    marginBottom: "2rem",
  },
  topicList: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  topicItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
    borderBottom: "1px solid #eee",
  },
  topicTitle: {
    fontSize: "1.2rem",
    color: "#2c3e50",
  },
  actions: {
    display: "flex",
    gap: "1rem",
  },
  link: {
    color: "#3498db",
    textDecoration: "none",
    fontSize: "1rem",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "1rem",
  },
  createButton: {
    display: "block",
    width: "100%",
    maxWidth: "200px",
    margin: "2rem auto 0",
    padding: "0.75rem 1rem",
    backgroundColor: "#2ecc71",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    textAlign: "center" as const,
    transition: "background-color 0.3s ease",
  },
};
