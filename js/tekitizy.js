/*
 *  Dynamic Carousel Tekitizy
 *  File : tekitizy.js
 *  Author : Alexandre Simonin & Kevin Loiseleur
 *  Licensed MIT
 */

/*
 *
 *
 * {CREATE, CONFIGURE & SETUP}
 *
 *
 */

/*
 * This function creates a new instance of the Tekitizy Library
 */
function Tekitizy (jQuery, selector, options) {
  this.selector = selector
  this.opts = {}
  this.nbImages = 0
  this.checkOpts(options)
  this.$ = jQuery
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
      this.opts.imageDuration = opts.imageDuration * 1000
    } else {
      this.opts.imageDuration = 2000
    }
    if (opts.hasOwnProperty('effect') && typeof opts.effect === 'boolean') {
      this.opts.effect = opts.effect
    } else {
      this.opts.effect = true
    }
    if (opts.hasOwnProperty('thumbnails') && typeof opts.thumbnails === 'boolean') {
      this.opts.thumbnails = opts.thumbnails
    } else {
      this.opts.thumbnails = false
    }
    if (opts.hasOwnProperty('play') && typeof opts.play === 'boolean') {
      this.opts.play = opts.play
    } else {
      this.opts.play = true
    }
    if (opts.hasOwnProperty('title') && typeof opts.title === 'boolean') {
      this.opts.title = opts.title
    } else {
      this.opts.title = true
    }
  } else {
    this.opts.carroussel_id = 'tekitizy_carroussel'
    this.opts.prevNext = true
    this.opts.autoPlay = true
    this.opts.imageDuration = 5000
    this.opts.effect = true
    this.opts.thumbnails = false
    this.opts.play = true
    this.opts.title = true
  }
}

/*
 * This function is the setup for the carousel
 */
Tekitizy.setup = function (JQuery, imgSelector, opts) {
  JQuery().ready(function () {
    var tekitizy

    tekitizy = new Tekitizy(JQuery, imgSelector, opts)
    tekitizy.setup()
  })
}

/*
 * This function permits to access and setup the Tekitizy carousel
 */
Tekitizy.prototype.setup = function () {
  this.drawCarroussel(this.opts.carroussel_id)
  this.appendZoomBtn(this.selector, this.clickZoomBtn)
  this.listenToButtons()
  this.playTekitizy()
}

/*
 *
 *
 * {DRAWER}
 *
 *
 */

/*
 * This function permits to append the zoom button on each image selected by the selector
 */
Tekitizy.prototype.appendZoomBtn = function (selector) {
  var tek = this

  this.$(selector).each(function (i) {
    var $el, image_src, alt
    $el = tek.$(this)
    image_src = $el.attr('src')
    alt = $el.attr('alt')
    $el.wrap('<div></div>')
      .parent()
        .addClass('tekitizy-container2')
        .append('<i class="tekitizy-open-btn fa fa-search tekitizy-zoom-btn" data-src="' + image_src + '"  aria-hidden="true" data-index="' + i + '" data-alt="' + alt + '"></i>')
  })
}

/*
 * This function permits to draw thw html structure for the carousel
 */
Tekitizy.prototype.drawCarroussel = function (id) {
  var tek = this
  var carousel = ''

  carousel = '<div class="tekitizy-carroussel" id=' + id + '>'
  carousel += this.appendButtons(carousel) // ajout boutons
  carousel += this.createImageContainer(carousel) // création du container d'image
  carousel += '</div>'
  this.carousel = tek.$(carousel)
  this.carousel.appendTo(tek.$('body'))
}

/*
 * Fonction append Boutons to the carroussel container
 */
Tekitizy.prototype.appendButtons = function () {
  var buttons = ''

  buttons += this.closeBtn()
  buttons += this.playBtn()
  buttons += this.pauseBtn()
  if (this.opts.prevNext === true) {
    buttons += this.nextPrevBtn()
  }
  return buttons
}

/*
 * This function return the close html button
 */
Tekitizy.prototype.closeBtn = function () {
  return ('<i class="fa fa-close tekitizy-icon tekitizy-close-btn"></i>')
}

/*
 * This function return the play html button
 */
Tekitizy.prototype.playBtn = function () {
  return ('<i class="fa fa-play tekitizy-icon tekitizy-play-btn"></i>')
}

/*
 * This function return the pause html button
 */
Tekitizy.prototype.pauseBtn = function () {
  return ('<i class="fa fa-pause tekitizy-icon tekitizy-pause-btn"></i>')
}

/*
 * This function return the next html button
 */
Tekitizy.prototype.nextPrevBtn = function () {
  var buttons = ''

  buttons += '<i class="fa fa-angle-left tekitizy-icon tekitizy-prev-btn"></i>'
  buttons += '<i class="fa fa-angle-right tekitizy-icon tekitizy-next-btn"></i>'
  return buttons
}

/*
 * This function return the image container  for the html structure
 */
Tekitizy.prototype.createImageContainer = function () {
  var container

  container += '<div class="tekitizy-container">'
  container += '<div class="tekitizy-container_list">'
  container += '</div>'
  container += '</div>'
  return container
}

/*
 * This function calcul the width of an image to have the good size
 */
Tekitizy.prototype.sizeWidth = function () {
  var tek = this
  var width = tek.$(window).width() / 2

  tek.$('.tekitizy-image_content').each(function () {
    tek.$(this).width(width)
  })
}

/*
 *
 *
 * {EVENTS}
 *
 *
 */

 /*
  * This function is the handler for all the click events
  */
