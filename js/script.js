function time(){
    start()

   //$(".logotransicao").animate({width: "30%"}, 1500, function(){
     //   $(".blocotransicao").fadeOut(700)
    //});

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
    if(hora < 10){
        hora="0"+hora;
    }
    if(minuto < 10){
        minuto="0"+minuto;
    }
    if(segundo < 10){
        segundo="0"+segundo;
    }

    document.getElementById('diadata').innerHTML = (dias + ", " + data);
    document.getElementById('hora').innerHTML = (hora+":"+minuto+":"+segundo);
     
    setTimeout('time()', 500);
}

//Função para procurar publicações dentro do body e iniciar animações e formatação de texto
function start(){
    $('body').find('.post').each(function(){
      var div = this;
    iniciarAnimation($(div));
    });

   /* $('body').find('.muralnoticias').each(function(){
        $('.titulonoticia').animate({left: '100%'}).hide()
    })*/

    $(document).ready(function(){
        $()
    })
}

//Enviando os parametros certos para a função replace_text
function iniciarAnimation(div){
    div.show();
    var img = "gatinho.jpg"
    //twitter
    div.find('.text').each(function(){
        replace_text(this,false);
    });

    //instagram
    div.find('.textopost').each(function(){
        replace_text(this,true);
    });
    //$('body').find('.image').hide()
    
    //.css({"background-image": "url(img/gatinho.jpg)"})
}

//Função para pegar conteúdo texto dos posts e enviar para as respectivas funções de formatação
function replace_text(div,instagram){
    var curInnerHTML = div.innerHTML;
    if(instagram){
        curInnerHTML = highlight_instagram(curInnerHTML)
    }else{
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