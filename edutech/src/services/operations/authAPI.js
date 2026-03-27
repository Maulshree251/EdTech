import { apiConnector } from "../apiConnector";
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";

// ===================== AUTH ENDPOINTS =====================
const AUTH_ENDPOINTS = {
  SENDOTP_API: "/auth/sendOTP",
  SIGNUP_API: "/auth/signup",
  LOGIN_API: "/auth/login",
  RESETPASSTOKEN_API: "/auth/reset-password-token",
  RESETPASSWORD_API: "/auth/reset-password",
};

// ===================== SEND OTP =====================
export async function sendOTP(email, navigate) {
  try {
    const response = await apiConnector("POST", AUTH_ENDPOINTS.SENDOTP_API, {
      email,
    });
    console.log("SENDOTP API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    // Navigate to verify-email page after OTP is sent
    if (navigate) {
      navigate("/verify-email");
    }
  } catch (error) {
    console.log("SENDOTP API ERROR:", error);
    alert(error.response?.data?.message || "Failed to send OTP");
  }
}

// ===================== SIGNUP =====================
export async function signUp(signupData, otp, navigate) {
  try {
    const response = await apiConnector("POST", AUTH_ENDPOINTS.SIGNUP_API, {
      ...signupData,
      otp,
    });
    console.log("SIGNUP API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    alert("Account created successfully!");
    // Clear stored signup data
    localStorage.removeItem("signupData");
    // Navigate to login page
    if (navigate) {
      navigate("/login");
    }
  } catch (error) {
    console.log("SIGNUP API ERROR:", error);
    alert(error.response?.data?.message || "Failed to sign up");
  }
}

// ===================== LOGIN =====================
export function login(email, password, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", AUTH_ENDPOINTS.LOGIN_API, {
        email,
        password,
      });
      console.log("LOGIN API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Store token and user in localStorage
      localStorage.setItem("token", JSON.stringify(response.data.token || response.data.user?.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Set Redux State
      dispatch(setToken(response.data.token || response.data.user?.token));
      dispatch(setUser(response.data.user));

      alert("Logged in successfully!");
      // Navigate to home page
      if (navigate) {
        navigate("/");
      }
    } catch (error) {
      console.log("LOGIN API ERROR:", error);
      alert(error.response?.data?.message || "Failed to log in");
    }
  };
}

// ===================== LOGOUT =====================
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/");
  };
}

// ===================== GET PASSWORD RESET TOKEN =====================
export async function getPasswordResetToken(email, setEmailSent) {
  try {
    const response = await apiConnector(
      "POST",
      AUTH_ENDPOINTS.RESETPASSTOKEN_API,
      { email }
    );
    console.log("RESET PASSWORD TOKEN RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    alert("Reset email sent!");
    if (setEmailSent) {
      setEmailSent(true);
    }
  } catch (error) {
    console.log("RESET PASSWORD TOKEN ERROR:", error);
    alert(error.response?.data?.message || "Failed to send reset email");
  }
}

// ===================== RESET PASSWORD =====================
export async function resetPassword(password, confirmPassword, token, navigate) {
  try {
    const response = await apiConnector(
      "POST",
      AUTH_ENDPOINTS.RESETPASSWORD_API,
      { password, confirmPassword, token }
    );
    console.log("RESET PASSWORD RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    alert("Password reset successful!");
    if (navigate) {
      navigate("/reset-complete");
    }
  } catch (error) {
    console.log("RESET PASSWORD ERROR:", error);
    alert(error.response?.data?.message || "Failed to reset password");
  }
}
