import React, { useState, useEffect } from "react";
import Loader from "../../components/common/Loader"; // ✅ Fix this import (was incorrectly importing Header)
import { ProfileData } from "../../api/auth";

const Dashboard = ({ logout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await ProfileData();
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Loader />
      </div>
    );
  }

  return (
    <div className="user-form text-center">
      <h2 className="display-4">Dashboard</h2>
      {user && user.name ? (
        <>
          <h4 className="lead">
            Hi {user.name}, Welcome to our website! We're glad you're here.
          </h4>
          <div className="d-flex flex-column align-items-center mt-4">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="rounded-circle"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
            />
            <h2 className="mt-3">{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Created at: {new Date(user.creationAt).toLocaleDateString()}</p>
            <p>Updated at: {new Date(user.updatedAt).toLocaleDateString()}</p>
          </div>
        </>
      ) : (
        <p>User data not found.</p>
      )}
    </div>
  );
};

export default Dashboard;
