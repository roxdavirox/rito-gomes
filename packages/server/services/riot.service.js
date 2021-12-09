"use strict";
const HTTPClientService = require("moleculer-http-client");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "riot",

	mixins: [HTTPClientService],
	/**
	 * Settings
	 */


	settings: {
		// HTTP client settings
		httpClient: {
			// Boolean value indicating whether request should be logged or not
			logging: true,

			// Format the Response
			responseFormatter: "body", // one of "body", "headers", "status", "raw"


			// Got Client options
			defaultOptions: {
				// Put here any Got available option that can be used to extend Got client
			}
		}
	},
	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		/**
		 *
		 * @param {String} name - Summoner name
		 */
		summoner: {
			rest: "/summoner",
			params: {
				name: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const response = await ctx.call("riot.get", {
					url: `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${ctx.params.name}?api_key=RGAPI-536c4675-861e-46bb-8027-66ce5223206f`,
					opt: { responseType: "json" }
				});
				return response;
			}
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
