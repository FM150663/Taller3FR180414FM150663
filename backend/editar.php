<?php

include('cors.php');
include('conexion.php');

$data = json_decode(file_get_contents("php://input"), true);
 $id = $data['id']; 
 $nombres = $data['nombres'];
 $apellidos = $data['apellidos'];
 $modelo = new Conexion();
 $db = $modelo->getConexion();

$sql = "UPDATE estudiantes SET nombres='$nombres', apellidos='$apellidos' WHERE id=$id";

      $query = $db->prepare($sql);
      $query->execute();
      echo "actualizado";

  ?>

