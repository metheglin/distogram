var Distribution = new Class(Canvas);
Distribution.extend({
  // Common
  find: function(id) {
    var canvas = document.getElementById(id);
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      return new Distribution(canvas, ctx);
    }

    throw 'No such a canvas.';
  },
  // Distribution Domain Specific
  rand: function(max) {
    return Math.floor( Math.random() * max );
  }
});

Distribution.include({
  init: function(obj, ctx) {
    this.__proto__.__proto__.init(obj, ctx);
    var w = this.attr('width');
    var h = this.attr('height');
    this.coord = [];
    for ( var i=0; i<w; i++ ) {
      this.coord[i] = [];
      for ( var j=0; j<h; j++ ) {
        this.coord[i][j] = 0;
      }
    }
  },
  distribute: function(pt) {
    this.coord[pt.x][pt.y]++;
    this.__proto__.__proto__.dot(pt);
  },
  histogramize: function(space) {
    if ( space <= 0 ) space = 10;

    var w = this.attr('width');
    var h = this.attr('height');
    this.histogram = [];
    for ( var i=0; i<w; i++ ) {
      var index_x = Math.floor(i/space);
      this.histogram[index_x] = [];
      for ( var j=0; j<h; j++ ) {
        var index_y = Math.floor(j/space);
        if ( this.histogram[index_x][index_y] == undefined )
          this.histogram[index_x][index_y] = 0;
        this.histogram[index_x][index_y] += this.coord[i][j];
        // console.log(index_x, index_y, this.coord[i][j])
      }
    }
  },
  maxHisto: function() {
    var max = 0;
    for ( var i=0; i<this.histogram.length; i++ ) {
      for ( var j=0; j<this.histogram[0].length; j++ ) {
        if ( this.histogram[i][j] > max ) max = this.histogram[i][j];
      }
    }
    return max;
  },
  minHisto: function() {
    return 0;
  },
  total: function() {
    var total = 0;
    var w = this.attr('width');
    var h = this.attr('height');
    for ( var i=0; i<w; i++ ) {
      for ( var j=0; j<h; j++ ) {
        total += this.coord[i][j];
      }
    }
    return total;
  },
  histogramize2: function() {
    this.histgram2 = [];
    for ( var k=0; k<this.maxHisto(); k++ ) {
      this.histgram2[k] = 0;
    }
    for ( var i=0; i<this.histogram.length; i++ ) {
      for ( var j=0; j<this.histogram[0].length; j++ ) {
        this.histgram2[this.histogram[i][j]]++;
      }
    }
  }

});