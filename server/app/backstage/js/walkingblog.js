$(function() {

	var baseurl = 'http://' + window.location.host;
	var gb = GlobalModule();
	gb.modal.tip.init();
	gb.modal.loading.init();

	loadWalkingblogsByPage();
	fetchAllPage();

	
	/*
		点击页码，换页
	*/
	$('#paging1').on('click', '.jump-page', function() {

		var page = $(this).attr('data-target') || $(this).text();

		// 请求内容
		loadWalkingblogsByPage(page);

		// 重新渲染页码
		gb.pagination.reload('#paging1', page);
	});

	/*
		退订
	*/
	var walkingblogId = '';
	var parentTr = {};
	var deleteConfirm = gb.modal.confirm.init(function () {

		$.ajax({
			url: '/admin/deleteWalkingblog',
			method: 'POST',
			data: {
				id: walkingblogId,
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

		walkingblogId = $(this).attr('data-target');
		parentTr = $(this).parent().parent();
		gb.modal.confirm.show(deleteConfirm, '是否确认删除该行博及其相应的评论？');

	});

	/*
		获取页码
	*/

	function fetchAllPage() {

		$.ajax({
			url: '/admin/walkingblogPage',
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
		获取指定页码的评论
	*/

	function loadWalkingblogsByPage(page) {

		var walkingblog_tr_rpl = $('#walkingblog_tr_rpl').html().trim();
		var norecord_rpl = $('#norecord_rpl').html().trim();

		page = page || 1;

		$.ajax({
			url: '/admin/walkingblogByPage',
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

					$.each(data.walkingblogs, function(index, walkingblog) {

						var _tr = walkingblog_tr_rpl
							.replace(/{{blogId}}/g, walkingblog.blogId)
							.replace(/{{time_createAt}}/g, gb.dateFormat(walkingblog.time.createAt, 'YYYY-MM-DD hh:mm:ss'))
							.replace(/{{time_updateAt}}/g, gb.dateFormat(walkingblog.time.updateAt, 'YYYY-MM-DD hh:mm:ss'))
							.replace(/{{tags}}/g, walkingblog.tags)
							.replace(/{{media}}/g, walkingblog.photo || walkingblog.video ? '有' : '无')
							.replace(/{{media_url}}/g, walkingblog.photo || walkingblog.video)
							.replace(/{{content}}/g, walkingblog.content.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
							.replace(/{{numbers_view}}/g, walkingblog.numbers.view)
							.replace(/{{numbers_comment}}/g, walkingblog.numbers.comment)
							.replace(/{{status}}/g, walkingblog.isShow ? '公开' : '私密')
							.replace(/{{url}}/g, '/mylife/' + walkingblog.blogId)
							.replace(/{{status_btn}}/g, walkingblog.isShow ? '设为私密' : '设为公开')
							.replace(/{{walkingBlogId}}/g, walkingblog._id);

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

		var walkingblog = $(this).parent().parent().children();

		var formData = {
			_id: $(this).attr('data-target'),
			blogId: walkingblog[0].innerText,
			time:  {
				createAt: walkingblog[1].innerText,
				updateAt: walkingblog[2].innerText,
			},
			tags: walkingblog[3].innerText,
			media: $(walkingblog[4]).attr('title'),
			mediaType: $(walkingblog[4]).attr('data-type'),
			content: walkingblog[5].innerHTML,
			numbers: walkingblog[6].innerText,
			status: walkingblog[7].innerText,
		}

		$('#edit-content').val(formData.content);
		$('#edit-tags').val(formData.tags);
		$('.old-img').attr('src', formData.media);
		$('.old-video').text(formData.media);

		var other = $('.edit-value');

		other[0].innerText = formData.blogId;
		other[1].innerText = formData.numbers;
		other[2].innerText = formData.status;
		other[3].innerText = formData.time.createAt;
		other[4].innerText = formData.time.updateAt;

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

		gb.modal.loading.show('正在发布中…');

		$.ajaxFileUpload({
			url: baseurl + '/admin/editWalkingblog', //用于文件上传的服务器端请求地址
			type: 'POST',
			secureuri: false, //是否需要安全协议，一般设置为false
			fileElementId: 'newMedia', //文件上传域的ID
			data: edit_formData,
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
					$('.old-text').text(data.photo);

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
			content: $('#edit-content').val(),
			tags: $('#edit-tags').val() || '',
			isUpdateMedia: $('#isUpdateMedia').val(),
		};

		if ( !/\S/.test(edit_formData.content) ) {

			gb.modal.tip.show('行博内容不能为空', 'error');
			return false;

		} else if ( !/\S/.test(edit_formData.id) ) {

			gb.modal.tip.show('请先选择行博', 'error');
			return false;

		}


		gb.modal.confirm.show(editConfirm, '是否确认修改行博？');
		


		// 阻断默认提交事件
		e.preventDefault();

	});


	/*
		发布行博
	*/
	var add_formData = {};

	var addConfirm = gb.modal.confirm.init(function() {

		gb.modal.loading.show('正在发布中…');

		$.ajaxFileUpload({
			url: baseurl + '/admin/addWalkingblog', //用于文件上传的服务器端请求地址
			type: 'POST',
			secureuri: false, //是否需要安全协议，一般设置为false
			fileElementId: 'media', //文件上传域的ID
			data: add_formData,
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
					gb.modal.tip.show('发布成功', 'success');
					setTimeout(function() {
						window.open( baseurl + data.url );
					}, 2000);
				} else {
					gb.modal.tip.show("发布失败，原因: " + data.reason + "。\n请重试", 'error');
				}
			},
			error: function (data, status, e) { //服务器响应失败处理函数
				gb.modal.loading.hide();
				gb.modal.tip.show('上传失败，服务器无响应，请稍后再试。', 'error');
			}
		});

	});

	$('#add-submit').on('click', function(e) {

		add_formData = {
			content: $('#wb-content').val(),
			tags: $('#wb-tags').val() || '',
			mediaType: $('#mediaType').val(),
		};

		if ( !/\S/.test(add_formData.content) ) {

			gb.modal.tip.show('行博内容不能为空', 'error');
			return false;

		}


		gb.modal.confirm.show(addConfirm, '是否确认发布行博？');
		

		



		// 阻断默认提交事件
		e.preventDefault();

	});



	/*
		更新评论数
	*/
	$('#tbody').on('click', '.update', function() {

		var id = $(this).attr('data-target');

		var that = $(this).parent().parent();

		$.ajax({
			url: '/admin/updateWalkingblogComment',
			method: 'POST',
			data: {
				id: id,
			},
			beforeSend: function() {
				gb.modal.loading.show();
			},
			complete: function() {
				gb.modal.loading.hide();
			},
			success: function(data) {

				if ( data.result == 'success' ) {

					that.find('.numbers-comment').text(data.count);

				} else {

					gb.modal.tip.show('更新失败，原因：' + data.reason, 'error');

				}

			},
			error: function() {
				gb.modal.tip.show('与服务器连接无响应', 'error');
			},
		});

	});

	/*
		修改状态
	*/
	$('#tbody').on('click', '.status', function() {

		var id = $(this).attr('data-target');

		var that = $(this).parent().parent();

		$.ajax({
			url: '/admin/changeWalkingblogStatus',
			method: 'POST',
			data: {
				id: id,
			},
			beforeSend: function() {
				gb.modal.loading.show();
			},
			complete: function() {
				gb.modal.loading.hide();
			},
			success: function(data) {

				if ( data.result == 'success' ) {


					that.find('.status').text( data.show ? '设为私密' : '设为公开' );

					data.show = data.show ? '公开' : '私密';

					that.find('.status-value').text(data.show);

				} else {

					gb.modal.tip.show('更新失败，原因：' + data.reason, 'error');

				}

			},
			error: function() {
				gb.modal.tip.show('与服务器连接无响应', 'error');
			},
		});

	});








});