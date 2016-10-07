/*

	Ray Tracer by Brian Santoso
	v. 10 7 16

	______       _             
	|  ____|     (_)            
	| |__   _ __  _  ___  _   _ 
	|  __| | '_ \| |/ _ \| | | |
	| |____| | | | | (_) | |_| |
	|______|_| |_| |\___/ \__, |
		    _/ |       __/ |
		    |__/       |___/ 



*/

var canvas, 
		ctx,
		scene,
		image,
		moe = 1e-6,
		zoom = 1,
		maxRecursionDepth = 5;
		
window.onload = function(){
	
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	
	canvas.width = canvas.height = Math.min(window.innerWidth, window.innerHeight);
	canvas.width *= zoom;
	canvas.height *= zoom;
	
	image = new Img(canvas.width,canvas.height);
	
	console.log("Initializing scene...");
	scene = s2;
	scene.init();
	
	
	console.log("Rendering...");
	render(scene, 0);
	
	mouse.init(scene);
	
};

function Img(width,height){
	
	this.width = width;
	this.height = height;
	
}


function render(scene, y){
	
	for(var x=0; x<image.width; x++){

		var projectionPoint = getProjectionPoint(x, y, scene.camera),
				primaryRay = new Ray(scene.camera.pos, v.unitVector3(v.sub3(projectionPoint, scene.camera.pos))),
				colorRGB = getPixelColor(primaryRay, scene, 0, maxRecursionDepth);
		
		drawPixel(x, y, colorRGB);
		
	}
	
	if(y<image.height){
		
		requestAnimationFrame(function(){
			
			render(scene, y+1);
			
		});
		
	} else {
		
		console.log("Done!");
		console.log("Left Click + Right Click on an object to read its properties!");
		
	}
	
}


function getPixelColor(ray, scene, recursionDepth, maxRecursionDepth){
	
	var	collisionPackage = rayCast(ray, scene),
			colorRGB = getRayColor(collisionPackage, scene);
	
	if(collisionPackage.intersection.bool){
		if(recursionDepth < maxRecursionDepth){
			
			if(scene.objects[collisionPackage.objectIndex].reflectivity > 0){
				
				var reflectedVector = v.reflect3(ray.n, collisionPackage.intersection.n),
						reflectedRay = new Ray(v.add3(collisionPackage.intersection.pos, v.scale3(reflectedVector, moe)), reflectedVector);
						
				colorRGB = v.add3(v.scale3(colorRGB, 1-scene.objects[collisionPackage.objectIndex].reflectivity), v.scale3(getPixelColor(reflectedRay, scene, recursionDepth+1, maxRecursionDepth), scene.objects[collisionPackage.objectIndex].reflectivity));
			
			}
			
		}
	}
	
	
	return colorRGB;
}




function getRayColor(collisionPackage, scene){
	
	illumination = illuminate(collisionPackage, scene);
			
			
	var colorRGB = scene.objects[collisionPackage.objectIndex].texture(collisionPackage.intersection.pos.x, collisionPackage.intersection.pos.y, collisionPackage.intersection.pos.z);
	colorRGB = new Vector3(colorRGB.x * illumination.x, colorRGB.y * illumination.y, colorRGB.z * illumination.z);
	
	return colorRGB;
}


function illuminate(collisionPackage, scene){
	
	var ia = getAmbient(scene),
			id = v.zeroVector,
			is = v.zeroVector;
	
	
	if(collisionPackage.objectIndex >=0){
		
		for(var lightIndex = 0; lightIndex<scene.lights.length; lightIndex++){
			
			
			
			var shadowRay = new Ray(v.add3(collisionPackage.intersection.pos, v.scale3(collisionPackage.intersection.n, moe)), v.unitVector3(v.sub3(scene.lights[lightIndex].pos, collisionPackage.intersection.pos))),
					shadowRayCollisionPackage = rayCast(shadowRay, scene);
						
			if(v.distanceRaw3(shadowRay.p, scene.lights[lightIndex].pos) < shadowRayCollisionPackage.intersection.rawDistance){
				
				id = v.add3(id, getDiffuse(scene, collisionPackage, lightIndex));
				is = v.add3(is, getSpecular(scene, collisionPackage, lightIndex));
			
			}
			
			

		}
		
	}
	
	
	return v.add3(ia, v.add3(id, is));

}



function getProjectionPoint(x, y, camera){
	
	var normalizedX = (x/image.width * camera.projectionPlane.width) - camera.projectionPlane.halfWidth;
	var normalizedY = (y/image.height * camera.projectionPlane.height) - camera.projectionPlane.halfHeight;
	
		
	return v.add3(v.add3(v.add3(v.scale3(camera.right, normalizedX), v.scale3(camera.up, normalizedY)), camera.direction), camera.pos);
	
}


