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
    <div className="w-full bg-linear-to-br from-gray-100 to-gray-200 min-h-screen py-10">

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
                  <Image
                    src={project.shortImage}
                    alt={project.name}
                    width={80}
                    height={50}
                    className="rounded-md object-cover"
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


const TableSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden animate-pulse">

      {/* Header */}
      <div className="grid grid-cols-12 bg-gray-100 px-4 py-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-300 rounded col-span-2"></div>
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-12 items-center px-4 py-4 border-t"
        >
          <div className="col-span-1 h-3 bg-gray-200 rounded w-4"></div>

          <div className="col-span-2">
            <div className="w-20 h-[50px] bg-gray-200 rounded-md"></div>
          </div>

          <div className="col-span-3 h-4 bg-gray-200 rounded w-3/4"></div>

          <div className="col-span-2 h-3 bg-gray-200 rounded w-2/3"></div>

          <div className="col-span-2 h-6 bg-gray-200 rounded-full w-16"></div>

          <div className="col-span-2 flex justify-end gap-3">
            <div className="h-3 w-10 bg-gray-200 rounded"></div>
            <div className="h-3 w-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;