var s0 = {
	
	init: function(){
		
		//this.ambient = 0.5;
		//this.ambient = new Vector3(0.5, 0.5, 0.5);
		//this.ambient = new Vector3(0.7, 0.7, 0.8);
		
		//this.ambient = new Vector3(0.05, 0.05, 0.05);
		this.ambient = new Vector3(0.0, 0.0, 0.0);
		//this.ambient = new Vector3(0.7, 0.8, 0.9);
		
		this.lights = [
			/*
			{			

				
				pos: new Vector3(75,100,5),
				
				specular: 	new Vector3(1.0, 1.0, 1.0),
				diffuse:		new Vector3(0.8, 0.8, 0.8),
				
			},
			
			*/
			
			
			/*{
				
				pos: new Vector3(75,100,5),
				
				specular: 	new Vector3(0.8, 0.0, 0.0),
				diffuse:		new Vector3(0.8, 0.0, 0.0),
				
			},*/
			
			{
				
				pos: new Vector3(-75,100,5),
				
				specular: 	new Vector3(0.8, 0.8, 0.0),
				diffuse:		new Vector3(0.8, 0.8, 0.0),
				
			},
			
			{			
			
				pos: new Vector3(75,100,5),
				
				specular: 	new Vector3(0.0, 0.0, 0.8),
				diffuse:		new Vector3(0.0, 0.0, 0.8),
				
			},
			
			
			
			/*{			
			
				pos: new Vector3(75,100,5),
				
				specular: 	new Vector3(0, 0.8, 0.0),
				diffuse:		new Vector3(0.0, 0.8, 0.0),
				
			},*/
			
			
			
			
			
			
		];
		
		this.objects = [
		
			{
				
				type: new Plane(new Vector3(0,0,0), v.upVector),
				
				specular: 0.5,		// material's specular constant
				diffuse:		0.5, 	// material's diffuse constant
				
				shininess: 1.0,		// material's shininess
				reflectivity: 0.3,
				
				texture: function(x,y,z){
					
					var size = 1;
					/*
					var xSign = Math.floor(x/size) % 2 ? 1 : -1;
					var zSign = Math.floor(z/size) % 2 ? 1 : -1;
					
					return xSign * zSign > 0 ? new Vector3(255,215,0) : new Vector3(255,255,255);	
					*/
					
					return (Math.floor(x/size) % 2 ? 1 : -1) * (Math.floor(z/size) % 2 ? 1 : -1) > 0 ? new Vector3(255,215,0) : new Vector3(255,255,255);
					
				}
				
			},
			
			
			/*
			{
				
				type: new Sphere(new Vector3(0,3,5), 1),
				
				specular: 1.0, // material's specular constant
				diffuse: 	0.5, // material's diffuse constant
				
				shininess: 1.0,	// material's shininess
				reflectivity: 0.0,
				
				texture: function(x,y,z){

					return new Vector3(0,127,127);
					
				}
				
			},*/
			
			{
				
				type: new Sphere(new Vector3(0,3,5), 1),
				
				specular: 1.0, // material's specular constant
				diffuse: 	0.5, // material's diffuse constant
				
				shininess: 1.0,	// material's shininess
				reflectivity: 0.8,
				
				texture: function(x,y,z){

					return new Vector3(0,0,0);
					
				}
				
			},
			
			
			
			
			{
				
				type: new Plane(new Vector3(0,0,36), v.backVector),
				
				specular: 0.5,		// material's specular constant
				diffuse:		0.5, 	// material's diffuse constant
				
				shininess: 1.0,		// material's shininess
				reflectivity: 1.0,
				
				texture: function(x,y,z){
					
					return v.zeroVector;
					
				}
				
			},
			
			{
				
				type: new Plane(new Vector3(0,0,-5), v.forwardVector),
				
				specular: 0.5,		// material's specular constant
				diffuse:		0.5, 	// material's diffuse constant
				
				shininess: 1.0,		// material's shininess
				reflectivity: 1.0,
				
				texture: function(x,y,z){
					
					return v.zeroVector;
					
				}
				
			},
			
			
			
			
		
		];
		
		this.objects[-1] = {	// VOID OBJECT IS STORED IN NEGATIVE INDEX OF SCENE'S OBJECT ARRAY AND DOES NOT AFFECT THE ARRAY'S LENGTH
			
			type: null,
			
			specular: 0,
			diffuse: 	0,
			
			shininess: 0,
			reflectivity: 0,
			
			texture: function(x,y,z){

				return v.zeroVector;
				
			}
			
			
		}
		
		
		for(var rep=0; rep<50; rep++){
			
			
			this.objects.push(
			
				{
				
					type: new Sphere(new Vector3(-m.getRan(-15,15),m.getRan(0,8),m.getRan(20,30)), m.getRan(0.1,2)),
					//type: new Sphere(new Vector3(-m.getRan(-40,40),m.getRan(0,20),m.getRan(20,60)), m.getRan(0.1,2)),
					
					specular: 	m.getRan(0.9,1), // material's specular constant
					diffuse: 	m.getRan(0.9,1), // material's diffuse constant
					
					shininess: m.getRan(1,3),	// material's shininess
					reflectivity: 0.0,
					
					color: new Vector3(m.getRan(0,255),m.getRan(0,255),m.getRan(0,255)),
					
					texture: function(x,y,z){

						return this.color;
						
					}
					
				}
				/*
				{
				
					type: new Sphere(new Vector3(-m.getRan(-15,15),m.getRan(0,8),m.getRan(20,30)), m.getRan(0.1,2)),
					
					specular: 1, // material's specular constant
					diffuse: 	1, // material's diffuse constant
					
					shininess: 2,	// material's shininess
					reflectivity: 0,
					
					color: new Vector3(5, 207, 195),
					
					texture: function(x,y,z){

						return this.color;
						
					}
					
				}
				*/
			
			);
			
			
		}
		
		
		this.camera = {
		
			pos: new Vector3(0,4,0),
			//pos: new Vector3(10,4,0),
			//pos: new Vector3(0,10,5),
			direction: v.forwardVector,
			//direction: v.unitVector3(new Vector3(-1,0,2)),
			//direction: v.unitVector3(new Vector3(m.getRan(-1,1),m.getRan(-1,0),m.getRan(0,1))),
			fov: 90,
			
			init: function(){
				
				this.right = v.crossProduct3(v.upVector,this.direction);
				this.up = v.crossProduct3(this.direction,this.right);
				
				this.projectionPlane = {
					
					type: new Plane(v.add3(this.pos, this.direction), this.direction),
					halfWidth: Math.tan( m.d2r(this.fov/2) ) * v.getMag3(this.direction),
					halfHeight: Math.tan( m.d2r(this.fov/2) ) * v.getMag3(this.direction),
					
					init: function(){
						
						this.width = this.halfWidth * 2;
						this.height = this.halfHeight * 2;
						
					}
					
				}
				
				this.projectionPlane.init();
				
			}
			
		}
		
		this.camera.init();
		
	}
	
	
	
}























