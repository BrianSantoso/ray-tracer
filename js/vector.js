var v = {
	
	zeroVector: new Vector3(0,0,0),
	
	upVector: new Vector3(0,1,0),
	rightVector: new Vector3(1,0,0),
	forwardVector: new Vector3(0,0,1),
	downVector: new Vector3(0,-1,0),
	leftVector: new Vector3(-1,0,0),
	backVector: new Vector3(0,0,-1),
	
	infinityVector: new Vector3(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY),
	nullVector: new Vector3(null,null,null),
	
	nullIntersection: new Intersection(false, new Vector3(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY), new Vector3(0,0,0),Number.POSITIVE_INFINITY),
	
	
	
	add2: function(a,b){
		
		return new Vector2(a.x+b.x, a.y+b.y);
		
	},
	
	add3: function(a,b){
		
		return new Vector3(a.x+b.x, a.y+b.y, a.z+b.z);
		
	},
	
	sub2: function(a,b){
		
		return new Vector2(a.x-b.x, a.y-b.y);
		
	},
	
	sub3: function(a,b){
		
		return new Vector3(a.x-b.x, a.y-b.y, a.z-b.z);
		
	},
	
	dotProduct2: function(a,b){
		
		return a.x*b.x + a.y*b.y;
		
	},
	
	dotProduct3: function(a,b){
		
		return a.x*b.x + a.y*b.y + a.z*b.z;
		
	},
	
	scale2: function(a,scalar){
		
		return new Vector2(a.x*scalar, a.y*scalar);
		
	},
	
	scale3: function(a,scalar){
		
		return new Vector3(a.x*scalar, a.y*scalar, a.z*scalar);
		
	},
	
	crossProduct2: function(a,b){
	
		return a.x*b.y - a.y*b.x;
		
	},
	
	crossProduct3: function(a,b){
		
		return new Vector3(
		
		a.y*b.z - a.z*b.y,
		a.z*b.x - a.x*b.z,
		a.x*b.y - a.y*b.x
		
		)
		
	},
	
	reflect2: function(a,normal){
		
		
		return this.sub2(a,this.scale2(normal,2*this.dotProduct2(a,normal)));
		
	},
	
	reflect3: function(a,normal){
		
		return this.sub3(a,this.scale3(normal,2*this.dotProduct3(a,normal)));
		
	},
	
	unitVector2: function(a){
		
		var magnitude = this.getMag2(a);
		return new Vector2(a.x/magnitude, a.y/magnitude);
		
	},
	
	unitVector3: function(a){
		
		var magnitude = this.getMag3(a);
		return new Vector3(a.x/magnitude, a.y/magnitude, a.z/magnitude);
		
	},
	
	
	getMag2: function(a){
		
		return m.distance(0,0,a.x,a.y);
		
	},
	
	getMag3: function(a){
		
		return Math.sqrt(a.x*a.x + a.y*a.y + a.z*a.z);
		
	},
	
	rayXplane: function(ray,plane){
		
		var denom = this.dotProduct3(ray.n, plane.n);
		var t;
		
		if(denom !== 0){
			
			t = this.dotProduct3(v.sub3(plane.p,ray.p), plane.n)/denom;
			
			if(t>=0){
				
				var pos = v.add3(ray.p,v.scale3(ray.n,t));
				
				return new Intersection(true,pos,plane.n,v.distanceRaw3(ray.p, pos));
				
			} else {
				
				return v.nullIntersection;
				
			}
			
		} else {
			
			return v.nullIntersection;
			
		}
		
	},
	
	segXplane: function(seg,plane){
		
		var denom = this.dotProduct3(seg.n, plane.n);
		var t;
		
		if(denom !== 0){
			
			t = this.dotProduct3(v.sub3(plane.p,seg.p1), plane.n)/denom;
			
			if(t>=0 && t<=1){
				
				var pos = v.add3(seg.p1,v.scale3(seg.n,t));
				
				return new Intersection(true,pos,plane.n,v.distanceRaw3(seg.p1, pos));
				
			} else {
				
				return v.nullIntersection;
				
			}
			
		} else {
			
			return v.nullIntersection;
			
		}
		
	},
	
	
	
	rayXsphere: function(ray,sphere){
		
		var 	l = v.sub3(sphere.p,ray.p),
				tca = v.dotProduct3(l,ray.n);
		
		if(tca < 0) return v.nullIntersection;
		
		var dSquared = v.dotProduct3(l,l) - (tca*tca);
		var rSquared = sphere.r * sphere.r;
		
		if(dSquared > rSquared) return v.nullIntersection;
		
		var thc = Math.sqrt(rSquared-dSquared),
				t1 = tca + thc,
				t2 = tca - thc,
				pos1 = v.add3(ray.p,v.scale3(ray.n,t1)),
				pos2 = v.add3(ray.p,v.scale3(ray.n,t2)),
				
				distanceSquared1 = v.distanceRaw3(ray.p, pos1),										
				distanceSquared2 = v.distanceRaw3(ray.p, pos2);
		
		
		
		if(distanceSquared1 <= distanceSquared2){
			
			return new Intersection(
			
													true,
													pos1,
													v.unitVector3(v.sub3(pos1,sphere.p)),
													distanceSquared1

													);
			
		} else {
			
			return new Intersection(
			
													true,
													pos2,
													v.unitVector3(v.sub3(pos2,sphere.p)),
													distanceSquared2
													
													);
													
		}
		
		

	},
	
	
	segXsphere: function(seg,sphere){
		
		var 	l = v.sub3(sphere.p,seg.p1),
				tca = v.dotProduct3(l,seg.n);
		
		if(tca < 0) return v.nullIntersection;
		
		var dSquared = v.dotProduct3(l,l) - (tca*tca);
		var rSquared = sphere.r * sphere.r;
		
		if(dSquared > rSquared) return v.nullIntersection;
		
		var thc = Math.sqrt(rSquared-dSquared),
				t1 = tca + thc,
				t2 = tca - thc,
				pos1 = v.add3(seg.p1,v.scale3(seg.n,t1)),
				pos2 = v.add3(seg.p1,v.scale3(seg.n,t2)),
				
				distanceSquared1 = t1 <= 1 ? v.distanceRaw3(seg.p1, pos1) : Number.POSITIVE_INFINITY,
				distanceSquared2 = t2 <= 1 ? v.distanceRaw3(seg.p1, pos2) : Number.POSITIVE_INFINITY;
		
		
		
		if(distanceSquared1 <= distanceSquared2){
			
			return new Intersection(
			
													true,
													pos1,
													v.unitVector3(v.sub3(pos1,sphere.p)),
													distanceSquared1
													
													);
			
		} else if(distanceSquared1 > distanceSquared2) {
			
			return new Intersection(
			
													true,
													pos2,
													v.unitVector3(v.sub3(pos2,sphere.p)),
													distanceSquared2
													
													);
													
		} else {
			
			return v.nullIntersection;
			
		}
		
		

	},
	
	
	
	
	distanceRaw2: function(x1,y1,x2,y2){
		
		return (x2-x1) * (x2-x1) + (y2-y1) * (y2-y1);
		
	},
	
	distanceRaw3: function(a,b){
		
		return (b.x-a.x) * (b.x-a.x) + (b.y-a.y) * (b.y-a.y) + (b.z-a.z) * (b.z-a.z);
		
	},
	
	distance2: function(x1,y1,x2,y2){
		
		return Math.sqrt( (x2-x1) * (x2-x1) + (y2-y1) * (y2-y1) );
		
	},
	
	distance3: function(a,b){
		
		return Math.sqrt( (b.x-a.x) * (b.x-a.x) + (b.y-a.y) * (b.y-a.y) + (b.z-a.z) * (b.z-a.z) );
		
	},
	
	project2: function(a,b){
		
		return v.scale2(b, (v.dotProduct2(a,b)/v.distanceRaw2(0,0,b.x,b.y)));
		
	},
	
	project3: function(a,b){
		
		return v.scale3(b, (v.dotProduct3(a,b)/v.distanceRaw3(v.zeroVector,b)));
		
	},
	
	
}

function Vector2(x,y){
	
	this.x = x;
	this.y = y;
	
}

function Vector3(x,y,z){
	
	this.x = x;
	this.y = y;
	this.z = z;
	
}

function Intersection(bool,pos,normal,rawDistance){
	
	this.bool = bool;
	this.pos = pos;
	this.n = normal;
	this.rawDistance = rawDistance;
	
}

function Ray(origin,direction){
	
	this.p = origin;
	this.n = direction;
	
}

function Segment(p1,p2){
	
	this.p1 = p1;
	this.p2 = p2;
	this.n = v.unitVector3(v.sub3(this.p2, this.p1));	//direction starting from p1 pointing towards p2
	this.length = v.distance3(this.p1, this.p2);
	
}

function Plane(point,normal){
	
	this.p = point;			// vector representing distance from world origin.
	this.n = normal;
	
}

function Sphere(center,radius){
	
	this.p = center;
	this.r = radius;
	
}