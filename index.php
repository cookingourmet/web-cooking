<?php

echo " ";

?><!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="main.css">
    <link rel="stylesheet" href="https://stackpath.boostrapcdn.com/font.awesome/4.7.0/css/font-awesome.min.css">

    <title>| Cooking Gourmet |</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  </head>
  <body>

 <head>
                <div class="navbar">

                  <div class="logo">
                 <img src="./icono/logo2.png" alt=""> 
                </div>

                  <ul class="links">
                    <li><a href="inicio">Inicio</a></li>
                    <li><a href="carreras">Carreras</a></li>
                    <li><a href="eventos">Eventos</a></li>
                    <li><a href="contactos">Contactos</a></li>
                  </ul>
                  <a href="https://cookingourmet.q10.com/" class="action_btn">Aula Virtual</a>
                  <div class="toggle_btn">
                  <i class="fa-solid fa-bars" style="color: #e1195f;"></i> 
                  </div>
                  </div>

                  <div class="dropdown_menu">
                    <li><a href="inicio">Inicio</a></li>
                    <li><a href="carreras">Carreras</a></li>
                    <li><a href="eventos">Eventos</a></li>
                    <li><a href="contactos">Contactos</a></li>
                    <li><a href="https://cookingourmet.q10.com/" class="action_btn">Aula Virtual</a></li>
                  </div>

</head>
            <script>
              const toggleBtn = document.querySelector('.toggle_btn')
              const toggleBtnIcon = document.querySelector('.toggle_btn i')
              const dropDownMenu = document.querySelector('.dropdown_menu')

              toggleBtn.onclick = function () {
                dropDownMenu.classList.toggle('open')

                const isOpen = dropDownMenu.classList.contains('open')

                toggleBtnIcon.classList = isOpen
                ?'fa-solid fa-xmark'
                :'fa-solid fa-bars'
              }

            </script>






  
<script src="main.js"></script>

<!-- Slider -->

<div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>

  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="3000">
      <img src="./img/slider1.png" class="d-block w-100" alt="slider1">
      <div class="carousel-caption d-none d-md-block">
        <h5 class="fw-bold">PASTELERÍA Y PANADERÍA</h5>
        <p>Incribete Ahora.</p>
      </div>
    </div>

    <div class="carousel-item" data-bs-interval="3000">
      <img src="./img/slider2.png" class="d-block w-100" alt="slider2">
      <div class="carousel-caption d-none d-md-block">
        <h5 class="fw-bold">BAR PROFESIONAL & WORKINF FLAIR</h5>
        <p>Incribete Ahora.</p>
      </div>
    </div>
 
    <div class="carousel-item" data-bs-interval="3000">
      <img src="./img/slider3.png" class="d-block w-100" alt="slider3">
      <div class="carousel-caption d-none d-md-block">
        <h5 class="fw-bold">GASTRONOMIA Y ARTE CULINARIO</h5>
        <p>Incribete Ahora.</p>
      </div>
    </div>

    <div class="carousel-item" data-bs-interval="3000">
      <img src="./img/slider4.png" class="d-block w-100" alt="slider3">
      <div class="carousel-caption d-none d-md-block">
        <h5 class="fw-bold">GESTION Y ATENCION A CLIENTES</h5>
        <p>Incribete Ahora.</p>
      </div>
    </div>

  </div>

  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
<br>

<hr size="4px" color="black" />
<!-- INTRO -->
<br>
            </br>
<section id="about" class="about section-padding">
      <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-12 col-12">
                  <div class="about-img">
                    <img src="./img/local.png" alt="" class="img-fluid">
                  </div>
                </div>
                <div class="col-lg-8 col-md-12 col-12 ps-lg-5 mt-md-5">
                  <div class="about-text"></div>
                    <h2>Escuela Superior de Alta Cocina <br>Cooking Gorumet</h2>
                    <p >
                     Cooking Gourmet. Abre sus puertas a la población huancaína un 3 de
                    noviembre del 2008, con la carrera de Gastronomía y Arte Culinario  , siendo un proyecto
                    de dos jóvenes emprendedores, Adrian Ortiz Salhua y Mayra Camila Aguilar Ureta. ...!
                    </p>
                    <a href="#" class="btn btn-danger">Leer más</a>
                </div>
            </div>
      </div>
