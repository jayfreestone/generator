# Generator

Managing WordPress dependencies with Composer is pretty great - plugins and core are kept out of version control, it's easy to initialise a new copy of a site and it makes deployment a cinch. [WordPress Packagist](https://wpackagist.org/) makes this possible by mirroring the WordPress plugin and theme directories as Composer repositories — it's as easy as adding the source and specifying the plugin.

The best way to manage plugins is to lock in their version number and upgrade carefully, which rules out the `*` option. Every time you want to scaffold out a new project you’ll have to visit WPackagist and search for/copy the plugin you want and paste it into your Composer file. Annoyingly, the site only searches by slug, not title.

Generator lets you type in the actual **name** of the plugin and will automatically fetch the latest version number for inclusion in your composer file, without resorting to `*`. At the end of it you can hit the download button and then `composer install`. It's simple, basic and actually quite useful.
