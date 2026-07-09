export interface AdminNotificationData {
  name: string;
  email: string;
  line_id: string;
  stay_period?: string | null;
  preferred_date: string;
  alternative_date?: string | null;
  num_people: number;
  age_group: string;
  selected_modules: string[];
  request_message?: string | null;
  reservationId: string;
}

export function buildAdminNotificationEmail(data: AdminNotificationData) {
  const subject = `[yahong tour] 新規予約: ${data.name} (${data.preferred_date})`;

  const modulesText = data.selected_modules.join(", ");

  const html = `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Apple SD Gothic Neo',Helvetica,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 16px">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;max-width:560px;width:100%">

  <!-- 헤더 -->
  <tr><td style="background:#9C4A3B;padding:24px 32px">
    <p style="margin:0;color:#ffffff;font-size:11px;letter-spacing:0.12em;font-family:Helvetica,sans-serif">YAHONG TOUR</p>
    <h1 style="margin:6px 0 0;color:#ffffff;font-size:18px;font-weight:600">신규 예약 알림</h1>
  </td></tr>

  <!-- 본문 -->
  <tr><td style="padding:32px">
    <p style="margin:0 0 24px;color:#666;font-size:13px;line-height:1.8">
      새로운 예약 신청이 들어왔습니다. 내용을 확인하고 LINE으로 연락해주세요.
    </p>

    <!-- 구분선 -->
    <hr style="border:none;border-top:0.5px solid #e5e5e5;margin:0 0 24px">

    <!-- 연락처 -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
      <tr>
        <td style="width:120px;padding:6px 0;color:#999;font-size:11px;letter-spacing:0.06em;font-family:Helvetica,sans-serif;vertical-align:top">이름</td>
        <td style="padding:6px 0;color:#1F1D1A;font-size:13px;font-weight:600">${data.name}</td>
      </tr>
      <tr>
        <td style="width:120px;padding:6px 0;color:#999;font-size:11px;letter-spacing:0.06em;font-family:Helvetica,sans-serif;vertical-align:top">이메일</td>
        <td style="padding:6px 0;color:#1F1D1A;font-size:13px"><a href="mailto:${data.email}" style="color:#9C4A3B">${data.email}</a></td>
      </tr>
      <tr>
        <td style="width:120px;padding:6px 0;color:#999;font-size:11px;letter-spacing:0.06em;font-family:Helvetica,sans-serif;vertical-align:top">LINE ID</td>
        <td style="padding:6px 0;color:#1F1D1A;font-size:13px;font-weight:600">${data.line_id}</td>
      </tr>
      ${data.stay_period ? `<tr>
        <td style="width:120px;padding:6px 0;color:#999;font-size:11px;letter-spacing:0.06em;font-family:Helvetica,sans-serif;vertical-align:top">체류기간</td>
        <td style="padding:6px 0;color:#1F1D1A;font-size:13px">${data.stay_period}</td>
      </tr>` : ""}
    </table>

    <hr style="border:none;border-top:0.5px solid #e5e5e5;margin:0 0 24px">

    <!-- 일정 -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
      <tr>
        <td style="width:120px;padding:6px 0;color:#999;font-size:11px;letter-spacing:0.06em;font-family:Helvetica,sans-serif;vertical-align:top">제1희망일</td>
        <td style="padding:6px 0;color:#1F1D1A;font-size:13px;font-weight:600">${data.preferred_date}</td>
      </tr>
      ${data.alternative_date ? `<tr>
        <td style="width:120px;padding:6px 0;color:#999;font-size:11px;letter-spacing:0.06em;font-family:Helvetica,sans-serif;vertical-align:top">대체일</td>
        <td style="padding:6px 0;color:#1F1D1A;font-size:13px">${data.alternative_date}</td>
      </tr>` : ""}
      <tr>
        <td style="width:120px;padding:6px 0;color:#999;font-size:11px;letter-spacing:0.06em;font-family:Helvetica,sans-serif;vertical-align:top">인원</td>
        <td style="padding:6px 0;color:#1F1D1A;font-size:13px">${data.num_people}명 (${data.age_group})</td>
      </tr>
    </table>

    <hr style="border:none;border-top:0.5px solid #e5e5e5;margin:0 0 24px">

    <!-- 선택 체험 -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
      <tr>
        <td style="width:120px;padding:6px 0;color:#999;font-size:11px;letter-spacing:0.06em;font-family:Helvetica,sans-serif;vertical-align:top">선택 체험</td>
        <td style="padding:6px 0;color:#9C4A3B;font-size:13px;font-weight:600">${modulesText}</td>
      </tr>
    </table>

    ${data.request_message ? `<hr style="border:none;border-top:0.5px solid #e5e5e5;margin:0 0 24px">
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
      <tr>
        <td style="width:120px;padding:6px 0;color:#999;font-size:11px;letter-spacing:0.06em;font-family:Helvetica,sans-serif;vertical-align:top">요청사항</td>
        <td style="padding:6px 0;color:#1F1D1A;font-size:13px;line-height:1.7">${data.request_message.replace(/\n/g, "<br>")}</td>
      </tr>
    </table>` : ""}

    <hr style="border:none;border-top:0.5px solid #e5e5e5;margin:0 0 24px">

    <!-- 예약 ID -->
    <p style="margin:0;color:#bbb;font-size:10px;font-family:Helvetica,sans-serif;letter-spacing:0.06em">
      예약 ID: ${data.reservationId}
    </p>
  </td></tr>

  <!-- 푸터 -->
  <tr><td style="background:#FAF7F2;padding:16px 32px;border-top:0.5px solid #e5e5e5">
    <p style="margin:0;color:#999;font-size:10px;font-family:Helvetica,sans-serif;letter-spacing:0.04em">
      YAHONG TOUR · 이 메일은 자동 발송됩니다
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  return { subject, html };
}
