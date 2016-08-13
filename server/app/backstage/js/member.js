$(function() {

	var baseurl = 'http://' + window.location.host;
	var gb = GlobalModule();
	gb.modal.tip.init();
	gb.modal.loading.init();

	loadMembersByPage();
	fetchAllPage();

	
	/*
		点击页码，换页
	*/
	$('#paging1').on('click', '.jump-page', function() {

		var page = $(this).attr('data-target') || $(this).text();

		// 请求内容
		loadmembersByPage(page);

		// 重新渲染页码
		gb.pagination.reload('#paging1', page);
	});

	/*
		退订
	*/
	var memberId = '';
	var parentTr = {};
	var deleteConfirm = gb.modal.confirm.init(function () {

		$.ajax({
			url: '/admin/deleteMember',
			method: 'POST',
			data: {
				id: memberId,
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

		memberId = $(this).attr('data-target');
		parentTr = $(this).parent().parent();
		gb.modal.confirm.show(deleteConfirm, '是否确认取消该用户对您的订阅？');

	});

	/*
		获取页码
	*/

	function fetchAllPage() {

		$.ajax({
			url: '/admin/memberPage',
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

	function loadMembersByPage(page) {

		var member_tr_rpl = $('#member_tr_rpl').html().trim();
		var norecord_rpl = $('#norecord_rpl').html().trim();

		page = page || 1;

		$.ajax({
			url: '/admin/memberByPage',
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

					$.each(data.members, function(index, member) {

						var _tr = member_tr_rpl
							.replace(/{{nickname}}/g, member.nickname.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
							.replace(/{{email}}/g, member.email.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
							.replace(/{{time}}/g, gb.dateFormat(member.createAt, 'YYYY-MM-DD hh:mm:ss'))
							.replace(/{{memberId}}/g, member._id);

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