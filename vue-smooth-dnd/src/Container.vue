<template>
	<div ref="container">
		<slot></slot>
	</div>
</template>


<script>
import SmoothDnD, { dropHandlers } from 'smooth-dnd';

SmoothDnD.dropHandler = dropHandlers.reactDropHandler().handler

const mapOptions = (context) => {
	const props = Object.assign({}, context.$props);
	const options = {};
	if(props.behaviour) options.behaviour = props.behaviour;
	if(props.groupName) options.groupName = props.groupName;
	if(props.orientation) options.orientation = props.orientation;
	if(props.dragHandleSelector) options.dragHandleSelector = props.dragHandleSelector;
	if(props.nonDragAreaSelector) options.nonDragAreaSelector = props.nonDragAreaSelector;
	if(props.dragBeginDelay !== undefined) options.dragBeginDelay = props.dragBeginDelay;
	if(props.animationDuration !== undefined) options.animationDuration = props.animationDuration;
	if(props.autoScrollEnabled !== undefined) options.autoScrollEnabled = props.autoScrollEnabled;
	if(props.lockAxis) options.lockAxis = props.lockAxis;
	if(props.dragClass) options.dragClass = props.dragClass;
	if(props.dropClass) options.dropClass = props.dropClass;
	if(props.drop) options.drop = props.drop;
	if(props.getChildPayload) options.getChildPayload = props.getChildPayload;
	if(props.shouldAnimateDrop) options.shouldAnimateDrop = props.shouldAnimateDrop;
	if(props.shouldAcceptDrop) options.shouldAcceptDrop = props.shouldAcceptDrop;
	if(props.dragEnter) options.dragEnter = props.dragEnter;
	if(props.dragLeave) options.dragLeave = props.dragLeave;
	return options;
}

export default {
	name: 'Container',	
	mounted(){
		this.containerElement = this.$refs.container;
		this.container = SmoothDnD(this.containerElement, mapOptions(this));
	},
	updated(){
		if(this.$refs.container !== this.containerElement){
			if(this.container){
				this.container.dispose();
			}
			this.containerElement = this.$refs.container;
			this.container = SmoothDnD(this.containerElement, mapOptions(this));		
		}
	},
	destroyed(){
		if(this.container){
			this.container.dispose();
		}
	},
	props: {
		behaviour: 'String',
		groupName: 'String',
		orientation: 'String',
		dragHandleSelector: 'String',
		nonDragAreaSelector: 'String',
		dragBeginDelay: 'Number',
		animationDuration: 'Number',
		autoScrollEnabled: 'Boolean',
		lockAxis: 'String',
		dragClass: 'String',
		dropClass: 'String',
		drop: 'Function',
		getChildPayload: 'Function',
		shouldAnimateDrop: 'Function',
		shouldAcceptDrop: 'Function',
		dragEnter: 'Function',
		dragLeave: 'Function',
	}
}
</script>
