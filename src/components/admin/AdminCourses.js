"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import AdminLessons from "./AdminLessons";
import { getCategoryTheme } from "@/lib/courseThemes";

const emptyForm = {
  title: "",
  description: "",
  category: "",
  instructor: "",
  thumbnail: "",
  difficulty: "",
};

const fieldClass =
  "w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses", { credentials: "include" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch courses");
      }

      setCourses(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = editingSlug
        ? `/api/courses/${editingSlug}`
        : "/api/courses";

      const method = editingSlug ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage(
        editingSlug
          ? "Course updated successfully"
          : "Course created successfully"
      );

      setForm(emptyForm);
      setEditingSlug(null);
      await fetchCourses();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setEditingSlug(course.slug);
    setMessage("");

    setForm({
      title: course.title || "",
      description: course.description || "",
      category: course.category || "",
      instructor:
        course.instructor?._id || course.instructor || "",
      thumbnail: course.thumbnail || "",
      difficulty: course.difficulty || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (slug) => {
    const confirmed = confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/courses/${slug}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete course");
      }

      setMessage("Course deleted successfully");
      await fetchCourses();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const cancelEdit = () => {
    setEditingSlug(null);
    setForm(emptyForm);
    setMessage("");
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-6 py-10">
          <div>
            <p className="text-sm font-medium tracking-wide text-neutral-400">
              Admin
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-neutral-900">
              Course Management
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              Create, edit, and manage courses and lessons.
            </p>
          </div>

          <Link
            href="/courses"
            className="rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            View catalog
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {message ? (
          <div className="mb-6 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm">
            {message}
          </div>
        ) : null}

        <form
          onSubmit={handleSubmit}
          className="mb-10 space-y-5 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-900 text-white">
              <Plus size={18} />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">
                {editingSlug ? "Edit Course" : "Create Course"}
              </h2>
              <p className="text-sm text-neutral-500">
                Fill in the course details below.
              </p>
            </div>
          </div>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Course title"
            required
            className={fieldClass}
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Course description"
            required
            rows={4}
            className={fieldClass}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className={fieldClass}
            >
              <option value="">Select category</option>
              <option value="Web Development">Web Development</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
            </select>

            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              required
              className={fieldClass}
            >
              <option value="">Select difficulty</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <input
            name="instructor"
            value={form.instructor}
            onChange={handleChange}
            placeholder="Instructor name"
            required
            className={fieldClass}
          />

          <input
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            placeholder="Thumbnail URL"
            required
            className={fieldClass}
          />

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : editingSlug
                  ? "Update Course"
                  : "Create Course"}
            </button>

            {editingSlug ? (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-900"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        <section>
          <div className="mb-6">
            <p className="text-sm font-medium tracking-wide text-neutral-400">
              Catalog
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-neutral-900">
              All Courses
            </h2>
          </div>

          <div className="space-y-6">
            {courses.map((course) => {
              const theme = getCategoryTheme(course.category);
              const Icon = theme.icon;

              return (
                <div
                  key={course._id}
                  className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
                >
                  <div className="flex flex-col gap-5 border-b border-neutral-100 p-6 md:flex-row md:items-start md:justify-between">
                    <div className="flex gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white ${theme.cover}`}
                      >
                        <Icon size={20} />
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-neutral-900">
                          {course.title}
                        </h3>
                        <p className="mt-1 text-sm text-neutral-500">
                          {course.category} · {course.difficulty}
                        </p>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500">
                          {course.description}
                        </p>
                        {course.instructor ? (
                          <p className="mt-2 text-sm text-neutral-400">
                            Instructor:{" "}
                            {course.instructor.name || course.instructor}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(course)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-900"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(course.slug)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <AdminLessons courseSlug={course.slug} />
                  </div>
                </div>
              );
            })}

            {courses.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
                <p className="text-sm font-medium text-neutral-900">
                  No courses found
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  Create your first course using the form above.
                </p>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
