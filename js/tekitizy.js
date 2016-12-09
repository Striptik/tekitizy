// A faire
// revoir le header du fichier + css
// faire les actions PREV/NEXT/PlayInterval/Play/Pause
// Besoin du resize ? // necesitter du swipe dans events NEXT et PREV ?
// Demande alex image active
// tester a 500 pour les intervals
// test
// faire les commentaires
// faire le README et ajouter option play et title
//faire la license
// faire le  bower


/*
 *  Dynamic Carousel
 *
 *  Licensed MIT
*/


/*
 * This function creates a new instance of the Tekitizy Library
 */
function Tekitizy (selector, options) {
  this.selector = selector
  this.opts = {}
  this.checkOpts(options)
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
      this.opts.effect = false
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
    if (opts.hasOwnProperty('title') && typeof opts.play === 'boolean') {
      this.opts.title = opts.title
    } else {
      this.opts.title = true
    }
  } else {
    this.opts.carroussel_id = 'tekitizy_carroussel'
    this.opts.prevNext = true
    this.opts.autoPlay = true
    this.opts.imageDuration = 2
    this.opts.effect = false
    this.opts.thumbnails = false
    this.opts.play = true
    this.opts.title = true
  }
}

/*
 * This function permits to access and setup the Tekitizy carousel
 */
