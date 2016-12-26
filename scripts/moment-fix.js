/*
 *  Add moment.js to global scope (window.moment) for chart.js dependency
 */
define(['moment'], function(moment) {
  window.moment = moment;
});
