(function($, _, Backbone) {

    WebvsEd.ContainerField = WebvsEd.Field.extend({
        tagName: "fieldset",

        baseTemplate: _.template([
            "<% if(title) { %>",
            "    <legend class='title'><%= title %></legend>",
            "<% } %>",
            "<div class='content'>",
            "    <div class='fieldBody'></div>",
            "    <ul class='messages ui-state-error ui-corner-all'></ul>",
            "</div>"
        ].join("")),

        events: _.extend({
            "click > .title": "toggleCollapse"
        }, WebvsEd.Field.prototype.events),

        initialize: function(opts) {
            if(opts.collapsible) {
                this.collapsible = true;
                this.startCollapsed = opts.collapsed?true:false;
            }
            // default required should be false for container fields
            var newOpts = _.extend({required: false}, opts);
            WebvsEd.Field.prototype.initialize.call(this, newOpts);
        },

        render: function() {
            WebvsEd.Field.prototype.render.apply(this, arguments);
            if(this.startCollapsed) {
                this.$closest(".content").hide();
            }
        },

        toggleCollapse: function() {
            if(!this.collapsible) {
                return;
            }
            this.$closest(".content").slideToggle();
        }
    });

})(jQuery, _, Backbone);