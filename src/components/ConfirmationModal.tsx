type ModalVariant = "confirm" | "delete" | "error" | "info";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title?: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: ModalVariant;
};

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    message = "This action cannot be undone.",
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    variant = "confirm",
}: Props) {
    if (!isOpen) return null;

    const variantStyle = {
        confirm: "bg-primary hover:bg-primary/80 text-white",
        delete: "bg-red-600 hover:bg-red-700 text-white",
        error: "bg-red-800 hover:bg-red-900 text-white",
        info: "bg-blue-600 hover:bg-blue-700 text-white",
    }[variant];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-background text-white p-6 rounded-2xl w-full max-w-sm shadow-xl border border-white/10">
                <h2 className="text-xl font-semibold mb-3 text-primary">{title}</h2>
                <p className="text-sm text-white/80 mb-6">{message}</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white/80 text-sm"
                    >
                        {cancelLabel}
                    </button>
                    {onConfirm && (
                        <button
                            onClick={onConfirm}
                            className={`px-4 py-2 rounded-xl text-sm transition ${variantStyle}`}
                        >
                            {confirmLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
