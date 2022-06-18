import styled from "styled-components";

export const FiltersContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  padding: 8px;

  .switchContainer {
    display: flex;
    flex-direction: row;
    direction: rtl;
  }

  .label {
    color: white;
    font-size: 14px;
  }

  .switch {
    direction: rtl;
  }

  .links {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .link {
    color: #ccc;
    font-weight: bold;
    font-size: 12px;
    padding: 4px 16px;
    border: 2px solid #ccc;
    border-radius: 4px;
    min-width: 102px;
    width: 102px;
  }

  .link:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    .links {
      margin-top: 6px;
    }
  }
`;
