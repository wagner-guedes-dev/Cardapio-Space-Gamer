/* Minification failed. Returning unminified contents.
(1509,6): run-time error JS1004: Expected ';'
(1511,25): run-time error JS1004: Expected ';'
 */
var $modalPendente;
var titleOg;
var descriptionOg;
var imageOg;
var urlOg;

var currentCategory;

function AjustarFonteProduto(el) {
    $('.product-title').css('font-size', '');
    var domEl = $('.product-title').get(0);
    AjustarFonteScroll(domEl);
    AjustarPaddingItemModal();
}

//Carregar detalhes
function CarregarItemDetalhes(uuid) {
    var disabled = $('#btnItemSubmit').attr('disabled');
    $('#btnItemSubmit').attr('disabled', 'disabled');
    $('#itemModal .modal-content #etapa1detalhes').html(globalSpinnerCentered).load('/pedido/cardapioitemdetalhes/' + uuid, function (response, status, xhr) {
        if (status === 'success') {
            $.validator.unobtrusive.parse(this);
            if (!disabled)
                $('#btnItemSubmit').removeAttr('disabled');
        } else {
            $.notify('<i class="fa fa-warning"></i> ' + getLocalizedContent("Erro_Carregar_Item"));
            $('#itemModal').modal('hide');
        }
    });
}

function AjustarPaddingItemModal() {
    if (window.matchMedia("(max-width: 767px)").matches) {
        var heightHeader = $('#itemModal .modal-header').outerHeight(true) || 67;
        $('#itemModal .modal-body').css('padding-top', (heightHeader + 0) + "px");
    }
    else {
        $('#itemModal .modal-body').css('padding-top', '');
    }
}

function validarPergunta($pergunta) {
    var errorMessage = null;
    var perguntaId = $pergunta.data('id');

    var $listOpcoes = $('[data-parent=' + perguntaId + ']');

    // TODO: ajustar resources

    if ($listOpcoes.filter('input[type="radio"]').length > 0) { // Validar radio
        var radioChecked = $listOpcoes.filter('input[type="radio"]:checked').length;

        if (radioChecked < $pergunta.data('opc-min'))
            errorMessage = 'Selecione no mínimo ' + $pergunta.data('opc-min');

        if (radioChecked < $pergunta.data('item-min'))
            errorMessage = 'Selecione no mínimo ' + $pergunta.data('item-min');

        if ($pergunta.data('opc-max') > 0 && radioChecked > $pergunta.data('opc-max'))
            errorMessage = 'Selecione no máximo ' + $pergunta.data('opc-max');

    }
    else if ($listOpcoes.filter('input[type="checkbox"]').length > 0) { // Validar checkbox
        var checkboxChecked = $listOpcoes.filter('input[type="checkbox"]:checked').length;

        if (checkboxChecked < $pergunta.data('opc-min'))
            errorMessage = 'Selecione no mínimo ' + $pergunta.data('opc-min');

        if (checkboxChecked < $pergunta.data('item-min'))
            errorMessage = 'Selecione no mínimo ' + $pergunta.data('item-min');

        if ($pergunta.data('opc-max') > 0 && checkboxChecked > $pergunta.data('opc-max'))
            errorMessage = 'Selecione no máximo ' + $pergunta.data('opc-max');
    }
    else {  // Validar numbers
        var numberChecked = 0;
        var numberTotal = 0;
        $listOpcoes.filter('input[type="number"]').each(function () {
            var valorInformado = parseInt($(this).val()) || 0;

            numberTotal += valorInformado;

            if (valorInformado > 0)
                numberChecked++;
        });

        if (numberChecked < $pergunta.data('opc-min'))
            errorMessage = getLocalizedContent("Selecione_Minimo") + $pergunta.data('opc-min');

        if ($pergunta.data('opc-max') > 0 && numberChecked > $pergunta.data('opc-max'))
            errorMessage = getLocalizedContent("Selecione_Maximo") + $pergunta.data('opc-max');

        if (numberTotal < $pergunta.data('item-min'))
            errorMessage = getLocalizedContent("Escolha_Minimo") + $pergunta.data('item-min');

        if ($pergunta.data('item-max') > 0 && numberTotal > $pergunta.data('item-max'))
            errorMessage = getLocalizedContent("Escolha_Maximo") + $pergunta.data('item-max');
    }

    if (errorMessage) {
        ExibirErro(perguntaId, errorMessage);
        return false;
    }
    else {
        return true;
    }
}

function OnBeginAdd() {
    var formValid = true;

    $('[data-pergunta]').each(function () {
        var isValid = validarPergunta($(this));

        if (!isValid) {
            formValid = false;
            return false;
        }
    });

    if (!formValid)
        return false;

    $(globalSpinner).appendTo("#itemModal .modal-content");
}

function OnSuccessAdd(response) {
    if (response) {
        if (response.status) {
            if (response.status === 201 || response.status === 200) {
                atualizarCarrinho();
                $('#itemModal').modal("hide");
            }
            else if (response.status === 409) { //Opções de resposta não encontradas 
                $.notify("<i class='fa fa-" + response.icon + "'></i> " + response.message);
                // recarrega perguntas para tentar resolver
                var guidProduto;
                if ($('input[name*="CodigoTamanhoSelecionado"]:checked').length > 0) // Se for produto por tamanho
                    guidProduto = $('input[name*="CodigoTamanhoSelecionado"]:checked').data("uuid");
                else
                    guidProduto = $('#Produto_CodigoGuid').val();
                CarregarItemDetalhes(guidProduto);
            }
            else if (response.status === 400 || response.status === 404 || response.status === 500) {
                if (response.id) {
                    ExibirErro(response.id, response.message);
                }
                else
                    $.notify("<i class='fa fa-" + response.icon + "'></i> " + response.message);
            }
        }
        else {
            $("#etapa1").hide();
            $("#etapa2").html(response).show();
            $('#btnItemSubmit i').toggleClass('fa-arrow-right', false);
            $('#btnItemSubmit i').toggleClass('fa-plus', true);
        }
        DesAtrelarCarregando();
        //$("#itemModal .modal-content .spinner-parent").remove();
    }
}

function ExibirErro(perguntaId, mensagem) {
    var $el = $('[data-pergunta][value=' + perguntaId + ']').parents('.panel');
    $('#itemModal .modal-body').scrollTop($('#itemModal .modal-body').scrollTop() + $el.offset().top - 70); // 70 >> offset para top fixp
    $el.find('input:visible:first').focus();
    $el.animo({
        animation: "shake"
    });
    var customVal = $el.closest('form').validate();
    var input = $('[data-pergunta][value="' + perguntaId + '"]');
    customVal.showErrors(JSON.parse('{ "' + $(input).attr('name') + '": "' + mensagem + '"}'));
}

function atualizarCarrinho() {
    $.ajax({
        type: 'post',
        url: '/pedido/carrinho',
        data: { resume: true },
        dataType: "json",
        beforeSend: function () {
            $('.navbar-header').append(globalSpinner);
            $('#verCarrinho').append(globalSpinner);
            $(".product-item").prop("disabled", true);
        },
        success: function (response) {
            $('.carrinho-qtd').empty();
            var quantidadeItemCarrinho = 0;

            $(response.Itens).each(function (index) {
                if (this.Quantidade == 0) {
                    quantidadeItemCarrinho += 1;
                }
                else {
                    quantidadeItemCarrinho += this.Quantidade;
                }
            });

            if (quantidadeItemCarrinho > 0) {
                $(".carrinho-qtd").append(quantidadeItemCarrinho);
                $(".carrinho-qtd").parent().animo({
                    animation: "tada"
                });
                $('#verCarrinho').toggleClass('hide', !(Number(quantidadeItemCarrinho) > 0));
                //AbreModalEnderecoQuandoSemEndereco();
            }
        },
        complete: function (response) {
            $(".product-item").prop("disabled", false);
            DesAtrelarCarregando();
        }
    });
}

//Início - Localização
var placeSearch, autocomplete;


function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    var logradouro, bairro, cidade, estado, postalCode, placeId;

    estado = $('#Estabelecimento.EndEstado').val(); // **BUG** - Definido na view Cardapio >> Google não retorna estado (uf), utilizar estado (uf) Default

    if (place.types[0] !== "route")
        placeId = place.place_id;

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];

        if (addressType === "route")
            logradouro = place.address_components[i].short_name || place.address_components[i].long_name;

        else if (addressType === "sublocality_level_1" || addressType === "sublocality")
            bairro = place.address_components[i].long_name;

        else if (addressType === "administrative_area_level_2" || addressType === "locality")
            cidade = place.address_components[i].long_name;

        else if (addressType === "administrative_area_level_1")
            estado = place.address_components[i].short_name;

        else if (addressType === "postal_code")
            postalCode = place.address_components[i].long_name;

        else if (addressType === "country" && place.address_components[i].short_name !== "BR")
            estado = cidade = "";

        else if (addressType === "street_number")
            $('#Numero').val(place.address_components[i].short_name || place.address_components[i].long_name);
    }

    if (!logradouro && place.formatted_address)
        logradouro = place.formatted_address.split(",")[0];

    if (logradouro && cidade && estado) {
        $('#Logradouro').val(logradouro);
        var cidades = $("#Cidade");
        cidades.empty();
        cidades.append($('<option selected></option>').val(cidade).text(cidade));
        cidades.attr('value', cidades.val());
        $('#Cidade').val(cidade);
        $('#Estado').val(estado);
        $('#Estado').attr('value', estado);
        $('#Bairro').val(bairro);
        $('#Cep').val(postalCode);
        $('#PlaceIdGoogle').val(placeId);
        $('#Numero').focus();
    }
    else {
        $('#Logradouro').val(null);
        $('#Cidade').val(null);
        $('#Estado').val(null);
        $('#Bairro').val(null);
        $('#Cep').val(null);
        $('#PlaceIdGoogle').val(null);
        $('#EnderecoCompletoGoogle').val(null);
    }
}
//Fim - Localização

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function LimparItemUrlProdutoItem() {
    var sURLVariables = window.location.search.substring(1)
    var url = sURLVariables.split('&');

    if (sURLVariables.indexOf('produto') >= 0 || sURLVariables.indexOf('item') >= 0) {
        for (var i = 0; i < url.length; i++) {
            var sParameterName = url[i].split('=');
            if (sParameterName[0] == 'produto' || sParameterName[0] == 'item') {
                const index = url.indexOf(i);
                url.splice(index, 1);
                i--;
            }
        }
    }
    if (url && url.toString().length >= 1) {
        window.history.pushState(null, "", location.pathname + '?' + url.toString());
    }
    else {
        window.history.pushState(null, "", location.pathname);
    }
}

