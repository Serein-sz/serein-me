import markdownit from "markdown-it";
import hljs from "highlight.js";
import MarkdownIt from "markdown-it/index.js";
import "highlight.js/styles/github-dark.css";
export const Backend = () => {
  const md: MarkdownIt = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang }).value +
            "</code></pre>"
          );
        } catch (__) {}
      }
      return (
        '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
      );
    },
  });
  const result = md.render(
    "# Hello World \n ## Hello World \n ### Hello World \n #### Hello World \n ##### Hello World \n ```java\nprivate String a = 1;\nclass A {}\n```"
  );

  return (
    <div
      className="prose prose-slate dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: result }}
    ></div>
  );
};
