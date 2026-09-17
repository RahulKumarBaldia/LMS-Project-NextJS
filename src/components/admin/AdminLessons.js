"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const emptyForm = {
  title: "",
  slug: "",
  duration: "",
  videoUrl: "",
  content: "",
  order: "",
};

const fieldClass =
  "w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100";

export default function AdminLessons({ courseSlug }) {
  const [lessons, setLessons] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchLessons = async () => {
    try {
      const res = await fetch(`/api/lessons/${courseSlug}`, {
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        setLessons([]);
        return;
      }

      setLessons(Array.isArray(data) ? data : []);
    } catch {
      setLessons([]);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [courseSlug]);

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
        ? `/api/lessons/${courseSlug}/${editingSlug}`
        : `/api/lessons/${courseSlug}`;

      const method = editingSlug ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          duration: Number(form.duration),
          order: Number(form.order),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed");
      }

      setMessage(
        editingSlug
          ? "Lesson updated successfully"
          : "Lesson created successfully"
      );

      setForm(emptyForm);
      setEditingSlug(null);
      fetchLessons();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (lesson) => {
    setEditingSlug(lesson.slug);
    setMessage("");

    setForm({
      title: lesson.title,
      slug: lesson.slug,
      duration: lesson.duration,
      videoUrl: lesson.videoUrl,
      content: lesson.content,
      order: lesson.order,
    });
  };

  const handleDelete = async (lessonSlug) => {
    if (!confirm("Delete this lesson?")) return;

    try {
      const res = await fetch(
        `/api/lessons/${courseSlug}/${lessonSlug}`,
        { method: "DELETE", credentials: "include" }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete lesson");
      }

      setMessage("Lesson deleted successfully");
      fetchLessons();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-neutral-900">
          Manage Lessons
        </h3>
        <p className="mt-1 text-sm text-neutral-500">
          Add or update lessons for this course.
        </p>
      </div>

      {message ? (
        <div className="mb-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
          {message}
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="mb-6 space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-5"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Lesson title"
          required
          className={fieldClass}
        />

        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Lesson slug"
          required
          className={fieldClass}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="number"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration (minutes)"
            required
            className={fieldClass}
          />

          <input
            type="number"
            name="order"
            value={form.order}
            onChange={handleChange}
            placeholder="Lesson order"
            required
            className={fieldClass}
          />
        </div>

        <input
          name="videoUrl"
          value={form.videoUrl}
          onChange={handleChange}
          placeholder="Video URL"
          required
          className={fieldClass}
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Lesson content"
          required
          rows={4}
          className={fieldClass}
        />

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : editingSlug
                ? "Update Lesson"
                : "Add Lesson"}
          </button>

          {editingSlug ? (
            <button
              type="button"
              onClick={() => {
                setEditingSlug(null);
                setForm(emptyForm);
                setMessage("");
              }}
              className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-700"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="space-y-3">
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-neutral-900">
                {lesson.order}. {lesson.title}
              </p>
              <p className="text-sm text-neutral-500">
                {lesson.duration} minutes
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleEdit(lesson)}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700"
              >
                <Pencil size={14} />
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(lesson.slug)}
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}

        {lessons.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-neutral-200 px-4 py-8 text-center text-sm text-neutral-500">
            No lessons yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}
