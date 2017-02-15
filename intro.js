(function(window,document){
	if(window._introJsLoaded){
		return;
	}else{
		window._introJsLoaded = true;
	}
    function createIntroElement(){
        var introPageEle = document.createElement("div");
        introPageEle.id = "introPage";
        introPageEle.setAttribute('style','z-index:99999;position:absolute !important;top:0;bottom:0;width:100%;border:0;height:100%;height:100%;font-size:0;');
        var iframePageEle = document.createElement("iframe");
        iframePageEle.src= "./intro.html";
        iframePageEle.setAttribute("scrolling","no");
        iframePageEle.setAttribute('style','border:0;height:100%;width:1px;min-width:100%;*width:100%;');
        introPageEle.appendChild(iframePageEle);
        document.body.appendChild(introPageEle);
    }
    try {
        if (localStorage && localStorage.getItem('introPage') == null) {
            createIntroElement();
            var introPageElement = document.getElementById('introPage');
            if (window.addEventListener) {
                window.addEventListener('message', function(event) {
                    if (event.data === "introPageClose") {
                        if(introPageElement && introPageElement.parentNode != null){
                            introPageElement.parentNode.removeChild(introPageElement);
                        }
                    }
                });
            }
        }
    } catch (e) {
    };
})(window,document);