function LimparItemUrl() {
    var sURLVariables = window.location.search.substring(1).split('&');

    if (sURLVariables.length >= 1) {
        if (sURLVariables[0]) {
            sURLVariables = sURLVariables[0];
        }
    }

    window.history.pushState(null, "", location.pathname + '?' + sURLVariables);
}

function AbreItemUrl() {
    var item = GetURLParameter('item');
    if (item) {
        item = decodeURIComponent(item);
        var produto = GetURLParameter('produto');
        if (produto) produto = decodeURIComponent(produto);
        $('#itemModal').modal('show', $('<a data-uuid="' + item + '" data-name="' + produto + '"></a>'));
    }
}

function AbreModalEnderecoQuandoSemEndereco() {
    if (ExisteLocalizacaoQuantidadeCarrinho()) {
        AbreModalEndereco();
    }
}

function AbreModalEndereco() {
    ShowAjaxModal('/endereco/listarendereco', 'cepModal');
}

function FinalizarPedidoCarrinho() {
    if ($(".carrinho-qtd").html() >= 1) {
        $('#verCarrinho').append(globalSpinner);
        window.location.href = 'pedido/checkout';
    }
}

function ExisteLocalizacaoQuantidadeCarrinho() {
    if (!ExisteCookie("MdCurrentLoc") && $(".carrinho-qtd").html() >= 1) {
        return true;
    }
    return false;
}

function ExisteCookie(nomeCookie) {
    if (JSON.parse(unescape(decodeURI(getCookie(nomeCookie))))) {
        return true;
    }
    else {
        return false;
    }
}

function AdicionaMudaUrlItem(nome, valor) {
    var sPageURL = window.location.search.substring(1);
    sPageURL = RetornaUrlItem(sPageURL, nome, valor);
    window.history.pushState(null, "", location.pathname + '?' + sPageURL);
}

function AdicionaMudaUrlItemArray(arrayNomeValor) {
    var sPageURL = window.location.search.substring(1);
    for (var i = 0; i < arrayNomeValor.length; i++) {
        sPageURL = RetornaUrlItem(sPageURL, arrayNomeValor[i].nome, arrayNomeValor[i].valor);
    }

    window.history.pushState(null, "", location.pathname + '?' + sPageURL);
}

function RetornaUrlItem(url, nome, valor) {
    var sURLVariables = url.split('&');

    if (url.indexOf(nome) >= 0) {
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == nome) {
                sURLVariables[i] = nome + '=' + TrataValorParametroUrl(valor);
            }
        }
        url = sURLVariables.join('&');
    }
    else {
        if (sURLVariables.length >= 1) {
            if (sURLVariables[0]) {
                url += '&';
            }
        }
        url += nome + '=' + TrataValorParametroUrl(valor);
    }
    return url;
}

function TrataValorParametroUrl(valor) {
    return valor.toString().replace(/\s/g, '+').toLowerCase();
}

