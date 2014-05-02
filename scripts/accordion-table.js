/**
 * Accordion-table
 *
 * Copyright (c) 2013 Develo // Design - MIT License
 *
 * @requires jQuery
 */
(function( $ ){

	var AccordionTable = function( $el, options ){

		this.$el = $el;

		this.options = $.extend( true, {
			activeClass: 		'active',
			collapsedClass: 	'collapsed',
			contentSelector: 	'td:odd',
			pluginClass:		'accordion',
			titleSelector: 		'td:even'
		}, options );

		this.initialize();
	};

	AccordionTable.prototype.initialize = function(){

		this.$titles = this.$el.find( this.options.titleSelector );

		this._prepareTitles();

		this.$content = this.$el.find( this.options.contentSelector )
			.addClass( this.options.collapsedClass );

		this.setupBindings();

		this.$el.addClass( this.options.pluginClass );
	};

	/**
	 * @private
	 *
	 * Came across a bug in firefox where relatively positioned table cells do not work. This means the controls
	 * for the accordion table are not rendered in the correct place.
	 * A work around for this is to add a relative container div and the controls are absolutely positioned within that.
	 */
	AccordionTable.prototype._prepareTitles = function(){

		this.$titles.each( function( index, title ){

			var $el = $( title );
			var content = $el.html();

			$el.empty();

			var $control = $( '<div/>' )
				.addClass( 'accordion-title-control' )
			;
			var $title = $( '<div/>' )
				.addClass( 'accordion-title' )
				.append( content )
				.append( $control )
				.appendTo( $el )
			;

		});
	};

	AccordionTable.prototype.setupBindings = function(){

		var accordionTable = this;

		this.$titles.on( 'click', function(){
			accordionTable.open( this );
		} );
	};

	AccordionTable.prototype.open = function( item ) {

		var $title = $( item );
		var $content = $title.parent().next().find( 'td' );
		var collapsedClass = this.options.collapsedClass;

		if( $content.hasClass( collapsedClass ) ){

			this.closeAll();
			$content.removeClass( collapsedClass );
			$title.addClass( this.options.activeClass );
		}
		else
			this.close( item );
	};

	AccordionTable.prototype.close = function( item ){

		var $title = $( item );
		var $content = $title.parent().next().find( 'td' );

		$content.addClass( this.options.collapsedClass );
		$title.removeClass( this.options.activeClass );
	};

	AccordionTable.prototype.closeAll = function() {

		this.$content.addClass( this.options.collapsedClass );
		this.$titles.removeClass( this.options.activeClass );
	};

	$.fn.develoAccordionTable = function( options ) {

		this.each( function(){

			var $el = $( this );

			if( ! $el.data( 'accordionTable' ) ){
				$el.data( 'accordionTable', new AccordionTable( $el, options ) );
			}
		} );

		return this;
	};


})( jQuery );