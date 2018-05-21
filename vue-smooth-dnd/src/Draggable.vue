

<script>
import { constants } from "smooth-dnd";

const wrapChild = (createElement, ctx) => {
  return createElement(
    "div",
    { class: constants.wrapperClass },
    ctx.$slots.default
  );
};

export default {
  name: "Draggable",
  render: function(createElement) {
    return wrapChild(createElement, this);
  }
};
</script>

