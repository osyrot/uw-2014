// List out the classes that each component searches for
UW.elements = {

  // quicklinks : '.uw-quicklinks',
  search    : '.uw-search',
  //quicklinks: '#uw-container',
  slideshow : '.uw-slideshow',
  social    : '.uw-social',
  vimeo     : '.uw-vimeo',
  select    : '.uw-select',
  accordion : '.uw-accordion',
  radio     : ':radio',
  dropdowns : '#dawgdrops'

}
// Initialize all components when the DOM is ready
UW.initialize = function( $ )
{
  UW.search     = _.map( $( UW.elements.search ),    function( element ) { return new UW.Search( { el : element, model : new UW.Search.DirectoryModel() }) } )
  //UW.quicklinks = _.map( $( UW.elements.quicklinks ),function( element ) { return new UW.QuickLinks( { el : element }) } )
  UW.slideshows = _.map( $( UW.elements.slideshow ), function( element ) { return new UW.Slideshow( { el : element }) } )
  UW.social     = _.map( $( UW.elements.social ),    function( element ) { return new UW.Social({ el : element }) } )
  UW.vimeo      = _.map( $( UW.elements.vimeo ),     function( element ) { return new UW.Vimeo({ el : element }) } )
  UW.select     = _.map( $( UW.elements.select ),    function( element ) { return new UW.Select({ el : element }) } )
  UW.accordion  = _.map( $( UW.elements.accordion ), function( element ) { return new UW.Accordion( { el : element }) } )
  UW.players    = new UW.PlayerCollection()
  UW.radio      = _.map( $( UW.elements.radio ),     function( element ) { return new UW.Radio({ el : element }) } )
  UW.dropdowns  = _.map( $( UW.elements.dropdowns ),     function( element ) { return new UW.Dropdowns({ el : element }) } )
  UW.quicklinks = new UW.QuickLinks()
}

jQuery(document).ready( UW.initialize )


// Basic UW Components
// --------------
