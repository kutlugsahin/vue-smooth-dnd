<template>
  <div class="simple-page">
    <Container @drop="onDrop" :get-ghost-parent="getGhostParent" :remove-on-drop-out="true" @drop-ready="onDropReady">
      <Draggable v-for="item in items" :key="item.id">
        <div class="draggable-item">
          {{item.data}}
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from '../utils/helpers'

export default {
  name: 'Simple',

  components: {Container, Draggable},

  data () {
    return {
      items: generateItems(50, i => ({id: i, data: 'Draggable ' + i}))
    }
  },

  methods: {
    onDrop (dropResult) {
      this.items = applyDrag(this.items, dropResult)
    },
    getGhostParent(){
      return document.body;
    },
    onDropReady(dropResult){
      console.log('drop ready', dropResult);
    }
  }
}
</script>
