# Slack Theme Switcher

Even though Chrome under Linux has been supporting the `prefers-color-scheme` media query for years, Slack still haven't updated their desktop app to support it:

<div align="center">

![Slack's theme settings](/res/slack-theme-settings.webp)

_Only under Linux, it's impossible to have Slack automatically following the system theme. It works under other OSs!_

</div>

I contacted Slack's support about this, but their reply made it clear that they do not care. So I made this ridiculous extension which listens to changes to `prefers-color-scheme`, and changes Slack's theme accordingly. Changing the theme is done by simulating user clicks to open and navigate the Preferences dialog. This sequence can also be triggered manually by clicking on a button added on the top-right of the page:

<div align="center">

![Theme switcher button](/res/theme-switcher-button.webp)

</div>

Notes that it only works in the browser (not in Slack's desktop app). However, using Slack in the browser as a desktop app is easy: simply open your browser's menu and click "Install app" or "Create shortcut". Personally, I have never installed Slack's desktop app.

This extension relies on Slack's internal class names, which can potentially change at any time.

## Installation

### Chrome

- download `chrome-theme-switcher-x.x.x.zip` and extract its content,
- open `chrome://extensions`,
- activate `Developer mode`,
- click `Load unpacked` and open the folder containing the content of the zip file.

### Firefox

- use the Developer or Nightly edition of Firefox,
- download `chrome-theme-switcher-x.x.x.xpi`,
- open `about:config` and set `xpinstall.signatures.required` to `false`,
- open `about:addons`,
- click the cog wheel, `Install Add-on From File...`, and select the `xpi` file,
- (optional) reopen `about:config` and set `xpinstall.signatures.required` back to `true`.