</section>
<!-- servicios -->
<br></br>
<br>
<br>

<section id="portafolio" class="portafolio section-paddiong">
          <div class="container">
            <div class="row"> 
              <div class="col-md-12">
                <div class="section-header text-center pb-5">
                  <h2 class="text-danger">Carreras</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam ab quae animi eos? 
                      Harum libero earum amet eius eveniet a ullam quibusdam veritatis dolore? Magni sit
                       illum molestias sed rem.</p>
                </div>
              </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 col-lg-4">
                    <div class="card text-center bg-white pb2">
                        <div class="card-body text-dark">
                        <div class="img-area mb-4">
                          <img src="./img/gast.png" alt="" class="img-fluid">
                        </div>
                        <div class="card-title text-danger fs-4">Gastronomia y Arte Culinario</div>
                        <p class="lead">Somos una de las escuelas de cocina más prestigioa de la toda la región junín, siendo pioneros 
                          en formas líderes profesionales en la carrera de Gastronomia y Arte Culinario. Nuestros exigentes y métodos de enseñanza ofrecen a los estudiantes un amplio
                          conocimiento en sus respectivas áreas de trabajo.
                        </p>
                        <button class="btn bg-danger text-light">Leer Mas</button>
                        </div>
                    </div>
                </div>

                
                <div class="col-12 col-md-12 col-lg-4">
                    <div class="card text-center bg-white pb2">
                        <div class="card-body text-dark">
                        <div class="img-area mb-4">
                          <img src="./img/past.png" alt="" class="img-fluid">
                        </div>
                        <div class="card-title text-danger fs-4">Panadería y Pastelería</div>
                        <p class="lead ">la carrera de pastelería y panaderia de Cooking Gourmette guiará paso a paso desde las técnicas 
                          hasta las más modernas con equipos de alta tecnología, donde desarrollamos tus habilidades y competencias no en uno sino en dos programas de pastelería y panadería,
                          logrando desarrollar en ti un perfil profesional.
                        </p>
                        <button class="btn bg-danger text-light ">Leer Mas</button>
                        </div>
                    </div>
                </div>

                
                <div class="col-12 col-md-12 col-lg-4">
                    <div class="card text-center bg-white pb2">
                        <div class="card-body text-dark">
                        <div class="img-area mb-4">
                          <img src="./img/bar.png" alt="" class="img-fluid">
                        </div>
                        <div class="card-title text-danger fs-4">Bar Profesional & Working Flair</div>
                        <p class="lead">La carrera de Bar Profesiona & Working Flair, es una especializacion en la coctelería clasica, nacional e internacional, donde los estudiantes aplicaran 
                          las enseñanza y habilidades conseguidar dentro de proceso academico y poder aplicarlos en el campo laborar del Bar Profesional y Working Flair.
                        </p>
                        <button class="btn bg-danger text-light">Leer Mas</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>    
</section>

<br>

<br>

<!-- servicios 

