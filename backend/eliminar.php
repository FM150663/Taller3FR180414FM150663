<?php
include('cors.php');
include('conexion.php');

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

if(!empty($id)){
	$modelo = new Conexion();
    $db = $modelo->getConexion();
	$sql = "DELETE FROM estudiantes WHERE id='$id'";
    $query = $db->prepare($sql);
    $query->execute();

    echo "eliminado con exito";
}


 ?>