// Carrega todos os produtos do panel collapse da categoria passada
function carregarProdutosPorCategoria($categoriaItemPanelCollapse) {
    var dataCategoria = $categoriaItemPanelCollapse.data('categoria');
    var dataCategoryGuid = $categoriaItemPanelCollapse.data('categoryguid');
    var timestamp = window.localStorage.getItem('cache-timestamp');



    if ($.isNumeric(dataCategoria)) {
        $categoriaItemPanelCollapse.data('loaded', true);
        $categoriaItemPanelCollapse.load(`/home/getproductsbycategory?categoryId=${dataCategoria}&currentUrl=${window.location.host}&categoryGuid=${dataCategoryGuid}&v=${timestamp}`, function () {
            //animação onload image
            $('.imagem').one('load', function () {
                $(this).removeClass('animated pulse infinite');
            });

            if ($categoriaItemPanelCollapse.data('searching') == true) {
                $categoriaItemPanelCollapse.removeData('searching');
                filtrarProdutos($categoriaItemPanelCollapse);
            }
        });
    }
    else {
        console.log(getLocalizedContent("Erro_Carregar_Categoria"));
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Filtrar produtos dentro do panel collapse da categoria selecionada
function filtrarProdutos($element) {
    $element.find('.products > div').removeClass('hidden'); // exibir todos produtos
    $element.find('.products .name').find('mark').contents().unwrap(); //remove before highlight
    var termo = $('#search').val(); // obter valor pesquisado
    if (termo !== "" && termo.length > 2) { // se valor possui 3 ou mais carateres vai pesquisar

        termo.split(' ').forEach(function (termoParcial) {
            var $products = $element.find('.products > div');

            if (termoParcial.length > 2) {
                $products.filter(':not(:contains("' + termoParcial + '"))').addClass('hidden');
                //highlight
                var re = new RegExp('(' + escapeRegExp(termoParcial).trim().split(/\s+/).join('|') + ')(?!([^<]+)?>)', "gi");
                $products.find('.name').html(function (i, html) {
                    return html.replace(re, '<mark>$1</mark>');
                });
            }
            if ($products.filter(':not(.hidden)').length > 0 || ($element.data('searching') == true && $element.data('loaded') == false)) {
                $element.parent().removeClass('hidden');
            }
            else {
                $element.parent().addClass('hidden');
            }

            $('#notfound').toggleClass('hidden', $('.categories .panel:not(.hidden)').length > 0);
        });
        $('.categories').css('min-height', 0);
    }
    else {
        $('#notfound').addClass('hidden');
        $element.parent().removeClass('hidden');
    }
}

//Verifica se o elemento está visível total ou parcial na view
function isScrolledIntoView(element, fullyInView) {
    var pageTop = $(window).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var elementTop = $(element).offset().top;
    var elementBottom = elementTop + $(element).height();

    if (fullyInView === true) {
        return ((pageTop < elementTop) && (pageBottom > elementBottom));
    } else {
        return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
    }
}

function SalvarMetaOg() {
    titleOg = $('meta[property="og:title"]').attr('content');
    descriptionOg = $('meta[property="og:description"]').attr('content');
    imageOg = $('meta[property="og:image"]').attr('content');
    urlOg = $('meta[property="og:url"]').attr('content');
}

function ReaplicarMetaOg(title, description, image, url) {
    $("head").append('<meta property="og:title" content=" ' + titleOg + '">');
    $("head").append('<meta property="og:description" content=" ' + description + '">');
    $("head").append('<meta property="og:image" content=" ' + image + '">');
    $("head").append('<meta property="og:url" content=" ' + url + '">');
}

function RemoverMetaOg() {
    $('meta[property="og:title"]').remove();
    $('meta[property="og:description"]').remove();
    $('meta[property="og:image"]').remove();
    $('meta[property="og:url"]').remove();
}

$(document).ready(function () {
    addEventListener("beforeunload", (event) => { DesAtrelarCarregando(); });

    //Esse lance abaixo faz com que funcione o overlay quando tem modal sobre modal
    $(document).on('show.bs.modal', '.modal', function () {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function () {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });

    $('.modal').on('shown.bs.modal', function (e) {
        $('html').addClass('freezePage');
        $('body').addClass('freezePage');
    });
    $('.modal').on('hidden.bs.modal', function (e) {
        $('html').removeClass('freezePage');
        $('body').removeClass('freezePage');
    });

    $('form.navbar-form').submit(function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(".cardapio-body").offset().top
        }, 500);
    });

    jQuery.expr[":"].contains = jQuery.expr.createPseudo(function (arg) {
        return function (elem) {
            return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
        };
    });

    //  Início - Eventos de Touch
    var touchStartX = 0;
    var touchEndX = 0;
    var touchStartY = 0;
    var touchEndY = 0;
    $(document).on("touchstart", ".modal-content", function (event) {
        touchStartX = event.originalEvent.changedTouches[0].screenX;
        touchStartY = event.originalEvent.changedTouches[0].screenY;
    });

    $(document).on("touchend", ".modal-content", function (event) {
        touchEndX = event.originalEvent.changedTouches[0].screenX;
        touchEndY = event.originalEvent.changedTouches[0].screenY;
        if (Math.abs(touchEndX - touchStartX) > Math.abs(touchEndY - touchStartY) && Math.abs(touchEndY - touchStartY) < 35 && Math.abs(touchEndX - touchStartX) > 75) {
            if (touchEndX > touchStartX) {
                $(this).parents('.modal').modal("hide");
            } else if (touchEndX < touchStartX) {
                //
            }
        }
    });
    // Fim - Eventos de Touch

    function escapeHtmlCardapioItem() {
        $("#cardapioItemForm").on("submit", function () {
            String.prototype.escape = function () {
                var tagsToReplace = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;'
                };
                return this.replace(/[&<>]/g, function (tag) {
                    return tagsToReplace[tag] || tag;
                });
            };

            $('#Produto_NomeProdutoCompleto, #Produto_NomeProduto, #Produto_NomePersonalizado, #Produto_Descricao').each(function () {
                var encodedValue = $(this).val().escape();
                $(this).val(encodedValue);
            });
        })
    }

    $('#itemModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var itemId = button.data('uuid');

        if (itemId) {
            arrayNomeValor = [{ nome: "produto", valor: button.data('name') }, { nome: "item", valor: itemId }]
            AdicionaMudaUrlItemArray(arrayNomeValor);
            $('#itemModal .modal-content').html('');
            var $loading = $(globalSpinner);
            $loading.appendTo("#itemModal .modal-content");
            $('#itemModal .modal-content').load('/pedido/cardapioitem/' + itemId, function (response, status, xhr) {

                if (xhr.status != 200) {
                    if (xhr.status == 404) {
                        window.localStorage.setItem('cache-timestamp', new Date().getTime());
                        window.location.href = "/";
                    } else {
                        $.notify('<i class="fa fa-warning"></i> ' + getLocalizedContent("Erro_Carregar_Item"));
                    }

                    $('#itemModal').modal('hide');
                    return;
                }

                escapeHtmlCardapioItem();

                $.validator.unobtrusive.parse(this);

                AjustarPaddingItemModal();

                var guidProduto;
                if ($('input[name*="CodigoTamanhoSelecionado"]').length > 0) // Se for produto por tamanho
                    guidProduto = $('input[name*="CodigoTamanhoSelecionado"]:checked').data("uuid");
                else
                    guidProduto = $('#Produto_CodigoGuid').val();
                if (guidProduto) {
                    CarregarItemDetalhes(guidProduto);
                }

                $('#itemModal .modal-body').on('scroll', function () {
                    var scroll = $(this).scrollTop();

                    $('#itemModal .modal-header').toggleClass('header-shrink', scroll > 80);
                });

                $('#itemModal .modal-header').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                    AjustarPaddingItemModal();
                });

                SalvarMetaOg();
                RemoverMetaOg();
                var nomeProduto = $('#Produto_NomeProduto').val();
                var descricao = $('#Produto_Descricao').val();
                ReaplicarMetaOg(nomeProduto, descricao, $('#Produto_UrlImagem').val(), window.location.href);

            });
        }
    });

    $('#itemModal').on('shown.bs.modal', function (e) {
        AjustarFonteProduto();
        IniciarContadorTexto(140);
    });

    $('#itemModal').on('hidden.bs.modal', function () {
        LimparItemUrlProdutoItem();
        RemoverMetaOg();
        ReaplicarMetaOg(titleOg, descriptionOg, imageOg, window.location.href);
    })

    // Início - Alteração de opções (Tamanhos, Partes, Complementos, Perguntas)
    $(document).on('change', 'input[name*=CodigoTamanhoSelecionado]', function () {
        CarregarItemDetalhes($('input[name*="CodigoTamanhoSelecionado"]:checked').data("uuid"));
        atualizarValorTotal();
    });

    $(document).on('change', 'input[name*=CodigosPartesSelecionadas]', function () {
        var qtdMaximaPartes = $('input[name*="CodigoTamanhoSelecionado"]:checked').data("qtdmaximapartes");
        var qtdPartesSelecionadas = $('input[name*=CodigosPartesSelecionadas]:checked').length;
        if (qtdPartesSelecionadas === 1) {  //Por Tamanho Inteiro
            $('.meioameio').toggleClass("hide", true);
            $('#Quantidade').data('val-range-max', $('#Quantidade').data('val-range-max-old'));
            $('#Quantidade').removeData('val-range-max-old');
        }
        else {
            if (qtdPartesSelecionadas > qtdMaximaPartes) {
                $(this).prop("checked", false);
                $(this).parent().animo({ animation: "shake" });
                $('#QuantidadeMaximaPartes').parent().animo({ animation: "shake" });
            }
            else {
                $('.meioameio').removeClass("hide");
            }
        }

        atualizarValorTotal();
    });

    $(document).on('change', '#Quantidade', function () {
        var qtd = parseFloat($('#Quantidade').val() || 1);

        if (!qtd || qtd < $('#Quantidade').data("val-range-min")) {
            qtd = $('#Quantidade').data("val-range-min");
            $('#Quantidade').val(qtd);
        }
        else if (qtd > $('#Quantidade').data("val-range-max")) {
            qtd = $('#Quantidade').data("val-range-max");
            $('#Quantidade').val(qtd);
        }

        atualizarValorTotal();
    });

    //$(document).on('change', 'input[name*=ComplementosSelecionados]', function () {
    //});

    //Validando respostas do tipo checkbox e radio
    $(document).on('change', 'input[type=checkbox][data-parent],input[type=radio][data-parent]', function () {
        var parent = $(this).data('parent');
        var $pergunta = $('[data-id="' + parent + '"]');
        var qtdChecked = $('input[type="checkbox"][data-parent="' + parent + '"]:checked,input[type="radio"][data-parent="' + parent + '"]:checked').length;

        //if (checkboxChecked < $pergunta.data('opc-min'))
        //    errorMessage = 'Selecione no mínimo ' + $pergunta.data('opc-min');

        if ($pergunta.data('opc-max') > 0 && qtdChecked > $pergunta.data('opc-max')) {
            $(this).prop('checked', false);
            $(this).parent().animo({ animation: "shake" });
            $(this).parents('.panel').children('.panel-heading').animo({ animation: "shake" });
        }

        atualizarValorTotal();
    });

    //Validando qtd do complemento
    $(document).on('change', 'input[type=number][data-precovenda]', function () {
        var qtdComplemento = parseInt($(this).val()) || 0;
        var oldValue = parseInt($(this).data('old') || $(this).data("val-range-min")) || 0;

        if (Number.isNaN(parseInt($(this).val())) || qtdComplemento < $(this).data("val-range-min")) {
            qtdComplemento = $(this).data("val-range-min");
            $(this).val(oldValue);
        }
        else if (qtdComplemento > $(this).data("val-range-max")) {
            qtdComplemento = $(this).data("val-range-max");
            $(this).val(oldValue);
        }

        var parent = $(this).data('parent');
        if (parent) {
            var $pergunta = $('[data-id="' + parent + '"]');
            var isValid = true;
            var numberChecked = 0;
            var numberTotal = 0;
            $('input[type="number"][data-parent="' + parent + '"]').each(function () {
                var valorInformado = parseInt($(this).val()) || 0;

                numberTotal += valorInformado;

                if (valorInformado > 0)
                    numberChecked++;
            });

            if ($pergunta.data('opc-max') > 0 && numberChecked > $pergunta.data('opc-max'))
                isValid = false;

            else if ($pergunta.data('item-max') > 0 && numberTotal > $pergunta.data('item-max'))
                isValid = false;

            // Durante a edição não está habilitada a validação de opções mínimas para permitir voltar ao estado original: 0
            ////else if (numberChecked < $pergunta.data('opc-min'))
            ////    isValid = false;
            ////else if (numberTotal < $pergunta.data('item-min'))
            ////    isValid = false;

            if (!isValid) {
                $(this).val(oldValue);
                $(this).parent().animo({ animation: "shake" });
                $(this).parents('.panel').children('.panel-heading').animo({ animation: "shake" });

            }
        }

        //atualizar valor
        $(this).data('old', $(this).val());

        atualizarValorTotal();
    });
    // Fim - Alteração de opções (Tamanhos, Partes, Complementos, Perguntas)

    //Calcular valor total
    var timerValorTotal, delayValorTotal = 500;
    function atualizarValorTotal() {
        clearTimeout(timerValorTotal);
        timerValorTotal = setTimeout(function () {
            var preco = $('#Produto_ValorVenda').data('valor-venda')

            var precoVenda = parseFloat(preco);

            var qtd = parseFloat($('#Quantidade').val() || 1);
            var qtdPartes = $('input[name*=CodigosPartesSelecionadas]:checked').length;

            if ($('input[name*=CodigoTamanhoSelecionado]:checked').length > 0) { // Por tamanho

                if (qtdPartes === 0) { // Por tamanho sem meio-a-meio
                    precoVenda = parseFloat($('input[name*=CodigoTamanhoSelecionado]:checked').data('precovenda'));
                }
                else { // Pode ser meio-a-meio
                    var cobrarPeloMaiorValor = $('#CobrarPeloMaiorValor').val() === "true";

                    var valorParte = []; // Array com todos os valores das partes selecionadas

                    $('input[name*=CodigosPartesSelecionadas]:checked').each(function () {
                        valorParte.push(parseFloat($(this).data("precovenda")));
                    });

                    if (cobrarPeloMaiorValor) {
                        precoVenda = Math.max.apply(Math, valorParte);
                    }
                    else {
                        precoVenda = 0;
                        $.each(valorParte, function () {
                            precoVenda += this / qtdPartes;
                        });
                    }
                }
            }

            var complementos = 0;
            $('#itemModal input[type=number][data-precovenda]').each(function () {
                var qtdComplemento = parseInt($(this).val()) || 0;

                if (qtdComplemento > 0) {
                    var valorComplemento = parseFloat($(this).data("precovenda"));
                    if (this.name.indexOf("PartesSelecionadas") > -1) {
                        valorComplemento = valorComplemento / qtdPartes;
                    }
                    complementos += $(this).val() * valorComplemento;
                }
            });

            $('#itemModal input[type=checkbox][name*=PerguntasSelecionadas][data-precovenda]:checked').each(function () {
                var valorComplemento = parseFloat($(this).data("precovenda"));
                complementos += valorComplemento;
            });

            $('#itemModal input[type=radio][name*=PerguntasSelecionadas][data-precovenda]:checked').each(function () {
                var valorComplemento = parseFloat($(this).data("precovenda"));
                if (this.name.indexOf("PartesSelecionadas") > -1) {
                    valorComplemento = valorComplemento / qtdPartes;
                }
                complementos += valorComplemento;
            });

            var total = qtd * (precoVenda + complementos);

            var precoTotal = new Intl.NumberFormat(appCurrent.Culture, { style: "currency", currency: appCurrent.CurrencySymbol }).format(total)
            $('#PrecoTotal').text(precoTotal).animo({
                animation: "tada"
            });

            //Atualizar nome do produto
            $('#produtoModalNome').text(function () {
                var nome = $('#Produto_NomeProdutoCompleto').val();
                if (qtdPartes > 1) {
                    nome = $('#Produto_NomePersonalizado').val();
                    if ($('input[name*=CodigoTamanhoSelecionado]:checked').length) {
                        nome += " " + $('input[name*=CodigoTamanhoSelecionado]:checked').data('nome');
                    }
                }
                return nome;
            });

            if (window.matchMedia("(max-width: 767px)").matches) {
                $('#itemModal .modal-body').scroll();
            }

        }, delayValorTotal);
    }

    $(document).on('click', '.btn-minus', function () {
        var input = $(this).parent().siblings('input');
        var newValue = parseInt($(input).val()) - 1;
        $(input).val(newValue).change();
    });

    $(document).on('click', '.btn-plus', function () {
        var input = $(this).parent().siblings('input');
        var newValue = parseInt($(input).val()) + 1;
        $(input).val(newValue).change();
    });

    $(document).on("click", "[data-modalatendimento]", function (e) {
        e.preventDefault();
        e.stopPropagation();
        ShowAjaxModal('/home/_cardapiodetalhemodal', 'detalhesAtendimentoModal');
    });

    $(document).on("click", "[data-cart-open]", function (e) {
        e.preventDefault();
        e.stopPropagation();
        FinalizarPedidoCarrinho();
    });

    $(document).on("click", "#carrinho a", function (e) {
        e.preventDefault();
        e.stopPropagation();
        FinalizarPedidoCarrinho();
    });

    $(document).on("click", "#pedidoForm", function (e) {
        e.preventDefault();
        e.stopPropagation();
        FinalizarPedidoCarrinho();
    });

    $('#carrinho').on('hidden.bs.dropdown', function () {
        $(".navbar-collapse").collapse('hide');
    });

    //Eventos do botão voltar
    var clickNoBackButton = false;
    var ultimoModalPushState = null
    //$(document).on('hide.bs.modal', function (event) {
    //    if (clickNoBackButton) clickNoBackButton = false;
    //    else history.pushState({ show: false, modal: event.target.id }, event.target.id, location.href);
    //});

    $(document).on('show.bs.modal', function (event) {
        if (clickNoBackButton) {
            clickNoBackButton = false;
        } else {
            var uuid = null;
            if (event.relatedTarget && event.relatedTarget.dataset)
                uuid = event.relatedTarget.dataset.uuid;
            else {
                if (event.target.id != ultimoModalPushState) {
                    history.pushState({ show: true, modal: event.target.id, uuid: uuid }, event.target.id, location.href);
                    ultimoModalPushState = event.target.id;
                }
            }
        }
    });

    $(window).on('popstate', function (event) {
        ultimoModalPushState = null;
        clickNoBackButton = true;
        var data = event.originalEvent.state;

        $(".modal").each(function () {
            var modalAtualDataset = $(this).data('bs.modal');
            var modalAtualId = $(this).attr("id");
            var modalPopStateId = data ? data.modal : null;
            var modalAtualAberto = modalAtualDataset ? modalAtualDataset.isShown : false;

            if (modalAtualAberto && modalAtualId != modalPopStateId) {
                $(this).modal("hide");
            }
        });

        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        if (data && data.modal) {
            if (data.show) {
                if (data.uuid)
                    $("a[data-uuid='" + data.uuid + "']").trigger("click");
                else {
                    var modalAtualTemConteudo = $("#" + data.modal).find('.modal-body').children().length > 0;
                    var modalAtualDataset = $("#" + data.modal).data('bs.modal');
                    var modalAtualFechado = modalAtualDataset ? !modalAtualDataset.isShown : false;

                    if (modalAtualTemConteudo && modalAtualFechado) {
                        $("#" + data.modal).modal("show");
                    }
                }
            }
            //else {
            //    if (($("#" + data.modal).data('bs.modal') || {}).isShown) {
            //        $("#" + data.modal).modal("hide");
            //        $('body').removeClass('modal-open');
            //        $('.modal-backdrop').remove();
            //    }
            //}
        }
    });

    // Nova seção categorias agrupadas

    //Ativa o Spy na navbar de categorias
    $('#main-section').scrollspy({ target: '#secao-categories', offset: 70 });

    // Ajusta o scroll da navbar após terminar o scroll principal
    $('#main-section').scroll(function () {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function () {
            // Parou o scroll

            // Se tiver um categoria selecionada e ainda "unloaded", vai carregar...
            if (currentCategory) {
                var $currentPanel = $(currentCategory + '-collapse');
                if ($currentPanel.data('loaded') == false)
                    carregarProdutosPorCategoria($currentPanel);

                $currentPanel.parent().nextAll().find('.panel-collapse:visible').each(function () {
                    var $currentPanel = $(this);
                    if (isScrolledIntoView($currentPanel)) {
                        if ($currentPanel.data('loaded') == false)
                            carregarProdutosPorCategoria($currentPanel);
                    }
                });

                // após terminar scroll, limpa a selecionada    
                currentCategory = null;
            }

            if ($('ul.nav-categorias > li.active').length > 0) {
                if ($('ul.nav-categorias > li.active').position().left < 0) {
                    $('ul.nav-categorias').animate({ scrollLeft: $('ul.nav-categorias').scrollLeft() + $('ul.nav-categorias > li.active').position().left }, 250);
                }
                else if ($('ul.nav-categorias').width() - $('ul.nav-categorias > li.active').position().left < $('ul.nav-categorias > li.active').width()) {
                    $('ul.nav-categorias').animate({ scrollLeft: $('ul.nav-categorias').scrollLeft() + (($('ul.nav-categorias > li.active').position().left + $('ul.nav-categorias > li.active').width()) - $('ul.nav-categorias').width()) }, 250);
                }
            }
            else {
                $('ul.nav-categorias').animate({ scrollLeft: 0 }, 250);
                $('ul.nav-categorias > li').first().addClass("active");
            }
        }, 50));

        //Se estiver habilitado, carrega os dados das categorais visiveis
        if (!currentCategory) {
            CarregarCategoriasVisiveis();
        }
    });

    // Posiciona o scroll na categoria clicada
    $('.nav-categorias > li > a').click(function (e) {
        if ($(this.hash)[0].scrollIntoView) {
            e.preventDefault();

            // Dispara o collapse para carregar os produtos
            if (!$(this.hash + '-collapse').hasClass('in')) {
                $(this.hash + '-collapse').collapse('show');
            }
            else {
                // ao clicar numa categoria, desabilita o carregamento durante scroll
                // para carregar apenas a categoria clicada
                currentCategory = this.hash;
                $(this.hash)[0].scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Scroll manual da navbar para dispositivos "sem touch"
    $('#btn-categories-left').click(function () {
        $('ul.nav-categorias').animate({ scrollLeft: $('ul.nav-categorias').scrollLeft() - 150 }, ajustarVisibilidadeScrollButtonNavbar);
    });

    // Scroll manual da navbar para dispositivos "sem touch"
    $('#btn-categories-right').click(function () {
        $('ul.nav-categorias').animate({ scrollLeft: $('ul.nav-categorias').scrollLeft() + 150 }, ajustarVisibilidadeScrollButtonNavbar);
    });

    // Exibe ou oculta botões de scroll manual da navbar
    function ajustarVisibilidadeScrollButtonNavbar() {
        var maxScrollLeft = $('ul.nav-categorias')[0].scrollWidth - $('ul.nav-categorias')[0].clientWidth;
        $('#btn-categories-left').toggleClass('hide', $('ul.nav-categorias').scrollLeft() == 0);
        $('#btn-categories-right').toggleClass('hide', $('ul.nav-categorias').scrollLeft() == maxScrollLeft);
    }

    // Ao exibir categoria, verifica se os produtos precisam ser carregados
    $('.panel-collapse').on('show.bs.collapse', function () {
        if ($(this).data('loaded') == false) {
            $(this).data('loaded', true);
            carregarProdutosPorCategoria($(this));
        }
    });
    $('.panel-collapse').on('shown.bs.collapse', function () {
        if ($(this).data('searching') != true) {
            $('#' + this.id).parent()[0].scrollIntoView({ behavior: "smooth" });
        }
    });

    function CarregarCategoriasVisiveis() {
        $('.categories .panel-collapse:visible').each(function () {
            var $currentPanel = $(this);
            if (isScrolledIntoView($currentPanel)) {
                if ($currentPanel.data('loaded') == false)
                    carregarProdutosPorCategoria($currentPanel);
            }
        });
    }
    // Fim - Seção categorias

    //Início - Nova busca
    $('#search').on('input propertychange paste', function () {
        $('.categories .panel-collapse').each(function (index) {
            if ($(this).data('loaded') == false) {
                carregarProdutosPorCategoria($(this));
                $(this).data('searching', true).collapse('show');
            }
            else
                filtrarProdutos($(this));
        });
    });

    $('[data-search-dismiss]').click(function () {
        $("#search").val(null).trigger("input");
    });
    // Fim - Nova busca

    CarregarDataLoads();
    AbreItemUrl();
    IniciarScriptModalEndereco();
    IniciarScriptModalFuncionalidade();
    IniciarScriptLoginModal();

    if (CardapioModoLocal === false && CardapioPedidosDesabilitados === false) {
        atualizarCarrinho();
    }

    IniciarEscutadorTextoModal('.contar-texto');

    // Ajusta no loading
    ajustarVisibilidadeScrollButtonNavbar();

    if ($('.categories .panel-collapse.collapse.in').length > 0) // carrega todas visiveis
        CarregarCategoriasVisiveis();
    else // ajuste para correto funcionamento da navegação quando estão tudo "collapsed"
        $('.categories').css('min-height', $('.categories').outerHeight(true) + $(document).outerHeight() - $('header').outerHeight(true) - $('#secao-categories').outerHeight(true) - $('.categories').children(':last').outerHeight() * 2 - 20);

    setExternalAddress();
});;
function IniciarScriptCep() {
    FuncionalidadeCepClickBuscar();
}

function FuncionalidadeCepClickBuscar() {
    var inputCep = $(".porCep [name=Cep]");

    inputCep.mask("99999-999");

    $(document).on('click', '.porCep .buscar', function () {
        PesquisarCep($(this));
    });

    $(document).on('click', '.filtroCidade .filtroBtn', function () {
        if ($('#formFiltro').is(":hidden")) {
            $('#formFiltro').slideDown();
            $('.porCep').slideUp();
        }
        else {
            $('.porCep').slideDown();
            $('#formFiltro').slideUp();
        }
    });

    inputCep.on('keypress', function (e) {
        if (e.which == 13) {
            PesquisarCep($(this));
        }
    });

}

function PesquisarCep(input) {
    var cep = input.parent().parent().find('input').val();
    ShowCepModal(cep);
}

function ShowCepModal(cep) {
    $(globalSpinner).appendTo('#cepModal .modal-content');
    var model = { cep: cep, ismultiloja: $('.multiloja') != null };
    $.ajax({
        type: "Post",
        url: '/endereco/BuscarCep',
        data: { model: model },
        success: function (data) {
            OnSuccessBuscarCep(data);
        },
        error: function () {
            DesAtrelarCarregando();
        }
    });
}

function OnBeginSpinner() {
    $(globalSpinner).appendTo($(this));
}

function OnSuccessBuscarCep(response) {
    $('#cepModal').html(response);
    if (!($("#cepModal").data('bs.modal') || {}).isShown) {
        $('#cepModal').modal({ backdrop: 'static', keyborard: false });
        $('#cepModal').modal('show');
    }
    initMasks();
    $.validator.unobtrusive.parse($('#cepModal'));

    if (window.location.pathname.startsWith('/lojas') == true) {
        var lojaUrl = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
        $('#completarEnderecoForm').append('<input type="hidden" name="UrlMultiLoja" value="' + lojaUrl + '" />');
    }
}
;
var ZipAddress = (function () {

	var defaultTimeout = 1500;

	var logisticsApi = function (zipCode, successCallback, errorCallback) {

		let baseAddress = "https://menudino-logistics.consumerapis.com/api/v1/addresses/zipCode";
		
		$.ajax({
			url: `${baseAddress}/${zipCode}`,
			timeout: defaultTimeout,
			type: "GET",
			success: function (response) {
				if (response) {

					if (response.errors)
						throw new Error(response.message || "CEP não encontrado.");

					let zipCodeResponse = {
						zipCode: response.zipCode,
						street: response.street,
						district: response.district,
						state: response.state,
						city: response.city,
						provider: "logisticsApi",
						mode: "client",
					}

					if (successCallback)
						successCallback(zipCodeResponse);
				} else {
					if (errorCallback)
						errorCallback();
				}
			},
			error: function (jqxhr, textStatus, error) {
				if (errorCallback)
					errorCallback();
			}
		});
	}

	var brasilApi = function (zipCode, successCallback, errorCallback) {

		let baseAddress = "https://brasilapi.com.br/api/cep/v2";

		$.ajax({
			url: `${baseAddress}/${zipCode}`,
			timeout: defaultTimeout,
			type: "GET",
			success: function (response) {
				if (response) {

					if (response.errors)
						throw new Error(response.message || "CEP não encontrado.");

					let zipCodeResponse = {
						zipCode: response.cep,
						street: response.street,
						district: response.neighborhood,
						state: response.state,
						city: response.city,
						provider: "brasilApi",
						mode: "client",
					}

					if (successCallback)
						successCallback(zipCodeResponse);
				}
			},
			error: function (jqxhr, textStatus, error) {
				if (errorCallback)
					errorCallback(error);
			}
		});
	}

	var viaCep = function (zipCode, successCallback, errorCallback) {

		let baseAddress = "https://viacep.com.br/ws";

		$.ajax({
			url: `${baseAddress}/${zipCode}/json`,
			timeout: defaultTimeout,
			type: "GET",
			success: function (response) {
				if (response) {

					if (response.erro)
						throw new Error("CEP não encontrado.");

					let zipCodeResponse = {
						zipCode: response.cep,
						street: response.logradouro,
						district: response.bairro,
						state: response.uf,
						city: response.localidade,
						provider: "viaCep",
						mode: "client",
					}

					if (successCallback)
						successCallback(zipCodeResponse);
				}
			},
			error: function (jqxhr, textStatus, error) {
				if (errorCallback)
					errorCallback(error);
			}
		});
	}

	var republicaVirtual = function (zipCode, successCallback, errorCallback) {

		let baseAddress = "http://cep.republicavirtual.com.br/web_cep.php";

		$.ajax({
			url: `${baseAddress}?cep=${zipCode}&formato=json`,
			timeout: defaultTimeout,
			type: "GET",
			success: function (response) {
				if (response) {

					if (response.resultado && response.resultado == "0")
						throw new Error("CEP não encontrado.");

					let zipCodeResponse = {
						zipCode: response.cep,
						street: response.logradouro,
						district: response.bairro,
						state: response.uf,
						city: response.cidade,
						provider: "republicaVirtual",
						mode: "client",
					}

					if (successCallback)
						successCallback(zipCodeResponse);
				}
			},
			error: function (jqxhr, textStatus, error) {
				if (errorCallback)
					errorCallback(error);
			}
		});
	}

	var getZipAddress = function (zipCode, successCallback, errorCallback) {
		try {
			logisticsApi(zipCode, successCallback, function () {
				republicaVirtual(zipCode, successCallback, function () {
				    brasilApi(zipCode, successCallback, function () {
				        viaCep(zipCode, successCallback, errorCallback);
				    });
				});
			});
		} catch (e) {
			if (errorCallback)
				errorCallback();
		}
	}

	return {
		init: function (zipCode, successCallback, errorCallback) {
			let zipCodeUnformatted = zipCode.replace('-', '');
			getZipAddress(zipCodeUnformatted, successCallback, errorCallback);
		}
	};
})();;
function IniciarScriptModalEndereco() {

    $(document).on('change', '#completarEnderecoForm #Cidade', function () {
        FormularioAtribuiValorCidade($(this));
    });

    $(document).on('change', '#completarEnderecoForm #Estado', function () {
        var form = $(this).closest('form');
        FormularioAtribuiEstado(form);
    });

    $(document).on('change', '#chkComplemento', function () {
        var form = $(this).closest('form');
        FormularioHabilitaComplemento(form);
    });

    $(document).on("click", ".btnTipoEntrega", function () {
        var form = $(this).closest('form');
        FormularioClickTipoEntrega(form, $(this));
    });

    $(document).on('click', '.cboTipoEntrega', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if ($(this).hasClass('active')) {
            $('#cepModal').modal('hide');
        }
        else {
            var id = $(this).data('id');
            if (id === 1)
                ShowAjaxModal('/endereco/definirdelivery', 'cepModal');
            else {
                $.post('/pedido/definirretirarnoestabelecimento', { codigoTipoEntrega: id }, function (data, textStatus, jqXHR) {
                    $('#cepModal').modal('hide');
                    $.notify("<i class='fa fa-" + data.icon + "'></i> " + data.message);
                    atualizarCarrinho();
                    CarregarDataLoads();
                });
            }
        }
    });

    $(document).on("click", ".item-endereco-pesquisar", function (e) {
        var codigoEndereco = $(this).attr("data-id");
        OpenModalBuscarCep(codigoEndereco);
    });

    $(document).on("submit", "#buscarCepForm", function (e) {
        $(globalSpinner).appendTo("#cepModal .modal-content");
        sendZipCodeRequest(e);
    });

    var sendZipCodeRequest = function (evt) {
        evt.preventDefault();
        var zipCode = $("#Cep").val();
        ZipAddress.init(zipCode,
            function (response) {

                if (response) {

                    let zipCodeAddress = response;

                    $.ajax({
                        url: `/endereco/completarendereco`,
                        data: zipCodeAddress,
                        type: "GET",
                        success: function (response) {
                            OnSuccessBuscarCep(response);
                        }
                    });
                }
            },
            function () {
                var formData = $("#buscarCepForm").serialize();
                $.ajax({
                    url: `/endereco/buscarcep`,
                    data: formData,
                    type: "POST",
                    success: function (response) {
                        OnSuccessBuscarCep(response);
                    }
                });
                ModalVoltarAdicionarFila('cepModal', $(this).attr('action'));
            });
    }

    $(document).on("click", ".abrir-modal-opcao-entrega", function (e) {
        AbrirModalBotaoCarregando($('#submitButtons button'), OpenModalListarEndereco);
    });

    $(document).on("click", ".fechar-modal-endereco", function (e) {
        $('#cepModal').modal('hide');
    })
}

function ValidaComplementoRetorno(formulario) {
    var customVal = formulario.validate();
    if (formulario.find('#Complemento').val() === '' && !formulario.find('#chkComplemento').prop('checked')) {
        customVal.showErrors({
            "Complemento": getLocalizedContent('Endereco_Complemento')
        });
        formulario.find("#Complemento").focus();

        $("#Complemento").addClass("input-validation-error");

        $.notify('<i class="fa fa-warning"></i> ' + getLocalizedContent("Endereco_Complemento"), {
            status: "danger"
        });

        return false;
    }
    $(globalSpinner).appendTo(formulario);
    return true;
}

function FormularioCompletarEndereco(modalPopup, response) {
    if (response) {
        if (response === true) {
            modalPopup.modal("hide");
            DesAtrelarCarregando();
        }
        else {
            modalPopup.html(response);
            initMasks();
            $.validator.unobtrusive.parse(modalPopup);

            if (document.getElementById('mapLocation')) {
                var isCustomDomain = !location.hostname.endsWith('menudino.com');
                var isSandbox = location.hostname == "localhost" || location.hostname.indexOf("sandbox") >= 0;

                if (isSandbox || (isCustomDomain && !restaurantGoogleMapsApi) || !mapsApiEnabled) {
                    $('#btnConfirmarLocalizacao').closest('form').submit();
                } else {
                    LoadConfirmarLocalizacao();
                }
            }
        }
    }
}

async function LoadConfirmarLocalizacao() {
    var currentKey = restaurantGoogleMapsApi ? restaurantGoogleMapsApi : 'AIzaSyDXFq30OPqdwFPcQCl9VBYkgOVNWoicyVk';
    var response = await fetch("https://www.google.com/maps/embed/v1/view?key=" + currentKey + "&center=" + $('#Lat').val().replace(',', '.') + ',' + $('#Lng').val().replace(',', '.') + "&zoom=18");

    if (response.ok) {
        $('<iframe style="pointer-events: none !important; width: 100%; height: 100%; position: absolute; top: 0;" id="mapIframe" frameborder="0" scrolling="no" width="100%" height="100%" src="https://www.google.com/maps/embed/v1/view?key='
            + currentKey + '&center=' + $('#Lat').val().replace(',', '.') + ',' + $('#Lng').val().replace(',', '.') + '&zoom=18"></iframe>').insertBefore('#mapLocation');

        $('<div/>').addClass('map-location-pin').appendTo(document.getElementById('mapLocation'))
        $('<div/>').addClass('map-location-pin-pulse animate').appendTo(document.getElementById('mapLocation'))

        $('#btnCorrigirLocalizacao').click(LoadCorrigirLocalizacao);

        $('#mapLocation').css('z-index', 1051);
        $('#mapLocation').click(function () {
            $.notify(getLocalizedContent("Ajustar_Localizacao"));
        });
    } else {
        $('#btnConfirmarLocalizacao').closest('form').submit();
    }
}

function LoadCorrigirLocalizacao() {

    $('#mapIframe').remove();
    $('#mapLocation').html('');
    $('#mapLocation').unbind('click');
    $('#mapLocation').css('z-index', 'auto');

    $('#btnCorrigirLocalizacao').hide();
    $('#btnConfirmarLocalizacao').parent().addClass('col-xs-12');
    $('#btnConfirmarLocalizacao').parent().removeClass('col-xs-6');
    $('#btnConfirmarLocalizacao').html('<i class="fa fa-check"></i> ' + $('#btnConfirmarLocalizacao').data('text-confirm-adjust'));
    $('#spnDicaConfirmarLocalizacao').text($('#spnDicaConfirmarLocalizacao').data('text-tip-adjust'));

    var mapOptions = {
        zoom: 18,
        backgroundColor: "#fff",
        disableDoubleClickZoom: true,
        disableDefaultUI: true,
        clickableIcons: false,
        center: new google.maps.LatLng($('#Lat').val().replace(',', '.'), $('#Lng').val().replace(',', '.')),
        gestureHandling: 'greedy',
        styles: [
            { "featureType": "poi", "elementType": "labels.icon", "stylers": [{ "color": "#cccccc" }] },
            { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#cccccc" }] }
        ]
    };

    var mapLocation = new google.maps.Map(document.getElementById('mapLocation'), mapOptions);

    $('<div/>').addClass('map-location-pin').appendTo(mapLocation.getDiv())
    $('<div/>').addClass('map-location-pin-pulse animate').appendTo(mapLocation.getDiv())

    // Atualizar nova latlng
    mapLocation.addListener("center_changed", () => {
        var mapCenter = mapLocation.getCenter();

        var lat = mapCenter.lat();
        var lng = mapCenter.lng();

        $('#Lat').val(new Intl.NumberFormat(appCurrent.Culture, { maximumFractionDigits: 20 }).format(lat));
        $('#Lng').val(new Intl.NumberFormat(appCurrent.Culture, { maximumFractionDigits: 20 }).format(lng));
    });

    // Eventos durante drag do mapa
    mapLocation.addListener("dragstart", () => { $('#mapLocation').toggleClass('drag', true); });
    mapLocation.addListener("dragend", () => { $('#mapLocation').toggleClass('drag', false); });

    //Desabilitar fechamento do popup nos eventos de touch no mapa
    $(document).on("touchstart", "#mapLocation", function (event) { event.stopPropagation(); });
    $(document).on("touchend", "#mapLocation", function (event) { event.stopPropagation(); });
}

function FormularioAtribuiValorCidade(formularioInputCidade) {
    formularioInputCidade.attr('value', formularioInputCidade.val());
}

function FormularioAtribuiEstado(formulario) {
    var estado = formulario.find('#Estado');

    estado.attr('value', estado.val());
    $.post('/endereco/carregarcidades', { estado: estado.val() }, function (response) {
        var cidades = formulario.find("#Cidade");
        cidades.empty();
        cidades.append($('<option value selected></option>').text('Cidade'));
        cidades.attr('value', cidades.val());
        $.each(response, function (index, item) {
            cidades.append($('<option></option>').val(item.Name).text(item.Name));
        });
    });
}

function FormularioHabilitaComplemento(formulario) {
    var chkComplemento = formulario.find('#chkComplemento');
    var complemento = formulario.find('#Complemento');

    if (chkComplemento.prop('checked')) {
        complemento.val('');
        complemento.prop('readonly', true);
        complemento.removeClass("input-validation-error");
    }
    else {
        complemento.prop('readonly', false);
    }
}

function FormularioClickTipoEntrega(formulario, botao) {
    formulario.find(".btnTipoEntrega").toggleClass("active", false);
    formulario.find("#TipoEntrega_Codigo").val(botao.data("id"));

    //Validar Origem
    $('#divEnderecoEstabelecimento').toggleClass('hide', botao.data("id") === 1);

    botao.toggleClass("active", true);
}

//Início - Localização
var placeSearch, autocomplete;

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    if ($('#HabilitarGoogleAutocomplete') && $('#HabilitarGoogleAutocomplete').val() === 'True' && !autocomplete) {
        if (document.getElementById('Logradouro') !== null && !document.getElementById('Logradouro').disabled) {
            autocomplete = new google.maps.places.Autocomplete(
                document.getElementById('Logradouro'));

            // When the user selects an address from the dropdown, populate the address
            // fields in the form.
            autocomplete.addListener('place_changed', fillInAddress);
        }
    }
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    var logradouro, bairro, cidade, estado, postalCode, placeId;

    estado = $('#Estabelecimento.EndEstado').val(); // **BUG** - Definido na view Cardapio >> Google não retorna estado (uf), utilizar estado (uf) Default

    if (place.types[0] !== "route")
        placeId = place.place_id;

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];

        if (addressType === "route")
            logradouro = place.address_components[i].short_name || place.address_components[i].long_name;

        else if (addressType === "sublocality_level_1" || addressType === "sublocality")
            bairro = place.address_components[i].long_name;

        else if (addressType === "administrative_area_level_2" || addressType === "locality")
            cidade = place.address_components[i].long_name;

        else if (addressType === "administrative_area_level_1")
            estado = place.address_components[i].short_name;

        else if (addressType === "postal_code")
            postalCode = place.address_components[i].long_name;

        else if (addressType === "country" && place.address_components[i].short_name !== "BR")
            estado = cidade = "";

        else if (addressType === "street_number")
            $('#Numero').val(place.address_components[i].short_name || place.address_components[i].long_name);
    }

    if (!logradouro && place.formatted_address)
        logradouro = place.formatted_address.split(",")[0];

    if (logradouro && cidade && estado) {
        $('#Logradouro').val(logradouro);
        var cidades = $("#Cidade");
        cidades.empty();
        cidades.append($('<option selected></option>').val(cidade).text(cidade));
        cidades.attr('value', cidades.val());
        $('#Cidade').val(cidade);
        $('#Estado').val(estado);
        $('#Estado').attr('value', estado);
        $('#Bairro').val(bairro);
        $('#Cep').val(postalCode);
        $('#PlaceIdGoogle').val(placeId);
        $('#Numero').focus();
    }
    else {
        $('#Logradouro').val(null);
        $('#Cidade').val(null);
        $('#Estado').val(null);
        $('#Bairro').val(null);
        $('#Cep').val(null);
        $('#PlaceIdGoogle').val(null);
        $('#EnderecoCompletoGoogle').val(null);
    }
}
//Fim - Localização

