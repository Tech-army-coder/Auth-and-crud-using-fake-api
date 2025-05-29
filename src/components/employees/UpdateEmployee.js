import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Loader from "../common/Loader";
import { fetchEmployeeById, updateEmployee } from "../../api/auth";


const UpdateEmployee = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters long"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

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

const handleSubmit = async (values) => {
  try {
    await updateEmployee(id, values);

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Employee updated successfully.",
      confirmButtonText: "OK",
    });

    navigate("/employees-data");
  } catch (error) {
    console.error("Error updating employee:", error.message);
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: error.message,
      confirmButtonText: "OK",
    });
  }
};

  return (
    <div className="user-form mb-3">
      <h2>Update Employee</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        employee && (
          <Formik
            initialValues={{
              name: employee.name || "",
              email: employee.email || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <Field name="name" type="text" className="form-control" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
              <button type="submit" className="my-3 btn btn-success">
                Update Employee
              </button>
            </Form>
          </Formik>
        )
      )}
    </div>
  );
};

export default UpdateEmployee;
