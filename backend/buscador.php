<?php
try {
header('Content-Type: application/json');

$opcion = $_POST["opcion"];

if ($opcion == 1){//opcion 1 se buscara todos los items
  mostrarTodos();
}else if ($opcion == 2){//opcion 2 es para determinar que la busqueda sera con filtro
  $precio = $_POST["precio"];
  $precioini = explode(";", $precio)[0];
  $preciofin = explode(";", $precio)[1];
  $tipo = $_POST["tipo"];
  $ciudad = $_POST["ciudad"];

  mostarFiltros($precioini, $preciofin, $tipo, $ciudad);
}else if ($opcion == 3){//opcion 3 es para buscar las ciudades
  buscarCiudades();
}else if ($opcion == 4){//opcion 4 es para buscar los tipos de propiedades.
  buscarTipos();
}
} catch (Exception $ex) {
   $data =  $ex->getMessage();
   echo  $data;
}

function mostrarTodos(){
  $data = file_get_contents("../data-1.json");
  echo $data;
}

function mostarFiltros($precioini, $preciofin, $tipo, $ciudad){
try {

  $data = file_get_contents("../data-1.json");
  $datos = json_decode($data, true);

  $resultado = array_filter($datos, function($dat) use ($precioini, $preciofin, $tipo, $ciudad)
  {
    $p = str_replace('$', '', $dat["Precio"]);
    $p = str_replace(',', '',$p);

    $p = floatval($p);
    if ($tipo <> "" && $ciudad <> ""){
      return $p >= $precioini && $p <= $preciofin && $dat["Tipo"] == $tipo  && $dat["Ciudad"] == $ciudad;
    }else if ($tipo <> ""){
      return $p >= $precioini && $p <= $preciofin && $dat["Tipo"] == $tipo;
    }else if ($ciudad <> ""){
        return $p >= $precioini && $p <= $preciofin && $dat["Ciudad"] == $ciudad;
    }else{
      return $p >= $precioini && $p <= $preciofin;
    }
  });

  echo json_encode($resultado);
} catch (Exception $ex) {
   echo  $ex->getMessage();
}

}

function buscarCiudades(){
  $data = file_get_contents("../data-1.json");
  $datos = json_decode($data, true);
  $ciudad = array();
  foreach ($datos as $resul){
    if (!in_array($resul['Ciudad'], $ciudad))
      {
        $ciudad[] = $resul['Ciudad'];
      }
    }
  echo json_encode($ciudad);
}

function buscarTipos(){
  $data = file_get_contents("../data-1.json");
  $datos = json_decode($data, true);
  $tipos = array();
  foreach ($datos as $resul){
    if (!in_array($resul['Tipo'], $tipos))
      {
        $tipos[] = $resul['Tipo'];
      }
    }
  echo json_encode($tipos);
}
