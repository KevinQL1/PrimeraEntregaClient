import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serachTasks, setSearchTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/tasks");
      const data = await response.json();
      setTasks(data);
      setSearchTasks(data);
    } catch (error) {
      alert(
        "Sucedio un " +
          error +
          ". Por favor verifique los datos. codigo de error: " +
          error.code
      );
    }
    setLoading(false);
  };

  const search = (find) => {
    try {
      const response = serachTasks.filter((data) => {
        if (
          data.name.toString().toLowerCase().includes(find.toLowerCase()) ||
          data.id === parseInt(find)
        ) {
          return data;
        }
      });
      setTasks(response);
    } catch (error) {
      alert(
        "Sucedio un " +
          error +
          ". Por favor verifique los datos. codigo de error: " +
          error.code
      );
    }
  };

  const handleChange = (e) => {
    setTasks({ ...tasks, [e.target.name]: e.target.value });
    search(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/deleteTasks/${id}`, {
        method: "DELETE",
      });
      window.location.reload();
    } catch (error) {
      alert(
        "Sucedio un " +
          error +
          ". Por favor verifique los datos. codigo de error: " +
          error.code
      );
    }
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <div id="spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div id="contenedorTasksList">
          <Table striped bordered hover id="tasksList">
            <thead>
              <tr className="text-center">
                <th colSpan={10}>Listado de Tareas</th>
              </tr>
              <tr className="text-center">
                <th>Id</th>
                <th>Nombre</th>
                <th>Fecha de Creación</th>
                <th>Fecha de Inicio</th>
                <th>Fecha de Finalización</th>
                <th>Id Empleado</th>
                <th>Id Categoria</th>
                <th>Id Estado</th>
                <th>Editar Tarea</th>
                <th>Eliminar Tarea</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((data) => (
                <tr className="text-center" key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.taskcreationdate}</td>
                  <td>{data.taskstartdate}</td>
                  <td>{data.taskcompletiondate}</td>
                  <td>{data.idemployee}</td>
                  <td>{data.idcategory}</td>
                  <td>{data.idstate}</td>
                  <td>
                    <Button
                      onClick={() => navigate(`/putTasks/${data.id}`)}
                      variant="outline-primary"
                    >
                      Editar
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => handleDelete(data.id)}
                      variant="outline-danger"
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}

              <tr>
                <th colSpan={9}>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Buscar por ID o NOMBRE de la tarea"
                      className="me-2"
                      aria-label="Search"
                      onChange={handleChange}
                    />
                  </Form>
                </th>
                <th>
                  <Button className="w-100" variant="outline-primary">
                    Buscar
                  </Button>
                </th>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TaskList;
