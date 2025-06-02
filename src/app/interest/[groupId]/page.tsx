"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { event as gaEvent } from "../../../lib/gtag";

export default function InterestPage({
  params,
}: {
  params: { groupId: string };
}) {
  const { groupId } = React.use(params);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactInfo: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      gaEvent("submit_interest", { groupId, ...formData });
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupTitle: groupId,
          email: formData.email,
          name: formData.name,
          contactInfo: formData.contactInfo,
        }),
      });
      const result = await res.json();
      if (!result.ok) throw new Error(result.error || "送出失敗");
      router.push("/groups");
    } catch (error: any) {
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
            href={`/groups/${groupId}`}
            className="text-primary hover:underline mb-4 inline-block"
          >
            ← 返回群組詳情
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">表達興趣</h1>
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
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                姓名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                電子郵件
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="contactInfo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                其他聯絡方式（選填）
              </label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                placeholder="例如：LINE ID、手機號碼"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                想說的話（選填）
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="分享你對這個旅程的想法或期望..."
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "提交中..." : "提交"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
