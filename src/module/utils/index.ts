declare let hljs: any;

export function markDownListItem(text: string): string {
  if (!/^\s*\[[x ]]\s*/.test(text)) {
    return `<li>${text}</li>`;
  } else {
    text = text
      .replace(
        /^\s*\[ ]\s*/,
        '<i class="material-icons" style="vertical-align:top;margin-bottom:0.2em;margin-left:-0.8em;">check_box_outline_blank</i> '
      )
      .replace(
        /^\s*\[x]\s*/,
        '<i class="material-icons" style="vertical-align:top;margin-bottom:0.2em;margin-left:-0.8em;">check_box</i> '
      );
    return `<li style="list-style: none;">${text}</li>`;
  }
}

export function markDownTable(header: string, body: string): string {
  return `<table class="table table-bordered">\n<thead>\n${header}</thead>\n<tbody>\n${body}</tbody>\n</table>\n`;
}

export function markDownCode(code: any, language: any): string {
  const validLang = !!(language && hljs.getLanguage(language));
  const highlighted = validLang ? hljs.highlight(language, code).value : code;
  return `<pre style="padding: 0; border-radius: 0;"><code class="hljs ${language}">${highlighted}</code></pre>`;
}
