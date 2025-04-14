import { useState } from 'react';
import { Dialog } from './Dialog';

interface ConfirmDialogProps {
  title?: string;
  message?: string;
  onConfirm?: (options: { hideDialog: () => void }) => void;
  onCancel?: () => void;
}

export function ConfirmDialog(props: ConfirmDialogProps) {
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmation = async () => {
    setIsLoading(true);
    try {
      await props.onConfirm?.({ hideDialog: hide });
    } finally {
      setIsLoading(false);
    }
  };

  const hide = () => setOpen(false);

  const closeDialog = () => {
    hide();
    props.onCancel?.();
  };

  return (
    <Dialog 
      open={open} 
      onClose={closeDialog}
      options={{
        title: props.title,
        message: props.message,
        actions: [
          {
            label: 'Confirm',
            variant: 'solid',
            loading: isLoading,
            onClick: handleConfirmation
          }
        ]
      }}
    />
  );
}