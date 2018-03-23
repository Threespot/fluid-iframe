# Fluid Iframe

[![npm](https://badge.fury.io/js/%40threespot%2Ffluid-iframe.svg)](https://www.npmjs.com/package/@threespot/fluid-iframe)
[![Build Status](https://travis-ci.org/Threespot/fluid-iframe.svg?branch=master)](https://travis-ci.org/Threespot/fluid-iframe)
[![Coverage Status](https://coveralls.io/repos/github/Threespot/fluid-iframe/badge.svg)](https://coveralls.io/github/Threespot/fluid-iframe)

Allows iframes to scale down while maintaining its original aspect ratio. This is most useful for iframes authors paste into a rich-text WYSIWYG field. Managed iframes whose markup can be controlled directly (e.g. shortcodes) can achieve this with just HTML and CSS.

Inspired by [FitVids.js](http://fitvidsjs.com) and [noframe.js](https://github.com/dollarshaveclub/reframe.js#-noframejs).

## Install

```bash
yarn add @threespot/fluid-iframe
```

## Usage

```js
import FluidIframe from "@threespot/fluid-iframe";

const iframes = document.querySelectorAll("iframe");

iframes.forEach(el => new FluidIframe(el));

// Using a class instead of inline styles
iframes.forEach(el => new FluidIframe(el, {
  inlineStyles: false,
  classes: "video-wide"
}));

// Adding styles directly to the iframe with no wrapper
// (mean iframe won’t be able to expand beyond its original size)
iframes.forEach(el => new FluidIframe(el, { wrap: false }));
```

Here’s an example of how to use CSS instead of inline styles (requires wrapper around iframe):

```scss
  // wrapper div around the iframe
  .video-wide {
    position: relative;

    &:before {
      content: '';
      display: block;
      padding-top: percentage(9/16);
    }

    iframe {
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
```

### Options

These options can also be set in JavaScript:

```js
  new FluidFrame(el, {
    defaultAspectRatio: 9 / 16,
    forceRatio: false,// set aspect ratio to use regardless of actual dimensions of iframe
    inlineStyles: true,// apply inline styles to wrapper or iframe (depends on wrap option)
    wrap: true,// adds a div wrapper around the iframe
    classes: "" // class(es) to add to the wrapper or iframe (depends on wrap option)
  });
```

## License

This is free software and may be redistributed under the terms of the [MIT license](https://github.com/Threespot/fluid-iframe/blob/master/LICENSE.md).

## About Threespot

Threespot is an independent digital agency hell-bent on helping those, and only those, who are committed to helping others. Find out more at [https://www.threespot.com](https://www.threespot.com).

[![Threespot](https://avatars3.githubusercontent.com/u/370822?v=3&s=100)](https://www.threespot.com)
