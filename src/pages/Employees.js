
// src/pages/Employees.js
import EmployeeList from "../components/employees/EmployeeList";

const Employees = ({ logout }) => {
  return <EmployeeList logout={logout} />;
};

export default Employees;