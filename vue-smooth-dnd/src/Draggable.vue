<template>
	<div :class="draggableClasses">
		<slot></slot>
	</div>
</template>

<script>
import {constants} from 'smooth-dnd';

export default {
	name: 'Draggable',
	data(){
		return {
			draggableClasses: `${constants.wrapperClass}`
		}
	}
}
</script>

