"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "@src/component/customeFormField"; // your custom input component

const page = () => {
  const methods = useForm();

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    if (data.profilePicture && data.profilePicture.length > 0) {
      formData.append("profilePicture", data.profilePicture[0]);
    }

    try {
      const response = await fetch("http://localhost:8020/user/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUwMjE1YmUwLTliNjEtNDVmMS04M2VlLTQwZmQ0YjhjNzdiMyIsIm5hbWUiOiJrZXZhbCBraGV0YW5pIiwiZW1haWwiOiJrZXZhbGtoZXRhbmkxNUBnbWFpbC5jb20iLCJSb2xlIjoic3VwZXJhZG1pbiIsImlhdCI6MTc0NTgyNDgyOX0.cyaTbweynqCMS1V8aeCvINrOvPGnXUfcnPaw2I7mx4Q`,
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong with the upload.");
      }

      const result = await response.json();
      console.log("Upload success:", result);
      alert("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload profile picture.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Upload Profile Picture
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <CustomInput
              name="profilePicture"
              label="Upload Profile Picture"
              type="file"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
            >
              Submit
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default page;
