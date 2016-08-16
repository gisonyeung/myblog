$(function() {

	var baseurl = 'http://' + window.location.host;
	var gb = GlobalModule();
	gb.modal.tip.init();
	gb.modal.loading.init();

	loadBlogsByPage();
	fetchAllPage();

	
	/*
		点击页码，换页
	*/
	$('#paging1').on('click', '.jump-page', function() {

		var page = $(this).attr('data-target') || $(this).text();

		// 请求内容
		loadBlogsByPage(page);

		// 重新渲染页码
		gb.pagination.reload('#paging1', page);
	});

	/*
		删除
	*/
	var blogId = '';
	var parentTr = {};
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

		blogId = $(this).attr('data-target');
		parentTr = $(this).parent().parent();
		gb.modal.confirm.show(deleteConfirm, '是否确认删除该行博及其相应的评论？');

	});

	/*
		获取页码
	*/

	function fetchAllPage() {

		$.ajax({
			url: '/admin/blogPage',
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
		获取指定页码的博客
	*/

	function loadBlogsByPage(page) {

		var blog_tr_rpl = $('#blog_tr_rpl').html().trim();
		var norecord_rpl = $('#norecord_rpl').html().trim();

		page = page || 1;

		$.ajax({
			url: '/admin/blogByPage',
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

					$.each(data.blogs, function(index, blog) {

						var _tr = blog_tr_rpl
							.replace(/{{blogId}}/g, blog.blogId)
							.replace(/{{time_createAt}}/g, gb.dateFormat(blog.time.createAt, 'YYYY-MM-DD hh:mm:ss'))
							.replace(/{{time_updateAt}}/g, gb.dateFormat(blog.time.updateAt, 'YYYY-MM-DD hh:mm:ss'))
							.replace(/{{category}}/g, blog.category)
							.replace(/{{tags}}/g, blog.tags)
							.replace(/{{title}}/g, blog.title)
							.replace(/{{numbers_view}}/g, blog.numbers.view)
							.replace(/{{numbers_comment}}/g, blog.numbers.comment)
							.replace(/{{numbers_like}}/g, blog.numbers.like)
							.replace(/{{status}}/g, blog.isShow ? '公开' : '私密')
							.replace(/{{url}}/g, '/article/' + blog.blogId)
							.replace(/{{status_btn}}/g, blog.isShow ? '设为私密' : '设为公开')
							.replace(/{{_id}}/g, blog._id);

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
		点击修改，获取博文详情并切换面板
	*/
	$('#tbody').on('click', '.edit', function() {

		var id = $(this).attr('data-target');

		$.ajax({
			url: '/admin/blogDetail',
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

				if(data.result == "success") {

					console.log(data.blog);

					$('#edit-title').val(data.blog.title);
					$('#edit-category').val(data.blog.category);
					$('#edit-summation').val(data.blog.summary);
					$('#edit-tags').val(data.blog.tags);
					$('#edit-content').val(data.blog.markdown);

					Preview2.window.writeHTML('Preview2', data.blog.content);

					$('#edit-submit').attr('data-target', data.blog._id);

					var other = $('.edit-value');

					other[0].innerText = data.blog.blogId;
					other[1].innerText = data.blog.numbers.view + '/' + data.blog.numbers.comment;
					other[2].innerText = data.blog.isShow ? '公开' : '私密';
					other[3].innerText = dateFormat(data.blog.time.createAt, 'YYYY-MM-DD hh:mm:ss');
					other[4].innerText = dateFormat(data.blog.time.updateAt, 'YYYY-MM-DD hh:mm:ss');


				} else {
					gb.modal.tip.show("获取博文内容失败，原因: " + data.reason + "。\n请重试", 'error');
				}

			},
			error: function() {
				gb.modal.tip.show('与服务器连接无响应', 'error');
			},
		});

		


		var btn = $($('.toggle-btn')[2]);
		btn.siblings('.toggle-btn').removeClass('active');
		btn.addClass('active');

		$('.panel').removeClass('open');
		$('#panel3').addClass('open');


	});





	/*
		修改博文提交
	*/
	var edit_formData = {};

	var editConfirm = gb.modal.confirm.init(function() {

		gb.modal.loading.show('正在提交中…');

		$.ajax({
			url: '/admin/editBlog',
			method: 'POST',
			data: edit_formData,
			beforeSend: function() {
				gb.modal.loading.show();
			},
			complete: function() {
				gb.modal.loading.hide();
			},
			success: function(data) {

				if(data.result == "success") {
					gb.modal.tip.show('修改成功', 'success');
					
					setTimeout(function() {
						window.open( baseurl + data.url);
					}, 2000);

				} else {
					gb.modal.tip.show("修改失败，原因: " + data.reason + "。\n请重试", 'error');
				}

			},
			error: function() {
				gb.modal.tip.show('与服务器连接无响应', 'error');
			},
		});

	});

	$('#edit-submit').on('click', function(e) {

		var id = $(this).attr('data-target');

		edit_formData = {
			id: id,
			title: $('#edit-title').val() || '',
			category: $('#edit-category').val() || '',
			summary: $('#edit-summation').val() || '',
			tags: $('#edit-tags').val() || '',
			content:  converter.makeHtml($('#edit-content').val()) || '',
			markdown: $('#edit-content').val() || '',
		};

		if ( !/\S/.test(edit_formData.id) ) {

			gb.modal.tip.show('请先选择要修改的博文', 'error');
			return false;

		} else if ( !/\S/.test(edit_formData.title) ) {

			gb.modal.tip.show('博文标题不能为空', 'error');
			return false;

		} else if ( !/\S/.test(edit_formData.category) ) {

			gb.modal.tip.show('博文分类不能为空', 'error');
			return false;

		} else if ( !/\S/.test(edit_formData.summation) ) {

			gb.modal.tip.show('博文摘要不能为空', 'error');
			return false;

		} else if ( !/\S/.test(edit_formData.markdown) ) {

			gb.modal.tip.show('博文内容不能为空', 'error');
			return false;

		}

		gb.modal.confirm.show(editConfirm, '是否确认修改博文？');
		



		// 阻断默认提交事件
		e.preventDefault();

	});


	/*
		发布博文
	*/
	var add_formData = {};

	var addConfirm = gb.modal.confirm.init(function() {

		gb.modal.loading.show('正在发布中…');

		$.ajax({
			url: '/admin/addBlog',
			method: 'POST',
			data: add_formData,
			beforeSend: function() {
				gb.modal.loading.show();
			},
			complete: function() {
				gb.modal.loading.hide();
			},
			success: function(data) {

				if(data.result == "success") {
					gb.modal.tip.show('发布成功', 'success');
					// 清除localStorage
					setTimeout(function() {

						localStorage.setItem('ArticleCache', '{}');
						location.reload();
						window.open( baseurl + data.url );

					}, 2000);
				} else {
					gb.modal.tip.show("发布失败，原因: " + data.reason + "。\n请重试", 'error');
				}

			},
			error: function() {
				gb.modal.tip.show('与服务器连接无响应', 'error');
			},
		});

	});

	$('#add-submit').on('click', function(e) {

		add_formData = {
			title: $('#blog-title').val() || '',
			category: $('#blog-category').val() || '',
			summary: $('#blog-summation').val() || '',
			tags: $('#blog-tags').val() || '',
			isNotice: $('#isNotice').val(),
			content:  converter.makeHtml($('#blog-content').val()) || '',
			markdown: $('#blog-content').val() || '',
		};

		if ( !/\S/.test(add_formData.title) ) {

			gb.modal.tip.show('博文标题不能为空', 'error');
			return false;

		} else if ( !/\S/.test(add_formData.category) ) {

			gb.modal.tip.show('博文分类不能为空', 'error');
			return false;

		} else if ( !/\S/.test(add_formData.summation) ) {

			gb.modal.tip.show('博文摘要不能为空', 'error');
			return false;

		} else if ( !/\S/.test(add_formData.markdown) ) {

			gb.modal.tip.show('博文内容不能为空', 'error');
			return false;

		}

		gb.modal.confirm.show(addConfirm, '是否确认发布博文？');
		



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
			url: '/admin/updateblogComment',
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
			url: '/admin/changeBlogStatus',
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


	/*
		显隐面板
	*/
	$('.switch').on('click', function() {

		var panel = $(this).parent().find('.switch-panel');
		$(panel).slideToggle(200);

	});


	var converter = new showdown.Converter({
		tasklists: true,
	});

	// var Preview = $('#Preview');

	/*
		输入内容，同步更新
	*/
	$('#blog-content').on('keyup', function() {

		var value = $(this).val();

		Preview.window.writeHTML('Preview', converter.makeHtml(value));

		// 存草稿
		saveDraft_repeat();

		// 适应textarea高度
		resizeContentHeight('#blog-content');

	});

	$('#edit-content').on('keyup', function() {

		var value = $(this).val();

		Preview2.window.writeHTML('Preview2', converter.makeHtml(value));

		// 适应textarea高度
		resizeContentHeight('#edit-content');

	});


	function resizeContentHeight(selector) {

		var content = $(selector).val();
		$('#calHeight').text(content);
		var height = $('#calHeight').height();
		console.log(height);
		$(selector).css('min-height', (height + 200) + 'px' );

	};








	/*
		获取图片url
	*/
	$('.upload-photo').on('click', function() {

		var editor = $(this).attr('data-target');
		var fileId = $(this).attr('data-file');

		$.ajaxFileUpload({
			url: baseurl + '/admin/uploadPhoto', //用于文件上传的服务器端请求地址
			type: 'POST',
			secureuri: false, //是否需要安全协议，一般设置为false
			fileElementId: fileId, //文件上传域的ID
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
					$(editor).val( $(editor).val() + '![](' + data.url + ')');
				} else {
					gb.modal.tip.show("上传失败，原因: " + data.reason + "。\n请重试", 'error');
				}
			},
			error: function (data, status, e) { //服务器响应失败处理函数
				gb.modal.loading.hide();
				gb.modal.tip.show('上传失败，服务器无响应，请稍后再试。', 'error');
			}
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


		var oldValue = $(container).val().replace(/,*$/, '');

		var newValue = $(this).text();

		var reg = new RegExp(newValue);

		// 输入框里已经含有新标签，则不继续添加
		if ( reg.test(oldValue) ) {
			return false;
		}


		oldValue = oldValue ? oldValue + ',' : '';


		$(container).val( oldValue + newValue );

	});


	/*
		保存草稿
	*/
	function saveDraft() {

		var formData = {
			title: $('#blog-title').val() || '',
			category: $('#blog-category').val() || '',
			summation: $('#blog-summation').val() || '',
			tags: $('#blog-tags').val() || '',
			isNotice: $('#isNotice').val(),
			content: $('#blog-content').val() || '',
		}

		var formStr = JSON.stringify(formData);

		localStorage.setItem('ArticleCache', formStr);
		saveSuccessTip();

	};


	var timeouting = false;
	function saveDraft_repeat() {

		var formData = {
			title: $('#blog-title').val() || '',
			category: $('#blog-category').val() || '',
			summation: $('#blog-summation').val() || '',
			tags: $('#blog-tags').val() || '',
			isNotice: $('#isNotice').val(),
			content: $('#blog-content').val() || '',
		};

		var formStr = JSON.stringify(formData);

		// 定时器过期了，则执行保存，并且再次开启30s定时器
		if ( !timeouting ) {

			timeouting = true;

			localStorage.setItem('ArticleCache', formStr);
			saveSuccessTip();

			setTimeout(function() {
				timeouting = false;
				saveDraft_repeat();
			}, 30000);

		}


	};


	/*
		保存草稿成功提示
	*/
	function saveSuccessTip() {

		var time = dateFormat(Date.now(), 'YYYY-MM-DD hh:mm:ss');
		$('.cache-time').text(time);
		$('.cache-tip').addClass('show');

	};

	// 手动保存草稿
	$('#save-draft').on('click', function() {

		saveDraft();

	});





	function dateFormat(dateString, fmt) {

		var _Date = new Date(dateString);

	    var o = {
	        "M+": _Date.getMonth() + 1, //月份 
	        "D+": _Date.getDate(), //日 
	        "h+": _Date.getHours(), //小时 
	        "m+": _Date.getMinutes(), //分 
	        "s+": _Date.getSeconds(), //秒 
	        "q+": Math.floor((_Date.getMonth() + 3) / 3), //季度 
	        "S": _Date.getMilliseconds() //毫秒 
	    };
	    if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (_Date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    
	    return fmt;
	}




	/*
		加载草稿的内容
	*/

	function loadDraft() {

		var formStr = localStorage.getItem('ArticleCache');

		if ( formStr ) {

			var formData = JSON.parse(formStr);
			$('#blog-title').val(formData.title);
			$('#blog-category').val(formData.category);
			$('#blog-summation').val(formData.summation);
			$('#blog-tags').val(formData.tags);
			$('#blog-content').val(formData.content);
			if ( formData.isNotice == 'false' ) {
				$('#isNotice option:eq(1)').prop('selected', 'selected');
			} else {
				$('#isNotice option:eq(0)').prop('selected', 'selected');
			}

			Preview.window.writeHTML('Preview', converter.makeHtml(formData.content));

		}


	};
	setTimeout(loadDraft, 2000);













});