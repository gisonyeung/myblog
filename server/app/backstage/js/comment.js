$(function() {

	var baseurl = 'http://' + window.location.host;
	var gb = GlobalModule();
	gb.modal.tip.init();
	gb.modal.loading.init();

	loadCommentsByPage();
	fetchAllPage();

	
	/*
		点击页码，换页
	*/
	$('#paging1').on('click', '.jump-page', function() {

		var page = $(this).attr('data-target') || $(this).text();

		// 请求内容
		loadCommentsByPage(page);

		// 重新渲染页码
		gb.pagination.reload('#paging1', page);

		// 取消过滤
		$('.btn-success').removeClass('btn-success');


	});

	/*
		删除评论
	*/
	var commentId = '';
	var parentTr = {};
	var deleteConfirm = gb.modal.confirm.init(function() {

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

	$('#tbody').on('click', '.delete', function() {

		commentId = $(this).attr('data-target');
		parentTr = $(this).parent().parent();
		gb.modal.confirm.show(deleteConfirm, '是否确认删除该评论？');

	});


	/*
		过滤
	*/
	$('.handleBtn').on('click', '.btn', function() {

		// 取消过滤
		if ( $(this).hasClass('btn-success') ) {

			$(this).removeClass('btn-success');
			$('.comment').show();

		} else {

			var type = $(this).attr('data-target');
			$(this).siblings().removeClass('btn-success');
			$(this).addClass('btn-success');
			$('.comment').hide();
			$('.' + type).show();

		}
		

		

	});



	

	/*
		获取页码
	*/

	function fetchAllPage() {

		$.ajax({
			url: '/admin/commentPage',
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

	function loadCommentsByPage(page) {

		var comment_tr_rpl = $('#comment_tr_rpl').html().trim();
		var norecord_rpl = $('#norecord_rpl').html().trim();

		page = page || 1;

		$.ajax({
			url: '/admin/commentByPage',
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



});