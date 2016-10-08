$(function() {

	/* 遍历标签，显示初始选中面板 */
	$('.tab-item').each(function(index, elem) {

		if ( $(this).hasClass('active') ) {
			var _panelSelector = '#panel-' + $(this).attr('href').replace(/^#/, '');
			$(_panelSelector).show();
			return false;
		}

	});

	/* 切换标签 */
	$('.nav').on('click', '.tab-item', function() {

		if ( $(this).hasClass('active') ) {
			return false;
		}

		// 切换样式
		$('.tab-item').removeClass('active');
		$(this).addClass('active');

		// 切换面板
		$('.tab-panel').hide()
		var _panelSelector = '#panel-' + $(this).attr('href').replace(/^#/, '');
		$(_panelSelector).fadeIn(150);

	});

});