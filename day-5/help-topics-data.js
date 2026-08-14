function helpChatBtn(label, url) {
  return (
    '<a class="help-table__chat-btn" href="' +
    url +
    '" target="_blank" rel="noopener noreferrer">' +
    '<span class="help-table__chat-btn__text">' +
    label +
    '</span>' +
    '<svg class="help-table__chat-btn__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>' +
    '<polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>' +
    '</svg></a>'
  );
}

function helpDeptFilterStart() {
  return (
    '<div class="help-dept-filter" data-help-dept-filter>' +
    '<div class="help-dept-filter__buttons" role="group" aria-label="Фильтр по отделу">' +
    '<button type="button" class="help-dept-filter__btn help-dept-filter__btn--active" data-help-dept-btn="qualifier" aria-pressed="true">Квалификаторы</button>' +
    '<button type="button" class="help-dept-filter__btn" data-help-dept-btn="coordinator" aria-pressed="false">Координаторы</button>' +
    '</div>'
  );
}

function helpDeptFilterEnd() {
  return '</div>';
}

var PACHCA_CHATS = {
  it: 'https://app.pachca.com/chats/21823477',
  team: 'https://app.pachca.com/chats/25108339',
  news: 'https://app.pachca.com/chats/24553662',
  coordTeam: 'https://app.pachca.com/chats/39937865',
  coordNews: 'https://app.pachca.com/chats/39938068',
  qualCoord: 'https://app.pachca.com/chats/40198312',
  salesDept: 'https://app.pachca.com/chats/41370522',
  kmCoord: 'https://app.pachca.com/chats/21822422',
  kmCoordinators: 'https://app.pachca.com/chats/40216284',
  salesKmCoord: 'https://app.pachca.com/chats/30190070',
  sales: 'https://app.pachca.com/chats/30234862',
  mvu: 'https://app.pachca.com/chats/37597279',
  corp: 'https://app.pachca.com/chats/25906306',
  extra: 'https://app.pachca.com/chats/32168808',
  urgent: 'https://app.pachca.com/chats/32912328',
  shvu: 'https://app.pachca.com/chats/22258949',
  methodist: 'https://app.pachca.com/chats/22257559',
  deals: 'https://app.pachca.com/chats/24553799',
  group: 'https://app.pachca.com/chats/22273273',
  skills: 'https://app.pachca.com/chats/22260436',
  techSupport: 'https://app.pachca.com/chats/22263981',
};

