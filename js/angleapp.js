/* Minification failed. Returning unminified contents.
(548,6): run-time error JS1004: Expected ';'
(549,10): run-time error JS1004: Expected ';'
 */
/*!
 *
 * Angle - Bootstrap Admin App + MVC
 *
 * Version: 3.4
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

(function(window, document, $, undefined){

  if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }

  $(function(){

    // Restore body classes
    // -----------------------------------
    var $body = $('body');
    new StateToggler().restoreState( $body );

    // enable settings toggle after restore
    $('#chk-fixed').prop('checked', $body.hasClass('layout-fixed') );
    $('#chk-collapsed').prop('checked', $body.hasClass('aside-collapsed') );
    $('#chk-collapsed-text').prop('checked', $body.hasClass('aside-collapsed-text') );
    $('#chk-boxed').prop('checked', $body.hasClass('layout-boxed') );
    $('#chk-float').prop('checked', $body.hasClass('aside-float') );
    $('#chk-hover').prop('checked', $body.hasClass('aside-hover') );

    // When ready display the offsidebar
    $('.offsidebar.hide').removeClass('hide');

  }); // doc ready

})(window, document, window.jQuery);
;
// função para resourcesar os textos javascript
function getLocalizedContent(content, locale = null) {

	if (!content)
		content = 'Conteudo_Funcao';

	if (!locale)
		locale = appCurrent.Culture;

	var culture = locale.substring(0, 2);

	var messages = {
		"pt": {
			'Conteudo_Funcao': "Conteúdo é obrigatório.",
			'Aguarde': "Aguarde ...",
			'Muito_Ruim': "Muito Ruim",
			'Ruim': "Ruim",
			'Bom': "Bom",
			'Muito_Bom': "Muito Bom",
			'Excelente': "Excelente",
			'Erro_Carregar_Item': "Não foi possível carregar este item, por favor, tente novamente.",
			'Erro_Carregar_Categoria': "Erro ao carregar a categoria!",
			'Remover_Cashback': "Não é possivel remover item pedido com cashback aplicado",
			'Selecione': "--- Selecione ---",
			'Valor_Troco': "Valor do troco é maior que o máximo permitido: R$ ",
			'Valor_Troco_Maior_Maximo_Pedido': "Valor do troco deve ser maior que o valor do pedido.",
			'Endereco_Complemento': "Informe um complemento ou marque 'Não tenho'.",
			'Selecione_Operadora': "Selecione a operadora de seu cartão.",
			'Credit_Card_Numero_Invalido': "Número do cartão inválido",
			'Credit_Card_Data_Invalido': "Data inválida",
			'Credit_Card_Nome_Invalido': "Nome do titular do cartão inválido.",
			'Credit_Card_CVC_Invalido': "CVC inválido.",
			'Agendamento': "Faça o agendamento do pedido!",
			'Nome_Completo': "Nome Completo",
			"Ajustar_Localizacao": "Clique em \"Ajustar\" para corrigir a localização!",
			"Selecione_Minimo": "Selecione no mínimo ",
			"Selecione_Maximo": "Selecione no máximo ",
			"Escolha_Minimo": "Escolha no mínimo ",
			"Escolha_Maximo": "Escolha no máximo ",
			"Carrinho_Vazio_Cashback": "Não é possível adicionar o cashback com o carrinho vazio.",
			"Pontos_Insuficientes": "A quantidade de pontos para resgate não foi atingida.",
			"Campos_Nao_Preenchidos": "Campos obrigatórios não informados.",
			"Campos_Invalidos": "Campos inválidos."
		},
		"en": {
			'Conteudo_Funcao': "Content is required.",
			'Aguarde': "Waiting ...",
			'Muito_Ruim': "Too bad",
			'Ruim': "Bad",
			'Bom': "Good",
			'Muito_Bom': "Very good",
			'Excelente': "Great",
			'Erro_Carregar_Item': "Could not load this item, please try again.",
			'Erro_Carregar_Categoria': "Error loading category!",
			'Remover_Cashback': "Unable to remove ordered item with cashback applied.",
			'Selecione': "--- Select ---",
			'Valor_Troco': "Amount is greater than the maximum allowed: $ ",
			'Valor_Troco_Maior_Maximo_Pedido': "Change amount must be greater than the order amount.",
			'Endereco_Complemento': "Enter an add-on or check 'I do not have'.",
			'Selecione_Operadora': "Select your card operator.",
			'Credit_Card_Numero_Invalido': "Número do cartão inválido",
			'Credit_Card_Data_Invalido': "Invalid Date",
			'Credit_Card_Nome_Invalido': "Invalid cardholder name.",
			'Credit_Card_CVC_Invalido': "Invalid CVC.",
			'Agendamento': "Make the order schedule!",
			'Nome_Completo': "Full name",
			"Ajustar_Localizacao": "Click \"Adjust\" to fix the location!",
			"Selecione_Minimo": "select at least ",
			"Selecione_Maximo": "select at most ",
			"Escolha_Minimo": "Choose at least ",
			"Escolha_Maximo": "Choose at most ",
			"Carrinho_Vazio_Cashback": "You cannot add cashback with an empty cart.",
			"Pontos_Insuficientes": "The redemption point threshold has not been reached.",
			"Campos_Nao_Preenchidos": "Mandatory fields not provided.",
			"Campos_Invalidos": "Invalid fields."
		},
		"es": {
			'Conteudo_Funcao': "Se requiere contexto.",
			'Aguarde': "Sostener ...",
			'Muito_Ruim': "Muy Malo",
			'Ruim': "Malo",
			'Bom': "Bien",
			'Muito_Bom': "Muy Bien",
			'Excelente': "Estupendo",
			'Erro_Carregar_Item': "No se pudo cargar este elemento. Vuelve a intentarlo.",
			'Erro_Carregar_Categoria': "¡Error al cargar la categoría!",
			'Remover_Cashback': "No se puede eliminar el artículo pedido con el reembolso aplicado.",
			'Selecione': "--- Seleccione ---",
			'Valor_Troco': "El monto del cambio es mayor que el máximo permitido: $ ",
			'Valor_Troco_Maior_Maximo_Pedido': "El monto del cambio debe ser mayor que el monto del pedido.",
			'Endereco_Complemento': "Ingrese un complemento o marque 'No tengo'.",
			'Selecione_Operadora': "Seleccione su operador de tarjeta.",
			'Credit_Card_Numero_Invalido': "Numero de tarjeta invalido",
			'Credit_Card_Data_Invalido': "Fecha invalida",
			'Credit_Card_Nome_Invalido': "Nombre del titular de la tarjeta no válido.",
			'Credit_Card_CVC_Invalido': "CVC no válido.",
			'Agendamento': "¡Haz el cronograma de pedidos!",
			'Nome_Completo': "Nombre completo",
			"Ajustar_Localizacao": "Haga clic en \"Ajustar\" para corregir la ubicación.",
			"Selecione_Minimo": "Seleccionar al menos ",
			"Selecione_Maximo": "Seleccionar como máximo ",
			"Escolha_Minimo": "Elige al menos ",
			"Escolha_Maximo": "Elegir como máximo ",
			"Carrinho_Vazio_Cashback": "No es posible agregar el cashback con el carrito vacío.",
			"Pontos_Insuficientes": "No se ha alcanzado el umbral de puntos para canjear.",
			"Campos_Nao_Preenchidos": "Campos obligatorios no completados.",
			"Campos_Invalidos": "Campos inválidos."
		}
	}

	return messages[culture][content];
};
/* Add here all your JS customizations */
var text_max = 1000;
var textoAntesAtrelarCarregandoAguarde = "";

