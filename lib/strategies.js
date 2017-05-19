 // 策略
 var strategies = {
     isString: function(value) {
         return typeof value === 'string';
     },

     isArray: function(value) {
         return {}.toString.call(value) === '[object Array]';
     },
     // Checks if the object is a hash, which is equivalent to an object that
     // is neither an array nor a function.
     isHash: function(value) {
         return this.isObject(value) && !this.isArray(value) && !this.isFunction(value);
     },
     // Checks if the value is a number. This function does not consider NaN a
     // number like many other `isNumber` functions do.
     isNumber: function(value) {
         return typeof value === 'number' && !isNaN(value);
     },

     // Returns false if the object is not a function
     isFunction: function(value) {
         return typeof value === 'function';
     },

     // A simple check to verify that the value is an integer. Uses `isNumber`
     // and a simple modulo check.
     isInteger: function(value) {
         return this.isNumber(value) && value % 1 === 0;
     },

     // Checks if the value is a boolean
     isBoolean: function(value) {
         return typeof value === 'boolean';
     },

     // Uses the `Object` function to check if the given argument is an object.
     isObject: function(obj) {
         return obj === Object(obj);
     },

     // Simply checks if the object is an instance of a date
     isDate: function(obj) {
         return obj instanceof Date;
     },

     // Returns false if the object is `null` of `undefined`
     isDefined: function(obj) {
         return obj !== null && obj !== undefined;
     },

     // Checks if the given argument is a promise. Anything with a `then`
     // function is considered a promise.
     isPromise: function(p) {
         return !!p && this.isFunction(p.then);
     },

     isJqueryElement: function(o) {
         return o && this.isString(o.jquery);
     },

     isDomElement: function(o) {
         if (!o) {
             return false;
         }

         if (!o.querySelectorAll || !o.querySelector) {
             return false;
         }

         if (this.isObject(document) && o === document) {
             return true;
         }

         // http://stackoverflow.com/a/384380/699304
         /* istanbul ignore else */
         if (typeof HTMLElement === "object") {
             return o instanceof HTMLElement;
         } else {
             return o &&
                 typeof o === "object" &&
                 o !== null &&
                 o.nodeType === 1 &&
                 typeof o.nodeName === "string";
         }
     },

     isEmpty: function(value) {
         var attr;

         // Null and undefined are empty
         if (!this.isDefined(value)) {
             return true;
         }

         // functions are non empty
         if (this.isFunction(value)) {
             return false;
         }

         // Whitespace only strings are empty
         if (this.isString(value)) {
             var EMPTY_STRING_REGEXP = /^\s*$/;
             return EMPTY_STRING_REGEXP.test(value);
         }

         // For arrays we use the length property
         if (this.isArray(value)) {
             return value.length === 0;
         }

         // Dates have no attributes but aren't empty
         if (this.isDate(value)) {
             return false;
         }

         // If we find at least one property we consider it non empty
         if (this.isObject(value)) {
             for (attr in value) {
                 return false;
             }
             return true;
         }

         return false;
     },
     isNonEmpty: function(value) {
         return !this.isEmpty(value);
     },
     // backwards compatibility: isLength(value, min [, max])
     isLength: function(value, options) {
         let min;
         let max;
         if (typeof(options) === 'object') {
             min = options.min || 0;
             max = options.max;
         } else {
             min = arguments[1];
             max = arguments[2];
         }
         const surrogatePairs = value.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
         const len = value.length - surrogatePairs.length;
         return len >= min && (typeof max === 'undefined' || len <= max);
     },
     isBase64: function(str) {
         const notBase64 = /[^A-Z0-9+\/=]/i;
         const len = str.length;
         if (!len || len % 4 !== 0 || notBase64.test(str)) {
             return false;
         }
         const firstPaddingChar = str.indexOf('=');
         return firstPaddingChar === -1 ||
             firstPaddingChar === len - 1 ||
             (firstPaddingChar === len - 2 && str[len - 1] === '=');
     }
 };