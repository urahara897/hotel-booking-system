import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 52rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2.4rem;
    gap: 2.4rem;
    align-content: flex-start;
    padding-top: 6rem;
  }
`;

const LoginContainer = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    max-width: 44rem;
    margin: 0 auto;
  }
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <LoginContainer>
        <Heading as="h4">Log in to your account</Heading>
        <LoginForm />
      </LoginContainer>
    </LoginLayout>
  );
}

export default Login;
