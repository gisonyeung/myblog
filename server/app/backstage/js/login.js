$(function() {

	// 回车绑定
	$('.form-text').on('keyup', function(e) {

		$(this).parent().removeClass('has-error');
		$('#tip-text').hide();

		if ( e.which == 13 ) {
			login();
		}

	});


	$('#login').on('click', function() {
		login();
	});


	// 登录
	function login() {

		var username =  $('#username'),
			password = $('#password');

		var formData = {
			username: username.val(),
			password: password.val(),
		};

		if ( !/\S/.test(formData.username) ) {

			handleTip(username, '用户名不能为空！');
			return false;

		} else if ( !/\S/.test(formData.password) ) {

			handleTip(password, '密码不能为空！');
			return false;

		}

		$.ajax({
			url: '/admin/login',
			method: 'POST',
			data: {
				username: formData.username,
				password: formData.password,
			},
			success: function(data) {

				if ( data.result == 'success' ) {
					location.href = data.url;
				} else {
					handleTip(username, data.reason);
				}

			},
		});

	};


	function handleTip(selector, text) {
		selector.parent().addClass('has-error');
		selector.focus();
		$('#tip-text').text(text).show();
	};



});