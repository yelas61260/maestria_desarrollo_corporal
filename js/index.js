var EscenaActual = 1;
var MostrandoMenu = false;
var TieneIndicador = true;
var MostrandoAyuda = false;
var variableActiva = false;
var DispositivosMoviles = true;

var PasosTotales = 0;
var PasoActual = 1;
var Dentroindex = true;
var EscenaMaxima = 1;

var BtnContinuar = '<img src="recursos/Imagen_moviles.jpg" width="1280" style="cursor: pointer; position: absolute; right: 0px; bottom: 0px;z-index:5000;" id="BotonIntro">';
var ImgCargando = '<img src="recursos/cargandodatos.gif" width="240" style="padding-top:300px;padding-left:50px">';

var DatosEscenas = [
            ["Inicio",0],//1
            ["Menu",0],//2
		    ["Modulo 1",0],//3
		    ["Modulo 1",1],//4
		    ["Modulo 1",2],//5
		    ["Modulo 1",3],//6
		    ["Modulo 2",0],//7
			["Modulo 2",1],//8
		    ["Modulo 2",2],//9
		    ["Modulo 2",2],//10
		    ["Modulo 2",2],//11
		    ["Modulo 2",2],//12
		    ["Modulo 2",2],//13
		    ["Modulo 2",2],//14
		    ["Modulo 2",3],//15
		    ["Modulo 3",0],//16
		    ["Modulo 3",1],//17
		    ["Modulo 3",2],//18
		    ["Modulo 3",2],//19
		    ["Modulo 3",3],//20
		    ["Modulo 4",1],//21
		    ["Modulo 4",3],//22
		    ["Modulo 5",0],//23
		    ["Modulo 6",0],//24
		    ["Modulo 6",1],//25
		    ["Modulo 6",3],//26
		    ["Modulo 7",0]//27
];

var DatosMenu = [
	["Bienvenida",1],
	["Cuerpo y mente",2],
	["Corporeidad",4],
	["Motricidad",7],
	["Reflexión",9],
	["Referencias bibliograficas",11]
];


var Inicio = false;

$("#content").css(
{
	"transform-origin":"0 0",
	"-ms-transform-origin":"0 0",
	"-webkit-transform-origin":"0 0",
	"-moz-transform-origin":"0 0",
	"-o-transform-origin":"0 0"
});

$("#Intro").hide();
$("#carga").hide();
$("#carga").append(ImgCargando);
$("#carga").show();
$(".ocultos").hide();
$("#BotonAtras").hide();

var isMobile =
{
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
	return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

$(window).load(function()
{
	 EscalarIframe();
	 Inicio= true;
	 IniciarEscena();
});


$(window).resize(function(evt)
{
 if(Inicio){
  EscalarIframe();	
 }
 
});

var $_GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function(){
	function decode(s){
		return decodeURIComponent(s.split("+").join(" "));
	}
	$_GET[decode(arguments[1])] = decode(arguments[2]);
});


function EscalarIframe()
{
	var stage = $("#content"); // Set a reusable variable to reference the stage
	var parent = $("#content").parent();// Set a reusable variable to reference the parent container of the stage
	
	var parentWidth = $(window).width();// Tamaño del ancho del navegador(width)
	var parentHeight = $(window).height();// tamaño del alto del navegador(height)

	var stageWidth = stage.width();// tamaño del div content en ancho(width)
	var stageHeight = stage.height();// tamaño del div content en alto(height)


	var desiredWidth = Math.round(parentWidth * 1);// Dejamos el with como numero entero
	var desiredHeight = Math.round(parentHeight * 1); // Dejamos el height como numero entero

	var rescaleWidth = (desiredWidth / stageWidth); // Dividimos: tamaño actual de la pantalla/ por tamaño del content (width)
	var rescaleHeight = (desiredHeight / stageHeight); // Dividimos: tamaño actual de la pantalla/ por tamaño del content (height)

	if(rescaleWidth>1 && rescaleHeight>1){
		rescale =1;
	}else if(rescaleWidth>rescaleHeight){
		rescale = rescaleHeight;
	}else{
		rescale = rescaleWidth;
	}

	stage.css("transform", "scale(" + rescale + ")");
	stage.css("-ms-transform", "scale(" + rescale + ")");
	console.log("parentWidth == "+parentWidth);

	stage.css("margin-left","auto");

	stage.css("-o-transform", "scale(" + rescale + ")");
	
	stage.css("-webkit-transform", "scale(" + rescale + ")");
	stage.css("-moz-transform", "scale(" + rescale + ")");
	stage.css("-o-transform", "scale(" + rescale + ")");

	parent.width(stageWidth * rescale);
	parent.height(stageHeight * rescale);
	parent.css("margin","0px auto"); //autoajustamos la pantalla
}

