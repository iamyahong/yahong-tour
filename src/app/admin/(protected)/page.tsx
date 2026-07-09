"use client";

import { useEffect, useState } from "react";

interface Stats {
  monthNew: number;
  weekScheduled: number;
  unanswered: number;
  recent: Reservation[];
}

interface Reservation {
  id: string;
  name: string;
  email: string;
  preferred_date: string;
  num_people: number;
  selected_modules: string[];
  line_id: string;
  status: string;
  created_at: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: "신규", color: "bg-blue-100 text-blue-700" },
  contacted: { label: "상담중", color: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "확정", color: "bg-green-100 text-green-700" },
  completed: { label: "완료", color: "bg-gray-100 text-gray-600" },
  cancelled: { label: "취소", color: "bg-red-100 text-red-600" },
  no_show: { label: "노쇼", color: "bg-orange-100 text-orange-700" },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">대시보드</h1>
        <p className="text-sm text-gray-500 mt-0.5">yahong tour 예약 현황</p>
      </div>

      {/* 통계 카드 3개 */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        <StatCard
          label="이번 달 신규 예약"
          value={stats?.monthNew ?? 0}
          sub="status = new"
          color="blue"
        />
        <StatCard
          label="이번 주 예정"
          value={stats?.weekScheduled ?? 0}
          sub="confirmed + contacted"
          color="green"
        />
        <StatCard
          label="미답변"
          value={stats?.unanswered ?? 0}
          sub="전체 신규 건"
          color={stats?.unanswered ? "red" : "gray"}
        />
      </div>

      {/* 최근 예약 5건 */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-700">최근 예약 5건</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left px-5 py-3 font-medium">신청일</th>
                <th className="text-left px-5 py-3 font-medium">이름</th>
                <th className="text-left px-5 py-3 font-medium">희망일</th>
                <th className="text-left px-5 py-3 font-medium">인원</th>
                <th className="text-left px-5 py-3 font-medium">모듈</th>
                <th className="text-left px-5 py-3 font-medium">LINE ID</th>
                <th className="text-left px-5 py-3 font-medium">상태</th>
              </tr>
            </thead>
            <tbody>
              {(stats?.recent ?? []).map((r) => {
                const s = STATUS_LABELS[r.status] ?? { label: r.status, color: "bg-gray-100 text-gray-600" };
                return (
                  <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3 text-gray-500">
                      {r.created_at.slice(0, 10)}
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-800">{r.name}</td>
                    <td className="px-5 py-3 text-gray-600">{r.preferred_date}</td>
                    <td className="px-5 py-3 text-gray-600">{r.num_people}명</td>
                    <td className="px-5 py-3 text-gray-600">{r.selected_modules.join(", ")}</td>
                    <td className="px-5 py-3 text-gray-600">{r.line_id}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${s.color}`}>
                        {s.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {(stats?.recent ?? []).length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-gray-400 text-sm">
                    예약이 없습니다
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label, value, sub, color,
}: {
  label: string; value: number; sub: string;
  color: "blue" | "green" | "red" | "gray";
}) {
  const colors = {
    blue: "border-l-blue-500 bg-blue-50",
    green: "border-l-green-500 bg-green-50",
    red: "border-l-red-500 bg-red-50",
    gray: "border-l-gray-300 bg-gray-50",
  };
  const numColors = {
    blue: "text-blue-700", green: "text-green-700",
    red: "text-red-700", gray: "text-gray-600",
  };
  return (
    <div className={`bg-white border border-gray-200 border-l-4 rounded-lg p-5 ${colors[color]}`}>
      <p className="text-xs text-gray-500 mb-2">{label}</p>
      <p className={`text-3xl font-bold ${numColors[color]}`}>{value}</p>
      <p className="text-xs text-gray-400 mt-1">{sub}</p>
    </div>
  );
}
