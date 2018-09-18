<template>
  <div>
    <div :style="{'margin': '50px','overflowX': 'auto'}">
        <Container @drop="onDrop" :orientation="'horizontal'">
          <Draggable v-for="item in items" :key="item.id">
            <div class="draggable-item-horizontal">
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
	name: 'SimpleHorizontal',
  components: { Container, Draggable },
  data: function () {
    return {
      items: generateItems(50, i => ({ id: i, data: "Draggable " + i }))
    }
  },
  methods: {
    onDrop: function(dropResult) {
      this.items = applyDrag(this.items, dropResult);
    }
  }
};
</script>
