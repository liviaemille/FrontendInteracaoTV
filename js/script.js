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
    }
    ];
    let usuarioInstagram = ["@liviaemille", "@mariosoares", "@toinhabigshoes"];
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
        let indice = Math.floor(Math.random() * usuarioTwitter.length);
        iniciarAnimation($(div), usuarioTwitter, indice);
    });

    setTimeout('iniciar()', 2000);
}


//Enviando os parametros certos para a função replace_text
function iniciarAnimation(div, obj, indice) {
    div.show();
    // Trata postagens do twitter
    $("#username").html(obj[indice]["User"])
    $("#nome_do_usuario").html(obj[indice]["Nome"])
    $("#twittexto").html(obj[indice]["posts"][Math.floor(Math.random() * obj[indice]["posts"].length)]);


    // Trata postagens do instagram
    current = obj.indexOf($("#instatexto").text()) + 1
    if (current === -1) {
        current = 0
    }
    div.find('.textopost').each(function () {
        replace_text(this, true);
    });

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