"use strict";

const HTTPClientService = require("moleculer-http-client");

module.exports = {
	name: "riot",
	mixins: [HTTPClientService],
	settings: {
		httpClient: {
			logging: true,
			responseFormatter: "body", // one of "body", "headers", "status", "raw"
		}
	},
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
				const { puuid } =  await this.getSummonerByName(ctx);
				const history = await this.getSummonerMatchHistory(ctx, puuid);
				const historyRequests = history.map(async matchId => await this.getHistoryByMatchId(ctx, matchId));
				const matches = await Promise.all(historyRequests);
				
				return this.filterParticipantById(puuid, matches);
			}
		}
	},

	methods: {
		async getSummonerByName(ctx) {
			const response = await ctx.call("riot.get", {
				url: `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${ctx.params.name}?api_key=RGAPI-536c4675-861e-46bb-8027-66ce5223206f`,
				opt: { responseType: "json" }
			});
			return response;
		},

		async getSummonerMatchHistory(ctx, puuid) {
			const response = await ctx.call("riot.get", {
				url: `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=RGAPI-536c4675-861e-46bb-8027-66ce5223206f`,
				opt: { responseType: "json" }
			});
			return response;
		},

		async getHistoryByMatchId(ctx, matchId) {
			const response = await ctx.call("riot.get", {
				url: `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=RGAPI-536c4675-861e-46bb-8027-66ce5223206f`,
				opt: { responseType: "json" }
			});
			const { info } = response;
			return info;
		},

		filterParticipantById(puuid, matches) {
			return matches.map(({ participants }) => participants.filter(({ puuid: id }) => id == puuid))
				.map(([{ 
					kills,
					deaths,
					assists,
					win,
					championName,
					totalMinionsKilled
				}]) => ({ 
					kills,
					deaths,
					assists,
					win,
					championName,
					totalMinionsKilled
				}));
		}
	},
};
