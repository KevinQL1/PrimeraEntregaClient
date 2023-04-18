import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" id="link">
            Base de datos
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Empleados" id="basic-nav-dropdown">
              <div id="subContenedor">
                <Link to="/employees" id="link">
                  Datos Empleados
                </Link>
              </div>
              <div id="subContenedor">
                <Link to="/postEmployees" id="link">
                  Agregar Empleado
                </Link>
              </div>
            </NavDropdown>
            <NavDropdown title="Tareas" id="basic-nav-dropdown">
              <div id="subContenedor">
                <Link to="/tasks" id="link">
                  Datos Tareas
                </Link>
              </div>
              <div id="subContenedor">
                <Link to="/postTasks" id="link">
                  Agregar Tarea
                </Link>
              </div>
            </NavDropdown>
            <div id="salir">
              <Link to="/" id="link">
                Salir
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
