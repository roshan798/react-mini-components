
export interface ConfirmationDialogProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isOpen: boolean;
}

const ConfirmationDialog = ({ message, onConfirm, onCancel, isOpen }: ConfirmationDialogProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg space-y-4">
                <p className="text-gray-800 dark:text-gray-200 text-base">{message}</p>
                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-gray-300 transition-all"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition-all"
                        onClick={onConfirm}
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
