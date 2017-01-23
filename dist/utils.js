'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;

var Utils = function () {
	/**
  * Constructor de la classe singleton Utils
  * @constructor
  * @param {Object} params - la liste des paramétres pour le constructor de la classe.
  * @param {String} static_root - le chemin vers le dossier sttic du projet
  */
	function Utils(params) {
		_classCallCheck(this, Utils);

		this.langue = params.langue || 'fr';
		this.staticRoot = params.static_root || '/static/';
		this.acceptMultilangue = params.acceptMultilangue || false;
		this.staticFormatDate = { fr: "DD/MM/YYYY", en: "YYYY/MM/DD" };
		this.verifyBoolean(params.debug, function (value) {
			this.debug = value;
		});
		this.events = {};
		this.rules = {};
		this.customEvents = {};
		this.map = null;
		this.markers = [];
		this.options_events = {};
		this.acceptInfoWindow = params.acceptInfoWindow || true;
		this.infosWindow = {};
		// code pour que la classe Utils sera instancié une seule fois
		if (!instance) {
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


	_createClass(Utils, [{
		key: 'verifyBoolean',
		value: function verifyBoolean(value, callback) {
			var value_result = null;
			if (value === false) {
				value_result = false;
			} else {
				value_result = true;
			}
			callback.call(this, value_result);
		}
		/**
   * une fonction afficher les différents logs si le debug est true
   * @log
   * @param {String} msg - le message a afficher
   * @param (String) type - le type de messsage a afficher ( info, error, warning, dir, table, log );
   */

	}, {
		key: 'log',
		value: function log(msg, type) {
			if (this.debug) {
				switch (type) {
					case "dir":
						console.dir(msg);
						break;
					case "error":
						throw new Error(msg);
					case "info":
						console.info(msg);
						break;
					case "table":
						console.table(msg);
						break;
					case "warning":
						console.warn(msg);
						break;
					default:
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

	}, {
		key: 'is_string',
		value: function is_string(value) {
			if (typeof value === 'string' || value instanceof String) {
				return {
					valid: true,
					message: null
				};
			} else {
				return {
					valid: false,
					message: "le champs est de type text"
				};
			}
		}
		/**
   * une fonction qui vérifie si la valeur et de type Number ou pas
   * @is_number
   * @param {Number} value - la valeur a tester
   */

	}, {
		key: 'is_number',
		value: function is_number(value) {
			if (!isNaN(value / 1)) {
				return {
					valid: true,
					message: null
				};
			} else {
				return {
					valid: false,
					message: "le champ est de type number"
				};
			}
		}
		/**
   * cette fonction vérifier la valeur s'elle est de type adresse email ou pas
   * @is_email
   * @param {String} email - la valeur à vérifier.
   */

	}, {
		key: 'is_email',
		value: function is_email(email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			var test = re.test(email);
			if (test) {
				return {
					valid: true,
					message: null
				};
			} else {
				return {
					valid: false,
					message: "le champs est de type email adresse"
				};
			}
		}
		/**
   * cette fonction vérifier la valeur s'elle est de type téléphone ou pas
   * @is_telephone
   * @param {String} telephone - la valeur à vérifier.
   */

	}, {
		key: 'is_telephone',
		value: function is_telephone(telephone) {
			var re = /^((0|((\+|00)\d{2,3}))\d{9,20})$/;
			var test = re.test(telephone);
			if (test) {
				return {
					valid: true,
					message: null
				};
			} else {
				return {
					valid: false,
					message: "le champs est de type téléphone numéro"
				};
			}
		}
		/**
   * cette fonction vérifier la valeur s'elle est de type téléphone ou pas
   * @is_telephone
   * @param {String} telephone - la valeur à vérifier.
   */

	}, {
		key: 'is_date',
		value: function is_date(date) {
			if (typeof moment !== "undefined") {
				var date_moment = moment(date);
				var test = date_moment.isValid();
				if (test) {
					return {
						valid: true,
						message: null
					};
				} else {
					return {
						valid: false,
						message: "le champs est de type date"
					};
				}
			} else {
				this.log("Merci d'include le fichier moment.js sur votre page", "error");
			}
		}
		/**
   * une fonction qui vérifie si la valeur et de type Array ou pas
   * @is_Array
   * @param {Array} value - la valeur a tester
   */

	}, {
		key: 'is_Array',
		value: function is_Array(value) {
			return Array.isArray(value);
		}
		/**
   * une fonction va faire une boucle et passer les valeur de tableau sur une fonction callback
   * @forEach
   * @param {Array} array - le tableau a boucler
   * @param (Function) callback - la fonction callback qui va s'éxecuter au sein de boucle
   */

	}, {
		key: 'forEach',
		value: function forEach(array, callback) {
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

	}, {
		key: 'convertDate',
		value: function convertDate(value, format) {
			if (typeof moment !== "undefined") {
				return moment(value, this.staticFormatDate[this.langue]).format(format);
			} else {
				this.log("Merci d'include le fichier moment.js sur votre page", "error");
			}
		}
		/**
   * une fonction pour ajouter un carousel baser sur OwlCarousel
   * @addCarousel
   * @param {String} parent  - le selecteur CSS du parent de carousel
   * @param (Object) options - l'objet de configuration du carousel
   */

	}, {
		key: 'addCarousel',
		value: function addCarousel(parent, options) {
			if (typeof $(parent).owlCarousel !== "undefined") {
				var self = this;
				var options_default = {
					autoPlay: 3000,
					navigation: true,
					slideSpeed: 2000,
					pagination: false,
					singleItem: true,
					stopOnHover: true,
					navigationText: ['<img src="' + self.staticRoot + 'images/btn_right.png" />', '<img src="' + self.staticRoot + 'images/btn_left.png" />'],
					mouseDrag: true,
					rewindNav: true,
					items: 1
				};
				if (typeof options !== "undefined") {
					options_default = options;
				}
				$(parent).owlCarousel(options_default);
			} else {
				this.log("Merci d'include le fichier owlCarousel.js sur votre page", "error");
			}
		}
		/**
   * une fonction qui génére un ID unique
   * @generateID
   * @param {Number} length - le niveau sur laquel la fonction peut étendue le nombre des caractére à fournir
   */

	}, {
		key: 'generateID',
		value: function generateID(l) {
			if (typeof l === "undefined") {
				l = 36;
			}
			return Math.random().toString(l).substr(2, 10);
		}
		/**
   * une fonction pour ajouter un carousel baser sur OwlCarousel
   * @addCarousel
   * @param {String} parent  - le selecteur CSS du parent de carousel
   * @param (Object) options - l'objet de configuration du carousel
   */

	}, {
		key: 'addDatePicker',
		value: function addDatePicker(selector, type, callback) {
			if (typeof flatpickr !== "undefined") {
				var options_defaults = {};
				var self = this;
				switch (type) {
					case 'normal':
						options_defaults = {
							enableTime: false,
							altInput: true,
							time_24hr: true,
							altFormat: "d/m/Y"
						};
						break;
					case 'time':
						options_defaults = {
							enableTime: true,
							altInput: true,
							time_24hr: true,
							altFormat: "d/m/Y"
						};
						break;
				}
				$(selector).flatpickr(options_defaults);
			} else {
				if (typeof callback !== "undefined") {
					callback.call(this, selector, type);
				} else {
					this.log("Merci d'include le fichier flatpickr.js sur votre page, voici le lien : https://chmln.github.io/flatpickr/", "error");
				}
			}
		}
		/**
   * une fonction qui éxecute les événements
   * @runEvents
   */

	}, {
		key: 'runEvents',
		value: function runEvents() {
			if (this.events !== null) {
				for (var event in this.events) {
					var event_name = event.split(" ")[0];
					var event_selecteur = event.substring(event_name.length, event.length);
					var call_back = this.events[event];
					this.bindEvent(event_selecteur, event_name, call_back);
				}
			}
		}
		/**
   * Fonction de bind pour les event DOM sur les élements de la page : cette fonction est interne et non utilisable par l'utilisateur
   * @bindEvent
   * @param {String} event - le nom de l'event
   * @param {String} selector - le selector de l'element DOM sur quoi l'event va se lancer
   * @param {String} callback - callback qui s'exécute quand l'event est exécuté
   */

	}, {
		key: 'bindEvent',
		value: function bindEvent(selector, event, callback) {
			var self = this;
			$(selector).unbind(event);
			$(selector).bind(event, function (evt) {
				evt.preventDefault();
				if (callback !== null && typeof self[callback] !== "undefined") {
					var reg = /^#|^./g;
					var new_selector_key = selector.trim();
					if (reg.test(new_selector_key)) {
						new_selector_key = new_selector_key.substring(1, new_selector_key.length);
					}
					var data = self.options_events[new_selector_key];
					self[callback].call(this, evt, self, data);
				} else {
					self.log("La fonction " + callback + " n'est pas défini dans l'objet Utils.", "error");
				}
			});
		}
		/**
   * Fonction pour ajouter un event dans le scope de l'objet Utils
   * @addEvent
   * @param {String} selector - le selector de l'element DOM sur quoi l'event va se lancer
   * @param {String} event_type - le nom de l'event
   * @param {String} callback - callback qui s'exécute quand l'event est exécuté
   */

	}, {
		key: 'addEvent',
		value: function addEvent(selector, event_type, callback, options) {
			this.events[event_type + " " + selector] = callback;
			var reg = /^#|^./g;
			var new_selector = selector.trim();
			if (reg.test(new_selector)) {
				new_selector = new_selector.substring(1, new_selector.length);
			}
			this.options_events[new_selector] = options;
			this.runEvents();
		}
		/**
   * Fonction qui supprime un event de l'objet principale et aussi de la mémoire
   * @removeEvent
   * @param {String} selector - le selector de l'element DOM sur quoi l'event va se supprimer
   */

	}, {
		key: 'removeEvent',
		value: function removeEvent(selector) {
			for (var event in this.events) {
				var event_name = event.split(" ")[0];
				var event_selecteur = event.split(" ")[1];
				if (event_selecteur === selector) {
					$(selector).unbind(event_name);
					delete this.events[event_name + " " + event_selecteur];
				}
			}
		}
		/**
   * Fonction stimule l'événement pour un sélecteur donné
   * @TriggerEvent
   * @param {String} selector - le selector de l'element DOM sur quoi l'event va se simuler
   * @param {String} event - le nom de l'événement
   */

	}, {
		key: 'TriggerEvent',
		value: function TriggerEvent(selector, event) {
			$(selector).trigger(event);
		}
		/**
   * Fonction pour role de créer des evenments personnalisée
   * @addCustomEvent
   * @param {String} name - le nom de l'événement personnalisée
   * @param {Function} callback - la fonction callback returner une fonction pour l'exécuter sur le moment de l'événement personnalisée
   * @param {Object} options -  les options à passer sur le callback de l'événement personnalisée
   */

	}, {
		key: 'addCustomEvent',
		value: function addCustomEvent(name, callback, options) {
			this.customEvents[name] = callback;
			return callback.bind(this, name, options);
		}
		/**
   * Fonction pour valider un formulaire
   * @validate
   * @param {String} form - l'id de l'élement DOM
   * @param {Function} callback - la fonction callback qui s'éxécute dans le cas ou tous testes sur les champs de formulaire sont passé
   */

	}, {
		key: 'validate',
		value: function validate(form, success) {
			this.addEvent(form + " input[type='submit']", "click", "validateForm", { parent: form, success: success });
		}
		/**
   * Fonction interne qui joue le rôle de callback quand tous les testes sont passé
   * @validateForm
   * @param {Object} evt - l'objet événement
   * @param {Object} self - la classe Utils
   * @param {Object} options - des options personnalisée à passer sur le callback de l'événement
   */

	}, {
		key: 'validateForm',
		value: function validateForm(evt, self, options) {
			var nbr_input = $(options.parent).find("input[data-require='true']").length;
			var test_passe = [];
			for (var i = 0; i < nbr_input; i++) {
				var input = $(options.parent).find("input[name]").eq(i);
				var required = $(input).data("require");
				var rule = $(input).data("rule");
				var value = $(input).val();
				if (required === true && typeof required !== "undefined") {
					if (self.is_required(input, "Ce champ est obligatoire")) {
						if (typeof rule !== "undefined") {
							var rule_accept = self[rule](value);
							if (rule_accept.valid) {
								self.addErrorInput(input, false, rule_accept.message);
								test_passe.push(value);
							} else {
								self.addErrorInput(input, true, rule_accept.message);
								test_passe.pop();
							}
						}
					}
				}
			} // for
			if (test_passe.length === nbr_input) {
				var serialize_form = $(options.parent).serializeArray();
				options.success.call(self, self.convertArrayToObject(serialize_form));
			}
		}
		/**
   * Fonction interne qui joue le rôle de convertir une Array de la serialization to un object JS native
   * @convertArrayToObject
   * @param {Array} data - le tableau à convertir
   */

	}, {
		key: 'convertArrayToObject',
		value: function convertArrayToObject(data) {
			if (Array.isArray(data)) {
				var object = {};
				for (var a = 0; a < data.length; a++) {
					object[data[a].name] = data[a].value;
				}
				return object;
			} else {
				return null;
			}
		}
		/**
   * Fonction interne qui joue le rôle de checker si la valeur de l'input est vide ou pas
   * @is_required
   * @param {Object} input - l'élément DOM de l'input
   * @param {Object} message - le message d'erreur dans le cas ou le message est échoué
   */

	}, {
		key: 'is_required',
		value: function is_required(input, message) {
			var value = $(input).val();
			if (value.length > 0 && value !== null && typeof value !== "undefined") {
				return !this.addErrorInput(input, false);
			} else {
				return !this.addErrorInput(input, true, message);
			}
		}
		/**
   * Fonction interne qui joue le rôle de gérer l'afficher les messages d'erreur pour les inputs qui échouée sur le test
   * @addErrorInput
   * @param {Object} input - l'élément DOM de l'input
   * @param {Object} apply - le status pour prendre la décision d'afficher le message d'erreur
   * @param {Object} message - le message d'erreur à afficher
   */

	}, {
		key: 'addErrorInput',
		value: function addErrorInput(input, apply, message) {
			if (apply) {
				$(input).addClass("error");
			} else {
				$(input).removeClass("error");
			}
			if (this.inputErrorHTML !== null && typeof this.inputErrorHTML !== "undefined") {
				this.inputErrorHTML.call(this, input, apply, message);
			}
			return apply;
		}
		/**
   * Fonction interne qui joue le rôle d'afficher les messages d'erreur pour les inputs qui échouée sur le test
   * @inputErrorHTML
   * @param {Object} input - l'élément DOM de l'input
   * @param {Object} etat - le status pour prendre la décision d'afficher le message d'erreur
   * @param {Object} message - le message d'erreur à afficher
   */

	}, {
		key: 'inputErrorHTML',
		value: function inputErrorHTML(input, etat, message) {
			$(input).parent().find('span.msg_error').remove();
			if (etat) {
				$(input).parent().prepend('<span class="msg_error error">' + message + '</span>');
			}
		}
		/**
   * Fonction pour créer une carte maps Google Maps
   * @createMaps
   * @param {String} parent - l'ID de l'élément DOM de la carte
   * @param {Object} coordonnees - les coordonnées pour centrer la carte par défault
   * @param {Object} options - les options de la carte ( zoom, mapTypeId );
   */

	}, {
		key: 'createMaps',
		value: function createMaps(parent, coordonnees, options) {
			var self = this;
			if (typeof options === "undefined") {
				options = { zoom: 5, mapTypeId: google.maps.MapTypeId.ROADMAP };
			}
			window.onload = function () {
				if (typeof window.google === "undefined") {
					this.log('Inclure ce script sur votre page : <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"> </script>', 'error');
				} else {
					var cordonnees_lat_lng = new google.maps.LatLng(coordonnees.lat, coordonnees.lng);
					var mapStyles = [{ featureType: "administrative.country", stylers: [{ visibility: "off" }] }];
					var mapType = new google.maps.StyledMapType(mapStyles, { name: "Maroc" });
					options.center = cordonnees_lat_lng;
					self.maps = new google.maps.Map(document.getElementById(parent), options);
					self.maps.mapTypes.set('maroc', mapType);
					self.maps.setMapTypeId('maroc');
					var layer = new google.maps.FusionTablesLayer({
						query: {
							select: 'geometry',
							from: '1S4aLkBE5u_WS0WMVSchhBgMLdAARuPEjyW4rs20',
							where: "col1 contains 'MAR'"
						},
						styles: [{
							polylineOptions: {
								strokeColor: "#333333",
								strokeWeight: 2
							}
						}],
						suppressInfoWindows: true
					});
					layer.setMap(self.maps);

					var nbr_markers = self.markers.length;
					if (nbr_markers > 0) {
						for (var i = 0; i < nbr_markers; i++) {
							var marker_data = self.markers[i];
							var marker = self.createMarker({ coordonnees: self.convertObjetCords(marker_data.coordonnees), title: marker_data.title, icon: marker_data.icon, index: i, id: marker_data.id });
						} // boucle for
					} // if nbr_markers
				} // else	
			};
		}
		/**
   * Fonction pour créer un marker
   * @createMarker
   * @param {String} selector - le selector de l'element DOM sur quoi l'event va se simuler
   * @param {String} event - le nom de l'événement
   */

	}, {
		key: 'createMarker',
		value: function createMarker(objetMarker) {
			var self = this;
			var marker = new google.maps.Marker({
				position: objetMarker.coordonnees,
				map: self.maps,
				title: objetMarker.title,
				icon: objetMarker.icon
			});
			if (self.acceptInfoWindow) {
				var infowindow = new google.maps.InfoWindow({
					content: self.infosWindow[objetMarker.id]
				});
				marker.addListener('click', function () {
					infowindow.open(self.maps, marker);
				});
			}
			return marker;
		}
		/**
   * Fonction pour créer un marker
   * @convertObjetCords
   * @param {Object} coordonnees - l'object des coordonnées sous format : lat et lng
   */

	}, {
		key: 'convertObjetCords',
		value: function convertObjetCords(coordonnees) {
			return new google.maps.LatLng(coordonnees.lat, coordonnees.lng);
		}
		/**
   * Fonction pour créer un marker
   * @convertAdressToCords
   * @param {String} selector - le selector de l'element DOM sur quoi l'event va se simuler
   * @param {String} event - le nom de l'événement
   */

	}, {
		key: 'convertAdressToCords',
		value: function convertAdressToCords(address, callback) {
			var self = this;
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({ 'address': address }, function (results, status) {
				if (status === "OK" && typeof callback !== "undefined") {
					callback.call(self, results[0].geometry.location.toJSON(), results, status);
				}
			});
		}
	}, {
		key: 'addMarker',
		value: function addMarker(coordonnees, title, icon) {
			if (typeof icon === "undefined") {
				icon = null;
			}
			var id_marker = this.generateID();
			this.markers.push({ coordonnees: coordonnees, title: title, icon: icon, id: id_marker });
			return id_marker;
		}
	}, {
		key: 'addInfoWindow',
		value: function addInfoWindow(content, id) {
			if (typeof content !== "undefined") {
				this.infosWindow[id] = content;
			}
		}
	}, {
		key: 'renderTemplate',
		value: function renderTemplate(objetTemplate) {
			var template = objetTemplate.template;

			var templateURL = objetTemplate.templateURL;
			var data = objetTemplate.data;
			var parent = objetTemplate.parent;
			var self = this;
			if (typeof Handlebars !== "undefined") {
				if (typeof templateURL === "undefined" || templateURL === null || templateURL === "") {
					var source = $(template).html();
					this.render(source, data, parent);
				} else {
					$.get(templateURL, function (template) {
						self.render(template, data, parent);
					});
				}
			} else {
				this.log("Merci d'ajouter le fichier Handlerbars.js sur votre page à partir de cette page : http://handlebarsjs.com/installation.html", "error");
			}
		}
	}, {
		key: 'render',
		value: function render(template, data, parent) {
			var template_compiled = Handlebars.compile(template);
			var rendered = template_compiled(data);
			$(parent).html(rendered);
		}
	}, {
		key: 'getData',
		value: function getData(url, callback) {
			var self = this;
			$.get(url, function (data) {
				if (typeof callback !== "undefined") {
					callback.call(self, data, this);
				}
			});
		}
	}, {
		key: 'fetch',
		value: function fetch(url, callback, error_callback) {
			this.ajax(url, 'GET', null, callback, error_callback);
		}
	}, {
		key: 'update',
		value: function update(url, data, callback, error_callback) {
			this.ajax(url, 'PUT', data, callback, error_callback);
		}
	}, {
		key: 'post',
		value: function post(url, data, callback, error_callback) {
			this.ajax(url, 'POST', data, callback, error_callback);
		}
	}, {
		key: 'ajax',
		value: function ajax(url_ajax, type, data, callback, error_callback) {
			var self = this;
			var data_send = "";
			if (typeof data !== "undefined" && data !== null) {
				data_send = JSON.stringify(data);
			}

			/*if( self.add_in_url.length > 0 ) {
   	self.url_ajax = self.url_ajax+self.add_in_url;
   }*/
			$.ajax({
				url: url_ajax,
				type: type,
				data: data_send,
				cache: false,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				contentType: false, // obligatoire pour de l'upload
				processData: false,
				dataType: 'json',
				success: function success(data) {
					if (typeof callback !== "undefined" && callback !== null) {
						callback.call(self, data, this);
					}
				},
				error: function error(_error, xhr) {
					if (typeof error_callback !== "undefined" && error_callback !== null) {
						error_callback.call(self, xhr, _error, this);
					}
				}
			});
		}

		/**
   * une fonction qui afficher la structure de la classe Utils
   * @help
   */

	}, {
		key: 'help',
		value: function help() {
			this.log("la liste des methodes ");
		}
	}]);

	return Utils;
}(); // class Utils
//# sourceMappingURL=utils.js.map
