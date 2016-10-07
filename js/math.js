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



/*var m;

function MathEngine(){
	
	this.getRan = function(type,arg1,arg2){
		switch(type){
			case 0:
				return Math.floor(Math.random()*(arg2-arg1+1)+arg1);
				break;
			case 1:
				if((Math.floor(Math.random()-.5)) >= 0){
					return 1;
				} else {
					return -1;
				}
				break;
		}
	}
	
	this.distance = function(x1,y1,x2,y2){
		return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
	}
	
	this.distanceRaw = function(x1,y1,x2,y2){
		return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
	}
	
	this.bubble = function(array,base){
		
		this.storedVal;
		var a;
		
		if(base === undefined){
			
			for(var index=0;index<array.length;index++){
				for(var index2=0;index2<array.length-index-1;index2++){
					
					if(array[index2]>array[index2+1]){
						
						this.storedVal = array[index2];
						array[index2] = array[index2+1];
						array[index2+1] = this.storedVal;
						
					}
				}
			}
			
			console.log("hi")
			
		} else {
		
			for(var index=0;index<array.length;index++){
				for(var index2=0;index2<array.length-index-1;index2++){
					
					if(array[index2][base]>array[index2+1][base]){
						
						this.storedVal = array[index2];
						array[index2] = array[index2+1];
						array[index2+1] = this.storedVal;
						
					}
				}
			}
		
		}
		
		return array;
	}
	
	this.getSmallest = function(array,base){
		
		var champ = array[0];
		
		for(var index=1;index<array.length;index++){
			if(array[index][base] < champ[base]){
				champ = array[index];
			}
		}
		
		return champ;
	}
	
	this.getLargest = function(array,base){
		
		var champ = array[0];
		
		for(var index=1;index<array.length;index++){
			if(array[index][base] > champ[base]){
				champ = array[index];
			}
		}
		
		return champ;
		
	}
	
	this.getIndexOfSmallest = function(array){
		
		var champ = 0;
		
		for(var index=1;index<array.length;index++){
			if(array[index] < array[champ]){
				champ = index;
			}
		}
		
		return champ;
		
	}
	
	this.getIndexOfLargest = function(array){
		
		var champ = 0;
		
		for(var index=1;index<array.length;index++){
			if(array[index] > array[champ]){
				champ = index;
			}
		}
		
		return champ;
		
	}
	
	this.createNewFilledTwoDimensionalArray = function(width,height,fill){
		this.storedVal = new Array(width);
		for(var i=0;i<width;i++){
			this.storedVal[i] = new Array(height);
		}
		for(var x=0;x<width;x++){
			for(var y=0;y<height;y++){
				this.storedVal[x][y] = fill;
			}
		}
		return this.storedVal;
	}
	
	this.r2d = function(radians){
		return radians * 180 / Math.PI;
	}
	
	this.d2r = function(degrees){
		return degrees * Math.PI / 180;
	}
	
	this.degreeOfSlope = function(slope){
		return this.r2d(Math.atan(slope));
	}
	
	this.insert = function(array,base,item){
		
		var done = false;
		
		for(var i=0;i<array.length;i++){
			
			if(array[i][base]<item[base]) continue;
			array.splice(i,0,item);
			done = true;
			break;
			
		}
		
		done ? null : array.push(item);
		
	}
	
	
}(m = new MathEngine());*/