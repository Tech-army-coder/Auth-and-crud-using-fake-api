import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Pagination, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEdit } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import Loader from "../../components/common/Loader";
import { fetchAllEmployees } from "../../api/auth";


const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // Default role
    avatar: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10); // Number of employees per page

  //searching
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Sorting state
  const [sortCriteria, setSortCriteria] = useState("name"); // Default sort by name
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchAllEmployees();
        setEmployees(data);
      } catch (err) {
        setError("Error fetching employees: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password: must contain only letters and numbers
    const passwordRegex = /^[a-zA-Z0-9]+$/;
    if (!passwordRegex.test(newUser.password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must contain only letters and numbers.",
      });
      return;
    }

    // Validate avatar URL: must be a valid URL
    const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i; // Simple URL validation regex
    if (!urlRegex.test(newUser.avatar)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Avatar URL",
        text: "Avatar must be a valid URL address.",
      });
      return;
    }

    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get the error data from the response
        // Check if the error message is an array or a single string
        const errorMessage = Array.isArray(errorData.message)
          ? errorData.message.join(", ") // Join multiple messages with a comma
          : errorData.message; // Use the message directly if it's a single string

        throw new Error(errorMessage || "An error occurred"); // Use the error message or a fallback
      }

      const createdUser = await response.json();
      setEmployees((prevEmployees) => [...prevEmployees, createdUser]);
      setShowModal(false);
      setNewUser({ name: "", email: "", password: "", avatar: "" });

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Employee Created",
        text: "The Employee has been successfully created!",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message, // Display the API error message
      });
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

  // Use filteredEmployees for pagination
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting function
  const sortEmployees = (employees) => {
    return [...employees].sort((a, b) => {
      const isAsc = sortOrder === "asc";
      switch (sortCriteria) {
        case "name":
          return isAsc
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  };

  // Sort filtered employees
  const sortedEmployees = sortEmployees(filteredEmployees);

  // Get current employees for the current page
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPages = Math.ceil(sortedEmployees.length / employeesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (criteria) => {
    let newOrder = "asc"; // Default to ascending
    if (sortCriteria === criteria) {
      // Toggle order if the same criteria is clicked
      newOrder = sortOrder === "asc" ? "desc" : "asc";
    }
    setSortCriteria(criteria);
    setSortOrder(newOrder);
  };

  return (
    <div className="container mt-5" style={{ marginBottom: "7rem" }}>
      <h2>Manage Employees</h2>

      <div className="d-flex align-items-center mb-3">
    <div className="me-2" style={{ flex: "0 1 200px" }}>
        <input
            type="text"
            className="form-control form-control-md" // Smaller input size
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    </div>
    <button
        className="btn btn-primary btn-md"
        onClick={() => setShowModal(true)}
    >
        Add Employee
    </button>
    <div className="ms-auto"> {/* Add this div to push the dropdown to the end */}
        <NavDropdown
            title={<IoFilterSharp  size={25}/>}        
            id="navbarScrollingDropdown"
            align="end"
            >
            <NavDropdown.Item
                as={Link}
                to="#action4"
                onClick={() => handleSort("name")}
                >
                Sort by Name (Ascending)
            </NavDropdown.Item>
            <NavDropdown.Item
                as={Link}
                to="#action4"
                onClick={() => handleSort("name")}
                >
                Sort by Name (Descending)
            </NavDropdown.Item>
        </NavDropdown>
              
    </div>
</div>

      <Table striped bordered hover>
        {/* <table className="table "> */}
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Avatar</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
    {currentEmployees.map((employee, index) => (
        <tr key={employee.id}>
            <td>{(currentPage - 1) * employeesPerPage + index + 1}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.role}</td>
            <td>
                <img
                    src={employee.avatar ? employee.avatar : "https://placehold.co/50"}
                    alt={employee.name}
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
                
            </td>
            <td>
                <Link to={`/employee/${employee.id}`} title="View">
                    <FaEye style={{ margin: '0 5px', fontSize: '1.2rem' }} />
                </Link>
                <Link to={`/employee/edit/${employee.id}`} title="Edit">
                    <FaEdit style={{ margin: '0 5px', color: "black", fontSize: '1.2rem' }} />
                </Link>
            </td>
        </tr>
    ))}
</tbody>
        {/* </table> */}
      </Table>

      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}{" "}
          {/* Display error message */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="avatar" className="form-label">
                Avatar URL
              </label>
              <input
                type="text"
                className="form-control"
                name="avatar"
                value={newUser.avatar}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit" className="btn btn-success">
              Create Employee
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Employees;
