# htmllint-simple-cli

A simple CLI-wrapper for the latest version of
[htmllint](https://github.com/htmllint/htmllint). Build on
[Commander.js](https://github.com/tj/commander.js),
[Globby](https://github.com/sindresorhus/globby) and
[Chalk](https://github.com/chalk/chalk). I coded it because I needed to lint
some HTML, but [htmllint-cli](https://github.com/htmllint/htmllint-cli) is
quite outdated and I couln't find any other CLI-wrapper.

![](https://i.imgur.com/Sw0svOn.png)

There is no `.rc` file to be used with this CLI. Every option must be set as
command line arguments. If left out, htmllint's defaults will be used. See the
[html lint Wiki](https://github.com/htmllint/htmllint/wiki/Options) for all
available options.

    $ htmllint -h

    Usage: htmllint [options]

    Options:

    -h, --help                        output usage information
    -V, --version                     output the version number
    -f, --files <globs>               Files to lint, can have wildcards and multiple locations: "a/*.html, b/**/*.html"
    --attr-bans <attributes>
    --attr-name-ignore-regex <regex>
    --attr-name-style <style>
    --attr-no-dup
    --attr-no-unsafe-char
    --attr-quote-style <style>
    --attr-req-value
    --class-style <style>
    --class-no-dup
    --doctype-first [val]
    --doctype-html5
    --fig-req-figcaption
    --focusable-tabindex-style
    --head-req-title
    --href-style <style>
    --html-req-lang
    --id-class-ignore-regex <regex>
    --id-class-no-ad
    --id-class-style <style>
    --id-no-dup
    --img-req-alt [val]
    --img-req-src
    --indent-style <style>
    --indent-width <width>
    --indent-width-cont
    --label-req-for
    --line-end-style <style>
    --line-max-len
    --line-max-len-ignore-regex
    --spec-char-escape
    --table-req-caption
    --tag-bans <tags>
    --tag-close
    --tag-name-lowercase
    --tag-name-match
    --tag-self-close
    --title-max-len <length>
    --title-no-dup

Released under the MIT license.
