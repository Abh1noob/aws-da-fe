"use client";
import React, { useState, useRef, useEffect } from "react";
import { Camera, CameraType } from "react-camera-pro";
import { FlipVertical } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Toast from "@/hooks/toast";
import apiClient from "@/app/api";
import Image from "next/image";

const Page = () => {
  const camera = useRef<CameraType>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState("");
  const [isPublic, setIsPublic] = useState(true); 
  const toast = Toast();

  useEffect(() => {
    setIsMounted(true);
    setShowCamera(true);
    return () => {
      setIsMounted(false);
      setShowCamera(false);
    };
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
      formData.append("is_visible", isPublic.toString()); // Append the visibility value

      const response = await apiClient.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload successful:", response.data);
      toast.success({ message: "Image uploaded successfully!" });
      setShowCamera(false);
      setPhoto("");
    } catch (e) {
      toast.apiError(e);
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
    <div className="flex flex-col h-full">
      {showCamera && (
        <div className="z-10">
        <Camera
          ref={camera}
          errorMessages={{
            noCameraAccessible: undefined,
            permissionDenied: undefined,
            switchCamera: undefined,
            canvas: undefined,
          }}
        />
        </div>
      )}

      {showCamera && (
        <div className="w-full flex items-center justify-between px-6 absolute bottom-5 left-0 py-4 bg-black/30 z-10">
          <button className="h-12 w-12 bg-white rounded-full border-2 border-transparent  opacity-0" />
          <button
            onClick={takePhoto}
            className="h-16 w-16 bg-white rounded-full border-4 border-[#ED4A57] shadow-lg hover:bg-[#ED4A57] hover:border-white transition-all duration-300"
          />
          <div
            onClick={switchCamera}
            className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#ED4A57] hover:border-white transition-all duration-300"
          >
            <FlipVertical className="text-[#ED4A57]" />
          </div>
        </div>
      )}

      {!showCamera && photo && (
        <div className="flex flex-col items-center mt-8 space-y-6">
          <Image
            src={photo}
            alt="Taken photo"
            className="w-64 h-auto rounded-lg shadow-md"
            height={1000}
            width={1000}
          />

          {/* Public/Private Checkbox */}
          <div className="flex flex-row gap-3 items-center">
            <Label className="text-xl text-black">Make Image Private</Label>
            <Checkbox
              onCheckedChange={() => setIsPublic(!isPublic)}
              className="h-5 w-5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button
              onClick={confirmAndUpload}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
            >
              Confirm and Upload
            </Button>
            <Button
              onClick={() => setShowCamera(true)}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200"
            >
              Retake Photo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