var s1 = {
	
	init: function(){
		
		this.ambient = new Vector3(0.0, 0.0, 0.0);
		
		this.lights = [
			
			{
				
				pos: new Vector3(-75,100,5),
				
				specular: 	new Vector3(0.8, 0.8, 0.0),
				diffuse:		new Vector3(0.8, 0.8, 0.0),
				
			},
			
			{			
			
				pos: new Vector3(75,100,5),
				
				specular: 	new Vector3(0.0, 0.0, 0.8),
				diffuse:		new Vector3(0.0, 0.0, 0.8),
				
			},
			
		];
		
		this.objects = [
		
			{
				
				type: new Plane(new Vector3(0,0,0), v.upVector),
				
				specular: 0.5,		// material's specular constant
				diffuse:		0.5, 	// material's diffuse constant
				
				shininess: 1.0,		// material's shininess
				reflectivity: 0.3,
				
				texture: function(x,y,z){
					
					//return new Vector3(255,255,255);
					
					var size = 1;
					
					var xSign = Math.floor(x/size) % 2 ? 1 : -1;
					var zSign = Math.floor(z/size) % 2 ? 1 : -1;
					
					return xSign * zSign > 0 ? new Vector3(255,215,0) : new Vector3(255,255,255);
					
				}
				
			},
		
		];
		
		this.objects[-1] = {	// VOID OBJECT IS STORED IN NEGATIVE INDEX OF SCENE'S OBJECT ARRAY AND DOES NOT AFFECT THE ARRAY'S LENGTH
			
			type: null,
			
			specular: 0,
			diffuse: 	0,
			
			shininess: 0,
			reflectivity: 0,
			
			texture: function(x,y,z){

				return v.zeroVector;
				
			}
			
			
		}
		
		for(var x=0; x<50; x++){
			for(var z=0; z<50; z++){
			
				this.objects.push({
					
					type: new Sphere(new Vector3(x-25,1,z-25), 0.5),
					
					specular: 0.5,		// material's specular constant
					diffuse:		0.5, 	// material's diffuse constant
					
					shininess: 1.0,		// material's shininess
					reflectivity: 0.5,
					
					texture: function(x,y,z){
						
						return new Vector3(179,255,255);
						
					}
				});
			}
		}
		
		
		
		this.camera = {
		
			pos: new Vector3(0,4,0),
			direction: v.unitVector3(new Vector3(1,0,1)),
			fov: 90,
			
			init: function(){
				
				this.right = v.crossProduct3(v.upVector,this.direction);
				this.up = v.crossProduct3(this.direction,this.right);
				
				this.projectionPlane = {
					
					type: new Plane(v.add3(this.pos, this.direction), this.direction),
					halfWidth: Math.tan( m.d2r(this.fov/2) ) * v.getMag3(this.direction),
					halfHeight: Math.tan( m.d2r(this.fov/2) ) * v.getMag3(this.direction),
					
					init: function(){
						
						this.width = this.halfWidth * 2;
						this.height = this.halfHeight * 2;
						
					}
					
				}
				
				this.projectionPlane.init();
				
			}
			
		}
		
		this.camera.init();
		
	}
	
}




























