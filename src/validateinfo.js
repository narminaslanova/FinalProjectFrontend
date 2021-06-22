export default function validateInfo(values) {
  let errors = {};

  //First Name
  if (!values.firstName.trim()) {
    errors.firstName = "First Name is required";
  }
  //Last Name
  if (!values.lastName.trim()) {
    errors.lastName = "Last Name is required";
  }
  //Email
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  //Password
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password should be 6 or more characters";
  }
  //Confirm Password
  if (!values.password2) {
    errors.password2 = "Password is required";
  } else if (values.password2 !== values.password) {
    errors.password2 = "Passwords do not match";
  }

  return errors;
}