var globalSpinner,
    globalSpinnerCentered,
    globalSpinnerSimpleAguarde;

var appCurrent = {
    Culture: 'pt-BR',
    CurrencySymbol: 'BRL',
    DecimalSeparator: ',',
    ThousandsSeparator: '.'
};

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function initCultureApp() {

    var cookieMd = $.cookie("MdCurrent");
    if (!cookieMd)
        return;

    var mdCurrent = JSON.parse(cookieMd);
    if (!mdCurrent)
        return;

    appCurrent = {
        Culture: mdCurrent.CulturaFormato ? mdCurrent.CulturaFormato : appCurrent.Culture,
        CurrencySymbol: mdCurrent.CurrencySymbol ? mdCurrent.CurrencySymbol : appCurrent.CurrencySymbol,
        DecimalSeparator: mdCurrent.DecimalSeparator ? mdCurrent.DecimalSeparator : appCurrent.DecimalSeparator,
        ThousandsSeparator: mdCurrent.DecimalSeparator && mdCurrent.DecimalSeparator == '.' ? ',' : '.'
    };
}

function setExternalAddress() {
    var externalLocaltion = decodeURIComponent(getCookie("ExternalLocation"));  

    if (externalLocaltion && externalLocaltion != "undefined" && externalLocaltion != "null") {
        externalLocaltion = externalLocaltion.replaceAll('+', ' ');

        var externalLocationJson = JSON.parse(externalLocaltion);

        $.ajax({
            type: 'post',
            url: '/endereco/CompletarEndereco',
            data: JSON.stringify({ model: externalLocationJson.CompletarEndereco }),
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('.navbar-header').append(globalSpinner);
                $('#verCarrinho').append(globalSpinner);
                $(".product-item").prop("disabled", true);
            },
            success: function (response) {
                $('#cepModal').html(response);
                if (!($("#cepModal").data('bs.modal') || {}).isShown) {
                    $('#cepModal').modal({ backdrop: 'static', keyborard: false });
                    $('#cepModal').modal('show');
                }
                FormularioCompletarEndereco($('#cepModal'), response);
            },
            complete: function (response) {
                $(".product-item").prop("disabled", false);
                DesAtrelarCarregando();
            }
        });
    }
}

function CarregarDataLoads() {
    $('[data-load]').each(function () {
        $(this).append(globalSpinner).load($(this).data('load'), function () {
            $.validator.unobtrusive.parse(this);
            DesAtrelarCarregando();
        });
    });
}

