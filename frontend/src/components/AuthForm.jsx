import { useState } from "react";
import { Spinner, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import { signup, login } from "../orders/AuthService.jsx";
import styled from "styled-components";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Loader from "../components/Loader.jsx";

const AuthForm = ({ action, setAction }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    try {
      setLoading(true);
      if (action === "Create an Account") {
        await signup({ username, email, password });
        toast({
          title: "Success",
          description: "Your account has been successfully created!",
          status: "success",
          duration: 1500,
          isClosable: false,
        });
        setUsername("");
        setEmail("");
        setPassword("");
        setAction("Log in");
      } else {
        const response = await login({ email, password });
        localStorage.setItem("token", response.token);
        toast({
          title: "Success",
          description: "Login Successful!",
          status: "success",
          duration: 1500,
          isClosable: false,
        });
        navigate("/home");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const { field, message } = err.response.data;

        if (field === "email") {
          setEmailError(message);
        } else if (field === "password") {
          setPasswordError(message);
        }
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 1500,
          isClosable: false,
        });
      }
    } finally {
      setLoading(false); // Stop loading in all cases
    }
  };

  return (
    <StyledWrapper>
      {loading && <Loader />}
      <div className="form-container">
        <p className="title">{action}</p>
        <form className="form" onSubmit={handleSubmit}>
          {action === "Create an Account" && (
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <IoPerson className="input-icon" />
              <input
                type="text"
                name="username"
                required="true"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <MdEmail className="input-icon" />
            <input
              type="email"
              name="email"
              required="true"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={emailError && "input-error"}
            />
            {emailError && (
              <p className="error-message">
                <RiErrorWarningLine className="error-icon" />
                {emailError}
              </p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <IoIosLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              required="true"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={passwordError && "input-error"}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
            </span>
            {passwordError && (
              <p className="error-message">
                <RiErrorWarningLine className="error-icon" />
                {passwordError}
              </p>
            )}
          </div>
          <button
            className="sign"
            type="submit"
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {loading && <Spinner size="sm" color="gray.800" />}
            {action === "Create an Account" ? "Sign up" : "Sign in"}
          </button>
        </form>
        <p className="signup">
          {action === "Create an Account"
            ? "Already have an account?"
            : "Don't have an account?"}
          <a
            className="choice"
            onClick={() =>
              setAction(action === "Log in" ? "Create an Account" : "Log in")
            }
          >
            {action === "Log in" ? "Sign up" : "Log in"}
          </a>
        </p>
      </div>
    </StyledWrapper>
  );
};

// Styled Wrapper
const StyledWrapper = styled.div`
  .form-container {
    width: 400px;
    height: 500px;
    padding-top: 5rem;
    background-color: rgba(17, 24, 39, 1);
    color: rgba(243, 244, 246, 1);
    border-radius: 0.75rem;
  }

  .title {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .input-group {
    position: relative;
    margin-top: 1rem;
  }

  .input-group input {
    width: 100%;
    padding: 0.75rem;
    background-color: rgba(17, 24, 39, 1) !important;
    color: rgba(243, 244, 246, 1) !important;
    border: 1px solid rgba(55, 65, 81, 1);
    border-radius: 0.375rem;
    padding-left: 3rem;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    background-color: rgba(17, 24, 39, 1) !important;
    -webkit-text-fill-color: rgba(243, 244, 246, 1) !important;
    color: rgba(243, 244, 246, 1) !important;
    -webkit-box-shadow: 0 0 0px 1000px rgba(17, 24, 39, 1) inset;
    caret-color: rgba(243, 244, 246, 1) !important;
  }

  .input-icon {
    position: absolute;
    font-size: 1.3rem;
    top: 2.45rem;
    left: 1rem;
    color: rgb(156, 156, 156);
  }

  .eye-icon {
    position: absolute;
    right: 1rem;
    top: 68%;
    transform: translateY(-50%);
    font-size: 1.3rem;
    color: rgb(156, 156, 156);
    cursor: pointer;
  }

  .eye-icon:hover {
    color: rgba(243, 244, 246, 1);
  }

  .input-error {
    border: 1px solid red !important;
    outline: none;
  }

  .error-message {
    display: flex;
    gap: 5px;
    color: rgb(255, 79, 79);
    font-size: 0.875rem;
    margin-top: 0.25rem;
    line-height: 1.9;
  }

  .error-icon {
    font-size: 1.4rem; /* Adjusts icon size */
  }

  .sign {
    width: 100%;
    padding: 0.75rem;
    margin-top: 10px;
    background-color: rgba(167, 139, 250, 1);
    color: rgba(17, 24, 39, 1);
    font-weight: 600;
    border: none;
    border-radius: 0.375rem;
  }

  .sign:hover {
    background-color: rgb(177, 156, 248);
  }

  .sign:active {
    background-color: rgba(167, 139, 250, 1);
  }

  .signup {
    text-align: center;
    font-size: 0.75rem;
    margin-top: 1rem;
  }

  .signup a:hover {
    text-decoration: underline rgba(167, 139, 250, 1);
  }

  .choice {
    cursor: pointer;
    color: rgba(243, 244, 246, 1);
    margin-left: 5px;
  }
`;

export default AuthForm;
