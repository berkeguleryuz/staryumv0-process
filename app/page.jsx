"use client";

import Image from "next/image";
import { useState } from "react";
import { TbArrowsJoin2 } from "react-icons/tb";
import Snowfall from "react-snowfall";

import {
  AnimatePresence,
  motion,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import Footer from "./components/Footer";

const people = [
  {
    id: 1,
    name: "JOIN NOW",
    designation: "You would see our crypto agency for make partnership",
    href: "https://clodron.com",
  },
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);

  const handleMouseMove = (event) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );

  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 20]),
    springConfig,
  );

  // email

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = useForm();

  const validateEmail = (mail) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(mail);
  };

  const handleOpenModel = () => {
    setIsOpenModel(true);
    setTimeout(() => {
      setIsOpenModel(false);
    }, 4000);
  };

  const onSubmit = async (data) => {
    try {
      let res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify(data.email),
      });
      if (res.ok) {
        handleOpenModel();
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-full w-full p-3 flex items-center justify-center relative z-50">
        <Snowfall
          snowflakeCount={100}
          color="grey"
          style={{
            position: "fixed",
            zIndex: -1,
          }}
          speed={"120"}
          radius={"10"}
        />
        <div className="mt-5">
          <div className="space-y-4">
            <div className="space-y-2 text-center">
              <div className="flex justify-center">
                <Image
                  width={100}
                  height={100}
                  src={"/animated.gif"}
                  alt=""
                  className="w-36"
                />
              </div>
              <div className="flex items-center justify-center">
                <span>⚡️</span>
                <div className="p-[1px] bg-transparent relative">
                  <div className="p-2">
                    <span className="absolute inset-0 px-12 rounded-3xl overflow-hidden">
                      <motion.span
                        className="w-[500px] aspect-square absolute bg-[conic-gradient(from_0deg,transparent_0_340deg,gray_360deg)] opacity-20"
                        initial={{ rotate: -90 }}
                        animate={{
                          rotate: 90,
                        }}
                        transition={{
                          duration: 3.8,
                          ease: "linear",
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        style={{
                          translateX: "-50%",
                          translateY: "-10%",
                          zIndex: -1,
                        }}
                      />
                    </span>
                    <span className="bg-clip-text dark:bg-clip-text dark:bg-gradient-to-l bg-gradient-to-r dark:from-gray-300 dark:to-neutral-700 from-gray-800 to-neutral-800">
                      Add your e-mail to waitlist
                    </span>
                  </div>
                </div>
              </div>
              <h1 className="text-4xl font-bold sm:-text-5xl xl:text-6xl/none bg-clip-text text-transparent dark:bg-gradient-to-r bg-gradient-to-tr dark:from-white from-black to-neutral-200 dark:to-neutral-800 capitalize md:max-w-2xl lg:max-w-3xl mx-auto">
                Join the waitlist!
              </h1>
              <p className="max-w-[600px] leading-7 text-center text-[16px] bg-clip-text text-transparent dark:bg-gradient-to-br bg-gradient-to-br dark:from-white from-black to-neutral-400 dark:to-neutral-700 mx-auto">
                Discover an Array of Incredible Futuristic Technology Exciting
                Wave of New Project on the Horizon. Sign up to our waitlist to
                be notified when we launch!
              </p>
            </div>
            <div className="w-full space-y-1 justify-between">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col lg:flex-row mx-auto lg:space-x-2 max-w-lg">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      placeholder="Email"
                      className={`flex-1 py-2.5 outline-none focus:border-2 focus:border-neutral-100 dark:border bg-opacity-20 shadow-md border border-neutral-400 dark:text-white dark:border-white/20 placeholder:text-neutral-500 pl-5 rounded-lg focus-within:border-none ${
                        isDirty && !isValid
                          ? "bg-[#f5a524]"
                          : isDirty & isValid
                          ? "bg-green-500"
                          : ""
                      }`}
                    />
                  )}
                  rules={{
                    required: "Email is required",
                    validate: (value) =>
                      validateEmail(value || "Invalid email format"),
                  }}
                />
                <button
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-x-3 bg-gradient-to-tr from-black from-50% via-black/40 to-gray-600/40 via-45% border-t-gray-700 disabled:cursor-not-allowed lg:w-36 shadow-md border border-b-0 border-r-0 border-l-0 bg-black mt-4 lg:-mt-0 rounded-md px-2 py-2.5 w-full  text-sm text-gray-200 dark:text-gray-300"
                  type="submit">
                  <TbArrowsJoin2 className="text-[#867761]" />
                  {isSubmitting ? (
                    "loading"
                  ) : (
                    <span className="shrink-0">Join Waitlist</span>
                  )}
                </button>
              </form>
            </div>
            {people.map((testimonial, id) => (
              <div
                className="relative group"
                key={testimonial.name}
                onMouseEnter={() => setHoveredIndex(testimonial.id)}
                onMouseLeave={() => setHoveredIndex(null)}>
                <AnimatePresence mode="wait">
                  {hoveredIndex === testimonial.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 150, scale: 0.6 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 260,
                          damping: 10,
                        },
                      }}
                      exit={{ opacity: 0, y: 150, scale: 0.6 }}
                      style={{
                        translateX: translateX,
                        rotate: rotate,
                        whiteSpace: "nowrap",
                      }}
                      className="absolute hidden lg:flex -top-16 -left1/2 text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2">
                      <div className="absolute hidden lg:flex inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
                      <div className="absolute hidden lg:flex left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
                      <div className="font-bold text-white relative z-30 text-base">
                        {testimonial.name}
                      </div>
                      <div className="text-white text-xs">
                        {testimonial.designation}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex justify-center text-center h-14 rounded-full items-center cursor-pointer">
                  <Link
                    href={testimonial.href}
                    target="_blank"
                    className="items-center text-center">
                    <Image
                      onMouseMove={handleMouseMove}
                      height={100}
                      width={100}
                      src="/staryum.svg"
                      alt={testimonial.name}
                      className="object-cover rounded-sm h-15 dark:w-60 group-hover:scale-105 group-hover:z-30 transition duration-500 flex dark:opacity-100 opacity-0 w-0"
                    />
                    <Image
                      onMouseMove={handleMouseMove}
                      height={100}
                      width={100}
                      src="/staryumblack.svg"
                      alt={testimonial.name}
                      className="object-cover rounded-sm h-15 dark:w-0 group-hover:scale-105 group-hover:z-30 transition duration-500 flex dark:opacity-0 opacity-100 w-60"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg border dark:border-white/10 border-neutral-400 dark:border-opacity-10 relative top-14 sm:top-14 lg:top-24 font-bold max-w-xl mx-auto flex flex-col lg:flex-row justify-between items-center text-sm mb-20">
            <Link
              onClick={() => setIsOpen(true)}
              className=" bg-zinc-700/30 lg:py-1 py-2 px-2 w-full lg:w-fit mt-3 md:mt-3 lg:mt-0 text-center rounded-md  text-white"
              href="/">
              <span>Process about the project</span>
            </Link>
            <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <RecievedModal
              isOpenModel={isOpenModel}
              setIsOpenModel={setIsOpenModel}
            />
            <div>
              <p className=" text-zinc-500  dark:text-zinc-100 mt-2">
                Get ready to redefine your email experience.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const SpringModal = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-black/80  p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll ">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.2,
              stiffness: "20",
              type: "just",
              damping: 100,
            }}
            exit={{ scale: 0 }}
            className="bg-white/20 backdrop-blur-lg  border border-white/10 border-opacity-10 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative ">
            <Image
              width={100}
              height={100}
              className="w-16 absolute right-0 -top-16"
              src="/time.png"
              alt="time"
            />

            <div className="relative z-10">
              <p className="lg:text-justify  leading-6 mb-6">
                We are creating our platform. So some of lucky people might win
                some prizes... Sneak peek: aird👀p?! You must follow our social
                medias and you need to share your e-mail with us.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className=" flex gap-x-3 items-center justify-center lg:justify-start bg-transparent bg-white text-black hover:bg-neutral-300  transition-colors duration-200 dark:text-black font-semibold lg:w-fit w-full py-2 lg:py-1.5 rounded px-8">
                  Got that
                  <Image
                    width={5}
                    height={5}
                    className="w-5"
                    src="/party.png"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
const RecievedModal = ({ isOpenModel, setIsOpenModel }) => {
  return (
    <AnimatePresence>
      {isOpenModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-black/80  p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll ">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.2,
              stiffness: "20",
              type: "just",
              damping: 100,
            }}
            exit={{ scale: 0 }}
            className="bg-white/20 backdrop-blur-lg  border border-white/10 border-opacity-10 text-white p-6 rounded-lg w-full max-w-md shadow-xl cursor-default relative ">
            <Image
              width={300}
              height={300}
              className="w-30 absolute right-0 -top-16"
              src="/staryum.svg"
              alt=""
            />
            <h1 className="text-3xl font-bold text-center">
              You are on the waitlist!
            </h1>

            <div className="relative z-10">
              <p className=" text-center text-md mt-4 mb-6">
                We will send a notification as soon as v0 is ready for you to
                experience
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpenModel(false)}
                  className=" flex justify-center gap-x-3 items-center bg-transparent bg-white text-black hover:bg-neutral-300  transition-colors duration-200 dark:text-black font-semibold w-60 mx-auto py-2 rounded px-8">
                  <span>Wow!</span>
                  <Image
                    width={7}
                    height={7}
                    className="w-7"
                    src="/party.png"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
