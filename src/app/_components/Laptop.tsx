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
      <div className="max-w-screen-xl mx-auto px-8 flex items-center justify-between">



        <div className="max-w-xl">

          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            A Productivity System Built for ADHD <br /> Minds :
          </h1>

          <p className="my-6 text-lg">
            We simplify your tasks to fit the way you think

          </p>

          <ul className='ms-5 list'>
            <li className="mb-2 font-semi-bold"> We give you clear summaries of your study material.</li>
            <li className="mb-2 font-semi-bold">We show you the key highlights.</li>
            <li className="mb-2 font-semi-bold">We give you quick quizzes after each material.</li>
          </ul>


          <p></p>



        </div>

        <div className="w-[500px] self-end ">


          <Link href="/" >
            <Image src={img1} alt='img' width={500}
              height={500}
              className="object-cover" />
          </Link>



        </div>

      </div>
    </section>
  );
}
