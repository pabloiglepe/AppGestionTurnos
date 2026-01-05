<?php


class DatabaseModel {

    private string $hostname = 'localhost';
    private string $user  = 'root';
    private string $passwd = '123456';
    private string $dbname = 'gestionturnos';
    
    function conectar() : mysqli {
        
        $mysqli = new mysqli($this->hostname, $this->user, $this->passwd, $this->dbname);

        if ($mysqli->errno) {
            die("Error al conectarse a la BBDD: ".$mysqli->error);
        }

        return $mysqli;
    }

}