function OnBeginCompletarEndereco() {
    return ValidaComplementoRetorno($('#completarEnderecoForm'));
}

function OnSuccessCompletarEndereco(response) {
    FormularioCompletarEndereco($('#cepModal'), response);
}

function OpenModalEndereco(modalUrl, modalId) {
    ModalVoltarAdicionarFila('cepModal', modalUrl);
    ShowAjaxModal(modalUrl, modalId);
}

function OpenModalListarEndereco() {
    OpenModalEndereco('/endereco/listarendereco', 'cepModal');
}

function OpenModalBuscarCep(codigoEndereco) {
    var modalUrl = '/endereco/buscarcep';
    if (codigoEndereco) {
        modalUrl = "/endereco/selecionarendereco/?enderecoId=" + codigoEndereco;
    }
    OpenModalEndereco(modalUrl, 'cepModal');
}

function OnBeginConfirmarLocalizacao() {
    $(globalSpinner).appendTo(this);
}

function OnSuccessConfirmarLocalizacao(response) {
    if (response) {
        if (response.Success === true) {
            $('#cepModal').modal("hide");
            DesAtrelarCarregando();

            if (response.Model && response.Model.length > 0) { // Multilojas
                if (response.Model.length == 1) {
                    $(globalSpinner).appendTo($('body'));
                    window.location = window.location.origin + "/" + response.Model[0];
                }
                else {
                    ExibeLojaEndereco(response.Model);
                }
            }
            else {
                atualizarCarrinho();
                CarregarDataLoads();
            }
        }
        else {
            $('#cepModal').html(response);
            initMasks();
            $.validator.unobtrusive.parse($('#cepModal'));
            $.notify('<i class="fa fa-warning"></i> ' + "Verifique o endereço informado e tente novamente.", {
                status: "danger"
            });
        }
    }
};
var isExibirModalLogin = false;

