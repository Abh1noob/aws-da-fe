"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Camera, CameraType } from "react-camera-pro";
import { ChevronLeft, FlipVertical } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const Page = () => {
  const camera = useRef<CameraType>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const takePhoto = () => {
    try {
      const temp = camera.current?.takePhoto();
      if (temp) {
        setPhoto(temp as string);
        setShowCamera(false);
        console.log(temp);
      }
    } catch {
      console.error("Wait for the camera to load");
    }
  };

  const switchCamera = () => {
    try {
      camera.current?.switchCamera();
    } catch {
      console.error("Something went wrong");
    }
  };

  const confirmAndUpload = async () => {
    if (!photo) {
      console.error("No photo to upload");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", dataURItoBlob(photo), `photo-${Date.now()}.png`);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload successful:", response.data);
      toast.success("Image uploaded successfully!");
      setShowCamera(false);
      setPhoto("");
    } catch (e) {
      toast.error("Upload failed");
      console.log(e);
      alert("Failed to upload image.");
    }
  };

  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row items-center justify-center mb-5 bg-gray-600 py-4">
        <Link href={"/"}>
          <div className=" absolute left-2 top-5 ">
            <ChevronLeft />
          </div>
        </Link>
        <h1 className="text-3xl font-bold text-center">Image Gallery</h1>
      </div>
      {showCamera && (
        <Camera
          ref={camera}
          errorMessages={{
            noCameraAccessible: undefined,
            permissionDenied: undefined,
            switchCamera: undefined,
            canvas: undefined,
          }}
        />
      )}

      {showCamera && (
        <div className="w-[100vw] flex items-center justify-between px-10 flex-row absolute left-0 bottom-0 py-5 bg-black/30">
          <button className="h-[60px] w-[60px]" />
          <button
            onClick={takePhoto}
            className="h-[60px] w-[60px] bg-white rounded-full bottom-10 z-50 border-[3.5px] border-[#ED4A57]"
          />
          <div
            onClick={switchCamera}
            className="h-[60px] w-[60px] bottom-10 z-50 items-center justify-between"
          >
            <FlipVertical />
          </div>
        </div>
      )}

      {!showCamera && photo && (
        <div className="flex flex-col items-center mt-4">
          <img src={photo} alt="Taken photo" className="w-64 h-auto rounded" />
          <button
            onClick={confirmAndUpload}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Confirm and Upload
          </button>
          <button
            onClick={() => setShowCamera(true)}
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Retake Photo
          </button>
        </div>
      )}
      {!photo && (
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={() => setShowCamera(true)}
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition w-fit mx-auto"
          >
            Click Photograph
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
