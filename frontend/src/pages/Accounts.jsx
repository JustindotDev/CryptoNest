import { Container, Flex, Box, Heading, Image, useToast } from '@chakra-ui/react'
import { useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Accounts = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toast = useToast();

  // Sign up Form
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    
    const user = { username, email, password };
    
    try {
      const response = await axios.post("http://localhost:5000/api/users", user, {
        headers: { "Content-Type": "application/json" },
      });
  
      toast({
        title: 'Success',
        description: "Your account has been successfully created!",
        status: 'success',
        duration: 1500,
        isClosable: false,
      });

      setEmail("");
      setPassword("");

      setAction("Log in");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // Login Form
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, password }, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store login state
        navigate("/home");
      } 

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const [action, setAction] = useState("Log in")

  return (
    <Container  maxW={"1400px"} px={'20px'} pt={'20px'}>
      <Flex
        bg={"rgba(17, 24, 39, 1)"} 
        gap={'20px'}
        borderRadius={'20px'}
        border={'1px solid  rgb(80, 80, 80)'}
        shadow={'2px 2px 10px rgb(49, 49, 49)'}
      >
        <Flex 
          width={'50%'}
          height={'560px'}
          justifyContent={'center'}
        >
          <Box 
            paddingTop={'90px'}
          >
            <Box display={'flex'}>
              <Image src='./src/assets/logo.png' 
                height={'120px'}
              ></Image>
              <Heading 
                pt={'35px'}
                size={'2xl'}
                fontFamily={"Montserrat, sans-serif"}
              > 
                Crypto Nest
              </Heading>
            </Box>
            <Image src='./src/assets/bglogo.png' 
              height={'200px'}
              pl={"150px"}
            ></Image>
          </Box>
        </Flex>
        <Flex 
          width={'50%'}
          height={'560px'}
          justifyContent={'center'}
          
        >
          <Box>
            <Flex>
              <StyledWrapper>
                <div className="form-container">
                  <p className="title">{action}</p>
                  <form className="form" onSubmit={action === "Create an Account" ? handleSignup : handleLogin}>
                    {action==="Create an Account" ? <div className="input-group">
                      <label htmlFor="username">Username</label>
                      <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div> : <div></div>}
                    <div className="input-group">
                      <label htmlFor="email">Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="password">Password</label>
                      <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                      />
                      {action==='Create an Account'? <div></div> : <div className="forgot">
                        <a>Forgot Password ?</a>
                      </div>}
                    </div>
                    <button className="sign"  type="submit"
                    >{action==="Create an Account" ? 'Sign up' : action==="Log in" ? 'Sign in' : null}</button>
                  </form>
                  <div className="social-message">
                    <div className="line" />
                    <p className="message">Login with social accounts</p>
                    <div className="line" />
                  </div>
                  <div className="social-icons">
                    <button aria-label="Log in with Google" className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                      <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
                      </svg>
                    </button>
                    <button aria-label="Log in with Twitter" className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z" />
                      </svg>
                    </button>
                    <button aria-label="Log in with GitHub" className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" />
                      </svg>
                    </button>
                  </div>
                  <p className="signup">{action==="Create an Account" ? "Already have an account?" : "Don't have an account?"}
                    <a className="choice" 
                      onClick={ ()=>{
                          if(action==='Log in'){
                            setAction("Create an Account")
                          }else {
                            setAction("Log in")
                          }
                        }} 
                    >{action==="Log in" ? 'Sign up' : 'Log in'}</a>
                  </p>
                </div>
              </StyledWrapper>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}



const StyledWrapper = styled.div`
  .form-container {
    width: 400px;
    border-radius: 0.75rem;
    background-color: rgba(17, 24, 39, 1);
    padding-top: 5rem;
    color: rgba(243, 244, 246, 1);
  }

  .title {
    text-align: center;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
  }

  .form {
    margin-top: 1.5rem;
  }

  .input-group {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .input-group label {
    display: block;
    color: rgba(156, 163, 175, 1);
    margin-bottom: 4px;
  }

  .input-group input {
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid rgba(55, 65, 81, 1);
    outline: 0;
    background-color: rgba(17, 24, 39, 1);
    padding: 0.75rem 1rem;
    color: rgba(243, 244, 246, 1);
  }

  .input-group input:focus {
    border-color: rgba(167, 139, 250);
  }

  .forgot {
    display: flex;
    justify-content: flex-end;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgba(156, 163, 175,1);
    margin: 8px 0 14px 0;
    cursor: pointer;
  }

  .forgot a,.signup a {
    color: rgba(243, 244, 246, 1);
    text-decoration: none;
    font-size: 14px;
  }

  .forgot a:hover, .signup a:hover {
    text-decoration: underline rgba(167, 139, 250, 1);
  }

  .sign {
    display: block;
    width: 100%;
    background-color: rgba(167, 139, 250, 1);
    padding: 0.75rem;
    margin-top: 10px;
    text-align: center;
    color: rgba(17, 24, 39, 1);
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
  }

  .social-message {
    display: flex;
    align-items: center;
    padding-top: 1rem;
  }

  .line {
    height: 1px;
    flex: 1 1 0%;
    background-color: rgba(55, 65, 81, 1);
  }

  .social-message .message {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: rgba(156, 163, 175, 1);
  }

  .social-icons {
    display: flex;
    justify-content: center;
  }

  .social-icons .icon {
    border-radius: 0.125rem;
    padding: 0.75rem;
    border: none;
    background-color: transparent;
    margin-left: 8px;
  }

  .social-icons .icon svg {
    height: 1.25rem;
    width: 1.25rem;
    fill: #fff;
  }

  .signup {
    text-align: center;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgba(156, 163, 175, 1);
  }
  
  .choice {
    padding-left: 5px;
    cursor:pointer;
  }`;
export default Accounts;