function setTargetUrlCookie(value, days = 7) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        var expires = "";
    }

    document.cookie = "TargetUrl" + "=" + value + expires + "; path=/";
}

function IniciarScriptLoginModal() {

    if (isExibirModalLogin)
        ShowEscolhaLoginModal()

    $(document).on('click', '.showModalLogin', function () {
        var targetUrl = $(this).data("targeturl");

        if (targetUrl)
            setTargetUrlCookie(targetUrl);
        else
            setTargetUrlCookie(window.location.pathname);

        ShowEscolhaLoginModal();
    });

    $(document).on('hidden.bs.modal', '#loginModal', function () {
        setTargetUrlCookie(window.location.pathname)
    });

    $(document).on('click', '.showIdentificarLoginModal', function () {
        ShowIdentificarLoginModal();
    });

    $(document).on('submit', '#identificarLoginForm', function (e) {
        e.preventDefault();
        PostIdentificarLoginModal('loginModal', $('#Email').val());
    });

    $(document).on('submit', '#loginSolicitarCodigoVerificacaoForm', function (e) {
        e.preventDefault();

        $(globalSpinner).appendTo("#loginModal .modal-content");

        $.ajax({
            type: "GET",
            url: '/cliente/LoginCodigoVerificacao',
            data: $(this).serialize(),
            success: function (data) {
                $('#loginModalBody').html(data);
                setTituloModalCodigoVerificacao();
                initLoginCodigoDeVerificacao();
            },
            complete: function () {
                DesAtrelarCarregando();
            }
        });
    });

    $(document).on('submit', '#loginFormSenha', function (e) {
        e.preventDefault();
        $(globalSpinner).appendTo("#loginModal .modal-content");

        $.ajax({
            type: "POST",
            url: '/cliente/ReenviarSenha',
            data: { __RequestVerificationToken: $(this).find('input[name=__RequestVerificationToken]').val(), email: $(this).find('#Email').val() },
            success: function (data) {
                if (data.message) {
                    $.notify(data.message, { timeout: 0 });
                }
                else {
                    $('#loginModalBody').html(data);
                    $('.modal-footer').show();
                    $('#loginModal').modal({ backdrop: 'static', keyborard: false });
                    $('#loginModal').modal('show');
                    initMasks();
                    $.validator.unobtrusive.parse($('#loginModal'));
                }
            },
            complete: function (response) {
                DesAtrelarCarregando();
                //$("#loginModal .modal-content .spinner-parent").remove();
            }
        });
    });

    $(document).on('submit', '#loginForm', function (e) {
        e.preventDefault();
        $(globalSpinner).appendTo("#loginModal .modal-content");
        var form = FormToObject($('#loginForm'));

        $.ajax({
            type: "POST",
            url: '/cliente/LoginModal',
            data: { __RequestVerificationToken: $(this).find('input[name=__RequestVerificationToken]').val(), model: form, returnUrl: window.location.pathname },
            success: function (data) {
                if (data.isRedirect) {
                }
                else {
                    $('#loginModalBody').html(data);
                    var loginModal = $("#loginModal").data('bs.modal');

                    if (!loginModal || !loginModal.isShown) {
                        $('#loginModal').modal({ backdrop: 'static', keyborard: false });
                        $('#loginModal').modal('show');
                    }

                    initMasks();
                    $.validator.unobtrusive.parse($('#loginModal'));
                }
            },
            complete: function (response) {
                if (response.responseJSON && response.responseJSON.isRedirect) {
                    window.location.href = response.responseJSON.redirectUrl
                }
                else {
                    DesAtrelarCarregando();
                }
            }
        });
    });

    $(document).on('submit', '#exibirLoginCodigoVerificacaoForm', function (e) {
        e.preventDefault();
        $(globalSpinner).appendTo("#exibirLoginCodigoVerificacaoForm .modal-content");
        var form = FormToObject($('#exibirLoginCodigoVerificacaoForm'));

        $.ajax({
            type: "POST",
            url: '/cliente/ExibirLoginCodigoVerificacao',
            data: { model: form },
            success: function (data) {
                if (data.success == false) {
                    $.notify(data.message, { timeout: 0 });
                }
                else {
                    $('#loginModalBody').html(data);
                    setTituloModalCodigoVerificacao();
                    initLoginCodigoDeVerificacao();
                }
            },
            complete: function () {
                DesAtrelarCarregando();
            }
        });
    });

    $(document).on('submit', '#loginCodigoVerificacaoForm', function (e) {
        e.preventDefault();
        setCodigoVerificacao();
        $(globalSpinner).appendTo("#loginCodigoVerificacaoForm .modal-content");
        var form = FormToObject($('#loginCodigoVerificacaoForm'));

        $.ajax({
            type: "POST",
            url: '/cliente/LoginCodigoVerificacao',
            data: { model: form },
            success: function (data) {
                if (data.success) {
                    window.location.href = data.returnUrl;
                }
                else if (data.success == false) {
                    $.notify(data.message, { timeout: 0 });
                }
            },
            complete: function () {
                DesAtrelarCarregando();
            }
        });
    });

    $(document).on('submit', '#registerForm', function (e) {
        e.preventDefault();
        $(globalSpinner).appendTo("#loginModal .modal-content");
        var form = FormToObject($('#registerForm'));

        $.ajax({
            type: "POST",
            url: '/cliente/CadastrarUsuarioModal',
            data: { __RequestVerificationToken: $(this).find('input[name=__RequestVerificationToken]').val(), model: form, returnUrl: window.location.pathname },
            success: function (data) {
                if (data.isRedirect) {
                }
                else {
                    $('#loginModalBody').html(data);

                    var loginModal = $("#loginModal").data('bs.modal');

                    if (!loginModal || !loginModal.isShown) {
                        $('#loginModal').modal({ backdrop: 'static', keyborard: false });
                        $('#loginModal').modal('show');
                    }

                    $.validator.unobtrusive.parse($('#loginModal'));
                }
            },
            complete: function (response) {
                if (response.responseJSON && response.responseJSON.isRedirect) {
                    window.location.href = response.responseJSON.redirectUrl
                }
                else {
                    DesAtrelarCarregando();
                    //$("#loginModal .modal-content .spinner-parent").remove();
                }
            }
        });
    });

    $(document).on('click', '.btnProsseguir', function (e) {
        e.preventDefault();
        var form = $(this).closest('form');

        if (form.valid()) {
            ModalVoltarAdicionarFila('loginModal', form.attr('action'));
            $(globalSpinner).appendTo("#loginModal .modal-content");
            form.submit();
        }
    });

    $(document).on('click', 'a.btn-login', function () {
        var componente = $(this);

        textoAntesAtrelarCarregandoAguarde = componente.html();
        $('.btn-login').attr("disabled", "disabled");
        componente.html(globalSpinnerSimpleAguarde);

        setTimeout(function () {
            DesatrelarCarregandoAguarde(componente);
            $('.btn-login').prop("disabled", false);
            $('.btn-login').removeAttr('disabled');
        }, 3000);
    });
}

