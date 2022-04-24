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
            ["Bienvenida",0],//1
            ["Cuerpo y mente",0],//2
		    ["Cuerpo y mente",0],//3
		    ["Corporeidad",0],//4
		    ["Corporeidad",0],//5
		    ["Corporeidad",0],//6
		    ["Motricidad",0],//7
			["Motricidad",0],//8
		    ["Reflexión",0],//9
		    ["Reflexión",0],//10
		    ["Referencias bibliograficas",0],//11
		    ["Referencias bibliograficas",0]//12
];

function mensaje(){
	alert("llamar");
}

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
$("#Elemento-Indicador").hide();
$("#BotonAtras").hide();
$("#BotonAtras").hide();
$("#EnlacesMenu").hide(); 

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

	Iniciarmenu();
	$("#Intro").hide();
	$("#carga").hide();

	if($_GET['EscenaActual']){
		EscenaActual = $_GET['EscenaActual'];
	}
		
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


function Iniciarmenu()
{
 for(i=0; i<DatosMenu.length; i++)
 {
  $("#modulos").append("<li id='MenuEnlaces' onclick='IrEscena(" + DatosMenu[i][1] + ")'><p>"+DatosMenu[i][0]+"</p></li>");
 }
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

	$("#btn_home").click(irInicioPrincipal);

	
	$("#btn_menu").click(function ()
	{
		if(!MostrandoMenu)
		{
			$("#modulos").show();	
			$("#LegalId").show();
			$("#AyudaId").show();
			$("#BotonMenu").show();
			MostrandoMenu = true;
		}
		else
		{
			$("#modulos").hide();	
			$("#BotonMenu").hide();
			$("#LegalId").hide();
			$("#AyudaId").hide();
			MostrandoMenu = false;
		}
	});

	$(".BotonLegal").click(function (){
			$("#modulos").hide();	
			$("#LegalId").hide();
			$("#AyudaId").hide();
			$("#BotonMenu").hide();
			MostrandoMenu = false;
					
		if(!MostrandoAyuda){
			MostrandoAyuda = true;
			$(".VentanaAyuda").prepend('<div id="BotonCerrar"><img src="recursos/boton_cerrar.png"></div>');
			$(".VentanaAyuda").append('<img src="recursos/pagina_legal.jpeg">');
			$(".VentanaAyuda").css({'z-index': '2000'});
			$(".VentanaAyuda").css({'display': 'initial'});
		}else{
			MostrandoAyuda = false;
			$(".VentanaAyuda").html('');
			$(".VentanaAyuda").css({'display': 'none'});
		}
	});

	$('.VentanaAyuda').on('click', '#BotonCerrar', function(){
		MostrandoAyuda = false;
		$(".VentanaAyuda").html('');
			$(".VentanaAyuda").css({'display': 'none'});
	});


}

function irInicioPrincipal(){
	IrEscena(1);
}


function IrEscena(numero){
	Ocultar_Elemento_Indicador();
	$("#modulos").hide();	
	$("#BotonMenu").hide();
	$("#LegalId").hide();
	$("#AyudaId").hide();
	MostrandoMenu = false;
	
	EscenaActual = numero;
	Cargar_Escena();
}

//FUNCIONES ELEMENTO INDICADOR

function Habilitar_Boton_Siguiente()
{
	$("#BotonAdelante").show();
	if(TieneIndicador){
		Mostrar_Elemento_Indicador("der","1135px", "280px");
	}
		
}

function Mostrar_Elemento_Indicador(Apuntando, MarginLeft, MarginTop)
{
	if(TieneIndicador)
	{
		Ocultar_Elemento_Indicador();
		$("#Elemento-Indicador img").attr('src', 'recursos/indicador_' +Apuntando+ '.png');
		$("#Elemento-Indicador").show();
		$("#Elemento-Indicador img").animate({marginTop: MarginTop, marginLeft: MarginLeft},0);

	}
}

function Ocultar_Elemento_Indicador()
{
	if(TieneIndicador)
	{
		$("#Elemento-Indicador").hide();
		$("#Elemento-Indicador").animate({marginTop: "0px", marginLeft: "0px"},0);
	}
}

// FIN FUNCIONES ELEMENTO INDICADOR
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
	if(EscenaActual == 1)
	{
		$("#BotonAtras").hide();
		$("#BotonAdelante").show();
	}
	else if(EscenaActual == DatosEscenas.length)
	{
		$("#BotonAtras").show();
		$("#BotonAdelante").hide();		
	}
	else if(DatosEscenas[EscenaActual-1][1]==1)
	{
		$("#BotonAtras").show();
		$("#BotonAdelante").hide();
	}
	else{
		$("#BotonAtras").show();
		$("#BotonAdelante").show();
	}
}