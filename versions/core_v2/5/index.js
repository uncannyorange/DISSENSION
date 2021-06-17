//
//  DISSENSION
//  By UncannyOrange, in collaboration with superwibr
//  version: 5 // In Dev
// 

/**
 * The grand DISSENSION stripdown
 * Dissension used to be it's own mod. 
 * It was progressing towards plugin support, but then we crossported it to a BetterDiscord plugin.
 * This is the moment where we abandon the "mod within a mod" idea and focus on the auxiliary plugin loader part.
 * We will finish the developpement of version 4, 
 * but moving on there will be no "content" page, no download queue or other things integrated.
 * (We will furnish the download queue as a plugin once we make that work though)
 * We hope you enjoy the developpement features this adds.
 * - Superwibr and UO
 */
import { Plugin, pluginManager } from "./modules/plugin"

const dissension = {
	Plugin: Plugin,
	pluginManager: pluginManager
}