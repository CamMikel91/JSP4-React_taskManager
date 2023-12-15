import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import tasks from "./fakeTaskService-1";

function App() {
  return (
    <div className="App">
      <h1 className="text-center">Task Manager</h1>
      <ul className="list-unstyled">
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>Task ID</strong>: {task._id} <br />
            <strong>Title:</strong> {task.title} <br />
            <strong>Task:</strong> {task.task} <br />
            <strong>Category:</strong> {task.category} <br />
            <strong>Severity:</strong> {task.severity.name} <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
