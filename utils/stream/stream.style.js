import styled from "styled-components";

export const StreamContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 4%;
    padding: 0 4px;
  }

  .headerTitle {
    color: white;
    font-weight: bold;
  }

  .streamBox {
    background-color: #5b5b5b;
    width: 92%;
    height: 100%;
    max-height: 92%;
    display: flex;
    align-self: center;
    border-radius: 4px;
    /* overflow: hidden; */
    margin-top: 2%;
  }
  .stream_warning {
    color: white;
    font-size: 26px;
    text-align: center;
    padding: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .r1_iframe_embed {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: auto;
    max-height: 100% !important;
    padding-top: 55.25%;
  }

  .r1_iframe_embed video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
  video {
    width: 100%;
    height: 100%;
    max-height: 100% !important;
  }

  @media screen and (max-width: 768px) {
    .streamBox {
      margin-top: 3%;
    }
  }
`;
