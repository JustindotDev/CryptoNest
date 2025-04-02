import React from "react";
import styled from "styled-components";
import { TiPlus } from "react-icons/ti";
import theme from "../components/Theme.jsx";

const AddButton = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button className="Btn" onClick={onClick}>
        <div className="sign">
          <TiPlus size={23} />
        </div>
        <div className="text">Add</div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: 0.3s;
    box-shadow: 1px 2px 5px rgb(86, 86, 87);
    background-color: rgb(39, 12, 158);
  }

  /* plus sign */
  .sign {
    width: 100%;
    transition-duration: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  /* text */
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.1em;
    font-weight: 600;
    font-family: ${theme.fonts.body}; /* Nunito font applied */
    transition-duration: 0.3s;
  }
  /* hover effect on button width */
  .Btn:hover {
    background-color: #rgb(9, 8, 64);
    width: 125px;
    border-radius: 40px;
    transition-duration: 0.3s;
  }

  .Btn:hover .sign {
    width: 32%;
    transition-duration: 0.3s;
    padding-left: 20px;
  }
  /* hover effect button's text */
  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: 0.3s;
    padding-right: 10px;
  }
  /* button click effect*/
  .Btn:active {
    transform: translate(2px, 2px);
  }
`;

export default AddButton;
