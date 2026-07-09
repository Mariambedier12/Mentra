import React from 'react'
import Image from "next/image";
import Link from 'next/link';
import img1 from '../../assets/lp.png'

export default function Laptop() {
  return (
    <section
      className="w-full  py-10"
      style={{
        background:
          "linear-gradient(-270deg, #F9F9F9 40%, #8C8C8C 130%)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">



        <div className="max-w-xl flex flex-col items-center lg:items-start">

          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            A Productivity System Built for ADHD <br /> Minds :
          </h1>

          <p className="my-6 text-lg">
            We simplify your tasks to fit the way you think

          </p>

          <ul className='ms-5 list text-left list-inside md:list-outside'>
            <li className="mb-2 font-semi-bold"> We give you clear summaries of your study material.</li>
            <li className="mb-2 font-semi-bold">We show you the key highlights.</li>
            <li className="mb-2 font-semi-bold">We give you quick quizzes after each material.</li>
          </ul>



          <p></p>



        </div>

        <div className="w-full max-w-[500px] flex justify-center lg:justify-end">


          <Link href="/" className="w-full">
            <Image src={img1} alt='img' width={500}
              height={500}
              className="object-cover w-full h-auto" />
          </Link>



        </div>

      </div>
    </section>
  );
}
