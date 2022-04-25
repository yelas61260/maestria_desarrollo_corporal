
         function gotoEscena(numero){
         	window.parent.postMessage({
         	    'func': 'IrEscena',
         	    'message': numero
         	}, "*");
         }