var s2 = {
	
	init: function(){
		
		this.ambient = new Vector3(0.05, 0.05, 0.05);
		
		this.lights = [
			
			{
				
				pos: new Vector3(-75,100,5),
				
				specular: 	new Vector3(0.8, 0.8, 0.8),
				diffuse:		new Vector3(0.8, 0.8, 0.8),
				
			},
			
		];
		
		this.objects = [
		
			{
				
				type: new Plane(new Vector3(0,0,0), v.upVector),
				
				specular: 0.5,		// material's specular constant
				diffuse:		0.5, 	// material's diffuse constant
				
				shininess: 1.0,		// material's shininess
				reflectivity: 0.3,
				
				texture: function(x,y,z){
					
					//return new Vector3(255,255,255);
					
					var size = 1;
					
					var xSign = Math.floor(x/size) % 2 ? 1 : -1;
					var zSign = Math.floor(z/size) % 2 ? 1 : -1;
					
					return xSign * zSign > 0 ? new Vector3(0,0,0) : new Vector3(255,255,255);
					
				}
				
			},
			
			{
				
				type: new Plane(new Vector3(0,105,0), v.downVector),
				
				specular: 0.5,		// material's specular constant
				diffuse:		0.5, 	// material's diffuse constant
				
				shininess: 1.0,		// material's shininess
				reflectivity: 0.0,
				
				texture: function(x,y,z){
					
					return new Vector3(255,255,255);
					
				}
				
			},
			
			
			
			{
				
				type: new Sphere(new Vector3(0,1,5), 1),
				
				specular: 0.5,		// material's specular constant
				diffuse:		0.5, 	// material's diffuse constant
				
				shininess: 2.0,		// material's shininess
				reflectivity: 0.4,
				
				texture: function(x,y,z){
					
					return new Vector3(255,215,0);
					
				}
				
			},
			
			
		
		];
		
		this.objects[-1] = {	// VOID OBJECT IS STORED IN NEGATIVE INDEX OF SCENE'S OBJECT ARRAY AND DOES NOT AFFECT THE ARRAY'S LENGTH
			
			type: null,
			
			specular: 0,
			diffuse: 	0,
			
			shininess: 0,
			reflectivity: 0,
			
			texture: function(x,y,z){

				return v.zeroVector;
				
			}
			
			
		}
		
		
		
		this.camera = {
		
			pos: new Vector3(0,2,0),
			direction: v.forwardVector,
			fov: 90,
			
			init: function(){
				
				this.right = v.crossProduct3(v.upVector,this.direction);
				this.up = v.crossProduct3(this.direction,this.right);
				
				this.projectionPlane = {
					
					type: new Plane(v.add3(this.pos, this.direction), this.direction),
					halfWidth: Math.tan( m.d2r(this.fov/2) ) * v.getMag3(this.direction),
					halfHeight: Math.tan( m.d2r(this.fov/2) ) * v.getMag3(this.direction),
					
					init: function(){
						
						this.width = this.halfWidth * 2;
						this.height = this.halfHeight * 2;
						
					}
					
				}
				
				this.projectionPlane.init();
				
			}
			
		}
		
		this.camera.init();
		
	}
	
}















