"use client";
import { githubSingin, googleSingin } from "@/utils/auth";
import { Input, Button, Typography, Tooltip } from "@material-tailwind/react";
import Link from "next/link";
import { authApi } from "@/api";
import { useFormik } from "formik";
import { useState } from "react";
import { signupSchema } from "@/schemas";
import { toast } from "sonner";

export function SignIn() {
  const [loading, setLoading] = useState(false);
  /*
  todo:
    * implement formik
    * integrate the authApi
  */
  const initialValues = {
    first_name: null,
    last_name: null,
    username: null,
    email: null,
    password: null,
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        setLoading(true);
        const promise = () =>
          new Promise(async (resolve, reject) => {
            try {
              const response = await authApi(values);
              console.log(response);
              // setLoading(true)
              resolve(response);
            } catch (error) {
              reject(error);
            }
          });
        toast.promise(promise, {
          loading: "Loading...",
          success: "Sign in successfully",
          error: "Failed to sing in",
        });
        return promise;
      } catch (error) {
        console.error("Error occured", error);
      }
    },
  });
  return (
    <section className="my-10 xl:my-0 2xl:h-screen w-screen flex gap-4">
      <div className="w-full lg:w-3/5 mt-4 xl:mt-14 overflow-y-auto">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Join Us Today
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your below details to register.
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-5">
            <div className="grid 2xl:grid-cols-2 gap-3">
              <div className="flex flex-col gap-5">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  First Name
                </Typography>
                <div>
                  <Input
                    size="lg"
                    placeholder="Liam"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onBlur={formik.handleBlur}
                    name="first_name"
                    defaultValue={formik.values.first_name}
                    error={
                      formik.touched.first_name && formik.errors.first_name
                    }
                  />
                  {formik.touched.first_name && (
                    <div className="text-sm text-red-500 mt-2">
                      {formik.errors.first_name}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  Last Name
                </Typography>
                <div>
                  <Input
                    size="lg"
                    placeholder="Doodler"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onBlur={formik.handleBlur}
                    name="last_name"
                    defaultValue={formik.values.last_name}
                    error={formik.touched.last_name && formik.errors.last_name}
                  />
                  {formik.touched.last_name && (
                    <div className="text-sm text-red-500 mt-2">
                      {formik.errors.last_name}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Username
            </Typography>
            <div>
              <Input
                size="lg"
                placeholder="liamdoodler"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onBlur={formik.handleBlur}
                name="username"
                defaultValue={formik.values.username}
                error={formik.touched.username && formik.errors.username}
              />
              {formik.touched.username && (
                <div className="text-sm text-red-500 mt-2">
                  {formik.errors.username}
                </div>
              )}
            </div>
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Email
            </Typography>
            <div className="">
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onBlur={formik.handleBlur}
                name="email"
                defaultValue={formik.values.email}
                error={formik.touched.email && formik.errors.email}
              />
              {formik.touched.email && (
                <div className="text-sm text-red-500 mt-2">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Password
            </Typography>
            <div className="">
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onBlur={formik.handleBlur}
                name="password"
                defaultValue={formik.values.password}
                error={formik.touched.password && formik.errors.password}
              />
              {formik.touched.password && (
                <div className="text-sm text-red-500 mt-2">
                  {formik.errors.password}
                </div>
              )}
            </div>
          </div>
          <Button className="mt-6 flex items-center justify-center" fullWidth>
            {loading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2 h-4 w-4 animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
              </svg>
            )}
            Register
          </Button>
          <div className="space-y-4 mt-8">
            <Button
              size="lg"
              color="white"
              className="flex items-center gap-2 justify-center shadow-md"
              fullWidth
              onClick={googleSingin}
            >
              <img src="/img/logo/google.svg" height={20} width={20} alt="" />
              <span>Sign in With Google</span>
            </Button>
            <Tooltip content="Coming soon">
              <div>
                <Button
                  size="lg"
                  color="white"
                  className="flex items-center gap-2 justify-center shadow-md"
                  fullWidth
                  onClick={githubSingin}
                  disabled
                >
                  <img
                    src="/img/logo/github.svg"
                    height={20}
                    width={20}
                    alt=""
                  />
                  <span>Sign in With GitHub</span>
                </Button>
              </div>
            </Tooltip>
          </div>
          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            Already have an account?
            <Link href="/auth/sign-in" className="text-gray-900 ml-1">
              Sing in
            </Link>
          </Typography>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.jpg"
          className="h-full w-full object-cover rounded-s-3xl"
        />
      </div>
    </section>
  );
}

export default SignIn;
