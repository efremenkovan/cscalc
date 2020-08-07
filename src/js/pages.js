import {Select} from "./select";
import {renderBody, renderFooter, renderHeaderOptions, renderOptions} from './partials';

const rankImages = {
    0: require('../assets/ranks/silver-1.jpg'),
    1: require('../assets/ranks/silver-2.jpg'),
    2: require('../assets/ranks/silver-3.jpg'),
    3: require('../assets/ranks/silver-4.jpg'),
    4: require('../assets/ranks/silver-5.jpg'),
    5: require('../assets/ranks/silver-6.jpg'),
    6: require('../assets/ranks/gn-1.jpg'),
    7: require('../assets/ranks/gn-2.jpg'),
    8: require('../assets/ranks/gn-3.jpg'),
    9: require('../assets/ranks/gn-4.jpg'),
    10: require('../assets/ranks/ak-1.jpg'),
    11: require('../assets/ranks/ak-2.jpg'),
    12: require('../assets/ranks/ak-3.jpg'),
    13: require('../assets/ranks/bs.jpg'),
    14: require('../assets/ranks/le.jpg'),
    15: require('../assets/ranks/lem.jpg'),
    16: require('../assets/ranks/sup.jpg'),
    17: require('../assets/ranks/glob.jpg'),
};

const rankOptions = [
    {id: 0, label: 'Серебро - |', value: '170'},
    {id: 1, label: 'Серебро - ||', value: '170'},
    {id: 2, label: 'Серебро - |||', value: '170'},
    {id: 3, label: 'Серебро - |V', value: '170'},
    {id: 4, label: 'Серебро - Элита', value: '170'},
    {id: 5, label: 'Серебро - Великий Магистр', value: '170'},
    {id: 6, label: 'Золотая звезда - |', value: '270'},
    {id: 7, label: 'Золотая звезда - ||', value: '270'},
    {id: 8, label: 'Золотая звезда - |||', value: '270'},
    {id: 9, label: 'Золотая звезда - Магистр', value: '270'},
    {id: 10, label: 'Магистр-Хранитель - |', value: '350'},
    {id: 11, label: 'Магистр-Хранитель - ||', value: '350'},
    {id: 12, label: 'Магистр-Хранитель - Элита', value: '350'},
    {id: 13, label: 'Заслуженный Магистр-Хранитель', value: '400'},
    {id: 14, label: 'Легендарный Беркут', value: '650'},
    {id: 15, label: 'Легендарный Беркут-Магистр ', value: '850'},
    {id: 16, label: 'Великий Магистр высшего ранга', value: '1270'},
    {id: 17, label: 'Всемирная Элина', value: '1790'},
];

const wingmanRankOptions = [
    {id: 0, label: 'Серебро - |', value: '125'},
    {id: 1, label: 'Серебро - ||', value: '125'},
    {id: 2, label: 'Серебро - |||', value: '125'},
    {id: 3, label: 'Серебро - |V', value: '125'},
    {id: 4, label: 'Серебро - Элита', value: '125'},
    {id: 5, label: 'Серебро - Великий Магистр', value: '125'},
    {id: 6, label: 'Золотая звезда - |', value: '200'},
    {id: 7, label: 'Золотая звезда - ||', value: '200'},
    {id: 8, label: 'Золотая звезда - |||', value: '200'},
    {id: 9, label: 'Золотая звезда - Магистр', value: '200'},
    {id: 10, label: 'Магистр-Хранитель - |', value: '260'},
    {id: 11, label: 'Магистр-Хранитель - ||', value: '260'},
    {id: 12, label: 'Магистр-Хранитель - Элита', value: '260'},
    {id: 13, label: 'Заслуженный Магистр-Хранитель', value: '335'},
    {id: 14, label: 'Легендарный Беркут', value: '485'},
    {id: 15, label: 'Легендарный Беркут-Магистр ', value: '635'},
    {id: 16, label: 'Великий Магистр высшего ранга', value: '950'},
    {id: 17, label: 'Всемирная Элина', value: '1340'},
];

