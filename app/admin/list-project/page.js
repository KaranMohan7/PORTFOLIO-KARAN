"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllProjects, deleteProject } from "@/utils/apiFunctions";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

const Page = () => {

  const queryClient = useQueryClient();

  const [deleteId, setDeleteId] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deleteProject,
    onSuccess: (data) => {
      toast.success(data?.message || "Deleted Successfully");
      queryClient.invalidateQueries(["projects"]);
      setDeleteId(null);
    },
    onError: (data) => {
      toast.error( data?.message || "Delete failed ❌");
    },
  });

  const projects = data?.data || data || [];

  return (
    <div className="w-full bg-linear-to-br from-gray-100 to-gray-200 h-screen py-10">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">📁 Project List</h1>

          <Link
            href="/admin/create-project"
            className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:scale-105 transition"
          >
            + Add Project
          </Link>
        </div>

        {isLoading && <TableSkeleton />}
        {isError && <p className="text-red-500 text-center">Error loading projects</p>}

        {/* Table */}
        {!isLoading && projects.length > 0 && (
          <div className="border border-gray-200 rounded-xl overflow-hidden">

            {/* Head */}
            <div className="grid grid-cols-12 bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700">
              <div className="col-span-1">#</div>
              <div className="col-span-2">Image</div>
              <div className="col-span-3">Project Name</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Featured</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Rows */}
            {projects.map((project, index) => (
              <div
                key={project._id}
                className="grid grid-cols-12 items-center px-4 py-4 border-t hover:bg-gray-50 transition"
              >
                <div className="col-span-1 text-sm text-gray-500">
                  {index + 1}
                </div>

                <div className="col-span-2">
          <SmoothImage
  src={project.shortImage}
  alt={project.name}
/>
                </div>

                <div className="col-span-3 font-medium text-[14px]">
                  {project.name}
                </div>

                <div className="col-span-2 text-gray-500 text-sm">
                  {project?.type?.typeCategory}
                </div>

                <div className="col-span-2">
                  {project.featured ? (
                    <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                      Featured
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs bg-gray-200 text-gray-600 rounded-full">
                      Normal
                    </span>
                  )}
                </div>

                <div className="col-span-2 flex justify-end gap-4">
                  <Link
                    href={`/admin/update-project/${project._id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => setDeleteId(project._id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl p-6 w-[350px] shadow-xl">

              <h2 className="text-lg font-semibold mb-3">
                Delete Project?
              </h2>

              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">

                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 text-sm bg-gray-200 rounded-md"
                >
                  Cancel
                </button>

                <button
                  onClick={() => mutate(deleteId)}
                  disabled={isPending}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-md"
                >
                  {isPending ? "Deleting..." : "Delete"}
                </button>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};


import { useEffect, useRef } from "react";
import gsap from "gsap";

const TableSkeleton = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // shimmer animation
      gsap.to(".shimmer", {
        x: "100%",
        duration: 1.2,
        repeat: -1,
        ease: "linear",
      });

      // stagger fade + slight up animation
      gsap.from(".skeleton-row", {
        opacity: 0,
        y: 10,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="border border-gray-200 rounded-xl overflow-hidden bg-white"
    >
      {/* Header */}
      <div className="grid grid-cols-12 bg-gray-100 px-4 py-3 relative overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="col-span-2 relative overflow-hidden">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="shimmer absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="skeleton-row grid grid-cols-12 items-center px-4 py-4 border-t"
        >
          <div className="col-span-1 h-3 bg-gray-200 rounded w-4 relative overflow-hidden">
            <div className="shimmer absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
          </div>

          <div className="col-span-2 relative overflow-hidden">
            <div className="w-20 h-[50px] bg-gray-200 rounded-md"></div>
            <div className="shimmer absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
          </div>

          <div className="col-span-3 h-4 bg-gray-200 rounded w-3/4 relative overflow-hidden">
            <div className="shimmer absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
          </div>

          <div className="col-span-2 h-3 bg-gray-200 rounded w-2/3 relative overflow-hidden">
            <div className="shimmer absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
          </div>

          <div className="col-span-2 h-6 bg-gray-200 rounded-full w-16 relative overflow-hidden">
            <div className="shimmer absolute top-0 -left-fullw-full h-full bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
          </div>

          <div className="col-span-2 flex justify-end gap-3">
            <div className="h-3 w-10 bg-gray-200 rounded relative overflow-hidden">
              <div className="shimmer absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
            </div>
            <div className="h-3 w-12 bg-gray-200 rounded relative overflow-hidden">
              <div className="shimmer absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SmoothImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-20 h-[50px] overflow-hidden rounded-md">

      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 overflow-hidden">
          <div className="shimmer absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/60 to-transparent" />
        </div>
      )}

      {/* Image */}
      <Image
        src={src}
        alt={alt}
        width={80}
        height={50}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-all duration-700 rounded-md ${
          loaded
            ? "opacity-100 blur-0 scale-100"
            : "opacity-0 blur-xl scale-110"
        }`}
      />

      {/* shimmer animation */}
      <style jsx>{`
        .shimmer {
          animation: shimmer 1.4s infinite linear;
        }
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};
export default Page;