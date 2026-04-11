"use client";
import { getSingleProject, updateProjects } from "@/utils/apiFunctions";
import { useParams, useRouter } from "next/navigation";

import React, { useEffect, useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast";
import gsap from "gsap";



const updateProject = () => {
  
  const router = useRouter()
  const [form, setForm] = useState({
    shortName: "",
    name: "",
    description: "",
    mainImage: null,
    shortImage: null,
    techStack: [""],
    type: {
      typeName: "",
      typeCategory: "",
      typeDateStack: "",
    },
    detailDescription: [""],
    images: [],
    featured: false,
    link: "",
  });
  const [errors, setErrors] = useState({});
  

  const [preview, setPreview] = useState({
    mainImage: "",
    shortImage: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);


  const { id } = useParams();

const { data, isLoading } = useQuery({
  queryKey: ["project", id],
  queryFn: () => getSingleProject(id),
  enabled: !!id,
});

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // nested type
  const handleTypeChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      type: { ...prev.type, [name]: value },
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // single image upload
  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setForm((prev) => ({ ...prev, [field]: file }));
    setPreview((prev) => ({ ...prev, [field]: url }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // multiple images (append)
  const handleMultipleImages = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    setPreview((prev) => ({
      ...prev,
      images: [...prev.images, ...urls],
    }));
  };

  // remove image
  const removeImage = (index) => {
    setPreview((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));

    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // dynamic fields
  const handleArrayChange = (index, value, field) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm((prev) => ({ ...prev, [field]: updated }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const addField = (field) => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeField = (index, field) => {
    const updated = form[field].filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, [field]: updated }));
  };
  

const validate = () => {
  let newErrors = {};

  if (!form.shortName.trim()) {
    newErrors.shortName = "Short name is required";
  }

  if (!form.name.trim()) {
    newErrors.name = "Project name is required";
  }

  if (!form.description.trim()) {
    newErrors.description = "Description is required";
  }

  // ❗ CHANGE HERE
  if (!form.mainImage && !preview.mainImage) {
    newErrors.mainImage = "Main image is required";
  }

  if (!form.shortImage && !preview.shortImage) {
    newErrors.shortImage = "Short image is required";
  }

  if (form.techStack.some((tech) => !tech.trim())) {
    newErrors.techStack = "All tech fields must be filled";
  }

  if (form.detailDescription.some((desc) => !desc.trim())) {
    newErrors.detailDescription = "All description points must be filled";
  }

  if (!form.type.typeName.trim()) {
    newErrors.typeName = "Type name required";
  }

  if (!form.link.trim()) {
    newErrors.link = "Project link required";
  } else if (!/^https?:\/\/.+/.test(form.link)) {
    newErrors.link = "Enter valid URL (https://...)";
  }

  return newErrors;
};


  // submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    const { mainImage, shortImage, images, ...rest } = form;

    formData.append("projectData", JSON.stringify(rest));

    // ❗ only append if new file selected
    if (mainImage) formData.append("mainImage", mainImage);
    if (shortImage) formData.append("shortImage", shortImage);

    images.forEach((img) => {
      formData.append("images", img);
    });

    const res = await fetch(`/api/projects/${id}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      toast.success( data?.message ||"Project Updated ✅");
      router.push("/admin-karanK771/list-project")
       // redirect
    } else {
      toast.error(data?.message);
    }

  } catch (err) {
    toast.error("Update failed ❌", err?.message);
  } finally {
    setLoading(false);
  }
};

  // smooth skeleton delay
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setShowSkeleton(false), 300);
    }
  }, [isLoading]);

useEffect(() => {
  if (!data?.data) return;

  const project = data.data;

  setForm({
    shortName: project.shortName || "",
    name: project.name || "",
    description: project.description || "",
    mainImage: null, // ❗ file nahi set karte
    shortImage: null,
    techStack: project.techStack || [""],
    type: {
      typeName: project.type?.typeName || "",
      typeCategory: project.type?.typeCategory || "",
      typeDateStack: project.type?.typeDateStack || "",
    },
    detailDescription: project.detailDescription || [""],
    images: [], // new uploads only
    featured: project.featured || false,
    link: project.link || "",
  });

  // 🔥 preview ke liye existing images
  setPreview({
    mainImage: project.mainImage,
    shortImage: project.shortImage,
    images: project.images || [],
  });

}, [data]);

  if (showSkeleton) return <FormSkeleton />;


  return (
    <div className="w-full bg-linear-to-br from-gray-100 to-gray-200 py-7">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6">🔥 Update Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="font-semibold mb-3 text-[15px]">Basic Info</h2>
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-6">
            <input name="shortName" placeholder="Short Name" value={form.shortName} className="input" onChange={handleChange} />
            <input name="name"   value={form.name} placeholder="Project Name" className="input" onChange={handleChange} />
          </div>
                      <div className="flex items-center justify-between h-1 px-1">
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
              {errors.shortName && (
                <p className="text-red-500 text-xs ">{errors.shortName}</p>
              )}
            </div>

          <textarea name="description"   value={form.description} placeholder="Short Description" className="input h-24" onChange={handleChange} />
          {errors.description && (
  <p className="text-red-500 text-xs">{errors.description}</p>
)}

          {/* Type */}
          <div className="grid grid-cols-3 gap-4">
            <input name="typeName"   value={form.type.typeName} placeholder="Type Name" className="input" onChange={handleTypeChange} />
            <input name="typeCategory"  value={form.type.typeCategory} placeholder="Category" className="input" onChange={handleTypeChange} />
            <input name="typeDateStack" value={form.type.typeDateStack} placeholder="Duration" className="input" onChange={handleTypeChange} />
          </div>

          {/* Tech Stack */}
          <div>
            <h2 className="font-semibold mb-3 text-[15px]">Tech Stack</h2>

            <div className="space-y-3">
              {form.techStack.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-black transition"
                >
                  <span className="text-gray-400 text-sm">#{i + 1}</span>

                  <input
                    value={tech}
                    onChange={(e) => handleArrayChange(i, e.target.value, "techStack")}
                    className="flex-1 bg-transparent outline-none text-sm"
                    placeholder="React, Node, MongoDB..."
                  />

                  {form.techStack.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField(i, "techStack")}
                      className="text-gray-400 hover:text-red-500 transition text-lg"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => addField("techStack")}
              className="mt-3 text-sm font-medium text-black hover:underline"
            >
              + Add Tech
            </button>
            {errors.techStack && (
  <p className="text-red-500 text-xs mt-2">{errors.techStack}</p>
)}
          </div>

          {/* Detail Description */}
          <div>
            <h2 className="font-semibold mb-3 text-[15px]">Detail Description</h2>

            <div className="space-y-3">
              {form.detailDescription.map((desc, i) => (
                <div
                  key={i}
                  className="flex gap-3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 focus-within:border-black transition"
                >
                  <span className="text-gray-400 text-sm mt-1">•</span>

                  <textarea
                    value={desc}
                    onChange={(e) =>
                      handleArrayChange(i, e.target.value, "detailDescription")
                    }
                    className="flex-1 bg-transparent outline-none text-sm resize-none"
                    placeholder="Explain feature or work..."
                  />

                  {form.detailDescription.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField(i, "detailDescription")}
                      className="text-gray-400 hover:text-red-500 transition text-xl h-fit"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => addField("detailDescription")}
              className="mt-3 text-sm font-medium text-black hover:underline"
            >
              + Add Point
            </button>
            {errors.detailDescription && <p className="text-red-500 text-xs mt-2">{errors.detailDescription}</p>}
          </div>

          {/* Image Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Main Image */}
            <div>
              <p className="mb-2 font-semibold text-[15px]">Main Image</p>

              <label className="upload-box group relative overflow-hidden hover:border-black transition">
                {preview.mainImage ? (
                  <>
                    <img src={preview.mainImage} className="preview group-hover:scale-110 transition duration-300" />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                      <span className="text-white text-sm">Change</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <span className="text-3xl">🖼️</span>
                    <span className="text-sm">Upload Main Image</span>
                  </div>
                )}

                <input
                  type="file"
                  hidden
                  onChange={(e) => handleImageUpload(e, "mainImage")}
                />
              </label>

              {/* Remove button */}
              {preview.mainImage && (
                <button
                  type="button"
                  onClick={() => {
                    setPreview((prev) => ({ ...prev, mainImage: "" }));
                    setForm((prev) => ({ ...prev, mainImage: null }));
                  }}
                  className="text-red-500 text-sm mt-2"
                >
                  Remove Image
                </button>
              )}
            </div>

            {/* Short Image */}
            <div>
              <p className="mb-2 font-semibold text-[15px]">Short Image</p>

              <label className="upload-box group relative overflow-hidden hover:border-black transition">
                {preview.shortImage ? (
                  <>
                    <img src={preview.shortImage} className="preview group-hover:scale-110 transition duration-300" />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                      <span className="text-white text-sm">Change</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <span className="text-3xl">🖼️</span>
                    <span className="text-sm">Upload Short Image</span>
                  </div>
                )}

                <input
                  type="file"
                  hidden
                  onChange={(e) => handleImageUpload(e, "shortImage")}
                />
              </label>

              {/* Remove button */}
              {preview.shortImage && (
                <button
                  type="button"
                  onClick={() => {
                    setPreview((prev) => ({ ...prev, shortImage: "" }));
                    setForm((prev) => ({ ...prev, shortImage: null }));
                  }}
                  className="text-red-500 text-sm mt-2"
                >
                  Remove Image
                </button>
                
              )}
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
                {errors.mainImage && (
  <p className="text-red-500 text-xs ">{errors.mainImage}</p>
)}
 {errors.shortImage && <p className="text-red-500 text-xs ">{errors.shortImage}</p>}
</div>

          {/* Multiple Images */}
          <div>
            <p className="font-semibold mb-3 text-[15px]">Gallery Images</p>

            {/* Upload Box */}
            <label className="upload-box flex flex-col items-center justify-center gap-2 hover:border-black transition">
              <div className="text-3xl">📁</div>
              <span className="text-gray-600 text-sm font-medium">
                Click or Drag & Drop Images
              </span>
              <span className="text-xs text-gray-400">
                PNG, JPG, JPEG (Multiple Allowed)
              </span>

              <input
                type="file"
                multiple
                hidden
                onChange={handleMultipleImages}
              />
            </label>

            {/* Preview Grid */}
            {preview.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5">
                {preview.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative rounded-xl overflow-hidden group shadow-md"
                  >
                    <img
                      src={img}
                      className="w-full h-28 object-cover group-hover:scale-110 transition duration-300"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="bg-red-500 text-white px-2 py-1 text-xs rounded-md"
                      >
                        Delete
                      </button>

                      {/* Index */}
                      <span className="bg-white text-black text-xs px-2 py-1 rounded">
                        #{i + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <h2 className="font-semibold mb-3 text-[15px]">Project Link</h2>
          {/* Link */}
          <input name="link" placeholder="Project Link" className="input" value={form.link} onChange={handleChange} />
               {errors.link && <p className="text-red-500 text-xs">{errors.link}</p>}

          {/* Featured */}
<div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
  <div>
    <p className="font-medium text-sm">Featured Project</p>
    <p className="text-xs text-gray-500">Show this project as highlighted</p>
  </div>

  <button
    type="button"
    onClick={() =>
      setForm((prev) => ({ ...prev, featured: !prev.featured }))
    }
    className={`relative w-12 h-6 rounded-full transition ${
      form.featured ? "bg-black" : "bg-gray-300"
    }`}
  >
    <span
      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
        form.featured ? "translate-x-6" : "translate-x-0"
      }`}
    />
  </button>
</div>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl hover:scale-105 transition disabled:opacity-50"
          >
           {loading ? "Updating..." : "Update Project"}
          </button>
        </form>
      </div>

      {/* styles */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 10px;
          outline: none;
          transition: 0.2s;
        }
        .input:focus {
          border-color: black;
          box-shadow: 0 0 0 2px #00000020;
        }
        .btn {
          padding: 8px 12px;
          background: black;
          color: white;
          border-radius: 8px;
          margin-top: 5px;
        }
        .upload-box {
          height: 150px;
          border: 2px dashed #ccc;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
        }
        .preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default updateProject;


/* Skeleton */

const FormSkeleton = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".shimmer", {
        x: "100%",
        duration: 1.2,
        repeat: -1,
        ease: "linear",
      });

      gsap.from(".sk", {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.5,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="max-w-6xl mx-auto p-8 space-y-6">

      <div className="h-8 w-60 bg-gray-300 rounded sk relative overflow-hidden">
        <Shimmer />
      </div>

      {[1,2,3,4,5].map((_, i) => (
        <div key={i} className="h-12 bg-gray-200 rounded-xl sk relative overflow-hidden">
          <Shimmer />
        </div>
      ))}

      <div className="h-40 bg-gray-200 rounded-xl sk relative overflow-hidden">
        <Shimmer />
      </div>

    </div>
  );
};

const Shimmer = () => (
  <div className="shimmer absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/60 to-transparent" />
);
