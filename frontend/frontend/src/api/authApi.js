import API from "./axios";

// REGISTER
export const registerUser = (data) =>
  API.post("/users/register", data);

// LOGIN
export const loginUser = (data) =>
  API.post("/users/login", data);

// FORGOT PASSWORD
export const forgotPassword = (data) =>
  API.post("/users/forgot-password", data);

// RESET PASSWORD
export const resetPassword = (data) =>
  API.post("/users/reset-password", data);

// 🔥 DASHBOARD (THIS FIXES YOUR ERROR)
export const getDashboard = () =>
  API.get("/dashboard/stats");