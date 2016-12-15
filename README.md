TEKITIZY OR THE BEST CAROUSEL LIBRARY EVER

- The project


  The tekitizy project is a js library which implements a wonderfull
  Carousel in an html page. Put the selector with images you want to
  have in the carousel and it add a zoom button on every images selected.
  When you click on the zoom button you have the image clicked whcih appears
  and you can next/prev/pause/play the differents images.



- Authors


  The autors of this fabholous library are Kevin Loiseleur & Alexandre Simonin
  (2 ECV developpers)



- Features


  You have many features you can select with the options in parameters :

  * prev/next buttons display or not,

  * the autoPlay, to launch the images with regular
  intervals automaticly

  * image duration, to set the time between each image in
  autoPlay mode

  * the effects if you want the translation between images basic or with a little animation

  * thumbnails, in developpemnt

  * and the title, if you want to add or not a legent under the photos



- How to use it

  To use it, nothing more simple:
  1. Add in the html page the path to the tekitizy.js and the tekitizy.css files
  2. Add jquery to your file to give it to tekitizy
  3. You need to declare only one function, tekitizy.setup with 3 parameters:
    * JQUERY variable in first parameter
    * Html Selector of the images you want
    * the differents settings for the carousel

    Exemple :

    <script>
    Tekitizy.setup(jQuery, '.post img',{
      prevNext: false,
      play: false,
      autoPlay: false,
      imageDuration: 2,
      effect: true,
      title: false
      })
    </script>


- License

The MIT License (MIT)
Copyright (c) <2016> <copyright Kevin Loiseleur & Alexandre Simonin>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
