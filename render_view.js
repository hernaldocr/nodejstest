function render(html_string,parametros){
		var variables = html_string.match(/[^\{\}]+(?=\})/g);
		// variable ['nombre']
		for (var i = variables.length - 1; i >= 0; i--) {
			//Lo ejecutamos como codigo de javascript
			//Para obtener el valor de dicha variable	
			var variable = variables[i];
			//Reemplazar el contenido con llaves por su valor correspondiente
			html_string = html_string.replace("{"+variables[i]+"}",parametros[variables]);
		}
	return html_string;
}

module.exports.render = render;