function ShowLoginModal() {
    ShowAjaxModal('/cliente/LoginModal', 'loginModal');
}

function PostIdentificarLoginModal(modalId, data) {
    $(globalSpinner).appendTo('#' + modalId + " .modal-content");

    $.ajax({
        type: "POST",
        url: '/cliente/LoginIdentificar',
        data: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val(), email: data /*, gRecaptcha: document.getElementById("gRecaptcha").value*/ },
        success: function (data) {
            $('#' + modalId + 'Body').html(data);
            $('.modal-footer').show();
            $('#' + modalId).modal({ backdrop: 'static', keyborard: false });
            $('#' + modalId).modal('show');
            initMasks();
            $.validator.unobtrusive.parse($('#' + modalId));
            /*GCaptchaSet();*/

            if (data.success == false) {
                $.notify(data.message, { timeout: 0 });
                $('#loginModal').modal('hide');
            }

            if ($("#registerForm").length > 0) {
                $("#loginModalHeader").text($(".titleHeaderModal").data("title-header-cadastrar"));
            }
            else if ($("#loginCodigoVerificacaoForm").length > 0) {
                setTituloModalCodigoVerificacao();
                initLoginCodigoDeVerificacao();
            }
            else {
                $("#loginModalHeader").text($(".titleHeaderModal").data("title-header-login"));
            }
        },
        complete: function () {
            DesAtrelarCarregando();
            //$('#' + modalId + " .modal-content .spinner-parent").remove();
        }
    });
}