$(function () {
    initCultureApp();
    initValidations();
    initMasks();

    //init spinners
    globalSpinner = '<div class="spinner-parent"><div class="spinner-container"><i class="fa fa-spinner fa-spin"></i></div></div>';
    globalSpinnerCentered = '<div class="text-center spinner"><i class="fa fa-spinner fa-spin"></i></div>';
    globalSpinnerSimpleAguarde = '<div class="spinner"><i class="fa fa-spinner fa-pulse fa-fw"></i> ' + getLocalizedContent("Aguarde") + '</div>';

    //previnindo navegação para link que executam funções JS
    $(document).on('click', 'a[href="#"]', function (e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
    });

    $(document).on('click', '.sidebarLogout', function () {
        document.getElementById('logoutForm').submit();
    });
    $(document).on('click', '#logoutForm', function (e) {
        $("<input />").attr("type", "hidden")
            .attr("name", "url")
            .attr("value", window.location.pathname)
            .appendTo(this);
        return true;
    });

    //$(document).on('click.dismiss.bs.modal', '[data-dismiss="modal"]', function () {
    //    if ($('.modal.in').length < 1) {
    //        $('.modal').modal('hide');
    //        $('body').removeClass('modal-open');
    //        $('.modal-backdrop').remove();
    //    }
    //});
});

function setCookieId(text) {
    $.cookie('IdPushNotification', text);
    let cookieExiste = $.cookie('IdPushNotification');

    if (!cookieExiste) {
        $.cookie('IdPushNotification', text);
    }
}

function ShowAjaxModal(url, modalId, modalBody) {
    var modalDelay;

    if (!modalBody) {
        modalBody = modalId;
    }

    modalDelay = setTimeout(function () {
        ModalPreCarregamento(modalId);
    }, 300);

    $('#' + modalId).modal('show');

    $.ajax({
        type: "GET",
        url: url,
        cache: false,
        success: function (data) {
            $('#' + modalBody).html(data);            

            var modalData = $("#" + modalId).data('bs.modal');

            if (!modalData || !modalData.isShown) {
                $('#' + modalId).modal({ backdrop: 'static', keyborard: false });
                $('#' + modalId).modal('show');
            }

            initMasks();
            $.validator.unobtrusive.parse($('#' + modalId));
        },
        complete: function () {
            clearTimeout(modalDelay);
            DesAtrelarCarregando();
        }
    });
}

function ShowModalConfirmacao(funcao) {
    if ($('.modal.in').length > 0) {
        var zIndex = parseInt($('.modal.in').css('z-index')) + 10;
        $('#confirmacaoModal').css('z-index', zIndex);
    }
    FuncaoConfirmacaoClick = funcao;
    $('#confirmacaoModal').modal({ backdrop: 'static', keyborard: false });
    $('#confirmacaoModal').modal('show');
    $.validator.unobtrusive.parse($('#confirmacaoModal'));
}

function ModalPreCarregamento(modalId) {
    var identificadorModal = `#${modalId} `;
    if ($(identificadorModal + '.modal-content').length == 0) {
        $(identificadorModal).append(ModalEmptyContentReturn());
    } else {
        if ($(identificadorModal + '.modal-body').length == 0) {
            $(identificadorModal + '.modal-content').append(`<div class="modal-body"></div>`);
        }
    }

    $(globalSpinner).appendTo(identificadorModal + '.modal-body');
}

function ModalEmptyContentReturn() {
    return `<div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="mt mb">
                            <a href="#" data-dismiss="modal" aria-label="Close" class="pull-right text-gray-dark"><span aria-hidden="true"><i class="fa fa-close"></i></span></a>
                        </h3>
                    </div>
                    <div class="modal-body">
                    </div>
                </div>
            </div>`;
}

function initMasks() {
    if (appCurrent.Culture === "pt-BR") {
        var SPMaskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        };

        var spOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            },
            clearIfNotMatch: true
        };

        $('[data-mask-tel]').mask(SPMaskBehavior, spOptions).on('focusout', function (event) {
            var target, phone, element;
            target = (event.currentTarget) ? event.currentTarget : event.srcElement;
            phone = target.value.replace(/\D/g, '');
            element = $(target);
            var re = new RegExp("^\\d{2,3}(0{8,9}|1{8,9}|2{8,9}|3{8,9}|4{8,9}|5{8,9}|6{8,9}|7{8,9}|8{8,9}|9{8,9})$");

            if (!phone.match(re)) {
                if (phone.length > 10) {
                    if (phone.substr(2, 1) != "9")
                        element.val(null);
                }
            }
            else
                element.val(null);
        });

        $('[data-mask="cep"]').mask("00000-000", { clearIfNotMatch: true });

        $('[data-mask="cnpj"]').mask("00.000.000/0000-00", { clearIfNotMatch: true });
        $('[data-mask="rg"]').mask("00.000.000-*");

        $('[data-mask="cscId"]').mask("000000");

        $('[data-mask-cpf="cpf"]').mask("000.000.000-00", { clearIfNotMatch: true });

        $('[data-mask-cpf="cpf"]').on('input keydown keyup mousedown mouseup select contextmenu drop', function (event) {
            this.value = this.value.replace("/[^0-9]/g", '');
        });

        $('[data-mask-cpf="cpf"]').on('change', function (event) {
            if (this.value.length == 0 || this.value.length == 14) {
                this.removeAttribute("style")
            } else {
                this.setAttribute("style", "border-color: #f05050;");
            }
        });
    }
    var numberPlaceholder = new Intl.NumberFormat(appCurrent.Culture, { minimumSignificantDigits: 3 }).format(0.00);    

    $('[data-money="money"]').attr("placeholder", numberPlaceholder);
    $('[data-money="money"]').maskMoney({ thousands: appCurrent.ThousandsSeparator, decimal: appCurrent.DecimalSeparator });
}

