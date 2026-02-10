/*--主题设置--*/
//切换主题
const toogleTheme = document.querySelector('.toogleTheme')
toogleTheme.addEventListener('click', () => {
  const theme = document.querySelector('#theme')
  const toogle = theme.href.includes('light.css') ? 'dark.css' : 'light.css'
  theme.href = `./style/${toogle}`
  localStorage.setItem('toogle', toogle)
})

//加载主题
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('toogle')) {
    const theme = document.querySelector('#theme')
    theme.href = `./style/${localStorage.getItem('toogle')}`
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
</head>
<body>
  ${output.innerHTML}
</body>
</html>`
  console.log(htmlContent);

}

const exportBtn = document.querySelector('.export')
exportBtn.addEventListener('click', exportHTML)
