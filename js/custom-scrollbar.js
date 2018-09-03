"use strict";
$.fn.scrollbar = function(attributes){
	var selector = $(this);
	const hasTouchDevice = "ontouchstart" in document.documentElement;
	var scrollBarHtml = "<div class='scrollbarMainContainer'><div class='scrollbarVertical'><div class='scrollbarArrow scrollbarArrowTop'></div><div class='scrollbarPanelMainContainer scrollbarPanelVertical'><div class='scrollbarPanelContainer scrollbarPanelContainerVertical'><div class='scrollbarPanel scrollbarPanelTop'></div><div class='scrollbarPanel scrollbarPanelMiddle'></div><div class='scrollbarPanel scrollbarPanelBottom'></div></div></div><div class='scrollbarArrow scrollbarArrowBottom'></div></div><div class='scrollbarHorizontal'><div class='scrollbarArrow scrollbarArrowLeft'></div><div class='scrollbarPanelMainContainer scrollbarPanelHorizontal'><div class='scrollbarPanelContainer scrollbarPanelContainerHorizontal'><div class='scrollbarPanel scrollbarPanelLeft'></div><div class='scrollbarPanel scrollbarPanelCenter'></div><div class='scrollbarPanel scrollbarPanelRight'></div></div></div><div class='scrollbarArrow scrollbarArrowRight'></div></div><div class='sidebarActive'></div><div class='scrollbarContent'></div></div>";
	var selectorHTML = selector.html();
	selector.html("");
	selector.append(scrollBarHtml);
	var scrollbarContent = selector[0].querySelector('.scrollbarContent'),
	scrollbarArrow = selector.find('.scrollbarArrow'),
	scrollbarVertical = selector[0].querySelector('.scrollbarPanelContainerVertical'),
	scrollbarHorizontal = selector[0].querySelector('.scrollbarPanelContainerHorizontal'),
	scrollbarPanelContainer = selector.find('.scrollbarPanelContainer'),
	scrollbarPanelMainContainer = selector.find('.scrollbarPanelMainContainer'),
	contentAreaScrollPositionTop=0,
	contentAreaScrollPositionLeft=0,
	currentVerticalScrollPointer = 0,
	currentHorizontalScrollPointer=0,
	animationSpeed = 0.2;
	$(scrollbarContent).css({"left":"0","top":"0"});
	scrollbarPanelContainer.css({"left":"0","top":"0"});
	$(scrollbarContent).append(selectorHTML);
	var selectorHeight,selectorWidth,fullContentHeight,fullContentWidth,verticalScrollAreaFullHeight,horizontalScrollAreaFullWidth,verticalScrollbarHeight,horizontalScrollbarWidth,verticalActualHeightScrollarea,horizontalActualWidthScrollarea,heightScrollRatio,widthScrollRatio,xOnResize=0,yOnResize=0,widthOnResize=0,heightOnResize=0;
	// scrollBar style and element mapping
	var options = attributes;
	function scrollBar(){
		if(attributes==undefined || Object.keys(attributes).length<=0){
			options={horizontalScrollbar:true,verticalScrollbar:true};
		} else if(attributes.horizontalScrollbar==undefined){
			options.horizontalScrollbar = true;
		} else if(attributes.verticalScrollbar==undefined){
			options.verticalScrollbar = true;
		}
		$(scrollbarContent).css({"transition":"left "+animationSpeed+"s,top "+animationSpeed+"s"});
		scrollbarPanelContainer.css({"transition":"left "+animationSpeed+"s,top "+animationSpeed+"s"});
		selectorHeight = selector.outerHeight()-parseInt(selector.css("border-top-width"))-parseInt(selector.css("border-bottom-width"));
		selectorWidth = selector.outerWidth()-parseInt(selector.css("border-left-width"))-parseInt(selector.css("border-right-width"));
		fullContentHeight = $(scrollbarContent).outerHeight();
		fullContentWidth = $(scrollbarContent).outerWidth();
		function getHeightAndWidth(){
			fullContentHeight = $(scrollbarContent).outerHeight();
			fullContentWidth = $(scrollbarContent).outerWidth();
			selector.find('.scrollbarMainContainer').css({"height":selectorHeight});
		}
		if(selectorHeight>=fullContentHeight){
			options.verticalScrollbar=false;
		}
		if(selectorWidth>=fullContentWidth){
			options.horizontalScrollbar=false;
		}
		selector.addClass("customScrollbar");
		if(options.horizontalScrollbar && options.verticalScrollbar){ // If both scrollbar is displaying
			selector.find('.scrollbarMainContainer').css({"padding":"0 "+selector.find('.scrollbarVertical').outerWidth()+"px "+selector.find('.scrollbarHorizontal').outerHeight()+"px 0"});
			selector.find('.scrollbarVertical').css({"height":"calc(100% - "+selector.find('.scrollbarArrowTop').outerHeight()+"px)"});
			selector.find('.scrollbarHorizontal').css({"width":"calc(100% - "+selector.find('.scrollbarArrowLeft').outerWidth()+"px)"});
			selector.find('.sidebarActive').css({"display":"block","height":selector.find('.scrollbarArrowTop').outerHeight()+"px","width":selector.find('.scrollbarArrowLeft').outerWidth()+"px"});
			getHeightAndWidth();
			selectorHeight -= selector.find('.scrollbarHorizontal').outerHeight();
			selectorWidth -= selector.find('.scrollbarVertical').outerWidth();
		}else if(options.verticalScrollbar && !options.horizontalScrollbar){ // Hide Horizontal scrollbar
			selector.find('.scrollbarHorizontal').hide();
			selector.find('.scrollbarMainContainer').css({"padding":"0 "+selector.find('.scrollbarVertical').outerWidth()+"px 0 0"});
			getHeightAndWidth();
		}else if(!options.verticalScrollbar && options.horizontalScrollbar){ // Hide Vertical scrollbar
			selector.find('.scrollbarVertical').hide();
			selector.find('.scrollbarMainContainer').css({"padding":"0 0 "+selector.find('.scrollbarHorizontal').outerHeight()+"px 0"});
			getHeightAndWidth();
		}else{
			selector.find('.scrollbarHorizontal').hide();
			selector.find('.scrollbarVertical').hide();
		}

		// Vertical scroll Area Full Height
		verticalScrollAreaFullHeight = parseInt(selector.find('.scrollbarVertical').outerHeight() - (selector.find('.scrollbarArrowTop').outerHeight()+selector.find('.scrollbarArrowBottom').outerHeight()));
		selector.find('.scrollbarPanelVertical').css({"height":verticalScrollAreaFullHeight});
		
		// Horizontal scroll Area Full Width
		horizontalScrollAreaFullWidth = parseInt(selector.find('.scrollbarHorizontal').outerWidth() - (selector.find('.scrollbarArrowLeft').outerWidth()+selector.find('.scrollbarArrowRight').outerWidth()));
		selector.find('.scrollbarPanelHorizontal').css({"width":horizontalScrollAreaFullWidth});

		// Vertical scrollbar height
		verticalScrollbarHeight= (selectorHeight/fullContentHeight)*selectorHeight;
		selector.find('.scrollbarPanelContainerVertical').css({'height':verticalScrollbarHeight+"px"});

		// Horizontal scrollbar width
		horizontalScrollbarWidth= (selectorWidth/fullContentWidth)*selectorWidth;
		selector.find('.scrollbarPanelContainerHorizontal').css({'width':horizontalScrollbarWidth+"px"});

		// Actual height and width of scrollarea
		verticalActualHeightScrollarea = verticalScrollAreaFullHeight-verticalScrollbarHeight;
		horizontalActualWidthScrollarea = horizontalScrollAreaFullWidth-horizontalScrollbarWidth;
		
		// Scroll ratio for scroll in height and width
		heightScrollRatio = (fullContentHeight-selectorHeight)/verticalActualHeightScrollarea;
		widthScrollRatio = (fullContentWidth-selectorWidth)/horizontalActualWidthScrollarea;
	};
	// scrollBar call on load and resize
	scrollBar();
	$(window).on('resize',function(){
		selector.removeClass("customScrollbar");
		selector.find("*").removeAttr("style");
		scrollBar();
		currentHorizontalScrollPointer = -(xOnResize/widthOnResize * (scrollbarHorizontal.parentElement.offsetWidth-scrollbarHorizontal.offsetWidth));
		currentVerticalScrollPointer = -(yOnResize/heightOnResize * (scrollbarVertical.parentElement.offsetHeight-scrollbarVertical.offsetHeight));
		moveAt(currentHorizontalScrollPointer, currentVerticalScrollPointer);
	});
	function eventDefault(){
		return (event !== undefined && event.cancelable)?event.preventDefault():null;
	}
	function returnBack(){
		if(isScrolling){
			return true;
		}
		if(options.verticalScrollbar==false){
			if(event !== undefined && !isVerticalSlide){
				return true;
			}
		}
		if(options.horizontalScrollbar==false){
			if(event !== undefined && event.ctrlKey) {
				return true;
			}
		}
		return eventDefault();
	}

	function moveAt(currentHorizontalScrollPointer, currentVerticalScrollPointer) {
		if(returnBack()==true){ return }else{ returnBack()};
		scrollbarContent.style.left = currentHorizontalScrollPointer*widthScrollRatio + 'px';
		scrollbarContent.style.top = currentVerticalScrollPointer*heightScrollRatio + 'px';
		scrollbarHorizontal.style.left = -currentHorizontalScrollPointer + 'px';
		scrollbarVertical.style.top = -currentVerticalScrollPointer + 'px';
		setTimeout(() => getPointerOnResize(), animationSpeed * 1000);
	}

	// vertical and horizontal pointers
	function pointerX(event) {
		return parseInt(hasTouchDevice?event.changedTouches[0].pageX:event.pageX);
	}
	function pointerY(event) {
		return parseInt(hasTouchDevice?event.changedTouches[0].pageY:event.pageY)
	}
	function getPointerOnResize(){
		widthOnResize = scrollbarHorizontal.parentElement.offsetWidth-scrollbarHorizontal.offsetWidth;
		heightOnResize = scrollbarVertical.parentElement.offsetHeight-scrollbarVertical.offsetHeight;
		xOnResize = scrollbarHorizontal.getBoundingClientRect().left-scrollbarHorizontal.parentElement.getBoundingClientRect().left;
		yOnResize = scrollbarVertical.getBoundingClientRect().top-scrollbarVertical.parentElement.getBoundingClientRect().top;
	}
	function getPointer(){
		currentHorizontalScrollPointer = scrollbarHorizontal.parentElement.getBoundingClientRect().left-scrollbarHorizontal.getBoundingClientRect().left;
		currentVerticalScrollPointer = scrollbarVertical.parentElement.getBoundingClientRect().top-scrollbarVertical.getBoundingClientRect().top;
	}

	// click event on arrow
	function scrollbarArrowController(event,i){
		var setIntervalForLongPress,isMouseDown = true;
		var startTime = new Date().getTime();
		
		function scrollbarArrowControllerMain(){
			getPointer();
			if(scrollbarArrow[i].classList.contains('scrollbarArrowTop')){
				currentVerticalScrollPointer+=selectorHeight/heightScrollRatio;
			}else if(scrollbarArrow[i].classList.contains('scrollbarArrowBottom')){
				currentVerticalScrollPointer-=selectorHeight/heightScrollRatio;
			}else if(scrollbarArrow[i].classList.contains('scrollbarArrowLeft')){
				currentHorizontalScrollPointer +=selectorWidth/widthScrollRatio;
			}else if(scrollbarArrow[i].classList.contains('scrollbarArrowRight')){
				currentHorizontalScrollPointer -=selectorWidth/widthScrollRatio;
			}
			if(currentHorizontalScrollPointer>0){
				currentHorizontalScrollPointer=0;
			}
			if(currentHorizontalScrollPointer< scrollbarHorizontal.offsetWidth-scrollbarHorizontal.parentElement.offsetWidth){
				currentHorizontalScrollPointer=scrollbarHorizontal.offsetWidth-scrollbarHorizontal.parentElement.offsetWidth;
			}
			if(currentVerticalScrollPointer>0){
				currentVerticalScrollPointer=0;
			}
			if(currentVerticalScrollPointer< scrollbarVertical.offsetHeight-scrollbarVertical.parentElement.offsetHeight){
				currentVerticalScrollPointer=scrollbarVertical.offsetHeight-scrollbarVertical.parentElement.offsetHeight;
			}
			moveAt(currentHorizontalScrollPointer, currentVerticalScrollPointer);
		};
		
		setIntervalForLongPress = setInterval(() => scrollbarArrowControllerMain(),100);

		document.addEventListener(hasTouchDevice?"touchend":"mouseup", onUserDoUpDocument);
		scrollbarArrow[i].addEventListener(hasTouchDevice?"touchend":"mouseup", onUserDoUp);
		scrollbarArrow[i].addEventListener("mouseout", onUserDoOut);

		function onUserDoUpDocument(){
			clearInterval(setIntervalForLongPress);
			scrollbarArrow[i].removeEventListener(hasTouchDevice?"touchend":"mouseup", onUserDoUp);
			isMouseDown = false;
		}
		function onUserDoUp() {
			var endTime = new Date().getTime();
			if(endTime-startTime>50){
				scrollbarArrowControllerMain();
			}
			clearInterval(setIntervalForLongPress);
			document.removeEventListener(hasTouchDevice?"touchend":"mouseup", onUserDoUp);
			scrollbarArrow[i].removeEventListener("mouseout", onUserDoOut);
		}
		function onUserDoOut(){
			if(isMouseDown){
				clearInterval(setIntervalForLongPress);
				scrollbarArrow[i].addEventListener("mouseenter", onUserDoEnter);
				scrollbarArrow[i].removeEventListener("mouseout", onUserDoOut);
			}
		}
		function onUserDoEnter(){
			if(isMouseDown){
				setIntervalForLongPress = setInterval(() => scrollbarArrowControllerMain(),100)
				scrollbarArrow[i].addEventListener("mouseout", onUserDoOut);
				scrollbarArrow[i].removeEventListener("mouseenter", onUserDoEnter);
			}
		}
	}
	// Click call on arrow
	scrollbarArrow.each(function(i){
		scrollbarArrow[i].addEventListener(hasTouchDevice?"touchstart":"mousedown", function(event) {
			scrollbarArrowController(event,i);
		});
		scrollbarArrow[i].ondragstart = function() {return false};
	});



	// Event on middle bar
	function middleBarClick(event,i){
		//Return if click on child
		if (scrollbarPanelMainContainer[i] !== event.target || isScrolling)
		return;
		getPointer();
		var mouseAndTouchDownY=0,mouseAndTouchDownX=0,parentX=0,parentY=0;
		if($(scrollbarPanelMainContainer[i]).hasParent(".scrollbarHorizontal")){
			parentX = selector[0].offsetLeft + scrollbarPanelMainContainer[i].offsetLeft + (scrollbarPanelMainContainer[i].children[0].offsetWidth/2);
			mouseAndTouchDownX = pointerX(event) - parentX;
		} else if($(scrollbarPanelMainContainer[i]).hasParent(".scrollbarVertical")){
			parentY = selector[0].offsetTop + scrollbarPanelMainContainer[i].offsetTop + (scrollbarPanelMainContainer[i].children[0].offsetHeight/2);
			mouseAndTouchDownY = pointerY(event) - parentY;
		}
		if($(scrollbarPanelMainContainer[i]).hasParent(".scrollbarHorizontal")){
			currentHorizontalScrollPointer = -mouseAndTouchDownX;
		} else if($(scrollbarPanelMainContainer[i]).hasParent(".scrollbarVertical")){
			currentVerticalScrollPointer = -mouseAndTouchDownY;
		}
		if(currentHorizontalScrollPointer>0){
			currentHorizontalScrollPointer=0;
		}
		if(currentHorizontalScrollPointer< scrollbarHorizontal.offsetWidth-scrollbarHorizontal.parentElement.offsetWidth){
			currentHorizontalScrollPointer=scrollbarHorizontal.offsetWidth-scrollbarHorizontal.parentElement.offsetWidth;
		}
		if(currentVerticalScrollPointer>0){
			currentVerticalScrollPointer=0;
		}
		if(currentVerticalScrollPointer< scrollbarVertical.offsetHeight-scrollbarVertical.parentElement.offsetHeight){
			currentVerticalScrollPointer=scrollbarVertical.offsetHeight-scrollbarVertical.parentElement.offsetHeight;
		}
		moveAt(currentHorizontalScrollPointer, currentVerticalScrollPointer);
	};
	// Click call on middle bar
	scrollbarPanelMainContainer.each(function(i){
		scrollbarPanelMainContainer[i].addEventListener( hasTouchDevice?"touchstart":"mousedown", function(event) {
			middleBarClick(event,i);
		});
		scrollbarPanelMainContainer[i].ondragstart = function() {return false};
	});

	
	// Mouse wheel event
	function scrollbarContentMouseWheel(event){
		(event.ctrlKey)?isVerticalSlide = true:isVerticalSlide = false;

		getPointer();
		var mouseWheelUp = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
		if(mouseWheelUp > 0){
			if(!event.ctrlKey){
				currentVerticalScrollPointer+=selectorHeight/heightScrollRatio;
			}else{
				currentHorizontalScrollPointer +=selectorWidth/widthScrollRatio;
			}
		}else{
			if(!event.ctrlKey){
				currentVerticalScrollPointer-=selectorHeight/heightScrollRatio;
			}else{
				currentHorizontalScrollPointer -=selectorWidth/widthScrollRatio;
			}
		}
		if(currentHorizontalScrollPointer>0){
			currentHorizontalScrollPointer=0;
		}
		if(currentHorizontalScrollPointer< scrollbarHorizontal.offsetWidth-scrollbarHorizontal.parentElement.offsetWidth){
			currentHorizontalScrollPointer=scrollbarHorizontal.offsetWidth-scrollbarHorizontal.parentElement.offsetWidth;
		}
		if(currentVerticalScrollPointer>0){
			currentVerticalScrollPointer=0;
		}
		if(currentVerticalScrollPointer< scrollbarVertical.offsetHeight-scrollbarVertical.parentElement.offsetHeight){
			currentVerticalScrollPointer=scrollbarVertical.offsetHeight-scrollbarVertical.parentElement.offsetHeight;
		}
		moveAt(currentHorizontalScrollPointer, currentVerticalScrollPointer);
	};
	// Call Mouse wheel event
	scrollbarContent.addEventListener("mousewheel", function(event) {
		scrollbarContentMouseWheel(event);
	});



	// Event on middle bar small button
	function scrollbarController(event,i){
		if(event !== undefined && event.cancelable)
		event.preventDefault();
		getPointer();
		$(scrollbarContent).css({"transition":"left 0s , top 0s"});
		scrollbarPanelContainer.css({"transition":"left 0s , top 0s"});
		var scrollbarPanel = $(scrollbarPanelContainer)[i],
		isScrollVertical = $(scrollbarPanelContainer[i]).hasParent(".scrollbarVertical"),
		scrollbarContainer = scrollbarPanel.parentElement,
		mouseAndTouchDown = isScrollVertical?pointerY(event):pointerX(event),
		mouseAndTouchDownDifferenceFromParentBorder =  mouseAndTouchDown - parseInt(isScrollVertical?scrollbarPanel.getBoundingClientRect().top:scrollbarPanel.getBoundingClientRect().left);
		document.addEventListener(hasTouchDevice?"touchmove":"mousemove", onUserDoMove);
		document.addEventListener(hasTouchDevice?"touchend":"mouseup", onUserDoUp);
		function onUserDoMove(event) {
			var mouseAndTouchUp = isScrollVertical?pointerY(event):pointerX(event);
			var mouseAndTouchUpAxisInParent = mouseAndTouchUp - mouseAndTouchDownDifferenceFromParentBorder - parseInt(isScrollVertical?scrollbarContainer.getBoundingClientRect().top:scrollbarContainer.getBoundingClientRect().left);
			if (mouseAndTouchUpAxisInParent < 0) {
				mouseAndTouchUpAxisInParent = 0;
			}
			var maxScrollableArea = parseInt(isScrollVertical?(scrollbarContainer.offsetHeight - scrollbarPanel.offsetHeight):(scrollbarContainer.offsetWidth - scrollbarPanel.offsetWidth));
			if (mouseAndTouchUpAxisInParent > maxScrollableArea) {
				mouseAndTouchUpAxisInParent = maxScrollableArea;
			}
			if(isScrollVertical){
				scrollbarPanel.style.top = mouseAndTouchUpAxisInParent + 'px';
				contentAreaScrollPositionTop = -mouseAndTouchUpAxisInParent * heightScrollRatio;
				$(scrollbarContent).css({"top":contentAreaScrollPositionTop+"px"});
			} else {
				scrollbarPanel.style.left = mouseAndTouchUpAxisInParent + 'px';
				contentAreaScrollPositionLeft = -mouseAndTouchUpAxisInParent * widthScrollRatio;
				$(scrollbarContent).css({"left":contentAreaScrollPositionLeft+"px"});
			}
		}
		function onUserDoUp() {
			$(scrollbarContent).css({"transition":"left "+animationSpeed+"s,top "+animationSpeed+"s"});
			scrollbarPanelContainer.css({"transition":"left "+animationSpeed+"s,top "+animationSpeed+"s"});
			document.removeEventListener(hasTouchDevice?"touchend":"mouseup", onUserDoUp);
			document.removeEventListener(hasTouchDevice?"touchmove":"mousemove", onUserDoMove);
		}
	}
	//click event on middle bar small button
	scrollbarPanelContainer.each(function(i){
		scrollbarPanelContainer[i].addEventListener( hasTouchDevice?"touchstart":"mousedown", function(event) {
			scrollbarController(event,i);
		});
		scrollbarPanelContainer[i].ondragstart = function() {return false};
	});

	
	// Middle content touch move and mouse move
	function scrollbarContentController(event){
		getPointer();
		var parentX = scrollbarContent.parentElement.getBoundingClientRect().left;
		var parentY = scrollbarContent.parentElement.getBoundingClientRect().top;
		var mouseAndTouchUpAxisXInParent = pointerX(event) - scrollbarContent.getBoundingClientRect().left;
		var mouseAndTouchUpAxisYInParent = pointerY(event) - scrollbarContent.getBoundingClientRect().top;
		function moveAtMiddle(currentHorizontalScrollPointer, currentVerticalScrollPointer) {
			if(returnBack()==true){ return }else{ returnBack()};
			if(options.horizontalScrollbar!=false) {
			scrollbarContent.style.left = currentHorizontalScrollPointer - (mouseAndTouchUpAxisXInParent+parentX) + 'px';
			scrollbarHorizontal.style.left = -(currentHorizontalScrollPointer - (mouseAndTouchUpAxisXInParent+parentX))/widthScrollRatio + 'px';
			}
			if(options.verticalScrollbar!=false) {
				scrollbarContent.style.top = currentVerticalScrollPointer - (mouseAndTouchUpAxisYInParent+parentY) + 'px';
				scrollbarVertical.style.top = -(currentVerticalScrollPointer - (mouseAndTouchUpAxisYInParent+parentY))/heightScrollRatio + 'px';
			}
			setTimeout(() => getPointerOnResize(), animationSpeed * 1000);
		}
		scrollbarContent.addEventListener(hasTouchDevice?"touchmove":"mousemove", onUserDoMove);
		document.addEventListener(hasTouchDevice?"touchend":"mouseup", onUserDoUp);
		function onUserDoMove(event) {
			var mouseAndTouchMoveAxisXInParent = pointerX(event);
			var mouseAndTouchMoveAxisYInParent = pointerY(event);
			var maxScrollableWidthArea = mouseAndTouchMoveAxisXInParent - mouseAndTouchUpAxisXInParent - parentX;
			var maxScrollableHeightArea = mouseAndTouchMoveAxisYInParent - mouseAndTouchUpAxisYInParent - parentY;
			
			if(maxScrollableWidthArea<selectorWidth-fullContentWidth){
				mouseAndTouchMoveAxisXInParent = mouseAndTouchUpAxisXInParent + selectorWidth-fullContentWidth+parentX;
			}
			if(maxScrollableHeightArea<selectorHeight-fullContentHeight){
				mouseAndTouchMoveAxisYInParent = mouseAndTouchUpAxisYInParent + selectorHeight-fullContentHeight+parentY;
			}
			if (maxScrollableWidthArea > 0) {
				mouseAndTouchMoveAxisXInParent = mouseAndTouchUpAxisXInParent + scrollbarContent.parentElement.getBoundingClientRect().left;
			}
			if (maxScrollableHeightArea > 0) {
				mouseAndTouchMoveAxisYInParent = mouseAndTouchUpAxisYInParent + scrollbarContent.parentElement.getBoundingClientRect().top;
			}
			moveAtMiddle(mouseAndTouchMoveAxisXInParent, mouseAndTouchMoveAxisYInParent);
		}
		function onUserDoUp() {
			document.removeEventListener(hasTouchDevice?"touchend":"mouseup", onUserDoUp);
			scrollbarContent.removeEventListener(hasTouchDevice?"touchmove":"mousemove", onUserDoMove);
		}
	};
	// Middle content event
	scrollbarContent.addEventListener(hasTouchDevice?"touchstart":"mousedown", function(event) {
		scrollbarContentController(event)
	});
	scrollbarContent.ondragstart = function() {return false;};

	// when window scroll 
	var windowScrollX=0,isVerticalSlide=false,isScrolling=false,isScrollingTimeout;
	window.addEventListener("touchstart",function(event){
		windowScrollX = pointerX(event);
	});
	window.addEventListener("touchmove",function(event){
		var currentWindowScrollX = pointerX(event);
		if(Math.abs(currentWindowScrollX-windowScrollX)>10)
		isVerticalSlide = true;
	});
	window.addEventListener("touchend",function(event){
		isVerticalSlide = false;
	});
	window.addEventListener("scroll", function ( event ) {
		isScrolling=true;
		window.clearTimeout( isScrollingTimeout );
		isScrollingTimeout = setTimeout(function() {
			isScrolling = false;
		}, 66);
	}, false);

	// Has parent function
	$.fn.hasParent = function (e) {
		return !!$(this).parents(e).length
	}
}