export default class AnimatedSVGDial {
    constructor(element, params) {
      if (element === undefined) {
        return;
      }
  
      // Conversion of the different types of input
      this.parentElement = {};
      if (typeof element === 'string') {
        this.parentElement = document.querySelector(element);
      } else if (this.isObject(element)) {
        this.parentElement = element;
      }
  
      // Define option defaults
      this.params = this.extendParams(params);
      this.hideText = this.params.length > 1;

      //  Cleanup
      this.parentElement.innerHTML = '';

      // Creates the SVG element
      this.svgElement = this.createSvgElement();
      // Creates the element into wich store the styles
      this.styleElement = this.createElement('defs', new Map());
      // Creates the whole HTML stucture
      this.initHtml();
      // Append the SVG to the HTML
      this.parentElement.appendChild(this.svgElement);
      // Animation init
      this.initAnimationParams();
    }
  
    // Animate all the dials
    animate() {
      for (let i = 0; i < this.params.length; i++) {
        const progressBar = this.params[i];
        this.animateSvgRadialProgressBar(i, progressBar);
      }
    }
  
    // Resets all the dials
    reset() {
      for (let i = 0; i < this.params.length; i++) {
        this.resetDialParams(i);
      }
    }
  
    // Sets the dial's animation params
    initAnimationParams() {
      for (let i = 0; i < this.params.length; i++) {
        const progressBar = this.params[i];
        this.setDialAnimationParams(i, progressBar);
      }
    }
  
    // Sets the timout for the animation
    // index: dial index - int
    // progressBar: parameter object - object
    animateSvgRadialProgressBar(index, progressBar) {
      if (progressBar.value === undefined || Number.isNaN(progressBar.value)) {
        return;
      }
  
      if (progressBar.maxValue !== undefined && Number.isNaN(progressBar.maxValue)) {
        return;
      }
  
      if (
        progressBar.animationDuration !== undefined &&
        Number.isNaN(progressBar.animationDuration)
      ) {
        return;
      }
  
      if (
        progressBar.animationOffset !== undefined &&
        Number.isNaN(progressBar.animationOffset)) {
        return;
      }
  
      const gauge = this.svgElement.querySelectorAll('.circle')[index];
      const radius = gauge.getAttribute('r');
      const circumference = 2 * radius * Math.PI;
      const {
        maxValue
      } = progressBar;
  
      const textElement = this.svgElement.querySelector('text');
      const offset = (circumference / maxValue) * (maxValue - progressBar.value);
  
      setTimeout(() => {
        gauge.setAttribute('stroke-dashoffset', offset);
        if (!this.hideText && textElement !== undefined && textElement !== null) {
          textElement.textContent = progressBar.text;
        }
      }, progressBar.animationOffset);
    }
  
    // Sets the dial's animation params
    // index: dial index - int
    // progressBar: parameter object - object
    setDialAnimationParams(index, progressBar) {
      if (
        progressBar.animationDuration !== undefined &&
        Number.isNaN(progressBar.animationDuration)
      ) {
        return;
      }
  
      const gauge = this.svgElement.querySelectorAll('.circle')[index];
  
  
      const radius = gauge.getAttribute('r');
      // get the radius of the circle
  
      const circumference = 2 * radius * Math.PI;
      // calculate the circumference
  
      const transitionCssTime = progressBar.animationDuration / 1000;
      // divide the time in millisecond by 1000 to have seconds
  
      const transitionParams = `${transitionCssTime}s ${progressBar.animationEasing}`;
  
      gauge.setAttribute('stroke-dasharray', circumference);
      gauge.setAttribute('stroke-dashoffset', circumference);
      gauge.setAttribute('style', `transition: stroke-dashoffset ${transitionParams};`);
    }
  
    // Resets the dial to its initial state
    // index: dial index - int
    resetDialParams(index) {
      const gauge = this.svgElement.querySelectorAll('.circle')[index];
      if (gauge !== undefined && gauge !== null) {
        gauge.setAttribute('stroke-dashoffset', gauge.getAttribute('stroke-dasharray'));
      }
      if (!this.hideText) {
        const text = this.svgElement.querySelector('text');
        if (text !== undefined && text !== null) {
          text.textContent = '';
        }
      }
    }
  
