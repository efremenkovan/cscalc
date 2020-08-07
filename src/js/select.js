export class Select {
    constructor(
        selector,
        {
            options = [],
            placeholder =  'Выберите пункт',
            onChange = null,
        } = {}
    ) {
        this.$el = document.querySelector(selector);
        this.options = options;
        this.placeholder = placeholder;
        this.isOpen = false;
        this.value = null;
        this.onChange = onChange;

        !this.$el.classList.contains('select') && this.$el.classList.add('select');
        this.#render(options);


        this.clickHandler = this.clickHandler.bind(this);
        window.addEventListener('click', this.clickHandler);
    }

    #renderOption({value, id, label}) {
        return `<div
            class="select__option${this.value && value ===  this.value.value ? ' selected' : ''}"
            data-value="${value}"
            data-id="${id}"
            data-select-type="option"
        >${label}</div>`;
    }

    #renderOptions(options) {
        return options.map(option => this.#renderOption(option)).join('');
    }

    #render() {
        this.$el.innerHTML = `
            <div class="select__input" data-select-type="input">
                <span data-select-type="input">${this.value && this.value.label || this.placeholder}</span>
                <svg
                    data-select-type="input"
                    class="select__input__icon"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    role="presentation"
                >
                    <path d="M7 10l5 5 5-5z"/>
                </svg>
            </div>
            <div class="select__options" data-select-type="options">${this.#renderOptions(this.options)}</div>
        `;
    }

    open() {
        this.$el.classList.add('open');
        this.isOpen = true;
    }

    close() {
        this.$el.classList.remove('open');
        this.isOpen = false;
    }

    clickHandler(event) {
        if(!this.$el.contains(event.target)) {
            this.close();
            return;
        }
        const type = event.target.dataset.selectType;

        switch(type) {
            case 'input':
                this.isOpen ? this.close() : this.open();
                break;
            case 'option':
                const label = event.target.innerText;
                this.value = {
                    value: event.target.dataset.value,
                    label,
                    id: event.target.dataset.id,
                };
                this.#render();
                this.close();

                this.onChange && this.onChange(this.value);
                break;
            default:
                this.isOpen && this.close();
        }
    }
}