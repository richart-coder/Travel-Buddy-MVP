"use client";

import Link from "next/link";
import { event as gaEvent } from "../lib/gtag";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          找到你的旅伴，一起探索世界
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          與志同道合的旅伴一起分享旅程，創造難忘的回憶
        </p>
        <div className="space-x-4 flex justify-center mb-8">
          <Link
            href="/groups"
            className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors shadow"
            onClick={() => gaEvent("click_groups_list", { location: "home" })}
          >
            瀏覽旅遊群組
          </Link>
          <Link
            href="/groups/create"
            className="inline-block bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow"
            onClick={() => gaEvent("click_create_group", { location: "home" })}
          >
            建立旅遊群組
          </Link>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-3">找到志同道合的旅伴</h3>
          <p className="text-gray-600">
            根據目的地、預算和時間找到最適合的旅伴
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-3">安全可靠的平台</h3>
          <p className="text-gray-600">所有用戶都經過驗證，確保旅程安全無虞</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-3">靈活自由的行程</h3>
          <p className="text-gray-600">
            與旅伴一起規劃行程，創造獨特的旅行體驗
          </p>
        </div>
      </div>
    </div>
  );
}
