import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import LoginContainer from "../../styles/login.style";
import { colors } from "../../utils/config";
import Axios from "../../utils/axios";
import { Container, Row } from "react-bootstrap";
import pic from "../../public/images/Pic.png";
import UserPass from "../../utils/login/UserPass";
import OTP from "../../utils/login/OTP";
import Public from "../../utils/login/Public";
const Login = (props) => {
  const [test, setTest] = useState();
  const router = useRouter();
  const [mode, setMode] = useState(1);

  return (
    <LoginContainer colors={colors}>
      <Row>
        <Head>
          <title>این‌پوینت کانکت</title>
          <link
            rel="shortcut icon"
            href="/images/inpoint connect logo PNG.png"
          />
        </Head>
        <Container className="container" fluid>
          <div className="col-sm-12 col-md-10 orangeBox">
            <img className="img" src={pic.src} alt="لوگو" />
            <p className="heading">غرب‌آنلاین کانکت</p>
            <p className="caption">
              پلتفرم اختصاصی برگذاری کلاس و همایش های آنلاین
            </p>
          </div>
          <div className="d-none d-md-flex col-md-2 whiteBox">
            <div className={"boxContainer"}>
              {mode === 1 ? (
                <UserPass setMode={setMode} />
              ) : mode === 2 ? (
                <OTP setMode={setMode} />
              ) : (
                <Public />
              )}
            </div>
          </div>
        </Container>
      </Row>
    </LoginContainer>
  );
};

export default Login;
