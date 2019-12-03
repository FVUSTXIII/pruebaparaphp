var ArregloT = [];
var mensaje;
var Dia = "";
var n1;
var n2;
var nombre;
var codigo;
var nombreNuevo;
var codigoNuevo;
function Enviar(){
    var hideandshow = document.getElementById("emergente");
     n1 = document.getElementById("numero1").value;
     n2 = document.getElementById("numero2").value;
    hideandshow.style.display="block";
    document.querySelectorAll("#emergente").forEach(
                    //elemento => elemento.style.display = "block"
                    elemento => elemento.style.animation = "fadein 1.5s ease"

                    );
    
    //ons.notification.alert("los valores de input son "+n1+" y "+n2);
    //envio y respuesta al server
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var cade = this.responseText;
            var temp = cade.charAt(0);

           if(temp == 0){

                ons.notification.alert("Error");
           }
           else {
            // ons.notification.alert("Recibi del servidor: "+xhttp.responseText);
                
                ArregloT = cade.split(',');
                codigo = ArregloT[1];
                nombre = ArregloT[2];
                document.getElementById("NameO").innerHTML = (" "+ArregloT[2]);    
                        //ons.notification.alert(ArregloT[2]); //muestra el segundo campo, el nombre
            
           }
        }
    };
    xhttp.open("GET", "http://dcc.000webhostapp.com/2018/datosudeg.php?codigo="+n1+"&nip="+n2, true);
    xhttp.send();
}
function Navegar(a,b) {
                switch(b) {
                    case 'S':
                    if(localStorage.getItem("Placas")){
                        var placas = localStorage.getItem("Placas");
                        var telefono = localStorage.getItem("Telefono");
                        codigo = localStorage.getItem("Codigo");
                        nombre = localStorage.getItem("Nombre");    
                    }
                    else {
                        var placas = document.getElementById("PlacasO").value;    
                        var telefono = document.getElementById("TelefonoO").value;
                        localStorage.setItem("Codigo", codigo);
                        localStorage.setItem("Nombre", nombre);
                        localStorage.setItem("tipoUsuario", b);
                        localStorage.setItem("idPagina", a);
                        localStorage.setItem("Placas", placas);
                        localStorage.setItem("Telefono", telefono);
                    }
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                        if(this.readyState == 4 && this.status == 200){
                            var cade = this.responseText;
                            var temp = cade.charAt(0);

                           if(temp == 0){

                                ons.notification.alert("Error");
                           }
                           else {
                            console.log("TODO ESTA BIEN");
                           }
                        }
                    };
                    
                    console.log("codigo: "+codigo+" Nombre: "+nombre+" Placas: "+placas+" Telefono: "+telefono+" Contraseña: "+" ");
                    xhttp.open("GET", "http://CuceiMobile.tech/Escuela/altaU.php?codigo="+codigo+"&nombre="+nombre+"&placas="+placas+"&telefono="+telefono+"&password="+" ", true);
                    xhttp.send();
                    myNavigator.pushPage(a).then(function(){
                        console.log("el nombre que deberia aparecer es" + nombre);
                        document.getElementById("NameM").innerHTML = nombre;
                        console.log("llegamos a la ventana " + b);
                    });
                    break;
                    case 'U':
                    codigoNuevo = getRandomInt(1, 10000000);
                    myNavigator.pushPage(a).then(function(){
                        console.log("llegamos a la ventana "+ b);
                        document.getElementById("CodInt").innerHTML = codigoNuevo; 
                    });
                    break;
                    case 'M':
                    if(localStorage.getItem("Placas")){
                        var placas1 = localStorage.getItem("Placas");
                        var telefono1 = localStorage.getItem("Telefono"); 
                        nombreNuevo= localStorage.getItem("Nombre"); 
                        codigoNuevo = localStorage.getItem("Codigo");
                        var password = localStorage.getItem("Password");
                    }
                    else {
                        var placas1 = document.getElementById("PlacasIn").value;    
                        var telefono1 = document.getElementById("TelefonoIn").value;
                        nombreNuevo=document.getElementById("NameI").value;
                        var password = document.getElementById("PassWordI").value;
                        localStorage.setItem("Codigo", codigoNuevo);
                        localStorage.setItem("Nombre", nombreNuevo);
                        localStorage.setItem("tipoUsuario", b);
                        localStorage.setItem("idPagina", a);
                        localStorage.setItem("Placas", placas1);
                        localStorage.setItem("Telefono", telefono1);
                        localStorage.setItem("Password", password);
                    }                    
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                        if(this.readyState == 4 && this.status == 200){
                            var cade = this.responseText;
                            var temp = cade.charAt(0);

                           if(temp == 0){

                                ons.notification.alert("Error");
                           }
                           else {
                            console.log("TODO ESTA BIEN");
                           }
                        }
                    };
                    
                    console.log("codigo: "+codigoNuevo+" Nombre: "+nombreNuevo+" Placas: "+placas1+" Telefono: "+telefono1+" Contraseña: "+password);
                    xhttp.open("GET", "http://CuceiMobile.tech/Escuela/altaU.php?codigo="+codigoNuevo+"&nombre="+nombreNuevo+"&placas="+placas+"&telefono="+telefono+"&password="+password, true);
                    xhttp.send();
                    
                    myNavigator.pushPage(a).then(function(){
                        console.log("el nombre que deberia aparecer es" + nombreNuevo);
                        if(localStorage.getItem("Nombre")) {
                            document.getElementById("NameM").innerHTML = localStorage.getItem("Nombre");
                        }
                        else{
                            document.getElementById("NameM").innerHTML = nombreNuevo;  
                        }

                        
                        console.log("llegamos a la ventana "+ b);
                    });
                    break;
                }
                
            }
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}

window.onload = function() {
    console.log("hola, estamos bien por lo pronto");
    if(localStorage.getItem("Codigo")) {
        console.log("ya habias iniciado sesión antes, que no?");
        myNavigator.pushPage('MapaEstacionamiento.html').then(function () {
            document.getElementById("NameM").innerHTML = localStorage.getItem("Nombre");
        });
    }
    else {
        console.log("no has iniciado sesión");
    }
}
function Salir() {
    localStorage.clear();
    myNavigator.pushPage('UsuarioUdg.html').then(function () {
        location.reload();
    });
}