export interface ApplicantConfirmationData {
  name: string;
  preferred_date: string;
  alternative_date?: string | null;
  num_people: number;
  selected_module_titles: string[];
  lineFriendUrl: string;
}

export function buildApplicantConfirmationEmail(data: ApplicantConfirmationData) {
  const subject = "【yahong tour】お申し込みを受け付けました";

  const moduleListItems = data.selected_module_titles
    .map((t) => `<tr><td style="padding:3px 0;color:#1F1D1A;font-size:13px;line-height:1.7">・${t}</td></tr>`)
    .join("");

  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>お申し込みを受け付けました — yahong tour</title>
</head>
<body style="margin:0;padding:0;background:#EDE9E3;font-family:'Hiragino Kaku Gothic ProN','Yu Gothic',Helvetica,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#EDE9E3;padding:40px 16px">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#FAF7F2;max-width:560px;width:100%">

  <!-- ヘッダー装飾線 -->
  <tr><td style="background:#9C4A3B;height:3px;font-size:0;line-height:0">&nbsp;</td></tr>

  <!-- ロゴ・サイト名 -->
  <tr><td style="padding:32px 40px 24px;border-bottom:0.5px solid #DDD8D0">
    <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.14em;color:#9C4A3B">YAHONG TOUR · SEOUL</p>
  </td></tr>

  <!-- メイン本文 -->
  <tr><td style="padding:36px 40px 0">

    <!-- 宛名 -->
    <p style="margin:0 0 28px;font-family:'Hiragino Mincho ProN','Yu Mincho',Georgia,serif;font-size:20px;color:#1F1D1A;line-height:1.5">
      ${data.name} 様
    </p>

    <!-- 冒頭文 -->
    <p style="margin:0 0 24px;font-size:13px;color:#3D3A37;line-height:2">
      この度は yahong tour にお申し込みいただき、<br>
      誠にありがとうございます。
    </p>
    <p style="margin:0 0 32px;font-size:13px;color:#3D3A37;line-height:2">
      下記の内容で承りました。<br>
      <span style="color:#9C4A3B;font-weight:600">48時間以内にLINEで詳しいご相談をさせていただきます。</span><br>
      万が一お返事がない場合は、お手数ですが<br>
      <a href="mailto:hello@yahongtour.com" style="color:#9C4A3B;text-decoration:none">hello@yahongtour.com</a> までご連絡ください。
    </p>

    <!-- お申し込み内容 -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0EBE3;padding:24px;margin-bottom:32px">
      <tr><td>
        <p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:9px;letter-spacing:0.14em;color:#9C4A3B">お申し込み内容</p>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:110px;padding:5px 0;color:#888;font-size:11px;font-family:Helvetica,sans-serif;letter-spacing:0.06em;vertical-align:top">第一希望日</td>
            <td style="padding:5px 0;color:#1F1D1A;font-size:13px;font-weight:600">${data.preferred_date}</td>
          </tr>
          ${data.alternative_date ? `<tr>
            <td style="width:110px;padding:5px 0;color:#888;font-size:11px;font-family:Helvetica,sans-serif;letter-spacing:0.06em;vertical-align:top">代替日</td>
            <td style="padding:5px 0;color:#1F1D1A;font-size:13px">${data.alternative_date}</td>
          </tr>` : ""}
          <tr>
            <td style="width:110px;padding:5px 0;color:#888;font-size:11px;font-family:Helvetica,sans-serif;letter-spacing:0.06em;vertical-align:top">人数</td>
            <td style="padding:5px 0;color:#1F1D1A;font-size:13px">${data.num_people}名</td>
          </tr>
          <tr>
            <td style="width:110px;padding:5px 0;color:#888;font-size:11px;font-family:Helvetica,sans-serif;letter-spacing:0.06em;vertical-align:top">選択された体験</td>
            <td style="padding:5px 0;vertical-align:top">
              <table cellpadding="0" cellspacing="0">
                ${moduleListItems}
              </table>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>

    <!-- 実費案内 -->
    <p style="margin:0 0 24px;font-size:13px;color:#3D3A37;line-height:2">
      お申し込みは無料ですが、当日は実費（入場料・お食事代など）を<br>
      現金でお支払いいただきます。詳しくはLINEでご案内します。
    </p>

    <!-- LINE友達追加 -->
    <table cellpadding="0" cellspacing="0" style="margin-bottom:36px">
      <tr><td style="background:#9C4A3B;padding:12px 28px">
        <a href="${data.lineFriendUrl}" style="color:#ffffff;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.1em;text-decoration:none;display:block">
          LINE で友だち追加 →
        </a>
      </td></tr>
    </table>

    <!-- 締めの言葉 -->
    <p style="margin:0 0 8px;font-size:13px;color:#3D3A37;line-height:2">
      それでは、お会いできるのを楽しみにしております。
    </p>

  </td></tr>

  <!-- 署名 -->
  <tr><td style="padding:32px 40px 36px">
    <p style="margin:0;font-family:'Hiragino Mincho ProN','Yu Mincho',Georgia,serif;font-size:16px;color:#1F1D1A">yahong</p>
    <p style="margin:4px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.08em;color:#aaa">
      <a href="https://yahongtour.com" style="color:#aaa;text-decoration:none">yahongtour.com</a>
    </p>
  </td></tr>

  <!-- フッター -->
  <tr><td style="background:#F0EBE3;padding:16px 40px;border-top:0.5px solid #DDD8D0">
    <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:10px;color:#aaa;line-height:1.6;letter-spacing:0.04em">
      このメールはお申し込みの確認のために自動送信されています。<br>
      ご不明な点は <a href="mailto:hello@yahongtour.com" style="color:#9C4A3B;text-decoration:none">hello@yahongtour.com</a> までご連絡ください。
    </p>
  </td></tr>

  <!-- 下部装飾線 -->
  <tr><td style="background:#9C4A3B;height:2px;font-size:0;line-height:0">&nbsp;</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  return { subject, html };
}
