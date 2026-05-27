(function () {
  const browser = document.getElementById('courses-browser');
  const gridEl = document.getElementById('courses-grid');
  const sidebarEl = document.getElementById('courses-sidebar');
  const titleEl = document.getElementById('courses-detail-title');
  const bodyEl = document.getElementById('courses-detail-body');
  const backBtn = document.getElementById('courses-back-grid');

  if (!browser || !gridEl || typeof COURSES === 'undefined') return;

  let activeId = null;

  function buildGrid() {
    COURSES.forEach(function (course) {
      const li = document.createElement('li');
      li.className = 'course-list__item course-list__item--clickable';
      li.dataset.courseId = course.id;
      li.innerHTML =
        '<span class="course-list__num">' + course.id + '</span>' +
        '<span class="course-list__name">' + course.name + '</span>';
      li.addEventListener('click', function () {
        openCourse(course.id);
      });
      gridEl.appendChild(li);
    });
  }

  function buildSidebar() {
    COURSES.forEach(function (course) {
      const li = document.createElement('li');
      li.className = 'courses-sidebar__item';
      li.dataset.courseId = course.id;
      li.innerHTML =
        '<span class="courses-sidebar__num">' + course.id + '</span>' +
        '<span class="courses-sidebar__name">' + course.name + '</span>';
      li.addEventListener('click', function () {
        selectCourse(course.id, false);
      });
      sidebarEl.appendChild(li);
    });
  }

  function openCourse(id) {
    browser.classList.add('courses-browser--open');
    selectCourse(id, true);
  }

  function selectCourse(id, isInitial) {
    const course = COURSES.find(function (c) {
      return c.id === id;
    });
    if (!course) return;

    activeId = id;
    titleEl.textContent = course.name;

    if (isInitial) {
      bodyEl.innerHTML = course.html;
      bodyEl.classList.remove('courses-detail__body--visible');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          bodyEl.classList.add('courses-detail__body--visible');
        });
      });
    } else {
      bodyEl.classList.remove('courses-detail__body--visible');
      setTimeout(function () {
        bodyEl.innerHTML = course.html;
        requestAnimationFrame(function () {
          bodyEl.classList.add('courses-detail__body--visible');
        });
      }, 150);
    }

    sidebarEl.querySelectorAll('.courses-sidebar__item').forEach(function (item) {
      item.classList.toggle('courses-sidebar__item--active', Number(item.dataset.courseId) === id);
    });
  }

  function closeDetail() {
    browser.classList.remove('courses-browser--open');
    activeId = null;
    bodyEl.classList.remove('courses-detail__body--visible');
  }

  buildGrid();
  buildSidebar();

  if (backBtn) {
    backBtn.addEventListener('click', closeDetail);
  }
})();
