"use client";
import { githubSingin, googleSingin } from "@/utils/auth";
import { Input, Button, Typography, Tooltip } from "@material-tailwind/react";
import Link from "next/link";

export function SignIn() {
  return (
    <section className="h-screen w-screen flex gap-4">
      <div className="w-full lg:w-3/5 mt-28">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Sing In
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email and password to Sign In.
          </Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-5">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Email or Username
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button className="mt-6" fullWidth>
            Sign In
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
            Not registered?
            <Link href="/auth/sign-up" className="text-gray-900 ml-1">
              Create account
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
