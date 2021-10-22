'use strict'

class Settings {
  static settingName = 'tailwindcss-jit-restrict'

  /**
   *
   * @param {{whiteList: string[]}} settings
   */
  constructor(settings = { whiteList: [] }) {
    if (!Array.isArray(settings.whiteList)) {
      throw new TypeError(
        `\`settings["${Settings.settingName}"].whiteList must be Array of strings'`
      )
    }
    this._value = settings
  }

  getWhiteList() {
    return this._value.whiteList
  }
}

exports.Settings = Settings
