# Releasing a new version

To form a new release:

1. `$ git tag <version number>` (`git tag 0.1.2`)
2. `$ git push --tags`
3. `$ release`
4. Edit the release on GitHub to make it a little less code-history and more features/bug fixes
5. `$ yarn run package` on both Mac and Windows machines
6. Attach `-mac.zip`, `.dmg`, `.exe`, `latest-mac.json`, `RELEASES` files to the release
7. Publish the release