    // Calls the methods to create the HTML structure
    initHtml() {
      this.createSVGDefs(this.params);
      this.createGraphicElements(this.params);
    }
  
    // Adds to the SVG tag the element of the dial and the text and it attaches
    // them to the right HTML node
    // params: array of attributes for each dial and for the text - array
    createGraphicElements(params) {
      for (let i = 0; i < params.length; i++) {
        const progressBar = params[i];
        // Background circle
        this.svgElement.appendChild(this.createElement('circle', progressBar.backgroundCircleParams));
        // Foreground circle
        this.svgElement.appendChild(this.createElement('circle', progressBar.foregroundCircleParams));
        // Text - Only if there is only one dial
        if (params.length === 1) {
          const text = this.createElement('text', progressBar.textParams);
          this.svgElement.appendChild(text);
        }
      }
    }
  
    // Adds to the SVG tag the correct style definitions
    // params: array of gradients for each dial - array
    createSVGDefs(params) {
      for (let i = 0; i < params.length; i++) {
        const progressBar = params[i];
        // If there is no everything is managed by circle params
        if (progressBar.gradient) {
          let gradientElement;
          if (progressBar.gradient.type === 'linear') {
            gradientElement = this.createElement('linearGradient', progressBar.gradient.params);
          } else {
            gradientElement = this.createElement('radialGradient', progressBar.gradient.params);
          }
  
          for (let j = 0; j < progressBar.gradient.stops.length; j++) {
            const stop = progressBar.gradient.stops[j];
            gradientElement.appendChild(this.createElement('stop', stop));
          }
  
          this.styleElement.appendChild(gradientElement);
        }
      }
  
      // Append the styles to the SVG
      this.svgElement.appendChild(this.styleElement);
    }
  
    // Extends the passed config object with the remaining params
    // params: object or array of parameters for the configuration - array/obj
    extendParams(params) {
      let paramsArray = [];
      if (this.isObject(params)) {
        paramsArray.push(params);
      } else if (Array.isArray(params)) {
        paramsArray = params;
      } else {
        paramsArray = [{}];
      }
  
      const defaults = [];
      // Cycle trough every progress bar to get its attributes
      for (let i = 0; i < paramsArray.length; i++) {
        const progressBar = paramsArray[i];
        const defaultProgressBar = {};
        defaults.push(defaultProgressBar);
  
        // HTML Elements
        defaultProgressBar.gradient = this.getGradientParams(progressBar);
        defaultProgressBar.backgroundCircleParams = this.getBackgroundDialParams(progressBar);
        defaultProgressBar.foregroundCircleParams = this.getForegroundDialParams(progressBar);
        defaultProgressBar.textParams = this.getTextParams(progressBar);
  
        // Animation & Text & Value
        defaultProgressBar.animationDuration = progressBar.animationDuration || 350;
        defaultProgressBar.animationOffset = progressBar.animationOffset || 0;
        defaultProgressBar.animationEasing = progressBar.animationEasing || 'ease-out';
  
        defaultProgressBar.text = progressBar.text || '';
  
        defaultProgressBar.value = progressBar.value || 50;
        defaultProgressBar.maxValue = progressBar.maxValue || 100;
  
        if (defaultProgressBar.value > defaultProgressBar.maxValue)
          defaultProgressBar.value = defaultProgressBar.maxValue;
      }
  
      return defaults;
    }
  
    // Extends the config object with the remaining params for the background dial
    // progressBar: object of parameters for the configuration - obj
    getBackgroundDialParams(progressBar) {
      if (progressBar === undefined) {
        return new Map();
      }
  
      const backgroundDialParams = new Map();
      backgroundDialParams.set('cx', '50');
      backgroundDialParams.set('cy', '50');
      backgroundDialParams.set('r', progressBar.r || 40);
      backgroundDialParams.set('fill', progressBar.bkgFill || 'none');
      backgroundDialParams.set('stroke', progressBar.bkgStrokeColor || 'black');
      backgroundDialParams.set('stroke-width', progressBar.bkgStrokeWidth || '10');
      backgroundDialParams.set('stroke-opacity', progressBar.bkgStrokeOpacity || '0.4');
  
      return backgroundDialParams;
    }
  
