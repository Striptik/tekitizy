/*
 * This function creates a new instance of the Tekitizy Library
 */
function Tekitizy (selector, options) {
  this.selector = selector
  this.opts = {}
  this.checkOpts(options)


  if (options && options.hasOwnProperty('carroussel_id')) {
    this.carroussel_id = options.carroussel_id
  } else {
    this.carroussel_id = 'tekitizy_carroussel'
  }
  // this.selector <- selector (paramètre)
  // this.carrousel_id <- 'tekitizy_carroussel' ou options.carroussel_id
}

/*
 * This function permits to check the options pass to Tekitizy constructor
 * and set defaults values if none
 */
Tekitizy.prototype.checkOpts = function (opts) {
  if (opts && typeof opts === 'object') {
    if (opts.hasOwnProperty('carroussel_id') && typeof opts.carroussel_id === 'string') {
      this.opts.carroussel_id = opts.carroussel_id
    } else {
      this.opts.carroussel_id = 'tekitizy_carroussel'
    }
    if (opts.hasOwnProperty('prevNext') && typeof opts.prevNext === 'boolean') {
      this.opts.prevNext = opts.prevNext
    } else {
      this.opts.prevNext = true
    }
    if (opts.hasOwnProperty('autoPlay') && typeof opts.autoPlay === 'boolean') {
      this.opts.autoPlay = opts.autoPlay
    } else {
      this.opts.autoPlay = true
    }
    if (opts.hasOwnProperty('imageDuration') && typeof opts.imageDuration === 'number' &&
        opts.imageDuration > 0 && opts.imageDuration < 60) {
      this.opts.imageDuration = opts.imageDuration
    } else {
      this.opts.imageDuration = 2
    }
    if (opts.hasOwnProperty('effect') && typeof opts.effect === 'boolean') {
      this.opts.effect = opts.effect
    } else {
      this.opts.effect = false
    }
    if (opts.hasOwnProperty('thumbnails') && typeof opts.thumbnails === 'boolean') {
      this.opts.thumbnails = opts.thumbnails
    } else {
      this.opts.thumbnails = false
    }
  } else {
    this.opts.carroussel_id = 'tekitizy_carroussel'
    this.opts.prevNext = true
    this.opts.autoPlay = true
    this.opts.imageDuration = 2
    this.opts.effect = false
    this.opts.thumbnails = false
  }
}

// Tekitizy.setup(JQuery, '.post img',{ carrousse_id: 'my-tekitizy' })
// Tekitizy.setup(JQuery, '.post img')
Tekitizy.setup = function (JQuery, imgSelector, opts) {
  // comment binder JQuery ?  Replace $(this) by JQuery.ready ?
  //var $ = JQuery
  $(document).ready(function () {
    var tekitizy
    tekitizy = new Tekitizy(imgSelector, opts)
    tekitizy.setup()
  })
}

Tekitizy.prototype.setup = function () {
  this.drawCarroussel(this.opts.carroussel_id)
  this.appendZoomBtn(this.selector, this.clickZoomBtn)
  this.listenToButtons()
  // ...
}

Tekitizy.prototype.drawCarroussel = function (id) {
  var carroussel = ''

  carroussel += '<div class="tekitizy-carroussel" id=' + id + '></div>'
  // Ajouter les boutons, la figure ..
  this.carroussel = $(carroussel)
  this.carroussel.appendTo($('body'))
}

Tekitizy.prototype.listenToButtons = function () {
  // this -> instance Tekitizy
  var _this = this

  $('.tekitizy-open-btn').on('click', function () {
    // this -> noeud
    // _this -> instance Tekitizy
    _this.actionShow($(this).attr('data-src'))
  })
}

Tekitizy.prototype.appendZoomBtn = function (selector) {
  $(selector).each(function () {
    // image
    var $el
    var image_src
    $el = $(this)
    image_src = $el.attr('src')
    $el.wrap('<div></div>') // image
      .parent() // container
        .addClass('tekitizy-container') // container
        .append('<i class="tekitizy-open-btn fa fa-search" data-src="' + image_src + '"  aria-hidden="true"></i>')
  })
}

// affiche une image
Tekitizy.prototype.actionShow = function (url) {
  alert(url)
  this.carroussel.addClass('tekitizy-carroussel-open')
}

Tekitizy.prototype.actionNext = function () {

}

Tekitizy.prototype.actionPrev = function () {

}

Tekitizy.prototype.actionPlay = function () {

}

Tekitizy.prototype.actionPause = function () {

}

Tekitizy.prototype.actionClose = function () {
  this.carroussel.removeClass('tekitizy-carroussel-open')
}
