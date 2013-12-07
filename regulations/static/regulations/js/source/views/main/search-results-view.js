define('search-results-view', ['jquery', 'underscore', 'backbone', './search-model', './regs-router', 'header-controller', 'main-controller', 'drawer-controller'], function($, _, Backbone, SearchModel, Router, HeaderEvents, MainEvents, DrawerEvents) {
    'use strict';

    var SearchResultsView = Backbone.View.extend({
        el: '#content-wrapper.search-results',

        events: {
            'click .search-nav a': 'paginate'
        },

        initialize: function() {
            var $results = this.$el.find('#result-count');
            HeaderEvents.trigger('search-results:open', $results.text());
            $results.remove();

            if (Router.hasPushState) {
                if (typeof this.options.id !== 'undefined') {
                    Router.navigate('search/' + this.options.id);
                }
            }

            this.query = this.options.query;
            this.version = this.options.version;
            this.page = parseInt(this.options.page, 10) || 0;

            // if the browser doesn't support pushState, don't 
            // trigger click events for links
            if (Router.hasPushState === false) {
                this.events = {};
            }

            DrawerEvents.trigger('pane:change', 'search');
        },

        paginate: function(e) {
            e.preventDefault();

            var page = $(e.target).hasClass('previous') ? this.page - 1 : this.page + 1,
                config = {
                    query: this.query,
                    version: this.version,
                    page: page
                };

            MainEvents.trigger('search-results:open', config);
        },

        remove: function() {
            this.$el.remove();
            this.stopListening();
            return this;
        }
    });

    return SearchResultsView;

});
