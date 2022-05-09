import React, { useState } from "react";
import Axios from "../axios";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const Public = () => {
  const [wrongPass, setWrongPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const checkUser = async (val) => {
    try {
      setLoading(true);
      const res = await Axios.post("v1/auth/login", {
        user_name: val.user_name,
        password: val.password,
      });
      window.sessionStorage.setItem("token", res.data.data.access_token);
      window.sessionStorage.setItem("name", val.user_name);
      const res2 = await Axios.get("v1/user", {
        headers: {
          Authorization: `Bearer ${res.data.data.access_token}`,
        },
      });
      window.sessionStorage.setItem("role", res2.data.data.roles[0].name);
      if (res2.data.data.roles[0].name === "TEACHER") {
        const res3 = await Axios.get("v1/class/teacher", {
          headers: {
            Authorization: `Bearer ${res.data.data.access_token}`,
          },
        });
        router.push(`/class/${res3.data.data[res3.data.data.length - 1].id}`);
      } else if (
        props.history[props.history.length - 2] &&
        props.history[props.history.length - 2].includes("class/")
      ) {
        router.push(props.history[props.history.length - 2]);
      } else {
        alert("لطفا از طریق لینک کلاس وارد شوید");
        // router.push("/class");
      }
    } catch (err) {
      setWrongPass(true);
      console.log("err", err);
      setLoading(false);
    }
  };
  const FirstSchema = Yup.object().shape({
    mob_number: Yup.string()
      .min(11, "باید ۱۱ رقم باشد")
      .max(11, "باید ۱۱ رقم باشد")
      .required("فیلد اجباری"),
  });
  const SecondSchema = Yup.object().shape({
    firstName: Yup.string().required("فیلد اجباری"),
    lastName: Yup.string().required("فیلد اجباری"),
  });
  return step === 1 ? (
    <Formik
      initialValues={{ mob_number: "" }}
      validationSchema={FirstSchema}
      onSubmit={(values) => {
        console.log("values", values);
        // checkUser(values);
        setStep(2);
      }}
    >
      {({ errors, touched, values }) => (
        <Form className="form">
          {console.log(errors, loading)}
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
              name="mob_number"
              type="tel"
              placeholder="شماره موبایل"
            />
            {errors.mob_number && touched.mob_number && (
              <div className="err">{errors.mob_number}</div>
            )}
          </div>

          <label className="w-100 err">
            {/* {wrongPass ? "نام کاربری یا رمز عبور صحیح نیست" : null} */}
            <button
              // disabled={loading}
              className="button w-100"
              type="submit"
            >
              ورود
            </button>
          </label>
          <div
            onClick={() => window.open("tel:09010187117")}
            className="supportText"
          >
            تماس با پشتیبانی : 09010187117
          </div>
        </Form>
      )}
    </Formik>
  ) : (
    <Formik
      initialValues={{ firstName: "", lastName: "" }}
      validationSchema={SecondSchema}
      onSubmit={(values) => {
        console.log("values", values);
      }}
    >
      {({ errors, touched, values }) => (
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
              name="firstName"
              type="text"
              placeholder="نام"
            />
            {errors.firstName && touched.firstName && (
              <div className="err">{errors.firstName}</div>
            )}
          </div>
          <div className="w-100">
            <Field
              className="input"
              name="lastName"
              value={values.lastName}
              placeholder="نام خانوادگی"
              type="text"
            />
            {errors.lastName && touched.lastName && (
              <div className="err">{errors.lastName}</div>
            )}
          </div>

          <label className="w-100 err">
            {/* {wrongPass ? "نام کاربری یا رمز عبور صحیح نیست" : null} */}
            <button
              // disabled={loading}
              className="button w-100"
              type="submit"
            >
              ورود
            </button>
          </label>
          <div
            onClick={() => window.open("tel:09010187117")}
            className="supportText"
          >
            تماس با پشتیبانی : 09010187117
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Public;
