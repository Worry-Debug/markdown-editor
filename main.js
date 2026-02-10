/*--主题设置--*/
const toogleTheme = document.querySelector('.toogleTheme')
const theme = document.querySelector('#theme')
const hljsTheme = document.querySelector('#hljsTheme')
//切换主题
toogleTheme.addEventListener('click', () => {
  const toogle = theme.href.includes('light.css') ? 'dark.css' : 'light.css'
  const toogleHljs = hljsTheme.href.includes('github') ? 'atom-one-dark' : 'github'
  theme.href = `./style/${toogle}`
  hljsTheme.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/${toogleHljs}.min.css`
  localStorage.setItem('toogle', toogle)
  localStorage.setItem('toogleHljs',toogleHljs)
})

//加载主题
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('toogle')) {
    theme.href = `./style/${localStorage.getItem('toogle')}`
  }
  if (localStorage.getItem('toogleHljs')) {
    hljsTheme.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/${localStorage.getItem('toogleHljs')}.min.css`
  }
})

/*--语法支持和代码高亮--*/
//marked配置 
marked.setOptions({
  breaks: true,
  gfm: true,
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  }
})

//实现实时预览和自动保存
const input = document.querySelector('.input')
const output = document.querySelector('.output')

input.addEventListener('input', () => {
  localStorage.setItem('edit-content', input.value)
  output.innerHTML = marked.parse(input.value)
  hljs.highlightAll()
})

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('edit-content')) {
    input.value = localStorage.getItem('edit-content')
    output.innerHTML = marked.parse(input.value)
  }
  hljs.highlightAll()
})

/*--导出--*/
function exportHTML() {
  const title = prompt('请输入导出文件名称')
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Segoe UI Emoji', 'Segoe UI Symbol', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #2d3748;
    background: #ffffff;
    padding: 40px;
    max-width: 210mm;
    margin: 0 auto;
    font-size: 12pt;
}

h1 {
    font-size: 24pt;
    font-weight: 700;
    color: #1a202c;
    margin: 24px 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 2px solid #e2e8f0;
    page-break-after: avoid;
}

h2 {
    font-size: 18pt;
    font-weight: 600;
    color: #2d3748;
    margin: 20px 0 12px 0;
    padding-bottom: 6px;
    border-bottom: 1px solid #e2e8f0;
    page-break-after: avoid;
}

h3 {
    font-size: 14pt;
    font-weight: 600;
    color: #4a5568;
    margin: 16px 0 10px 0;
    page-break-after: avoid;
}

h4 {
    font-size: 12pt;
    font-weight: 600;
    color: #4a5568;
    margin: 14px 0 8px 0;
    page-break-after: avoid;
}

h5,
h6 {
    font-size: 11pt;
    font-weight: 600;
    color: #718096;
    margin: 12px 0 6px 0;
    page-break-after: avoid;
}

/* 段落和文本 */
p {
    margin-bottom: 16px;
    line-height: 1.8;
    text-align: justify;
    orphans: 2;
    widows: 2;
}

a {
    color: #4f46e5;
    text-decoration: none;
    border-bottom: 1px solid rgba(79, 70, 229, 0.3);
}

a:hover {
    color: #07b7f2;
    border-bottom-color: #07b7f2;
}

ul,
ol {
    margin: 0 0 16px 32px;
    padding-left: 0;
}

li {
    margin-bottom: 8px;
    line-height: 1.6;
}

ul li {
    list-style-type: disc;
}

ol li {
    list-style-type: decimal;
}

li>ul,
li>ol {
    margin-top: 8px;
    margin-bottom: 0;
}

code {
    font-family: 'SF Mono', Monaco, 'Cascadia Code', Consolas, 'Courier New', monospace;
    font-size: 10pt;
    background-color: #f8f9fa;
    padding: 2px 6px;
    border-radius: 3px;
    color: #dd4a68;
    border: 1px solid #e2e8f0;
}

pre {
    background-color: #f8f9fa;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 16px;
    margin: 16px 0;
    overflow: auto;
    page-break-inside: avoid;
}

pre code {
    background-color: transparent;
    padding: 0;
    border: none;
    color: inherit;
    font-size: 10pt;
    line-height: 1.5;
}

blockquote {
    border-left: 4px solid #4f46e5;
    padding: 12px 20px;
    margin: 16px 0;
    background-color: #f8fafc;
    color: #4a5568;
    font-style: italic;
    border-radius: 0 6px 6px 0;
}

blockquote p:last-child {
    margin-bottom: 0;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    page-break-inside: avoid;
}

th {
    background-color: #f8f9fa;
    color: #2d3748;
    font-weight: 600;
    padding: 12px 16px;
    text-align: left;
    border-bottom: 2px solid #e2e8f0;
}

