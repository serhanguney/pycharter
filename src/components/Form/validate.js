export default function validate(values) {
  let errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Your name is required";
  }

  if (!values.from) {
    errors.from = "Your email is required";
  }
  if (values.boat === "Select one") {
    errors.boat = "Boat selection is required";
  }

  return errors;
}
