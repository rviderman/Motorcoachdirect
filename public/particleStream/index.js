var JSX = {};
(function () {

/**
 * copies the implementations from source interface to target
 */
function $__jsx_merge_interface(target, source) {
	for (var k in source.prototype)
		if (source.prototype.hasOwnProperty(k))
			target.prototype[k] = source.prototype[k];
}

/**
 * defers the initialization of the property
 */
function $__jsx_lazy_init(obj, prop, func) {
	function reset(obj, prop, value) {
		delete obj[prop];
		obj[prop] = value;
		return value;
	}

	Object.defineProperty(obj, prop, {
		get: function () {
			return reset(obj, prop, func());
		},
		set: function (v) {
			reset(obj, prop, v);
		},
		enumerable: true,
		configurable: true
	});
}

/**
 * sideeffect().a /= b
 */
function $__jsx_div_assign(obj, prop, divisor) {
	return obj[prop] = (obj[prop] / divisor) | 0;
}

/*
 * global functions called by JSX
 * (enamed so that they do not conflict with local variable names)
 */
var $__jsx_parseInt = parseInt;
var $__jsx_parseFloat = parseFloat;
var $__jsx_isNaN = isNaN;
var $__jsx_isFinite = isFinite;

var $__jsx_encodeURIComponent = encodeURIComponent;
var $__jsx_decodeURIComponent = decodeURIComponent;
var $__jsx_encodeURI = encodeURI;
var $__jsx_decodeURI = decodeURI;

var $__jsx_ObjectToString = Object.prototype.toString;
var $__jsx_ObjectHasOwnProperty = Object.prototype.hasOwnProperty;

/*
 * profiler object, initialized afterwards
 */
function $__jsx_profiler() {
}

/*
 * public interface to JSX code
 */
JSX.require = function (path) {
	var m = $__jsx_classMap[path];
	return m !== undefined ? m : null;
};

JSX.profilerIsRunning = function () {
	return $__jsx_profiler.getResults != null;
};

JSX.getProfileResults = function () {
	return ($__jsx_profiler.getResults || function () { return {}; })();
};

JSX.postProfileResults = function (url) {
	if ($__jsx_profiler.postResults == null)
		throw new Error("profiler has not been turned on");
	return $__jsx_profiler.postResults(url);
};
/**
 * class Config extends Object
 * @constructor
 */
function Config() {
}

Config.prototype = new Object;
/**
 * @constructor
 */
function Config$() {
};

Config$.prototype = new Config;

/**
 * class _Main extends Object
 * @constructor
 */
function _Main() {
}

_Main.prototype = new Object;
/**
 * @constructor
 */
function _Main$() {
};

_Main$.prototype = new _Main;

/**
 * @param {Array.<undefined|!string>} args
 */
_Main.main$AS = function (args) {
	/** @type {Window} */
	var window;
	/** @type {HTMLDocument} */
	var document;
	/** @type {HTMLCanvasElement} */
	var canvas;
	/** @type {!number} */
	var canvasWidth;
	/** @type {!number} */
	var canvasHeight;
	/** @type {CanvasRenderingContext2D} */
	var context;
	var resize;
	/** @type {!number} */
	var centerX;
	/** @type {!number} */
	var centerY;
	/** @type {Point} */
	var mouse;
	/** @type {!boolean} */
	var attraction;
	/** @type {!number} */
	var currentGravity;
	/** @type {!number} */
	var currentHue;
	/** @type {Array.<undefined|Particle>} */
	var particles;
	/** @type {!number} */
	var px;
	/** @type {!number} */
	var py;
	/** @type {!number} */
	var dist;
	/** @type {!number} */
	var angle;
	/** @type {!number} */
	var i;
	var disable;
	var enable;
	window = dom.window;
	document = window.document;
	canvas = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })(dom$id$S('c'));
	canvasWidth = 0;
	canvasHeight = 0;
	context = null;
	resize = (function (e) {
		canvasWidth = canvas.width = window.innerWidth;
		canvasHeight = canvas.height = window.innerHeight;
		context = (function (o) { return o instanceof CanvasRenderingContext2D ? o : null; })(canvas.getContext('2d'));
		context.globalCompositeOperation = 'lighter';
		context.lineWidth = 0.3;
		context.lineCap = context.lineJoin = 'round';
	});
	window.addEventListener('resize', resize, false);
	resize(null);
	centerX = canvasWidth / 2;
	centerY = canvasHeight / 2;
	mouse = new Point$NN(centerX, centerY);
	attraction = true;
	currentGravity = Config.GRAVITY;
	currentHue = Math.random() * 360;
	particles = [  ];
	for (i = 0; i < Config.PARTICLE_NUM; i++) {
		dist = Math.random() * 180 + 50;
		angle = Math.PI * 0.15 * Math.random();
		px = dist * Math.cos(angle) + centerX;
		py = dist * Math.sin(angle) + centerY;
		angle += Math.PI * 1.5;
		particles.push(new Particle$NNNN(px, py, dist * Math.cos(angle), dist * Math.sin(angle)));
	}
	disable = (function (e) {
		attraction = false;
		currentGravity = 0;
	});
	enable = (function (e) {
		attraction = true;
	});
	document.addEventListener('mouseup', enable, false);
	document.addEventListener('mousedown', disable, false);
	document.addEventListener('mouseover', enable, false);
	document.addEventListener('mouseout', disable, false);
	document.addEventListener('mousemove', (function (e) {
		/** @type {MouseEvent} */
		var me;
		me = (function (o) { return o instanceof MouseEvent ? o : null; })(e);
		mouse.set$NN(me.clientX, me.clientY);
	}), false);
	Timer$setInterval$F$V$I((function () {
		/** @type {!string} */
		var h;
		/** @type {!number} */
		var i;
		/** @type {!number} */
		var len;
		/** @type {Particle} */
		var p;
		h = currentHue.toString();
		context.save();
		context.globalCompositeOperation = 'source-over';
		context.fillStyle = 'hsla(' + h + ', 100%, 5%, 0.05)';
		context.fillRect(0, 0, canvasWidth, canvasHeight);
		context.restore();
		context.strokeStyle = 'hsla(' + h + ', 30%, 30%, 0.7)';
		context.beginPath();
		for ((i = 0, len = particles.length); i < len; i++) {
			p = particles[i];
			p.addVelocity$LPoint$(new Point$LPoint$(mouse).sub$LPoint$(p).normalize$N(currentGravity));
			p.update$();
			p.limit$NNNN(0, canvasWidth, 0, canvasHeight);
			context.moveTo(p.past.x, p.past.y);
			context.lineTo(p.x, p.y);
		}
		context.stroke();
		if (attraction) {
			currentGravity += (Config.GRAVITY - currentGravity) * 0.03;
		}
		currentHue = (currentHue + 0.2) % 360;
	}), 1000 / 60);
};

