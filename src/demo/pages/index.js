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
import Form from './form';

export {
	Simple, SimpleHorizontal, SimpleScroller,Copy, Groups, Nested, DragClass, DragDelay, DragHandle, LockAxis, TransitionDuration, Cards, Form
}

const getUrl = (pagename) => {
	return `https://github.com/kutlugsahin/ngx-smooth-dnd/tree/master/apps/demo/src/pages/${pagename}`;
};


export default [
	{
		title: 'Showcase',
		pages: [
			{
				title: 'Card board', page: 'cards', url: getUrl('cards.ts')
			},
			{
				title: 'Form elements', page: 'form', url: getUrl('form.ts')
			}
		]
	},
	{
		title: 'Basic Sortables',
		pages: [
			{
				title: 'Sortable with default options', page: 'simple', url: getUrl('simple.ts')
			},
			{
				title: 'Sortable inside scroller', page: 'simple-scroller', url: getUrl('simple-scroller.ts')
			}, {
				title: 'Horizontal sortable', page: 'simple-horizontal', url: getUrl('simple-horizontal.ts')
			}
		]
	},
	{
		title: 'Groups',
		pages: [
			{
				title: 'DnD between groups', page: 'groups', url: getUrl('groups.ts')
			},
			{
				title: 'Copy draggable', page: 'copy', url: getUrl('copy.ts')
			}
		]
	},
	{
		title: 'Nested Groups',
		pages: [
			{
				title: 'Nested vertical sortable', page: 'nested', url: getUrl('nested.ts')
			}
		]
	},
	{
		title: 'Advanced options',
		pages: [
			{
				title: 'Lock axis', page: 'lock-axis', url: getUrl('lock-axis.ts')
			},
			{
				title: 'Drag begin delay of 500ms', page: 'drag-delay', url: getUrl('drag-delay.ts')
			},
			{
				title: 'Drag handle', page: 'drag-handle', url: getUrl('drag-handle.ts')
			},
			{
				title: 'Drag and Drop classses', page: 'drag-class', url: getUrl('drag-class.ts')
			},
			{
				title: 'Animation duration 500ms', page: 'transition-duration', url: getUrl('transition-duration.ts')
			}
		]
	}
];