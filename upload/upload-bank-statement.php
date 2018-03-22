<?php


$id="../../STORAGE/capitalalinstante/privado";



$dir="documents/".$_POST['id'];
if (!file_exists($id)) {
	mkdir($id, 0777, true);
}



$dir = "https://qreatech.com/STORAGE/capitalalinstante/privado";

$uploaddir  = $id.'/';

$name = sha1(basename($_FILES['file']['name']));

$uploadfile = $uploaddir . $name;

$dir = $dir.'/'.$name;

echo '<pre>';
if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {


		$reference   	= $dir;
		$name 	     	= $_FILES['file']['name'];
		$type 	     	= "Private";
		$lead_id     	= $_POST['id'];
		$description 	= "Private";



		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,"https://qreatech.com/API/file.php/1/fileUpload");

		curl_setopt($ch, CURLOPT_POST, TRUE);

		curl_setopt($ch, CURLOPT_POSTFIELDS, "&reference=".$reference."&name=".$name."&type=".$type."&lead_id=".$lead_id."&description=".$description);

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


