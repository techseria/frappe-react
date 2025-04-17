import { useRef, useEffect, ReactElement, Children, isValidElement, cloneElement } from 'react';
import { Popover } from '@headlessui/react';
import { createPopper } from '@popperjs/core';

interface NestedPopoverProps {
  placement?: 'bottom-start' | 'top-start' | 'bottom-end' | 'top-end';
  children: React.ReactNode;
}

interface SlotProps {
  slot?: 'target' | 'body';
  open?: boolean;
  close?: () => void;
}

export function NestedPopover({
  placement = 'bottom-start',
  children,
}: NestedPopoverProps) {
  const referenceRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef<any>(null);

  useEffect(() => {
    if (!referenceRef.current || !popoverRef.current) return;

    const setupPopper = () => {
      if (!popperRef.current) {
        popperRef.current = createPopper(
          referenceRef.current!,
          popoverRef.current!,
          {
            placement,
          }
        );
      } else {
        popperRef.current.update();
      }
    };

    setupPopper();

    return () => {
      popperRef.current?.destroy();
    };
  }, [placement]);

  const targetChild = Children.toArray(children).find(
    (child) => isValidElement<SlotProps>(child) && child.props.slot === 'target'
  ) as ReactElement<SlotProps> | undefined;

  const bodyChild = Children.toArray(children).find(
    (child) => isValidElement<SlotProps>(child) && child.props.slot === 'body'
  ) as ReactElement<SlotProps> | undefined;

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            as="div"
            ref={referenceRef}
            onClick={() => popperRef.current?.update()}
            onFocus={() => popperRef.current?.update()}
          >
            {targetChild ? cloneElement(targetChild, { open }) : null}
          </Popover.Button>

          <Popover.Panel
            ref={popoverRef}
            static
            className="z-[100]"
          >
            {({ close }): ReactElement => (bodyChild ? ( // Add explicit return type
              cloneElement(bodyChild, { open, close })
            ) : <></>)}
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
