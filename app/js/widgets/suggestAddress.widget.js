define([
		'jquery',
		'entities/vent',

		'modules/address/address.model',
		'modules/address/addresses.collection',

		'jquery.ui'

	],
	function ($, vent, Address, AddressesCollection) {

		$.widget('custom.suggestAddress', $.ui.autocomplete, {
			options: {
				appendTo: null,
				autoFocus: false,
				delay: 300,
				minLength: 1,
				position: {
					my: "left top",
					at: "left bottom",
					collision: "none"
				},
				source: AddressesCollection.suggest,

				// callbacks
				change: null,
				close: null,
				focus: null,
				open: null,
				response: null,
				search: null,
				select: null
			},

			_renderItem: function (ul, item) {
				return $('<li />')
					.attr('data-value', item.id)
					.append(Address.formatRaw(item))
					.appendTo(ul);
			}
		});


	});