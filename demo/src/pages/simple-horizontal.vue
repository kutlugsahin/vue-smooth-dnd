<template>
  <div style="margin: 50px; overflow-x: auto">
    <Container @drop="onDrop" orientation="horizontal" behaviour="contain">
      <Draggable v-for="item in items" :key="item.id">
        <div class="draggable-item-horizontal">
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
  name: 'SimpleHorizontal',

  components: {Container, Draggable},

  data () {
    return {
      items: generateItems(50, i => ({id: i, data: 'Draggable ' + i}))
    }
  },

  methods: {
    onDrop (dropResult) {
      this.items = applyDrag(this.items, dropResult)
    }
  }
}
</script>
