"use client";

import { useEffect, useState, useCallback } from "react";

interface Reservation {
  id: string;
  name: string;
  email: string;
  preferred_date: string;
  alternative_date: string | null;
  num_people: number;
  age_group: string;
  selected_modules: string[];
  request_message: string | null;
  line_id: string;
  stay_period: string | null;
  status: string;
  admin_memo: string | null;
  created_at: string;
}

const STATUS_OPTIONS = [
  { value: "new", label: "신규" },
  { value: "contacted", label: "상담중" },
  { value: "confirmed", label: "확정" },
  { value: "completed", label: "완료" },
  { value: "cancelled", label: "취소" },
  { value: "no_show", label: "노쇼" },
];

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-600",
  no_show: "bg-orange-100 text-orange-700",
};

const FILTER_TABS = [
  { value: "all", label: "전체" },
  ...STATUS_OPTIONS,
];

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Reservation | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editMemo, setEditMemo] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    const url = filter === "all"
      ? "/api/admin/reservations"
      : `/api/admin/reservations?status=${filter}`;
    const res = await fetch(url);
    const data = await res.json();
    setReservations(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [filter]);

  useEffect(() => { fetchReservations(); }, [fetchReservations]);

  const openModal = (r: Reservation) => {
    setSelected(r);
    setEditStatus(r.status);
    setEditMemo(r.admin_memo ?? "");
    setSaveMsg("");
  };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    setSaveMsg("");
    const res = await fetch(`/api/admin/reservations/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: editStatus, admin_memo: editMemo }),
    });
    if (res.ok) {
      setSaveMsg("저장되었습니다 ✓");
      await fetchReservations();
      setSelected((prev) => prev ? { ...prev, status: editStatus, admin_memo: editMemo } : null);
    } else {
      setSaveMsg("저장 실패");
    }
    setSaving(false);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">예약 관리</h1>
        <p className="text-sm text-gray-500 mt-0.5">전체 예약 목록 및 상태 관리</p>
      </div>

      {/* 필터 탭 */}
      <div className="flex gap-1.5 mb-5 flex-wrap">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition-colors ${
              filter === tab.value
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 테이블 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-gray-400 text-sm">로딩 중...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-medium">신청일</th>
                  <th className="text-left px-4 py-3 font-medium">이름</th>
                  <th className="text-left px-4 py-3 font-medium">희망일</th>
                  <th className="text-left px-4 py-3 font-medium">인원</th>
                  <th className="text-left px-4 py-3 font-medium">선택 모듈</th>
                  <th className="text-left px-4 py-3 font-medium">LINE ID</th>
                  <th className="text-left px-4 py-3 font-medium">상태</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => openModal(r)}
                    className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-400 text-xs">{r.created_at.slice(0, 10)}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{r.name}</td>
                    <td className="px-4 py-3 text-gray-600">{r.preferred_date}</td>
                    <td className="px-4 py-3 text-gray-600">{r.num_people}명</td>
                    <td className="px-4 py-3 text-gray-600">{r.selected_modules.join(", ")}</td>
                    <td className="px-4 py-3 text-gray-600">{r.line_id}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[r.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {STATUS_OPTIONS.find((s) => s.value === r.status)?.label ?? r.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {reservations.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                      예약이 없습니다
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 상세 모달 */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-base font-semibold text-gray-800">{selected.name} 님 예약 상세</h2>
                <p className="text-xs text-gray-400 mt-0.5">{selected.id}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* 예약 정보 */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <InfoRow label="이름" value={selected.name} />
                <InfoRow label="이메일" value={selected.email} />
                <InfoRow label="LINE ID" value={selected.line_id} />
                <InfoRow label="인원" value={`${selected.num_people}명 (${selected.age_group})`} />
                <InfoRow label="제1희망일" value={selected.preferred_date} />
                <InfoRow label="대체일" value={selected.alternative_date ?? "—"} />
                <InfoRow label="체류기간" value={selected.stay_period ?? "—"} />
                <InfoRow label="선택 체험" value={selected.selected_modules.join(", ")} />
              </div>

              {selected.request_message && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">요청사항</p>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded p-3 whitespace-pre-wrap leading-relaxed">
                    {selected.request_message}
                  </p>
                </div>
              )}

              <hr className="border-gray-100" />

              {/* 상태 변경 */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">상태 변경</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              {/* 관리자 메모 */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">관리자 메모</label>
                <textarea
                  rows={4}
                  value={editMemo}
                  onChange={(e) => setEditMemo(e.target.value)}
                  placeholder="내부 메모 (신청자에게 공개되지 않음)"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* 저장 버튼 */}
              <div className="flex items-center justify-between pt-1">
                {saveMsg && (
                  <span className={`text-xs ${saveMsg.includes("실패") ? "text-red-500" : "text-green-600"}`}>
                    {saveMsg}
                  </span>
                )}
                <div className="flex gap-3 ml-auto">
                  <button
                    onClick={() => setSelected(null)}
                    className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50"
                  >
                    닫기
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded transition-colors"
                  >
                    {saving ? "저장 중..." : "저장"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="text-sm text-gray-700 font-medium">{value}</p>
    </div>
  );
}
