var mouse = {
	
	pos: new Vector2(0,0),
	down: false,
	left: false,
	right: false,
	
	onMove: function(e){
		
		mouse.pos.x = (e.clientX - canvas.getBoundingClientRect().left);
		mouse.pos.y = (canvas.getBoundingClientRect().bottom - e.clientY);
		
	},
	
	onClick: function(e, bool, scene){
		
		this.down = bool;
		
		switch(e.button){
			case 0:
				this.left = bool;
				break;
			case 2:
				this.right = bool;
				break;
		}
		
		if(this.left && this.right){
		
			var 	projectionPoint = getProjectionPoint(this.pos.x, this.pos.y, scene.camera),
					mouseRay = new Ray(scene.camera.pos, v.unitVector3(v.sub3(projectionPoint, scene.camera.pos))),
					collisionPackage = rayCast(mouseRay, scene);
					
			console.log(scene.objects[collisionPackage.objectIndex]);
		
		}
		
	},
	
	init: function(scene){
		
		document.addEventListener("mousemove", this.onMove, false);
		document.addEventListener("mousedown", function(e){mouse.onClick(e, true, scene)}, false);
		document.addEventListener("mouseup", 	function(e){mouse.onClick(e, false, scene)}, false);
		
	}
	
}