function ShowEscolhaLoginModal() {
    ShowAjaxModal('/cliente/LoginEscolha', 'loginModal', 'loginModalBody');
    $("#loginModalHeader").text($(".titleHeaderModal").data("title-header-escolha"));
    ModalVoltarAdicionarFila('loginModal', '/cliente/LoginEscolha');
}

function ShowIdentificarLoginModal() {
    ShowAjaxModal('/cliente/LoginIdentificar', 'loginModal', 'loginModalBody');
    ModalVoltarAdicionarFila('loginModal', '/cliente/LoginIdentificar');
    //GCaptchaSet("login");
    $("#loginModalHeader").text($(".titleHeaderModal").data("title-header-login"));
}

function ShowEntrarLoginModal() {
    ShowAjaxModal('/cliente/LoginEntrar', 'loginModal', 'loginModalBody');
}

function ShowCriarLoginModal() {
    ShowAjaxModal('/cliente/LoginCriar', 'loginModal', 'loginModalBody');
}

function HasExibirModalLoginQuery(exibirModalLogin) {
    if (exibirModalLogin == "True") {
        isExibirModalLogin = true
        return true;
    }
    return false;
}

function setTituloModalCodigoVerificacao() {
    $("#loginModalHeader").text($(".titleHeaderModal").data("title-header-codigo-verificacao"));
}

