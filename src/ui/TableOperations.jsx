import styled from "styled-components";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;

    & > * {
      font-size: 1.2rem;
      padding: 0.6rem 1rem;
    }
  }
`;

export default TableOperations;