function mmPage({parent}) {
    let tabs = [
        {id: 0, value: 'mm', label: 'По званию', isActive: true},
        {id: 1, value: 'wingman', label: 'По званию напарники', isActive: false},
    ]

    const optionalFields = [
        {
            id: 0,
            value: value => value * 1.5,
            label: 'Без передачи аккаунта',
            description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
            checked: false,
        },
        {
            id: 1,
            value: value => value * 1.3,
            label: 'Приорити',
            description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
            checked: false,
        },
        {
            id: 2,
            value: value => value + 490,
            label: 'Стрим заказа',
            description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
            checked: false,
        },
    ];

    const rankUp = {
        from: null,
        to: null,
        options: optionalFields,
    }
    function updatePrice(settings) {
        if(settings.from === null || settings.to === null){
            document.querySelector('.calc__footer').innerHTML = '';
            renderFooter({total: 'Выберите звания', isValid: false, parent: '.calc__footer'})
            return;
        }
        if(settings.to.id <= settings.from.id) {
            document.querySelector('.calc__footer').innerHTML = '';
            renderFooter({total: 'Желаемое звание должно быть выше нынешего', isValid: false, parent: '.calc__footer'});
            return;
        }

        let total = 0;
        for(let i = parseInt(settings.from.id) + 1; i <= settings.to.id; i++) {
            total += parseInt(rankOptions[i].value);
        }

        settings.options.forEach(param => {
            if(param.checked) total=param.value(total);
        });

        total = Math.ceil(total);

        document.querySelector('.calc__footer').innerHTML = '';
        renderFooter({total, isValid: true, parent: '.calc__footer'});

    }

    const fromSelect = {
        options: {
            placeholder: 'Текущее звание',
            options: rankOptions,
            onChange(value) {
                rankUp.from = value;
                updatePrice(rankUp);
                document.querySelector('[id="image-from"]').src = rankImages[value.id];
            },
        },
        selector: '[id="select-from"]'
    };

    const toSelect = {
        selector: '[id="select-to"]',
        options: {
            placeholder: 'Желаемое звание звание',
            options: rankOptions,
            onChange(value) {
                rankUp.to = value;
                updatePrice(rankUp);
                document.querySelector('[id="image-to"]').src = rankImages[value.id];
            },
        }
    };

    const children = [
        () => renderHeaderOptions({
            options: tabs,
            onChange: (option) => {
                renderPage({
                    page: option.currentTarget.dataset.page,
                    parent: '.calc-wrapper',
                })
            },
            parent: '.calc__header',
        }),
        () => renderBody({
            parent: '.calc__body',
            selects: [
                fromSelect,
                toSelect,
            ],
            options: optionalFields,
            onOptionsChange({selects, options}) {
                rankUp.options = options;
                if(selects.find(value => value === null) !== undefined) {
                    document.querySelector('.calc__footer').innerHTML = '';
                    renderFooter({total: 'Выберите звания', isValid: false, parent: '.calc__footer'});
                    return;
                }
                updatePrice(rankUp);
            }
        }),
        () => renderFooter({total: 'Выберите звания', isValid: false, parent: '.calc__footer'}),
    ]

    function render() {
        return `
            <div class="calc__header"></div>
            <div class="calc__body"></div>
            <div class="calc__footer"></div>
        `;
    }

    document.querySelector(parent).insertAdjacentHTML('beforeEnd', render());
    children.forEach(child => child());
}

function wingmanPage({parent}) {
    let tabs = [
        {id: 0, value: 'mm', label: 'По званию', isActive: false},
        {id: 1, value: 'wingman', label: 'По званию напарники', isActive: true},
    ]

    const optionalFields = [
        {
            id: 0,
            value: value => value * 1.5,
            label: 'Без передачи аккаунта',
            description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
            checked: false,
        },
        {
            id: 1,
            value: value => value * 1.3,
            label: 'Приорити',
            description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
            checked: false,
        },
        {
            id: 2,
            value: value => value + 490,
            label: 'Стрим заказа',
            description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
            checked: false,
        },
    ];

    const rankUp = {
        from: null,
        to: null,
        options: optionalFields,
    }
    function updatePrice(settings) {
        if(settings.from === null || settings.to === null){
            document.querySelector('.calc__footer').innerHTML = '';
            renderFooter({total: 'Выберите звания', isValid: false, parent: '.calc__footer'})
            return;
        }
        if(settings.to.id <= settings.from.id) {
            document.querySelector('.calc__footer').innerHTML = '';
            renderFooter({total: 'Желаемое звание должно быть выше нынешего', isValid: false, parent: '.calc__footer'});
            return;
        }

        let total = 0;
        for(let i = parseInt(settings.from.id) + 1; i <= settings.to.id; i++) {
            total += parseInt(rankOptions[i].value);
        }

        settings.options.forEach(param => {
            if(param.checked) total=param.value(total);
        });

        total = Math.ceil(total);

        document.querySelector('.calc__footer').innerHTML = '';
        renderFooter({total, isValid: true, parent: '.calc__footer'});

    }

    const fromSelect = {
        options: {
            placeholder: 'Текущее звание',
            options: rankOptions,
            onChange(value) {
                rankUp.from = value;
                updatePrice(rankUp);
                document.querySelector('[id="image-from"]').src = rankImages[value.id];
            },
        },
        selector: '[id="select-from"]'
    };

    const toSelect = {
        selector: '[id="select-to"]',
        options: {
            placeholder: 'Желаемое звание звание',
            options: rankOptions,
            onChange(value) {
                rankUp.to = value;
                updatePrice(rankUp);
                document.querySelector('[id="image-to"]').src = rankImages[value.id];
            },
        }
    };

    const children = [
        () => renderHeaderOptions({
            options: tabs,
            onChange: (option) => {
                renderPage({
                    page: option.currentTarget.dataset.page,
                    parent: '.calc-wrapper',
                })
            },
            parent: '.calc__header',
        }),
        () => renderBody({
            parent: '.calc__body',
            selects: [
                fromSelect,
                toSelect,
            ],
            options: optionalFields,
            onOptionsChange({selects, options}) {
                rankUp.options = options;
                if(selects.find(value => value === null) !== undefined) {
                    document.querySelector('.calc__footer').innerHTML = '';
                    renderFooter({total: 'Выберите звания', isValid: false, parent: '.calc__footer'});
                    return;
                }
                updatePrice(rankUp);
            }
        }),
        () => renderFooter({total: 'Выберите звания', isValid: false, parent: '.calc__footer'}),
    ]

    function render() {
        return `
            <div class="calc__header"></div>
            <div class="calc__body"></div>
            <div class="calc__footer"></div>
        `;
    }

    document.querySelector(parent).insertAdjacentHTML('beforeEnd', render());
    children.forEach(child => child());
}

function renderPage({page, parent}) {
    document.querySelector(parent).innerHTML =` 
        <div class="calc"></div>
    `;
    function render() {
        switch(page) {
            case 'wingman':
                wingmanPage({parent: '.calc'});
                break;
            case 'mm':
            default:
                mmPage({parent: '.calc'});
        }
    }
    render();
}


export default renderPage;