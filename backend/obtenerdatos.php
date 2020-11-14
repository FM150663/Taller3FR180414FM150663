<?php 
include('cors.php');
include('conexion.php');
 $array=array();
 $modelo = new Conexion();
 $db = $modelo->getConexion();
 $sql = 'SELECT id, nombres, apellidos FROM estudiantes ORDER BY nombres';
 $query = $db->prepare($sql);
 $query->execute();
   
  while($fila = $query->fetch()) {
    $array[] = array(
      "id" => $fila['id'],
      "nombres" => $fila['nombres'],
      "apellidos" => $fila['apellidos']); }//fin del ciclo while 

  $json = json_encode($array);

  echo $json;
?>