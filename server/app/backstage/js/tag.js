$(function() {

	var baseurl = 'http://' + window.location.host;
	var gb = GlobalModule();
	gb.modal.tip.init();
	gb.modal.tip_small.init();
	gb.modal.loading.init();

	loadTags();

	/*
		删除标签
	*/
	var tagName = '';
	var parentTr = {};
	var deleteConfirm = gb.modal.confirm.init(function () {

		$.ajax({
			url: '/admin/deleteTag',
			method: 'POST',
			data: {
				tagName: tagName,
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

		tagName = $(this).attr('data-target');
		parentTr = $(this).parent().parent();


		blogCount = parentTr.find('.blog-count').text();

		if ( blogCount != '0' ) {

			gb.modal.tip.show('不能删除，该标签下还有博文', 'error');
			return false;

		} 


		gb.modal.confirm.show(deleteConfirm, '是否确认删除该标签？删除前请确认标签内博文为空');

	});
	
	/*
		获取标签列表
	*/

	function loadTags() {

		var tag_tr_rpl = $('#tag_tr_rpl').html().trim();
		var norecord_rpl = $('#norecord_rpl').html().trim();

		$.ajax({
			url: '/admin/loadTags',
			method: 'POST',
			beforeSend: function() {
				gb.modal.loading.show();
			},
			complete: function() {
				gb.modal.loading.hide();
			},
			success: function(data) {

				if ( data.result == 'success' ) {

					var _html = '';

					$.each(data.tags, function(index, tag) {

						var _tr = tag_tr_rpl
							.replace(/{{tagName}}/g, tag.tagName)
							.replace(/{{blogs_count}}/g, tag.blogs.length)
							.replace(/{{time_createAt}}/g, gb.dateFormat(tag.time.createAt, 'YYYY-MM-DD hh:mm:ss'))
							.replace(/{{time_updateAt}}/g, gb.dateFormat(tag.time.updateAt, 'YYYY-MM-DD hh:mm:ss'))
							.replace(/{{_id}}/g, tag._id);

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

		$('#edit-tag-old').val($(this).attr('data-target'));

		var btn = $($('.toggle-btn')[2]);
		btn.siblings('.toggle-btn').removeClass('active');
		btn.addClass('active');

		$('.panel').removeClass('open');
		$('#panel3').addClass('open');

		$('#edit-category-new').focus();


	});


	/*
		删除
	*/
	var blogId = '';
	var parentTr2 = {};
	var deleteConfirm = gb.modal.confirm.init(function () {

		$.ajax({
			url: '/admin/deleteBlog',
			method: 'POST',
			data: {
				id: blogId,
			},
			beforeSend: function() {
				gb.modal.loading.show();
			},
			complete: function() {
				gb.modal.loading.hide();
			},
			success: function(data) {
				if ( data.result == 'success' ) {

					$(parentTr2).remove();

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

		blogId = $(this).attr('data-target');
		parentTr2 = $(this).parent().parent();
		gb.modal.confirm.show(deleteConfirm, '是否确认删除该行博及其相应的评论？');

	});



	/*
		查看标签下的博文
	*/
	$('#tbody').on('click', '.view', function() {
		
		var tagName = $(this).attr('data-target');

		$('#modal-tag-title').text('“' + tagName + '” 下的博文（0）');
		$('#modal-tag').modal('show');
		loadBlogByTagName( tagName );

	});


	function loadBlogByTagName(tagName) {

		var blog_tr_rpl = $('#blog_tr_rpl').html().trim();
		var norecord_rpl = $('#norecord_rpl').html().trim();

		$.ajax({
			url: '/admin/blogByTag',
			method: 'POST',
			data: {
				tagName: tagName,
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

					$('#modal-tag-title').text($('#modal-tag-title').text().replace(/（\d*）/, '（' + data.blogs.length + '）'));

					$.each(data.blogs, function(index, blog) {

						var _tr = blog_tr_rpl
							.replace(/{{blogId}}/g, blog.blogId)
							.replace(/{{title}}/g, blog.title)
							.replace(/{{tags}}/g, blog.tags)
							.replace(/{{numbers_view}}/g, blog.numbers.view)
							.replace(/{{numbers_comment}}/g, blog.numbers.comment)
							.replace(/{{numbers_like}}/g, blog.numbers.like)
							.replace(/{{time_createAt}}/g, gb.dateFormat(blog.time.createAt, 'YYYY-MM-DD hh:mm:ss'))
							.replace(/{{time_updateAt}}/g, gb.dateFormat(blog.time.updateAt, 'YYYY-MM-DD hh:mm:ss'))
							.replace(/{{_id}}/g, blog._id);

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


	/*
		更新博文数
	*/
	$('#tbody').on('click', '.update', function() {

		var tagName = $(this).attr('data-target');

		var that = $(this).parent().parent();

		$.ajax({
			url: '/admin/updateTagBlog',
			method: 'POST',
			data: {
				tagName: tagName,
			},
			beforeSend: function() {
				gb.modal.loading.show();
			},
			complete: function() {
				gb.modal.loading.hide();
			},
			success: function(data) {

				if ( data.result == 'success' ) {

					that.find('.blog-count').text(data.count);

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
		获取标签列表
	*/
	(function() {

		$.ajax({
			url: '/tags',
			method: 'POST',
			beforeSend: function() {
				gb.modal.loading.show();
			},
			complete: function() {
				gb.modal.loading.hide();
			},
			success: function(data) {

				if ( data.result == 'success' ) {

					var _html = '';
					var _li = '<li>{{tag_name}}</li>';

					$.each(data.tags, function(index, item) {

						_html += _li.replace(/{{tag_name}}/, item.tagName);

					});

					$('.tag-list').empty().append( $(_html) );

				} else {

					gb.modal.tip.show('获取标签列表失败，原因：' + data.reason, 'error');

				}

			},
			error: function() {
				gb.modal.tip.show('与服务器连接无响应', 'error');
			},
		});
	})();

	/*
		标签列表显隐
	*/
	$('.tag-input').on('focus', function() {

		$(this).next().slideDown(200);

	});
	$('.tag-input').on('blur', function() {

		$(this).next().slideUp(200);

	});
	/*
		点击标签列表里的标签
	*/
	$('.tag-list').on('click', 'li', function() {

		var container = $(this).parent().attr('data-target');

		$(container).val( $(this).text() );

	});










	/*
		修改标签提交
	*/
	var edit_formData = {};

	var editConfirm = gb.modal.confirm.init(function() {

		gb.modal.loading.show('正在修改中…');

		$.ajax({
			url: '/admin/editTag',
			method: 'POST',
			data: {
				oldTag: edit_formData.oldTag,
				newTag: edit_formData.newTag,
			},
			beforeSend: function() {
				gb.modal.loading.show();
			},
			complete: function() {
				gb.modal.loading.hide();
			},
			success: function(data) {

				if ( data.result == 'success' ) {

					gb.modal.tip_small.show('修改成功，' + data.status, 'success', true);

				} else {

					gb.modal.tip.show('修改失败，原因：' + data.reason, 'error');

				}

			},
			error: function() {
				gb.modal.tip.show('与服务器连接无响应', 'error');
			},
		});

	});

	$('#edit-submit').on('click', function(e) {

		edit_formData = {
			oldTag: $('#edit-tag-old').val(),
			newTag: $('#edit-tag-new').val(),
		};

		console.log(edit_formData);

		if ( !/\S/.test(edit_formData.oldTag) ) {

			gb.modal.tip.show('旧标签名不能为空', 'error');
			return false;

		} else if ( !/\S/.test(edit_formData.newTag) ) {

			gb.modal.tip.show('新标签名不能为空', 'error');
			return false;

		}

		gb.modal.confirm.show(editConfirm, '是否确认修改标签名称？此操作将会一同修改该标签下所有文章的所属标签');
	

		// 阻断默认提交事件
		e.preventDefault();

	});


	/*
		新增标签
	*/
	var add_formData = {};

	var addConfirm = gb.modal.confirm.init(function() {

		gb.modal.loading.show('正在新增中…');

		$.ajax({
			url: '/admin/addTag',
			method: 'POST',
			data: {
				tagName: add_formData.tagName || '',
			},
			beforeSend: function() {
				gb.modal.loading.show();
			},
			complete: function() {
				gb.modal.loading.hide();
			},
			success: function(data) {

				if ( data.result == 'success' ) {

					gb.modal.tip_small.show('新增成功', 'success', false);
					$('#blog-tag').val('');
					loadTags();

				} else {

					gb.modal.tip.show('新增失败，原因：' + data.reason, 'error');

				}

			},
			error: function() {
				gb.modal.tip.show('与服务器连接无响应', 'error');
			},
		});

	});

	$('#add-submit').on('click', function(e) {

		add_formData = {
			tagName: $('#blog-tag').val(),
		};

		if ( !/\S/.test(add_formData.tagName) ) {

			gb.modal.tip.show('标签名不能为空', 'error');
			return false;

		}


		gb.modal.confirm.show(addConfirm, '是否确认添加该标签？');
		

		



		// 阻断默认提交事件
		e.preventDefault();

	});









});