    // Extends the config object with the remaining params for the foreground dial
    // progressBar: object of parameters for the configuration - obj
    getForegroundDialParams(progressBar) {
      if (progressBar === undefined) {
        return new Map();
      }
  
      const foregroundDialParams = new Map();
      foregroundDialParams.set('class', 'circle');
      foregroundDialParams.set('cx', '50');
      foregroundDialParams.set('cy', '50');
      foregroundDialParams.set('r', progressBar.r || 40);
      foregroundDialParams.set('fill', progressBar.fill || 'none');
      foregroundDialParams.set('stroke', progressBar.strokeColor || 'black');
      foregroundDialParams.set('stroke-width', progressBar.strokeWidth || '10');
      foregroundDialParams.set('stroke-opacity', progressBar.strokeOpacity || '1');
      foregroundDialParams.set('stroke-linecap', progressBar.strokeLineCap || 'round');
  
      return foregroundDialParams;
    }
  
    // Extends the config object with the remaining params for the text
    // progressBar: object of parameters for the configuration - obj
    getTextParams(progressBar) {
      if (progressBar === undefined) {
        return new Map();
      }
  
      const textParams = new Map();
      textParams.set('x', progressBar.textX || '50%');
      textParams.set('y', progressBar.textY || '-45');
      textParams.set('style', progressBar.textStyle || 'transform: rotate(90deg);');
      textParams.set('fill', progressBar.textFill || 'black');
      textParams.set('stroke', progressBar.textStrokeColor || 'none');
      textParams.set('stroke-width', progressBar.textStrokeWidth || '0');
      textParams.set('font-size', progressBar.textSize || '18');
      textParams.set('font-weight', progressBar.textWeight || 'normal');
      textParams.set('font-family', progressBar.textFont || 'Verdana');
      textParams.set('text-anchor', progressBar.textAnchor || 'middle');
  
      return textParams;
    }
  
    // Extends the config object with the remaining params for the gradient
    // progressBar: object of parameters for the configuration - obj
    getGradientParams(progressBar) {
      if (progressBar.gradient === undefined) {
        return undefined;
      }
  
      const gradient = {
        type: progressBar.gradient.type,
        params: new Map(),
        stops: [],
      };
      gradient.params.set('id', progressBar.gradient.id);
      if (progressBar.gradient.type === 'linear') {
        gradient.params.set('x1', progressBar.gradient.x1 || '0%');
        gradient.params.set('y1', progressBar.gradient.y1 || '0%');
        gradient.params.set('x2', progressBar.gradient.x2 || '100%');
        gradient.params.set('y2', progressBar.gradient.y2 || '100%');
      } else {
        gradient.params.set('cx', progressBar.gradient.cx || '0%');
        gradient.params.set('cy', progressBar.gradient.cy || '0%');
        gradient.params.set('r', progressBar.gradient.r || '5');
        gradient.params.set('fx', progressBar.gradient.fx || '45%');
        gradient.params.set('fy', progressBar.gradient.fy || '45%');
      }
  
      progressBar.gradient.stops.forEach((stop) => {
        const stopParams = new Map();
        stopParams.set('offset', stop.offset || '0%');
        stopParams.set('stop-color', stop.color || '#FFFFFF');
        stopParams.set('stop-opacity', stop.opacity || '1');
        gradient.stops.push(stopParams);
      });
  
      return gradient;
    }
  
    // Creates the SVG tag with the correct parameters
    // width: width of the svg element - px or %
    // height: height of the svg element - px or %
    createSvgElement() {
      const element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      element.setAttribute('viewBox', '0 0 100 100');
      element.setAttribute('height', '100%');
      element.setAttribute('width', '100%');
      element.setAttribute('style', 'transform: rotate(-90deg);');
      return element;
    }
  
    // Creates an SVG element tag with the correct parameters
    // tag: tagname - string
    // attributes: map of attributes - Map
    createElement(tag, attributes) {
      const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
      if (attributes.size > 0) {
        attributes.forEach((value, name) => element.setAttribute(name, value));
      }
      return element;
    }

    cleanUp() {
      this.svgElement = undefined;
      this.backgroundDial = undefined;
      this.foregroundDial = undefined;
      this.text = undefined;
      this.gradient = undefined;

      // Remove all children from the parent element
      while (this.parent.firstChild) {
        this.parent.removeChild(this.parent.firstChild);
      }

    }
  
    isObject(value) {
      return value && typeof value === 'object' && value.constructor === Object;
    }
  }