var s3 = {
	
	init: function(){
		
		this.ambient = new Vector3(0.05, 0.05, 0.05);
		
		this.lights = [
			
			{
				
				pos: new Vector3(-75,100,5),
				
				specular: 	new Vector3(0.8, 0.8, 0.8),
				diffuse:		new Vector3(0.8, 0.8, 0.8),
				
			},
			
		];
		
		this.objects = [
		
			{
				
				type: new Plane(new Vector3(0,0,0), v.upVector),
				
				specular: 0.5,		// material's specular constant
				diffuse:		0.5, 	// material's diffuse constant
				
				shininess: 1.0,		// material's shininess
				reflectivity: 0.3,
				
				texture: function(x,y,z){
					
					var size = 1;
					
					var xSign = Math.floor(x/size) % 2 ? 1 : -1;
					var zSign = Math.floor(z/size) % 2 ? 1 : -1;
					
					return xSign * zSign > 0 ? new Vector3(0,0,0) : new Vector3(255,255,255);
					
				}
				
			},
			
			{
				
				type: new Sphere(new Vector3(0,1,5), 1),
				
				specular: 0.5,		// material's specular constant
				diffuse:		0.5, 	// material's diffuse constant
				
				shininess: 2.0,		// material's shininess
				reflectivity: 0.4,
				
				texture: function(x,y,z){
					
					return new Vector3(255,215,0);
					
				}
				
			},
			
			
		
		];
		
		this.objects[-1] = {	// VOID OBJECT IS STORED IN NEGATIVE INDEX OF SCENE'S OBJECT ARRAY AND DOES NOT AFFECT THE ARRAY'S LENGTH
			
			type: null,
			
			specular: 0,
			diffuse: 	0,
			
			shininess: 0,
			reflectivity: 0,
			
			texture: function(x,y,z){

				return v.zeroVector;
				
			}
			
			
		}
		
		for(var x=0; x<25; x++){
			for(var y=0; y<25; y++){
				
				this.objects.push(
				{
				
					type: new Sphere(new Vector3(x,y,x^y), 0.5),
					//type: new Sphere(new Vector3(x,y,x*Math.sin(y)), 0.5),
					
					specular: 0.5,		// material's specular constant
					diffuse:		0.5, 	// material's diffuse constant
					
					shininess: 2.0,		// material's shininess
					reflectivity: 0.4,
					
					texture: function(x,y,z){
						
						return new Vector3(255,215,0);
						
					}
				
				});
				
			}
		}
		
		this.camera = {
		
			pos: new Vector3(-10,15,-10),
			direction: v.unitVector3(new Vector3(1,0,1)),
			fov: 90,
			
			init: function(){
				
				this.right = v.crossProduct3(v.upVector,this.direction);
				this.up = v.crossProduct3(this.direction,this.right);
				
				this.projectionPlane = {
					
					type: new Plane(v.add3(this.pos, this.direction), this.direction),
					halfWidth: Math.tan( m.d2r(this.fov/2) ) * v.getMag3(this.direction),
					halfHeight: Math.tan( m.d2r(this.fov/2) ) * v.getMag3(this.direction),
					
					init: function(){
						
						this.width = this.halfWidth * 2;
						this.height = this.halfHeight * 2;
						
					}
					
				}
				
				this.projectionPlane.init();
				
			}
			
		}
		
		this.camera.init();
		
	}
	
}






























