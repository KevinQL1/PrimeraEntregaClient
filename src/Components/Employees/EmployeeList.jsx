import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState([]);
  const [searchEmployee, setSearchEmployee] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/employees");
      const data = await response.json();
      setLoading(false);
      setEmployee(data);
      setSearchEmployee(data);
    } catch (error) {
      alert(
        "Sucedio un " +
          error +
          ". Por favor verifique los datos. codigo de error: " +
          error.code
      );
    }
  };

  const search = (find) => {
    try {
      const response = searchEmployee.filter((data) => {
        if (
          data.name.toString().toLowerCase().includes(find.toLowerCase()) ||
          data.id === parseInt(find)
        ) {
          return data;
        }
      });
      setEmployee(response);
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
    setEmployee({ ...employee, [e.target.name]: e.target.value });
    search(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/deleteEmployees/${id}`, {
        method: "DELETE",
      });
      window.location.reload();
    } catch (error) {
      alert(error);
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
        <div id="ContenedorEmployeeList">
          <Table striped bordered hover id="employeeList">
            <thead>
              <tr className="text-center">
                <th colSpan={6}>Listado de Empleados</th>
              </tr>
              <tr className="text-center">
                <th>Id</th>
                <th>Nombre</th>
                <th>Fecha de Ingreso</th>
                <th>Salario</th>
                <th>Editar trabajador</th>
                <th>Eliminar trabajador</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((data) => (
                <tr className="text-center" key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.startdate}</td>
                  <td>{data.salary}</td>

                  <td>
                    <Button
                      onClick={() => navigate(`/putEmployees/${data.id}`)}
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
                <th colSpan={5}>
                  <Form className="d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Buscar por NOMBRE o ID del empleado"
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

export default EmployeeList;
