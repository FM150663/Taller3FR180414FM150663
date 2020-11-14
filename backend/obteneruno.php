<?php
include('cors.php');
include('conexion.php');
$array=array();
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

$modelo = new Conexion();
 $db = $modelo->getConexion();

 $sql = "SELECT id, nombres, apellidos FROM estudiantes WHERE id='$id'";
 $query = $db->prepare($sql);
 $query->execute();
   
  while($fila = $query->fetch()) {
    $array[] = array(
      "id" => $fila['id'],
      "nombres" => $fila['nombres'],
      "apellidos" => $fila['apellidos'] ); }//fin del ciclo while 

  $json = json_encode($array);

  echo $json;


  ?>

