function show_upload_window(node_id) {
	if (!is_online(node_id)) {
		Materialize.toast("Sorry! Board is currently offline.", 4000);
		return;
	}

	var left = (screen.width/2)-(600/2);
	var top = (screen.height/2)-(320/2);
	window.open('/node/' + node_id + '/upload', 'Upload',
						'width=600, height=320, location=no, menubar=no, top=' + top + ', left=' + left);

	// $.ajax({
	// 	url: '/node/' + node_id + '/upload',
	// 	success: function(response) {
	// 		var dialog = bootbox.dialog({
	// 			title: '<h2>Upload to ' + node_id + '</h2>',
	// 		    message: response
	// 		});
	// 	}
	// });
}

function show_upload_from_cms_window(node_id) {
	if (!is_online(node_id)) {
		Materialize.toast("Sorry! Board is currently offline.", 4000);
		return;
	}

	var left = (screen.width/2)-(600/2);
	var top = (screen.height/2)-(400/2);
	window.open('/node/' + node_id + '/upload-cms', 'Upload',
						'width=600, height=400, location=no, menubar=no, top=' + top + ', left=' + left);
}

// function show_node_info(node_id) {
// 	$.ajax({
// 		url: '/node/' + node_id + '/info',
// 		type: 'get',
// 		success: function(response) {
// 			var dialog = bootbox.dialog({
// 				title:  node_id + ' Info',
// 			    message: response
// 			});
// 		}
// 	});
// }
//
// function delete_node(node_id) {
// 	bootbox.confirm({
// 	    message: "Confirm Delete, " + node_id + '?',
// 	    buttons: {
// 	        confirm: {
// 	            label: 'Yes',
// 	            className: 'btn-danger'
// 	        },
// 	        cancel: {
// 	            label: 'No',
// 	            className: 'btn-success'
// 	        }
// 	    },
//
// 	    callback: function (result) {
// 	        if (result == true) {
// 				$.ajax({
// 					url: '/node/' + node_id + '/delete',
// 					type: 'get',
// 					success: function(response) {
// 						bootbox.alert({
// 							message: response,
// 							title: 'Delete Node'
// 						});
// 					}
// 				});
// 			}
// 	    }
// 	});
// }

function is_online(node_id) {
	$.ajax({
		url: '/node/' + node_id + '/status',
		type: 'get',
		cache: false,
		success: function(response) {
			if (response) {
				if (response == 'Online') {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
		error: function(err) {
			return false;
		}
	});
}

function delete_node(node_id) {
	$.ajax({
		url: '/node/' + node_id + '/delete',
		type: 'get',
		success: function(response) {
			Materialize.toast(response, 3500);
			$('#' + node_id).addClass('hide');
		}
	});
}

function check_status(node_id, icon_elm, text_elm) {
	console.log('Checking ststus: ' + node_id);
	$.ajax({
		url: '/node/' + node_id + '/status',
		type: 'get',
		cache: false,
		success: function(response) {
			if (response) {
				text_elm.html('&nbsp;' + response);
				icon_elm.removeClass('fa fa-spin fa-spinner')
				if (response == 'Online') {
					icon_elm.addClass('fa fa-heart');
				} else {
					icon_elm.addClass('fa fa-heart-o');
				}
			} else {
				console.log('No response');
				text_elm.html('&nbsp; Offline');
				icon_elm.addClass('fa fa-heart-o');
			}
		},
		error: function(err) {
			console.log("Error" + err);
			icon_elm.removeClass('fa fa-spin fa-spinner')
			text_elm.html('&nbsp; Offline');
			icon_elm.addClass('fa fa-heart-o');
		}
	});
}

function show_file_manager(node_ip, node_id) {
	console.log(is_online(node_id));
	if (!is_online(node_id)) {
		Materialize.toast("Sorry! Board is currently offline.", 4000);
		return;
	}

	var left = (screen.width/2)-(600/2);
	var top = (screen.height/2)-(400/2);
	window.open(node_ip + '/files', 'Upload',
						'width=600, height=400, location=no, menubar=no, top=' + top + ', left=' + left);

}

function show_node_edit_window(node_id) {
	var left = (screen.width/2)-(600/2);
	var top = (screen.height/2)-(600/2);
	window.open('/node/' + node_id + '/edit', 'Edit Board',
						'width=600, height=600, location=no, menubar=no, top=' + top + ', left=' + left);
}

//debug methods
function tmp_del(modal_obj) {
	$('#'+modal_obj).openModal();
}
