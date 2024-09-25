import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Subjects from "./pages/Subjects";
import CreateSubject from "./pages/CreateSubject";
import EditSubject from "./pages/EditSubject";
import CreateTopic from "./pages/CreateTopic";
import EditTopic from "./pages/EditTopic";
import Topics from "./pages/Topic";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Subjects />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/create" element={<CreateTopic />} />
        <Route path="/topics/:id/edit" element={<EditTopic />} />
        <Route path="/subjects/create" element={<CreateSubject />} />
        <Route path="/subjects/:id/edit" element={<EditSubject />} />
      </Routes>
    </Router>
  );
}

export default App;