function initValidations() {
    if (appCurrent.DecimalSeparator === ",") {
        // campo de data configurado aqui pois o Brasil utiliza esse formato de data e decimal separator
        jQuery.extend(jQuery.validator.methods, {
            date: function (value, element) {
                return this.optional(element) || /^\d\d?\/\d\d?\/\d\d\d?\d?$/.test(value);
            },
            number: function (value, element) {
                return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(value);
            }
        });
    }
}

function ContadorCharacterTexto(input) {
    var text_length = input.val().length;
    var text_remaining = text_max - text_length;
    input.parent().find('.count_message').html(text_length + ' / ' + text_max);
}

function IniciarContadorTexto(quantidadeMaximaTexto) {
    text_max = quantidadeMaximaTexto;
    $('.count_message').html('0 / ' + quantidadeMaximaTexto);
}

function IniciarEscutadorTexto(inputClass) {
    inputClass.on('keypress keyup', function () {
        ContadorCharacterTexto($(this));
    });
}

function IniciarEscutadorTextoModal(inputClass) {
    $('.modal').on('keypress keyup', inputClass, function () {
        ContadorCharacterTexto($(this))
    });
}

$(window).on("load", function (e) {
    $(".aside").removeClass("preload");
});

function corrigeLayoutFacebookBrowser(tipoDistancia) {
    var aDistancia = (tipoDistancia == true) ? 'padding-bottom' : 'margin-bottom'
    if (isFacebookApp()) {
        $('#extra-section').children().css(aDistancia, '55px');
        $('.wrapper').css(aDistancia, '55px');
    }
}

function isFacebookApp() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
}

function FormToObject(formArray) {
    var disabled = formArray.find(':input:disabled').removeAttr('disabled');
    var serialized = formArray.serializeArray();
    disabled.attr('disabled', 'disabled');
    return FormArrayToObject(serialized);
}

function FormArrayToObject(formArray) {
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        if (formArray[i]['name'] !== "__RequestVerificationToken") {
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
    }
    return returnArray;
}

function DesAtrelarCarregando() {
    $("[class*=spinner]").remove();
}

function ConverterMoedaDecimal(numero) {
    var valor;
    var apenasNumeros = ApenasNumeros(numero);
    if (appCurrent.DecimalSeparator === ",") {
        valor = apenasNumeros.replace('.', '').replace(",", '.');
    } else {
        valor = apenasNumeros.replace(',', '');
    }

    return parseFloat(valor);
}

function ApenasNumeros(numero) {
    return numero.replace(/[^0-9,.-]+/g, '');
}

function ParaMoeda(numero) {
    return numero.toLocaleString(appCurrent.Culture, { style: "currency", currency: appCurrent.CurrencySymbol })
}

function AjustarFonteScroll(domEl) {
    if (domEl) {
        var font = 30;
        while (domEl.offsetWidth < domEl.scrollWidth && font > 12) {
            font = font - 1;
            $(domEl).css('font-size', font + 'px');
        }
        if (font < 13)
            $(domEl).css('white-space', 'normal');
    }
}

$(function () {
    $.fn.inputFilter = function (inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    };
});

//function GCaptchaSet(acao = 'submit') {
//    grecaptcha.ready(function () {
//        grecaptcha.execute('6Lfe2nEaAAAAANL9COmlsT-0-FSSEp0od6FLWvu9', { action: acao }).then(function (token) {
//            if (document.getElementById("gRecaptcha")) {
//                var lista = document.getElementsByClassName("gRecaptcha");
//                for (var prop in lista) {
//                    lista[prop].value = token;
//                }
//            }
//        });
//    });
//}

var FuncaoConfirmacaoClick = function () {

}

async function FuncaoEsperar(_funcaoEsperada, _funcaoExecutar) {
    await FunctionPromise(_funcaoEsperada);
    _funcaoExecutar();
}

function FunctionPromise(_funcao) {
    return new Promise((resolve, reject) => {
        _funcao();
        resolve();
    });
}

function AbrirModalBotaoCarregando(botao, metodoAbrirModal) {
    AtrelarCarregandoAguarde(botao);
    FuncaoEsperar(metodoAbrirModal, function () {
        return DesatrelarCarregandoAguarde(botao);
    })
}

function AtrelarCarregandoAguarde(component) {
    textoAntesAtrelarCarregandoAguarde = component.html();
    component.attr("disabled", "disabled").html(globalSpinnerSimpleAguarde);
}

function DesatrelarCarregandoAguarde(component) {
    DesAtrelarCarregando();
    component.prop("disabled", false);
    component.removeAttr('disabled');
    if (textoAntesAtrelarCarregandoAguarde)
        component.html(textoAntesAtrelarCarregandoAguarde);
};
// Start Bootstrap JS
// ----------------------------------- 