<section class="container-fluid">
  <div class="row w-75 mx-auto my-5 servicio-fila">
    <div class="col-lg-6 col-md-12 col-sm-12 d-flex  my-5 icono-wrap ">
      <img src="./icono/gast.png" alt="desarrollo" width="180" height=160>  
      <div>
        <h3 class="fs-5 mt-4 px-4 pb-1 text-danger">Gastronomía y Arte Culinario</h3>
          <p class="px-4">Impulsa tu carrera con los mejores de la región</p>       
      </div>
    </div>

    <div class="col-lg-6 col-md-12 col-sm-12 d-flex my-5 icono-wrap t">
      <img src="./icono/past.png" alt="desarrollo" width="180" height=160>  
      <div>
        <h3 class="fs-5 mt-4 px-4 pb-1 text-danger">Pastelería y Panadería</h3>
          <p class=" px-4 ">Impulsa tu carrera con los mejores de la región</p>       
      </div>
    </div>
  </div>

  <div class="row w-75 mx-auto my-5 servicio-fila">
    <div class="col-lg-6 col-md-12 col-sm-12 d-flex my-5 icono-wrap ">
      <img src="./icono/bar.png" alt="desarrollo" width="180" height=160>  
      <div>
        <h3 class="fs-5 mt-4 px-4 pb-1 text-danger">Bar Profesional & Working Flair</h3>
          <p class="px-4">Impulsa tu carrera con los mejores de la región</p>       
      </div>
    </div>

    <div class="col-lg-6 col-md-12 col-sm-12 d-flex my-5 icono-wrap ">
      <img src="./icono/ate.png" alt="desarrollo" width="180" height=160>  
      <div>
        <h3 class="fs-5 mt-4 px-4 pb-1 text-danger">Gestion y Atencion al Cliente</h3>
          <p class="px-4">Impulsa tu carrera con los mejores de la región</p>       
      </div>
    </div>
  </div>
</section>

 cards -->






<!-- Acerca de Nosotros -->

<section>
  <div class="w-75 m-auto text-center"  id="equipo">
     <h1 class="mb-5 fs=2 ">Acerca de: <span class="text-danger">Nosotros</span></h1>

     <p><span class= "text-danger">Visión:</span> Ser el primer Instituto gastronómico
     de la región, orientado a la formación y capacitación de jóvenes con visión
     empresarial, rumbo al bicentenario.</p>

    <br>

     <p><span class= "text-danger">Misión:</span> Somos una institución educativa con
     innovación académica y tecnológica de primer nivel, orientados a la formación de
     jóvenes con identidad, revaloración y pasión por el arte culinario.</p>
  </div>

  <div class="mt-5 text-center">
    <img src="./img/equipo.jpg" class="img-fluid" alt="equipo">
  </div>
 
</section>
 <br>
 <br>
<!--Google map
 <section>  
  <div class="w-75 m-auto text-center"  id="equipo">
  <h1 class="mb-5 fs=2">Sede <span class="text-danger">Central</span></h1>
  </div>
  <div class="mt-5 text-center">
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.693287030844!2d-75.20950212404284!3d-12.064611642235134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e964be1e84681%3A0x4a3bf669d7ec9778!2sCooking%20Gourmet!5e0!3m2!1ses-419!2spe!4v1683221404341!5m2!1ses-419!2spe"
    width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
</h1>
 </section>
-->

 <!--Footer-->
<footer>
  <div class="footer-content">
      <img src="./icono/logo.png" alt="">
      <br>
      <h6>Contacto: +051 916 418 843 | Direccion: Av. Ferrocarril # 587 - Huancayo</h6>
      <h6>Email: instituto.cookingourmet@gmail.com</h6>
      <ul class="socials">
        <li><a href="https://www.facebook.com/Cooking.Gourmet"><i class="fa-brands fa-facebook" style="color: #ffffff;"></i></a></li>
        <li><a href="https://www.instagram.com/cooking_gourmet/"><i class="fa-brands fa-instagram" style="color: #ffffff;"></i></a></li>
        <li><a href="https://www.tiktok.com/@cookingourmet?_t=8cBGOhLGxuP&_r=1"><i class="fa-brands fa-tiktok" style="color: #ffffff;"></i></a></li>
        <li><a href="https://api.whatsapp.com/send/?phone=51981377382&text=Hola%2C+quiero+informaci%C3%B3n+sobre+la+carrera+de&type=phone_number&app_absent=0"><i class="fa-brands fa-whatsapp" style="color: #ffffff;"></i></a></li>
      </ul>
  </div>
    <div class="footer-botton">
      <p>copyright &copy;2023 Cooking Gourmet. Designed by <span>cookingourmet</span></p>
    </div>
</footer>


    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <!-- Option 2: Separate Popper and Bootstrap JS -->
    <!--
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
    -->
  </body>
</html>