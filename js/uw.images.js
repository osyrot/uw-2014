UW.Image = Backbone.View.extend({

  RATIO : 0.8,

  template : '<div class="uw-overlay">' +
                    '<div></div>' +
                    '<div class="wrapper" style="width:<%= width %>px; margin-top:-<%= height/2 %>px; margin-left:-<%= width/2 %>px;">' +
                     '<span class="close"> Close</span>' +
                     '<img src="<%= src %>" alt="<%=alt %>" style="width:100%;" />' +
                     '<p><%= caption %></p>' +
                     '<p><%= credit %></p>' +
                   '</div>' +
                 '</div>',

  templateVideo : '<div class="uw-overlay">' +
                    '<div></div>' +
                    '<div class="wrapper" style="width:<%= width %>px; margin-top:-<%= height/2 %>px; margin-left:-<%= width/2 %>px;">' +
                     '<span class="close"> Close</span>' +
                     '<iframe width="<%= width %>" height="<%= height %>" src="<%= src %>" frameborder="0" allowfullscreen></iframe>' +
                     '<p><%= caption %></p>' +
                     '<p><%= credit %></p>' +
                   '</div>' +
                 '</div>',

  events : {
    'click' : 'fetchImage'
  },

  initialize : function()
  {
    _.bindAll( this, 'fetchImage', 'overlay' , 'render' )
  },

  fetchImage : function( e )
  {
    this.attrs = this.getAttributes( e )
    $('<img src="'+ this.attrs.src +'"/>').imagesLoaded( this.overlay )
    return false;
  },

  overlay : function( images )
  {

    // todo make this quicker
    if ( (!this.attrs.rel || !this.attrs.rel.includes("uw-lightbox-video")) && images.hasAnyBroken ) {
      if ( this.attrs.src ) {
        window.location = this.attrs.src;
      }
      return
    }

    var aspect_ratio;

    this.image = _.first( images.images )
    aspect_ratio = this.image.img.width / this.image.img.height;
    this.attrs.height = this.image.img.height
    this.attrs.width  = this.image.img.width

    if ( this.attrs.rel.includes("uw-lightbox-video") ) {
      aspect_ratio = 560 / 315;
      this.attrs.height = 630;
      this.attrs.width  = 1120;
    } 

    if ( this.attrs.height > (this.RATIO * UW.$window.height())){
        this.attrs.height = this.RATIO * UW.$window.height();
        this.attrs.width = aspect_ratio * this.attrs.height;
    }
    if ( this.attrs.width > (this.RATIO * UW.$window.width())){
        this.attrs.width = this.RATIO * UW.$window.width();
        this.attrs.height = this.attrs.width / aspect_ratio;
    }

    this.render()
    return false;
  },

  render : function()
  {
    UW.$body.one( 'click', this.remove )
    if ( this.attrs.rel == "uw-lightbox-video" ) {
      return  UW.$body.append( _.template( this.templateVideo, this.attrs ) )
    }
    return  UW.$body.append( _.template( this.template, this.attrs ) )
  },

  remove : function()
  {
    UW.$body.find( '.uw-overlay' ).remove()
    return false;
  },

  getAttributes: function( e )
  {
      var target = $(e.currentTarget),
          caption = target.parent('a').siblings('.wp-caption-text').text();

      if (!caption){
        var gallery_parent = target.parent('a').parent('.gallery-icon')
        if (gallery_parent){
          caption = gallery_parent.siblings('.wp-caption-text').text();
        }
      }

      var relation = target.parent('a').attr('rel') ? target.parent('a').attr('rel') : '';

      return {
        src : target.parent('a').attr('href') ? target.parent('a').attr('href') : '',
        alt : target.attr('alt'),
        rel : relation,
        caption : caption,
        credit : target.parent('a').siblings('.wp-caption-text').find('.wp-media-credit').text()
      }

  }

})
