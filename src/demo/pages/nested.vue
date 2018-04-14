<template>
  <div>
			<div class="simple-page">
				<Container @drop="onDrop($event)">
					<Draggable v-for="item in items" :key="item.id">
						<div v-if="item.type == 'draggable'" class="draggable-item">
							{{item.data}}
						</div>
						<div v-if="item.type == 'container'">
							<div :style="innerContainerStyle">
                <h4>Sortable List</h4>
                <div :style="{ 'cursor': 'default' }">
                  <Container @drop="onInnerDrop(item, $event)">
                    <Draggable v-for="q in item.items" :key="q.id">
                          <div class="draggable-item">
                            {{q.data}}
                          </div>
                      </Draggable>
                  </Container>
                </div>
              </div>
						</div>
					</Draggable>
				</Container>
			</div>
		</div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "./utils";

const items = generateItems(30, i => ({
  id: i,
  type: "draggable",
  data: `Container 1 Draggable - ${i}`
}));

export default {
  name: "Nested",
  components: { Container, Draggable },
  data: function() {
    const res = {
      items: generateItems(30, i => ({
        id: i,
        type: "draggable",
        data: `Container 1 Draggable - ${i}`
      })),
      items2: generateItems(5, i => ({
        id: i,
        type: "draggable",
        data: `Container 2 Draggable - ${i}`
      })),
      items3: generateItems(4, i => ({
        id: i,
        type: "draggable",
        data: `Container 3 Draggable - ${i}`
      })),
      innerContainerStyle: {
        padding: "20px 20px",
        marginTop: "2px",
        marginBottom: "2px",
        border: "1px solid rgba(0,0,0,.125)",
        backgroundColor: "#f4f5f9aa",
        cursor: "move"
      }
    };

    res.items[5] = {
      id: 5,
      type: "container",
      items: res.items2
    };

    res.items[9] = {
      id: 9,
      type: "container",
      items: res.items3
    };

    return res;
  },
  methods: {
    onDrop: function(dropResult) {
      this.items = applyDrag(this.items, dropResult);
    },
    onInnerDrop: function(item, dropResult) {
      const newItems = [...this.items];
      const index = newItems.indexOf(item);
      newItems[index].items = applyDrag(newItems[index].items, dropResult);
      this.items = newItems;
    }
  }
};
</script>





