<?php

$id="../agent/".$_POST['id'];
$dir="agent/".$_POST['id'];

if (!file_exists($id)) {
	mkdir($id, 0777, true);
}

$uploaddir  = $id.'/';

$uploadfile = $uploaddir . basename($_FILES['file']['name']);

$dir = $dir.'/'.basename($_FILES['file']['name']);

echo '<pre>';
if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {

		$reference   	= $dir;
		$id     		= $_POST['id'];

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,"https://qreatech.com/API/agent.php/1/avatarUpload");
		curl_setopt($ch, CURLOPT_POST, TRUE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, "&reference=".$reference."&id=".$id);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$remote_server_output = curl_exec ($ch);
		curl_close ($ch);

		echo $remote_server_output;
		echo $uploadfile;

} else {
	echo "Possible file upload attack!\n";
}

print_r($_FILES);

print "</pre>";



?>
