<template>
  <div>
    <div >
        <table :style="{'border-spacing': '0px'}">
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
                <td>
                  Row {{item.data}} Column 1
                </td>
                <td>
                  Row {{item.data}} Column 2
                </td>
                <td>
                  Row {{item.data}} Column 3
                </td>
                <td>
                  Row {{item.data}} Column 4
                </td>
          </Draggable>
        </Container>
        </table>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "./utils";
export default {
  name: "Table",
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

