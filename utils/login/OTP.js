import React, { useState } from "react";
import Axios from "../axios";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import OtpInput from "react-otp-input";
import { useRouter } from "next/router";

const OTP = (props) => {
  const [wrongPass, setWrongPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState();
  const router = useRouter();
  const stepOneHandler = async (val) => {
    try {
      setLoading(true);

      const res = await Axios.post("v1/auth/otp/step1", {
        phone_number: val.mob_number,
      });
      setPhone(val.mob_number);
      setStep(2);
      setLoading(false);
    } catch (err) {
      // setWrongPass(true);
      // console.log("err", err);
      setLoading(false);
    }
  };
  const stepTwoHandler = async (values) => {
    try {
      const res = await Axios.post("/v1/auth/otp/step2", {
        phone_number: phone,
        code: values.verifyCode,
      });
      const res2 = await Axios.get("v1/user", {
        headers: {
          Authorization: `Bearer ${res.data.data.access_token}`,
        },
      });
      window.sessionStorage.setItem("token", res.data.data.access_token);
      window.sessionStorage.setItem(
        "name",
        res2.data.data.first_name + " " + res2.data.data.last_name
      );
      window.sessionStorage.setItem("role", res2.data.data.roles[0].name);
      if (res2.data.data.roles[0].name === "TEACHER") {
        alert("شما مجاز به استفاده از این بخش نیستید");
        return;
      } else if (router.query.forStudent && router.query.href) {
        router.push(router.query.href);
      } else {
        alert("لطفا از طریق لینک کلاس وارد شوید");
        // router.push("/class");
      }
    } catch (err) {
      console.error(err);
      setWrongPass(true);
    }
  };
  const FirstSchema = Yup.object().shape({
    mob_number: Yup.string()
      .min(11, "باید ۱۱ رقم باشد")
      .max(11, "باید ۱۱ رقم باشد")
      .required("فیلد اجباری"),
  });
  const SecondSchema = Yup.object().shape({
    verifyCode: Yup.string()
      .min(6, "باید ۶ رقم باشد")
      .max(6, "باید ۶ رقم باشد")
      .required("فیلد اجباری"),
  });
  return step === 1 ? (
    <Formik
      initialValues={{ mob_number: "" }}
      validationSchema={FirstSchema}
      onSubmit={(values) => {
        stepOneHandler(values);
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
          <label className="w-100 err">
            {/* {wrongPass ? "نام کاربری یا رمز عبور صحیح نیست" : null} */}
            <div
              // disabled={loading}
              className="switchMode w-100"
              onClick={() => props.setStudentUserPassMode(true)}
            >
              ورود با رمز عبور ثابت
            </div>
          </label>
        </Form>
      )}
    </Formik>
  ) : (
    <Formik
      initialValues={{ verifyCode: "" }}
      validationSchema={SecondSchema}
      onSubmit={(values) => {
        console.log("values", values);
        stepTwoHandler(values);
      }}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form className="form">
          <div className="header">
            <img
              src="/images/inpoint connect logo PNG.png"
              alt="inPoint img"
              width={"50%"}
            />
          </div>

          {step !== 1 && (
            <div className="w-100">
              {/* <Field
                type="number"
                name="verifyCode"
                autoComplete="off"
                placeholder="کد تایید"
              /> */}
              <OtpInput
                value={values.verifyCode}
                className="otpinput"
                onChange={(val) => setFieldValue("verifyCode", val)}
                numInputs={6}
              />
              {errors.verifyCode && touched.verifyCode && (
                <div className="err">{errors.verifyCode}</div>
              )}
            </div>
          )}

          <label className="w-100 err">
            {wrongPass ? "کد وارد شده صحیح نیست" : null}
            <button
              // disabled={loading}
              className="button w-100"
              type="submit"
            >
              ورود
            </button>
          </label>
          <span
            style={{
              fontSize: 12,
              textAlign: "right",
              marginTop: 8,
              marginRight: 4,
              cursor: "pointer",
            }}
            onClick={() => setStep(1)}
          >
            ویرایش شماره
          </span>
        </Form>
      )}
    </Formik>
  );
};

export default OTP;
