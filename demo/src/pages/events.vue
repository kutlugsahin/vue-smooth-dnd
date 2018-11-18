<template>
  <div class="wide-page">

    <div class="columns">

      <div v-for="(items, index) in groups"
        :key="index"
        class="column"
      >
        <div>
          <label>
            <input type="checkbox" v-model="flags[index].drop"> Accept Drop
          </label>
          <label>
            <input type="checkbox" v-model="flags[index].animate"> Animate Drop
          </label>
        </div>
        <Container :data-index="index" group-name="column"

          :get-child-payload="itemIndex => getChildPayload(index, itemIndex)"
          :should-accept-drop="(src, payload) => getShouldAcceptDrop(index, src, payload)"
          :should-animate-drop="(src, payload) => getShouldAnimateDrop(index, src, payload)"

          @drag-start="onDragStart"
          @drag-enter="onDragEnter(index)"
          @drag-leave="onDragLeave(index)"
          @drag-end="onDragEnd"
          @drop="onDrop(index, $event)"
        >
          <Draggable v-for="item in items" :key="item.id">
            <div class="draggable-item">
              {{ item.data }}
            </div>
          </Draggable>
        </Container>
      </div>

    </div>

    <div class="controls">
      <div>
        <button @click="removeColumn()" :disabled="groups.length === 1">Remove Column</button>
        <button @click="addColumn()">Add Column</button>
      </div>
      <div>
        <label v-for="(key, name) in logs" :key="name">
          <input type="checkbox" v-model="logs[name]"> {{ name }}
        </label>
        <hr>
        <label>
          <input type="checkbox" v-model="logPayload"> Log payload
        </label>
      </div>
    </div>

  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from '../utils/helpers'
import Vue from 'vue'

let i = 0

function id () {
  return `item-${++i}`
}

function generate (num) {
  return generateItems(5, i => ({
    id: id(),
    data: `Draggable ${num} - ${i + 1}`
  }))
}

export default {
  name: 'Events',

  components: {
    Container,
    Draggable
  },

  data () {
    return {
      groups: [],
      flags: [],
      logs: {
        'get-child-payload': true,
        'should-accept-drop': false,
        'should-animate-drop': false,
        'drag-start': true,
        'drag-end': true,
        'drag-enter': true,
        'drag-leave': true,
        'drop': true
      },
      logPayload: true
    }
  },

  created () {
    this.addColumn()
  },

  methods: {

    // -----------------------------------------------------------------------------------------------------------------
    // callbacks

    getChildPayload (groupIndex, itemIndex) {
      this.log('get-child-payload', groupIndex, itemIndex)
      return this.groups[groupIndex][itemIndex]
    },

    getShouldAcceptDrop (index, sourceContainerOptions, payload) {
      this.log('should-accept-drop', sourceContainerOptions, payload)
      return this.flags[index].drop
    },

    getShouldAnimateDrop (index, sourceContainerOptions, payload) {
      this.log('should-animate-drop', sourceContainerOptions, payload)
      return this.flags[index].animate
    },

    // -----------------------------------------------------------------------------------------------------------------
    // events

    onDragStart (...args) {
      this.log('drag-start', ...args)
    },

    onDragEnd (...args) {
      this.log('drag-end', ...args)
    },

    onDragEnter (...args) {
      this.log('drag-enter', ...args)
    },

    onDragLeave (...args) {
      this.log('drag-leave', ...args)
    },

    onDrop (groupIndex, dropResult) {
      let result = applyDrag(this.groups[groupIndex], dropResult)
      Vue.set(this.groups, groupIndex, result)
      this.log('drop', dropResult)
    },

    // -----------------------------------------------------------------------------------------------------------------
    // app

    addColumn () {
      this.groups.push(generate(this.groups.length + 1))
      this.flags.push({drop: true, animate: true})
    },

    removeColumn () {
      this.groups.pop()
      this.flags.pop()
    },

    log (name, ...args) {
      if (this.logs[name]) {
        this.logPayload
          ? console.log(name, ...args)
          : console.log(name)
      }
    }

  }
}
</script>

<style scoped>

  .controls {
    margin-top: 1em;
  }

  .controls > div {
    padding-top: 1em;
  }

  label {
    display: block;
    line-height: 1.6em;
  }

  .columns {
    display: flex;
    justify-content: stretch;
  }

  .column {
    margin-right: 20px;
    flex: 1;
  }

  .column {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .column .smooth-dnd-container.vertical {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

</style>