(function(window, document, $, undefined){

  $(function(){

    // POPOVER
    // ----------------------------------- 

    $('[data-toggle="popover"]').popover();

    // TOOLTIP
    // ----------------------------------- 

    $('[data-toggle="tooltip"]').tooltip({
      container: 'body'
    });

    // DROPDOWN INPUTS
    // ----------------------------------- 
    $('.dropdown input').on('click focus', function(event){
      event.stopPropagation();
    });

  });

})(window, document, window.jQuery);
;
/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function($, window, document){
  'use strict';

  var Selector = '[data-reset-key]';

  $(document).on('click', Selector, function (e) {
      e.preventDefault();
      var key = $(this).data('resetKey');
      
      if(key) {
        $.localStorage.remove(key);
        // reload the page
        window.location.reload();
      }
      else {
        $.error('No storage key specified for reset.');
      }
  });

}(jQuery, window, document));
;
// GLOBAL CONSTANTS
// ----------------------------------- 


(function(window, document, $, undefined){

  window.APP_COLORS = {
    'primary':                '#5d9cec',
    'success':                '#27c24c',
    'info':                   '#23b7e5',
    'warning':                '#ff902b',
    'danger':                 '#f05050',
    'inverse':                '#131e26',
    'green':                  '#37bc9b',
    'pink':                   '#f532e5',
    'purple':                 '#7266ba',
    'dark':                   '#3a3f51',
    'yellow':                 '#fad732',
    'gray-darker':            '#232735',
    'gray-dark':              '#3a3f51',
    'gray':                   '#dde6e9',
    'gray-light':             '#e4eaec',
    'gray-lighter':           '#edf1f2'
  };
  
  window.APP_MEDIAQUERY = {
    'desktopLG':             1200,
    'desktop':                992,
    'tablet':                 768,
    'mobile':                 480
  };

})(window, document, window.jQuery);

;
// TRANSLATION
// ----------------------------------- 

(function(window, document, $, undefined){

  var preferredLang = 'en';
  var pathPrefix    = '/Content/i18n'; // folder of json files
  var packName      = 'site';
  var storageKey    = 'jq-appLang';

  $(function(){

    if ( ! $.fn.localize ) return;

    // detect saved language or use default
    var currLang = $.localStorage.get(storageKey) || preferredLang;
    // set initial options
    var opts = {
        language: currLang,
        pathPrefix: pathPrefix,
        callback: function(data, defaultCallback){
          $.localStorage.set(storageKey, currLang); // save the language
          defaultCallback(data);
        }
      };

    // Set initial language
    setLanguage(opts);

    // Listen for changes
    $('[data-set-lang]').on('click', function(){

      currLang = $(this).data('setLang');

      if ( currLang ) {
        
        opts.language = currLang;

        setLanguage(opts);

        activateDropdown($(this));
      }

    });
    

    function setLanguage(options) {
      $("[data-localize]").localize(packName, options);
    }

    // Set the current clicked text as the active dropdown text
    function activateDropdown(elem) {
      var menu = elem.parents('.dropdown-menu');
      if ( menu.length ) {
        var toggle = menu.prev('button, a');
        toggle.text ( elem.text() );
      }
    }

  });

})(window, document, window.jQuery);
;
// NAVBAR SEARCH
// -----------------------------------


(function(window, document, $, undefined){

  $(function(){

    var navSearch = new navbarSearchInput();

    // Open search input
    var $searchOpen = $('[data-search-open]');

    $searchOpen
      .on('click', function (e) { e.stopPropagation(); e.preventDefault(); })
      .on('click', navSearch.toggle);

    // Close search input
    var $searchDismiss = $('[data-search-dismiss]');
    var inputSelector = '.navbar-form input[type="text"]';

    $(inputSelector)
      .on('click', function (e) { e.stopPropagation(); })
      .on('keyup', function(e) {
        if (e.keyCode == 27) // ESC
          navSearch.dismiss();
      });

    // click anywhere closes the search
      $(document).on('click', function (e) {
          let navbarFormSelector = $('form.navbar-form input[type="text"]');
          if (navbarFormSelector.val() == '')
            navSearch.dismiss();
      });
    // dismissable options
    $searchDismiss
      .on('click', function (e) { e.stopPropagation(); })
      .on('click', navSearch.dismiss);

  });

  var navbarSearchInput = function() {
    var navbarFormSelector = 'form.navbar-form';
    return {
      toggle: function() {

        var navbarForm = $(navbarFormSelector);
        navbarForm.height(navbarForm.parent().height() - 1);
        navbarForm.toggleClass('open');

        var isOpen = navbarForm.hasClass('open');

        navbarForm.find('input')[isOpen ? 'focus' : 'blur']();

      },

      dismiss: function() {
        $(navbarFormSelector)
          .removeClass('open')      // Close control
          .find('input[type="text"]').blur() // remove focus
          // .val('')                    // Empty input
          ;
      }
    };

  }

})(window, document, window.jQuery);;
// SIDEBAR
// -----------------------------------


