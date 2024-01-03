import DOMPurify from "dompurify";

export default function cleanHtml(
  rawString: string,
  convertNewlinesToBreak?: boolean
) {
  if (convertNewlinesToBreak) {
    rawString = (rawString || "")
      .replace(/(\r\n|\n)/gi, "<br/>")
      .replace(/(\t)/gi, "&nbsp;&nbsp;&nbsp;&nbsp;");
  }
  const formattedContent = DOMPurify.sanitize(rawString || "", {
    ADD_ATTR: ["target"],
  });
  return formattedContent;
}
