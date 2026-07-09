import { Fragment, createElement } from "react";

/**
 * DB の title フィールドに保存された \n を <br /> に変換して返す。
 * null / undefined が渡されても安全に null を返す。
 */
export function renderLineBreaks(text: string | null | undefined): React.ReactNode {
  if (text == null || text === "") return null;
  const parts = text.split("\n");
  if (parts.length === 1) return text;

  return parts.map((part, i) =>
    i < parts.length - 1
      ? createElement(Fragment, { key: i }, part, createElement("br"))
      : createElement(Fragment, { key: i }, part)
  );
}

/**
 * \n を除去した1行テキストを返す (meta description, og:title などに使用)
 * null / undefined が渡されても安全に空文字を返す。
 */
export function flattenLineBreaks(text: string | null | undefined): string {
  if (text == null) return "";
  return text.replace(/\n/g, "");
}
