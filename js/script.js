function time() {

    const d = new Date();

    //Dia da semana por extenso em portugues
    var dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    dias = dias[d.getDay() % 7];

    //Data em formato brasileiro
    data = d.toLocaleDateString();

    //Horas, minutos e segundos
    hora = d.getHours();
    minuto = d.getMinutes();
    segundo = d.getSeconds();

    //Formatação de horas, segundos e minutos para atribuir 0 a esquerda de cada um caso menores que 10
    if (hora < 10) {
        hora = "0" + hora;
    }
    if (minuto < 10) {
        minuto = "0" + minuto;
    }
    if (segundo < 10) {
        segundo = "0" + segundo;
    }

    document.getElementById('diadata').innerHTML = (dias + ", " + data);
    document.getElementById('hora').innerHTML = (hora + ":" + minuto + ":" + segundo);

    setTimeout('time()', 500);
}

//Função para procurar publicações dentro do body e iniciar animações e formatação de texto
function iniciar() {
    let usuarioTwitter = [{
        "Nome": "Livia Émille",
        "User": "@liviaemille",
        "URLfoto" : "img/aslam.jpg",
        "posts" : ["@livinhadograu  dlakjskdlajdf sdlkaj s", "ldkjaklsdjaljd alksdjlaksjd açlsdaçskdjaç sldkjaçsdlka", "#Lorem Ipsum is simply dummy text of the printing and typesetting industry."]
    },
    {
        "Nome": "Mario Soares",
        "User": "@mariosoares",
        "URLfoto" : "img/gatinho.jpg",
        "posts" : ["Lorehgjm Ipsum has been", "the industry's standard dummy",  "text ever since the 1500s"]
    }, 
    {
        "Nome": "Maria Antônia",
        "User": "@mariaantonia",
        "URLfoto": "img/curtida.png",
        "posts" : ["when an unknown printer took", "a galley of type and scrambled", "it to make a type specimen book."]
    }];

    let usuarioInstagram = [{
        "User": "@liviaemille",
        "URLfoto" : "img/gatinho.jpg",
        "textopub" : "@maria #hashtag ipsum dolor sit amet, consectetur adipiscing elit. Fusce faucibus turpis id massa ultricies fringilla. Cras massa dolor, tempus nec ullamcorper at, consequat sed odio. Vivamus vel purus luctus, sollicitudin mi ac, luctus justo."
    },
    {
        "User" : "@mariosoares", 
        "URLfoto" : "img/qrcodeteste.png",
        "textopub": "Mauris consequat molestie leo id efficitur. Cras fermentum, quam ac fermentum gravida, tortor elit tempus sem, nec gravida risus lacus non arcu. Nullam pellentesque, nisi eget laoreet scelerisque, lorem nulla suscipit eros, quis aliquam leo nisi a eros."
        
    },
    {
        "User":"@toinhabigshoes",
        "URLfoto": "img/paisagem.jpg",
        "textopub" : "Cras massa dolor, tempus nec ullamcorper at, consequat sed odio. Vivamus vel purus luctus, sollicitudin mi ac, luctus justo. Mauris consequat molestie leo id efficitur. Cras fermentum, quam ac fermentum gravida, tortor elit tempus sem, nec gravida risus lacus non arcu."
    }];

    let noticiasRSS = [{
        "Titulo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Conteudo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Background": "img/paisagem.jpg"
    },
    {
        "Titulo" : "Morbi ullamcorper leo mi, non vulputate ipsum volutpat et.",
        "Conteudo" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Background" : "img/paisagem2.jpg"
    }
];
    $('body').find('.conteiner').each(function () {
        let div = this;
        let indiceins = Math.floor(Math.random() * usuarioInstagram.length);
        let indicetwi = Math.floor(Math.random() * usuarioTwitter.length);
        iniciarAnimation($(div), usuarioTwitter, indicetwi, usuarioInstagram, indiceins);
    });

    setTimeout('iniciar()', 2000);
}


//Enviando os parametros certos para a função replace_text
function iniciarAnimation(div, objt, indicet, obji, indicei) {
    div.show();
    // Trata postagens do twitter
    div.find(".muraltwitter").each(function(){
        $("#username").html(objt[indicet]["User"])
        $("#nome_do_usuario").html(objt[indicet]["Nome"])
        $("#twittexto").html(objt[indicet]["posts"][Math.floor(Math.random() * objt[indicet]["posts"].length)]);
        $('#fotoperfil').css("background-image", "url("+objt[indicet]['URLfoto']+")");

        div.find('#twittexto').each(function(){
        replace_text(this, false);
        })
    })

    // Trata postagens do instagram

    div.find(".mural").each(function(){
        $(".publicacao").css("background-image", "url("+obji[indicei]['URLfoto']+")");
        $('#user').html(obji[indicei]["User"]);
        $('#instatexto').html(obji[indicei]["textopub"]);
        
        div.find('#instatexto').each(function () {
        replace_text(this, true);
        });
    })
    

    // Transições RSS
    div.find('.titulonoticia').each(function(){
        $(this).animate(
            {left: '300pxu'},
            "slow"
        )
    })

}

//Função para pegar conteúdo texto dos posts e enviar para as respectivas funções de formatação
function replace_text(div, instagram) {
    var curInnerHTML = div.innerHTML;

    if (instagram) {
        curInnerHTML = highlight_instagram(curInnerHTML)
    } else {
        curInnerHTML = highlight(curInnerHTML)
    }
    div.innerHTML = curInnerHTML;
}

//Formatação de texto post twitter
function highlight(words) {
    words = words.replace(/(^|\s)(@[^\w\d\s]*\w+)/gi, "$1<span class='mention'>$2</span>");
    words = words.replace(/(^|\s)(#[a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ_-]*)/gi, "$1<span class='hashtag'>$2</span>");
    words = words.replace(/(^|\s)(https?:\/\/[^\s,;!$%@*]+)/gi, "$1<span class='url'>$2</span>");

    return words;
}

//Formatação de texto post instagram
function highlight_instagram(words) {
    words = words.replace(/(^|\s)(@[^\w\d\s]*\w+)/gi, "$1<span class='mention_instagram'>$2</span>");
    words = words.replace(/(^|\s)(#[a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ_-]*)/gi, "$1<span class='hashtag_instagram'>$2</span>");
    words = words.replace(/(^|\s)(https?:\/\/[^\s,;!$%@*]+)/gi, "$1<span class='url'>$2</span>");

    return words;
}