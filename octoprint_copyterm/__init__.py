# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin

class CopyTermPlugin(octoprint.plugin.AssetPlugin):

	##~~ AssetPlugin mixin

	def get_assets(self):
		return dict(
			js=["js/copyterm.js"]
		)

	##~~ Softwareupdate hook

	def get_update_information(self):
		return dict(
			copyterm=dict(
				displayName="CopyTerm Plugin",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="foosel",
				repo="OctoPrint-CopyTerm",
				current=self._plugin_version,

				# update method: pip
				pip="https://github.com/foosel/OctoPrint-CopyTerm/archive/{target_version}.zip"
			)
		)


__plugin_name__ = "CopyTerm Plugin"

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = CopyTermPlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}

