import React, { useState, useEffect, useLayoutEffect } from "react";
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
  const [forStudent, setForStudent] = useState();
  const [studentUserPassMode, setStudentUserPassMode] = useState(false);
  useLayoutEffect(() => {
    if (!!forStudent !== !!router.query.forStudent)
      setForStudent(!!router.query.forStudent);
  }, [router.query]);
  return (
    <LoginContainer colors={colors}>
      <Row>
        <Head>
          <title>غرب‌آنلاین کانکت-ورود</title>
          <link
            rel="shortcut icon"
            href="/images/inpoint connect logo PNG.png"
          />
        </Head>
        <Container className="container" fluid>
          <div className="col-sm-12 col-md-10 orangeBox d-none d-md-block">
            <img className="img" src={pic.src} alt="لوگو" />
            <p className="heading">غرب‌آنلاین کانکت</p>
            <p className="caption">
              پلتفرم اختصاصی برگزاری کلاس و همایش های آنلاین
            </p>
            <p
              style={{
                position: "absolute",
                width: "100%",
                bottom: "10px",
                color: "#ccc",
              }}
            >
              کلیه حقوق مادی و معنوی پلتفرم متعلق به آموزشگاه غرب‌آنلاین می باشد
            </p>
          </div>
          <div className="col-md-2 whiteBox">
            <div className={"boxContainer"}>
              {router.query.forStudent ? (
                router.query.type && router.query.type?.trim() === "FREE" ? (
                  <Public />
                ) : studentUserPassMode ? (
                  <UserPass
                    setStudentUserPassMode={setStudentUserPassMode}
                    isStudent={forStudent}
                  />
                ) : (
                  <OTP setStudentUserPassMode={setStudentUserPassMode} />
                )
              ) : (
                <UserPass isStudent={forStudent} />
              )}

              {/* <Public /> */}
            </div>
          </div>
        </Container>
      </Row>
    </LoginContainer>
  );
};

export default Login;
