
const region = "BR";
const language = "pt-BR";
const api_key = "3388b3e3f87c5b6b0d1be607cd4a04d8";
const api = 'https://api.themoviedb.org/3/search/movie/?api_key=';
const urlImg = "https://image.tmdb.org/t/p/original/" ;

const fazerLogin = () => {
    $('.divnone').css("display","flex");
    $('#login').hide();
};

const entrar =  () => {
    const userId = $('form').find('#user').val();
    localStorage.setItem("user", userId );
    
    $('.loginForm').remove();
};




const pesquisarFilme = (filmePesquisa) => {

     $('.cartazFront').remove();

        

         fetch(api + api_key + '&language=' + language + '&region=' + region + '&query=' + filmePesquisa )
         .then(function(response){
             response.json().then(function (data){

                let resultado = data.results;

                var [{overview,
                    poster_path,
                    release_date,
                    title 
                }] = resultado;

                

                const clonarPost = (el) => {
                    var elemento = el;
                    $("#amostra").append('<article class="cartazFront"><img class="front" src="' + urlImg + el.poster_path +'"/><h2 class="titleAll">'+ el.title +'</h2></article>');

                   }

                resultado.forEach(clonarPost);
                

                
                

            });
         })
         .cath(error => console.log(error));
    
     };
     
   

$(function () {

    $('.btnLogin').on('click', function(){
        $('.loginForm').addClass('loginFrame');
        setTimeout(function(){
            entrar();
        }, 1000);
        
        
    });

    $('.bi-brightness-high').on('click', function(){
        
    });
    


    $('#pesquisarTittle').on('click', function(){
        let filmePesquisa =  $('#title').val();
        pesquisarFilme(filmePesquisa);
        
    });

    $("#search").on('click', function (){
        $(this).remove();
        $("#pesquisa").css("display", "flex");

    });

    $('#login').on('click', function(){
        fazerLogin();
    });
   

});