var HELP_TOPICS = [
  {
    id: 'tech',
    emoji: '🛠️',
    name: 'Технические проблемы',
    html:
      '<div class="help-table-wrap">' +
      '<table class="help-table">' +
      '<thead><tr>' +
      '<th scope="col">Вопрос</th>' +
      '<th scope="col">Кому</th>' +
      '<th scope="col">Куда</th>' +
      '</tr></thead><tbody>' +
      '<tr>' +
      '<td>' +
      '<p class="help-table__lead">Локальные проблемы (у одного человека):</p>' +
      '<ol class="help-table__list help-table__list--ordered">' +
      '<li>Проблемы с МАНГО (НЕ СВЯЗЬ ТЕЛЕФОНИИ С АМО, а звонки, логины);</li>' +
      '<li>Проблемы с месенджерами, телеграм, пачка;</li>' +
      '<li>ВПН, сайты не открываются;</li>' +
      '<li>Явки/логины/пароли;</li>' +
      '<li>Проблемы с ПК.</li>' +
      '</ol></td>' +
      '<td>Вячеслав Ершов</td>' +
      '<td>Можно в ЛС, можно в чат<br>' +
      helpChatBtn('К&К — IT', PACHCA_CHATS.it) +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Общие проблемы в ЛК/амо/манго (например, не сработало распределение в амо, не начислился КПИ в ЛК).</td>' +
      '<td>Никого тегать не надо — ребята сами подхватят свой вопрос</td>' +
      '<td>В чат<br>' +
      helpChatBtn('К&К — IT', PACHCA_CHATS.it) +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td>У студента не получается подключиться к ВУ</td>' +
      '<td>Никого тегать не надо — ребята сами подхватят свой вопрос</td>' +
      '<td>В чат<br>' +
      helpChatBtn('Tech Support Englex', PACHCA_CHATS.techSupport) +
      '</td>' +
      '</tr>' +
      '</tbody></table></div>',
  },
  {
    id: 'team',
    emoji: '💡',
    name: 'Коммуникация с командой',
    html:
      helpDeptFilterStart() +
      '<div class="help-table-wrap">' +
      '<table class="help-table help-table--two-cols">' +
      '<thead><tr>' +
      '<th scope="col">Что делаем</th>' +
      '<th scope="col">Название чата в Пачке</th>' +
      '</tr></thead><tbody>' +
      '<tr data-help-dept="qualifier">' +
      '<td><ul class="help-table__list">' +
      '<li>Каждое утро перед началом смены пишем «Доброе утро»;</li>' +
      '<li>Пишем о своём перерыве (что ушли на него и что вернулись);</li>' +
      '<li>Вопросы в течение смены, если они могут быть полезны остальным коллегам;</li>' +
      '<li>В конце каждой смены отправляем сюда отчёт.</li>' +
      '</ul></td>' +
      '<td>' +
      helpChatBtn('Команда Квалификации 💌', PACHCA_CHATS.team) +
      '</td>' +
      '</tr>' +
      '<tr data-help-dept="coordinator">' +
      '<td><ul class="help-table__list">' +
      '<li>Каждое утро перед началом смены пишем «Доброе утро»;</li>' +
      '<li>Пишем о своём перерыве (что ушли на него и что вернулись);</li>' +
      '<li>Вопросы в течение смены, если они могут быть полезны остальным коллегам;</li>' +
      '<li>В конце каждой смены отправляем сюда отчёт.</li>' +
      '</ul></td>' +
      '<td>' +
      helpChatBtn('Команда Координации', PACHCA_CHATS.coordTeam) +
      '</td>' +
      '</tr>' +
      '<tr data-help-dept="qualifier">' +
      '<td><p class="help-table__lead">Посты с новостями для отдела.</p>' +
      '<ul class="help-table__list">' +
      '<li>При ознакомлении — обязательно ставить реакцию, чтобы было видно, что вы ознакомились;</li>' +
      '<li>После выходных — обязательно прочесть все новости за ваши выходные, чтобы все были в контексте.</li>' +
      '</ul></td>' +
      '<td>' +
      helpChatBtn('Новости Квалификация', PACHCA_CHATS.news) +
      '</td>' +
      '</tr>' +
      '<tr data-help-dept="coordinator">' +
      '<td><p class="help-table__lead">Посты с новостями для отдела.</p>' +
      '<ul class="help-table__list">' +
      '<li>При ознакомлении — обязательно ставить реакцию, чтобы было видно, что вы ознакомились;</li>' +
      '<li>После выходных — обязательно прочесть все новости за ваши выходные, чтобы все были в контексте.</li>' +
      '</ul></td>' +
      '<td>' +
      helpChatBtn('Новости Координация', PACHCA_CHATS.coordNews) +
      '</td>' +
      '</tr>' +
      '</tbody></table></div>' +
      helpDeptFilterEnd(),
  },
  {
    id: 'departments',
    emoji: '♻️',
    name: 'Коммуникация между смежными отделами',
    html:
      helpDeptFilterStart() +
      '<div class="help-table-wrap">' +
      '<table class="help-table help-table--two-cols">' +
      '<thead><tr>' +
      '<th scope="col">Запросы</th>' +
      '<th scope="col">Название чата в Пачке</th>' +
      '</tr></thead><tbody>' +
      '<tr data-help-dept="qualifier coordinator">' +
      '<td><ul class="help-table__list">' +
      '<li>Передача ПИ;</li>' +
      '<li>Обращения между отделами;</li>' +
      '<li>Уточнения по заявкам/сделкам.</li>' +
      '</ul></td>' +
      '<td>' +
      helpChatBtn('Квалификация & Координация', PACHCA_CHATS.qualCoord) +
      '</td>' +
      '</tr>' +
      '<tr data-help-dept="qualifier coordinator">' +
      '<td>' +
      '<p class="help-table__lead">Это общий чат Департамента.</p>' +
      '<ul class="help-table__list">' +
      '<li>Анонсы изменений в департаменте и новости, которые могут касаться всех;</li>' +
      '<li>Объявление ТОП-ов недели / месяца / квартала среди разных отделов;</li>' +
      '<li>Клевые рабочие инструменты для роста продуктивности, улучшения показателей и т.д.;</li>' +
      '<li>Инсайты, которые помогли нам стать лучше, опередить рынок и конкурентов;</li>' +
      '<li>Обсуждение системных вопросов и улучшений по работе департамента;</li>' +
      '<li>Общие встречи — пока есть только квартальная встреча компании.</li>' +
      '</ul></td>' +
      '<td>' +
      helpChatBtn('Департамент продаж', PACHCA_CHATS.salesDept) +
      '</td>' +
      '</tr>' +
      '<tr data-help-dept="qualifier">' +
      '<td><ul class="help-table__list">' +
      '<li>передача сообщения из ПИ;</li>' +
      '<li>заявки на возобновление (с нулевым балансом и сроком прерыва более 90 дней);</li>' +
      '<li>передача информации от КМ (например, что препод болеет или просьбы не занимать какой-то слот).</li>' +
      '</ul></td>' +
      '<td>' +
      helpChatBtn('КМ — Квалификаторы', PACHCA_CHATS.kmCoord) +
      '</td>' +
      '</tr>' +
      '<tr data-help-dept="qualifier">' +
      '<td><ul class="help-table__list">' +
      '<li>передача сообщения из ПИ;</li>' +
      '<li>если клиент прошёл ВУ и хочет оплатить;</li>' +
      '<li>если клиент без ВУ хочет сразу оплатить и от ВУ отказывается.</li>' +
      '</ul></td>' +
      '<td>' +
      helpChatBtn('Квалификаторы и Сопровождение оплат', PACHCA_CHATS.sales) +
      '</td>' +
      '</tr>' +
      '<tr data-help-dept="coordinator">' +
      '<td><ul class="help-table__list">' +
      '<li>Вопросы между отделами;</li>' +
      '<li>Передача ПИ.</li>' +
      '</ul></td>' +
      '<td>' +
      helpChatBtn('КМ — Координаторы', PACHCA_CHATS.kmCoordinators) +
      '</td>' +
      '</tr>' +
      '<tr data-help-dept="coordinator">' +
      '<td><ul class="help-table__list">' +
      '<li>Препод уточняет, будет ли заниматься потенциальный студент (к СО);</li>' +
      '<li>СО уточняет, есть ли преподы под конкретное расписание/запрос;</li>' +
      '<li>Прочие запросы между КМ-Координаторами-СО.</li>' +
      '</ul></td>' +
      '<td>' +
      helpChatBtn('Продажи+КМ+Коорд: вопросы', PACHCA_CHATS.salesKmCoord) +
      '</td>' +
      '</tr>' +
      '<tr data-help-dept="qualifier coordinator">' +
      '<td>Чат для уведомлений о СВУ, которые назначили менее чем за час до урока.</td>' +
      '<td>' +
      helpChatBtn('МВУ + К&К', PACHCA_CHATS.mvu) +
      '</td>' +
      '</tr>' +
      '<tr data-help-dept="qualifier coordinator">' +
      '<td>Передача заявки для оплаты от юр. лица.</td>' +
      '<td>' +
      helpChatBtn('Корпоративное обучение: заявки', PACHCA_CHATS.corp) +
      '</td>' +
      '</tr>' +
      '</tbody></table></div>' +
      helpDeptFilterEnd(),
  },
  {
    id: 'teachers',
    emoji: '🧑🏻‍🏫',
    name: 'Коммуникация с преподавателями',
    html:
      '<div class="help-table-wrap">' +
      '<table class="help-table help-table--two-cols">' +
      '<thead><tr>' +
      '<th scope="col">Что делаем</th>' +
      '<th scope="col">Название чата в Пачке</th>' +
      '</tr></thead><tbody>' +
      '<tr>' +
      '<td>' +
      '<p class="help-table__note">Полная информация — в материалах онбординга.</p>' +
      '<p>Если по заданным критериям в ЛК вы не можете найти подходящего преподавателя для студента по графику или по курсу, не стоит писать методистам в чат — пишите в этот чат с просьбой откликнуться того, кто готов взять ученика, открыть под него нужные часы и взять на указанный курс.</p>' +
      '</td>' +
      '<td>' +
      helpChatBtn('Доп.предложения по студентам', PACHCA_CHATS.extra) +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Невыходы на РУ и ВУ/СВУ от преподавателей. Быстрое реагирование.</td>' +
      '<td>' +
      helpChatBtn('СРОЧНО невыход, форс-мажор', PACHCA_CHATS.urgent) +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td>' +
      '<p class="help-table__note">Полная информация — в материалах онбординга.</p>' +
      '<p>Запросы на ШВУ от Екатерины Валягиной и дата и время назначенного ШВУ.</p>' +
      '</td>' +
      '<td>' +
      helpChatBtn('ШВУ (шпионские вводные уроки)', PACHCA_CHATS.shvu) +
      '</td>' +
      '</tr>' +
      '</tbody></table></div>',
  },
  {
    id: 'questions',
    emoji: '❓',
    name: 'Вопросы',
    html:
      '<div class="help-table-wrap">' +
      '<table class="help-table help-table--two-cols">' +
      '<thead><tr>' +
      '<th scope="col">Вопрос</th>' +
      '<th scope="col">В каком чате</th>' +
      '</tr></thead><tbody>' +
      '<tr>' +
      '<td><p class="help-table__lead">Специфичный запрос клиента и можем ли мы ему помочь:</p>' +
      '<ul class="help-table__list">' +
      '<li>необычная сфера (например, англ для моряков);</li>' +
      '<li>подготовка к какому-то необычному экзамену;</li>' +
      '<li>сомнения в том, какой курс клиенту поставить при записи на ВУ;</li>' +
      '<li>необычные пожелания по преподу (чтобы у преподавателя был определённый опыт/диплом и т.п.);</li>' +
      '<li>особенности курсов для детей/подростков/взрослых (когда подросткам можно/нельзя назначать ВУ по курсам 18+, ВУ с носителями для подростков и т.п.).</li>' +
      '</ul></td>' +
      '<td>' +
      helpChatBtn('Менеджер спрашивает — Методист отвечает', PACHCA_CHATS.methodist) +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td><p class="help-table__lead">Вопросы по конкретным заявкам/сделкам:</p>' +
      '<ul class="help-table__list">' +
      '<li>вопросы/уточнения по подбору от КМ, если подбору что-то непонятно из описания в сделке;</li>' +
      '<li>передача доп. информации от координаторов (например, если узнали ТГ после передачи в подбор).</li>' +
      '</ul></td>' +
      '<td>' +
      helpChatBtn('Вопросы по заявкам/сделкам: КМ, квал, коорд', PACHCA_CHATS.deals) +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td><p class="help-table__lead">В основном для КМ.</p></td>' +
      '<td>' +
      helpChatBtn('Групповые уроки, интенсивы, мастер-классы: вопросы', PACHCA_CHATS.group) +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td><p class="help-table__lead">В основном для КМ.</p></td>' +
      '<td>' +
      helpChatBtn('Skills: вопросы от КМ, квал, коорд', PACHCA_CHATS.skills) +
      '</td>' +
      '</tr>' +
      '</tbody></table></div>',
  },
];
