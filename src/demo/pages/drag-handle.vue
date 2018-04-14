<template>
  <div>
    <div class="simple-page">
        <Container @drop="onDrop" drag-handle-selector=".column-drag-handle">            
          <Draggable v-for="item in items" :key="item.id">
            <div class="draggable-item">
							<span class="column-drag-handle" style="float:left; padding:0 10px;">&#x2630;</span>
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
  name: "DragHandle",
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


