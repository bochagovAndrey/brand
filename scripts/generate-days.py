#!/usr/bin/env python3
"""Generate day-2..day-6 stub pages and root index."""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

DAYS = {
    2: ("День 2", "Тема второго дня", "Описание материалов второго дня."),
    3: ("День 3", "Тема третьего дня", "Описание материалов третьего дня."),
    4: ("День 4", "Тема четвёртого дня", "Описание материалов четвёртого дня."),
    5: ("День 5", "Тема пятого дня", "Описание материалов пятого дня."),
    6: ("День 6", "Тема шестого дня", "Описание материалов шестого дня."),
}


def day_page(num: int, title: str, hero_title: str, hero_desc: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} — Онбординг</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <main class="page">
    <section class="hero">
      <div class="hero__content">
        <h1 class="hero__title">{hero_title}</h1>
        <p class="hero__desc">{hero_desc}</p>
      </div>
    </section>

    <section class="materials">
      <div class="materials__header">
        <h2>Материалы дня</h2>
        <span class="badge">Скоро</span>
      </div>
      <p class="day-empty">Материалы этого дня будут добавлены позже. Отредактируйте <code>day-{num}/index.html</code>.</p>
    </section>
  </main>
</body>
</html>
"""


def root_index() -> str:
    cards = []
    titles = {
        1: ("Знакомство с брендом", "Презентация, 32 вопроса, тест"),
        2: ("Тема второго дня", "Материалы в разработке"),
        3: ("Тема третьего дня", "Материалы в разработке"),
        4: ("Тема четвёртого дня", "Материалы в разработке"),
        5: ("Тема пятого дня", "Материалы в разработке"),
        6: ("Тема шестого дня", "Материалы в разработке"),
    }
    for n, (t, d) in titles.items():
        cards.append(f"""      <a href="day-{n}/" class="day-picker__card">
        <span class="day-picker__num">День {n}</span>
        <h2 class="day-picker__title">{t}</h2>
        <p class="day-picker__desc">{d}</p>
      </a>""")

    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Онбординг — выбор дня</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <main class="day-picker">
    <h1 class="day-picker__heading">Онбординг</h1>
    <p class="day-picker__sub">Выберите день — каждый открывается по прямой ссылке</p>
    <div class="day-picker__grid">
{chr(10).join(cards)}
    </div>
  </main>
</body>
</html>
"""


def main() -> None:
    for num, (title, hero_title, hero_desc) in DAYS.items():
        path = ROOT / f"day-{num}" / "index.html"
        path.write_text(day_page(num, title, hero_title, hero_desc), encoding="utf-8")
        print(f"Wrote {path}")

    root = ROOT / "index.html"
    root.write_text(root_index(), encoding="utf-8")
    print(f"Wrote {root}")


if __name__ == "__main__":
    main()