var _Main$main$AS = _Main.main$AS;

/**
 * class Point extends Object
 * @constructor
 */
function Point() {
}

Point.prototype = new Object;
/**
 * @constructor
 */
function Point$() {
	this.x = 0;
	this.y = 0;
};

Point$.prototype = new Point;

/**
 * @constructor
 * @param {!number} x
 * @param {!number} y
 */
function Point$NN(x, y) {
	this.x = x;
	this.y = y;
};

Point$NN.prototype = new Point;

/**
 * @constructor
 * @param {Point} p
 */
function Point$LPoint$(p) {
	this.x = p.x;
	this.y = p.y;
};

Point$LPoint$.prototype = new Point;

/**
 * @param {!number} length
 * @param {!number} angle
 * @return {Point}
 */
Point.polar$NN = function (length, angle) {
	return new Point$NN(length * Math.cos(angle), length * Math.sin(angle));
};

var Point$polar$NN = Point.polar$NN;

/**
 * @param {!number} x
 * @param {!number} y
 * @return {Point}
 */
Point.prototype.set$NN = function (x, y) {
	this.x = x;
	this.y = y;
	return this;
};

/**
 * @param {Point} p
 * @return {Point}
 */
Point.prototype.set$LPoint$ = function (p) {
	this.x = p.x;
	this.y = p.y;
	return this;
};

/**
 * @param {!number} offsetX
 * @param {!number} offsetY
 * @return {Point}
 */
Point.prototype.offset$NN = function (offsetX, offsetY) {
	this.x += offsetX;
	this.y += offsetY;
	return this;
};

/**
 * @param {Point} p
 * @return {Point}
 */
Point.prototype.add$LPoint$ = function (p) {
	this.x += p.x;
	this.y += p.y;
	return this;
};

/**
 * @param {Point} p
 * @return {Point}
 */
Point.prototype.sub$LPoint$ = function (p) {
	this.x -= p.x;
	this.y -= p.y;
	return this;
};

/**
 * @param {!number} scale
 * @return {Point}
 */
Point.prototype.scale$N = function (scale) {
	this.x *= scale;
	this.y *= scale;
	return this;
};

/**
 * @return {!number}
 */
