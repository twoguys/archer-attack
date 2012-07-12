var UnitView = Backbone.View.extend({
  
  tagName: 'div',
  className: 'unit',
  template: _.template('<div class="body <%= state %>" title="<%= x %>, <%= y %>"></div><% if (hitpoints > 0) { %><div class="hitpoints"><%= hitpoints %></div><% } %>'),
  class_types: 'blank archer footman',
  
  events: {
    'click .body'     : 'clicked'
  },
  
  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render, this);
    
    this.model.set('view', this);
    
    this.$el.addClass(this.model.get('type'));
    var left = this.model.get('x') * 80;
    if (this.model.get('y') % 2 == 0) { left += 40; }
    this.$el.css('left', left);
    var top = this.model.get('y') * 85 - 20 * (this.model.get('y') + 1);
    this.$el.css('top', top);
  },
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.removeClass(this.class_types).addClass(this.model.get('type'));
    if (this.model.get('has_acted')) { this.$el.addClass('has-acted'); }
    return this;
  },
  
  clicked: function() {
    this.model.act();
  }
  
});