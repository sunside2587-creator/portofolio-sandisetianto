import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface DialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly labelledBy: string;
  readonly children: ReactNode;
  readonly variant?: 'modal' | 'drawer';
}

function DialogRoot({
  open,
  onClose,
  labelledBy,
  children,
  variant = 'modal',
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open) {
      if (document.activeElement instanceof HTMLElement) {
        previousFocusRef.current = document.activeElement;
      }
      if (!dialog.open) {
        dialog.showModal();
      }
      return;
    }

    if (dialog.open) {
      dialog.close();
    }
    previousFocusRef.current?.focus();
    previousFocusRef.current = null;
  }, [open]);

  const panelClass =
    variant === 'drawer'
      ? 'm-0 h-dvh max-h-none w-screen max-w-none bg-ink text-paper p-0'
      : 'm-auto max-h-[90dvh] w-[min(94vw,56rem)] overflow-y-auto border border-line bg-paper text-ink p-0 shadow-2xl';

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
      className={`backdrop:bg-ink/80 backdrop:backdrop-blur-[2px] ${panelClass}`}
    >
      {open ? (
        <motion.div
          initial={{ opacity: 0, scale: variant === 'drawer' ? 1 : 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      ) : null}
    </dialog>
  );
}

function DialogHeader({ children, className = '' }: { readonly children: ReactNode; readonly className?: string }) {
  return <div className={`border-b border-line px-6 py-4 ${className}`}>{children}</div>;
}

function DialogBody({ children, className = '' }: { readonly children: ReactNode; readonly className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

function DialogFooter({ children, className = '' }: { readonly children: ReactNode; readonly className?: string }) {
  return <div className={`border-t border-line px-6 py-4 ${className}`}>{children}</div>;
}

export const Dialog = Object.assign(DialogRoot, {
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
});
