# <img src="public/Streamflow-logo.png" width="64px" alt="Streamflow logo"/> Streamflow

Streamflow is an [Electron](https://electron.atom.io/)-powered desktop application for watching your favorite Twitch streamers without any downtime.

> Note: *Streamflow is not affiliated with Twitch.* This is a third-party hobby project. For questions, contact the repository owner, not Twitch.

In other words, Streamflow automatically shifts to your next favorite online streamer when the one you're watching goes offline. Perfect for putting on in the background for long study sessions or chores.

No logins, no bullshit. Just open the app and get back to your day.

![Screenshot of v0.2.0](public/screenshot-06-18-2017.png)

## Features

- Flow from one favorite streamer to the next
- Sync your favorite streamers with your Twitch follows
- Easily manage favorite streamers from in app
- Persistent settings
- Sleek material design interface
- *Semi*-responsive layout
- Optionally always-on-top for easy multitasking
- MacOS Touch Bar support

## Config

While you should never have to edit this file yourself (and be **very** careful if you should), all settings are saved to `~/.streamflow.json`.

### Options:

- `favorites`: **[String]**: channel names
- `alwaysOnTop`: **Boolean**: Whether or not the window should stay on top of others

## Supported platforms

- MacOS (Tested MacOS Sierra 10.12.5) [download](https://streamflow-releases.now.sh/download/darwin)
- Windows (Tested Windows 10) [download](https://streamflow-releases.now.sh/download/win32)
- Linux (not yet tested)
  - Note for linux you'll need to follow instructions below to build the app from source

## Package from source

Clone the repository and run this command to build both the electron app and package it: `yarn run package` or `npm run package`.