function rayCast(ray, scene){
	
	var candidates = [],
			objectIndexes = [],
			champ = {
		
				intersection: v.nullIntersection,
				objectIndex: -1
				
			}
	
	
		
	for(var i=0; i<scene.objects.length;i++){
		
		//
		// If the type of object is a plane, calculate using ray-plane intersection.
		//
		
		if(scene.objects[i].type instanceof Plane){
			
			var intersection = v.rayXplane(ray, scene.objects[i].type);
			
			if(intersection.bool){
				
				if(intersection.rawDistance < champ.intersection.rawDistance){
					
					champ.intersection = intersection;
					champ.objectIndex = i;
					
				}
				
			}
			
		}
		
		
		
		//
		// If the type of object is a sphere, calculate using ray-sphere intersection.
		//
		
		if(scene.objects[i].type instanceof Sphere){
			
			var intersection = v.rayXsphere(ray, scene.objects[i].type);
			
			if(intersection.bool){
				
				
				if(intersection.rawDistance < champ.intersection.rawDistance){
					
					
					champ.intersection = intersection;
					champ.objectIndex = i;
					
				}
				
			
				
			}
				
				
		}
		
	}
	
	
	return champ;
	
}

function segCast(seg, scene){
		
	var candidates = [];
			objectIndexes = [];
			champ = {
				
				intersection: v.nullIntersection,
				objectIndex: -1
				
			}
	
	
		
	for(var i=0; i<scene.objects.length;i++){
				
		
		if(scene.objects[i].type instanceof Plane){
			
			var intersection = v.segXplane(seg, scene.objects[i].type);
			
			if(intersection.bool){
				
				if(intersection.rawDistance < champ.intersection.rawDistance){
					
					champ.intersection = intersection;
					champ.objectIndex = i;
					
				}
				
			}
			
		}
			
		if(scene.objects[i].type instanceof Sphere){
			
			var intersection = v.segXsphere(seg, scene.objects[i].type);
			
			if(intersection.bool){
				
				
				if(intersection.rawDistance < champ.intersection.rawDistance){
					
					
					champ.intersection = intersection;
					champ.objectIndex = i;
					
				}
				
			
				
			}
				
				
		}
		
	}
	
	
	return champ;
	
}


function getAmbient(scene){
	
	return scene.ambient;
	
}

function getDiffuse(scene, collisionPackage, lightIndex){
	
	var light = scene.lights[lightIndex],
			object = scene.objects[collisionPackage.objectIndex],
			
			l = v.unitVector3(v.sub3(light.pos, collisionPackage.intersection.pos));		// normalized vector of direction of light starting from intersection point to the light source
			
	return v.scale3(light.diffuse, object.diffuse * Math.max(0, v.dotProduct3(collisionPackage.intersection.n, l)));
	
}

function getSpecular(scene, collisionPackage, lightIndex){	//node specular
	
	
	var light = scene.lights[lightIndex],
			object = scene.objects[collisionPackage.objectIndex],
			
			l = v.unitVector3(v.sub3(light.pos, collisionPackage.intersection.pos)),						// normalized vector of direction of light starting from intersection point to the light source
			r = v.reflect3(l, collisionPackage.intersection.n),														// reflection vector
			v2 = v.unitVector3(v.sub3(collisionPackage.intersection.pos, scene.camera.pos))		// direction pointing towards viewer
	

	return v.scale3(light.specular, object.specular * (Math.pow(v.dotProduct3(r, v2), object.shininess)));
	
	/*
	var light = scene.lights[lightIndex],
			object = scene.objects[collisionPackage.objectIndex],
			l = v.unitVector3(v.sub3(light.pos,collisionPackage.intersection.pos)),							// normalized vector of direction of light starting from intersection point to the light source
			//r = v.reflect3(l, collisionPackage.intersection.n),														// reflection vector
			v2 = v.unitVector3(v.sub3(collisionPackage.intersection.pos, scene.camera.pos)),		// direction pointing towards viewer
			h = v.unitVector3(v.add3(v2, l));																				// half vector near normal
	
	return v.scale3(light.specular, object.specular * (Math.pow(v.dotProduct3(collisionPackage.intersection.n, h), object.shininess)));
	*/
}


function projectThroughPixel(pixel){
	
	return new Ray(
								scene.camera.pos,
								v.unitVector3(v.sub3(v.add3(scene.projectionPlane.bottomLeft, pixel.pos), scene.camera.pos))
							);
	
}

function drawPixel(x, y, rgb){
	
	graphics.fillRect(x*zoom, y*zoom, 1*zoom, 1*zoom, graphics.rgb(rgb.x, rgb.y, rgb.z));
	
}

var graphics = {
			
	getY: function(y, height){	//treat bottom left as (0,0);	//give height parameter in the case of drawing a rectangle.
		return height === undefined ? canvas.height-y : canvas.height-y-height;
	},

	drawSegment: function(x1, y1, x2, y2, color){
		var storedColor = ctx.strokeStyle;
		ctx.strokeStyle = color;
		ctx.beginPath();
		
		ctx.moveTo(x1, this.getY(y1));
		ctx.lineTo(x2, this.getY(y2));
		
		ctx.stroke();
		ctx.closePath();
		ctx.strokeStyle = storedColor;
	},

	fillRect: function(x, y, width, height, color){
		var storedColor = ctx.fillStyle;
		
		ctx.fillStyle = color;
		ctx.fillRect(x, this.getY(y, height), width, height);
		
		ctx.fillStyle = storedColor;
	},
	
	rgb: function(r, g, b){
		
		return "rgb(" + Math.floor(r) + "," + Math.floor(g) + "," + Math.floor(b) + ")";
		
	},

}
