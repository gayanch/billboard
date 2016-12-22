function delete_file(file_id, filename) {
	$.ajax({
		url: '/cms/' + file_id + '/delete',
		type: 'get',
		data: {filename: filename},
		success: function(response) {
			Materialize.toast(response, 3500);
		}
	});

			// Materialize.toast("Deleted: " + title, 3500);
}

function show_cms_upload_window(file_id) {
	var left = (screen.width/2)-(600/2);
	var top = (screen.height/2)-(320/2);
	window.open('/cms/file/' + file_id + '/upload', 'Upload',
						'width=600, height=320, location=no, menubar=no, top=' + top + ', left=' + left);
}
