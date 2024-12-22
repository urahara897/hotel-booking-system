import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import Logo from "./Logo";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-radius: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 768px) {
    padding: 0.8rem 1.6rem;
    gap: 1.2rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const HeaderLeft = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    & img {
      height: 3.6rem;
      width: auto;
    }
  }
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.8rem;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <HeaderLeft>
        <Logo />
      </HeaderLeft>
      <HeaderRight>
        <UserAvatar />
        <HeaderMenu />
      </HeaderRight>
    </StyledHeader>
  );
}

export default Header;