Tekitizy.prototype.listenToButtons = function () {
  var tek = this
  // open
  tek.$('.tekitizy-open-btn').on('click', function () {
    tek.actionShow(tek.$(this).attr('data-src'), tek.$(this).attr('data-index'))
  })
  // play
  tek.$('.tekitizy-play-btn').on('click', function () {
    tek.actionPlay()
  })
  // pause
  tek.$('.tekitizy-pause-btn').on('click', function () {
    tek.actionPause()
  })
  // next
  tek.$('.tekitizy-next-btn').on('click', function () {
    tek.actionNext()
  })
  // prev
  tek.$('.tekitizy-prev-btn').on('click', function () {
    tek.actionPrev()
  })
  tek.$('.tekitizy-close-btn').on('click', function () {
    tek.actionClose()
  })
  this.responsiveWindow()
}

/*
 * This function call the resize function each time the window is redimensionate
 */
Tekitizy.prototype.responsiveWindow = function () {
  var tek = this

  tek.$(window).on('resize', function () {
    tek.sizeWidth()
  })
}

/*
 *
 *
 * {ACTIONS}
 *
 *
 */

 /*
  * This functiion permits to play the tekitizy carousel
  * with regular interval
  */
Tekitizy.prototype.playTekitizy = function () {
  var tek = this

  if (tek.opts.autoPlay === true) {
    tek.$('.tekitizy-play-btn').css('display', 'none')
    tek.$('.tekitizy-pause-btn').css('display', 'inline-block')
  } else {
    tek.$('.tekitizy-play-btn').css('display', 'inline-block')
    tek.$('.tekitizy-pause-btn').css('display', 'none')
  }
  setInterval(function () {
    if (tek.nbImages) {
      if (tek.opts.autoPlay === true) {
        tek.actionNext()
      }
    }
  }, tek.opts.imageDuration)
}

 /*
  * This action is executed when a zoom button is pressed
  */
Tekitizy.prototype.actionShow = function (img, i) {
  var tek = this

  tek.nbImages = 0
  this.pos = i
  tek.$('.tekitizy-container2').each(function ($i) {
    var img = tek.$(this).children('img').attr('src')
    var title2 = tek.$(this).children('img').attr('alt')
    var image_container = '<figure class="tekitizy-image_container'

    if (i === $i.toString()) {
      image_container += ' image-active'
    }
    image_container += '" data-index="' + $i + '"><img src="' + img + '" class="tekitizy-image_content" >'
    if (tek.opts.title) {
      image_container += '<p class="tekitizy-image_title">' + title2 + '</p>'
    }
    image_container += '</figure>'
    tek.$('.tekitizy-container_list').append(image_container)
    tek.nbImages++
  })

  this.sizeWidth()
  this.carousel.addClass('tekitizy-carroussel-open')

  var width = tek.$('.tekitizy-image_container').width()
  tek.$('.tekitizy-image_container').animate({ left: '-=' + width * (i) })
}

/*
 * Action execute when next button is pressed
 * or when autoplay is on
 */
Tekitizy.prototype.actionNext = function () {
  var tek = this
  var current_img = tek.$('.image-active')
  var next_img
  var width = tek.$('.tekitizy-image_container').width()

  if (current_img.attr('data-index') === (tek.nbImages - 1).toString()) {
    next_img = tek.$('.tekitizy-image_container').first()
    next_img.addClass('image-active')
    if (tek.opts.effect === true) {
      tek.$('.tekitizy-image_container').animate({ left: '+=' + width * (tek.nbImages - 1) })
    }
  } else {
    next_img = current_img.next()
    next_img.addClass('image-active')
    if (tek.opts.effect === true) {
      tek.$('.tekitizy-image_container').animate({ left: '-=' + width })
    }
  }
  current_img.removeClass('image-active')
}

/*
 * Action execute when play button is pressed
 */
Tekitizy.prototype.actionPrev = function () {
  var tek = this
  var current_img = tek.$('.image-active')
  var prev_img
  var width = tek.$('.tekitizy-image_container').width()

  if (current_img.attr('data-index') === '0') {
    prev_img = tek.$('.tekitizy-image_container').last()
    prev_img.addClass('image-active')
    if (tek.opts.effect === true) {
      tek.$('.tekitizy-image_container').animate({ left: '-=' + width * (tek.nbImages - 1) })
    }
  } else {
    prev_img = current_img.prev()
    prev_img.addClass('image-active')
    if (tek.opts.effect === true) {
      tek.$('.tekitizy-image_container').animate({ left: '+=' + width })
    }
  }
  current_img.removeClass('image-active')
}

/*
 * Action execute when pause button is pressed
 */
Tekitizy.prototype.actionPause = function () {
  var tek = this

  this.opts.autoPlay = false
  tek.$('i.tekitizy-pause-btn').css('display', 'none')
  tek.$('i.tekitizy-play-btn').css('display', 'inline-block')
}

/*
 * Action execute when play button is pressed
 */
Tekitizy.prototype.actionPlay = function () {
  var tek = this

  this.opts.autoPlay = true
  tek.$('i.tekitizy-play-btn').css('display', 'none')
  tek.$('i.tekitizy-pause-btn').css('display', 'inline-block')
}

/*
 * Action execute when close button is pressed
 */
Tekitizy.prototype.actionClose = function () {
  var tek = this

  tek.actionPause()
  this.carousel.removeClass('tekitizy-carroussel-open')
  var carousel = tek.$('.tekitizy-container_list')
  carousel.empty()
}
