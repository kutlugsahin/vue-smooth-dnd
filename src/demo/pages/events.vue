<template>
  <div class="wide-page">

    <div class="columns">

      <div v-for="(items, groupIndex) in groups"
           :key="groupIndex"
           class="column"
      >
        <Container group-name="column"

                   :get-child-payload="itemIndex => getChildPayload(groupIndex, itemIndex)"
                   :should-accept-drop="getShouldAcceptDrop"
                   :should-animate-drop="getShouldAnimateDrop"

                   @drag-start="onDragStart"
                   @drag-enter="onDragEnter(groupIndex)"
                   @drag-leave="onDragLeave(groupIndex)"
                   @drag-end="onDragEnd"
                   @drop="onDrop(groupIndex, $event)"
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
        <label v-for="(key, name) in logs">
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
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "./utils";
import Vue from 'vue'

var i = 0;
function id () {
  return `item-${++i}`;
}

function generate (num) {
  return generateItems(5, i => ({
    id: id(),
    data: `Draggable ${num} - ${i + 1}`
  }))
}

export default {
  name: "Groups",

  components: {
    Container,
    Draggable
  },

  data: function() {
    return {
      logPayload: true,
      logs: {
        'get-child-payload': true,
        'should-accept-drop': false,
        'should-animate-drop': false,
        'drag-start': true,
        'drag-end': true,
        'drag-enter': true,
        'drag-leave': true,
        'drop': true,
      },

      groups: [
        generate(1)
      ],
    };
  },

  methods: {

    // -----------------------------------------------------------------------------------------------------------------
    // callbacks

    getChildPayload: function(groupIndex, itemIndex) {
      this.log('get-child-payload', groupIndex, itemIndex);
      return this.groups[groupIndex][itemIndex];
    },

    getShouldAnimateDrop: function (sourceContainerOptions, payload) {
      this.log('should-animate-drop', sourceContainerOptions, payload)
      return true
    },

    getShouldAcceptDrop: function (sourceContainerOptions, payload) {
      this.log('should-accept-drop', sourceContainerOptions, payload)
      return true
    },


    // -----------------------------------------------------------------------------------------------------------------
    // events

    onDragStart: function (...args) {
      this.log('drag-start', ...args);
    },

    onDragEnd: function (...args) {
      this.log('drag-end', ...args);
    },

    onDragEnter: function (...args) {
      this.log('drag-enter', ...args);
    },

    onDragLeave: function (...args) {
      this.log('drag-leave', ...args);
    },

    onDrop: function(groupIndex, dropResult) {
      let result = applyDrag(this.groups[groupIndex], dropResult);
      Vue.set(this.groups, groupIndex, result);
      this.log('drop', dropResult);
    },


    // -----------------------------------------------------------------------------------------------------------------
    // app

    addColumn: function () {
      this.groups.push(generate(this.groups.length + 1))
    },

    removeColumn: function () {
      this.groups.pop()
    },

    log: function (name, ...args) {
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

  .controls label {
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

  .column .smooth-dnd-container.vertical {
    height: 100%;
  }

</style>