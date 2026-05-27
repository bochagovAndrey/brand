#!/usr/bin/env python3
"""Generate questions.html from 1.txt"""

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TXT = ROOT / "1.txt"
OUT = ROOT / "questions.html"

URL_RE = re.compile(r"https?://[^\s<,)]+")
LEVEL_RE = re.compile(r"^(A\d?|B\d?|C\d?|A|B|C)\s*—")


def linkify(text: str) -> str:
    escaped = html.escape(text)

    def repl(m: re.Match) -> str:
        url = m.group(0).rstrip(".,;)")
        trailing = m.group(0)[len(url):]
        return (
            f'<a href="{html.escape(url)}" target="_blank" rel="noopener noreferrer">'
            f"{html.escape(url)}</a>{html.escape(trailing)}"
        )

    return URL_RE.sub(repl, escaped)


def para(line: str) -> str:
    stripped = line.strip()
    if stripped.startswith("http://") or stripped.startswith("https://"):
        if stripped == line.strip() and " " not in stripped:
            return (
                f'<p class="faq-card__link"><a href="{html.escape(stripped)}" '
                f'target="_blank" rel="noopener noreferrer">{html.escape(stripped)}</a></p>'
            )
    return f"<p>{linkify(line)}</p>"


def format_answer(answer_lines: list[str], num: int) -> str:
    if num == 5:
        intro = para(answer_lines[0])
        criteria = answer_lines[1:7]
        rest = answer_lines[7:]
        items = "".join(f"<li>{linkify(c.rstrip('; '))}</li>" for c in criteria)
        list_html = f'<ul class="faq-card__list">{items}</ul>'
        rest_html = "".join(para(l) for l in rest)
        return intro + list_html + rest_html

    if num == 32:
        parts = []
        levels = []
        for line in answer_lines:
            if LEVEL_RE.match(line.strip()):
                levels.append(line.strip())
            else:
                parts.append(para(line))
        level_html = "".join(f"<li>{linkify(l)}</li>" for l in levels)
        img = (
            '<figure class="faq-card__figure">'
            '<img src="assets/cefr-levels.jpg" alt="Обучение по уровням CEFR" loading="lazy">'
            "</figure>"
        )
        return (
            "".join(parts)
            + f'<ul class="faq-card__list faq-card__list--levels">{level_html}</ul>'
            + img
        )

    return "".join(para(line) for line in answer_lines)


def card_html(question: str, answer_html: str) -> str:
    q = html.escape(question.strip())
    return f"""      <article class="faq-card">
        <h2 class="faq-card__q">{q}</h2>
        <div class="faq-card__a">{answer_html}</div>
      </article>"""


def main() -> None:
    blocks = [b.strip() for b in TXT.read_text(encoding="utf-8").split("\n\n") if b.strip()]
    cards = []
    for i, block in enumerate(blocks, 1):
        lines = block.split("\n")
        cards.append(card_html(lines[0], format_answer(lines[1:], i)))

    page = f"""<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>32 базовых вопроса и ответы</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/questions.css">
</head>
<body class="faq-page">
  <main class="faq">
    <header class="faq__header">
      <div class="faq__header-left">
        <a href="index.html" class="faq__back">&larr; Назад к материалам дня</a>
        <h1 class="faq__title">32 базовых вопроса</h1>
        <p class="faq__subtitle">Ответы на самые частые вопросы клиентов</p>
      </div>
      <div class="faq__logo" aria-label="Инглекс">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 22c4-8 8-10 12-10s8 2 12 10" stroke="url(#logo-grad)" stroke-width="3" stroke-linecap="round"/>
          <path d="M6 26c4-6 8-8 12-8s8 2 12 8" stroke="url(#logo-grad)" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
          <path d="M6 30c4-4 8-6 12-6s8 2 12 6" stroke="url(#logo-grad)" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
          <defs>
            <linearGradient id="logo-grad" x1="6" y1="16" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop stop-color="#7c3aed"/>
              <stop offset="1" stop-color="#ec4899"/>
            </linearGradient>
          </defs>
        </svg>
        <span>инглекс</span>
      </div>
    </header>

    <div class="faq__grid">
{chr(10).join(cards)}
    </div>
  </main>
</body>
</html>
"""
    OUT.write_text(page, encoding="utf-8")
    print(f"Generated {OUT} with {len(cards)} cards")


if __name__ == "__main__":
    main()
