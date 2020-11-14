
<?php

class Conexion {
	
 public function getConexion(){
   $host = "sql9.freemysqlhosting.net"; //127.0.0.1 0 localhost
   $db = "sql9376406"; //base de datos de mysql
   $usuario = "sql9376406"; // usuario de mysql
   $clave = "cYKkvM55M5";       //contraseña de mysql

//conexion a la base datos utilizando pdo
 $db = new PDO("mysql:host=$host;dbname=$db;", $usuario, $clave);

  return $db;
}

}

?>