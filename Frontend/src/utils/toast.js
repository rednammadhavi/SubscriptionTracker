let listener = null;

const ToastService = {
    show(message) {
        if (listener) listener(message);
    },
    success(msg) {
        this.show(`✅ ${msg}`);
    },
    error(msg) {
        this.show(`❌ ${msg}`);
    },
    subscribe(fn) {
        listener = fn;
    }
};

export default ToastService;
