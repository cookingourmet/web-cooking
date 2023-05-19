<?php

if (isset($_POST['enviar'])){
    if(!empty($_POST['name']) && !empty($_POST['apellido']) && !empty($_POST['sunto']) && !empty($_POST['correo']) && !empty($_POST['dni']) && !empty($_POST['celular']) && !
    empty($_POST['programa'])) {
        $name = $_POST ['name'];
        $apellido = $_POST ['apellido'];
        $asunto = $_POST ['asunto'];
        $correo = $_POST ['correo'];
        $dni = $_POST ['dni'];
        $celular = $_POST ['celular'];
        $programa = $_POST ['programa'];
        $header = "From: admin@cookingourmet.edu.pe" . "\r\n";
        $header.= "reply-to: admin@cookingourmet.edu.pe" . "\r\n";
        $header.= "X-Mailer: PHP/" . phpversion();
        $mail = @mail($email,$asunto,$header);
        if($mail){
            echo "<h4> ¡Mail enviado Exitosamente! </h4>";
        }
    }

}