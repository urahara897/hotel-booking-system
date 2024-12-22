import styled from "styled-components";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useTodayActivity } from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";
import { useState } from "react";

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;

  @media (max-width: 768px) {
    & .activities-container {
      display: none;
    }
  }
`;

const TodayList = styled.ul`
  overflow: auto;
  min-width: min-content;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const SummaryBox = styled.div`
  @media (max-width: 768px) {
    text-align: center;
    padding: 2rem;

    & h4 {
      font-size: 1.6rem;
      margin-bottom: 0.8rem;
    }

    & p {
      font-size: 2.4rem;
      font-weight: 500;
      color: var(--color-brand-600);
      margin-bottom: 1.6rem;
    }
  }
`;

const ViewButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
    padding: 0.8rem 1.6rem;
    border: none;
    border-radius: var(--border-radius-sm);
    font-size: 1.4rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    margin: 0 auto;

    &:hover {
      background-color: var(--color-brand-700);
    }
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
    width: 90%;
    max-width: 48rem;
    max-height: 90vh;
    overflow: auto;
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
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
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

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { activities, isLoading } = useTodayActivity();

  if (isLoading) return <Spinner />;

  function handleClick() {
    if (window.innerWidth <= 768) {
      setIsDialogOpen(true);
    }
  }

  return (
    <>
      <StyledToday>
        <Row type="horizontal">
          <Heading as="h2">Today</Heading>
        </Row>

        {/* Mobile Summary */}
        {activities?.length > 0 ? (
          <SummaryBox>
            <h4>Check ins today</h4>
            <p>{activities.length}</p>
            <ViewButton onClick={handleClick}>View check ins</ViewButton>
          </SummaryBox>
        ) : (
          <NoActivity>No activity today...</NoActivity>
        )}

        {/* Desktop View */}
        <div className="activities-container">
          {activities?.length > 0 && (
            <TodayList>
              {activities.map((activity) => (
                <TodayItem activity={activity} key={activity.id} />
              ))}
            </TodayList>
          )}
        </div>
      </StyledToday>

      {/* Mobile Dialog */}
      <Overlay show={isDialogOpen} onClick={() => setIsDialogOpen(false)} />
      <Dialog show={isDialogOpen}>
        <CloseButton onClick={() => setIsDialogOpen(false)}>✕</CloseButton>
        <Heading as="h2">Today&apos;s Check ins</Heading>
        <TodayList>
          {activities.map((activity) => (
            <TodayItem activity={activity} key={activity.id} />
          ))}
        </TodayList>
      </Dialog>
    </>
  );
}

export default TodayActivity;
