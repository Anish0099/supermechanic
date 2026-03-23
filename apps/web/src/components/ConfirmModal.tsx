"use client";

import React from 'react';

type ConfirmModalProps = {
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    children?: React.ReactNode;
};

const ConfirmModal = ({
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
    children,
}: ConfirmModalProps) => {
    return (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
            <div className="modal-card">
                <div>
                    <h3>{title}</h3>
                    <p className="flow-subtitle">{description}</p>
                </div>
                {children}
                <div className="modal-actions">
                    <button className="ghost-button" type="button" onClick={onCancel}>
                        {cancelLabel}
                    </button>
                    <button className="danger-button" type="button" onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
