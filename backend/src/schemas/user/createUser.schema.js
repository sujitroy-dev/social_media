import * as Yup from "yup";

export const createUserSchema = Yup.object({
  body: Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    username: Yup.string().required("username is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("password is required")
      .min(8, "Password must contain 8 or more characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
  }),
});
