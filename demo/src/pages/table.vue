<template>
  <div class="wide-page">
    <table style="border-spacing: 0">
      <thead>
      <tr>
        <th>Lorem</th>
        <th>Ipsum</th>
        <th>Sit</th>
        <th>Amed</th>
      </tr>
      </thead>
      <Container @drop="onDrop" tag="tbody">
        <Draggable v-for="item in items" :key="item.id" tag="tr">
          <td>Row {{item.data}} Column 1</td>
          <td>Row {{item.data}} Column 2</td>
          <td>Row {{item.data}} Column 3</td>
          <td>Row {{item.data}} Column 4</td>
        </Draggable>
      </Container>
    </table>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from '../utils/helpers'

export default {
  name: 'Table',

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

<style lang="css" scoped>
  table {
    display: table;
    /* border-collapse: collapse does not work when rows are dragged (transformed) */
    border-collapse: separate;
  }

  tr {
    display: table-row !important;
  }

  tr[style*="transform"] {
    border-collapse: separate !important;
  }

  td {
    padding: 5px;
    border: 1px solid #CCC !important;
  }
</style>