var s4 = {
	
	init: function(){
		
		this.ambient = new Vector3(0.05, 0.05, 0.05);
		
		this.lights = [
			
			{
				
				pos: new Vector3(-75,100,5),
				
				specular: 	new Vector3(0.8, 0.8, 0.8),
				diffuse:		new Vector3(0.8, 0.8, 0.8),
				
			},
			
		];
		
		this.objects = [
		
			{
				
				type: new Plane(new Vector3(0,0,0), v.upVector),
				
				specular: 0.5,		// material's specular constant
				diffuse:		0.5, 	// material's diffuse constant
				
				shininess: 1.0,		// material's shininess
				reflectivity: 0.0,
				
				texture: function(x,y,z){
					
					var size = 1;
					
					var xSign = Math.floor(x/size) % 2 ? 1 : -1;
					var zSign = Math.floor(z/size) % 2 ? 1 : -1;
					
					return xSign * zSign > 0 ? new Vector3(215,0,0) : new Vector3(255,255,255);
					
				}
				
			},
			
			
		
		];
		
		this.objects[-1] = {	// VOID OBJECT IS STORED IN NEGATIVE INDEX OF SCENE'S OBJECT ARRAY AND DOES NOT AFFECT THE ARRAY'S LENGTH
			
			type: null,
			
			specular: 0,
			diffuse: 	0,
			
			shininess: 0,
			reflectivity: 0,
			
			texture: function(x,y,z){

				return v.zeroVector;
				
			}
			
			
		}
		
		for(var x=0; x<25; x++){
			for(var z=0; z<25; z++){
				
				this.objects.push(
				{
				
					type: new Sphere(new Vector3(x,0.5,z), 0.5),
					
					specular: 0.5,		// material's specular constant
					diffuse:		0.5, 	// material's diffuse constant
					
					shininess: 2.0,		// material's shininess
					reflectivity: 0.5,
					
					texture: function(x,y,z){
						
						return new Vector3(255,215,0);
						
					}
				
				});
				
			}
		}
		
		this.camera = {
		
			pos: new Vector3(12.5,2,-5),
			direction: v.forwardVector,
			fov: 90,
			
			init: function(){
				
				this.right = v.crossProduct3(v.upVector,this.direction);
				this.up = v.crossProduct3(this.direction,this.right);
				
				this.projectionPlane = {
					
					type: new Plane(v.add3(this.pos, this.direction), this.direction),
					halfWidth: Math.tan( m.d2r(this.fov/2) ) * v.getMag3(this.direction),
					halfHeight: Math.tan( m.d2r(this.fov/2) ) * v.getMag3(this.direction),
					
					init: function(){
						
						this.width = this.halfWidth * 2;
						this.height = this.halfHeight * 2;
						
					}
					
				}
				
				this.projectionPlane.init();
				
			}
			
		}
		
		this.camera.init();
		
	}
	
}