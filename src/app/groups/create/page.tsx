"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { event as gaEvent } from "../../../lib/gtag";

export default function CreateGroupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    date: "",
    budget: "",
    description: "",
    creatorName: "",
    creatorEmail: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      gaEvent("submit_create_group", { ...formData });
      const res = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          destination: formData.destination,
          date: formData.date,
          budget: formData.budget,
          creatorEmail: formData.creatorEmail,
        }),
      });
      const result = await res.json();
      if (!result.ok) throw new Error(result.error || "送出失敗");
      router.push("/groups");
    } catch (error: unknown) {
      setError(error.message || "送出失敗");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link
            href="/groups"
            className="text-primary hover:underline mb-4 inline-block"
          >
            ← 返回群組列表
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            建立旅遊群組
          </h1>
        </div>
        {error && (
          <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded p-3">
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                群組名稱
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="例如：日本賞櫻團"
              />
            </div>

            <div>
              <label
                htmlFor="destination"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                目的地
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                required
                value={formData.destination}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="例如：東京"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                預計出發日期
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                預算（新台幣）
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                required
                min="0"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="例如：50000"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                行程說明
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="請描述行程規劃、景點安排等..."
              />
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">發起人資訊</h2>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="creatorName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    姓名
                  </label>
                  <input
                    type="text"
                    id="creatorName"
                    name="creatorName"
                    required
                    value={formData.creatorName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="creatorEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    電子郵件
                  </label>
                  <input
                    type="email"
                    id="creatorEmail"
                    name="creatorEmail"
                    required
                    value={formData.creatorEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "提交中..." : "建立群組"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