Point.prototype.length$ = function () {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 * @return {Point}
 */
Point.prototype.normalize$ = function () {
	/** @type {!number} */
	var len;
	len = this.length$();
	if (len) {
		this.x = this.x / len;
		this.y = this.y / len;
	}
	return this;
};

/**
 * @param {!number} thickness
 * @return {Point}
 */
Point.prototype.normalize$N = function (thickness) {
	this.normalize$();
	this.x *= thickness;
	this.y *= thickness;
	return this;
};

/**
 * @return {!number}
 */
Point.prototype.angle$ = function () {
	return Math.atan2(this.y, this.x);
};

/**
 * @param {Point} p
 * @return {!number}
 */
Point.prototype.angleTo$LPoint$ = function (p) {
	return Math.atan2(this.x - p.x, this.y - p.y);
};

/**
 * @param {Point} p
 * @return {!number}
 */
Point.prototype.distanceTo$LPoint$ = function (p) {
	/** @type {!number} */
	var dx;
	/** @type {!number} */
	var dy;
	dx = this.x - p.x;
	dy = this.y - p.y;
	return Math.sqrt(dx * dx + dy * dy);
};

/**
 * @return {Point}
 */
Point.prototype.clone$ = function () {
	return new Point$LPoint$(this);
};

/**
 * class Particle extends Point
 * @constructor
 */
function Particle() {
}

Particle.prototype = new Point;
/**
 * @constructor
 */
function Particle$() {
	Point$.call(this);
	this.v = new Point$LPoint$(this);
	this.past = new Point$LPoint$(this);
};

Particle$.prototype = new Particle;

/**
 * @constructor
 * @param {!number} x
 * @param {!number} y
 */
function Particle$NN(x, y) {
	Point$NN.call(this, x, y);
	this.v = new Point$();
	this.past = new Point$LPoint$(this);
};

Particle$NN.prototype = new Particle;

/**
 * @constructor
 * @param {!number} x
 * @param {!number} y
 * @param {!number} vx
 * @param {!number} vy
 */
function Particle$NNNN(x, y, vx, vy) {
	Point$NN.call(this, x, y);
	this.v = new Point$NN(vx, vy);
	this.past = new Point$LPoint$(this);
};

Particle$NNNN.prototype = new Particle;

/**
 * @param {Point} v
 */
Particle.prototype.addVelocity$LPoint$ = function (v) {
	this.v.add$LPoint$(v);
};

/**
 * @param {!number} vx
 * @param {!number} vy
 */
Particle.prototype.addVelocity$NN = function (vx, vy) {
	this.v.offset$NN(vx, vy);
};

/**
 */
Particle.prototype.update$ = function () {
	/** @type {!number} */
	var len;
	this.past.set$LPoint$(this);
	len = this.v.length$();
	if (len > Config.PARTICLE_MAX_SPEED) {
		this.v.normalize$N(Config.PARTICLE_MAX_SPEED);
	}
	this.add$LPoint$(this.v);
};

/**
 * @param {!number} left
 * @param {!number} right
 * @param {!number} top
 * @param {!number} bottom
 */
Particle.prototype.limit$NNNN = function (left, right, top, bottom) {
	if (this.x < left) {
		this.x = left;
		if (this.v.x < 0) {
			this.v.x *= - 0.9;
		}
	} else {
		if (this.x > right) {
			this.x = right;
			if (this.v.x > 0) {
				this.v.x *= - 0.9;
			}
		}
	}
	if (this.y < top) {
		this.y = top;
		if (this.v.y < 0) {
			this.v.y *= - 0.9;
		}
	} else {
		if (this.y > bottom) {
			this.y = bottom;
			if (this.v.y > 0) {
				this.v.y *= - 0.9;
			}
		}
	}
};

/**
 * class dom extends Object
 * @constructor
 */
function dom() {
}

dom.prototype = new Object;
/**
 * @constructor
 */
function dom$() {
};

dom$.prototype = new dom;

/**
 * @param {!string} id
 * @return {HTMLElement}
 */
dom.id$S = function (id) {
	return (function (o) { return o instanceof HTMLElement ? o : null; })(dom.window.document.getElementById(id));
};

var dom$id$S = dom.id$S;

/**
 * @param {!string} id
 * @return {HTMLElement}
 */
dom.getElementById$S = function (id) {
	return (function (o) { return o instanceof HTMLElement ? o : null; })(dom.window.document.getElementById(id));
};

var dom$getElementById$S = dom.getElementById$S;

/**
 * @param {!string} tag
 * @return {HTMLElement}
 */
dom.createElement$S = function (tag) {
	return (function (v) {
		if (! (v == null || v instanceof HTMLElement)) {
			debugger;
			throw new Error("[/usr/local/JSX/lib/js/js/web.jsx:30] detected invalid cast, value is not an instance of the designated type or null");
		}
		return v;
	}(dom.window.document.createElement(tag)));
};

var dom$createElement$S = dom.createElement$S;

/**
 * class TimerHandle extends Object
 * @constructor
 */
function TimerHandle() {
}

TimerHandle.prototype = new Object;
/**
 * @constructor
 */
function TimerHandle$() {
};

TimerHandle$.prototype = new TimerHandle;

/**
 * class Timer extends Object
 * @constructor
 */
function Timer() {
}

Timer.prototype = new Object;
/**
 * @constructor
 */
function Timer$() {
};

Timer$.prototype = new Timer;

/**
 * @param {!number} milliseconds
 * @return {TimerHandle}
 */
Timer.setTimeout$F$V$I = function (listener, milliseconds) {
	var setTimeout;
	setTimeout = (function (o) { return typeof(o) === "function" ? o : null; })(js.global.setTimeout);
	return setTimeout(listener, milliseconds);
};

var Timer$setTimeout$F$V$I = Timer.setTimeout$F$V$I;

/**
 * @param {TimerHandle} timerID
 */
Timer.clearTimeout$LTimerHandle$ = function (timerID) {
	var clearTimeout;
	clearTimeout = (function (o) { return typeof(o) === "function" ? o : null; })(js.global.clearTimeout);
	clearTimeout(timerID);
};

var Timer$clearTimeout$LTimerHandle$ = Timer.clearTimeout$LTimerHandle$;

/**
 * @param {!number} milliseconds
 * @return {TimerHandle}
 */
Timer.setInterval$F$V$I = function (listener, milliseconds) {
	var setInterval;
	setInterval = (function (o) { return typeof(o) === "function" ? o : null; })(js.global.setInterval);
	return setInterval(listener, milliseconds);
};

var Timer$setInterval$F$V$I = Timer.setInterval$F$V$I;

/**
 * @param {TimerHandle} timerID
 */
Timer.clearInterval$LTimerHandle$ = function (timerID) {
	var clearInterval;
	clearInterval = (function (o) { return typeof(o) === "function" ? o : null; })(js.global.clearInterval);
	clearInterval(timerID);
};

var Timer$clearInterval$LTimerHandle$ = Timer.clearInterval$LTimerHandle$;

/**
 * class js extends Object
 * @constructor
 */
function js() {
}

js.prototype = new Object;
/**
 * @constructor
 */
function js$() {
};

js$.prototype = new js;

Config.PARTICLE_NUM = 3000;
Config.PARTICLE_MAX_SPEED = 15;
Config.GRAVITY = 1.35;
$__jsx_lazy_init(dom, "window", function () {
	return js.global.window;
});
js.global = (function () { return this; })();

var $__jsx_classMap = {
	"/tmp/wAalEjJ60X.jsx": {
		Config: Config,
		Config$: Config$,
		_Main: _Main,
		_Main$: _Main$,
		Point: Point,
		Point$: Point$,
		Point$NN: Point$NN,
		Point$LPoint$: Point$LPoint$,
		Particle: Particle,
		Particle$: Particle$,
		Particle$NN: Particle$NN,
		Particle$NNNN: Particle$NNNN
	},
	"system:lib/js/js/web.jsx": {
		dom: dom,
		dom$: dom$
	},
	"system:lib/js/timer.jsx": {
		TimerHandle: TimerHandle,
		TimerHandle$: TimerHandle$,
		Timer: Timer,
		Timer$: Timer$
	},
	"system:lib/js/js.jsx": {
		js: js,
		js$: js$
	}
};


/**
 * launches _Main.main(:string[]):void invoked by jsx --run|--executable
 */
JSX.runMain = function (sourceFile, args) {
	var module = JSX.require(sourceFile);

	if (! module._Main) {
		throw new Error("entry point _Main not found in " + sourceFile);
	}
	if (! module._Main.main$AS) {
		throw new Error("entry point _Main.main(:string[]):void not found in " + sourceFile);
	}
	module._Main.main$AS(args);
};

/**
 * launches _Test#test*():void invoked by jsx --test
 */
JSX.runTests = function (sourceFile, tests) {
	var module = JSX.require(sourceFile);
	var testClass = module._Test$;

	if (!testClass) return; // skip if there's no test class

	if(tests.length === 0) {
		var p = testClass.prototype;
		for (var m in p) {
			if (p[m] instanceof Function
				&& /^test.*[$]$/.test(m)) {
				tests.push(m);
			}
		}
	}

	var test = new testClass();

	if (test.beforeClass$AS != null)
		test.beforeClass$AS(tests);

	for (var i = 0; i < tests.length; ++i) {
		(function (m) {
			test.run$SF$V$(m, function() { test[m](); });
		}(tests[i]));
	}

	if (test.afterClass$ != null)
		test.afterClass$();
};
/**
 * call a function on load/DOMContentLoaded
 */
function $__jsx_onload (event) {
	window.removeEventListener("load", $__jsx_onload);
	document.removeEventListener("DOMContentLoaded", $__jsx_onload);
	JSX.runMain("/tmp/wAalEjJ60X.jsx", [])
}

window.addEventListener("load", $__jsx_onload);
document.addEventListener("DOMContentLoaded", $__jsx_onload);

})();
