(function($) {

    "use strict";

    var searchPopup = function() {
      // open search box
      $('#header-nav').on('click', '.search-button', function(e) {
        $('.search-popup').toggleClass('is-visible');
      });

      $('#header-nav').on('click', '.btn-close-search', function(e) {
        $('.search-popup').toggleClass('is-visible');
      });
      
      $(".search-popup-trigger").on("click", function(b) {
          b.preventDefault();
          $(".search-popup").addClass("is-visible"),
          setTimeout(function() {
              $(".search-popup").find("#search-popup").focus()
          }, 350)
      }),
      $(".search-popup").on("click", function(b) {
          ($(b.target).is(".search-popup-close") || $(b.target).is(".search-popup-close svg") || $(b.target).is(".search-popup-close path") || $(b.target).is(".search-popup")) && (b.preventDefault(),
          $(this).removeClass("is-visible"))
      }),
      $(document).keyup(function(b) {
          "27" === b.which && $(".search-popup").removeClass("is-visible")
      })
    }

    var initProductQty = function(){

      $('.product-qty').each(function(){

        var $el_product = $(this);
        var quantity = 0;

        $el_product.find('.quantity-right-plus').click(function(e){
            e.preventDefault();
            var quantity = parseInt($el_product.find('#quantity').val());
            $el_product.find('#quantity').val(quantity + 1);
        });

        $el_product.find('.quantity-left-minus').click(function(e){
            e.preventDefault();
            var quantity = parseInt($el_product.find('#quantity').val());
            if(quantity>0){
              $el_product.find('#quantity').val(quantity - 1);
            }
        });

      });

    }

    $(document).ready(function() {

      searchPopup();
      initProductQty();

      var swiper = new Swiper(".main-swiper", {
        speed: 500,
        navigation: {
          nextEl: ".swiper-arrow-prev",
          prevEl: ".swiper-arrow-next",
        },
      });         

      var swiper = new Swiper(".product-swiper", {
        slidesPerView: 4,
        spaceBetween: 10,
        pagination: {
          el: "#mobile-products .swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          980: {
            slidesPerView: 4,
            spaceBetween: 20,
          }
        },
      });      

      var swiper = new Swiper(".product-watch-swiper", {
        slidesPerView: 4,
        spaceBetween: 10,
        pagination: {
          el: "#smart-watches .swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          980: {
            slidesPerView: 4,
            spaceBetween: 20,
          }
        },
      }); 

      var swiper = new Swiper(".testimonial-swiper", {
        loop: true,
        navigation: {
          nextEl: ".swiper-arrow-prev",
          prevEl: ".swiper-arrow-next",
        },
      }); 

    }); 

})(jQuery);



document.addEventListener('DOMContentLoaded', () => {
  async function obtenerDatos() {
      const url = 'https://proyecto-c96df-default-rtdb.firebaseio.com/clave.json'; // Reemplaza con la URL real de la API o recurso
      try {
          const respuesta = await fetch(url);
          if (!respuesta.ok) {
              console.error("Error:", respuesta.status);
              return;
          }
          const datos = await respuesta.json();
          console.log(datos); // Procesar o mostrar los datos obtenidos
          actualizarTabla(datos);
      } catch (error) {
          console.error("Error al obtener los datos:", error);
      }
  }

  function actualizarTabla(datos) {
      const conteos = {};

      // Contar las razones
      for (const clave in datos) {
          const reason = datos[clave].reason;
          if (conteos[reason]) {
              conteos[reason]++;
          } else {
              conteos[reason] = 1;
          }
      }

      const tableBody = document.getElementById('tablebody');

      // Limpiar el contenido previo del tbody
      tableBody.innerHTML = '';

      // Agregar las filas a la tabla
      for (const reason in conteos) {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${reason}</td>
              <td>${conteos[reason]}</td>
          `;
          tableBody.appendChild(row);
      }
  }

  obtenerDatos();
});


