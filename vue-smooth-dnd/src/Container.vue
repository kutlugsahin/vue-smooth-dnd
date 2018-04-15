<template>
	<div ref="container">
		<slot></slot>
	</div>
</template>


<script>
import SmoothDnD, { dropHandlers } from 'smooth-dnd';

SmoothDnD.dropHandler = dropHandlers.reactDropHandler().handler
SmoothDnD.wrapChild = p => p; // dont wrap children they will already be wrapped

const mapOptions = (context) => {
	const props = Object.assign({}, context.$props, context.$listeners);
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
	if(props['drag-start']) {
		options.onDragStart = (index, payload) => { 
			context.$emit('drag-start', {index, payload}); 
		};
	}
	if(props['drop']) { 
		options.onDrop = (dragResult) => {
			console.log(dragResult);
			context.$emit('drop', dragResult); 
		};
	}
	if(props.getChildPayload) options.getChildPayload = props.getChildPayload;
	if(props.shouldAnimateDrop) options.shouldAnimateDrop = props.shouldAnimateDrop;
	if(props.shouldAcceptDrop) options.shouldAcceptDrop = props.shouldAcceptDrop;
	if(props['drag-enter']) {
		options.onDragEnter = () => {
			context.$emit('drag-enter');
		}
	}
	if(props['drag-leave']) {
		options.onDragLeave = () => {
			context.$emit('drag-leave');			
		}
	}
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
		behaviour: String,
		groupName: String,
		orientation: String,
		dragHandleSelector: String,
		nonDragAreaSelector: String,
		dragBeginDelay: Number,
		animationDuration: Number,
		autoScrollEnabled: { type: Boolean, default: true },
		lockAxis: String,
		dragClass: String,
		dropClass: String,
		'drag-start': Function,
		'drop': Function,
		getChildPayload: Function,
		shouldAnimateDrop: Function,
		shouldAcceptDrop: Function,
		'drag-enter': Function,
		'drag-leave': Function,
	}
}
</script>

