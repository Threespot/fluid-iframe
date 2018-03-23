"use strict";

/**
 * Wrap the last X words in an HTML tag to prevent them from wrapping (i.e. orphans)
 * @param {HTMLElement} el - iframe element
 * @param {Object} opts - Options
 * @param {number} [opts.defaultAspectRatio=9/16] - Fallback aspect ratio if height and width are undefined
 * @param {number|boolean} [opts.forceRatio=false] - Aspect ratio override (ignores iframe’s actual dimensions)
 * @param {boolean} [opts.inlineStyles=true] - Apply inline styles (set to “false” if using CSS)
 * @param {boolean} [opts.wrap=true] - Whether or not to add a wrapper div to the iframe. Setting to “false” means the video can’t be displayed wider than its original width.
 * @param {string} [opts.classes=""] - Class(es) to add to the wrapper or iframe (depends on wrap option)
 */

export default class FluidFrame {
  constructor(el, opts) {
    var self = this;
    this.el = el;

    // Check if target element is an iframe
    if (this.el.tagName.toLowerCase() !== "iframe") {
      console.warn(
        `FluidFrame only works on iframes, not <${this.el.tagName.toLowerCase()}> tags`
      );
      return false;
    }

    // Use Object.assign() to merge “opts” object with default values in this.options
    this.options = Object.assign(
      {},
      {
        defaultAspectRatio: 9 / 16,
        forceRatio: false,// set aspect ratio to use regardless of actual dimensions of iframe
        inlineStyles: true,// apply inline styles to wrapper or iframe (depends on wrap option)
        wrap: true,// adds a div wrapper around the iframe
        classes: "" // custom class(es) to add to the wrapper or iframe (depends on wrap option)
      },
      opts
    );

    // If inline styles are disabled, “classes” and “forceRatio” must be defined.
    if (
      !this.options.inlineStyles &&
      !this.options.classes &&
      !this.options.forceRatio
    ) {
      console.warn(
        "FluidFrame: If inline styles are disabled, a fixed aspect ratio must be defined along with custom classes."
      );
      return false;
    }

    // Get intrinsic dimensions
    this.width = this.el.width ? parseInt(this.el.width) : this.el.offsetWidth;
    this.height = this.el.height ? parseInt(this.el.height) : this.el.offsetHeight;

    // Determine the aspect ratio
    if (parseFloat(this.options.forceRatio)) {
      this.aspectRatio = parseFloat(this.options.forceRatio);
    } else {
      this.aspectRatio =
        !this.width && !this.height
          ? this.options.defaultAspectRatio
          : this.height / this.width;
    }

    // Wrap iframe in div with padding-top equal to aspect ratio as a percentage
    if (this.options.wrap) {
      this.wrapper = document.createElement("div");
      this.el.parentNode.insertBefore(this.wrapper, this.el);
      this.wrapper.appendChild(this.el);
    }

    // Check for custom classes
    if (this.options.classes.length) {
      // Check if string contains multiple classes
      if (this.options.classes.indexOf(" ") > -1) {
        // Convert to array and remove empty items (caused by extra whitespace)
        this.options.classes = this.options.classes
          .split(" ")
          .filter(n => n.length);
      } else {
        // We still need to convert a single class to an array
        // in order to use the spread syntax below.
        this.options.classes = [this.options.classes];
      }

      // Add classes
      if (this.options.wrap) {
        this.wrapper.classList.add(...this.options.classes);
      } else {
        this.el.classList.add(...this.options.classes);
      }
    }

    // Add inline styles
    if (this.options.inlineStyles) {
      if (this.options.wrap) {
        this.wrapper.setAttribute(
          "style",
          `padding-top: ${100 * this.aspectRatio}%; position: relative;`
        );

        // Set iframe to absolutely fill the parent div
        this.el.setAttribute(
          "style",
          "height: 100%; left: 0; position: absolute; top: 0; width: 100%;"
        );
      } else {
        // Inspired by https://github.com/dollarshaveclub/reframe.js#-noframejs
        this.el.setAttribute(
          "style", `display: block; height: ${100 * this.aspectRatio}vw; margin-left: auto; margin-right: auto; max-height: ${this.height}px; max-width: 100%; width: ${this.width}px;`
        );
      }
    }
  }
}
