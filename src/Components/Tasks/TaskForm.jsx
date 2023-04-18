import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Navbar from "../Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";

const TaskForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [editTasks, setEditTasks] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [state, setState] = useState([]);
  const [category, setCategory] = useState([]);
  const [tasks, setTasks] = useState({
    name: "",
    taskcreationdate: "",
    taskstartdate: "",
    taskcompletiondate: "",
    idemployee: "",
    idcategory: "",
    idstate: "",
  });

  useEffect(() => {
    if (params.id) {
      loadTasksById(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    loadEmployee();
    loadState();
    loadCategory();
  }, []);

  const loadTasksById = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/tasks/${id}`);
      const data = await response.json();
      setTasks({
        name: data.map((user) => user.name),
        taskcreationdate: data.map((user) => user.taskcreationdate),
        taskstartdate: data.map((user) => user.taskstartdate),
        taskcompletiondate: data.map((user) => user.taskcompletiondate),
        idemployee: data.map((user) => user.idemployee),
        idcategory: data.map((user) => user.idcategory),
        idstate: data.map((user) => user.idstate),
      });
      setEditTasks(true);
    } catch (error) {
      alert(
        "Sucedio un " +
          error +
          ". Por favor verifique los datos. codigo de error: " +
          error.code
      );
    }
  };

  const loadEmployee = async () => {
    try {
      const response = await fetch("http://localhost:4000/employees");
      const data = await response.json();
      setEmployee(data);
    } catch (error) {
      alert(
        "Sucedio un " +
          error +
          ". Por favor verifique los datos. codigo de error: " +
          error.code
      );
    }
  };

  const loadState = async () => {
    try {
      const response = await fetch("http://localhost:4000/states");
      const data = await response.json();
      setState(data);
    } catch (error) {
      alert(
        "Sucedio un " +
          error +
          ". Por favor verifique los datos. codigo de error: " +
          error.code
      );
    }
  };

  const loadCategory = async () => {
    try {
      const response = await fetch("http://localhost:4000/categorys");
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      alert(
        "Sucedio un " +
          error +
          ". Por favor verifique los datos. codigo de error: " +
          error.code
      );
    }
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      if (editTasks) {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/putTasks/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tasks),
        });
        res.json();
        setLoading(false);
      } else {
        setLoading(true);
        const res = await fetch("http://localhost:4000/postTasks", {
          method: "POST",
          body: JSON.stringify(tasks),
          headers: { "Content-Type": "application/json" },
        });
        await res.json();
        setLoading(false);
      }
      navigate("/tasks");
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
  };

  const validateStates = () => {
    try {
      for (let i = 0; i < state.length; i++) {
        if (state[i] !== tasks.idstate[i]) {
          const data = tasks.idstate[i];
          return data;
        }
      }
    } catch (error) {
      alert(
        "Sucedio un " +
          error +
          ". Por favor verifique los datos. codigo de error: " +
          error.code
      );
    }
  };

  console.log("estado: " + tasks.idstate);
  console.log(validateStates() !== tasks.idstate);
  console.log("funcion: " + validateStates());
  console.log(validateStates() === 2);

  const Render = () => {
    if (validateStates() === 1) {
      return (
        <Form.Select
          value={tasks.idstate}
          name="idstate"
          onChange={handleChange}
          required
        >
          {
          
            <option value={state[11].id} key={state[11].id}>
              {state[11].state}
            </option>
            
          }
          {
            <option value={state[0].id} key={state[0].id}>
              {state[0].state}
            </option>
          }
          {
            <option value={state[2].id} key={state[2].id}>
              {state[2].state}
            </option>
          }
        </Form.Select>
      );
    }
    if (validateStates() === 2) {
      return (
        <Form.Select
          value={tasks.idstate}
          name="idstate"
          onChange={handleChange}
          required
        >
          {
            <option value={state[11].id} key={state[11].id}>
              {state[11].state}
            </option>
          }
          {
            <option value={state[1].id} key={state[1].id}>
              {state[1].state}
            </option>
          }
          {
            <option value={state[3].id} key={state[3].id}>
              {state[3].state}
            </option>
          }
        </Form.Select>
      );
    }
    if (validateStates() === 3) {
      return (
        <Form.Select
          value={tasks.idstate}
          name="idstate"
          onChange={handleChange}
          required
        >
          {
            <option value={state[1].id} key={state[1].id}>
              {state[1].state}
            </option>
          }
          {
            <option value={state[11].id} key={state[11].id}>
              {state[11].state}
            </option>
          }
          {
            <option value={state[2].id} key={state[2].id}>
              {state[2].state}
            </option>
          }
        </Form.Select>
      );
    }
    if (validateStates() === 4) {
      return (
        <Form.Select
          value={tasks.idstate}
          name="idstate"
          onChange={handleChange}
          required
        >
          {
            <option value={state[8].id} key={state[8].id}>
              {state[8].state}
            </option>
          }
          {
            <option value={state[4].id} key={state[4].id}>
              {state[4].state}
            </option>
          }
          {
            <option value={state[3].id} key={state[3].id}>
              {state[3].state}
            </option>
          }
        </Form.Select>
      );
    }
    if (validateStates() === 5) {
      return (
        <Form.Select
          value={tasks.idstate}
          name="idstate"
          onChange={handleChange}
          required
        >
          {
            <option value={state[11].id} key={state[11].id}>
              {state[11].state}
            </option>
          }
          {
            <option value={state[5].id} key={state[5].id}>
              {state[5].state}
            </option>
          }
          {
            <option value={state[4].id} key={state[4].id}>
              {state[4].state}
            </option>
          }
          {
            <option value={state[9].id} key={state[9].id}>
              {state[9].state}
            </option>
          }
        </Form.Select>
      );
    }
    if (validateStates() === 6) {
      return (
        <Form.Select
          value={tasks.idstate}
          name="idstate"
          onChange={handleChange}
          required
        >
          {
            <option value={state[11].id} key={state[11].id}>
              {state[11].state}
            </option>
          }
          {
            <option value={state[6].id} key={state[6].id}>
              {state[6].state}
            </option>
          }
          {
            <option value={state[5].id} key={state[5].id}>
              {state[5].state}
            </option>
          }
        </Form.Select>
      );
    }
    if (validateStates() === 7) {
      return (
        <Form.Select
          value={tasks.idstate}
          name="idstate"
          onChange={handleChange}
          required
        >
          {
            <option value={state[7].id} key={state[7].id}>
              {state[7].state}
            </option>
          }
          {
            <option value={state[6].id} key={state[6].id}>
              {state[6].state}
            </option>
          }
          {
            <option value={state[10].id} key={state[10].id}>
              {state[10].state}
            </option>
          }
          {
            <option value={state[11].id} key={state[11].id}>
              {state[11].state}
            </option>
          }
        </Form.Select>
      );
    }
    if (validateStates() === 8) {
      return (
        <Form.Select
          value={tasks.idstate}
          name="idstate"
          onChange={handleChange}
          required
        >
          {
            <option value={state[7].id} key={state[7].id}>
              {state[7].state}
            </option>
          }
          {
            <option value={state[6].id} key={state[6].id}>
              {state[6].state}
            </option>
          }
          {
            <option value={state[10].id} key={state[10].id}>
              {state[10].state}
            </option>
          }
          {
            <option value={state[11].id} key={state[11].id}>
              {state[11].state}
            </option>
          }
        </Form.Select>
      );
    }
    if (validateStates() === 9) {
      return (
        <Form.Select
          value={tasks.idstate}
          name="idstate"
          onChange={handleChange}
          required
        >
          {
            <option value={state[8].id} key={state[8].id}>
              {state[8].state}
            </option>
          }
          {
            <option value={state[2].id} key={state[2].id}>
              {state[2].state}
            </option>
          }
        </Form.Select>
      );
    }
    if (validateStates() === 10) {
      return (
        <Form.Select
          value={tasks.idstate}
          name="idstate"
          onChange={handleChange}
          required
        >
          {
            <option value={state[9].id} key={state[9].id}>
              {state[9].state}
            </option>
          }
          {
            <option value={state[2].id} key={state[2].id}>
              {state[2].state}
            </option>
          }
        </Form.Select>
      );
    } if (validateStates() === 11) {
      return (
        <Form.Select
          value={tasks.idstate}
          name="idstate"
          onChange={handleChange}
          required
        >
          {
            <option value={state[7].id} key={state[7].id}>
              {state[7].state}
            </option>
          }
          {
            <option value={state[6].id} key={state[6].id}>
              {state[6].state}
            </option>
          }
          {
            <option value={state[10].id} key={state[10].id}>
              {state[10].state}
            </option>
          }
          {
            <option value={state[11].id} key={state[11].id}>
              {state[11].state}
            </option>
          }
        </Form.Select>
      );
    } if (validateStates() === 12) {
      return (
        <Form.Select
          value={tasks.idstate}
          name="idstate"
          onChange={handleChange}
          required
        >
          {
            <option value={state[2].id} key={state[2].id}>
              {state[2].state}
            </option>
          }
          {
            <option value={state[11].id} key={state[11].id}>
              {state[11].state}
            </option>
          }
        </Form.Select>
      );
    } if (validateStates() === 13) {
      return (
        <Form.Select
          value={tasks.idstate}
          name="idstate"
          onChange={handleChange}
          required
        >
          {
            <option value={state[12].id} key={state[12].id}>
              {state[12].state}
            </option>
          }

        </Form.Select>
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div id="ContenedorTasksForm">
        <Form onSubmit={handleSumbit} id="tasksForm">
          {editTasks ? (
            <h1>Editar una tarea</h1>
          ) : (
            <h1>Agregar una nueva tarea</h1>
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <Badge bg="dark">Nombre de la nueva tarea</Badge>
            </Form.Label>
            <Form.Control
              name="name"
              onChange={handleChange}
              type="text"
              placeholder="Ingresa la tarea"
              value={tasks.name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              <Badge bg="dark">Fecha de creación</Badge>
            </Form.Label>
            <Form.Control
              name="taskcreationdate"
              onChange={handleChange}
              type="date"
              placeholder="Ingresa la fecha de creación de la tarea aaaa-mm-dd"
              value={moment(tasks.taskcreationdate).utc().format("YYYY-MM-DD")}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <Badge bg="dark">Fecha de Inicio</Badge>
            </Form.Label>
            <Form.Control
              name="taskstartdate"
              onChange={handleChange}
              type="date"
              placeholder="Ingresa la fecha de inicio de la tarea aaaa-mm-dd"
              value={moment(tasks.taskstartdate).utc().format("YYYY-MM-DD")}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <Badge bg="dark">Fecha de finalización</Badge>
            </Form.Label>
            <Form.Control
              name="taskcompletiondate"
              onChange={handleChange}
              type="date"
              placeholder="Ingresa la fecha de finalización de la tarea aaaa-mm-dd"
              value={moment(tasks.taskcompletiondate)
                .utc()
                .format("YYYY-MM-DD")}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <Badge bg="dark">Selecciona el empleado encargado</Badge>
            </Form.Label>
            <Form.Select
              value={tasks.idemployee}
              name="idemployee"
              onChange={handleChange}
            >
              {employee.map((data) => (
                <option value={data.id} key={data.id}>
                  {data.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <Badge bg="dark">Selecciona la categoria de la tarea</Badge>
            </Form.Label>
            <Form.Select
              value={tasks.idcategory}
              name="idcategory"
              onChange={handleChange}
              required
            >
              {!editTasks ? (
                <option value={(tasks.idcategory = "1")}>Emitida</option>
              ) : (
                category.map((data) => (
                  <option value={data.id} key={data.id}>
                    {data.category}
                  </option>
                ))
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <Badge bg="dark">Selecciona el estado de la tarea</Badge>
            </Form.Label>

            {!editTasks ? (
              <Form.Select
                value={tasks.idstate}
                name="idstate"
                onChange={handleChange}
                required
              >
                <option value={(tasks.idstate = "1")}>Iniciada</option>
              </Form.Select>
            ) : (
              <Render />
            )}
          </Form.Group>

          <div id="contenedorBotonEmpleado">
            <Button
              onSubmit={handleSumbit}
              id="botonEmpleado"
              variant="primary"
              type="submit"
              disabled={
                !tasks.name ||
                !tasks.taskstartdate ||
                !tasks.taskcompletiondate ||
                !tasks.taskcreationdate ||
                !tasks.idemployee ||
                !tasks.idstate
              }
            >
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
              ) : (
                "Guardar"
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default TaskForm;
