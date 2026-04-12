import os
import sys
import datetime
import math
import subprocess

def check_dependencies():
    try:
        import markdown
    except ImportError:
        print("未找到 markdown 库。正在自动为您安装...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "markdown"])
        print("安装完成！\n")

# 检查并安装 markdown 库
check_dependencies()
import markdown

def convert_md_to_html(md_filepath):
    # 检查文件是否存在
    if not os.path.exists(md_filepath):
        print(f"错误: 找不到文件 {md_filepath}")
        return

    # 读取 Markdown 内容
    with open(md_filepath, 'r', encoding='utf-8') as f:
        md_content = f.read()

    # 提取标题 (假设Markdown的第一个 # 是一级标题)
    lines = md_content.split('\n')
    title = "未命名博文"
    for line in lines:
        if line.startswith('# '):
            title = line[2:].strip()
            # 从内容中去掉标题，因为模板的 header 里已经有 h1 标题了
            md_content = md_content.replace(line, '', 1)
            break

    # 计算预计阅读时间 (假设正常人每分钟阅读大约400个字符)
    word_count = len(md_content)
    read_time = math.ceil(word_count / 400)
    if read_time < 1:
        read_time = 1

    # 获取当前日期
    date_str = datetime.datetime.now().strftime("%Y年%m月%d日")

    # 将 Markdown 转换为 HTML
    # fenced_code 插件用于支持 ```python 这种代码块
    # pymdownx.arithmatex 用于支持 LaTeX 数学公式
    html_content = markdown.markdown(
        md_content, 
        extensions=['fenced_code', 'pymdownx.arithmatex'],
        extension_configs={
            'pymdownx.arithmatex': {
                'generic': True
            }
        }
    )

    # 读取模板
    script_dir = os.path.dirname(os.path.abspath(__file__))
    template_path = os.path.join(script_dir, '_template.html')
    if not os.path.exists(template_path):
        print(f"错误: 找不到模板文件 {template_path}")
        return

    with open(template_path, 'r', encoding='utf-8') as f:
        template = f.read()

    # 替换模板变量
    final_html = template.replace('{{TITLE}}', title)
    final_html = final_html.replace('{{DATE}}', date_str)
    final_html = final_html.replace('{{READ_TIME}}', str(read_time))
    final_html = final_html.replace('{{CONTENT}}', html_content)

    # 生成的 HTML 文件名 (把 .md 替换为 .html)
    output_filename = os.path.splitext(os.path.basename(md_filepath))[0] + '.html'
    
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write(final_html)

    print(f"✅ 成功! 你的博文已生成为: {output_filename}")
    print(f"你可以双击打开 {output_filename} 预览效果，并在 index.html 中将它添加到 Blog 列表中。")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("使用方法: python3 build_blog.py <你的markdown文件.md>")
    else:
        convert_md_to_html(sys.argv[1])