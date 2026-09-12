'use strict';
document.querySelectorAll('.filter-bar').forEach(bar => {
  const list = document.getElementById(bar.dataset.target);
  const buttons = [...bar.querySelectorAll('button[data-filter]')];
  const result = bar.querySelector('.results');
  function apply(filter) {
    let count = 0;
    [...list.children].forEach(item => {
      item.hidden = filter !== 'all' && item.dataset.kind !== filter;
      if (!item.hidden) count++;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    result.textContent = `${count} ${result.dataset.unit}`;
  }
  buttons.forEach(button => button.addEventListener('click', () => apply(button.dataset.filter)));
  apply('all');
});
