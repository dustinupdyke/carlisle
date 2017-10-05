// JavaScript Document

/* 
   Internet Explorer 10 doesn't differentiate device width from viewport width, 
   and thus doesn't properly apply the media queries in Bootstrap's CSS
 */

if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement("style")
  msViewportStyle.appendChild(
    document.createTextNode(
      "@-ms-viewport{width:auto!important}"
    )
  )
  document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
}