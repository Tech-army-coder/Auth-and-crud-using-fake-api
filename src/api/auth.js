export const loginUser  = async (email, password) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      let errorMessage = 'Something went wrong. Please try again.';
      const errorData = await response.json();

      if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
        errorMessage = errorData.errors[0].message || errorMessage;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    // Handle network errors or other unexpected errors
    console.error('Login error:', error);
    throw new Error(error.message || 'An unexpected error occurred.');
  }
};


export const SignUpUser  = async (userData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.message || 'Something went wrong during sign up.';
      throw new Error(Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg);
    }

    return data; // Return the user data or any relevant response
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error(error.message || 'An unexpected error occurred during signup.');
  }
};

export const ProfileData = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Profile fetch error:", error.message);
    throw error; // re-throw for handling in the calling function
  }
};

export const fetchEmployeeById = async (id) => {

  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch employee data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Employee fetch error:", error.message);
    throw error; // So the caller can handle it (e.g., in useEffect)
  }
};

export const fetchAllEmployees = async () => {

  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch employee data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Employee fetch error:", error.message);
    throw error; // So the caller can handle it (e.g., in useEffect)
  }
};

// Update employee
export const updateEmployee = async (id, values) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        name: values.name,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update employee");
    }

    return await response.json();
  } catch (error) {
    console.error("Update employee error:", error.message);
    throw error;
  }
};