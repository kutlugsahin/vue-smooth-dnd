<template>
  <div>
    <div class="simple-page">
        <Container @drop="onDrop" :drag-begin-delay="500" drag-class="form-ghost" drop-class="form-ghost-drop">            
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
import { applyDrag, generateItems } from "../utils";
export default {
  name: "DragDelay",
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


