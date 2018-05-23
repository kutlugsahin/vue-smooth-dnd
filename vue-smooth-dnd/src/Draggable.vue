<script>
import { constants } from "smooth-dnd";

const wrapChild = (createElement, ctx) => {
  if(!ctx.$props.wrap){
    const node = ctx.$slots.default[0];
    node.data = node.data || {};
    node.data.staticClass = constants.wrapperClass;
    return node;
  }
  return createElement(
    "div",
    { class: constants.wrapperClass },
    ctx.$slots.default
  );
};

export default {
  name: "Draggable",
  props: {
    wrap: {type: Boolean, default: true}
  },
  render: function(createElement) {
    return wrapChild(createElement, this);
  }
};
</script>

