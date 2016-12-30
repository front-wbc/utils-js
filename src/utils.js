let instance = null;
class Utils {
	/**
	 * Constructor de la classe singleton Utils
	 * @constructor
	 * @param {Object} params - la liste des paramétres pour le constructor de la classe.
	 * @param {String} static_root - le chemin vers le dossier sttic du projet
	 */
	constructor(params) {
		this.langue = params.langue || 'fr';
		this.staticRoot = params.static_root || '/static/';
		this.acceptMultilangue = params.acceptMultilangue || false;
		this.staticFormatDate = { fr : "DD/MM/YYYY", en :"YYYY/MM/DD" };
		this.verifyBoolean(params.debug, function(value) {
			this.debug = value;
		});
		
		// code pour que la classe Utils sera instancié une seule fois
		if(!instance){
              instance = this;
        }
		return instance;
	}
	/**
	 * une fonction qui vérifie le type Boolean et sa valeur d'une maniére fiable
	 * @verifyBoolean
	 * @param {Boolean} value - la valeur a tester
	 * @param (Function) callback - la fonction de callback qui récupere la résultat de test.
	 */
	verifyBoolean(value, callback ) {
		var value_result = null;
		if( value === false ) {
			value_result = false;
		}
		else {
			value_result = true;
		}
		callback.call(this, value_result);
	}
	/**
	 * une fonction afficher les différents logs si le debug est true
	 * @log
	 * @param {String} msg - le message a afficher
	 * @param (String) type - le type de messsage a afficher ( info, error, warning, dir, table, log );
	 * @param (String) info - une information supplementaire a afficher dans certains type de message.
	 */
	log(msg, type, info) {
		if( this.debug ) {
			switch (type) {
				case "dir" :
					console.dir(msg);
				break;
				case "error" :
					throw new Error(msg);
				case "info" :
					console.info(msg);
				break;
				case "table" :
					console.table(msg);
				break;
				case "warn" :
					console.warn(msg);
				break;
				default : 
					console.log(msg);
				break;
			}
		}
	}
	/**
	 * une fonction qui vérifie si la valeur et de type String ou pas
	 * @is_string
	 * @param {String} value - la valeur a tester
	 */
	is_string(value) {
		if( typeof value === 'string' || value instanceof String ) {
			return true;
		}
		else {
			return false;
		}
	}
	/**
	 * une fonction qui vérifie si la valeur et de type Number ou pas
	 * @is_number
	 * @param {Number} value - la valeur a tester
	 */
	is_number(value) {
		if( typeof value === 'number' && !isNaN(value/1) ) {
			return true;
		}
		else {
			return false;
		}
	} 
	/**
	 * une fonction qui vérifie si la valeur et de type Array ou pas
	 * @is_Array
	 * @param {Array} value - la valeur a tester
	 */
	is_Array(value) {
		return Array.isArray(value);
	}
	/**
	 * une fonction va faire une boucle et passer les valeur de tableau sur une fonction callback
	 * @forEach
	 * @param {Array} array - le tableau a boucler
	 * @param (Function) callback - la fonction callback qui va s'éxecuter au sein de boucle
	 */
	forEach(array, callback) {
		if (this.is_array(array)) {
			for (var index = 0; index < array.length; index++) {
				var item = array[index];
				callback.call(this, item, index);
			}
		}
	}
	/**
	 * une fonction qui convertir les dates selon une format donner
	 * @convertDate
	 * @param {String/Date} value  - la valeur a convertir
	 * @param (String) format - la format voulu
	 */
	convertDate(value, format) {
		if(typeof moment !== "undefined") {
			return moment(value, this.staticFormatDate[this.langue]).format(format);
		}
		else {
			this.log("Merci d'include le fichier moment.js sur votre page", "error");
		}
	}
	/**
	 * une fonction pour ajouter un carousel baser sur OwlCarousel
	 * @addCarousel
	 * @param {String} parent  - le selecteur CSS du parent de carousel
	 * @param (Object) options - l'objet de configuration du carousel
	 */
	addCarousel (parent, options) {
		if(typeof $(parent).owlCarousel !== "undefined") {
			var self = this;
			let options_default = {};
			if( typeof options !== "undefined") {
				options_default = options;
			}
			$(parent).owlCarousel(options_default);
		}
		else {
			this.log("Merci d'include le fichier owlCarousel.js sur votre page", "error");
		}
	}
	/**
	 * une fonction pour ajouter un carousel baser sur OwlCarousel
	 * @addCarousel
	 * @param {String} parent  - le selecteur CSS du parent de carousel
	 * @param (Object) options - l'objet de configuration du carousel
	 */
	addDatePicker (selector, type, callback) {
		if(typeof flatpickr !== "undefined") {
			let options_defaults = {};
			var self = this;
			switch(type) {
				case 'normal' : 
					options_defaults = {
						enableTime : false,
						altInput : true,
						time_24hr : true,
						altFormat: "d/m/Y"
					};
				break;
				case 'time' : 
					options_defaults = {
						enableTime : true,
						altInput : true,
						time_24hr : true,
						altFormat: "d/m/Y"
					};
				break;	
			}
			$(selector).flatpickr(options_defaults);
		}
		else {
			if( typeof callback !== "undefined" ) {
				callback.call(this, selector, type);
			}
			else {
				this.log("Merci d'include le fichier flatpickr.js sur votre page, voici le lien : https://chmln.github.io/flatpickr/", "error");
			}
		}
	}
	help() {
		this.log("la liste des methodes ")
	}

} // class Utils