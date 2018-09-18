<template>
  <div class="simple-page">
    <Container @drop="onDrop($event)">
      <Draggable v-for="item in items" :key="item.id">
        <div v-if="item.type === 'draggable'" class="draggable-item">
          {{item.data}}
        </div>
        <div v-if="item.type === 'container'">
          <div :style="innerContainerStyle">
            <h4>Sortable List</h4>
            <div class="no-cursor">
              <Container @drop="onInnerDrop(item, $event)">
                <Draggable v-for="q in item.items" :key="q.id">
                  <div v-if="q.type === 'draggable'" class="draggable-item">
                    {{q.data}}
                  </div>
                  <div v-if="q.type === 'container'">
                    <div :style="innerContainerStyle">
                      <h4>Sortable List</h4>
                      <div class="no-cursor">
                        <Container @drop="onInnerDrop2(item, q, $event)">
                          <Draggable v-for="t in q.items" :key="t.id">
                            <div class="draggable-item">
                              {{t.data}}
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
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from '../utils/helpers'

export default {
  name: 'Nested',

  components: {Container, Draggable},

  data () {
    const res = {
      items: generateItems(30, i => ({
        id: i,
        type: 'draggable',
        data: `Container 1 Draggable - ${i}`
      })),
      items2: generateItems(10, i => ({
        id: i,
        type: 'draggable',
        data: `Container 2 Draggable - ${i}`
      })),
      items3: generateItems(4, i => ({
        id: i,
        type: 'draggable',
        data: `Container 3 Draggable - ${i}`
      })),
      innerContainerStyle: {
        padding: '20px 20px',
        marginTop: '2px',
        marginBottom: '2px',
        border: '1px solid rgba(0,0,0,.125)',
        backgroundColor: '#f4f5f9aa',
        cursor: 'move'
      }
    }

    res.items[5] = {
      id: 5,
      type: 'container',
      items: res.items2
    }

    res.items[5].items[3] = {
      id: 3,
      type: 'container',
      items: generateItems(4, i => ({
        id: i,
        type: 'draggable',
        data: `Container 4 Draggable - ${i}`
      }))
    }

    res.items[9] = {
      id: 9,
      type: 'container',
      items: res.items3
    }

    return res
  },
  methods: {
    onDrop (dropResult) {
      this.items = applyDrag(this.items, dropResult)
    },

    onInnerDrop (item, dropResult) {
      const newItems = [...this.items]
      const index = newItems.indexOf(item)
      newItems[index].items = applyDrag(newItems[index].items, dropResult)
      this.items = newItems
    },

    onInnerDrop2 (item, item2, dropResult) {
      const newItems = [...this.items]
      const index = newItems.indexOf(item)
      const index2 = item.items.indexOf(item2)
      newItems[index].items[index2].items = applyDrag(
        newItems[index].items[index2].items,
        dropResult
      )
      this.items = newItems
    }
  }
}
</script>

<style lang="css" scoped>
  .no-cursor {
    cursor: default;
  }
</style>
