import styled from "styled-components";

const Loader = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: smokewhite;
  box-shadow: 0 0 0 0 #0004;
  animation: bs 1.2s infinite;

  @keyframes bs {
    40% {
      box-shadow: 0 0 0 25px #0000;
    }
    100% {
      box-shadow: 0 0 0 35px #0000;
    }
  }
`;

export default Loader;
