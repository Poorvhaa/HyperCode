export interface TableOfContentsItem {
  id: string;
  label: string;
  level: 2 | 3;
}

function stripMarkup(value: string): string {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function createHeadingId(label: string, index: number): string {
  const id = stripMarkup(label)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return id || `section-${index + 1}`;
}

export function prepareArticleContent(content: string): {
  html: string;
  tableOfContents: TableOfContentsItem[];
} {
  const tableOfContents: TableOfContentsItem[] = [];
  let headingIndex = 0;

  const html = content.replace(
    /<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi,
    (heading, levelValue: string, attributes = '', innerHtml: string) => {
      const level = Number(levelValue) as 2 | 3;
      const label = stripMarkup(innerHtml);
      const existingId = attributes.match(/\sid=["']([^"']+)["']/i)?.[1];
      const id = existingId || createHeadingId(label, headingIndex);
      headingIndex += 1;
      tableOfContents.push({ id, label, level });

      if (existingId) {
        return heading;
      }

      return `<h${level}${attributes} id="${id}">${innerHtml}</h${level}>`;
    }
  );

  return { html, tableOfContents };
}
