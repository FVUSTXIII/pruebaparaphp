var mapOptions, map, marker = new Array();
var ArregloT;
var status;
var mapa;
var band = false;
var contador = 0;
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    CapturarGps();
}
window.onload = function() {
    console.log("hola, estamos bien por lo pronto");

    if(localStorage.getItem("Codigo")) {
        console.log("ya habias iniciado sesión antes, que no?");
        status = 1;
        iramapa();

    }
    else {
        console.log("no has iniciado sesión");
        status=0;
    }
}
function Comprobacion(codigo, password) { 
    var xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var cadena = this.responseText;
            console.log('esta es la cadena que obtuvimos con el usuario ' +codigo + 'y la contraseña '+password +': '+cadena);
            if (cadena == "Datos Desconocidos" && password) {
                console.log("Usuario Inexistente");
                registrarnuevo();
                //Pagina_Nuevo();
            } 
            else if(cadena == "Datos Desconocidos" && !password) {
                console.log("Alumno UDG No Registrado");
                popup();
                /*myNavigator.pushPage('page2.html').then(function () {
                    document.getElementById("alumno_udg").innerHTML = nombreudg;
                    document.getElementById("codigo_udg").innerHTML = codigoudg;
                    document.getElementById("alumno2_udg").innerHTML = nombreudg;
                });*/
            }
            else if(cadena != "Datos Desconocidos" && !password) {
                console.log("Alumno UDG registrado");
                var myObj = JSON.parse(cadena);
                dumpintolicalmemory(myObj);
                iramapa(localStorage.getItem("Nombre"));
                //
                //Pagina_Mapa(myObj.Nombre, myObj.Codigo);
            }
            else {
                console.log("Usuario que no es alumno pero esta registrado");
                var myObj;
                console.log(cadena);
                myObj = JSON.parse(cadena);
                console.log(myObj['Nombre']);
                dumpintolicalmemory(myObj);
                if(status==0){
                    iramapa();   
                }
            }
        }
    };
    xhttp1.open("GET", "https://fvustxiii.000webhostapp.com/verificarsicodigoexiste.php?codigo="+codigo, true);
    xhttp1.send();
}
function Enviar() {
    var codigo = document.getElementById("pruebaUser").value;
    var password = document.getElementById("pruebaPw").value;
    //Declaramos una bandera que nos servira para determinar si los input están vacios o no . . .
    var bandera = true;

    //Si bandera es positiva indica que no hay campos vacios y continua con la operación . . . 
    if (bandera) {
        //Envio y respuesta del servidor.
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var cadena = this.responseText;
                console.log(cadena);
                var temp = cadena.charAt(0);
                if (temp == "0") {
                    Comprobacion(codigo, password);
                } else {
                    ArregloT = cadena.split(',');
                    nombreudg = ArregloT[2];
                    codigoudg = ArregloT[1];
                    password_vacio = "";
                    Comprobacion(codigo, password_vacio);
                }
            }
        };
        xhttp.open("GET", "http://dcc.000webhostapp.com/2018/datosudeg.php?codigo=" + codigo + "&nip=" + password, true);
        xhttp.send();
        //Limpiar('#form_ingresar ons-input');
    } 
    else {
        ons.notification.alert("Existen Campos Vacios");
    }
}
function popup(){
    console.log("aqui registramos las placas del usuario que es alumno pero no esta registrado");
    var nombre = ArregloT[2];
    
    var hideandshow = document.getElementById("emergente");
    hideandshow.style.display="block";
    document.querySelectorAll("#emergente").forEach(
        elemento => elemento.style.animation = "fadein 1.5s ease"
    );
    document.getElementById("NameO").innerHTML = nombre;
}
function popupclick() {
    var nombre = ArregloT[2];
    var codigo = ArregloT[1];
    var password = document.getElementById("pruebaPw").value;
    var placas = document.getElementById("PlacasO").value;    
    var telefono = document.getElementById("TelefonoO").value;
    var myObj = {};
    myObj['Codigo'] = codigo;
    myObj['Nombre'] = nombre;
    myObj['Placas'] = placas;
    myObj['Telefono'] = telefono;
    myObj['password'] = password;
    console.log(myObj);
    dumpintolicalmemory(myObj);
    //https://fvustxiii.000webhostapp.com/insertarUsuario.php?codigo=883728diJ&nombre=Juanito&placas=2313i12&telefono=3314414122&pwrd=Uno2tres*
}
function registrarnuevo(){
    console.log("aqui nos vamos directamente a la pagina de registrar usuario verificamos si el usuario con el codigo generado ya existe");
    codigoNuevo = getRandomInt(1, 10000000);
    localStorage.setItem("Codigo", codigoNuevo);
    myNavigator.pushPage('UsuarioNuevo.html').then(function(){
        document.getElementById("CodInt").innerHTML = codigoNuevo; 
    });
}
function registrarnuevoOnclick() {
    var nombre = document.getElementById("NameI").value;
    localStorage.setItem("Nombre", nombre);
    var placas = document.getElementById("PlacasIn").value;
    localStorage.setItem("Placas", placas);
    var telefono = document.getElementById("TelefonoIn").value;
    localStorage.setItem("Telefono", telefono);
    var password = document.getElementById("PassWordI").value;
    localStorage.setItem("Password", password);
    console.log("Codigo: "+localStorage.getItem("Codigo")+" Nombre: "+nombre+" Placas: "+placas+" Telefono: "+telefono+" Password: "+password);
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}
function Salir() {
    localStorage.clear();
    myNavigator.pushPage('UsuarioUdg.html').then(function () {
        location.reload();
    });
}
function dumpintolicalmemory(a) {
    var codigo, nombre, placas, telefono, contra;
    codigo = a['Codigo'];
    localStorage.setItem("Codigo", codigo);
    nombre = a['Nombre'];
    localStorage.setItem("Nombre", nombre);
    placas = a['Placas'];
    localStorage.setItem("Placas", placas);
    telefono = a['Telefono'];
    localStorage.setItem("Telefono", telefono);
    pswrd = a['password'];
    localStorage.setItem("Password", pswrd);
}
function existeUbicacion() {
	for(var i=0; i<marker.length; i++) {
		if(marker[i].label==localStorage.getItem("Placas"));
		return true;
	}
	return false;
}
function cargarMapa(cadena) {
	var obj = JSON.parse(cadena); console.log(obj);
	var cont = Object.keys(obj).length;
	mapOptions = {
		center: new google.maps.LatLng(20.657185, -103.324903),
		zoom:16
	}
	map = new google.maps.Map(document.getElementById("map"),mapOptions);
	for(var i=0; i<cont; i++) {
		marker[i] = new google.maps.Marker({
			position: new google.maps.LatLng(obj[i].lat, obj[i].lon),
			label: obj[i].placas
		});
		marker[i].setMap(map);
	}
}
function initMap() {
    var datosEstacionamiento = new XMLHttpRequest();
    datosEstacionamiento.onreadystatechange = function() {
    	if(this.readyState==4  && this.status==200) {
    		var cadena=datosEstacionamiento.responseText;
    		cargarMapa(cadena);
    	}
    }
    datosEstacionamiento.open("GET", "https://fvustxiii.000webhostapp.com/PrimerPhpParaMapa.php", true);
    datosEstacionamiento.send();
}
function agregarUbicacion(location) {
	if(existeUbicacion()) {
		ons.notification.alert("ya esta registrada su ubicacion");
	}
	else {
		/*quitar en caso de no funcionar algo*/ lat = location.coords.latitude;
		/*quitar en caso de no funcionar algo*/ lon = location.coords.longitude;
		var agregarLuagarEstacionamientoDB = new XMLHttpRequest();
		agregarLuagarEstacionamientoDB.onreadystatechange=function()  {
			if(this.readyState==4 && this.status==200) {
				var cadena = agregarLuagarEstacionamientoDB.responseText;
				if(cadena.charAt(0)=='0') {
					ons.notification.alert("Problemas al guardar la ubicacion");
				} 
				else{
					marker[marker.length] = new google.maps.Marker({
						position: new google.maps.LatLng(lat, lon),
						label: localStorage.getItem("Placas")
					});
					marker[marker.length-1].setMap(map);					
				}
			}

		}
		agregarLuagarEstacionamientoDB.open("GET","https://fvustxiii.000webhostapp.com/SegundoPhpParaMapa.php?codigo="+localStorage.getItem('Codigo')+"&lat="+lat+"&lon="+lon,true);
		agregarLuagarEstacionamientoDB.send();
	}
}
function CapturarGps() {
    navigator.geolocation.getCurrentPosition(agregarUbicacion, onError, {timeout:1000});
}
function onError(error) {
	if(error.code==1||error.code==2||error.code==3) {
		ons.notification.alert("Hubo un problema con su ubicacion");
	}
}
function eliminarUbicacion() {
	if(existeUbicacion()) {
		var eliminarLugarEstacionamientoBD = new XMLHttpRequest();
		eliminarLugarEstacionamientoBD.onreadystatechange=function() {
			if(this.readyState==4 && this.status==200) {
				var cadena=eliminarLugarEstacionamientoBD.responseText;
				if(cadena.charAt(0)=='0') {
					ons.notification.alert('Han habido errores eliminando su ubicacion, intentelo de nuevo');
				}
				else {
					for(var i=0; i<marker.length;i++) {
						if(marker[i].label==localStorage.getItem("Placas")) {
							marker[i].setMap(null);
							marker.splice(i, 1);
							ons.notification.toast("Adios", {timeout: 2000});
							break;
						}
					}
				}
			}
		}
		eliminarLugarEstacionamientoBD.open("GET", "https://fvustxiii.000webhostapp.com/TercerPhpParaMapa.php?codigo="+localStorage.getItem('Codigo'), true);
		eliminarLugarEstacionamientoBD.send();
	}
	else {
		ons.notification.alert("No se ha encontrado su ubicacion");
	}
}
function ocupar() {
    CapturarGps();
}
function desocupar() {
    eliminarUbicacion();
}

function iramapa(){
    console.log("vamos a la pagina de mapa");
    myNavigator.pushPage('MapaEstacionamiento.html').then(function () {
            document.getElementById("NameM").innerHTML = localStorage.getItem("Nombre");
            initMap();
        });
}