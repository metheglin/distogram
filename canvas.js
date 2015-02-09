var Canvas = new Class;
Canvas.extend({
  find: function(id) {
    var canvas = document.getElementById(id);
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      return new Canvas(canvas, ctx);
    }

    throw 'No such a canvas.';
  }
});
Canvas.include({
  init: function(obj, ctx) {
    this.obj = obj;
    this.ctx = ctx;
  },
  attr: function(attr_name) {
    return this.obj.getAttribute(attr_name);
  },
  // Graphic
  dot: function(point) {
    this.ctx.fillRect(point.x, point.y, 1, 1);
  },
  line: function(point_start, point_end, options) {
    if ( options == null ) options = {};
    if ( options.linew == null ) options.linew = 1;
    if ( options.line_color == null ) options.line_color = '#ccc';

    this.ctx.beginPath();
    this.ctx.lineWidth = options.linew;
    this.ctx.strokeStyle = options.line_color;
    this.ctx.moveTo(point_start.x + 0.5, point_start.y + 0.5);
    this.ctx.lineTo(point_end.x + 0.5, point_end.y + 0.5);
    this.ctx.closePath();
    this.ctx.stroke();
  },
  // Utilities
  showGrid: function(space_x, space_y) {
    var maxw = this.attr('width');
    var maxh = this.attr('height');
    for ( var i=0; i<maxw; i++ ) {
      if ( i % space_x == 0) {
        this.line(new Vector2(i, 0), new Vector2(i, maxh));
      }
    }
    for ( var j=0; j<maxh; j++ ) {
      if ( j % space_y == 0) {
        this.line(new Vector2(0, j), new Vector2(maxw, j));
      }
    }
  }
})