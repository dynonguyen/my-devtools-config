import clsx from 'clsx';
import { createElement } from 'preact';
import { JSXInternal } from 'preact/src/jsx';

export type FlexProps = {
  component?: keyof JSXInternal.IntrinsicElements;
  wrap?: boolean;
  stack?: boolean;
  center?: boolean;
  ref?: React.Ref<HTMLElement>;
  itemsFluid?: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, 'wrap'>;

export const Flex = (props: FlexProps) => {
  const {
    component = 'div',
    wrap = false,
    stack = false,
    center,
    class: _class,
    className,
    ref,
    itemsFluid,
    ...others
  } = props;

  return createElement(component, {
    ref,
    class: clsx('flex', _class || className, {
      'flex-wrap': wrap,
      'flex-col': stack,
      'items-center': !stack && !center,
      'items-center justify-center': center,
      'justify-evenly [&>*]:flex-1': itemsFluid
    }),
    ...others
  });
};

export default Flex;
