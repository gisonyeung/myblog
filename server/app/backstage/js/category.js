$(function() {

	var baseurl = 'http://' + window.location.host;
	var gb = GlobalModule();
	gb.modal.tip.init();
	gb.modal.tip_small.init();
	gb.modal.loading.init();

	loadCategories();

	/*
		删除
	*/
	var cateName = '';
	var parentTr = {};
	var deleteConfirm = gb.modal.confirm.init(function () {

		$.ajax({
			url: '/admin/deleteCategory',
			method: 'POST',
			data: {
				cateName: cateName,
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

		cateName = $(this).attr('data-target');
		parentTr = $(this).parent().parent();


		blogCount = parentTr.find('.blog-count').text();

		if ( blogCount != '0' ) {

			gb.modal.tip.show('不能删除，该分类下还有博文', 'error');
			return false;

		} 


		gb.modal.confirm.show(deleteConfirm, '是否确认删除该分类？删除前请确认分类内博文为空');

	});
	
	/*
		获取分类列表
	*/

	function loadCategories() {

		var cate_tr_rpl = $('#cate_tr_rpl').html().trim();
		var norecord_rpl = $('#norecord_rpl').html().trim();

		$.ajax({
			url: '/admin/loadCategories',
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

					$.each(data.categories, function(index, category) {

						var _tr = cate_tr_rpl
							.replace(/{{cateName}}/g, category.cateName)
							.replace(/{{blogs_count}}/g, category.blogs.length)
							.replace(/{{time_createAt}}/g, gb.dateFormat(category.time.createAt, 'YYYY-MM-DD hh:mm:ss'))
							.replace(/{{time_updateAt}}/g, gb.dateFormat(category.time.updateAt, 'YYYY-MM-DD hh:mm:ss'))
							.replace(/{{_id}}/g, category._id);

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

		$('#edit-category-old').val($(this).attr('data-target'));

		var btn = $($('.toggle-btn')[2]);
		btn.siblings('.toggle-btn').removeClass('active');
		btn.addClass('active');

		$('.panel').removeClass('open');
		$('#panel3').addClass('open');

		$('#edit-category-new').focus();


	});



	/*
		查看分类下的博文
	*/
	$('#tbody').on('click', '.view', function() {
		
		var cateName = $(this).attr('data-target');

		$('#modal-cate-title').text('“' + cateName + '” 下的博文（0）');
		$('#modal-cate').modal('show');
		loadBlogByCateName( cateName );

	});


	function loadBlogByCateName(cateName) {

		var blog_tr_rpl = $('#blog_tr_rpl').html().trim();
		var norecord_rpl = $('#norecord_rpl').html().trim();

		$.ajax({
			url: '/admin/blogByCategory',
			method: 'POST',
			data: {
				cateName: cateName,
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

					$('#modal-cate-title').text($('#modal-cate-title').text().replace(/（\d*）/, '（' + data.blogs.length + '）'));

					$.each(data.blogs, function(index, blog) {

						var _tr = blog_tr_rpl
							.replace(/{{blogId}}/g, blog.blogId)
							.replace(/{{title}}/g, blog.title)
							.replace(/{{category}}/g, blog.category)
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

		var cateName = $(this).attr('data-target');

		var that = $(this).parent().parent();

		$.ajax({
			url: '/admin/updateCateBlog',
			method: 'POST',
			data: {
				cateName: cateName,
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
		获取分类列表
	*/
	(function() {

		$.ajax({
			url: '/categories',
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
					var _li = '<li>{{cate_name}}</li>';

					$.each(data.category, function(index, item) {

						_html += _li.replace(/{{cate_name}}/, item.cateName);

					});

					$('.cate-list').empty().append( $(_html) );

				} else {

					gb.modal.tip.show('获取分类列表失败，原因：' + data.reason, 'error');

				}

			},
			error: function() {
				gb.modal.tip.show('与服务器连接无响应', 'error');
			},
		});
	})();

	/*
		分类列表显隐
	*/
	$('.cate-input').on('focus', function() {

		$(this).next().slideDown(200);

	});
	$('.cate-input').on('blur', function() {

		$(this).next().slideUp(200);

	});
	/*
		点击分类列表里的分类
	*/
	$('.cate-list').on('click', 'li', function() {

		var container = $(this).parent().attr('data-target');


		$(container).val( $(this).text() );

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
		修改行博提交
	*/
	var edit_formData = {};

	var editConfirm = gb.modal.confirm.init(function() {

		gb.modal.loading.show('正在修改中…');

		$.ajax({
			url: '/admin/editCategory',
			method: 'POST',
			data: {
				oldCate: edit_formData.oldCate,
				newCate: edit_formData.newCate,
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
			oldCate: $('#edit-category-old').val(),
			newCate: $('#edit-category-new').val(),
		};

		if ( !/\S/.test(edit_formData.oldCate) ) {

			gb.modal.tip.show('旧分类名不能为空', 'error');
			return false;

		} else if ( !/\S/.test(edit_formData.newCate) ) {

			gb.modal.tip.show('新分类名不能为空', 'error');
			return false;

		}

		gb.modal.confirm.show(editConfirm, '是否确认修改分类名称？此操作将会一同修改该分类下所有文章的所属分类');
	

		// 阻断默认提交事件
		e.preventDefault();

	});


	/*
		新增分类
	*/
	var add_formData = {};

	var addConfirm = gb.modal.confirm.init(function() {

		gb.modal.loading.show('正在新增中…');

		$.ajax({
			url: '/admin/addCategory',
			method: 'POST',
			data: {
				cateName: add_formData.cateName,
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
					$('#blog-category').val('');

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
			cateName: $('#blog-category').val(),
		};

		if ( !/\S/.test(add_formData.cateName) ) {

			gb.modal.tip.show('分类名不能为空', 'error');
			return false;

		}


		gb.modal.confirm.show(addConfirm, '是否确认添加该分类？');
		

		



		// 阻断默认提交事件
		e.preventDefault();

	});









});