Tekitizy.setup = function (JQuery, imgSelector, opts) {
  var $ = JQuery;
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


Tekitizy.prototype.appendZoomBtn = function (selector) {
  $(selector).each(function (i) {
    // image
    var $el
    var image_src
    var alt
    var i_img
    $el = $(this)
    image_src = $el.attr('src')
    alt = $el.attr('alt')
    i_img = i
    $el.wrap('<div></div>')
      .parent()
        .addClass('tekitizy-container')
        .append('<i class="tekitizy-open-btn fa fa-search" data-src="' + image_src + '"  aria-hidden="true"></i>')
  })
}

// CREATION GRAPHIQUE DU CARROUSSEL
Tekitizy.prototype.drawCarroussel = function (id) {
  var carousel = ''

  carousel = '<div class="tekitizy-carroussel" id=' + id + '>'


  carousel += this.appendButtons(carousel) // ajout boutons
  carousel += this.createImageContainer(carousel) // création du container d'image
  carousel += '</div>'

  this.carousel = $(carousel)
  this.carousel.appendTo($('body'))
}

/*
 * Fonction append Boutons to the carroussel container
 */
Tekitizy.prototype.appendButtons() = function () {
  var buttons = ''
  buttons += this.CloseBtn()
  if (this.opts.play === true) {
    buttons += this PlayBtn()
  } else {
    buttons += this.PauseBtn()
  }
  if (this.opts.prevNext === true) {
    buttons += this.NextPrevBtn()
  }
  // a retirer
  console.log('apendBouttons', buttons)
  return buttons
}

Tekitizy.prototype.CloseBtn() = function () {
  return ('<i class="fa fa-close tekitizy-icon tekitizy-close-btn"></i>')
}

Tekitizy.prototype.PlayBtn() = function () {
  return ('<i class="fa fa-play tekitizy-icon tekitizy-play-btn"></i>')
}

Tekitizy.prototype.PauseBtn() = function () {
  return (' <i class="fa fa-pause tekitizy-icon tekitizy-pause-btn"></i>')
}

Tekitizy.prototype.NextPrevBtn = function () {
  var buttons = ''
  buttons += '<i class="fa fa-angle-left tekitizy-icon tekitizy-prev-btn"></i>'
  buttons += '<i class="fa fa-angle-right tekitizy-icon tekitizy-next-btn"></i>'
  return buttons
}

Tekitizy.prototype.createImageContainer = function () {
  var container
  // if (this.opts.effect === true)
  container +=  '<div class="tekitizy-container">'
  container += '<div class="tekitizy-container_list">'
  container += '</div>'
  container += '</div>'
  // else container += '<div class="tekitizy-container_list"></div>'
  return container
}

// NECESSAIRE ?????
Tekitizy.prototype.sizeWidth = function () {
  var width = $(window).width() / 2
  $('.tekitizy-image_content').each(function() {
    $(this).width(width)
  })
}

// EVENTS
Tekitizy.prototype.listenToButtons = function () {
  this.responsiveWindow()
  this.listenToButtonOpen()
  this.listenToButtonClose()
  this.listenToButtonPlay()
  this.listenToButtonPause()
  this.listenToButtonNext()
  this.listenToButtonPrev()

}

Tekitizy.prototype.responsiveWindow = function () {
  var tek = this
  $(window).on('resize', function () {
    tek.sizeWidth()
  })
}

Tekitizy.prototype.listenToButtonOpen = function () {
  var tek = this
  $('.tekitizy-open-btn').on('click', function () {
    tek.actionShow($(this).attr('data-src'), $(this).attr('data-index'))
  })
}

Tekitizy.prototype.listenToButtonClose = function () {
  var tek = this
  $('.tekitizy-close-btn').on('click', function (){
    tek.actionClose()
    tek.actionPause()
  })
}

Tekitizy.prototype.listenToButtonPlay = function () {
  var tek = this
  $('.tekitizy-play-btn').on('click', function () {
    tek.actionPlay()
  })
}

Tekitizy.prototype.listenToButtonPause = function () {
  var tek = this
  $('.tekitizy-pause-btn').on('click', function () {
    tek.actionPause()
  })
}

Tekitizy.prototype.listenToButtonNext = function () {
  var tek = this
  $('.tekitizy-next-btn').on('click', function () {
    if (!$(this).hasClass('swipe')) {
      $(this).addClass('swipe')
      var $next = $(this)
      tek.actionNext()
      setTimeout(function () {
        $next.removeClass('swipe')
      }, 500) // inialement 400
    }
  })
}

Tekitizy.prototype.listenToButtonPrev = function () {
  var tek = this
  $('.tekitizy-prev-btn').on('click', function () {
    if (!$(this).hasClass('swipe')) {
      $(this).addClass('swipe')
      var $prev = $(this)
      tek.actionPrev()
      setTimeout(function () {
        $prev.removeClass('swipe')
      }, 500) // init 400
    }
  })
}

// ACTIONS

// affiche une image
Tekitizy.prototype.actionShow = function (src, i) {
  var tek = this
  this.nbImages = 0;
  $('.tekitizy-container').each(function($i) {
    var img = $(this).children('img').attr('src')
    var title = $(this).children('img').attr('alt')
    tek.createImage(img, title, i, $i)
    tek.nbImages++;
    }
  })
  this.caroussel.addClass('tekitizy-carroussel-open')
  this.sizeWidth()
}

Tekitizy.prototype.createImage = function (img, title, i, $i) {
  var image_container = '<figure class="tekitizy-image_container' // figure

  if (i === $i.toString()) { // si c'est l'image appuyée
      image_container += ' image-active '
  }
  image_container += '" data-index="' + $i + '">'
  image_container += '<img src="' + img + '" class="tekitizy-image_content" >'

  if (this.opts.title) {
    image_container += '<caption class="tekitizy-image_title">' + title + '</caption>'
  }
  image_container += '</figure>'
  console.log(image_container) // a retirer
  $('.tekitizy-container_list').append(image_container)
}

// Image + 1
// si a la fin, retour à la premiere
Tekitizy.prototype.actionNext = function () {
  this.carroussel.addClass('tekit')
}

// Image - 1
// si au début, retour à la derniere image`
Tekitizy.prototype.actionPrev = function () {

}

// Lance le diaporama
Tekitizy.prototype.actionPlay = function () {

}

// pause le diaporama
Tekitizy.prototype.actionPause = function () {

}

// suprime l'affichage du carroussel
Tekitizy.prototype.actionClose = function () {
  this.caroussel.removeClass('tekitizy-carroussel-open')
}
