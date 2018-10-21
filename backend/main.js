//Agregar elementos tipo y ciudad cuando se carge la pagina.
window.addEventListener('load', function(){
  //busca listado de ciudades.
  let data = new FormData();
  data.append('opcion', '3');
  let url = '../buscador/backend/buscador.php' ;
  fetch(url, {
    method: 'post',
    body: data
    })
  .then(resultado => resultado.json())
  .then(resultado => {
    for(var i in resultado){
    let option = document.createElement('option');
    let text = document.createTextNode(resultado[i]);
    option.appendChild(text);
    document.getElementById('selectCiudad').appendChild(option);
    }
  })
  .catch(error =>{
    alert('Se produjo un error al consultar los datos.');
  });

//busca listado de tipos de propiedades
  data = new FormData();
  data.append('opcion', '4');
  fetch(url, {
    method: 'post',
    body: data
    })
  .then(resultado => resultado.json())
  .then(resultado => {
    for(var i in resultado){
    let option = document.createElement('option');
    let text = document.createTextNode(resultado[i]);
    option.appendChild(text);
    document.getElementById('selectTipo').appendChild(option);
    }
  })
  .catch(error =>{
    alert('Se produjo un error al consultar los datos.');
  });

  let ciudad = document.getElementById('selectCiudad');
  ciudad.style.display = "block";
  let tipo = document.getElementById('selectTipo');
  tipo.style.display = "block";
});

document.getElementById('mostrarTodos').addEventListener('click', buscarTodos);
//Funcion que busca todos las propiedades.
function buscarTodos()
{
  let data = new FormData();
  data.append('opcion', '1')
  let url = '../buscador/backend/buscador.php' ;
  fetch(url, {
    method: 'post',
    body: data
  })
  .then(resultado => resultado.json())
  .then(resultado => {
    mostrarCards(resultado);
  })
  .catch(error =>{
    alert('Se produjo un error al consultar los datos.');
  });
}

//Funcion que busca las propiedades de acuerdo a los filtros seleccionados.
let formulario = document.getElementById('formulario');

formulario.addEventListener('submit',function (e){
  e.preventDefault();
  let data = new FormData(document.getElementById('formulario'));
  data.append('opcion', '2');

  let url = '../buscador/backend/buscador.php' ;
  fetch(url, {
    method: 'post',
    body: data
  })
  .then(resultado => resultado.json())
  .then(resultado => {
    mostrarCards(resultado);
   })
   .catch(error =>{
     alert('Se produjo un error al consultar los datos.');
   });
 }
);

//Funcion para generar las cards que contienen la informacion de las propiedades.
function mostrarCards(resultado){
  let cards = '';
    for(var i in resultado){
      cards = cards + '<div class="row card"><div class="col s12 m12 l5" style="padding:0px;"><div class="card-image"><img src="img/home.jpg"></div></div> <div class="col s12 m12 l7"><div class="row"><div class="card-stacked col l12"><div class="card-content" style="padding:15px;">';
      cards = cards + "<p>ID: " + resultado[i].Id + "</p>";
      cards = cards + "<p>Direccion: " + resultado[i].Direccion + "</p>";
      cards = cards + "<p>Ciudad: " + resultado[i].Ciudad + "</p>";
      cards = cards + "<p>Codigo_Postal: " + resultado[i].Codigo_Postal + "</p>";
      cards = cards + "<p>Tipo: " + resultado[i].Tipo + "</p>";
      cards = cards + '<p>Precio: <span class="orange-text">' + resultado[i].Precio + "</span></p>";
      cards = cards + '</div></div>';
      cards = cards + '<div class="card-action col l12" style="padding: 10px 0px 0px 0px;"><a href="#" class="blue-text">Mas informacion</a></div>';
      cards = cards + '</div></div></div>';
    }
 document.getElementById('res').innerHTML =  cards;
}
