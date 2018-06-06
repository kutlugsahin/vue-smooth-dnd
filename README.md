# vue-smooth-dnd

A fast and lightweight drag&drop, sortable library for Vue.js with many configuration options covering many d&d scenarios.

This library consists wrapper Vue.js components over <a href="https://github.com/kutlugsahin/smooth-dnd/">smooth-dnd</a> library.

**Show, don't tell !**
### <a href="https://kutlugsahin.github.io/vue-smooth-dnd/">Demo page</a>

### Installation

```shell
npm i vue-smooth-dnd
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
|:group-name|string|`undefined`|Draggables can be moved between the containers having the same group names. If not set container will not accept drags from outside. This behaviour can be overriden by shouldAcceptDrop function. See below.
|:lock-axis|string|`undefined`|Locks the movement axis of the dragging. Possible values are **x**, **y** or **undefined**.
|:drag-handle-selector|string|`undefined`|Css selector to test for enabling dragging. If not given item can be grabbed from anywhere in its boundaries.|
|:non-drag-area-selector|string|`undefined`|Css selector to prevent dragging. Can be useful when you have form elements or selectable text somewhere inside your draggable item. It has a precedence over **dragHandleSelector**.|
|:drag-begin-delay|number| `0` (`200` for touch devices)|Time in milisecond. Delay to start dragging after item is pressed. Moving cursor before the delay more than 5px will cancel dragging.
|:animation-duration|number|`250`|Animation duration in milisecond. To be consistent this animation duration will be applied to both drop and reorder animations.|
|:auto-scroll-enabled|boolean|`true`|First scrollable parent will scroll automatically if dragging item is close to boundaries.
|:drag-class|string|`undefined`|Class to be added to the ghost item being dragged. The class will be added after it's added to the DOM so any transition in the class will be applied as intended.
|:drop-class|string|`undefined`|Class to be added to the ghost item just before the drop animation begins.|
|@drag-start|function|`undefined`|*See descriptions below*|
|@drag-end|function|`undefined`|*See descriptions below*|
|@drop|function|`undefined`|*See descriptions below*|
|:get-child-payload|function|`undefined`|*See descriptions below*|
|:should-animate-drop|function|`undefined`|*See descriptions below*|
|:should-accept-drop|function|`undefined`|*See descriptions below*|
|@drag-enter|function|`undefined`|*See descriptions below*|
|@drag-leave|function|`undefined`|*See descriptions below*|
|:tag|string or NodeDescription|`div`|*See descriptions below*|

---

### drag-start

Event to be emitted only by by all containers when drag start.

```ts
@drag-start="onDragStart($event)"

onDragStart: function({isSource, payload, willAcceptDrop}) {
  ...
}
```

#### Parameters
- **isSource** : `boolean` : true if it is called by the container which drag starts from otherwise false.
- **payload** : `object` : the payload object that is returned by get-child-payload function. It will be undefined in case get-child-payload is not set.
- **willAcceptDrop** : `boolean` : true if the dragged item can be dropped into the container, otherwise false.

### drag-end

The function to be called by all container when drag ends. Called before **drop** event.
```ts
@drag-end="onDragEnd($event)"

function onDragEnd({isSource, payload, willAcceptDrop}) {
  ...
}
```
#### Parameters
- **isSource** : `boolean` : true if it is called by the container which drag starts from, otherwise false.
- **payload** : `object` : the payload object that is returned by get-child-payload function. It will be undefined in case get-child-payload is not set.
- **willAcceptDrop** : `boolean` : true if the dragged item can be dropped into the container, otherwise false.

### drop

The event to be emitted by any relevant container when drop is over. (After drop animation ends). Source container and any container that could accept drop is considered relevant.

```ts
@drop="onDrop($event)"

onDrop: function(dropResult) {
  const { removedIndex, addedIndex, payload, element } = dropResult;
  ...
}
```
#### Parameters
- **dropResult** : `object`
	- **removedIndex** : `number` : index of the removed children. Will be `null` if no item is removed. 
	- **addedIndex** : `number` : index to add droppped item. Will be `null` if no item is added. 
	- **payload** : `object` : the payload object retrieved by calling *get-child-payload* function.
	- **element** : `DOMElement` : the DOM element that is moved 

### get-child-payload

The function to be called to get the payload object to be passed **onDrop** function.
```ts
:get-child-payload="getChildPayload"

getChildPayload: function(index) {
  return {
    ...
  }
}
```
#### Parameters
- **index** : `number` : index of the child item
#### Returns
- **payload** : `object`

### should-animate-drop

The function to be called by the target container to which the dragged item will be droppped.
Sometimes dragged item's dimensions are not suitable with the target container and dropping animation can be wierd. So it can be disabled by returning **false**. If not set drop animations are enabled.
```ts
:should-animate-drop="shouldAnimateDrop"

shouldAnimateDrop: function(sourceContainerOptions, payload) {
  return false;
}
```
#### Parameters
- **sourceContainerOptions** : `object` : options of the source container. (parent container of the dragged item)
- **payload** : `object` : the payload object retrieved by calling *get-child-payload* function.
#### Returns
- **boolean** : **true / false**

### should-accept-drop

The function to be called by all containers before drag starts to determine the containers to which the drop is possible. Setting this function will override the **group-name** property and only the return value of this function will be taken into account.

```ts
:should-accept-drop="shouldAcceptDrop"

shouldAcceptDrop: function(sourceContainerOptions, payload) {
  return true;
}
```
#### Parameters
- **sourceContainerOptions** : `object` : options of the source container. (parent container of the dragged item)
- **payload** : `object` : the payload object retrieved by calling *get-child-payload* function.
#### Returns
- **boolean** : **true / false**

### drag-enter

The event to be emitted by the relevant container whenever a dragged item enters its boundaries while dragging.
```ts
@drag-enter="onDragEnter()"

onDragEnter: function() {
  ...
}
```

### drag-leave

The event to be emitted by the relevant container whenever a dragged item leaves its boundaries while dragging.
```ts
@drag-leave="onDragLeave()"

onDragLeave: function() {
  ...
}
```
### tag

Tag name or the node definition to render the root element of the container.
Default value is 'div'.

```ts
:tag="{value: 'table', props: {class: 'my-table'}}"

or

:tag="table"
```

#### possible values
- string : The tag name of the root element to be created
- object : Node definition
  - value: string : tag name
  - props: data object to define element properties. see [https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth)




### **Draggable**

Wrapper component for Container's children. Every child element should be wrapped with **Draggable** component.

### Properties

### tag

Tag name or the node definition to render the root element of the container.
Default value is 'div'.

```ts
:tag="{value: 'tr', props: {class: 'my-table-row'}}"

or

:tag="tr"
```

#### possible values
- string : The tag name of the root element to be created
- object : Node definition
  - value: string : tag name
  - props: data object to define element properties. see [https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth)



