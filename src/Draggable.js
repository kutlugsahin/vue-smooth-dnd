import { constants } from 'smooth-dnd';
import { getTagProps, validateTagProp } from './utils';

const wrapChild = (createElement, ctx) => {
  const tagProps = getTagProps(ctx, constants.wrapperClass);
  return createElement(
    tagProps.value,
    Object.assign({}, tagProps.props),
    ctx.$slots.default
  );
};

export default {
  name: 'Draggable',
  props: {
    tag: {
      validator: validateTagProp,
      default: 'div'
    }
  },
  render: function (createElement) {
    return wrapChild(createElement, this);
  }
};
