import React, { useState } from "react";
import Axios from "../axios";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";

const UserPass = (props) => {
  const [wrongPass, setWrongPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [netErr, setNetErr] = useState(false);

  const router = useRouter();
  const checkUser = async (val) => {
    try {
      setLoading(true);
      const res = await Axios.post("v1/auth/login", {
        user_name: val.user_name,
        password: val.password,
      });
      window.sessionStorage.setItem("token", res.data.data.access_token);

      const res2 = await Axios.get("v1/user", {
        headers: {
          Authorization: `Bearer ${res.data.data.access_token}`,
        },
      });
      window.sessionStorage.setItem(
        "name",
        res2.data.data.first_name + " " + res2.data.data.last_name
      );
      window.sessionStorage.setItem("role", res2.data.data.roles[0].name);
      window.sessionStorage.setItem("userId", res2.data.data.id);
      if (props.isStudent && res2.data.data.roles[0].name === "TEACHER") {
        alert("شما مجاز به استفاده از این بخش نیستید");
        return;
      } else if (
        !props.isStudent &&
        res2.data.data.roles[0].name === "TEACHER"
      ) {
        const res3 = await Axios.get("v1/class/teacher", {
          headers: {
            Authorization: `Bearer ${res.data.data.access_token}`,
          },
        });
        router.push(`/class/${res3.data.data[res3.data.data.length - 1].id}`);
      } else if (router.query.forStudent && router.query.href) {
        router.push(router.query.href);
      } else {
        alert("لطفا از طریق لینک کلاس وارد شوید");
        // router.push("/class");
      }
    } catch (err) {
      if (err.message === "Network Error") {
        setNetErr(true);
      } else {
        setWrongPass(true);
      }
      console.log("err", err);
      setLoading(false);
    }
  };
  const SignupSchema = Yup.object().shape({
    password: Yup.string().required("فیلد اجباری"),
    user_name: Yup.string().required("فیلد اجباری"),
  });
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // console.log("values", values);
        // setTest(values);
        checkUser(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="form">
          <div className="header">
            <img
              src="/images/inpoint connect logo PNG.png"
              alt="inPoint img"
              width={"50%"}
            />
          </div>

          <div className="w-100">
            <Field
              className="input"
              name="user_name"
              type="text"
              placeholder="نام کاربری"
            />
            {errors.user_name && touched.user_name && (
              <div className="err">{errors.user_name}</div>
            )}
          </div>
          <div className="w-100">
            <Field
              placeholder="رمز عبور"
              type={"password"}
              className="input"
              name="password"
            />
            {errors.password && touched.password && (
              <div className="err">{errors.password}</div>
            )}
          </div>

          <label className="w-100 err">
            {wrongPass ? "نام کاربری یا رمز عبور صحیح نیست" : null}
            {netErr && "اتصال اینترنت دستگاه را مجددا چک کنید"}
            <button
              // disabled={loading}
              className="button w-100"
              type="submit"
            >
              ورود
            </button>
          </label>
          <label className="w-100 err">
            {props.isStudent && (
              <div
                // disabled={loading}
                className="switchMode w-100"
                onClick={() => props.setStudentUserPassMode(false)}
              >
                ورود با شماره موبایل
              </div>
            )}
          </label>
        </Form>
      )}
    </Formik>
  );
};

export default UserPass;
