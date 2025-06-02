"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { event as gaEvent } from "../../../lib/gtag";

interface Group {
  Title: string;
  Description: string;
  Date: string;
  Buget: string;
  Creator_Email: string;
  Created_At: string;
  Status: string;
}

export default function GroupDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { id } = React.use(params);
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/groups/list")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          const found = data.groups.find(
            (g: Group) => encodeURIComponent(g.Title) === id
          );
          setGroup(found || null);
          if (!found) setError("找不到此群組");
        } else {
          setError(data.error || "讀取失敗");
        }
      })
      .catch((e) => setError(e.message || "讀取失敗"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!group) return;
    const start = Date.now();
    return () => {
      const stay = Math.round((Date.now() - start) / 1000);
      gaEvent("group_detail_stay_time", { group_id: id, seconds: stay });
    };
  }, [group, id]);

  const handleBack = () => {
    gaEvent("click_back_to_groups", { group_id: id });
    router.back();
  };

  const handleInterest = () => {
    gaEvent("click_interest", { group_id: id });
    router.push(`/interest/${id}`);
  };

  if (loading)
    return <div className="container mx-auto px-4 py-8">載入中...</div>;
  if (error || !group)
    return (
      <div className="container mx-auto px-4 py-8 text-red-600">
        {error || "找不到此群組"}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button
            type="button"
            className="text-primary hover:underline mb-4 inline-block"
            onClick={handleBack}
          >
            ← 返回群組列表
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            {group.Title}
          </h1>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">行程資訊</h2>
              <div className="space-y-3 text-gray-600">
                <p>目的地：{group.Description}</p>
                <p>日期：{group.Date}</p>
                <p>預算：NT$ {group.Buget}</p>
                <p>
                  狀態：
                  {group.Status === "recruiting" ? "招募中" : group.Status}
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">發起人資訊</h2>
              <div className="space-y-3 text-gray-600">
                <p>聯絡方式：{group.Creator_Email}</p>
                <p>建立時間：{group.Created_At}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            type="button"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            onClick={handleInterest}
          >
            表達興趣
          </button>
        </div>
      </div>
    </div>
  );
}
