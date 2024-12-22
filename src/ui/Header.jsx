import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-radius: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 768px) {
    padding: 1.2rem;
    gap: 1.2rem;
  }
`;

const UserInfo = styled.div`
  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

function Header() {
  return (
    <StyledHeader>
      <UserInfo>
        <UserAvatar />
      </UserInfo>
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
