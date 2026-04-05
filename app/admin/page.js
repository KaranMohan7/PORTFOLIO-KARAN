"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaProjectDiagram, FaCheckCircle } from "react-icons/fa";
import { MdAdd, MdEdit } from "react-icons/md";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllProjects } from "@/utils/apiFunctions";

const Dashboard = () => {

  // 🔥 states
  const [preview, setPreview] = useState({
    homeImage: "",
    aboutImage: "",
  });

  const [files, setFiles] = useState({
    homeImage: null,
    aboutImage: null,
  });

  // 🔥 fetch homepage data
  const { data } = useQuery({
    queryKey: ["homepage"],
    queryFn: async () => {
      const res = await fetch("/api/home");
      return res.json();
    },
    onSuccess: (data) => {
      if (data?.data) {
        setPreview({
          homeImage: data.data.homeImage,
          aboutImage: data.data.aboutImage,
        });
      }
    },
  });

  // 🔥 update mutation
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch("/api/home", {
        method: "POST",
        body: formData,
      });
      return res.json();
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (data) => {
      toast.error(data?.message || "Update failed ❌");
    },
  });

    const { data: projectLength } = useQuery({
      queryKey: ["projects"],
      queryFn: getAllProjects,
    });
  

  // upload handler
  const handleUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setFiles((prev) => ({ ...prev, [field]: file }));
    setPreview((prev) => ({ ...prev, [field]: url }));
  };

  const handleSubmit = () => {
    const formData = new FormData();

    if (files.homeImage) formData.append("homeImage", files.homeImage);
    if (files.aboutImage) formData.append("aboutImage", files.aboutImage);

    mutation.mutate(formData);
  };

  useEffect(() => {
  if (data?.data) {
    setPreview({
      homeImage: data.data.homeImage,
      aboutImage: data.data.aboutImage,
    });
  }
}, [data]);

  return (
    <div className="space-y-10">

      {/* Topbar */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

        <Link href={'/'} className="bg-black text-white px-4 py-2 rounded-xl shadow">
          Karan Mohan Talwar 🔥
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Projects" value={projectLength?.data?.length} icon={<FaProjectDiagram />} color="bg-blue-100 text-blue-600" />
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4">⚡ Quick Actions</h3>

        <div className="flex flex-wrap gap-4">
          <Link href={"/admin/create-project"}>
            <ActionBtn icon={<MdAdd />} text="Add Project" />
          </Link>

          <Link href={"/admin/list-project"}>
            <ActionBtn icon={<MdEdit />} text="Edit Projects" />
          </Link>
        </div>
      </div>

      {/* 🔥 HOMEPAGE IMAGE SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-6">
        <h3 className="text-lg font-semibold">🖼️ Homepage Images</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <ImageCard
            title="Home Image"
            image={preview.homeImage}
            onChange={(e) => handleUpload(e, "homeImage")}
          />

          <ImageCard
            title="About Image"
            image={preview.aboutImage}
            onChange={(e) => handleUpload(e, "aboutImage")}
          />

        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={mutation.isPending}
            className="bg-black text-white px-6 py-2 rounded-xl hover:scale-105 transition"
          >
            {mutation.isPending ? "Updating..." : "Update Images"}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;


/*  Components */

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow flex items-center justify-between hover:scale-105 transition">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold mt-2">{value}</h2>
      </div>

      <div className={`p-3 rounded-xl text-xl ${color}`}>
        {icon}
      </div>
    </div>
  );
};

const ActionBtn = ({ icon, text }) => {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:scale-105 transition">
      {icon}
      {text}
    </button>
  );
};

const ImageCard = ({ title, image, onChange }) => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{title}</p>

      <label className="relative block min-h-48 border-2 border-dashed rounded-xl overflow-hidden cursor-pointer group">

        {image ? (
          <>
            <img
              src={image}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm">
              Change Image
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Upload Image
          </div>
        )}

        <input type="file" hidden onChange={onChange} />
      </label>
    </div>
  );
};