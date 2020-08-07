import {Select} from "./select";

export function renderHeaderOptions({
    options = [],
    onChange = null,
    parent = '',
} = {}) {
    const root = document.querySelector(parent);
    root.insertAdjacentHTML('beforeEnd', render());
    root.querySelectorAll('.calc__header__type').forEach(element => {
        element.addEventListener('click', onChange)
    });

    function render() {
        return options.map(option =>
            `<button
                class="calc__header__type${option.isActive ? ' active' : ''}"
                ${option.isActive ? ' disabled' : ''}
                data-page="${option.value}"
            >${option.label}</button>`
        ).join('');
    }
}

export function renderOptions({
   options = [],
   onChange = () => null,
   parent = '',
} = {}) {
    const parentElement = document.querySelector(parent);
    parentElement.insertAdjacentHTML('beforeEnd', render(options));
    parentElement.querySelectorAll('.calc__body__option').forEach(element =>
        element.addEventListener('click', onChange),
    );

    function render(options) {
        return options.map(option => `
            <label class="calc__body__option">
                <div class="calc__checkbox">
                    <input
                        type="checkbox"
                        data-id="${option.id}"
                        class="calc__checkbox__input"
                        ${option.checked ? ' checked' : ''}
                    >
                    <div class="calc__checkbox__face">
                        <svg
                                fill="#000000"
                                viewBox="0 0 30 30"
                                width="30px"
                                height="30px"
                                class="calc__checkbox__face__icon"
                        >
                            <path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"/>
                        </svg>
                    </div>
                </div>
                <span class="calc__body__option__label">${option.label}</span>
                <svg
                        class="calc__body__option__info"
                        focusable="false"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        role="presentation"
                        data-title="${option.description}"
                >
                    <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
            </label>
        `).join('');
    }
}

export function renderBody({
    selects = [],
    options = [],
    parent: parentSelector = '',
    onOptionsChange = null,
} = {}) {
const parent = document.querySelector(parentSelector);
parent.insertAdjacentHTML('beforeEnd', render(options));
const selectControllers = selects.map(select => new Select(select.selector, select.options));
const _onOptionsChange = (event) => {
event.preventDefault();
const id = event.currentTarget.querySelector('input[type="checkbox"]').dataset.id
options = options.map(option => ({
...option,
checked: option.id == id
? !option.checked
: option.checked
})
);
onOptionsChange && onOptionsChange({options, selects: selectControllers.map(select => select.value)});
parent.querySelector('.calc__body__optional').innerHTML = '';
renderOptions({options, onChange: _onOptionsChange, parent: '.calc__body__optional'});
}
renderOptions({options, onChange: _onOptionsChange, parent: '.calc__body__optional'});



function render() {
return  `
<div class="calc__body__main">
<div class="calc__body__column">
<img src="${require('../assets/ranks/default.webp')}" alt="" id="image-from" class="calc__body__column__image">
<div id="select-from"></div>
</div>
<img src="${require('../assets/separator.svg')}" alt=">>>" class="calc__body__separator">
<div class="calc__body__column">
<div id="select-to"></div>
<img src="${require('../assets/ranks/default.webp')}" alt="" class="calc__body__column__image" id="image-to">
</div>
</div>
<div class="calc__body__optional"></div>
`
}
}

export function renderFooter({
    total = 0,
    isValid = false,
    parent = '',
} = {}) {
    document.querySelector(parent).insertAdjacentHTML('beforeEnd', render());

    function render() {
        return `
            <span class="calc__footer__price">К оплате: <em id="total">${total}</em></span>
            ${ isValid ? '<button id="submit" class="calc__footer__submit">Заказать!</button>' : ''}
        `
    }
}