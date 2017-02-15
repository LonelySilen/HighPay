define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var touch = require("./touch");
	
	var Model = function(){
		this.callParent();
	};
	
	Model.prototype.getImageUrl = function(row){
		return require.toUrl(row.val('fImage'));
	};
	
	Model.prototype.modelLoad = function(event){
		this.rotate();
		this.pinch();
		this.drag();
		debugger;
		this.swipeDelete();
	};
	
	Model.prototype.rotate = function(event){
		var angle = 0;
		var id = this.getIDByXID('rotate');
		touch.on('#' + id, 'touchstart', function(ev){
		    ev.startRotate();
		    ev.preventDefault();
		});
		
		
		touch.on('#' + id, 'rotate', function(ev){
			var totalAngle = angle + ev.rotation;
		    if(ev.fingerStatus === 'end'){
		        angle = angle + ev.rotation;
		    }
		    this.style.webkitTransform = 'rotate(' + totalAngle + 'deg)';
		});
	};
	
	Model.prototype.pinch = function(event){
		var id = this.getIDByXID('pinch');
		var target = document.getElementById(id);
		//target.style.webkitTransition = 'all ease 0.05s';
		
		touch.on('#' + id, 'touchstart', function(ev){
			ev.preventDefault();
		});
		var initialScale = 1;
		var currentScale;
		touch.on('#' + id, 'pinch', function(ev){
			ev.hasStopedPropagation = true;
			currentScale = ev.scale - 1;
			currentScale = initialScale + currentScale;
			currentScale = currentScale < 1 ? 1 : currentScale;
			this.style.webkitTransform = 'scale(' + currentScale + ')';
		});
		
		touch.on('#' + id, 'pinchend', function(ev){
			initialScale = currentScale;
		});	
	};
	
	Model.prototype.drag = function(event){
		var id = this.getIDByXID('drag');
		touch.on('#' + id, 'touchstart', function(ev){
			ev.preventDefault();
		});
		var dx, dy;
		touch.on('#' + id, 'drag', function(ev){
			dx = dx || 0;
			dy = dy || 0;
			var offx = dx + ev.x + "px";
			var offy = dy + ev.y + "px";
			this.style.webkitTransform = "translate3d(" + offx + "," + offy + ",0)";
		});
		
		touch.on('#' + id, 'dragend', function(ev){
			dx += ev.x;
			dy += ev.y;
		});
	};
	
	Model.prototype.swipeDelete = function(){
		var newsContentID = this.getIDByXID('newsContent');
		var swipeAreaSize = 100;
		var dx;
		touch.on('#' + newsContentID, 'touchstart', function(ev){
			//ev.preventDefault();
			var $swipNode = $('#' + newsContentID + " li").has(ev.target);
			dx = parseInt($swipNode.attr('swipeX') || "0");
		});
		
		touch.on('#'+ newsContentID, 'drag', function(ev){
			var $swipNode = $('#' + newsContentID + " li").has(ev.target);
			if(ev.direction === "left" || ev.direction === "right"){
				dx = dx || 0;
				var offx = dx + ev.x;
				if(offx < swipeAreaSize*-1){
					offx = swipeAreaSize*-1;
				}
				if(offx > 0){
					offx = 0;
				}
				if(ev.direction === "right" && $swipNode.hasClass('x-swipe-out')){
					$swipNode.css({'transform':'translate3d('+offx+'px,0,0)'});
				}else if(ev.direction === "left" && (!$swipNode.hasClass('x-swipe-out'))){
					$swipNode.css({'transform':'translate3d('+offx+'px,0,0)'});
				}
			}
		});
		touch.on('#'+ newsContentID, 'dragend', function(ev){
			var $swipNode = $('#' + newsContentID + " li").has(ev.target);
			if(ev.direction === "left"){
				$swipNode.css({'transform':'translate3d(-'+swipeAreaSize+'px,0,0)'});
				$swipNode.addClass('x-swipe-out');
				dx = swipeAreaSize*-1;
			}else if(ev.direction === "right"){
				$swipNode.removeClass('x-swipe-out');
				$swipNode.css({'transform':'translate3d(0,0,0)'});
				dx = 0;
			}
			$swipNode.attr('swipeX',dx);
		});
	};
	
	
	Model.prototype.button2Click = function(event){
justep.Shell.closePage();
	};
	
	
	return Model;
});