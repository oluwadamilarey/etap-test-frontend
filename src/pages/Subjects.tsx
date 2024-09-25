import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { setSubjects } from "../store/slices/subjectSlice";
import { RootState } from "../store";
import { Link } from "react-router-dom";

export default function Subjects() {
  const subjects = useSelector((state: RootState) => state.subjects.subjects);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await axios.get("/subject");
      dispatch(setSubjects(response.data));
    };
    fetchSubjects();
  }, [dispatch]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Subjects</h1>
      <ul style={styles.subjectList}>
        {subjects.map((subject) => (
          <li key={subject.id} style={styles.subjectItem}>
            <h2 style={styles.subjectName}>{subject.name}</h2>
            <ul style={styles.topicList}>
              {subject.topics && subject.topics.length > 0 ? (
                subject.topics.map((topic) => (
                  <li key={topic.id} style={styles.topicItem}>
                    <span style={styles.topicTitle}>{topic.title}</span>
                    <span style={styles.topicVideo}>
                      (Video: {topic.videoURL})
                    </span>
                    <Link to={`/topics/${topic.id}/edit`} style={styles.link}>
                      Edit
                    </Link>
                  </li>
                ))
              ) : (
                <li style={styles.noTopics}>No topics available</li>
              )}
            </ul>
            <div style={styles.subjectActions}>
              <Link to={`/subjects/${subject.id}/edit`} style={styles.button}>
                Edit Subject
              </Link>
              <Link
                to={`/topics/create?subjectId=${subject.id}`}
                style={styles.button}
              >
                Create Topic
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/subjects/create" style={styles.createSubjectButton}>
        Create New Subject
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
  subjectList: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  subjectItem: {
    marginBottom: "2rem",
    borderBottom: "1px solid #eee",
    paddingBottom: "1rem",
  },
  subjectName: {
    fontSize: "1.5rem",
    color: "#2c3e50",
    marginBottom: "1rem",
  },
  topicList: {
    listStyle: "none",
    padding: "0",
    margin: "0 0 1rem 0",
  },
  topicItem: {
    marginBottom: "0.5rem",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap" as const,
  },
  topicTitle: {
    fontSize: "1rem",
    color: "#34495e",
    marginRight: "0.5rem",
  },
  topicVideo: {
    fontSize: "0.9rem",
    color: "#7f8c8d",
    marginRight: "0.5rem",
  },
  link: {
    fontSize: "0.9rem",
    color: "#3498db",
    textDecoration: "none",
    marginLeft: "auto",
  },
  noTopics: {
    fontSize: "1rem",
    color: "#7f8c8d",
  },
  subjectActions: {
    display: "flex",
    gap: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#3498db",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    textAlign: "center" as const,
    display: "inline-block",
    transition: "background-color 0.3s ease",
  },
  createSubjectButton: {
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
