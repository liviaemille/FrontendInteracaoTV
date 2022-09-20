function time(){
    const d = new Date();     

    var dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    dias = dias[d.getDay() % 7];
    data = d.toLocaleDateString();
    hora = d.getHours();
    minuto = d.getMinutes();
    segundo = d.getSeconds();

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


$(document).ready(function(){
    var urlimagerss = "img/logoif.png";
    $("#logotransicao").animate({width: "30%"}, 1500, function(){
        $("#blocotransicao").fadeOut(700)
    });
    $("#baackgoundrss").css('background-image', 'url(' + urlimagerss +')').promise().done(function(){
        $(this).animate({
            opacity: 1
        }, 600)
    });
});



    /*var bloco = $("#blocotransicao");
    bloco.fadeOut(3000);
        {top: "100%"}, 2500, function(){
        $(this).hide()
        }
    );*/


/*function replace_text(div,instagram){
    var curInnerHTML = div.innerHTML;
    if(instagram){
        curInnerHTML = highlight_instagram(curInnerHTML)
    }else{
      curInnerHTML = highlight(curInnerHTML)
    }
    div.innerHTML = curInnerHTML;
}
function highlight(words) {
    words = words.replace(/(^|\s)(@[^\w\d\s]*\w+)/gi, "$1<span class='mention'>$2</span>");
    words = words.replace(/(^|\s)(#[a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ_-]*)/gi, "$1<span class='hashtag'>$2</span>");
    words = words.replace(/(^|\s)(https?:\/\/[^\s,;!$%@*]+)/gi, "$1<span class='url'>$2</span>");

    return words;
}

function highlight_instagram(words) {
    words = words.replace(/(^|\s)(@[^\w\d\s]*\w+)/gi, "$1<span class='mention_instagram'>$2</span>");
    words = words.replace(/(^|\s)(#[a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ_-]*)/gi, "$1<span class='hashtag_instagram'>$2</span>");
    words = words.replace(/(^|\s)(https?:\/\/[^\s,;!$%@*]+)/gi, "$1<span class='url'>$2</span>");

    return words;
}*/
