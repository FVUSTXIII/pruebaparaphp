var ArregloT;
var status;
var mapa;
var band = false;
var contador = 0;
document.addEventListener("deviceready", onDeviceReady, false);
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
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    alert("LAtitud: "+Lat1+" Longitud: "+Lon1);
}
function onDeviceReady() {
    console.log("navigator.geolocation works well");
    navigator.geolocation.getCurrentPosition(geolocationSucess, [geolocationError], [geolocationOptions]);
}
var onSuccess = function(position) {
    Lat1 = position.coords.latitude;
    Lon1 = position.coords.longitude;
    localStorage.setItem("Latitude", Lat1);
    localStorage.setItem("Longitude", Lon1);
};
function onError(error) {
    alert('code: '+error.code + '\n' + 'message: '+error.message+'\n');
}
function CapturarGps() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

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
//Funcion que hace el envio de datos para generar un inicio de sesión . . .
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
function iramapa(){
    console.log("vamos a la pagina de mapa");
    myNavigator.pushPage('MapaEstacionamiento.html').then(function () {
            document.getElementById("NameM").innerHTML = localStorage.getItem("Nombre");
            initMap();
        });
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
    regestacionamiento(codigo, nombre, placas, telefono, password);
    iramapa(nombre);
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
    regestacionamiento(localStorage.getItem("Codigo"), nombre, placas, telefono, password);
    iramapa(nombre);
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
function regestacionamiento(c,n,p,t,pw) {
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var cadena = this.responseText;
                console.log(cadena);
                var temp = cadena.charAt(0);
                if (temp == "0") {
                    console.log("no se pudo registrar");
                } else {
                    console.log("si se pudo registrar");
                }
            }
        };
        xhttp.open("GET", "https://fvustxiii.000webhostapp.com/insertarUsuario.php?codigo="+c+"&nombre="+n+"&placas="+p+"&telefono="+t+"&pwrd="+pw, true);
        xhttp.send();
}   
function initMap() {
    console.log("entramos");
    var myObj_posiciones;
    var options = { 
        center:{lat:20.6540,lng:-103.3245},
        zoom:18
    }
    console.log("seguimos?");
    mapa = new google.maps.Map(document.getElementById('map'), {
        center:{
            lat:20.6540,
            lng:-103.3245
        },
        zoom:17,
    });
    var xhttpm = new XMLHttpRequest();
    xhttpm.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var cadena = this.responseText;
            myObj_posiciones = JSON.parse(cadena);
            //Arreglo que sirve para recorrer cada uno de los atributos de los objetos JSON y a su vez asignarlos en las funciones correspondientes del mapa . . . 
            for (i in myObj_posiciones) {
                //Funcion especifica para crear los marcadores del mapa de google . . .
                var position = new google.maps.LatLng(myObj_posiciones[i].lat, myObj_posiciones[i].lon);
                var marker = new google.maps.Marker({
                    position: position,
                    map: mapa,
                    label: myObj_posiciones[i].Placas
                });
            }
        }
    };
    xhttpm.open("GET", "https://viva-mexico23.000webhostapp.com/mapa.php", true);
    xhttpm.send();
}
function ocupar() {
    var parametro = localStorage.getItem("latitude");
    if(parametro !='NULL'){
        contador = contador  + 1;
        console.log("entramos a la funcion ocupar");
        CapturarGps();
        var la = localStorage.getItem("Latitude"); 
        var lo = localStorage.getItem("Longitude");
        var  Placas = localStorage.getItem("Placas");
        var uno = Placas;
        var dos = la;
        var tres = lo;
        ons.notification.alert('estos son los datos que subiremos a la base de datos: Latitude: '+(dos)+'\n'+'Longitude: '+(tres)+'\n'+'Placas: '+(uno+1));
        mandarAestacionamiento(uno, dos, tres);

         
}
 else{
        ons.notification.alert('no nos ha llegado nada');
        ocupar();
    }
}
function desocupar() {
    contador = contador  + 1;
    var  Placas = localStorage.getItem("Placas");
    console.log("Eliminaremos los campos con placas: "+Placas);
    var p = Placas;
    SalirDeEstacionameinto(p);
}
function mandarAestacionamiento(a,b,c) {
    var xhttpL = new XMLHttpRequest();
        xhttpL.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var cadena = this.responseText;
                console.log(cadena);
                initMap();
                band = true
            }
        };
        xhttpL.open("GET", "https://fvustxiii.000webhostapp.com/llegaraE.php?placas="+a+"&lat="+b+"&lon="+c+"&ocupado=1", true);
        xhttpL.send();
}
function SalirDeEstacionameinto(a) {
    var xhttpD = new XMLHttpRequest();
        xhttpD.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var cadena = this.responseText;
                console.log(cadena);
                initMap();
                band = true;
            }
        };
        xhttpD.open("GET", "https://fvustxiii.000webhostapp.com/SalirEstacionamiento.php?Placas="+a,  true);
        xhttpD.send();
}


 
