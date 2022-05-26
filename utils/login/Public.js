import React, { useState } from "react";
import Axios from "../axios";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";

const Public = () => {
  const [wrongPass, setWrongPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const SecondSchema = Yup.object().shape({
    firstName: Yup.string().required("فیلد اجباری"),
    lastName: Yup.string().required("فیلد اجباری"),
    phoneNumber: Yup.string().required("فیلد اجباری"),
  });
  const submit = (val) => {
    router.push(
      router.query.href +
        `?firstName=${val.firstName}&lastName=${val.lastName}&phoneNumber=${val.phoneNumber}`
    );
  };
  return (
    <Formik
      initialValues={{ mob_number: "", firstName: "", lastName: "" }}
      validationSchema={SecondSchema}
      onSubmit={(values) => {
        console.log("values", values);
        submit(values);
        // checkUser(values);
      }}
    >
      {({ errors, touched, values }) => (
        <Form className="form">
          <div className="header">
            {console.log(errors)}
            <img
              src="/images/inpoint connect logo PNG.png"
              alt="inPoint img"
              width={"50%"}
            />
          </div>

          <div className="w-100">
            <Field
              className="input"
              name="phoneNumber"
              type="tel"
              placeholder="شماره موبایل"
            />
            {errors.mob_number && touched.mob_number && (
              <div className="err">{errors.mob_number}</div>
            )}
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
        </Form>
      )}
    </Formik>
  );
};

export default Public;
