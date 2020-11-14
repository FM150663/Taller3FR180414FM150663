<?php
include('cors.php');
include('conexion.php');
$data = json_decode(file_get_contents("php://input"), true);

 $nombre = $data['nombres'];
 $apellido = $data['apellidos'];
 $modelo = new Conexion();
 $db = $modelo->getConexion();
 
 $sql = "INSERT INTO estudiantes(nombres, apellidos) 
         VALUES(:nombres, :apellidos)";

      $query = $db->prepare($sql);
      $query->bindParam(':nombres', $nombre);
      $query->bindParam(':apellidos', $apellido);

   $query->execute();

echo "registrado";

 
 
?>