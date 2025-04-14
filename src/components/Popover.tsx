import React, {
  useState,
  useCallback,
  useMemo,
  Fragment,
  ReactNode,
  HTMLProps,
} from 'react';
import { createPortal } from 'react-dom';
import {
  useFloating,
  useClick,
  useHover,
  useDismiss,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
  Placement,
} from '@floating-ui/react';
import { Transition } from '@headlessui/react';

const POPOVER_ROOT_ID = 'frappeui-popper-root';

// Ensure the root element exists
function ensurePopoverRoot() {
  if (typeof window === 'undefined') return null;
  let root = document.getElementById(POPOVER_ROOT_ID);
  if (!root) {
    root = document.createElement('div');
    root.id = POPOVER_ROOT_ID;
    // Optional: Add some basic styles to the root if needed
    // Object.assign(root.style, { position: 'relative', zIndex: '100' });
    document.body.appendChild(root);
  }
  return root;
}

interface PopoverRenderProps {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

interface PopoverProps {
  // Control props
  isOpen?: boolean; // Controlled open state
  onOpenChange?: (isOpen: boolean) => void; // Callback for state changes
  initialOpen?: boolean; // Initial state for uncontrolled mode

  // Behavior props
  trigger?: 'click' | 'hover';
  hoverDelay?: number; // Delay in ms for hover open
  leaveDelay?: number; // Delay in ms for hover close
  hideOnBlur?: boolean; // Close when clicking outside
  placement?: Placement; // From Floating UI

  // Content props
  renderTarget: (props: PopoverRenderProps & { ref: React.Ref<any>, props: HTMLProps<HTMLElement> }) => ReactNode;
  children: (props: PopoverRenderProps) => ReactNode; // Popover body content

  // Styling & Transition
  popoverClass?: string; // Class for the floating element wrapper
  transitionProps?: Omit<React.ComponentProps<typeof Transition>, 'show' | 'as' | 'children'>;
}

const defaultTransitionProps = {
  enter: 'transition duration-150 ease-out',
  enterFrom: 'translate-y-1 opacity-0',
  enterTo: 'translate-y-0 opacity-100',
  leave: 'transition duration-150 ease-in',
  leaveFrom: 'translate-y-0 opacity-100',
  leaveTo: 'translate-y-1 opacity-0',
};

export function Popover({
  isOpen: controlledOpen,
  onOpenChange,
  initialOpen = false,
  trigger = 'click',
  hoverDelay = 0,
  leaveDelay = 0,
  hideOnBlur = true,
  placement = 'bottom-start',
  renderTarget,
  children,
  popoverClass = '',
  transitionProps = defaultTransitionProps,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const popoverRoot = useMemo(() => ensurePopoverRoot(), []);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(open);
      }
      onOpenChange?.(open);
    },
    [isControlled, onOpenChange]
  );

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: handleOpenChange,
    placement: placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift()],
  });

  // Interaction Hooks
  const click = useClick(context, { enabled: trigger === 'click' });
  const hover = useHover(context, {
    enabled: trigger === 'hover',
    delay: { open: hoverDelay, close: leaveDelay },
    // Removed handleClose option
  });
  const dismiss = useDismiss(context, { enabled: hideOnBlur, outsidePressEvent: 'mousedown' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    hover,
    dismiss,
  ]);

  // Render props for target and body
  const renderProps: PopoverRenderProps = {
    open: () => handleOpenChange(true),
    close: () => handleOpenChange(false),
    isOpen: isOpen,
  };

  // Target rendering
  const targetElement = renderTarget({
    ...renderProps,
    ref: refs.setReference,
    props: getReferenceProps(),
  });

  // Popover body rendering (portal + transition)
  const popoverBody = popoverRoot && (
    createPortal(
      <Transition show={isOpen} as={Fragment} {...transitionProps}>
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className={`relative z-[100] ${popoverClass}`} // Use z-index here
          {...getFloatingProps()}
        >
          {children(renderProps)}
        </div>
      </Transition>,
      popoverRoot
    )
  );

  return (
    <>
      {targetElement}
      {popoverBody}
    </>
  );
}

// Removed unused safePolygonRef object
