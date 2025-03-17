import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { signup, login } from "../orders/AuthService.jsx"; // Importing API functions
import styled from "styled-components";
import { RiErrorWarningLine } from "react-icons/ri";

const AuthForm = ({ action, setAction }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    try {
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
    }
  };

  return (
    <StyledWrapper>
      <div className="form-container">
        <p className="title">{action}</p>
        <form className="form" onSubmit={handleSubmit}>
          {action === "Create an Account" && (
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
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
            <input
              type="password"
              s
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={passwordError && "input-error"}
            />
            {passwordError && (
              <p className="error-message">
                <RiErrorWarningLine className="error-icon" />
                {passwordError}
              </p>
            )}
          </div>
          <button className="sign" type="submit">
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
    margin-top: 1rem;
  }

  .input-group input {
    width: 100%;
    padding: 0.75rem;
    background-color: rgba(17, 24, 39, 1);
    color: rgba(243, 244, 246, 1);
    border: 1px solid rgba(55, 65, 81, 1);
    border-radius: 0.375rem;
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
