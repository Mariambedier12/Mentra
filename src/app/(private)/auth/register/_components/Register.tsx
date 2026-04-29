"use client";

import React from 'react'
import Image from "next/image";
import img from '../../../../../assets/signup.png'
import person from '../../../../../assets/person.png'
import email from '../../../../../assets/msg.png'
import lock from '../../../../../assets/secure.png'
import Link from 'next/link';
import { useRouter } from "next/navigation";

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

import { registerSchema, registerSchemaForm } from '@/schema/register.schema';

export default function Page() {

  const router = useRouter();

  const form = useForm<registerSchemaForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });

  async function onSubmit(data: registerSchemaForm) {
    try {

      const newData = {
        userName: data.name,
        displayName: data.name,
        email: data.email,
        password: data.password,
        age: 16,
      };

      console.log("SENDING:", newData);

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });

      const result = await res.json();

      console.log("FRONT RESPONSE:", result);


      if (res.ok) {
        toast.success('Account created successfully!');

        setTimeout(() => {
          router.push('/auth/login');
        }, 1000);

      } else {
        toast.error(result.message || 'Registration failed');
      }

    } catch (error) {
      console.log("FRONT ERROR:", error);
      toast.error('Account already exist');
    }
  }

  return (
    <div className='bg-[#091A58] min-h-screen flex flex-col'>

      <section className="flex-1 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-28">

          {/* IMAGE */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src={img}
              alt="illustration"
              className="w-[85%] sm:w-[75%] md:w-[65%] lg:w-full max-w-lg object-contain"
            />
          </div>

          {/* FORM */}
          <div className="w-full lg:w-1/2 flex justify-center">

            <div className="w-full max-w-md bg-[#FAF9F7] rounded-4xl shadow-2xl p-8 md:p-12 min-h-[550px] flex flex-col justify-between">

              <div className="flex items-center gap-3 mb-8">
                <button
                  onClick={() => {
                    if (window.history.length > 1) {
                      router.back();
                    } else {
                      router.push("/");
                    }
                  }}
                  className="text-[#1E1E1E] cursor-pointer text-2xl font-bold"
                >
                  ←
                </button>

                <h1 className="text-3xl font-bold text-[#1E1E1E]">
                  Sign up
                </h1>
              </div>

              {/* FORM */}
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* NAME */}
                <div>
                  <label className="block mb-2 text-md font-semibold text-[#404043]">
                    Name
                  </label>

                  <div className="relative">
                    <Image src={person} alt="icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                    <input
                      type="text"
                      {...form.register("name")}
                      className="w-full pl-11 p-3.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#091A58]"
                      required
                      placeholder="Name"
                    />
                  </div>

                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block mb-2 text-md font-bold text-[#404043]">
                    Email
                  </label>

                  <div className="relative">
                    <Image src={email} alt="icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                    <input
                      type="email"
                      {...form.register("email")}
                      className="w-full pl-11 p-3.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#091A58]"
                      required
                      placeholder="your email@example.com"
                    />
                  </div>

                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block mb-2 text-md font-bold text-[#404043]">
                    Password
                  </label>

                  <div className="relative">
                    <Image src={lock} alt="icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                    <input
                      type="password"
                      {...form.register("password")}
                      className="w-full pl-11 p-3.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#091A58]"
                      required
                      placeholder="••••••••"
                    />
                  </div>

                  {form.formState.errors.password && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                {/* CHECKBOX */}
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 w-4 h-4" required />
                  <p className="text-sm text-[#404043]">
                    I agree to the{" "}
                    <span className="text-[#5690D1] font-semibold cursor-pointer">
                      Terms and Conditions
                    </span>
                  </p>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="w-full bg-[#091A58] text-xl text-white py-3.5 rounded-full hover:opacity-90 transition cursor-pointer"
                >
                  Sign Up
                </button>

                {/* LOGIN */}
                <p className="text-sm text-[#404043] text-center pt-2">
                  Already a member?{" "}
                  <Link href="/auth/login" className="text-[#091A58] font-semibold">
                    Log In
                  </Link>
                </p>

              </form>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}