import { Spinner } from "@chakra-ui/react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loading-overlay">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="purple.500" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
`;

export default Loader;
