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
			titleSelector: 		'td:even'
		}, options );

		this.initialize();
	};

	AccordionTable.prototype.initialize = function(){

		this.$titles = this.$el.find( this.options.titleSelector );
		this.$content = this.$el.find( this.options.contentSelector )
			.addClass( this.options.collapsedClass );

		this.setupBindings();
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

	$.fn.accordionTable = function( options ) {

		this.each( function(){

			var $el = $( this );

			if( ! $el.data( 'accordionTable' ) ){
				$el.data( 'accordionTable', new AccordionTable( $el, options ) );
			}
		} );

		return this;
	};


})( jQuery );