function IniciarEscena(){
	$("#Intro").hide();
	$("#carga").hide();

	if(isMobile.any() && DispositivosMoviles==true){
			$("#Intro").show();
			$("#Intro").html("");
			$("#Intro").append(BtnContinuar);

			setTimeout (function()
			{
				EscalarIframe();
			},500);

			$("#BotonIntro").on("click", function()
			{
				$("#carga").show();
				$("#Intro").hide();

				setTimeout (function()
				{
					Cargar_Escena();
				},500);
			});

	}else{
			$("#carga").show();
			setTimeout (function()
			{
				Cargar_Escena();
			},500);

			setTimeout (function()
			{
				EscalarIframe();
			},750);
	}
	CargarRecursos();
}

function Cargar_Escena(){
	DefinirBotones();
	PasoActual = 1

	if(EscenaActual > EscenaMaxima){
		EscenaMaxima = EscenaActual;
	}

	$("#TextoEscenas").html(DatosEscenas[EscenaActual-1][0]);
	$("#NumeroEscena").html(EscenaActual + " / " + DatosEscenas.length);

	$("#content_frame").hide();
	$("#content_frame").attr("src", "Escenas/escena"+EscenaActual+".html");
	$("#carga").show();

	$("#content_frame").load( function()
	{
		$("#carga").hide();
		$("#content_frame").show();
	});

	var Porcentaje = 100/DatosEscenas.length;
	var Total = Porcentaje * EscenaActual;
}

function CargarRecursos(){
	$("#BotonAdelante").click(Siguiente_Escena);
	$("#BotonAtras").click(Anterior_Escena);
}

function irInicioPrincipal(){
	IrEscena(1);
}

function IrEscena(numero){
	EscenaActual = numero;
	Cargar_Escena();
}

function Siguiente_Escena(){
	if(EscenaActual < DatosEscenas.length){
		EscenaActual++;
		Cargar_Escena();
	}
}

function Anterior_Escena(){
	if(EscenaActual > 1)
	{
		EscenaActual--;
		Cargar_Escena();
	}
}


function DefinirBotones(){

	if(DatosEscenas[EscenaActual-1][1]==0)
	{
		$("#BotonAtras").hide();
		$("#BotonAdelante").hide();
	}
	else if(DatosEscenas[EscenaActual-1][1]==1)
	{
		$("#BotonAtras").hide();
		$("#BotonAdelante").show();
	}
	else if(DatosEscenas[EscenaActual-1][1]==2)
	{
		$("#BotonAtras").show();
		$("#BotonAdelante").show();
	}
	else if(DatosEscenas[EscenaActual-1][1]==3)
	{
		$("#BotonAtras").show();
		$("#BotonAdelante").hide();
	}
}

if (window.addEventListener) {
    window.addEventListener("message", onMessage, false);        
} 
else if (window.attachEvent) {
    window.attachEvent("onmessage", onMessage, false);
}

function onMessage(event) {
    var data = event.data;
    if (typeof(window[data.func]) == "function") {
        window[data.func].call(null, data.message);
    }
}