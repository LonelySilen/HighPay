define(function() {
    return {
        getUrl: function() {
        	var url = "http://rmkj022.vicp.cc:4000/indexhandler.ashx";//"http://192.168.1.106:4000/indexhandler.ashx";
        	return url;
        },
        getPhoneType: function() {
        	var phonetype = "blackberry"; //终端类型
            var ua = navigator.userAgent.toLowerCase();	
        	if (/iphone|ipad|ipod/.test(ua)) {
        		phonetype = "ios";
        	} else if (/android/.test(ua)) {
        		phonetype = "android";
        	}           
        	return phonetype;
        },
        getNetworkType: function() {
        	var networkState = navigator.connection.type;  
            var states = {};  
            states[Connection.UNKNOWN]  = '0'; //'Unknown connection';  
            states[Connection.ETHERNET] = '0'; //'Ethernet connection';  
            states[Connection.WIFI]     = '0'; //'WiFi connection';  
            states[Connection.CELL_2G]  = '0'; //'Cell 2G connection';  
            states[Connection.CELL_3G]  = '0'; //'Cell 3G connection';  
            states[Connection.CELL_4G]  = '0'; //'Cell 4G connection';  
            states[Connection.CELL]     = '0'; //'Cell generic connection';  
            states[Connection.NONE]     = '1'; //'No network connection';
            //alert("networkState: "+networkState);
        	return states[networkState];
        },
        getPrm: function(argv) {
        	var bianma = "abc"; //账号
            var currentTimeMillis = new Date().getTime(); //当前的毫秒

            var phonetype = "blackberry"; //终端类型
            var ua = navigator.userAgent.toLowerCase();	
        	if (/iphone|ipad|ipod/.test(ua)) {
        		phonetype = "ios";
        	} else if (/android/.test(ua)) {
        		phonetype = "android";
        	}
            var version = "1.0.0"; // 版本号
            var ext =0; //扩展字段,目前为0
            
            var prm = argv[0];
            prm += "@`"+bianma+"@`"+currentTimeMillis+"@`"+phonetype+"@`"+version+"@`"+ext;
            
            for( var i=1; i<argv.length; i++){
            	prm += "@`"+argv[i];

            }
            
            var o = {};
            o.b = prm;
            o.sessionid = localStorage.getItem('sessionid');
                            
        	return o;
        },
        
        getTime : function (num) { //author: silen 
        	var strdate = null;
        	if(num === 0)
        		strdate = "1970-01-01 00:00:00";
        	else{
        		
        		var date = new Date();
        		var Y =  date.getFullYear(); //月份
        		var M =  date.getMonth() + 1; //月份 
        		var D =  date.getDate(); //日 
        		var H =  date.getHours(); //小时 
        		var m =  date.getMinutes(); //分 
        		var s =  date.getSeconds(); //秒 

        		if(M<10){
        			M = '0'+ M;
        		}
        		if(D<10){
        			D = '0'+ D;
        		}
        		if(H<10){
        			H = '0'+ H;
        		}
        		if(m<10){
        			m = '0'+ m;
        		}
        		if(s<10){
        			s = '0'+ s;
        		}
        		
            	strdate = Y+"-"+M+"-"+D+" "+H+":"+m+":"+s;

        	}
        	
            return strdate;
        },

        getDistance : function ( lat1, lng1, lat2, lng2){
//        	alert('1: '+lat1+lng1+lat2+lng2);
        	var EARTH_RADIUS = 6378.137;

        	var dis = 0;
            var radLat1 = lat1* Math.PI / 180.0;
            var radLat2 = lat2* Math.PI / 180.0;
            var deltaLat = radLat1 - radLat2;
            var deltaLng = (lng1* Math.PI / 180.0) - (lng2* Math.PI / 180.0);
            dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
            return dis * EARTH_RADIUS;
        },
        
    	//baiduGps转火星GPS再转标准GPS
    	//WGS-84：是国际标准，GPS坐标（Google Earth使用、或者GPS模块）
    	//GCJ-02：中国坐标偏移标准，Google Map、高德、腾讯使用
    	//BD-09：百度坐标偏移标准，Baidu Map使用
    	gpsTranslate : function(baidu_longitude, baidu_latitude) {
    		//alert('开始转换GPS');
    		var PI = 3.14159265358979324;
    		var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    		
    		var bd_x=baidu_longitude - 0.0065;
    		var bd_y=baidu_latitude - 0.006;
    		var z = Math.sqrt(bd_x * bd_x + bd_y * bd_y) - 0.00002 * Math.sin(bd_y * x_pi);
    		var theta = Math.atan2(bd_y, bd_x) - 0.000003 * Math.cos(bd_x * x_pi);
    		var gcjLon = z * Math.cos(theta);
    		var gcjLat = z * Math.sin(theta);

    		//GCJ-02 to WGS-84
    		var a = 6378245.0;
    		var ee = 0.00669342162296594323;
    		var dLat = transformLat(gcjLon - 105.0, gcjLat - 35.0);
    		var dLon = transformLon(gcjLon - 105.0, gcjLat - 35.0);
    		var radLat = gcjLat / 180.0 * PI;
    		var magic = Math.sin(radLat);
    		magic = 1 - ee * magic * magic;
    		var sqrtMagic = Math.sqrt(magic);
    		dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
    		dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI);
    		return {'lat': gcjLat - dLat, 'lon': gcjLon - dLon};
    		
    		function transformLat(x, y){
    			var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    			ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
    			ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0;
    			ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0;
    			return ret;
    		}
    		function transformLon(x, y)
    		{
    			var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    			ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
    			ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0;
    			ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0;
    			return ret;
    		}

//    		//GCJ-02 to WGS-84 exactly
//    		var initDelta = 0.01;
//    		var threshold = 0.00001;
//    		var dLat = initDelta, dLon = initDelta;
//    		var mLat = gcjLat - dLat, mLon = gcjLon - dLon;
//    		var pLat = gcjLat + dLat, pLon = gcjLon + dLon;
//    		var wgsLat, wgsLon, i = 0;
//    		while (1) {
//    			wgsLat = (mLat + pLat) / 2;
//    			wgsLon = (mLon + pLon) / 2;
//    			var tmp = this.gcj_encrypt(wgsLat, wgsLon);
//    			dLat = tmp.lat - gcjLat;
//    			dLon = tmp.lon - gcjLon;
//    			if ((Math.abs(dLat) < threshold) && (Math.abs(dLon) < threshold)){
//    				break;
//    			}
//    			if (dLat > 0){
//    				pLat = wgsLat;
//    			}else
//    				mLat = wgsLat;
//    				
//    			if (dLon > 0){
//    				pLon = wgsLon;
//    			}else
//    				mLon = wgsLon;
    //
//    			if (++i > 10000)
//    				break;
//    		}
//    		return {'lat': wgsLat, 'lon': wgsLon};

    	}
    };
});