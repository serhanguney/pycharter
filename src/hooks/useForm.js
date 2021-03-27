import { useEffect, useState } from "react";
import axios from "axios";
export default function useForm(validate) {
  const [values, setValues] = useState({
    fullName: "",
    mobile: "",
    from: "",
    message: "",
    boat: "Select one",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  }

  function handleFocus(e) {
    console.log(e.target);
    setErrors({ ...errors, [e.target.name]: null });
  }
  useEffect(() => {
    const submit = async () => {
      try {
        const result = await axios.post(
          "https://pacific-stream-49427.herokuapp.com/contact",
          values
        );
        console.log(result);
        setSubmitted(true);
      } catch (err) {
        console.log(err);
        setSubmitted(false);
      }
    };

    if (Object.keys(errors).length === 0 && isSubmitting) {
      submit();
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    handleFocus,
    setValues,
    values,
    errors,
    setErrors,
    submitted,
  };
}
