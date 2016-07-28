$('.conversations.index').ready(function() {
	$.ajax({
	   method: 'get',
	   url: '/conversations/update_convo_id',
	   dataType: 'json',
	   data: { },
	   success: function(response) {
		// update conversation id meta tag
		$('meta[name=conv-id]').attr("content", response.convo_id);
	   }
	});

	$('#rec-btn').click(function() {
		$('#new_recommendation').submit();
	});

	$( "#dialog-confirm" ).dialog({
		buttons: {
			"I agree": function() {
				$( this ).dialog( "close" );
			},
			Cancel: function() {
				window.location.replace("http://safespace-dev.herokuapp.com/");
			}
		},
		closeOnEscape: false,
		dialogClass: "liability-dialog",
		draggable: false,
		height: ($(window).height()) * 0.7,
		modal: true,
		open: function(event, ui) {
			// Set opacity of parent window
			$( ".ui-widget-overlay" ).css( "opacity", 0.90 );
			$( ".ui-widget-overlay" ).css( "z-index", 0 );
			// Hide close button on modal dialog
			$( ".ui-dialog-titlebar-close" ).css( "display", 'none' );
		},
		resizable: false,
		width: ($(window).width()) * 0.7
	});

	$('.ui-dialog-titlebar').css("background","#FFF2D8");

	$(".ui-dialog-buttonset button:contains('I agree')").addClass('btn').addClass('btn-success');
	$(".ui-dialog-buttonset button:contains('Cancel')").addClass('btn').addClass('btn-default');

	// Protocol Button 
	var $protocolContainer = $('<div class="protocol-container"></div>');
	$protocolContainer.appendTo($("body"));
	var $protocolButton = $('<div class="protocol-button vertical-text btn btn-danger">PROTOCOL</div>');
	$protocolButton.appendTo($protocolContainer);
	var $protocolMenu =  $('<div class="protocol-menu margin-negative"></div>');
	$protocolMenu.appendTo($('.protocol-container'));
	$protocolMenu.html('<h4>You are not here to counsel. Please send your peer this link.</h4>\
						<div class="copy-container input-group">\
							<input class="input-form-url" id="suicide-input" type="text" value="http://www.suicidepreventionlifeline.org/" />\
							<div class="copy-button btn btn-success btn-lg">Copy</div>\
						</div>'
						);

	// Expand Protocol Menu on Protocol Button Click
	$protocolButton.click(function() {
		$protocolMenu = $('.protocol-menu');
		if ($protocolMenu.hasClass('margin-zero')) {
			$protocolMenu.removeClass('margin-zero');
			console.log('first toggle');
		} else {
			$protocolMenu.addClass('margin-zero');
			console.log('second toggle');
		}
	});

	// Select input on click
	$("#suicide-input").click(function () {
	   $(this).select();
	});

	// Copy link on copy button click
	$('.copy-button').click(function() {
	    copyToClipboardMsg(document.getElementById("suicide-input"), "msg");
	});

	function copyToClipboardMsg(elem, msgElem) {
		var succeed = copyToClipboard(elem);
	    var msg;
	    if (!succeed) {
	        msg = "Copy not supported or blocked.  Press Ctrl+c to copy."
	    } else {
	        msg = "Text copied to the clipboard."
	    }
	    if (typeof msgElem === "string") {
	        msgElem = document.getElementById(msgElem);
	    }
	    msgElem.innerHTML = msg;
	    setTimeout(function() {
	        msgElem.innerHTML = "";
	    }, 2000);
	}

	function copyToClipboard(elem) {
		  // create hidden text element, if it doesn't already exist
	    var targetId = "_hiddenCopyText_";
	    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
	    var origSelectionStart, origSelectionEnd;
	    if (isInput) {
	        // can just use the original source element for the selection and copy
	        target = elem;
	        origSelectionStart = elem.selectionStart;
	        origSelectionEnd = elem.selectionEnd;
	    } else {
	        // must use a temporary form element for the selection and copy
	        target = document.getElementById(targetId);
	        if (!target) {
	            var target = document.createElement("textarea");
	            target.style.position = "absolute";
	            target.style.left = "-9999px";
	            target.style.top = "0";
	            target.id = targetId;
	            document.body.appendChild(target);
	        }
	        target.textContent = elem.textContent;
	    }
	    // select the content
	    var currentFocus = document.activeElement;
	    target.focus();
	    target.setSelectionRange(0, target.value.length);
	    
	    // copy the selection
	    var succeed;
	    try {
	    	  succeed = document.execCommand("copy");
	    } catch(e) {
	        succeed = false;
	    }
	    // restore original focus
	    if (currentFocus && typeof currentFocus.focus === "function") {
	        currentFocus.focus();
	    }
	    
	    if (isInput) {
	        // restore prior selection
	        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
	    } else {
	        // clear temporary content
	        target.textContent = "";
	    }
	    return succeed;
	}

});
