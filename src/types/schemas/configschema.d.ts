/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface Configschema {
	/**
	 * Whether or not to use mock data instead of the real tracker API. If true, pulls from Lange's Dropbox.
	 */
	useMockData?: boolean;
	/**
	 * How long (in seconds) most things show on-screen for.
	 */
	displayDuration?: number;
	omnibar?: {
		/**
		 * How long (in seconds) to hold items during a scroll.
		 */
		scrollHoldDuration?: number;
	};
	mixer?: null | {
		/**
		 * The IP address or hostname of a Behringer X32 digital mixer.
		 */
		address: string;
		gameAudioChannels: {
			sd?: number | null;
			hd?: number | null;
			[k: string]: any;
		}[];
		adsChannel: number;
		[k: string]: any;
	};
	twitter?: {
		[k: string]: any;
	} | null;
	twitch?: {
		[k: string]: any;
	} | null;
	footpedal?: {
		enabled?: boolean;
		buttonId?: number;
		[k: string]: any;
	};
	/**
	 * Credentials used to log into Firebase, which is what hosts Lightning Round.
	 */
	firebase?: {
		[k: string]: any;
	} | null;
	/**
	 * Login information for the private areas of the tracker API.
	 */
	tracker: {
		username: string;
		password: string;
		eventId: number;
		[k: string]: any;
	};
	donationSocketUrl?: string;
	casparcg?: {
		host: string;
		port: number;
		lockSecret: string;
		localOscPort: number;
		debug?: boolean;
	};
	nowPlayingKey?: string;
	/**
	 * API credentials for the optional VictorOps integration..
	 */
	victorOps?: {
		[k: string]: any;
	} | null;
	/**
	 * The URL to the volunteer schedule. Is embedded as an IFrame on the Producer Dashboard.
	 */
	volunteerScheduleURL?: string;
	/**
	 * The URL to the volunteer evaluations form. Is embedded as an IFrame on the Producer Dashboard.
	 */
	volunteerEvaluationsURL?: string;
	/**
	 * The URL to the tech notes spreadsheet. Is embedded as n IFrame on the Producer Dashboard.
	 */
	techNotesURL?: string;
	zabbix?: {
		enabled: boolean;
	};
}
