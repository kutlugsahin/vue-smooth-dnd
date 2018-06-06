<script>
import { constants } from "smooth-dnd";

const getTagProps = tag => {
  if (tag) {
    if (typeof tag === 'string') {
      return {
        value: tag,
      };
    } else if (typeof tag === 'object') {
      return {
        value: tag.value || 'div',
        props: tag.props,
      };
    }
  }
  return {
    value: 'div',
  };
};

const wrapChild = (createElement, ctx) => {
  const tagProps = getTagProps(ctx.$props.tag);
  let classes = constants.wrapperClass;
  if(tagProps.class){
    classes += ` ${tagProps.classes}`
  }
  return createElement(
    tagProps.value,
    Object.assign({}, tagProps.props ,{ class: classes }),
    ctx.$slots.default
  );
};

export default {
  name: "Draggable",
  props: {
    tag: {
      validator: function(tag) {
        if (tag) {
          if (typeof tag === 'string') return true;
          if (typeof tag === 'object') {
            if (typeof tag.value === 'string') return true;
          }
          return false;
        }
        return true;
      },
      default: 'div',
    },
  },
  render: function(createElement) {
    return wrapChild(createElement, this);
  }
};
</script>

