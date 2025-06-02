"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { event as gaEvent } from "../../lib/gtag";

interface Group {
  Title: string;
  Description: string;
  Date: string;
  Buget: string;
  Creator_Email: string;
  Created_At: string;
  Status: string;
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/groups/list")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setGroups(data.groups);
        else setError(data.error || "讀取失敗");
      })
      .catch((e) => setError(e.message || "讀取失敗"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-primary hover:underline">
            ← 回到首頁
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">旅遊群組</h1>
        </div>
        <Link
          href="/groups/create"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() =>
            gaEvent("click_create_group", { location: "groups_list" })
          }
        >
          建立群組
        </Link>
      </div>
      {loading && <div>載入中...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group, idx) => (
          <Link
            key={idx}
            href={`/groups/${encodeURIComponent(group.Title)}`}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            onClick={() =>
              gaEvent("click_group_card", {
                group_id: encodeURIComponent(group.Title),
                group_title: group.Title,
              })
            }
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{group.Title}</h2>
              <div className="space-y-2 text-gray-600">
                <p>目的地：{group.Description}</p>
                <p>日期：{group.Date}</p>
                <p>預算：NT$ {group.Buget}</p>
                <p className="text-primary font-medium">
                  {group.Status === "recruiting" ? "招募中" : group.Status}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
