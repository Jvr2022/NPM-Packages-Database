# Change Log

Documentation of changes to cloudflare-router.

See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0-beta (2022-08-01)](https://www.npmjs.com/package/cloudflare-router/v/3.0.0-beta)

----
### New version in 2022!
A new version is out to reflect updates in the Cloudflare Workers ecosystem,
in addition to some bug-fixes with the previous versions.

For example, previously, using router.use() would not work occassionally due to
race condition due to some issues internally. This has now
been fixed by making sure to refresh all the routes upon router.use usage (by using router.refreshRoutes())



## [2.0.0 (2021-06-28)](https://www.npmjs.com/package/cloudflare-router/v/1.3.0)

----

### Features:
* New release of cloudflare-router
* Version to 2.0.0
* Added better middleware API, which looks more like express
* Rewrote codebase

## [1.3.0 (2021-01-24)](https://www.npmjs.com/package/cloudflare-router/v/1.3.0)

----

### Features:
* More stable release
* Added LICENSE and CHANGELOG files
* Updated the version to 1.3.0 from 1.2.2 for more quality on NPM score


## [1.2.2 (2021-01-24)](https://www.npmjs.com/package/cloudflare-router/v/1.2.2)

----

### Features:
* Fixed some internal path fixing 
