Oskari.clazz.define('Oskari.coordinatetransformation.component.select',
    function (instance) {
        const me = this;
        me.instance = instance;
        me.selectInstances = {};
        me.dropdowns = {};
    }, {
        getSelectInstances: function () {
            return this.selectInstances;
        },
        getDropdowns: function () {
            return this.dropdowns;
        },
        create: function () {
            const json = this.instance.helper.getOptionsJSON();

            let selections = [];
            const dropdowns = {};
            const selects = {};
            let options = {};
            Object.keys(json).forEach(function (key) {
                const instanceKey = key;
                const value = json[key];
                const size = Object.keys(value).length;
                Object.keys(value).forEach(function (key) {
                    const obj = value[key];
                    const valObject = {
                        id: obj.id,
                        title: obj.title,
                        cls: obj.cls
                    };
                    selections.push(valObject);
                    // First element, set placeholder
                    if (key === '0') {
                        options = {
                            placeholder_text: obj.title,
                            allow_single_deselect: true,
                            disable_search_threshold: 10,
                            width: '100%'
                        };
                    }
                    if ('' + key === '' + (size - 1)) {
                        const select = Oskari.clazz.create('Oskari.userinterface.component.SelectList', 'id');
                        const dropdown = select.create(selections, options);
                        selections = [];
                        options = {};
                        dropdown.css({ width: '180px' });
                        select.adjustChosen();
                        select.selectFirstValue();
                        selects[instanceKey] = select;
                        dropdowns[instanceKey] = dropdown;
                    }
                });
            });
            this.dropdowns = dropdowns;
            this.selectInstances = selects;
        }
    });
