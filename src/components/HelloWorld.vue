<template>
  <Container>
    <Draggable>
      <div>Draggable</div>
    </Draggable>
    <Draggable>
      <div>Draggable</div>
    </Draggable>
    <Draggable>
      <div>Draggable</div>
    </Draggable>
    <Draggable>
      <div>Draggable</div>
    </Draggable>
  </Container>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd';
export default {
  name: "HelloWorld",
  components: {Container, Draggable}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
