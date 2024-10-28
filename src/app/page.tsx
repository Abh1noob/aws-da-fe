"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const [imageData, setImageData] = useState([]);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASEURL}/images`
      );
      console.log(response);
      setImageData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    void fetchPhotos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto ">
      <div className="flex flex-row items-center justify-center mb-5 bg-gray-600 py-4">
        <h1 className="text-3xl font-bold text-center">Image Gallery</h1>
        <Link href={"/upload"}>
          <div className=" absolute right-2 top-5 ">
            <Upload />
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5">
        {imageData.map((item, index) => {
          return (
            <div
              className="overflow-hidden rounded-lg shadow-md transition-transform duration-200 transform hover:scale-105 "
              key={index}
            >
              <Image
                src={item}
                alt={`Image ${index + 1}`}
                height={200}
                width={200}
                className="w-full h-full  shadow shadow-white"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
