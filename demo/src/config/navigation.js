function section (title, pages) {
  return { title, pages };
}

function page (name, title) {
  return { name, title, component: require(`../pages/${name}.vue`).default };
}

export default [
  section('Showcase', [
    page('cards', 'Card board'),
    page('form', 'Form elements')
  ]),
  section('Sortables', [
    page('simple', 'Sortable with default options'),
    page('simple-scroller', 'Sortable inside scroller'),
    page('simple-horizontal', 'Horizontal sortable')
  ]),
  section('Groups', [
    page('groups', 'DnD between groups'),
    page('copy', 'Copy draggable'),
    page('nested', 'Nested vertical sortable')
  ]),
  section('Properties', [
    page('lock-axis', 'Lock axis'),
    page('drag-handle', 'Drag handle'),
    page('drag-class', 'Drag and Drop classes'),
    page('drag-delay', 'Drag begin delay of 500ms'),
    page('transition-duration', 'Animation duration 1000ms'),
    page('table', 'Custom tag (table)')
  ]),
  section('Interaction', [
    page('events', 'Callbacks and Events')
  ])
];
