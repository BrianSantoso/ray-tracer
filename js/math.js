var m = {
	
	getRan: function(arg1,arg2){
		
		return Math.floor(Math.random() * (arg2-arg1+1) + arg1);
		
	},
	
	distance2: function(x1,y1,x2,y2){
		
		return Math.sqrt(this.rawDistance2(x1,y1,x2,y2));
		
	},
	
	rawDistance2: function(x1,y1,x2,y2){
		
		return (x2-x1) * (x2-x1) + (y2-y1) * (y2-y1);
		
	},
	
	distance3: function(x1,y1,x2,y2,z1,z2){
		
		return Math.sqrt(this.rawDistance3(x1,y1,x2,y2,z1,z2));
		
	},
	
	rawDistance3: function(x1,y1,x2,y2,z1,z2){
		
		return (x2-x1) * (x2-x1) + (y2-y1) * (y2-y1) + (z2-z1) * (z2-z1);
		
	},
	
	d2r: function(degrees){
		
		return degrees * Math.PI / 180;
		
	},
	
	r2d: function(radians){
		
		return radians * 180 / Math.PI;
		
	},
	
	
	
	
}

