// #! jsx 

import 'js/web.jsx';
import 'timer.jsx';

class Config {
    static const PARTICLE_NUM:number = 3000;
    static const PARTICLE_MAX_SPEED:number = 15;
    static const GRAVITY:number = 1.35;
}

class _Main {
    
	static function main(args:string[]):void {
        var window = dom.window;
        var document = window.document;
        
		var canvas = dom.id('c') as HTMLCanvasElement;
        // 初期値をいれておかないと resize 関数を実行した後でも
        // variable is not initialized エラーになる
        var canvasWidth = 0;
        var canvasHeight = 0;
		var context:CanvasRenderingContext2D = null;
        
        function resize(e:Event):void {
            canvasWidth = canvas.width = window.innerWidth;
            canvasHeight = canvas.height = window.innerHeight;
            context = canvas.getContext('2d') as CanvasRenderingContext2D;
            context.globalCompositeOperation = 'lighter';
            context.lineWidth = 0.3;
            context.lineCap = context.lineJoin = 'round';
        }
        
        window.addEventListener('resize', resize, false);
        resize(null);
        
        var centerX = canvasWidth / 2;
        var centerY = canvasHeight / 2;
        
        var mouse = new Point(centerX, centerY);
        var attraction = true;
        var currentGravity = Config.GRAVITY;
        var currentHue = Math.random() * 360;
        
        var particles = []:Array.<Particle>;
        var px:number, py:number, dist:number, angle:number;
        for (var i:int = 0; i < Config.PARTICLE_NUM; i++) {
            dist = Math.random() * 180 + 50;
            angle = Math.PI * 0.15 * Math.random();
            px = dist * Math.cos(angle) + centerX;
            py = dist * Math.sin(angle) + centerY;
            angle += Math.PI * 1.5 ;
            particles.push(new Particle(px, py, dist * Math.cos(angle), dist * Math.sin(angle)));
        }
        
        function disable(e:Event):void {
            attraction = false;
            currentGravity = 0;
        }
        
        function enable(e:Event):void {
            attraction = true;
        }
        
        document.addEventListener('mouseup',   enable,  false);
        document.addEventListener('mousedown', disable, false);
        document.addEventListener('mouseover', enable,  false);
        document.addEventListener('mouseout',  disable, false);
        
        document.addEventListener('mousemove', function(e:Event):void {
            var me = e as MouseEvent;
            mouse.set(me.clientX, me.clientY);
        }, false);
        
		Timer.setInterval(function():void {
		    var h = currentHue.toString();
		    
            context.save();
            context.globalCompositeOperation = 'source-over';
            context.fillStyle = 'hsla(' + h + ', 100%, 5%, 0.05)';
            context.fillRect(0, 0, canvasWidth, canvasHeight);
            context.restore();
            
            context.strokeStyle = 'hsla(' + h + ', 30%, 30%, 0.7)';
            context.beginPath();
			for (var i = 0, len = particles.length, p:Particle; i < len; i++) {
                p = particles[i];
                p.addVelocity(new Point(mouse).sub(p).normalize(currentGravity));
                p.update();
                p.limit(0, canvasWidth, 0, canvasHeight);
                context.moveTo(p.past.x, p.past.y);
                context.lineTo(p.x, p.y);
            }
            context.stroke();
            
            if (attraction) currentGravity += (Config.GRAVITY - currentGravity) * 0.03;
            currentHue = (currentHue + 0.2) % 360;
            
		}, 1000 / 60);
	}
}


/*
 * Particle
 */
class Particle extends Point {
    
    var v:Point = null;
    var past:Point = null;
    
    function constructor() {
        this.v = new Point(this as Point);
        this.past = new Point(this as Point);
    }
    
    function constructor(x:number, y:number) {
        super(x, y);
        this.v = new Point();
        this.past = new Point(this as Point);
    }
    
    function constructor(x:number, y:number, vx:number, vy:number) {
        super(x, y);
        this.v = new Point(vx, vy);
        this.past = new Point(this as Point);
    }
    
    function addVelocity(v:Point):void {
        this.v.add(v);
    }
    
    function addVelocity(vx:number, vy:number):void {
        this.v.offset(vx, vy);
    }
    
    function update():void {
        this.past.set(this as Point);
        
        var len = this.v.length();
        
        if (len > Config.PARTICLE_MAX_SPEED) {
            this.v.normalize(Config.PARTICLE_MAX_SPEED);
        }
        this.add(this.v);
    }
    
    function limit(left:number, right:number, top:number, bottom:number):void {
        if (this.x < left) {
            this.x = left;
            if (this.v.x < 0) this.v.x *= -0.9 ;
        } else  if (this.x > right) {
            this.x = right;
            if (this.v.x > 0) this.v.x *= -0.9 ;
        }
        if (this.y < top) {
            this.y = top;
            if (this.v.y < 0) this.v.y *= -0.9 ;
        } else if (this.y > bottom) {
            this.y = bottom;
            if (this.v.y > 0) this.v.y *= -0.9 ;
        }
    }
}


/*
 * Point
 */
class Point {
    
    var x:number = 0;
    var y:number = 0;
    
    static function polar(length:number, angle:number):Point {
        return new Point(length * Math.cos(angle), length * Math.sin(angle));
    }
    
    function constructor() {}
    
    function constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
    
    function constructor(p:Point) {
        this.x = p.x;
        this.y = p.y;
    }
    
    function set(x:number, y:number):Point {
        this.x = x;
        this.y = y;
        return this;
    }
    
    function set(p:Point):Point {
        this.x = p.x;
        this.y = p.y;
        return this;
    }
    
    function offset(offsetX:number, offsetY:number):Point {
        this.x += offsetX;
        this.y += offsetY;
        return this;
    }
    
    function add(p:Point):Point {
        this.x += p.x;
        this.y += p.y;
        return this;
    }
    
    function sub(p:Point):Point {
        this.x -= p.x;
        this.y -= p.y;
        return this;
    }
    
    function scale(scale:number):Point {
        this.x *= scale;
        this.y *= scale;
        return this;
    }
    
    function length():number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    
    function normalize():Point {
        var len = this.length();
        if (len) {
            this.x = this.x / len;
            this.y = this.y / len;
        }
        return this;
    }
    
    function normalize(thickness:number):Point {
        this.normalize();
        this.x *= thickness;
        this.y *= thickness;
        return this;
    }
    
    function angle():number {
        return Math.atan2(this.y, this.x);
    }
    
    function angleTo(p:Point):number {
        return Math.atan2(this.x - p.x, this.y - p.y);
    }
    
    function distanceTo(p:Point):number {
        var dx = this.x - p.x;
        var dy = this.y - p.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    function clone():Point {
        return new Point(this);
    }
}
