import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { FaTasks } from "react-icons/fa";
import { BsChatQuote } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import logo from "../assets/logo.png";
import prizewheel from "../assets/prize-wheel.png";

export default function HomePage() {
  return (
    <>
      <Header />
      <section className="py-24 bg-white overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="md:max-w-4xl mb-16 md:mb-20">
            <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-customOrange bg-green-100 font-medium uppercase rounded-full shadow-sm">
              Chores and Healthy Habits tracker
            </span>
            <h1 className="mb-4 text-3xl md:text-4xl leading-tight font-bold tracking-tighter">
              Track Assigned and Completed Chores
            </h1>
            <p className="text-lg md:text-xl text-coolGray-500 font-medium">
              Kids and Parents can see expectations for the week
            </p>
          </div>
          <div className="flex flex-wrap lg:items-center -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
              <div className="flex flex-wrap p-8 text-center md:text-left hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                <div className="w-full md:w-auto mb-6 md:mb-0 md:pr-6">
                  <div className="inline-flex h-14 w-14 mx-auto items-center justify-center text-white bg-customOrange rounded-lg">
                    <FaTasks />
                  </div>
                </div>
                <div className="w-full md:flex-1 md:pt-3">
                  <h3 className="mb-4 text-xl md:text-2xl leading-tight text-coolGray-900 font-bold">
                    Make Responsibilities Fun!
                  </h3>
                  <p className="text-coolGray-500 font-medium">
                    Kids earn super rewards from points collected from doing a
                    super good job
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap p-8 text-center md:text-left hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                <div className="w-full md:w-auto mb-6 md:mb-0 md:pr-6">
                  <div className="inline-flex h-14 w-14 mx-auto items-center justify-center text-white bg-customOrange rounded-lg">
                    <BsChatQuote />
                  </div>
                </div>
                <div className="w-full md:flex-1 md:pt-3">
                  <h3 className="mb-4 text-xl md:text-2xl leading-tight text-coolGray-900 font-bold">
                    Get Inspired!
                  </h3>
                  <p className="text-coolGray-500 font-medium">
                    A daily inspiration quote can help set the motivational mood
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap p-8 text-center md:text-left hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                <div className="w-full md:w-auto mb-6 md:mb-0 md:pr-6">
                  <div className="inline-flex h-14 w-14 mx-auto items-center justify-center text-white bg-customOrange rounded-lg">
                    <FaRegStar />
                  </div>
                </div>
                <div className="w-full md:flex-1 md:pt-3">
                  <h3 className="mb-4 text-xl md:text-2xl leading-tight text-coolGray-900 font-bold">
                    Rewards for Life!
                  </h3>
                  <p className="text-coolGray-500 font-medium">
                    taking control of healthy habits and responsibities nurtures
                    development, healthy lifestyles, confidence, and so much
                    more
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <div className="relative mx-auto md:mr-0 max-w-max">
                <img className="w-[50vw]" src={prizewheel} alt="logo image" />
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <section className="relative py-24 md:pb-32 bg-white overflow-hidden">
        <div className="relative container px-4 mx-auto">
          <div className="xl:max-w-4xl mb-18 md:mb-16 mx-auto text-center">
            <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-customOrange bg-green-100 font-medium uppercase rounded-full shadow-sm">
              Take Action
            </span>
            <h1 className="mb-4 text-3xl md:text-4xl leading-tight font-heading font-bold">
              Kids will love destroying tasks, conquering goals, and getting
              super hero points!
            </h1>

            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-7 py-3 h-14 w-full md:w-auto text-lg leading-7 text-green-50 bg-customOrange hover:bg-orange-400 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-transparent rounded-md shadow-sm"
            >
              Let's Go!
            </Link>
          </div>
          <div className="relative max-w-xl mx-auto">
            <img className="relative w-[100%]" src={logo} alt="landing" />
          </div>
        </div>
      </section>
    </>
  );
}
