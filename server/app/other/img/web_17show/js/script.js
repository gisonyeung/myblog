$(function() {
	if (window.location.hash == '#download') {
		window.location.hash = '';
		$('#part5').show();
		$('#splash-wrapper').hide();
	} else {
		setTimeout(function() {
			$('#splash-wrapper').fadeOut(300, function() {
				$('#splash').fadeOut(400);
				$('#part1').fadeIn(1000, function() {
					$('#part1 .logo').animate({
						marginTop: 80,
						opacity: 1
					}, 500, 'swing', function() {
						$('#part1 .snh48').animate({
							marginBottom: -90,
							opacity: 1
						}, 700, 'swing', function() {
							$('#part1 h1').fadeIn(300, function() {
								setTimeout(function() {
									$('#part1 p').fadeIn(400);
									$('#part1 .btn').animate({
										width: 240
									}, 1000, 'swing', function() {
										setTimeout(function() {
											$('#part1 span').fadeIn(100);
										}, 100);
									});
								}, 500);
							});
						});
						
					});
				});
			});
			// $('#part1').fadeIn(1000);
		}, 2000);
	}


	$('.btn').one('click', function() {
		$('#part2').show();
		$('#part1').animate({
			left: '100%'
		}, 600, showTip1)
	});

	function showTip1() {
		$('#part1').hide();
		setTimeout( function() {
			$('.tip1').animate({
				opacity: 1,
				marginTop: -180,
			}, 500)

			$('.match-btn').one('click', function() {
				$('.tip1').animate({
					opacity: 0,
					marginTop: -210,
				}, function() {
					$('.tip1').hide();
					$('.match-text').text('随机匹配中...');
					$('#splash-wrapper2').addClass('animate');

					setTimeout(function() {
						$('#part2').animate({
							left: '100%'
						}, 500, showPart3)
						
					}, 2500);
				})



				// $('.match-text').text('随机匹配中...');
			});
			
		}, 700);
	}


	$('.download-btn').on('click', function(e) {
		if (isWeixinBrowser()) {
			alert('请在右上角将页面转到外部浏览器打开');
			window.location.hash = 'download';
			e.preventDefault();
		}
	});

	function showPart3() {
		$('#part2').hide();
		$('#part3').fadeIn(400, function() {
			setTimeout(function() {
				$('.tip2').animate({
					opacity: 1,
					bottom: 250,
				}, 500, function () {
					$('#part3').one('click', function() {
						$('.tip2').fadeOut(200, function() {
							$('.tip3').animate({
								opacity: 1,
								bottom: 95,
							}, function () {
								$('#part3').one('click', function() {
									$('.tip3').fadeOut(200, function() {
										$('#part4').show();
										$('#part3').hide();
										showPart4();
									});
									
								});
							})
							
						});
					});
				});
			}, 700);
		});

	}

	function showPart4() {
		$('#part3').hide();
		$('.success').animate({
			opacity: 1,
			top: 20,
		}, 500, function() {

			$('#part4').on('click', function() {
				
				$('#part4').animate({
					left: '100%'
				}, 500, showPart5);
			});
			
		});
	}

	function showPart5() {
		$('#part5').fadeIn(400);
		$('#part4').hide();
	}

	function isWeixinBrowser(){
		return /micromessenger/.test(navigator.userAgent.toLowerCase())
	}



});