td {
    padding: 10px 16px;
    border-bottom: 1px solid #e2e8f0;
}

tr:nth-child(even) {
    background-color: #f8fafc;
}

hr {
    border: none;
    height: 1px;
    background: linear-gradient(to right, transparent, #e2e8f0, transparent);
    margin: 32px 0;
}

img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 16px auto;
    border-radius: 4px;
    page-break-inside: avoid;
}

strong {
    font-weight: 700;
    color: #2d3748;
}

em {
    font-style: italic;
    color: #4a5568;
}

del {
    color: #a0aec0;
    text-decoration: line-through;
}

mark {
    background-color: rgba(246, 173, 85, 0.3);
    padding: 2px 4px;
    border-radius: 2px;
}

kbd {
    display: inline-block;
    padding: 3px 8px;
    font-family: 'SF Mono', Monaco, 'Cascadia Code', Consolas, monospace;
    font-size: 9pt;
    color: #4a5568;
    background-color: #f7fafc;
    border: 1px solid #cbd5e0;
    border-radius: 4px;
    box-shadow: 0 1px 0 #cbd5e0;
}

sup,
sub {
    font-size: 9pt;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}

sup {
    top: -0.5em;
}

sub {
    bottom: -0.25em;
}

.task-list-item {
    list-style-type: none;
    margin-left: -1.5em;
}

.task-list-item input[type="checkbox"] {
    margin-right: 8px;
}

.footnotes {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #e2e8f0;
    font-size: 10pt;
}

.footnotes ol {
    margin-left: 20px;
}

.footnotes li {
    margin-bottom: 8px;
}

@page {
    margin: 20mm;

    @top-left {
        content: "Markdown文档";
        font-size: 10pt;
        color: #718096;
    }

    @top-right {
        content: counter(page);
        font-size: 10pt;
    }

    @bottom-center {
        content: "第 " counter(page) " 页，共 " counter(pages) " 页";
        font-size: 10pt;
        color: #718096;
    }
}

.page-break {
    page-break-before: always;
}

.avoid-break {
    page-break-inside: avoid;
}

.toc {
    margin: 32px 0;
    padding: 20px;
    background-color: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.toc-title {
    font-size: 14pt;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 16px;
}

.toc ul {
    list-style-type: none;
    margin-left: 0;
}

.toc li {
    margin-bottom: 8px;
}

.toc a {
    color: #4a5568;
    text-decoration: none;
    border-bottom: none;
}

.toc a:hover {
    color: #4f46e5;
}

.code-block {
    position: relative;
}

.line-numbers {
    position: absolute;
    left: 0;
    top: 0;
    padding: 16px 8px;
    background-color: #edf2f7;
    border-right: 1px solid #e2e8f0;
    text-align: right;
    user-select: none;
    font-family: 'SF Mono', Monaco, 'Cascadia Code', Consolas, monospace;
    font-size: 10pt;
    color: #718096;
}

.info-box {
    padding: 16px;
    margin: 16px 0;
    background-color: #e6f3ff;
    border-left: 4px solid #2196f3;
    border-radius: 0 4px 4px 0;
}

.warning-box {
    padding: 16px;
    margin: 16px 0;
    background-color: #fff8e6;
    border-left: 4px solid #ff9800;
    border-radius: 0 4px 4px 0;
}

.success-box {
    padding: 16px;
    margin: 16px 0;
    background-color: #e6ffe6;
    border-left: 4px solid #4caf50;
    border-radius: 0 4px 4px 0;
}

@media print {
    body {
        padding: 0;
    }

    a {
        color: #0000ee;
        text-decoration: underline;
    }

    .no-print {
        display: none !important;
    }
}

@media (prefers-color-scheme: dark) {
    body {
        background-color: #1a202c;
        color: #e2e8f0;
    }

    h1,
    h2 {
        color: #f7fafc;
        border-bottom-color: #4a5568;
    }

    h3,
    h4 {
        color: #cbd5e0;
    }

    code,
    pre {
        background-color: #2d3748;
        border-color: #4a5568;
    }

    blockquote {
        background-color: #2d3748;
        color: #cbd5e0;
    }

    table th {
        background-color: #2d3748;
        color: #f7fafc;
        border-bottom-color: #4a5568;
    }

    table td {
        border-bottom-color: #4a5568;
    }

    tr:nth-child(even) {
        background-color: #2d3748;
    }
}</style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/${localStorage.getItem('toogleHljs')}.min.css">
</head>
<body>
  ${output.innerHTML}
</body>
</html>`
  const blob = new Blob([htmlContent],{type:'text/html;charset=utf-8'})
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = title
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const exportBtn = document.querySelector('.export')
exportBtn.addEventListener('click', exportHTML)
