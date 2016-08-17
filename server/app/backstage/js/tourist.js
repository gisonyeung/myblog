$(function() {

	var baseurl = 'http://' + window.location.host;
	var gb = GlobalModule();
	gb.modal.tip.init();
	gb.modal.loading.init();

	loadtouristsByPage();
	fetchAllPage();

	
	/*
		点击页码，换页
	*/
	$('#paging1').on('click', '.jump-page', function() {

		var page = $(this).attr('data-target') || $(this).text();

		// 请求内容
		loadtouristsByPage(page);

		// 重新渲染页码
		gb.pagination.reload('#paging1', page);

		// 取消过滤
		$('.btn-success').removeClass('btn-success');


	});

	/*
		删除游客
	*/
	var touristId = '';
	var parentTr = {};
	var deleteConfirm = gb.modal.confirm.init(function() {

		$.ajax({
			url: '/admin/deleteTourist',
			method: 'POST',
			data: {
				id: touristId,
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

		touristId = $(this).attr('data-target');
		parentTr = $(this).parent().parent();
		gb.modal.confirm.show(deleteConfirm, '是否确认删除该游客？');

	});



	

	/*
		获取页码
	*/

	function fetchAllPage() {

		$.ajax({
			url: '/admin/touristPage',
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
		获取指定页码的游客
	*/

	function loadtouristsByPage(page) {

		var tourist_tr_rpl = $('#tourist_tr_rpl').html().trim();
		var norecord_rpl = $('#norecord_rpl').html().trim();

		page = page || 1;

		$.ajax({
			url: '/admin/touristByPage',
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

					$.each(data.tourists, function(index, tourist) {

						tourist.nickname = tourist.nickname || '';

						var _tr = tourist_tr_rpl
							.replace(/{{nickname}}/g, tourist.nickname.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
							.replace(/{{email}}/g, tourist.email.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
							.replace(/{{website}}/g, tourist.website.replace(/</g, '&lt;').replace(/>/g, '&gt;') || '无')
							.replace(/{{time}}/g, gb.dateFormat(tourist.createAt, 'YYYY-MM-DD hh:mm:ss'))
							.replace(/{{touristId}}/g, tourist._id);

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
		获取游客评论
	*/
	$('#tbody').on('click', '.view', function() {
		
		var email = $(this).attr('data-target');

		$('#modal-comment-title').text(email + ' 的评论（0）');
		$('#modal-comment').modal('show');
		loadCommentByTourist( email );

	});


	function loadCommentByTourist(email) {

		var comment_tr_rpl = $('#comment_tr_rpl').html().trim();
		var norecord_rpl = $('#norecord_rpl').html().trim();

		$.ajax({
			url: '/admin/CommentByTourist',
			method: 'POST',
			data: {
				email: email,
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

					$('#modal-comment-title').text($('#modal-comment-title').text().replace(/（\d*）/, '（' + data.comments.length + '）'));

					$.each(data.comments, function(index, comment) {

						comment.replyTo = comment.replyTo ? comment.replyTo : {
							nickname: '',
							email: '',
						};

						var url = '';

						if ( comment.type == 'blog' ) {

							url = '/article/' + comment.host;

						} else if ( comment.type == 'wb' ) {

							url = '/mylife/' + comment.host;

						} else {

							url = '/board';

						};

						var _tr = comment_tr_rpl
							.replace(/{{type}}/g, comment.type)
							.replace(/{{hostId}}/g, comment.host)
							.replace(/{{nickname_from}}/g, comment.user.nickname.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
							.replace(/{{email_from}}/g, comment.user.email.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
							.replace(/{{nickname_to}}/g, comment.replyTo.nickname.replace(/</g, '&lt;').replace(/>/g, '&gt;') || '无')
							.replace(/{{email_to}}/g, comment.replyTo.email.replace(/</g, '&lt;').replace(/>/g, '&gt;') || '无')
							.replace(/{{time}}/g, gb.dateFormat(comment.time, 'YYYY-MM-DD hh:mm:ss'))
							.replace(/{{content}}/g, comment.content.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
							.replace(/{{url}}/g, url)
							.replace(/{{commentId}}/g, comment._id);

						_html += _tr;

					});

					_html = _html ? _html : norecord_rpl;

					$('#tbody2').empty();
					$('#tbody2').append($(_html));

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


	var commentId = '';
	var parentTr = {};
	var deleteConfirm2 = gb.modal.confirm.init(function() {

		$.ajax({
			url: '/admin/deleteComment',
			method: 'POST',
			data: {
				id: commentId,
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

	$('#tbody2').on('click', '.delete', function() {

		commentId = $(this).attr('data-target');
		parentTr = $(this).parent().parent();
		gb.modal.confirm.show(deleteConfirm2, '是否确认删除该评论？');

	});



});