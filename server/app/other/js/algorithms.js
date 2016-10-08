$(function() {

	/* sidebar初始化 */
	(function($) {

		$.expr[":"].Contains = function(a, i, m) {
			return (a.textContent || a.innerHTML || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
		};

		function filterList(header, list) {
			//@header 头部元素
			//@list 无需列表
			//创建一个搜素表单
			var input = $("<input>").attr({
				"class":"filterinput",
				"placeholder": "搜索",
				type:"text"
			});
			$(input).appendTo(header);
			$(input).change(function() {
				var filter = $(this).val(),
					_items = $(list).children();
				if (filter) {
					var $matches = _items.filter(":contains(" + filter + ")");
					_items.not($matches).slideUp();
					$matches.slideDown();
				} else {
					$(list).find("li").slideDown();
				}
				return false;
			}).keyup(function() {
				$(this).change();
			});
		}
		
		filterList($("#form"), $("#demo-list"));
		
	})(jQuery);	


	$("#menu").jqueryAccordionMenu();

	/* 获取url锚点，定位标记的sidebar标签，方便保存书签 */
	if ( window.location.hash ) {

		var _tab = $(window.location.hash);

		// 获取链接
		var _href = _tab.attr('href');
		if ( !_href || _href == '#' || _href == 'javascript:;' ) {
			traverseDemoItem();
			return false;
		}

		$('#frame').attr('src', _href);

		// 切换样式
		$('.demo-item').removeClass('active');
		_tab.addClass('active');

		// 展开菜单
		_tab.parent().parent().slideDown();

		// 修改标题
		$('.title', '.demo-header').text(_tab.text());

	} else { // 无标记则定位到默认标签
		
		traverseDemoItem();
	}

	/* 用以遍历初始选中的sidebar标签 */
	function traverseDemoItem() {
		
		$('.demo-item').each(function(index, elem) {

			if ( $(this).hasClass('active') ) {

				// 展开菜单
				$(this).parent().parent().slideDown();

				// 获取链接
				var _href = $(this).attr('href');
				$('#frame').attr('src', _href);

				// 修改标题
				$('.title', '.demo-header').text($(this).text());

				return false;

			}

		});
	}
	

	/* sidebar标签点击 */
	$('#menu').on('click touchstart', '.demo-item', function(e) {

		// 获取链接
		var _href = $(this).attr('href');
		if ( !_href || _href == '#' || _href == 'javascript:;' || $(this).hasClass('active') ) {
			return false;
		}
		// 修改页面URL锚点
		window.location.href = '#' + $(this).attr('id');
		$('#frame').attr('src', _href);

		// 切换样式
		$('.demo-item').removeClass('active');
		$(this).addClass('active');

		// 修改标题
		$('.title', '.demo-header').text($(this).text());

		// 收起菜单
		toggleSidebar(false);

		e.preventDefault();
		return false;

	});

	// 点击 展开菜单
	$('.menu-header').on('click', '.open', function() {

		toggleSidebar(true);

	});
	// 点击 收起菜单
	$('.menu-header').on('click', '.close', function() {

		toggleSidebar(false);

	});



	/* 移动端toggle sidebar */
	function toggleSidebar(isOpen) {

		if ( isOpen === true ) {
			$('#main').addClass('toggle');
			$('.open', '#open-menu').hide();
			$('.close', '#open-menu').show();
		} else {
			$('#main').removeClass('toggle');
			$('.close', '#open-menu').hide();
			$('.open', '#open-menu').show();
		}

	}




});