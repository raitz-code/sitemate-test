class ConfirmModalButton {
    constructor({
        buttonElm,
        message,
        confirmCallback = () => {},
        cancelCallback = () => {},
    }) {
        console.assert(buttonElm !== undefined, "ConfirmModalButton: need a buttonElm parameter!")

        this.buttonElm = buttonElm;
        this.message = (message === undefined) ? buttonElm.dataset.message : message;
        this.confirmCallback = confirmCallback;
        this.cancelCallback = cancelCallback;

    }

    initialize() {
        this.modalElm = this.#initializeModal();

        this.buttonElm.addEventListener('click', (e) => {
            this.#showModal();
        })
    }

    // In real world I might use some framework that supports HTML template,
    // instead of creating tags with JavaScript.
    #initializeModal() {
        const modalElm = document.createElement('div');
        modalElm.classList.add('confirm-modal-container');
        modalElm.classList.add('hidden');

        const modal = document.createElement('div');
        modal.classList.add('confirm-modal');
        modalElm.appendChild(modal);

        const msg = document.createElement('div');
        msg.innerText = this.message;
        modal.appendChild(msg);

        const confirmBtn = document.createElement('button');
        confirmBtn.type = 'button';
        confirmBtn.innerText = 'Yes';
        confirmBtn.addEventListener('click', (e) => {
            this.#hideModal();
            this.confirmCallback();
        })

        modal.appendChild(confirmBtn);

        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.innerText = 'Cancel';
        cancelBtn.addEventListener('click', (e) => {
            this.#hideModal();
            this.cancelCallback();
        })
        modal.appendChild(cancelBtn);

        this.buttonElm.parentNode.insertBefore(modalElm, this.buttonElm);
        return modalElm;
    }

    #hideModal() {
        this.modalElm.classList.add('hidden');
    }

    #showModal() {
        this.modalElm.classList.remove('hidden');
    }
}