(function(window, document, $, undefined){

  var $win;
  var $html;
  var $body;
  var $sidebar;
  var mq;

  $(function(){

    $win     = $(window);
    $html    = $('html');
    $body    = $('body');
    $sidebar = $('.sidebar');
    mq       = APP_MEDIAQUERY;

    // AUTOCOLLAPSE ITEMS
    // -----------------------------------

    var sidebarCollapse = $sidebar.find('.collapse');
    sidebarCollapse.on('show.bs.collapse', function(event){

      event.stopPropagation();
      if ( $(this).parents('.collapse').length === 0 )
        sidebarCollapse.filter('.in').collapse('hide');

    });

    // SIDEBAR ACTIVE STATE
    // -----------------------------------

    // Find current active item
    var currentItem = $('.sidebar .active').parents('li');

    // hover mode don't try to expand active collapse
    if ( ! useAsideHover() )
      currentItem
        .addClass('active')     // activate the parent
        .children('.collapse')  // find the collapse
        .collapse('show');      // and show it

    // remove this if you use only collapsible sidebar items
    $sidebar.find('li > a + ul').on('show.bs.collapse', function (e) {
      if( useAsideHover() ) e.preventDefault();
    });

    // SIDEBAR COLLAPSED ITEM HANDLER
    // -----------------------------------


    var eventName = isTouch() ? 'click' : 'mouseenter' ;
    var subNav = $();
    $sidebar.on( eventName, '.nav > li', function() {

      if( isSidebarCollapsed() || useAsideHover() ) {

        subNav.trigger('mouseleave');
        subNav = toggleMenuItem( $(this) );

        // Used to detect click and touch events outside the sidebar
        sidebarAddBackdrop();
      }

    });

    var sidebarAnyclickClose = $sidebar.data('sidebarAnyclickClose');

    // Allows to close
    if ( typeof sidebarAnyclickClose !== 'undefined' ) {

      $('.wrapper').on('click.sidebar', function(e){
        // don't check if sidebar not visible
        if( ! $body.hasClass('aside-toggled')) return;

        var $target = $(e.target);
        if( ! $target.parents('.aside').length && // if not child of sidebar
            ! $target.is('#user-block-toggle') && // user block toggle anchor
            ! $target.parent().is('#user-block-toggle') // user block toggle icon
          ) {
                $body.removeClass('aside-toggled');
        }

      });
    }

  });

  function sidebarAddBackdrop() {
    var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
    $backdrop.insertAfter('.aside').on("click mouseenter", function () {
      removeFloatingNav();
    });
  }

  // Open the collapse sidebar submenu items when on touch devices
  // - desktop only opens on hover
  function toggleTouchItem($element){
    $element
      .siblings('li')
      .removeClass('open')
      .end()
      .toggleClass('open');
  }

  // Handles hover to open items under collapsed menu
  // -----------------------------------
  function toggleMenuItem($listItem) {

    removeFloatingNav();

    var ul = $listItem.children('ul');

    if( !ul.length ) return $();
    if( $listItem.hasClass('open') ) {
      toggleTouchItem($listItem);
      return $();
    }

    var $aside = $('.aside');
    var $asideInner = $('.aside-inner'); // for top offset calculation
    // float aside uses extra padding on aside
    var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);

    var subNav = ul.clone().appendTo( $aside );

    toggleTouchItem($listItem);

    var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
    var vwHeight = $win.height();

    subNav
      .addClass('nav-floating')
      .css({
        position: isFixed() ? 'fixed' : 'absolute',
        top:      itemTop,
        bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
      });

    subNav.on('mouseleave', function() {
      toggleTouchItem($listItem);
      subNav.remove();
    });

    return subNav;
  }

  function removeFloatingNav() {
    $('.sidebar-subnav.nav-floating').remove();
    $('.dropdown-backdrop').remove();
    $('.sidebar li.open').removeClass('open');
  }

  function isTouch() {
    return $html.hasClass('touch');
  }
  function isSidebarCollapsed() {
    return $body.hasClass('aside-collapsed') || $body.hasClass('aside-collapsed-text');
  }
  function isSidebarToggled() {
    return $body.hasClass('aside-toggled');
  }
  function isMobile() {
    return $win.width() < mq.tablet;
  }
  function isFixed(){
    return $body.hasClass('layout-fixed');
  }
  function useAsideHover() {
    return $body.hasClass('aside-hover');
  }

})(window, document, window.jQuery);;
// TOGGLE STATE
// ----------------------------------- 

