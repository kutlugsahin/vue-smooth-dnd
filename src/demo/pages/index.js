import Simple from './simple';
import SimpleScroller from './simple-scroller';
import SimpleHorizontal from './simple-horizontal';
// export * from './groups';
import Copy from './copy';
import Groups from './groups';
import Nested from './nested';
import DragClass from './drag-class';
import DragDelay from './drag-delay';
import DragHandle from './drag-handle';
import LockAxis from './lock-axis';
import TransitionDuration from './transition-duration';
import Cards from './cards';
import Form from "./form";
import Table from './table';

export {
	Simple, SimpleHorizontal, SimpleScroller, Copy, Groups, Nested, DragClass, DragDelay, DragHandle, LockAxis, TransitionDuration, Cards, Form, Table
}

const getUrl = (pagename) => {
	return `https://github.com/kutlugsahin/vue-smooth-dnd/blob/master/src/demo/pages/${pagename}`;
};


export default [
  {
    title: "Showcase",
    pages: [
      {
        title: "Card board",
        page: "cards",
        url: getUrl("cards.vue")
      },
      {
        title: "Form elements",
        page: "form",
        url: getUrl("form.vue")
      }
    ]
  },
  {
    title: "Basic Sortables",
    pages: [
      {
        title: "Sortable with default options",
        page: "simple",
        url: getUrl("simple.vue")
      },
      {
        title: "Sortable inside scroller",
        page: "simple-scroller",
        url: getUrl("simple-scroller.vue")
      },
      {
        title: "Horizontal sortable",
        page: "simple-horizontal",
        url: getUrl("simple-horizontal.vue")
      }
    ]
  },
  {
    title: "Groups",
    pages: [
      {
        title: "DnD between groups",
        page: "groups",
        url: getUrl("groups.vue")
      },
      {
        title: "Copy draggable",
        page: "copy",
        url: getUrl("copy.vue")
      }
    ]
  },
  {
    title: "Nested Groups",
    pages: [
      {
        title: "Nested vertical sortable",
        page: "nested",
        url: getUrl("nested.vue")
      }
    ]
  },
  {
    title: "Advanced options",
    pages: [
      {
        title: "Lock axis",
        page: "lock-axis",
        url: getUrl("lock-axis.vue")
      },
      {
        title: "Drag begin delay of 500ms",
        page: "drag-delay",
        url: getUrl("drag-delay.vue")
      },
      {
        title: "Drag handle",
        page: "drag-handle",
        url: getUrl("drag-handle.vue")
      },
      {
        title: "Drag and Drop classses",
        page: "drag-class",
        url: getUrl("drag-class.vue")
      },
      {
        title: "Animation duration 500ms",
        page: "transition-duration",
        url: getUrl("transition-duration.vue")
      },
      {
        title: "Table",
        page: "table",
        url: getUrl("table.vue")
      }
    ]
  }
];