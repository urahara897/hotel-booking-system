import styled from "styled-components";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";

const Wrapper = styled.div`
  height: 100%;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
  }
`;

const StyledStat = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;
  height: 100%;

  @media (max-width: 768px) {
    height: 100%;
    width: 100%;
    padding: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    margin: 0;
    isolation: isolate;
  }
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);
  }

  @media (max-width: 768px) {
    width: 3.2rem;
    height: 3.2rem;

    & svg {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);

  @media (max-width: 768px) {
    display: none;
  }
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Dialog = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.show ? "block" : "none")};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--color-grey-0);
    padding: 2.4rem;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    width: 80%;
    max-width: 32rem;
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.show ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

const DialogTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 1.6rem;
`;

const DialogValue = styled.p`
  font-size: 3.2rem;
  font-weight: 600;
  margin-bottom: 2.4rem;
  color: var(--color-${(props) => props.color}-700);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.8rem;
  font-size: 1.4rem;
  color: var(--color-grey-500);
  cursor: pointer;
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
`;

function Stat({ icon, title, value, color }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setIsDialogOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleStatClick() {
    if (window.innerWidth <= 768) {
      setIsDialogOpen(true);
    }
  }

  return (
    <>
      <Wrapper onClick={handleStatClick}>
        <StyledStat>
          <Icon color={color}>{icon}</Icon>
          <Title>{title}</Title>
          <Value>{value}</Value>
        </StyledStat>
      </Wrapper>

      <Overlay show={isDialogOpen} onClick={() => setIsDialogOpen(false)} />
      <Dialog show={isDialogOpen} ref={dialogRef}>
        <CloseButton onClick={() => setIsDialogOpen(false)}>✕</CloseButton>
        <DialogTitle>{title}</DialogTitle>
        <DialogValue color={color}>{value}</DialogValue>
        <div style={{ color: `var(--color-${color}-700)` }}>{icon}</div>
      </Dialog>
    </>
  );
}

Stat.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
};

export default Stat;
