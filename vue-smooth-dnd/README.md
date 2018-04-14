# ngx-smooth-dnd

A fast and lightweight drag&drop, sortable library for Vue.js with many configuration options covering many d&d scenarios. It uses css transitions for animations so it's hardware accelerated whenever possible.

This library consists wrapper Vue.js components over <a href="https://github.com/kutlugsahin/smooth-dnd/">smooth-dnd</a> library.

**Show, don't tell !**
### <a href="https://kutlugsahin.github.io/vue-smooth-dnd/">Demo page</a>

### Installation

```shell
npm i ngx-smooth-dnd
```

## Usage

#### Vue 


```jsx
<template>
  <div>
    <div class="simple-page">
        <Container @drop="onDrop">            
          <Draggable v-for="item in items" :key="item.id">
            <div class="draggable-item">
              {{item.data}}
            </div>
          </Draggable>
        </Container>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "./utils";
export default {
  name: "Simple",
  components: { Container, Draggable },
  data: function() {
    return {
      items: generateItems(50, i => ({ id: i, data: "Draggable " + i }))
    };
  },
  methods: {
    onDrop: function(dropResult) {
      this.items = applyDrag(this.items, dropResult);
    }
  }
};
</script>
```

## API

### **Container**

Component that contains the draggable elements or components. Each of its children should be wrapped by **Draggable** component


### Properties

| Property | Type | Default | Description |
|-|:-:|:-:|-|
|:orientation |string|`vertical` | Orientation of the container. Can be **horizontal** or **vertical**.|
|:behaviour|string|`move`| Property to describe weather the dragging item will be moved or copied to target container. Can be **move** or **copy**.|
|:groupName|string|`undefined`|Draggables can be moved between the containers having the same group names. If not set container will not accept drags from outside. This behaviour can be overriden by shouldAcceptDrop function. See below.
|:lockAxis|string|`undefined`|Locks the movement axis of the dragging. Possible values are **x**, **y** or **undefined**.
|:dragHandleSelector|string|`undefined`|Css selector to test for enabling dragging. If not given item can be grabbed from anywhere in its boundaries.|
|:nonDragAreaSelector|string|`undefined`|Css selector to prevent dragging. Can be useful when you have form elements or selectable text somewhere inside your draggable item. It has a precedence over **dragHandleSelector**.|
|:dragBeginDelay|number| `0` (`200` for touch devices)|Time in milisecond. Delay to start dragging after item is pressed. Moving cursor before the delay more than 5px will cancel dragging.
|:animationDuration|number|`250`|Animation duration in milisecond. To be consistent this animation duration will be applied to both drop and reorder animations.|
|:autoScrollEnabled|boolean|`true`|First scrollable parent will scroll automatically if dragging item is close to boundaries.
|:dragClass|string|`undefined`|Class to be added to the ghost item being dragged. The class will be added after it's added to the DOM so any transition in the class will be applied as intended.
|:dropClass|string|`undefined`|Class to be added to the ghost item just before the drop animation begins.|
|@dragStart|function|`undefined`|*See descriptions below*|
|@drop|function|`undefined`|*See descriptions below*|
|:getChildPayload|function|`undefined`|*See descriptions below*|
|:shouldAnimateDrop|function|`undefined`|*See descriptions below*|
|:shouldAcceptDrop|function|`undefined`|*See descriptions below*|
|@dragEnter|function|`undefined`|*See descriptions below*|
|@dragLeave|function|`undefined`|*See descriptions below*|

---

### dragStart

Event to be emitted only by the container which drag starts from.

```ts
(dragStart)="onDragStart($event)"

onDragStart({index: number, payload: any}) {
  ...
}
```

#### Parameters
- **event** : `object`
  - **index** : `number` : index of the child item
  - **payload** : `object` : the payload object that is returned by getChildPayload function. It will be undefined in case getChildPayload is not set.

### drop

The event to be emitted by any relevant container when drop is over. (After drop animation ends). Source container and any container that could accept drop is considered relevant.

```ts
(drop)="onDrop($event)"

onDrop(dropResult: IDropResult) {
  const { removedIndex, addedIndex, payload, element } = dropResult;
  ...
}
```
#### Parameters
- **dropResult** : `object`
	- **removedIndex** : `number` : index of the removed children. Will be `null` if no item is removed. 
	- **addedIndex** : `number` : index to add droppped item. Will be `null` if no item is added. 
	- **payload** : `object` : the payload object retrieved by calling *getChildPayload* function.
	- **element** : `DOMElement` : the DOM element that is moved 

### getChildPayload

The function to be called to get the payload object to be passed **onDrop** function.
```ts
[getChildPayload]="getChildPayload"

getChildPayload(index: number) {
  return {
    ...
  }
}
```
#### Parameters
- **index** : `number` : index of the child item
#### Returns
- **payload** : `object`

### shouldAnimateDrop

The function to be called by the target container to which the dragged item will be droppped.
Sometimes dragged item's dimensions are not suitable with the target container and dropping animation can be wierd. So it can be disabled by returning **false**. If not set drop animations are enabled.
```ts
[shouldAnimateDrop]="shouldAnimateDrop"

shouldAnimateDrop(sourceContainerOptions: IContainerOptions, payload: any) {
  return false;
}
```
#### Parameters
- **sourceContainerOptions** : `IContainerOptions` : options of the source container. (parent container of the dragged item)
- **payload** : `object` : the payload object retrieved by calling *getChildPayload* function.
#### Returns
- **boolean** : **true / false**

### shouldAcceptDrop

The function to be called by all containers before drag starts to determine the containers to which the drop is possible. Setting this function will override the **groupName** property and only the return value of this function will be taken into account.

```ts
[shouldAcceptDrop]="shouldAcceptDrop"

shouldAcceptDrop(sourceContainerOptions, payload) {
  return true;
}
```
#### Parameters
- **sourceContainerOptions** : `IContainerOptions` : options of the source container. (parent container of the dragged item)
- **payload** : `object` : the payload object retrieved by calling *getChildPayload* function.
#### Returns
- **boolean** : **true / false**

### onDragEnter

The event to be emitted by the relevant container whenever a dragged item enters its boundaries while dragging.
```ts
(dragEnter)="onDragEnter()"

onDragEnter() {
  ...
}
```

### onDragLeave

The event to be emitted by the relevant container whenever a dragged item leaves its boundaries while dragging.
```ts
(dragLeave)="onDragLeave()"

onDragLeave() {
  ...
}
```

### **smooth-dnd-draggable**

Wrapper component for smooth-dnd-container's children. Every draggable element should be wrapped with **smooth-dnd-draggable** component.