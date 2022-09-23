// vendors
import styled from "styled-components";

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(79, 79, 79, 0.32);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  width: 35rem;
  height: 15rem;
  background-color: #fff;
  border-radius: 1.5rem;
`;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: space-around;
  justify-content: space-around;
  color: #4f4f4f;

  h1 {
    color: #7a00c4;
    font-size: 1.125rem;
  }

  button {
    width: 100%;
    max-width: 80%;
    border-radius: 1rem;
    background-color: #7a00c4;
    color: white;
  }
`;

function Modal({ onClick, title, text }) {
  return (
    <Overlay>
      <ModalContainer>
        <ModalContent>
          <h1>{title}</h1>

          <p>{text}</p>

          <button onClick={onClick}>Click me</button>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
}

export default Modal;
