import { constants } from 'smooth-dnd';
import { Component, CreateElement } from 'vue';
import { getTagProps, validateTagProp } from './utils';

const wrapChild = (createElement: CreateElement, ctx: any) => {
  const tagProps = getTagProps(ctx, constants.wrapperClass);
  return createElement(
    tagProps.value,
    Object.assign({}, tagProps.props),
    ctx.$slots.default,
  );
};

export const Draggable: Component = {
  name: 'Draggable',
  props: {
    tag: {
      validator: validateTagProp,
      default: 'div',
    },
  },
  render(createElement) {
    return wrapChild(createElement, this);
  },
};
