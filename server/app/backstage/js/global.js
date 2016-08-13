/*
	调用方法汇总，详细接口写在函数头的注释里
	使用方法：在jq和bootstrap之后引入global.js，在页面私有js中进行下列操作即可，尚未测试，不知道会有多少bug

	模块初始化 
	var gb = GlobalModule(); // 请勿多次调用GlobalModule()





# 模态框类

--------
	tip 普通提示框，可选按钮颜色
	gb.modal.tip.init(); // 初始化，整个js中初始化一次即可
	gb.modal.tip.show('哈哈哈', 'success'); // 显示
	gb.modal.tip.show('哈哈哈', 'warning');
	gb.modal.tip.show('哈哈哈', 'error');
--------

--------
	tip_small 无按钮弹幕，可选字体颜色，以及关闭弹幕后是否刷新页面
	gb.modal.tip_small.init();  // 初始化，整个js中初始化一次即可
	gb.modal.tip_small.show('哈哈哈', 'success', false); // false为不刷新，默认为false，可不填
	gb.modal.tip_small.show('哈哈哈', 'warning',); 
	gb.modal.tip_small.show('哈哈哈', 'error', true);
--------

--------
	confirm 确认按钮，可多次初始化生成相互独立的确认框，绑定不同事件。
	var confirmId1 = gb.modal.confirm.init(successCall[, cancelCall]);  // 初始化，返回标识，以供调用
	var confirmId2 = gb.modal.confirm.init(successCall[, cancelCall]);  // 初始化，返回标识，以供调用
	gb.modal.confirm.show(confirmId1,'哈哈哈1'); 
	gb.modal.confirm.show(confirmId2,'哈哈哈2'); 
--------

--------
	loading 无按钮loading弹幕
	gb.modal.loading.init();  // 初始化，整个js中初始化一次即可
	gb.modal.loading.show(message); // 显示，默认值为 '正在操作中…'
	gb.modal.loading.hide(); // 隐藏
--------









# 页面组件类

--------
	pagination 页码块，在页面需要生成到导航栏的位置插入
	'<nav class="paging" id="paging3"  data-current="${pageNumber}" data-all="${maxPageNumber}"></nav>' 
	'<nav class="paging" id="paging1" data-current="1" data-all="4"></nav>' 
	'<nav class="paging" id="paging2"  data-current="2" data-all="8"></nav>' 
	即可在不同位置生成相互独立的导航栏
	gb.pagination.init('#paging3');
	gb.pagination.init('#paging1');
	gb.pagination.init('#paging2', 1, 4); // 可手动传入页码，优先值最高
--------

--------
	switch 初始化所有面板，使其可收展，根据以下格式书写HTML即可 
	h3.switch + div.switchPanel[.show]

	// 默认展开 
	<h3 class="title switch"><span>标题</span></h3>
	<div class="switchPanel show"></div>
		or 
	// 默认收起
	<h3 class="title switch"><span>标题</span></h3>
	<div class="switchPanel"></div>

	gb.switch.init();
--------

--------
	towerPartList 根据 tree数组或json数组字符串，依靠点击事件，生成DOM动态多级列表树
	每个p.unit-name标签上都有当前部位id $(elem).attr('data-id')

	@param {String} selector
	@param {Object} tree
	@param {String} 是否有叶子元素选中效果，有效果为 'yes'，无效果为'no'，默认有效果

	## HTML ## 根据以下格式书写容器HTML即可，id只做选取元素用，可更换，但class类名不可缺
	<ul class="tree first" id="tree-container"></ul>

	## CSS ## 将依赖CSS复制进私有文件中 见 depend.css -> tree 

	## JS ## gb.towerPartList.init('#tree-container', treeObject, 'yes');

	## 叶子元素绑定事件 ## $('#tree-container').on('click', '.last', function() {});
--------







# 常用函数类

--------
	parseJSON传入一个JSON字符串或对象，返回一个对象，做了出错处理，确保返回的一定会是一个object
	data = gb.parseJSON(data);
--------

*/





$(function() {

	/* 导航栏hover初始化 */

	// 导航栏进入
	$('.header-nav').on('mouseenter', '.dropdown', function() {
		$(this).addClass('open');
	});

	// 导航栏离开
	$('.header-nav').on('mouseleave', '.dropdown', function() {
		$(this).removeClass('open');
	});

});

