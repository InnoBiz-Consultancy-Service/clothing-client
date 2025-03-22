"use client";

import "../Footer/Footer.css";
import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      {/* Newsletter section */}
      <div className="w-full py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center">
              <p className="text-gray-400 text-sm">SUBSCRIBE TO OUR</p>
              <h2 className="text-2xl font-bold">OUR NEWSLETTER</h2>
              <p className="text-gray-400">
                Stay updated with our latest styles and seasonal collections
              </p>
            </div>
            <div className="mt-4  md:mt-0 w-full md:w-1/2">
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 rounded-l-full text-white border"
                />
                <button
                  type="submit"
                  className="bg-[#FFB627] text-[#1A1A1A] cursor-pointer px-6 py-2 rounded-r-full font-bold transition-colors duration-300"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-400">QUICK LINKS</h3>
            <ul>
              <li className="mb-3">
                <Link href="/" className="inline-block">
                  <span className="text-red-500 mr-2 font-bold">›</span>
                  <span className="hover-link">Home</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link href="/" className="inline-block">
                  <span className="text-red-500 mr-2 font-bold">›</span>
                  <span className="hover-link">About us</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link href="/" className="inline-block">
                  <span className="text-red-500 mr-2 font-bold">›</span>
                  <span className="hover-link">Collections</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link href="/" className="inline-block">
                  <span className="text-red-500 mr-2 font-bold">›</span>
                  <span className="hover-link">Terms of service</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link href="/" className="inline-block">
                  <span className="text-red-500 mr-2 font-bold">›</span>
                  <span className="hover-link">Privacy policy</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-red-400">CONTACT US</h3>
            <p className="mb-2">Innobiz Consultancy</p>
            <p className="mb-2">Dhaka, Bangladesh</p>
            <p className="mb-2">Bangladesh</p>
            <p className="mb-2">
              <span className="font-bold text-red-400">Phone:</span>{" "}
              5484150236521
            </p>
            <p className="mb-2">
              <span className="font-bold text-red-400">Email:</span>
              <a
                href="mailto:support@stylishthreads.com"
                className="ml-1 hover:text-red-400 transition-colors duration-300"
              >
                support@innobiz.com
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-400">
              About Stylish Threads
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Elevate your wardrobe with our premium clothing collections. From
              casual comfort to elegant formal wear, we offer stylish options
              for every occasion with sustainable materials and ethical
              manufacturing.
            </p>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="bg-gray-900 py-4 text-center md:text-left">
        <div className="container mx-auto px-4 pb-8">

          <div className="flex flex-row justify-center items-center gap-6 pt-6 text-3xl">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaX />
          </div>
          <div className="flex flex-col justify-center mt-3 gap-y-4 items-center text-center">
            <p>
              © Copyright <span className="text-red-400">Stylish Threads</span>.
              All Rights Reserved
            </p>
          </div>
        </div>
      </div>
      <p className="flex justify-center text-sm">
        Powered by
        <a
          href="#"
          className="text-red-400 ml-1"
        >
          Innobiz Consultancy Service
        </a>
      </p>
    </footer>
  );
};

export default Footer;
