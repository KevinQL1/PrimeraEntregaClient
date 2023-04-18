import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import EmployeeForm from "./Components/Employees/EmployeeForm";
import EmployeeList from "./Components/Employees/EmployeeList";
import TaskForm from "./Components/Tasks/TaskForm";
import TaskList from "./Components/Tasks/TaskList";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/postEmployees" element={<EmployeeForm />} />
        <Route path="/putEmployees/:id" element={<EmployeeForm />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/postTasks" element={<TaskForm />} />
        <Route path="/putTasks/:id" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}
