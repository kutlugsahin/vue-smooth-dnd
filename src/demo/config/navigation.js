import Cards from '../pages/cards';
import Form from "../pages/form";

import Simple from '../pages/simple';
import SimpleScroller from '../pages/simple-scroller';
import SimpleHorizontal from '../pages/simple-horizontal';

import Groups from '../pages/groups';
import Copy from '../pages/copy';
import Nested from '../pages/nested';

import LockAxis from '../pages/lock-axis';
import DragHandle from '../pages/drag-handle';
import DragClass from '../pages/drag-class';
import DragDelay from '../pages/drag-delay';
import TransitionDuration from '../pages/transition-duration';
import Table from '../pages/table';

import Events from '../pages/events';

function section (title, pages) {
  return { title, pages }
}

function page (name, title, component) {
  return { name, title, component }
}

export default [
  section('Showcase', [
    page('cards', 'Card board', Cards),
    page('form', 'Form elements', Form)
  ]),
  section('Sortables', [
    page('simple', 'Sortable with default options', Simple),
    page('simple-scroller', 'Sortable inside scroller', SimpleScroller),
    page('simple-horizontal', 'Horizontal sortable', SimpleHorizontal)
  ]),
  section('Groups', [
    page('groups', 'DnD between groups', Groups),
    page('copy', 'Copy draggable', Copy),
    page('nested', 'Nested vertical sortable', Nested)
  ]),
  section('Properties', [
    page('lock-axis', 'Lock axis', LockAxis),
    page('drag-handle', 'Drag handle', DragHandle),
    page('drag-class', 'Drag and Drop classses', DragClass),
    page('drag-delay', 'Drag begin delay of 500ms', DragDelay),
    page('transition-duration', 'Animation duration 500ms', TransitionDuration),
    page('table', 'Custom Tags / Table', Table),
  ]),
  section('Interaction', [
    page('events', 'Callbacks and Events', Events),
  ])
]