(function(window, document, $, undefined){

  $(function(){

    var $body = $('body');
        toggle = new StateToggler();

    $('[data-toggle-state]')
      .on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var element = $(this),
            classname = element.data('toggleState'),
            target = element.data('target'),
            noPersist = (element.attr('data-no-persist') !== undefined);

        // Specify a target selector to toggle classname
        // use body by default
        var $target = target ? $(target) : $body;

        if(classname) {
          if( $target.hasClass(classname) ) {
            $target.removeClass(classname);
            if( ! noPersist)
              toggle.removeState(classname);
          }
          else {
            $target.addClass(classname);
            if( ! noPersist)
              toggle.addState(classname);
          }

        }
        // some elements may need this when toggled class change the content size
        // e.g. sidebar collapsed mode and jqGrid
        $(window).resize();

    });

  });

  // Handle states to/from localstorage
  window.StateToggler = function() {

    var storageKeyName  = 'jq-toggleStateNew';

    // Helper object to check for words in a phrase //
    var WordChecker = {
      hasWord: function (phrase, word) {
        return new RegExp('(^|\\s)' + word + '(\\s|$)').test(phrase);
      },
      addWord: function (phrase, word) {
        if (!this.hasWord(phrase, word)) {
          return (phrase + (phrase ? ' ' : '') + word);
        }
      },
      removeWord: function (phrase, word) {
        if (this.hasWord(phrase, word)) {
          return phrase.replace(new RegExp('(^|\\s)*' + word + '(\\s|$)*', 'g'), '');
        }
      }
    };

    // Return service public methods
    return {
      // Add a state to the browser storage to be restored later
      addState: function(classname){
        var data = $.localStorage.get(storageKeyName);

        if(!data)  {
          data = classname;
        }
        else {
          data = WordChecker.addWord(data, classname);
        }

        $.localStorage.set(storageKeyName, data);
      },

      // Remove a state from the browser storage
      removeState: function(classname){
        var data = $.localStorage.get(storageKeyName);
        // nothing to remove
        if(!data) return;

        data = WordChecker.removeWord(data, classname);

        $.localStorage.set(storageKeyName, data);
      },

      // Load the state string and restore the classlist
      restoreState: function($elem) {
        var data = $.localStorage.get(storageKeyName);

        // nothing to restore
        if(!data) return;
        $elem.addClass(data);
      }

    };
  };

})(window, document, window.jQuery);
;
/**=========================================================
 * Module: utils.js
 * jQuery Utility functions library 
 * adapted from the core of UIKit
 =========================================================*/

(function($, window, doc){
    'use strict';
    
    var $html = $("html"), $win = $(window);

    $.support.transition = (function() {

        var transitionEnd = (function() {

            var element = doc.body || doc.documentElement,
                transEndEventNames = {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    OTransition: 'oTransitionEnd otransitionend',
                    transition: 'transitionend'
                }, name;

            for (name in transEndEventNames) {
                if (element.style[name] !== undefined) return transEndEventNames[name];
            }
        }());

        return transitionEnd && { end: transitionEnd };
    })();

    $.support.animation = (function() {

        var animationEnd = (function() {

            var element = doc.body || doc.documentElement,
                animEndEventNames = {
                    WebkitAnimation: 'webkitAnimationEnd',
                    MozAnimation: 'animationend',
                    OAnimation: 'oAnimationEnd oanimationend',
                    animation: 'animationend'
                }, name;

            for (name in animEndEventNames) {
                if (element.style[name] !== undefined) return animEndEventNames[name];
            }
        }());

        return animationEnd && { end: animationEnd };
    })();

    $.support.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60); };
    $.support.touch                 = (
        ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
        (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
        (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
        false
    );
    $.support.mutationobserver      = (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null);

    $.Utils = {};

    $.Utils.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    $.Utils.removeCssRules = function(selectorRegEx) {
        var idx, idxs, stylesheet, _i, _j, _k, _len, _len1, _len2, _ref;

        if(!selectorRegEx) return;

        setTimeout(function(){
            try {
              _ref = document.styleSheets;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                stylesheet = _ref[_i];
                idxs = [];
                stylesheet.cssRules = stylesheet.cssRules;
                for (idx = _j = 0, _len1 = stylesheet.cssRules.length; _j < _len1; idx = ++_j) {
                  if (stylesheet.cssRules[idx].type === CSSRule.STYLE_RULE && selectorRegEx.test(stylesheet.cssRules[idx].selectorText)) {
                    idxs.unshift(idx);
                  }
                }
                for (_k = 0, _len2 = idxs.length; _k < _len2; _k++) {
                  stylesheet.deleteRule(idxs[_k]);
                }
              }
            } catch (_error) {}
        }, 0);
    };

    $.Utils.isInView = function(element, options) {

        var $element = $(element);

        if (!$element.is(':visible')) {
            return false;
        }

        var window_left = $win.scrollLeft(),
            window_top  = $win.scrollTop(),
            offset      = $element.offset(),
            left        = offset.left,
            top         = offset.top;

        options = $.extend({topoffset:0, leftoffset:0}, options);

        if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
            left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
          return true;
        } else {
          return false;
        }
    };

    $.Utils.options = function(string) {

        if ($.isPlainObject(string)) return string;

        var start = (string ? string.indexOf("{") : -1), options = {};

        if (start != -1) {
            try {
                options = (new Function("", "var json = " + string.substr(start) + "; return JSON.parse(JSON.stringify(json));"))();
            } catch (e) {}
        }

        return options;
    };

    $.Utils.events       = {};
    $.Utils.events.click = $.support.touch ? 'tap' : 'click';

    $.langdirection = $html.attr("dir") == "rtl" ? "right" : "left";

    $(function(){

        // Check for dom modifications
        if(!$.support.mutationobserver) return;

        // Install an observer for custom needs of dom changes
        var observer = new $.support.mutationobserver($.Utils.debounce(function(mutations) {
            $(doc).trigger("domready");
        }, 300));

        // pass in the target node, as well as the observer options
        observer.observe(document.body, { childList: true, subtree: true });

    });

    // add touch identifier class
    $html.addClass($.support.touch ? "touch" : "no-touch");

}(jQuery, window, document));;
/**=========================================================
 * Module: notify.js
 * Create toggleable notifications that fade out automatically.
 * Based on Notify addon from UIKit (http://getuikit.com/docs/addons_notify.html)
 * [data-toggle="notify"]
 * [data-options="options in json format" ]
 =========================================================*/