function GlobalModule() {


	/*
		tip
		@description 普通提示框，可选按钮颜色

		@init 初始化 tip.init();
		@call 显示调用 tip.show(message, type);

		@param {String} message 为提示内容
		@param {String} type 有三个值 'success', 'warning', 'error'; 分别为绿、橙、红
		@default '操作失败', 'warning'
	*/
	var tip = {
		init: function() {
			var _html = '<div class="modal fade" id="gb-tip">' +
						        '<div class="modal-dialog">' +
						            '<div class="modal-content">' +
						                '<div class="modal-header">' +
						                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
						                    '<h4 class="modal-title">提示</h4>' +
						                '</div>' +
						                '<div class="modal-body">' +
						                    '<p id="gb-tip-content"></p>' +
						                '</div>' +
						                '<div class="modal-footer">' +
						                    '<button type="button" class="btn btn-warning" data-dismiss="modal" id="gb-tip-btn">确定</button>' +
						                '</div>' +
						            '</div>' +
						        '</div>' +
						    '</div>';
			$(_html).appendTo('body');	
		},
		show: function(message,type) {
			message = message || '操作失败';
			var _type = '';
			switch(type) {
				case 'success': 
					_type = 'btn-success';
					break;
				case 'warning': 
					_type = 'btn-warning';
					break;
				case 'error': 
					_type = 'btn-danger';
					break;
				default:
					_type = 'btn-warning';
			}
			$('#gb-tip-content').text(message);
			$('#gb-tip-btn').removeClass('btn-success btn-warning btn-danger').addClass(_type);
   			$('#gb-tip').modal();
		},
	};


	/*
		tip_small
		@description 无按钮提示弹幕，可选字体颜色、在关闭弹幕后是否刷新页面

		@init 初始化 tip_samll.init();
		@call 显示调用 tip_samll.show(message, type[, isReload]);

		@param {String} message 为提示内容
		@param {String} type 有三个值 'success', 'warning', 'error'; 分别为绿、橙、红
		@param {Boolean} isReload true为刷新页面，false为不刷新
		@default '操作成功', 'success', false
	*/
	var tip_small = {
		init: function() {
			var self = this;
			var _html = '<div class="modal fade bs-example-modal-sm" id="gb-tip-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalL" +abel">' +
					        '<div class="modal-dialog modal-sm">' +
					            '<div class="modal-content">' +
					                '<div class="modal-body text-success" id="gb-tip-sm-content">操作成功</div>' +
					            '</div>' +
					        '</div>' +
					    '</div>';

			$(_html).appendTo('body');
			$('#gb-tip-sm').on('hidden.bs.modal', function() {
		    	if(self.isRefresh) {
		   			location.reload();
		    	}
		   });
		},
		show: function(message, type, isReload) {
			message = message || '操作成功';
			var _type = '';
			switch(type) {
				case 'success': 
					_type = 'text-success';
					break;
				case 'warning': 
					_type = 'text-warning';
					break;
				case 'error': 
					_type = 'text-danger';
					break;
				default:
					_type = 'text-success';
			}
			this.isRefresh = isReload || false;
			$('#gb-tip-sm-content').text(message);
			$('#gb-tip-sm-content').removeClass('text-success text-warning text-danger').addClass(_type);
   			$('#gb-tip-sm').modal();
		},
		isRefresh: false,
	}

	/*
		confirm
		@description 确认框，可多次初始化产生相互独立的确认框，绑定不同函数

		@init 初始化 confirm.init(successCall[, cancelCall])，返回调用的序号;
		@param {Function} successCall 点击确定后执行的回调函数
		@param {Function} cancelCall) 点击取消后执行的回调函数
		@return {Number} 不同模态框的唯一序号，用变量保存以进行show函数的调用
		
		@call 显示调用 confirm.show(index, message);
		@param {String} message 为提示内容
		@default 1, '是否确认执行该操作？'
	
	*/
	var Confirm = {
		init: function(call1, call2) {
			var that = this;
			var _html = '<div class="modal fade" id="gb-confirm-{{index}}">' +
					        '<div class="modal-dialog">' +
					            '<div class="modal-content">' +
					                '<div class="modal-header">' +
					                   ' <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
					                    '<h4 class="modal-title">确认</h4>' +
					                '</div>' +
					                '<div class="modal-body">' +
					                    '<p id="gb-confirm-content-{{index}}">是否确认执行该操作？</p>' +
					                '</div>' +
					                '<div class="modal-footer">' +
					                    '<button type="button" class="btn btn-default" data-dismiss="modal" id="gb-confirm-btn1-{{index}}">取消</button>' +
					                    '<button type="button" class="btn btn-primary" data-dismiss="modal" id="gb-confirm-btn2-{{index}}">确定</button>' +
					                '</div>' +
					           '</div>' +
					        '</div>' +
					    '</div>';
			_html = _html.replace(/{{index}}/g, that.index);
			
			$(_html).appendTo('body');
			// 绑定确定函数
			if( typeof(call1) === 'function' ) {
				$('#gb-confirm-btn2-' + that.index).click(call1);
			}
			// 绑定取消函数
			if( typeof(call2) === 'function' ) {
				$('#gb-confirm-btn1-' + that.index).click(call2);
			}
			return that.index++;
		},
		show: function(index, message) {
			index = index || 1;
			$('#gb-confirm-content-' + index).text(message || '是否确认执行该操作？');
			$('#gb-confirm-' + index).modal();
		},
		index: 1
	};


	/*
		loading
		@description 无按钮loading弹幕

		@init 初始化 loading.init();
		@call 显示 loading.show(message);
		@call 隐藏 loading.hide();

		@param {String} message 为提示内容
		@default '正在操作中…'
	*/
	var loading = {
		init: function() {
			var _html = '<div class="modal fade bs-example-modal-sm" id="gb-loading" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">' +
					        '<div class="modal-dialog modal-sm">' +
					            '<div class="modal-content">' +
					                '<div class="modal-body text-warning"><span class="icon-spinner icon-spin"></span> <span id="gb-loading-text"></span></div>' +
					            '</div>' +
					        '</div>' +
					    '</div>';

			$(_html).appendTo('body');
		},
		show: function(message) {
			message = message || '正在操作中';
	   		$('#gb-loading-text').text(message);
   			$('#gb-loading').modal('show');
		},
		hide: function() {
			$('#gb-loading').modal('hide');
		},
	};





	/*
		pagination 在页面需要生成到导航栏的位置插入 '<nav class="paging"  data-current="${pageNumber}" data-all="${maxPageNumber}"></nav>' 即可
		可在不同位置生成相互独立的导航栏
		@init pagination.init(selector, currentPage, allPages)
		@param {String} 需要填充的元素，'#paging', '.paging'
		@param {Number} or {Number string} 当前页码
		@param {Number} or {Number string} 所有页码
		@default 优先值 传入的值 > 标签上的值（请确保为数字，否则将出错） > '.paging', 1, 1
	*/
	var pagination = {
		init: function(selector, cur, all) {
			var that = this;
			var page = {};
			page.cur = parseInt(cur || $(selector).attr('data-current') || 1, 10);
			page.all = parseInt(all || $(selector).attr('data-all') || 1, 10);
			if(page.all == 0) {
				page.all = 1;
			}
			var _html = '<p class="pageAcount">共 <a href="javascript:;" class="lastPage jump-page" title="跳到最后页">{{all}}</a> 页</p>' +
				        '<ul class="pagination pagination-sm">' +
				            '<li id="prevPage-{{index}}" class="jump-page" data-target="">' +
				                '<a href="javascript:;" aria-label="Previous">' +
				                    '<span aria-hidden="true">&laquo;</span>' +
				                '</a>' +
				            '</li>' +
				            '<li id="nextPage-{{index}}" class="jump-page" data-target="">' +
				                '<a href="javascript:;" aria-label="Next">' +
				                    '<span aria-hidden="true">&raquo;</span>' +
				                '</a>' +
				            '</li>' +
				        '</ul>';
			_html = _html.replace(/{{current}}/g, page.cur)
						 .replace(/{{all}}/g, page.all)
						 .replace(/{{index}}/g, that.index);
			$(_html).appendTo($(selector));
			// 刷新页码
			updatePage(that.index++, page.cur, page.all);
		},
		reload: function(selector, cur) {
			$(selector).empty();
			this.init(selector, cur);
		},
		index: 1,
	};

	// 页码更新
	function updatePage(index, cur, all) {
		var curPage = parseInt(cur) || 1,
			allPage = parseInt(all) || 1,
			page_tpl = '<li class="pageNum {{isActive}}"><a href="javascript:;" class="jump-page">{{page}}</a></li>',
			pageHtml = '',
			pageArray = calPage(curPage, allPage);
		
		// 修改上一页下一页指向
		if(curPage == 1) {
			$('#prevPage-' + index).addClass('disabled').children().attr('href', '#');
		} else {
			$('#prevPage-' + index).children().attr('data-target', curPage - 1);
		}
		if(curPage == allPage) {
			$('#nextPage-' + index).addClass('disabled').children().attr('href', '#');
		} else {
			$('#nextPage-' + index).children().attr('data-target', curPage + 1);
		}

		for(var i = 0, len = pageArray.length; i < len; i++) {
			var _page = page_tpl,
				_isActive = curPage == pageArray[i] ? 'active' : '',
				_pageNum = curPage == pageArray[i] ? '#' : pageArray[i];
			_page = _page.replace(/{{isActive}}/g, _isActive)
						 .replace(/{{page}}/g, pageArray[i]);
			pageHtml += _page;			 
		}
		$('#nextPage-' + index).before($(pageHtml));
	}
	// 计算当前页码块，返回页码数组
	function calPage(curPage, allPage) {
		curPage = parseInt(curPage);
		allPage = parseInt(allPage);
		var pageArray = [],
			pageCount = 10;
		if(allPage < pageCount) {
			for(var i = 1; i <= allPage; i++) {
				pageArray.push(i);
			}	
			return pageArray;
		}
		// 如果当前页等于最后一页，则往前生成10页
		if(curPage == allPage) {
			for(var i = allPage - pageCount + 1; i <= allPage; i++) {
				pageArray.push(i);
			}
			return pageArray;
		}

		var pageSection = Math.floor(curPage / pageCount), //当前页码区间
			pageIndex = curPage % pageCount; // 当前页下标
		// 如果当前页为10，20，30等尾数页，则往后偏移8页，不足则前面页码补齐	
		if(pageIndex == 0) {
			var objLastPage = curPage + pageCount - 2,
				lastPage = objLastPage > allPage ? allPage : objLastPage;
			for(var i = lastPage; i >= curPage; i--) {
				// 将当前页后八页页码以及当前页页码倒序推入数组
				pageArray.push(i);
			}
			var prevPage = objLastPage - lastPage + 1; //若上一步生成页码不足9页则补全
			for(var i = 1; i <= prevPage; i++) {
				pageArray.push(curPage - i);
			}
			pageArray = pageArray.reverse(); //原数组为倒序
			return pageArray;
		}

		// 如果当前页尾数为9，前+8 ① 后+1
		if(pageIndex == 9) {
			for(var j = curPage - 8; j <= curPage + 1; j++) {
				pageArray.push(j);
			}
			return pageArray;
		}

		// 如果当前页尾数为8，前+7 ① 后+2
		if(pageIndex == 8) {
			if(allPage - curPage < 2) {
				for(var j = curPage - 8; j <= curPage + 1; j++) {
					pageArray.push(j);
				}
				return pageArray;
			}
			for(var j = curPage - 7; j <= curPage + 2; j++) {
				pageArray.push(j);
			}
			return pageArray;
		}
		// 其他情况下，从当前区间第一位的前一位开始生成10页
		var firstPage = pageSection * pageCount - 1;

		firstPage = firstPage > 0 ? firstPage : 1;
		var lastNum = firstPage + 9;
		for(var i = 0; i < 10; i++) {
			if(lastNum > allPage) {
				lastNum--;
			}
		}
		for(var i = 0; i < 10 ; i++, lastNum--) {
			pageArray.push(lastNum);
		}
		pageArray.reverse();
		return pageArray;
	}




	/*
		switchPanel 初始化所有面板，使其可收展，根据以下格式书写HTML即可
		// 默认展开
		<h3 class="title"><span>标题</span></h3>
		<div class="switchPanel show"></div>

		or 
		// 默认收起
		<h3 class="title"><span>标题</span></h3>
		<div class="switchPanel"></div>

		@init switch.init();

	*/
	var switchPanel = {
		init: function() {
			// 初始化所有标题
			$('.switch').each(function (index, elem) {
				// 展开状态
				if($(elem).next().hasClass('show')) {
					$(elem).append($('<span class="curStatus">点击收起</span>'));
				} else {
					$(elem).append($('<span class="curStatus">点击展开</span>'));
				}
			});

			// 绑定事件
			$('.main').on('click', '.switch', function() {
				var curStatus = $(this).children('.curStatus');
				var panel = $(this).next();
				// 修改文字
				if(curStatus.text() == '点击展开') {
					curStatus.text('点击收起');
				} else {
					curStatus.text('点击展开');
				}
				// 伸缩面板
				panel.toggleClass('show');
			});
		},
	};









	/*
		@description 传入一个JSON字符串或对象，返回一个对象
		@param {String} or {Object} 传入一个JSON字符串或对象
		@return {Object} 返回一个对象
	*/
	function parseJSON(data) {

		// 为空
		if( !data ) {
			return {};
		}

		if(typeof(data) == 'object') {
			return data;
		}

		var obj;
		try {
			obj = JSON.parse(data);
		} catch(e) {
			obj = {};
		}

		return obj;

	};






	/*
		towerPartList 根据json数组，依靠点击事件，生成DOM动态多级列表树
		@param {String} jQuery selector, 列表目录的容器
		@param {Object or jsonString} 传入一个tree Object 或 tree jsonObject
		@param {String} leafEffect 是否有叶子元素选中效果，有效果为 'yes'，无效果为'no'，默认有效果

	*/
	var towerPartList = {

		init: function(selector, tree, leafEffect) {
			leafEffect = leafEffect == 'no' ? 'no' : 'yes';
			tree = parseJSON(tree);

			if( !tree.length ) {
				return false;
			}

			var ul_tpl = '<ul class="tree">{{childrens}}</ul>';
			var li_tpl_parent = '<li>' +
									'<p class="unit-name not-last" data-id="{{towerPartId}}" data-name="{{name}}" data-index="{{index}}">' + 
				                        '<i class="icon icon-caret-right"></i>' +
				                        '<span> {{name}}</span>' +
				                    '</p>' +
			                    '</li>';
			var li_tpl_child = '<li>' +
									'<p class="unit-name last" data-id="{{towerPartId}}" data-name="{{name}}" data-index="{{index}}">' + 
				                        '<span> {{name}}</span>' +
				                    '</p>' +
			                    '</li>';

			var list_html = '';

			// 初始化第一层
			$.each(tree, function(index, item) {
				// 不是叶子，则用li_parent，否则用li_child
				if( !item.leaf ) {
					list_html += li_tpl_parent.replace(/{{towerPartId}}/, item.towerPartId)
											  .replace(/{{name}}/g, item.name)
											  .replace(/{{index}}/, index);
				} else {
					list_html += li_tpl_child.replace(/{{towerPartId}}/, item.towerPartId)
											  .replace(/{{name}}/g, item.name)
											  .replace(/{{index}}/, index);
				}
			});

			$(selector).append( $(list_html) );


			var treeTemp = tree;



			// 绑定元素
			$('body').on('click', '.not-last', function() {
				// 当前元素未扩展过，则扩展
				if( !$(this).hasClass('done') ) {

					// 获取标签上元素处于的层级
					var index = $(this).attr('data-index');
					var indexArray = index.split('-');
					$.each(indexArray, function(i, item) {
						treeTemp = treeTemp[parseInt(item, 10)].nextLevel;
					});

					var subTrees = treeTemp;
					var lis_html =  getTreeHTML(subTrees, index);
					$(this).after($(lis_html));
					$(this).addClass('done');
					treeTemp = tree;
				}

				// 展开
				$(this).toggleClass('open');
				$(this).siblings('ul').toggleClass('show');

			});

			// 叶子元素点击效果
			if( leafEffect != 'no' ) {

				$('body').on('click', '.last', function() {
					
					$('.selected', $(selector)).removeClass('selected');
					$(this).addClass('selected');

				});
			}



			function getTreeHTML(subTree, parentIndex) {
				var lis_html = '';
				parentIndex = parentIndex ? parentIndex + '-' : '';
				$.each(subTree, function(index, item) {
					// 不是叶子，则用li_parent，否则用li_child
					if( !item.leaf ) {
						lis_html += li_tpl_parent.replace(/{{towerPartId}}/, item.towerPartId)
												  .replace(/{{name}}/g, item.name)
												  .replace(/{{index}}/, parentIndex + index);
					} else {
						lis_html += li_tpl_child.replace(/{{towerPartId}}/, item.towerPartId)
												  .replace(/{{name}}/g, item.name)
												  .replace(/{{index}}/, parentIndex + index);
					}
				});
				return ul_tpl.replace(/{{childrens}}/, lis_html);
			}
		},


	};

	function dateFormat(dateString, fmt) {

		let _Date = new Date(dateString);

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












	return {
		modal: {
			tip: tip,
			tip_small: tip_small,
			confirm: Confirm,
			loading: loading,
		},
		pagination: pagination,
		switch: switchPanel,
		parseJSON: parseJSON,
		towerPartList: towerPartList,
		dateFormat: dateFormat,
	}
}

