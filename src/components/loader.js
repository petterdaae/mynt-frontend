import styled from "styled-components";

const Loader = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: smokewhite;
  box-shadow: 0 0 0 0 #0004;
  animation: bs 1s infinite;

  @keyframes bs {
    10% {
      box-shadow: 0 0 0 20px #0000;
    }
    100% {
      box-shadow: 0 0 0 30px #0000;
    }
  }
`;

export default Loader;
