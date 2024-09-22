try {
    (function () {
        var widget = window.tenantTurnerListingsWidget;

        if (typeof widget == 'undefined') {
            // TRANSLATION
            var legacyWidget = window.tenantTurnerSettings;
            window.tenantTurnerListingsWidget = {
                connection: {
                    customer_id: legacyWidget.customer_id,
                    user_id: legacyWidget.assigned_to_user_id
                },
                environment: {
                    root_path: 'https://app.tenantturner.com'
                },
                tracking: {},
                options: {
                    appearance__theme_color: legacyWidget.theme_color != '' ? legacyWidget.theme_color : '0d99dd',
                    appearance__map_enabled: legacyWidget.map ? 1 : 0,
                    appearance__map_height: legacyWidget.map_height != '' ? legacyWidget.map_height.split('px')[0] : '800',
                    appearance__map_width: legacyWidget.map_width != '' ? legacyWidget.map_width.split('%')[0] : '100',
                    appearance__map_view: legacyWidget.show_map_and_listings == true ? 'show_map_above_listings' : legacyWidget.default_to_map == true ? 'show_map_first' : 'show_listings_first',
                    appearance__application_enabled: 1,
                    appearance__application_display_type: 'link',
                    appearance__waitlist_enabled: 1,
                    search__search_enabled: 1,
                    search__default_value: legacyWidget.default_search != '' ? legacyWidget.default_search : '',
                    filter__filter_enabled: 1,
                    filter__city_default_value: '',
                    filter__state_default_value: '',
                    filter__property_type_default_value: '',
                    filter__bedrooms_default_value: '',
                    filter__baths_default_value: '',
                    filter__pets_default_value: '',
                    sort__sort_enabled: 1,
                    sort__default_value: legacyWidget.default_sort != '' ? (legacyWidget.default_sort == 'Newest' ? 'Most Recent' : legacyWidget.default_sort) : 'Most Recent'
                }
            };

            // Set local variable widget after getting legacy widget
            widget = window.tenantTurnerListingsWidget;
        }
        
        // CREATE CONTAINER
        var container;
        // Check for existing container in document
        if (document.getElementById('ttRentalList')) {
            container = document.getElementById('ttRentalList');
        }
        else {
            container = document.createElement('div');
            container.id = 'ttRentalList';
            container.className = 'container-fluid loading';
            var ttWidget = document.getElementById('ttWidget'),
                ttWidgetParent = ttWidget.parentNode;

            if (document.body.contains(ttWidget)) {
                ttWidgetParent.insertBefore(container, ttWidget);
            }
            else {
                document.body.appendChild(container);
            }
        }
        // Write map containers
        var ttRL = document.getElementById('ttRentalList');
        mapParentContainer = document.createElement('div');
        mapParentContainer.id = 'ttRentalListViewMap';
        mapParentContainer.className = 'tt-view-container';
        ttRL.appendChild(mapParentContainer);

        // ATTACH STYLESHEET
        var head = document.getElementsByTagName('head')[0],
            css1 = document.createElement('link');
        css1.rel = 'stylesheet';
        css1.type = 'text/css';
        css1.href = widget.environment.root_path + '/assets/widget/widget.min.css?v=20210216';
        head.appendChild(css1);

        // CREATE CUSTOM OVERRIDE STYLES
        if (widget.options.appearance__theme_color) {
            var themeColor = widget.options.appearance__theme_color,
                style = document.createElement('style'),
                css = '';
            style.type = 'text/css';
            style.setAttribute('id', 'ttWidgetHeadStyles');
            css += '#ttRentalList a { color: #' + themeColor + '; }';
            css += '#ttRentalList .tt-view-header { background-color: #' + themeColor + '; }';
            css += '#ttRentalList .tt-view-header .form-group a { color: #fff; }';
            css += '#ttRentalList .tt-view-header .form-group a.active { color: #' + themeColor + '; }';
            css += '#ttRentalList .tt-rental-row a.btn.btn-primary { background: #' + themeColor + '; border-color: #' + themeColor + '; color: #fff; }';
            css += '#ttRentalList .tt-rental-row .btn.btn-primary:hover { background: #' + themeColor + '; border-color: #' + themeColor + '; }';
            css += '#ttRentalList .tt-info-window a.btn.btn-primary { background: #' + themeColor + '; border-color: #' + themeColor + '; color: #fff; }';
            css += '#ttRentalList .tt-info-window .btn.btn-primary:hover { background: #' + themeColor + '; border-color: #' + themeColor + '; }';
            css += '#ttRentalList .tt-info-window .btn.apply-btn.btn-primary, #ttRentalList .tt-info-window a.btn.apply-btn.btn-primary { color: #' + themeColor + '; }';
            css += '#ttRentalList .tt-marker:before { color: #' + themeColor + '; }';
            style.appendChild(document.createTextNode(css));
            head.appendChild(style);
        }

        // RENDER WIDGET
        // jQuery
        if (!window.jQuery) {
            var jq = document.createElement('script');
            jq.type = 'text/javascript';
            jq.src = widget.environment.root_path + '/assets/app/libs/jquery/jquery-3.6.0.min.js';
            document.getElementById('ttRentalList').appendChild(jq);
        }
        // Widget
        function defer(method) {
            if (window.jQuery) {
                method();
            }
            else {
                setTimeout(function () { defer(method); }, 50);
            }
        }
        defer(function () {
            var ws = document.createElement('script');
            ws.type = 'text/javascript';
            ws.src = widget.environment.root_path + '/assets/widget/widget.min.js?v=20210216';
            document.getElementById('ttRentalList').appendChild(ws);
        });
    })()
} catch (err) {
    // alert(err);
}