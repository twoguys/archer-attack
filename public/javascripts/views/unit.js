var UnitView = Backbone.View.extend({
  
  tagName: 'div',
  className: 'unit',
  template: _.template('<div class="body"></div><div class="hitpoints"></div>'),
  
  events: {
    'click .body'     : 'clicked'
  },
  
  initialize: function() {
    _.bindAll(this, 'render', 'clicked');
    this.model.bind('change', this.render, this);
    
    this.$el.addClass(this.model.get('type'));
    var left = this.model.get('x') * 64;
    if (this.model.get('y') % 2 == 0) { left += 32; }
    this.$el.css('left', left);
    var top = this.model.get('y') * 68 - 16 * (this.model.get('y') + 1);
    this.$el.css('top', top);
  },
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  
  clicked: function() {
    this.model.move();
  }
  
});