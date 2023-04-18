import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);
  const [employee, setEmployee] = useState({
    name: "",
    startdate: "",
    salary: "",
  });

  useEffect(() => {
    if (params.id) {
      loadEmployeeById(params.id);
    }
  }, [params.id]);

  const loadEmployeeById = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/employees/${id}`);
      const data = await response.json();
      setEmployee({
        name: data.map((user) => user.name),
        startdate: data.map((user) => user.startdate),
        salary: data.map((user) => user.salary),
      });
      setEditEmployee(true);
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
    setLoading(true);
    try {
      if (editEmployee) {
        const res = await fetch(
          `http://localhost:4000/putEmployees/${params.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(employee),
          }
        );
        res.json();
      } else {
        await fetch("http://localhost:4000/postEmployees", {
          method: "POST",
          body: JSON.stringify(employee),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      alert(
        "Sucedio un " +
          error +
          ". Por favor verifique los datos. codigo de error: " +
          error.code
      );
    }
    setLoading(false);
    navigate("/employees");
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <div id="ContenedorEmployeeForm">
        <Form onSubmit={handleSumbit} id="employeeForm">
          {editEmployee ? (
            <h1>Editar un empleado</h1>
          ) : (
            <h1>Agregar nuevo empleado</h1>
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <Badge bg="dark">Nombre del nuevo empleado</Badge>
            </Form.Label>
            <Form.Control
              name="name"
              onChange={handleChange}
              type="text"
              placeholder="Ingresa el nombre completo"
              value={employee.name}
              required
              pattern="[A-Za-z]"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              <Badge bg="dark">Fecha de ingreso</Badge>
            </Form.Label>
            <Form.Control
              name="startdate"
              onChange={handleChange}
              type="date"
              placeholder="Ingresa la fecha de ingreso del empleado aaaa-mm-dd"
              value={moment(employee.startdate).utc().format("YYYY-MM-DD")}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <Badge bg="dark">Salario</Badge>
            </Form.Label>
            <Form.Control
              name="salary"
              onChange={handleChange}
              type="number"
              placeholder="Ingresa el salario del empleado"
              value={employee.salary}
              required
            />
          </Form.Group>

          <div id="contenedorBotonEmpleado">
            <Button
              id="botonEmpleado"
              variant="primary"
              type="submit"
              disabled={
                !employee.name || !employee.startdate || !employee.salary
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

export default EmployeeForm;