(function($, window, document){
  'use strict';

  var Selector = '[data-notify]',
      autoloadSelector = '[data-onload]',
      doc = $(document);


  $(function() {

    $(Selector).each(function(){

      var $this  = $(this),
          onload = $this.data('onload');

      if(onload !== undefined) {
        //setTimeout(function(){
          notifyNow($this);
        //}, 800);
      }

      $this.on('click', function (e) {
        e.preventDefault();
        notifyNow($this);
      });

    });

  });

  function notifyNow($element) {
      var message = $element.data('message'),
          options = $element.data('options');

      if(!message)
        $.error('Notify: No message specified');
     
      $.notify(message, options || {});
  }


}(jQuery, window, document));


/**
 * Notify Addon definition as jQuery plugin
 * Adapted version to work with Bootstrap classes
 * More information http://getuikit.com/docs/addons_notify.html
 */

(function($, window, document){

    var containers = {},
        messages   = {},

        notify     =  function(options){

            if ($.type(options) == 'string') {
                options = { message: options };
            }

            if (arguments[1]) {
                options = $.extend(options, $.type(arguments[1]) == 'string' ? {status:arguments[1]} : arguments[1]);
            }

            return (new Message(options)).show();
        },
        closeAll  = function(group, instantly){
            if(group) {
                for(var id in messages) { if(group===messages[id].group) messages[id].close(instantly); }
            } else {
                for(var id in messages) { messages[id].close(instantly); }
            }
        };

    var Message = function(options){

        var $this = this;

        this.options = $.extend({}, Message.defaults, options);

        this.uuid    = "ID"+(new Date().getTime())+"RAND"+(Math.ceil(Math.random() * 100000));
        this.element = $([
            // alert-dismissable enables bs close icon
            '<div class="uk-notify-message alert-dismissable">',
                '<a class="close">&times;</a>',
                '<div>'+this.options.message+'</div>',
            '</div>'

        ].join('')).data("notifyMessage", this);

        // status
        if (this.options.status) {
            this.element.addClass('alert alert-'+this.options.status);
            this.currentstatus = this.options.status;
        }

        this.group = this.options.group;

        messages[this.uuid] = this;

        if(!containers[this.options.pos]) {
            containers[this.options.pos] = $('<div class="uk-notify uk-notify-'+this.options.pos+'"></div>').appendTo('body').on("click", ".uk-notify-message", function(){
                $(this).data("notifyMessage").close();
            });
        }
    };


    $.extend(Message.prototype, {

        uuid: false,
        element: false,
        timout: false,
        currentstatus: "",
        group: false,

        show: function() {

            if (this.element.is(":visible")) return;

            var $this = this;

            containers[this.options.pos].show().prepend(this.element);

            var marginbottom = parseInt(this.element.css("margin-bottom"), 10);

            this.element.css({"opacity":0, "margin-top": -1*this.element.outerHeight(), "margin-bottom":0}).animate({"opacity":1, "margin-top": 0, "margin-bottom":marginbottom}, function(){

                if ($this.options.timeout) {

                    var closefn = function(){ $this.close(); };

                    $this.timeout = setTimeout(closefn, $this.options.timeout);

                    $this.element.hover(
                        function() { clearTimeout($this.timeout); },
                        function() { $this.timeout = setTimeout(closefn, $this.options.timeout);  }
                    );
                }

            });

            return this;
        },

        close: function(instantly) {

            var $this    = this,
                finalize = function(){
                    $this.element.remove();

                    if(!containers[$this.options.pos].children().length) {
                        containers[$this.options.pos].hide();
                    }

                    delete messages[$this.uuid];
                };

            if(this.timeout) clearTimeout(this.timeout);

            if(instantly) {
                finalize();
            } else {
                this.element.animate({"opacity":0, "margin-top": -1* this.element.outerHeight(), "margin-bottom":0}, function(){
                    finalize();
                });
            }
        },

        content: function(html){

            var container = this.element.find(">div");

            if(!html) {
                return container.html();
            }

            container.html(html);

            return this;
        },

        status: function(status) {

            if(!status) {
                return this.currentstatus;
            }

            this.element.removeClass('alert alert-'+this.currentstatus).addClass('alert alert-'+status);

            this.currentstatus = status;

            return this;
        }
    });

    Message.defaults = {
        message: "",
        status: "normal",
        timeout: 2000,
        group: null,
        pos: 'top-center'
    };


    $["notify"]          = notify;
    $["notify"].message  = Message;
    $["notify"].closeAll = closeAll;

    return notify;

}(jQuery, window, document));
;
