import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { fetchEmployeeById } from "../../api/auth";

const EmployeeDetails = () => {
  const { id } = useParams(); 
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const data = await fetchEmployeeById(id);
        setEmployee(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getEmployee();
  }, [id]);
 // Dependency array includes id to refetch if it changes

  return (
    <div className="user-form text-center">
      <h2 className="display-4">Employee Details</h2>
      {loading ? (
        <div>
          <Loader />
        </div> // Display a loading message when the API request is in progress
      ) : error ? (
        <p>Error: {error}</p> // Display error message if there is an error
      ) : employee && employee.name ? (
        <div>
          <img
            src={
              employee.avatar ? employee.avatar : "https://picsum.photos/200"
            }
            alt={employee.name}
            style={{ width: "200px", height: "200px", borderRadius: "50%" }}
          />
          <h2>{employee.name}</h2>
          <p>Email: {employee.email}</p>
          <p>Role: {employee.role}</p>
          <p>Created at: {new Date(employee.createdAt).toLocaleDateString()}</p>
          <p>Updated at: {new Date(employee.updatedAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Employee data not found.</p> // Display a message when the user data is not found
      )}
    </div>
  );
};

export default EmployeeDetails;
