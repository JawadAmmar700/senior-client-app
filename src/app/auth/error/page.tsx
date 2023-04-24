"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

interface PageParams {
  params: {};
  searchParams: {
    error: string;
  };
}

const Page = ({ searchParams: { error } }: PageParams) => {
  return (
    <div className="min-w-screen min-h-screen bg-blue-100 flex items-center p-5 overflow-hidden relative">
      <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
        <div className="w-full md:w-1/2">
          <div className="mb-10 lg:mb-20">
            <div className="flex items-center space-x-2">
              <div className="pl-4 flex items-center">
                <a
                  className=" no-underline flex items-center space-x-2 hover:no-underline font-bold text-2xl lg:text-4xl"
                  href="#"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                  >
                    <path d="M6.98.555a.518.518 0 00-.105.011.53.53 0 10.222 1.04.533.533 0 00.409-.633.531.531 0 00-.526-.418zm6.455.638a.984.984 0 00-.514.143.99.99 0 101.02 1.699.99.99 0 00.34-1.36.992.992 0 00-.846-.482zm-3.03 2.236a5.029 5.029 0 00-4.668 3.248 3.33 3.33 0 00-1.46.551 3.374 3.374 0 00-.94 4.562 3.634 3.634 0 00-.605 4.649 3.603 3.603 0 002.465 1.597c.018.732.238 1.466.686 2.114a3.9 3.9 0 005.423.992c.068-.047.12-.106.184-.157.987.881 2.47 1.026 3.607.24a2.91 2.91 0 001.162-1.69 4.238 4.238 0 002.584-.739 4.274 4.274 0 001.19-5.789 2.466 2.466 0 00.433-3.308 2.448 2.448 0 00-1.316-.934 4.436 4.436 0 00-.776-2.873 4.467 4.467 0 00-5.195-1.656 5.106 5.106 0 00-2.773-.807zm-5.603.817a.759.759 0 00-.423.135.758.758 0 10.863 1.248.757.757 0 00.193-1.055.758.758 0 00-.633-.328zm15.994 2.37a.842.842 0 00-.47.151.845.845 0 101.175.215.845.845 0 00-.705-.365zm-8.15 1.028c.063 0 .124.005.182.014a.901.901 0 01.45.187c.169.134.273.241.432.393.24.227.414.089.534.02.208-.122.369-.219.984-.208.633.011 1.363.237 1.514 1.317.168 1.199-1.966 4.289-1.817 5.722.106 1.01 1.815.299 1.96 1.22.186 1.198-2.136.753-2.667.493-.832-.408-1.337-1.34-1.12-2.26.16-.688 1.7-3.498 1.757-3.93.059-.44-.177-.476-.324-.484-.19-.01-.34.081-.526.362-.169.255-2.082 4.085-2.248 4.398-.296.56-.67.694-1.044.674-.548-.029-.798-.32-.72-.848.047-.31 1.26-3.049 1.323-3.476.039-.265-.013-.546-.275-.68-.263-.135-.572.07-.664.227-.128.215-1.848 4.706-2.032 5.038-.316.576-.65.76-1.152.784-1.186.056-2.065-.92-1.678-2.116.173-.532 1.316-4.571 1.895-5.599.389-.69 1.468-1.216 2.217-.892.387.167.925.437 1.084.507.366.163.759-.277.913-.412.155-.134.302-.276.49-.357.142-.06.343-.095.532-.094zm10.88 2.057a.468.468 0 00-.093.011.467.467 0 00-.36.555.47.47 0 00.557.36.47.47 0 00.36-.557.47.47 0 00-.464-.37zm-22.518.81a.997.997 0 00-.832.434 1 1 0 101.39-.258 1 1 0 00-.558-.176zm21.294 2.094a.635.635 0 00-.127.013.627.627 0 00-.48.746.628.628 0 00.746.483.628.628 0 00.482-.746.63.63 0 00-.621-.496zm-18.24 6.097a.453.453 0 00-.092.012.464.464 0 10.195.908.464.464 0 00.356-.553.465.465 0 00-.459-.367zm13.675 1.55a1.044 1.044 0 00-.583.187 1.047 1.047 0 101.456.265 1.044 1.044 0 00-.873-.451zM11.4 22.154a.643.643 0 00-.36.115.646.646 0 00-.164.899.646.646 0 00.899.164.646.646 0 00.164-.898.646.646 0 00-.54-.28z"></path>
                  </svg>
                  Meetly
                </a>
              </div>
            </div>
          </div>
          <div className="mb-10 md:mb-20 text-gray-600 font-light">
            <h1 className="font-black uppercase text-3xl lg:text-5xl text-yellow-500 mb-10">
              You seem to be lost!
            </h1>
            {error.toLowerCase().includes("email") ? (
              <p>The email you provided doesn't exist.</p>
            ) : (
              <p>The password you provided is incorrect.</p>
            )}
            <p>
              Try signing up{" "}
              <Link href="/auth/signup" className="link link-accent">
                sign up
              </Link>{" "}
              or use the Go Back button sign in.
            </p>
          </div>
          <div className="mb-20 md:mb-0">
            <Link
              href="/auth/signin"
              className="text-lg font-light outline-none focus:outline-none transform transition-all hover:scale-110 text-yellow-500 hover:text-yellow-600"
            >
              {" "}
              Go Back
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-[300px] text-center relative">
          <Image src="/svgs/error-hero.svg" alt="error-hero" fill />
        </div>
      </div>
      <div className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
      <div className="w-96 h-full bg-yellow-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
    </div>
  );
};

export default Page;
