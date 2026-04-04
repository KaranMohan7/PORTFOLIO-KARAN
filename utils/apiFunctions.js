
export const getAllProjects = async () => {
  try {
    const res = await fetch("/api/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    throw error;
  }
};

export const getSingleProject = async (projectId) => {
  try {
    const res = await fetch(`/api/projects/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch project");
    }

    return data;
  } catch (error) {
    console.error("Error fetching single project:", error.message);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const res = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Delete failed");
    }

    return data;
  } catch (error) {
    console.error("Error fetching single project:", error.message);
    throw error;
  }
};

export const updateProjects = async (id, formData) => {
  try {
    const res = await fetch(`/api/projects/${id}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Update failed");
    }

    return data;
  } catch (error) {
    console.error("Error fetching single project:", error.message);
    throw error;
  }
};