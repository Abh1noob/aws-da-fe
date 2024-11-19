"use client";
import apiClient from "@/app/api";
import React, { useEffect, useState } from "react";

interface POST {
  username: string;
  image: string;
}

const Page = () => {
  const [imageData, setImageData] = useState<POST[]>([]);

  const fetchPhotos = async () => {
    try {
      const response = await apiClient.get(
        `${process.env.NEXT_PUBLIC_BASEURL}/images/public`
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
    <div className="flex flex-col items-center h-full">
      {/* Feed Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 my-6">Image Feed</h1>

      {/* Scrollable Container for Images */}
      <div className="w-full h-full overflow-y-auto p-4 flex flex-col gap-6 mb-12">
        {imageData.length > 0 ? (
          imageData.map((image, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow"
            >
              {/* User Info */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-row items-center gap-3">
                <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full aspect-square bg-gray-400 text-white">
                  {image.username[0]}
                </div>
                <p className="font-semibold text-lg text-gray-900">
                  {image.username}
                </p></div>
              </div>

              {/* Image */}
              <img
                src={image.image}
                alt="Image"
                className="w-full object-cover transition-transform duration-500 hover:scale-105"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity"></div>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-500">Loading images...</p>
        )}
      </div>
    </div>
  );
};

export default Page;
