$(document).ready(function () {
    // Mostrar animación de carga
    $("#loading-animation").show();

    $.ajax({
        url: 'https://raw.githubusercontent.com/yamarka/yamarka.github.io/master/header.html',
        dataType: 'html',
        success: function (data) {
            $('#header').html(data);
        },
        error: function () {
            console.log('Error al obtener el header');
        }
    });

    // Función para eliminar etiquetas HTML del contenido
    function stripHTMLTags(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    // Función para mostrar las últimas 3 noticias
    function mostrarUltimasNoticias() {
        $.getJSON('https://raw.githubusercontent.com/yamarka/yamarka.github.io/master/todaslasnoticias/todaslasnoticias.json', function (data) {
            var noticiasUnicas = {};
            var ultimasNoticias = [];
            for (var i = data.length - 1; i >= 0; i--) {
                var noticia = data[i];
                // Verificar si la noticia ya se agregó previamente
                if (!noticiasUnicas[noticia.titulo]) {
                    noticiasUnicas[noticia.titulo] = true;
                    ultimasNoticias.push(noticia);
                }
                if (ultimasNoticias.length >= 3) {
                    break;
                }
            }
            var cuerpoHTML = '<h2 class="titulo-noticias">Últimas Noticias:</h2>';
            for (var j = 0; j < ultimasNoticias.length; j++) {
                var noticia = ultimasNoticias[j];
                var previewContenido = stripHTMLTags(noticia.contenido).split(' ').slice(0, 50).join(' ');
                cuerpoHTML += `
                    <div class="noticia">
                        <a href="${noticia.enlace_noticia}" class="enlace-noticia">
                            <div class="imagen-noticia" style="background-image: url(${noticia.imagen});"></div>
                            <h3>${noticia.titulo}</h3>
                            <p>${previewContenido}...</p>
                            <span class="leer-mas">Leer más</span>
                        </a>
                    </div>
                `;
            }
            $('#cuerpo').html(cuerpoHTML);

            // Ocultar animación de carga y mostrar contenido principal
            $("#loading-animation").hide();
            $("#cuerpo").show();
        });
    }

    mostrarUltimasNoticias();

    // Obtener el footer
    $.ajax({
        url: 'https://raw.githubusercontent.com/yamarka/yamarka.github.io/master/footer.html',
        dataType: 'html',
        success: function (data) {
            $('#footer').html(data);
        },
        error: function () {
            console.log('Error al obtener el footer');
        }
    });
});