function setCodigoVerificacao() {
    var codigoVerificacaoInputs = $("[name='CodigoValue']")

    var codigoVerificacao = "";

    for (let i = 0; i < codigoVerificacaoInputs.length; i++) {
        codigoVerificacao += codigoVerificacaoInputs[i].value;
    }

    $("[name='CodigoVerificacao']").val(codigoVerificacao);
}

function initLoginCodigoDeVerificacao() {
    $(document).ready(function () {
        $('[name="CodigoValue"]').keypress(function (event) {
            var charCode = event.which ? event.which : event.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                event.preventDefault();
            }
        });

        $('[name="CodigoValue"]').on('paste', function (event) {
            var pastedData = event.originalEvent.clipboardData.getData('text');
            if (!/^\d+$/.test(pastedData)) {
                event.preventDefault();
            }
        });

        $('[name="CodigoValue"]:first').focus(function () {
            $(this).removeAttr('maxlength');
        });

        $('[name="CodigoValue"]:first').blur(function () {
            $(this).attr('maxlength', 1);
        });

        $('[name="CodigoValue"]').on('input', function () {
            var value = $(this).val().replace(/\D/g, '');
            var maxLength = parseInt($(this).attr('maxlength')) || 1;
            var currentLength = value.length;

            if (currentLength === maxLength) {
                var nextField = $(this).parent().next().find('[name="CodigoValue"]');
                if (nextField.length > 0) {
                    nextField.focus();
                } else {
                    // Último campo preenchido, fazer o POST do formulário
                    $('#loginCodigoVerificacaoForm').submit();

                }
            } else if (currentLength > maxLength) {
                // Se o usuário colar um valor maior que o maxlength, repassa para os campos subsequentes
                var overflow = value.substr(maxLength);
                $(this).val(value.substr(0, maxLength));
                var nextField = $(this).parent().next().find('[name="CodigoValue"]');
                while (overflow !== '' && nextField.length > 0) {
                    nextField.val(overflow.substr(0, maxLength));
                    overflow = overflow.substr(maxLength);
                    nextField = nextField.parent().next().find('[name="CodigoValue"]');
                }

                if (nextField.length == 0) {
                    $('#loginCodigoVerificacaoForm').submit();
                }
            }
        });
    });
};
var $modalVoltar = [];

function IniciarScriptModalFuncionalidade() {

    $(document).on("click", '.modalVoltar', function () {
        ModalVoltar($(this).parents('.modal'));
    });

    $(document).on('hidden.bs.modal', function (e) {
        $modalVoltar = [];
    });
}

function ModalVoltar(janelaModal) {
    if ($modalVoltar.length < 1) {
        janelaModal.modal('hide')
    }
    else {
        var modalIndex = $modalVoltar.length - 1;

        $modalVoltar.splice(modalIndex, 1);
        modalIndex = $modalVoltar.length - 1;
        if (modalIndex < 0) {
            janelaModal.modal('hide')
        }
        else {
            var modalUrl = $modalVoltar[modalIndex][1];
            var modalId = $modalVoltar[modalIndex][0];
            var modalBody = $('#' + modalId).find('.conteudoModalBody');

            if (modalBody.length > 0) {
                ShowAjaxModal(modalUrl, modalId, modalBody.attr("id"));
            }
            else {
                ShowAjaxModal(modalUrl, modalId);
            }
        }
    }
}

function ModalVoltarAdicionarFila(modalName, modalUrl) {
    $modalVoltar.push([modalName, modalUrl]);
};
var OneSignalClient=function(){var u,e,n,i,t,o=function(){OneSignal.push(function(){OneSignal.init({appId:`${u}`,autoRegister:!1,allowLocalhostAsSecureOrigin:!0,persistNotification:!0,welcomeNotification:{disable:!0},notifyButton:{enable:!0,colors:{"circle.background":`${n}`,"circle.foreground":"white","badge.background":`${n}`,"badge.foreground":"white","badge.bordercolor":"white","pulse.color":"white","dialog.button.background.active":`${n}`,"dialog.button.background":`${n}`,"dialog.button.foreground":"white"},text:{"tip.state.unsubscribed":"Ative as notificações.","tip.state.subscribed":"As notificações estão ativas.","tip.state.blocked":"As notificações estão bloqueadas.","message.prenotify":"Clique para permitir as notificação.","message.action.subscribed":"Obrigado por ativar as notificações!","message.action.resubscribed":"Você está com as notificações ativas.","message.action.unsubscribed":"Você não receberá notificações novamente.","dialog.main.title":"Gerenciar notificações do site.","dialog.main.button.subscribe":"ATIVAR","dialog.main.button.unsubscribe":"DESATIVAR","dialog.blocked.title":"Desbloquear notificações.","dialog.blocked.message":"Siga as instruções para habilitar as notificações:"}},promptOptions:{slidedown:{prompts:[{type:"push",autoPrompt:!1,text:{actionMessage:"Receba notificações das mensagens enviadas pelo restaurante e atualizações dos pedidos.",acceptButton:"Permitir",cancelButton:"Cancelar"},delay:{pageViews:1,timeDelay:1}}]}}})});OneSignal.push(function(){r();OneSignal.on("notificationPermissionChange",function(n){var t=n.to;(t=="granted"||n==="granted")&&r()});if(OneSignal.showSlidedownPrompt(),t){i&&(t=`sandbox_${t}`);let n=`${t}`;OneSignal.setExternalUserId(n)}})},r=function(){OneSignal.push(function(){OneSignal.getUserId(function(n){i&&console.log("onesignal playerid: "+n);n&&(setCookieId(n),$.ajax({type:"Post",url:"/Cliente/SalvarPlayerIdPushCliente/",data:{userId:n}}))})})},s=function(n){if(n||n.elementInfo)if($elementInfo=$(n.elementInfo),i&&console.log("permission: "+n.permission),n.permission==="granted")r(),$elementInfo&&$elementInfo.addClass("hidden");else if(n.permission==="denied"){$elementInfo.text("As notificações foram bloqueadas, não será possível receber novas notificações.");$elementInfo.off("click");$elementInfo.on("click",function(){$(".onesignal-bell-launcher-button").click()})}else{$elementInfo.text("Clique aqui para ativar as notificações e receber alertas de novas mensagens.");$elementInfo.on("click",function(){OneSignal.push(function(){OneSignal.showNativePrompt()})})}},f=function(n){OneSignal.push(["getNotificationPermission",function(t){n&&n(t)}])},h=function(){f(function(n){n!="denied"&&OneSignal.showNativePrompt()})};return{init:function(r,f,s,h,c){u=r;e=f;n=s;i=c;t=h;o()},updateElementPermissionInfo:function(n){s(n)},checkUserAlreadyAllowed:function(n){f(n)},showNativePrompt:function(){h()}}}();;
