$(function() {

	var baseurl = 'http://' + window.location.host;
	var gb = GlobalModule();
	gb.modal.tip.init();
	gb.modal.loading.init();

	loadBooksByPage();
	fetchAllPage();

	
	/*
		点击页码，换页
	*/
	$('#paging1').on('click', '.jump-page', function() {

		var page = $(this).attr('data-target') || $(this).text();

		// 请求内容
		loadBooksByPage(page);

		// 重新渲染页码
		gb.pagination.reload('#paging1', page);
	});

	/*
		退订
	*/
	var bookId = '';
	var parentTr = {};
	var deleteConfirm = gb.modal.confirm.init(function () {

		$.ajax({
			url: '/admin/deleteBook',
			method: 'POST',
			data: {
				id: bookId,
			},
			beforeSend: function() {
				gb.modal.loading.show();
			},
			complete: function() {
				gb.modal.loading.hide();
			},
			success: function(data) {
				if ( data.result == 'success' ) {

					$(parentTr).remove();

				} else {

					gb.modal.tip.show(data.reason, 'error');

				};
			},
			error: function() {
				gb.modal.tip.show('与服务器连接无响应', 'error');
			}
		});

	});

	$('#tbody').on('click', '.delete', function() {

		bookId = $(this).attr('data-target');
		parentTr = $(this).parent().parent();
		gb.modal.confirm.show(deleteConfirm, '是否确认删除该书本？');

	});

	/*
		获取页码
	*/

	function fetchAllPage() {

		$.ajax({
			url: '/admin/bookPage',
			method: 'POST',
			beforeSend: function() {
				gb.modal.loading.show();
			},
			complete: function() {
				gb.modal.loading.hide();
			},
			success: function(data) {
				if ( data.result == 'success' ) {

					gb.pagination.init('#paging1', 1, data.page);

				} else {

					gb.modal.tip.show(data.reason, 'error');

				};
			},
			error: function() {
				gb.modal.tip.show('与服务器连接无响应', 'error');
			}
		});

	};

	
	/*
		获取指定页码的书本
	*/

	function loadBooksByPage(page) {

		var book_tr_rpl = $('#book_tr_rpl').html().trim();
		var norecord_rpl = $('#norecord_rpl').html().trim();

		page = page || 1;

		$.ajax({
			url: '/admin/bookByPage',
			method: 'POST',
			data: {
				page: page,
			},
			beforeSend: function() {
				gb.modal.loading.show();
			},
			complete: function() {
				gb.modal.loading.hide();
			},
			success: function(data) {

				if ( data.result == 'success' ) {

					var _html = '';

					$.each(data.books, function(index, book) {

						var _tr = book_tr_rpl
							.replace(/{{bookId}}/g, book.bookId)
							.replace(/{{time}}/g, gb.dateFormat(book.time, 'YYYY-MM-DD hh:mm:ss'))
							.replace(/{{name}}/g, book.name)
							.replace(/{{photo}}/g, book.photo)
							.replace(/{{description}}/g, book.description.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
							.replace(/{{recommend}}/g, book.recommend)
							.replace(/{{_id}}/g, book._id);

						_html += _tr;

					});

					_html = _html ? _html : norecord_rpl;

					$('#tbody').empty();
					$('#tbody').append($(_html));

					_html = null;

				} else {

					gb.modal.tip.show(data.reason, 'error');

				};
			},
			error: function() {
				gb.modal.tip.show('与服务器连接无响应', 'error');
			},
		});

	};



	/*
		切换面板
	*/
	$('.panel-btn').on('click', '.toggle-btn', function() {

		var selector = $(this).attr('data-target');

		$(this).siblings('.toggle-btn').removeClass('active');
		$(this).addClass('active');

		$(selector).siblings('.panel').removeClass('open');
		$(selector).addClass('open');

	});


	/*
		点击修改，跳转面板
	*/
	$('#tbody').on('click', '.edit', function() {

		var book = $(this).parent().parent().children();

		var formData = {
			_id: $(this).attr('data-target'),
			bookId: book[0].innerText,
			time: book[1].innerText,
			name: book[2].innerText,
			photo: book[3].innerText,
			description: book[4].innerHTML,
			recommend: book[5].innerText,
		}

		$('#edit-name').val(formData.name);
		$('#edit-description').val(formData.description);
		$('.old-img').attr('src', formData.photo);

		var other = $('.edit-value');

		other[0].innerText = formData.bookId;
		other[1].innerText = formData.recommend;
		other[2].innerText = formData.time;

		$('#edit-submit').attr('data-target', formData._id);

		var btn = $($('.toggle-btn')[2]);
		btn.siblings('.toggle-btn').removeClass('active');
		btn.addClass('active');

		$('.panel').removeClass('open');
		$('#panel3').addClass('open');


	});





	/*
		修改行博提交
	*/
	var edit_formData = {};

	var editConfirm = gb.modal.confirm.init(function() {

		gb.modal.loading.show('正在修改中…');

		$.ajaxFileUpload({
			url: baseurl + '/admin/editbook', //用于文件上传的服务器端请求地址
			type: 'POST',
			secureuri: false, //是否需要安全协议，一般设置为false
			fileElementId: 'newPhoto', //文件上传域的ID
			data: { 
				id: edit_formData.id,
				name: edit_formData.name,
				description: edit_formData.description,
			},
			dataType: 'text', //返回值类型 一般设置为json
			success: function (data, status) { //服务器成功响应处理函数 
				var json;
				data.replace(/({.*})/, function(match, capture) {
					json = capture;
					return capture;
				});
				gb.modal.loading.hide();
				data = gb.parseJSON(json);
				if(data.result == "success") {
					gb.modal.tip.show('修改成功', 'success');

					$('.old-img').attr('src', data.photo);

					setTimeout(function() {
						window.open( baseurl + data.url );
					}, 2000);

				} else {
					gb.modal.tip.show("修改失败，原因: " + data.reason + "。\n请重试", 'error');
				}
			},
			error: function (data, status, e) { //服务器响应失败处理函数
				gb.modal.loading.hide();
				gb.modal.tip.show('上传失败，服务器无响应，请稍后再试。', 'error');
			}
		});

	});

	$('#edit-submit').on('click', function(e) {

		edit_formData = {
			id: $('#edit-submit').attr('data-target') || '',
			name: $('#edit-name').val(),
			description: $('#edit-description').val(),
		};

		if ( !/\S/.test(edit_formData.content) ) {

			gb.modal.tip.show('书本名称不能为空', 'error');
			return false;

		} else if ( !/\S/.test(edit_formData.id) ) {

			gb.modal.tip.show('请先选择行博', 'error');
			return false;

		} else if ( !/\S/.test(edit_formData.id) ) {

			gb.modal.tip.show('请先选择书本', 'error');
			return false;

		}


		gb.modal.confirm.show(editConfirm, '是否确认修改书本信息？');
		


		// 阻断默认提交事件
		e.preventDefault();

	});


	/*
		发布书本
	*/
	var add_formData = {};

	var addConfirm = gb.modal.confirm.init(function() {

		gb.modal.loading.show('正在发布中…');

		$.ajaxFileUpload({
			url: baseurl + '/admin/addbook', //用于文件上传的服务器端请求地址
			type: 'POST',
			secureuri: false, //是否需要安全协议，一般设置为false
			fileElementId: 'photo', //文件上传域的ID
			data: { 
				name: add_formData.name,
				description: add_formData.description,
			},
			dataType: 'text', //返回值类型 一般设置为json
			success: function (data, status) { //服务器成功响应处理函数 
				var json;
				data.replace(/({.*})/, function(match, capture) {
					json = capture;
					return capture;
				});
				gb.modal.loading.hide();
				data = gb.parseJSON(json);
				if(data.result == "success") {
					gb.modal.tip.show('新增成功', 'success');
					$('#book-name').val('');
					$('#book-description').val('');
					loadBooksByPage();
				} else {
					gb.modal.tip.show("新增失败，原因: " + data.reason + "。\n请重试", 'error');
				}
			},
			error: function (data, status, e) { //服务器响应失败处理函数
				gb.modal.loading.hide();
				gb.modal.tip.show('新增失败，服务器无响应，请稍后再试。', 'error');
			}
		});

	});

	$('#add-submit').on('click', function(e) {

		add_formData = {
			name: $('#book-name').val(),
			description: $('#book-description').val(),
		};

		if ( !/\S/.test(add_formData.name) ) {

			gb.modal.tip.show('书本名称不能为空', 'error');
			return false;

		} else if ( !/\S/.test(add_formData.description) ) {

			gb.modal.tip.show('书本描述不能为空', 'error');
			return false;

		}


		gb.modal.confirm.show(addConfirm, '是否确认添加该书本？');
		

		



		// 阻断默认提交事件
		e.preventDefault();

	});









});