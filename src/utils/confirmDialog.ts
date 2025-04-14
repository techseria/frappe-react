import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import {
  Dialog,
  DialogOptions as BaseDialogOptions,
  DialogActionContext,
  DialogAction // Import the redefined DialogAction from Dialog.tsx
} from '../components/Dialog';
import { ButtonProps } from '../components/Button/Button'; // Still needed for variant/theme types

// Use the imported DialogAction type for the actions array within ExtendedDialogOptions
// No need for local redefinition or Omit now
type ExtendedDialogOptions = Omit<BaseDialogOptions, 'actions'> & {
  actions?: DialogAction[]; // Use the imported DialogAction type
};


// Options for the confirm dialog function
interface ConfirmDialogOptions {
  title?: string;
  message?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: ButtonProps['variant']; // Use ButtonProps['variant'] for type safety
  cancelVariant?: ButtonProps['variant']; // Use ButtonProps['variant'] for type safety
  size?: BaseDialogOptions['size'];
}

// Internal type to keep track of mounted dialogs (optional, mainly for debugging)
type DialogInstance = {
  id: number;
  root: Root;
  container: HTMLDivElement;
};

let dialogIdCounter = 0;
const activeDialogs = new Map<number, DialogInstance>();

// Function to show a confirm dialog imperatively
function confirmDialog(options: ConfirmDialogOptions): void {
  const id = dialogIdCounter++;
  const container = document.createElement('div');
  container.id = `confirm-dialog-wrapper-${id}`;

  // Ensure a portal root exists in the body
  let portalRoot = document.getElementById('dialog-portal-root');
  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.id = 'dialog-portal-root';
    portalRoot.style.position = 'relative';
    portalRoot.style.zIndex = '1000';
    document.body.appendChild(portalRoot);
  }
  portalRoot.appendChild(container);

  const root = createRoot(container);

  // Cleanup function to unmount and remove the dialog
  const cleanup = () => {
    setTimeout(() => {
      root.unmount();
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
      activeDialogs.delete(id);
    }, 300);
  };

  // Define actions using the imported DialogAction type
  // These objects now only need properties defined in the *new* DialogAction type
  const actions: DialogAction[] = [
    {
      label: options.confirmLabel || 'Confirm',
      variant: options.confirmVariant || 'solid', // Pass variant
      onClick: async (context: DialogActionContext) => {
        try {
          await options.onConfirm?.();
          context.close();
        } catch (error) {
          console.error("Error during confirm action:", error);
          context.close();
        }
      },
    },
    {
      label: options.cancelLabel || 'Cancel',
      variant: options.cancelVariant || 'ghost', // Pass variant
      onClick: (context: DialogActionContext) => {
        options.onCancel?.();
        context.close();
      },
    },
  ];

  // Prepare options for the Dialog component using the imported types
  const dialogOptions: ExtendedDialogOptions = {
      title: options.title,
      message: options.message,
      actions: actions, // actions array now uses the imported DialogAction type
      size: options.size || 'sm',
  };

  // Render the main Dialog component
  root.render(
    React.createElement(Dialog, {
      open: true,
      onClose: () => {
        options.onCancel?.();
        cleanup();
      },
      options: dialogOptions, // Pass options using the imported types
      afterLeave: cleanup
    })
  );

  activeDialogs.set(id, { id, root, container });
}

// Export the function for use throughout the application
export { confirmDialog };