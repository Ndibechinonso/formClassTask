import { useFormik } from "formik";
import * as Yup from "yup";
import { http } from "../utils/http";
import { nanoid } from "nanoid";
import { useState } from "react";
import { firstLetterIncaps } from "../utils/helpers";
const Form = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required()
        .test("is-fullname", (value) => {
          const fullName = value.split(" ");
          return fullName.length > 1;
        }),
      email: Yup.string().required().email(),
      subject: Yup.string(),
      message: Yup.string().required(),
    }),
    onSubmit: async (values, helpers) => {
      setSubmitted(true);
      setLoading(true);
      const id = nanoid();
      const valuesWithId = { ...values, id };
      const response = await http.makePost("POST", valuesWithId);
      if (response.id) {
        setLoading(false);
      }
      helpers.resetForm(formik.initialValues)
      setTimeout(()=>{
        setSubmitted(false);

    }, 5000)
      //  console.log(response, "res");
    },
  });
  return (
    <div className="form_container">
  
      <form className="form" onSubmit={formik.handleSubmit}>
      {submitted && (
        <div style={{ background: "green", display: "flex" ,justifyContent: "space-between", padding: "10px"}}>
          <div className="white">Form submitted Successfully</div>{" "}
         <div style={{display: "inline"}}> <button onClick={() => setSubmitted(false)}>*</button></div>
        </div>
      )}
        <div className="form-div">
          <label htmlFor="name">{firstLetterIncaps("NAME")}</label>
          <input
            type="text"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <span className="danger">{formik.errors.name}</span>
          )}
        </div>

        
        <div className="form-div">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <span className="danger">{formik.errors.email}</span>
          )}
        </div>
        <div className="form-div">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-div">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={formik.values.message}
            onChange={formik.handleChange}
          ></textarea>
          {formik.errors.message && formik.touched.message && (
            <span className="danger">{formik.errors.message}</span>
          )}
        </div>
<div className="contact_button">
<button disabled={loading} type="submit">Submit</button>

</div>
      </form>
    </div>
  );
};

export default Form;
