import styled from "styled-components";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.8rem;
    padding: 0 0.8rem;

    & > * {
      font-size: 1.2rem;
      padding: 0.4rem 0.8rem;
      white-space: nowrap;
    }
  }
`;

export default TableOperations;
