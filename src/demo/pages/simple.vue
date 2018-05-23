<template>
  <div>
    <div class="simple-page">
        <Container @drop="onDrop" :wrap="false">            
          <div className="asdasdasd">
            <Draggable v-for="item in items" :key="item.id" :wrap="false">
              <div>
                <div class="draggable-item">
                  {{item.data}}
                </div>
              </div>
          </Draggable>
          </div>
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


