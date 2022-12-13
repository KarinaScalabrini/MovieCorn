
const region = "BR";
const language = "pt-BR";
const api_key = "3388b3e3f87c5b6b0d1be607cd4a04d8";
const api = 'https://api.themoviedb.org/3/search/movie/?api_key=';
const urlImg = "https://image.tmdb.org/t/p/original/" ;
const listPopular = "https://api.themoviedb.org/3/movie/popular?";
const emBreve = "https://api.themoviedb.org/3/movie/upcoming?";



// modal de login
const fazerLogin = () => {
    $('.divnone').css("display","flex");
    $('#login').hide();
};
// função de entrar no formulário
const entrar =  () => {
    const userId = $('form').find('#user').val();
    localStorage.setItem("user", userId );
    
    $('.loginForm').remove();
};

const viewMovie = (data, section) => {
    
    let populateSection = section;
    let resultado = data.results;

    var [{overview,
        poster_path,
        release_date,
        title 
    }] = resultado;

    if(populateSection == ".section1"){
        $(resultado).each(function(el, film){  
   
            $('body').find('.section1').append('<article class="cartazFront"><img class="front" src="' + urlImg + film.poster_path +'"><h2 class="titleAll">'+ film.title +'</h2><h5 class="date">'+ film.release_date +'</h5></article>');   
          })
    }if (populateSection == ".section2"){
        $(resultado).each(function(el, film){  
   
            $('body').find('.section2').append('<article class="cartazFront"><img class="front" src="' + urlImg + film.poster_path +'"><h2 class="titleAll">'+ film.title +'</h2><h5 class="date">'+ film.release_date +'</h5></article>');   
          })
    }

    const populate = (section, resultado) => {
        debugger
        
    }

}

 async function listar(url, section) { 

    let response = await fetch(url + "api_key=" + api_key + "&language=" + language + "-" + region + "&page=1")
    let result = await response.json();

    switch (section){
        case "emBreve" :
            viewMovie(result , ".section2");
            break;
        case "listPopular" :
            viewMovie(result , ".section1");    
            break;
    }          
}
     

// pesquisar filme por nome
// função pesquisa o filme por nome e retorna o array com ids e atributos. 

const pesquisarFilme = (filmePesquisa) => {

     $('.cartazFront').remove();
         fetch(api + api_key + '&language=' + language + '&region=' + region + '&query=' + filmePesquisa )
         .then(function(response){
             response.json().then(function (data){

                viewMovie();
                let resultado = data.results;

                var [{overview,
                    poster_path,
                    release_date,
                    title 
                }] = resultado;
                    console.log('resultado');
                

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

    listar(emBreve, "emBreve");
    listar(listPopular, "listPopular");

    $('.btnLogin').on('click', function(){
        $('.loginForm').addClass('loginFrame');
        setTimeout(function(){
            entrar();
        }, 1000);  
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
