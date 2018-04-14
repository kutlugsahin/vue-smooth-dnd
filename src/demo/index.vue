<template>
	<div :class="'app'">
	<div :class="navButtonClass" @click="toggleNav()">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</div>
	<div :class="navigatorClass">
		<div :class="'navigator-content'">
			<div :class="'navigator-header'">
				<h3>vue-smooth-dnd</h3>
				<div :class="'divider'"></div>
			</div>
			<div>
				<div v-for="section in pages" :key="section.title" :class="'menu-section'">
					<h4>{{section.title}}</h4>
					<ul>						
						<li v-for="page of section.pages" :key="page.title" :class="page.selected ? 'selected' : ''" @click="selectPage(page)">{{page.title}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div :class="'content'">
		<div :class="headerClass">
			{{selectedPage.title}}
			<div :class="'source-code'" @click="openCode()">
				<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZml0PSIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIGZvY3VzYWJsZT0iZmFsc2UiPgogICAgPHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgyNHYyNEgwVjB6Ij48L3BhdGg+CiAgICA8cGF0aCBkPSJNOS40IDE2LjZMNC44IDEybDQuNi00LjZMOCA2bC02IDYgNiA2IDEuNC0xLjR6bTUuMiAwbDQuNi00LjYtNC42LTQuNkwxNiA2bDYgNi02IDYtMS40LTEuNHoiIGZpbGw9IiNGRkYiPjwvcGF0aD4KPC9zdmc+Cg=="
				 alt="" />
				<span>source</span>
			</div>
		</div>
		<div :class="'demo'">
			<Simple v-if="selectedPage.page == 'simple'"></Simple>
			<SimpleScroller v-else-if="selectedPage.page == 'simple-scroller'"></SimpleScroller>
			<SimpleHorizontal v-else-if="selectedPage.page == 'simple-horizontal'"></SimpleHorizontal>
			<Copy v-else-if="selectedPage.page == 'copy'"></Copy>
			<Groups v-else-if="selectedPage.page == 'groups'"></Groups>
			<Nested v-else-if="selectedPage.page == 'nested'"></Nested>			
			<LockAxis v-if="selectedPage.page == 'lock-axis'"></LockAxis>
			<DragHandle v-if="selectedPage.page == 'drag-handle'"></DragHandle>
			<DragClass v-if="selectedPage.page == 'drag-class'"></DragClass>
			<DragDelay v-if="selectedPage.page == 'drag-delay'"></DragDelay>
			<TransitionDuration v-if="selectedPage.page == 'transition-duration'"></TransitionDuration>
			<Cards v-if="selectedPage.page == 'cards'"></Cards>
			<Form v-if="selectedPage.page == 'form'"></Form>
		</div>
	</div>
</div>
</template>

<script>
import Pages from "./pages";
import { Simple, SimpleHorizontal, SimpleScroller, Copy, Groups, Nested, LockAxis, DragDelay, DragHandle, DragClass, TransitionDuration, Cards, Form } from './pages';
export default {
	name: "Demo",
	components: {
		Simple, SimpleHorizontal, SimpleScroller, Copy, Groups, Nested, LockAxis, DragDelay, DragHandle, DragClass, TransitionDuration, Cards, Form
	},
  data: function() {
    return {
      isNavOpen: true,
			selectedPage: Pages[0].pages[0],
			pages: Pages
    };
  },
  methods: {
    toggleNav: function() {
      this.isNavOpen = !this.isNavOpen;
    },
    selectPage: function(page) {
      this.selectedPage = page;
    }
  },
  computed: {
    navButtonClass: function() {
      return `nav-button${this.isNavOpen ? " open" : " closed"}`;
    },
    navigatorClass: function() {
      return `navigator${this.isNavOpen ? " open" : " closed"}`;
    },
    headerClass: function() {
      return `header${this.isNavOpen ? " open" : " closed"}`;
    }
  }
};
</script>

<style src="../style.css"/>

