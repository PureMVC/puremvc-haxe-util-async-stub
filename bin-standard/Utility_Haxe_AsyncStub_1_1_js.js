$estr = function() { return js.Boot.__string_rec(this,''); }
org = {}
org.puremvc = {}
org.puremvc.haxe = {}
org.puremvc.haxe.interfaces = {}
org.puremvc.haxe.interfaces.IView = function() { }
org.puremvc.haxe.interfaces.IView.__name__ = ["org","puremvc","haxe","interfaces","IView"];
org.puremvc.haxe.interfaces.IView.prototype.hasMediator = null;
org.puremvc.haxe.interfaces.IView.prototype.notifyObservers = null;
org.puremvc.haxe.interfaces.IView.prototype.registerMediator = null;
org.puremvc.haxe.interfaces.IView.prototype.registerObserver = null;
org.puremvc.haxe.interfaces.IView.prototype.removeMediator = null;
org.puremvc.haxe.interfaces.IView.prototype.removeObserver = null;
org.puremvc.haxe.interfaces.IView.prototype.retrieveMediator = null;
org.puremvc.haxe.interfaces.IView.prototype.__class__ = org.puremvc.haxe.interfaces.IView;
org.puremvc.haxe.interfaces.INotification = function() { }
org.puremvc.haxe.interfaces.INotification.__name__ = ["org","puremvc","haxe","interfaces","INotification"];
org.puremvc.haxe.interfaces.INotification.prototype.getBody = null;
org.puremvc.haxe.interfaces.INotification.prototype.getName = null;
org.puremvc.haxe.interfaces.INotification.prototype.getType = null;
org.puremvc.haxe.interfaces.INotification.prototype.setBody = null;
org.puremvc.haxe.interfaces.INotification.prototype.setType = null;
org.puremvc.haxe.interfaces.INotification.prototype.toString = null;
org.puremvc.haxe.interfaces.INotification.prototype.__class__ = org.puremvc.haxe.interfaces.INotification;
org.puremvc.haxe.core = {}
org.puremvc.haxe.core.View = function(p) { if( p === $_ ) return; {
	org.puremvc.haxe.core.View.instance = this;
	this.mediatorMap = new Hash();
	this.observerMap = new Hash();
	this.initializeView();
}}
org.puremvc.haxe.core.View.__name__ = ["org","puremvc","haxe","core","View"];
org.puremvc.haxe.core.View.getInstance = function() {
	if(org.puremvc.haxe.core.View.instance == null) org.puremvc.haxe.core.View.instance = new org.puremvc.haxe.core.View();
	return org.puremvc.haxe.core.View.instance;
}
org.puremvc.haxe.core.View.instance = null;
org.puremvc.haxe.core.View.prototype.hasMediator = function(mediatorName) {
	return this.mediatorMap.exists(mediatorName);
}
org.puremvc.haxe.core.View.prototype.initializeView = function() {
	null;
}
org.puremvc.haxe.core.View.prototype.mediatorMap = null;
org.puremvc.haxe.core.View.prototype.notifyObservers = function(notification) {
	if(this.observerMap.exists(notification.getName())) {
		var observers_ref = this.observerMap.get(notification.getName());
		var observers = new List();
		var iterator_ref = observers_ref.iterator();
		{ var $it0 = iterator_ref;
		while( $it0.hasNext() ) { var observer = $it0.next();
		observers.add(observer);
		}}
		var iterator = observers.iterator();
		{ var $it1 = iterator;
		while( $it1.hasNext() ) { var observer = $it1.next();
		observer.notifyObserver(notification);
		}}
	}
}
org.puremvc.haxe.core.View.prototype.observerMap = null;
org.puremvc.haxe.core.View.prototype.registerMediator = function(mediator) {
	if(this.mediatorMap.exists(mediator.getMediatorName())) return;
	this.mediatorMap.set(mediator.getMediatorName(),mediator);
	var interests = mediator.listNotificationInterests();
	if(interests.length > 0) {
		var observer = new org.puremvc.haxe.patterns.observer.Observer($closure(mediator,"handleNotification"),mediator);
		{
			var _g1 = 0, _g = interests.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.registerObserver(interests[i],observer);
			}
		}
	}
	mediator.onRegister();
}
org.puremvc.haxe.core.View.prototype.registerObserver = function(notificationName,observer) {
	if(!this.observerMap.exists(notificationName)) this.observerMap.set(notificationName,new List());
	this.observerMap.get(notificationName).add(observer);
}
org.puremvc.haxe.core.View.prototype.removeMediator = function(mediatorName) {
	var mediator = this.mediatorMap.get(mediatorName);
	if(mediator != null) {
		var interests = mediator.listNotificationInterests();
		{
			var _g1 = 0, _g = interests.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.removeObserver(interests[i],mediator);
			}
		}
		this.mediatorMap.remove(mediatorName);
		mediator.onRemove();
	}
	return mediator;
}
org.puremvc.haxe.core.View.prototype.removeObserver = function(notificationName,notifyContext) {
	var observers = this.observerMap.get(notificationName);
	{ var $it2 = observers.iterator();
	while( $it2.hasNext() ) { var observer = $it2.next();
	{
		if(observer.compareNotifyContext(notifyContext) == true) {
			observers.remove(observer);
			break;
		}
	}
	}}
	if(observers.isEmpty()) {
		this.observerMap.remove(notificationName);
	}
}
org.puremvc.haxe.core.View.prototype.retrieveMediator = function(mediatorName) {
	return this.mediatorMap.get(mediatorName);
}
org.puremvc.haxe.core.View.prototype.__class__ = org.puremvc.haxe.core.View;
org.puremvc.haxe.core.View.__interfaces__ = [org.puremvc.haxe.interfaces.IView];
org.puremvc.haxe.interfaces.INotifier = function() { }
org.puremvc.haxe.interfaces.INotifier.__name__ = ["org","puremvc","haxe","interfaces","INotifier"];
org.puremvc.haxe.interfaces.INotifier.prototype.sendNotification = null;
org.puremvc.haxe.interfaces.INotifier.prototype.__class__ = org.puremvc.haxe.interfaces.INotifier;
org.puremvc.haxe.patterns = {}
org.puremvc.haxe.patterns.observer = {}
org.puremvc.haxe.patterns.observer.Notifier = function(p) { if( p === $_ ) return; {
	this.facade = org.puremvc.haxe.patterns.facade.Facade.getInstance();
}}
org.puremvc.haxe.patterns.observer.Notifier.__name__ = ["org","puremvc","haxe","patterns","observer","Notifier"];
org.puremvc.haxe.patterns.observer.Notifier.prototype.facade = null;
org.puremvc.haxe.patterns.observer.Notifier.prototype.sendNotification = function(notificationName,body,type) {
	this.facade.sendNotification(notificationName,body,type);
}
org.puremvc.haxe.patterns.observer.Notifier.prototype.__class__ = org.puremvc.haxe.patterns.observer.Notifier;
org.puremvc.haxe.patterns.observer.Notifier.__interfaces__ = [org.puremvc.haxe.interfaces.INotifier];
org.puremvc.haxe.interfaces.IProxy = function() { }
org.puremvc.haxe.interfaces.IProxy.__name__ = ["org","puremvc","haxe","interfaces","IProxy"];
org.puremvc.haxe.interfaces.IProxy.prototype.getData = null;
org.puremvc.haxe.interfaces.IProxy.prototype.getProxyName = null;
org.puremvc.haxe.interfaces.IProxy.prototype.onRegister = null;
org.puremvc.haxe.interfaces.IProxy.prototype.onRemove = null;
org.puremvc.haxe.interfaces.IProxy.prototype.setData = null;
org.puremvc.haxe.interfaces.IProxy.prototype.__class__ = org.puremvc.haxe.interfaces.IProxy;
org.puremvc.haxe.patterns.proxy = {}
org.puremvc.haxe.patterns.proxy.Proxy = function(proxyName,data) { if( proxyName === $_ ) return; {
	org.puremvc.haxe.patterns.observer.Notifier.apply(this,[]);
	this.proxyName = (proxyName != null?proxyName:org.puremvc.haxe.patterns.proxy.Proxy.NAME);
	if(data != null) this.setData(data);
}}
org.puremvc.haxe.patterns.proxy.Proxy.__name__ = ["org","puremvc","haxe","patterns","proxy","Proxy"];
org.puremvc.haxe.patterns.proxy.Proxy.__super__ = org.puremvc.haxe.patterns.observer.Notifier;
for(var k in org.puremvc.haxe.patterns.observer.Notifier.prototype ) org.puremvc.haxe.patterns.proxy.Proxy.prototype[k] = org.puremvc.haxe.patterns.observer.Notifier.prototype[k];
org.puremvc.haxe.patterns.proxy.Proxy.prototype.data = null;
org.puremvc.haxe.patterns.proxy.Proxy.prototype.getData = function() {
	return this.data;
}
org.puremvc.haxe.patterns.proxy.Proxy.prototype.getProxyName = function() {
	return this.proxyName;
}
org.puremvc.haxe.patterns.proxy.Proxy.prototype.onRegister = function() {
	null;
}
org.puremvc.haxe.patterns.proxy.Proxy.prototype.onRemove = function() {
	null;
}
org.puremvc.haxe.patterns.proxy.Proxy.prototype.proxyName = null;
org.puremvc.haxe.patterns.proxy.Proxy.prototype.setData = function(data) {
	this.data = data;
}
org.puremvc.haxe.patterns.proxy.Proxy.prototype.__class__ = org.puremvc.haxe.patterns.proxy.Proxy;
org.puremvc.haxe.patterns.proxy.Proxy.__interfaces__ = [org.puremvc.haxe.interfaces.IProxy];
org.puremvc.haxe.utilities = {}
org.puremvc.haxe.utilities.asyncstub = {}
org.puremvc.haxe.utilities.asyncstub.model = {}
org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy = function(name) { if( name === $_ ) return; {
	org.puremvc.haxe.patterns.proxy.Proxy.apply(this,[name]);
	this.maxDelayMSecs = 15000;
	this.probabilityOfFault = 0.;
	this.asyncInProgress = false;
}}
org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy.__name__ = ["org","puremvc","haxe","utilities","asyncstub","model","AsyncStubProxy"];
org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy.__super__ = org.puremvc.haxe.patterns.proxy.Proxy;
for(var k in org.puremvc.haxe.patterns.proxy.Proxy.prototype ) org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy.prototype[k] = org.puremvc.haxe.patterns.proxy.Proxy.prototype[k];
org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy.prototype.asyncAction = function(resultFunction,faultFunction) {
	if(this.asyncInProgress) throw "AsyncStubProxy: Cannot have more than one async activity running per stub";
	this.asyncInProgress = true;
	this.clientResultFunction = resultFunction;
	this.clientFaultFunction = faultFunction;
	var onCompletion = this.calcCompletionFunction();
	var msecsDelay = Std["int"](Math.random() * this.maxDelayMSecs);
	this.timer = new org.puremvc.haxe.utilities.asyncstub.model.Timer(onCompletion,msecsDelay,1);
	this.timer.start();
}
org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy.prototype.asyncInProgress = null;
org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy.prototype.calcCompletionFunction = function() {
	if(this.clientFaultFunction == null) return $closure(this,"onResult");
	else if(this.probabilityOfFault <= .01) return $closure(this,"onResult");
	else if(this.probabilityOfFault >= .99) return $closure(this,"onFault");
	else if(Math.random() <= this.probabilityOfFault) return $closure(this,"onFault");
	else return $closure(this,"onResult");
}
org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy.prototype.clientFaultFunction = null;
org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy.prototype.clientResultFunction = null;
org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy.prototype.maxDelayMSecs = null;
org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy.prototype.onFault = function() {
	this.timer.stop();
	this.asyncInProgress = false;
	this.clientFaultFunction(this.token);
}
org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy.prototype.onResult = function() {
	this.timer.stop();
	this.asyncInProgress = false;
	this.clientResultFunction(this.token);
}
org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy.prototype.probabilityOfFault = null;
org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy.prototype.timer = null;
org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy.prototype.token = null;
org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy.prototype.__class__ = org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy;
org.puremvc.haxe.utilities.asyncstub.model.AsyncStubProxy.__interfaces__ = [org.puremvc.haxe.interfaces.IProxy];
org.puremvc.haxe.utilities.asyncstub.model.Timer = function(callBack,milliInterval,maxTicks) { if( callBack === $_ ) return; {
	if(maxTicks == null) maxTicks = -1;
	if(milliInterval == null) milliInterval = 1000;
	this.callBack = callBack;
	this.milliInterval = milliInterval;
	this.maxTicks = maxTicks;
	this.ticks = 0;
	this.stopped = true;
}}
org.puremvc.haxe.utilities.asyncstub.model.Timer.__name__ = ["org","puremvc","haxe","utilities","asyncstub","model","Timer"];
org.puremvc.haxe.utilities.asyncstub.model.Timer.prototype.callBack = null;
org.puremvc.haxe.utilities.asyncstub.model.Timer.prototype.maxTicks = null;
org.puremvc.haxe.utilities.asyncstub.model.Timer.prototype.milliInterval = null;
org.puremvc.haxe.utilities.asyncstub.model.Timer.prototype.reset = function() {
	this.ticks = 0;
}
org.puremvc.haxe.utilities.asyncstub.model.Timer.prototype.start = function() {
	this.stopped = false;
	haxe.Timer.delay($closure(this,"tick"),this.milliInterval);
}
org.puremvc.haxe.utilities.asyncstub.model.Timer.prototype.stop = function() {
	this.stopped = true;
}
org.puremvc.haxe.utilities.asyncstub.model.Timer.prototype.stopped = null;
org.puremvc.haxe.utilities.asyncstub.model.Timer.prototype.tick = function() {
	if(this.stopped || this.ticks == this.maxTicks) return;
	this.callBack();
	this.ticks++;
	haxe.Timer.delay($closure(this,"tick"),this.milliInterval);
}
org.puremvc.haxe.utilities.asyncstub.model.Timer.prototype.ticks = null;
org.puremvc.haxe.utilities.asyncstub.model.Timer.prototype.__class__ = org.puremvc.haxe.utilities.asyncstub.model.Timer;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	{ var $it3 = arr.iterator();
	while( $it3.hasNext() ) { var t = $it3.next();
	if(t == field) return true;
	}}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	}
	catch( $e4 ) {
		{
			var e = $e4;
			null;
		}
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	if(o == null) return new Array();
	var a = new Array();
	if(o.hasOwnProperty) {
		
					for(var i in o)
						if( o.hasOwnProperty(i) )
							a.push(i);
				;
	}
	else {
		var t;
		try {
			t = o.__proto__;
		}
		catch( $e5 ) {
			{
				var e = $e5;
				{
					t = null;
				}
			}
		}
		if(t != null) o.__proto__ = null;
		
					for(var i in o)
						if( i != "__proto__" )
							a.push(i);
				;
		if(t != null) o.__proto__ = t;
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compare = function(a,b) {
	return ((a == b)?0:((((a) > (b))?1:-1)));
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return (t == "string" || (t == "object" && !v.__enum__) || (t == "function" && v.__name__ != null));
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { }
	{
		var _g = 0, _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			o2[f] = Reflect.field(o,f);
		}
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = new Array();
		{
			var _g1 = 0, _g = arguments.length;
			while(_g1 < _g) {
				var i = _g1++;
				a.push(arguments[i]);
			}
		}
		return f(a);
	}
}
Reflect.prototype.__class__ = Reflect;
org.puremvc.haxe.interfaces.IObserver = function() { }
org.puremvc.haxe.interfaces.IObserver.__name__ = ["org","puremvc","haxe","interfaces","IObserver"];
org.puremvc.haxe.interfaces.IObserver.prototype.compareNotifyContext = null;
org.puremvc.haxe.interfaces.IObserver.prototype.notifyObserver = null;
org.puremvc.haxe.interfaces.IObserver.prototype.setNotifyContext = null;
org.puremvc.haxe.interfaces.IObserver.prototype.setNotifyMethod = null;
org.puremvc.haxe.interfaces.IObserver.prototype.__class__ = org.puremvc.haxe.interfaces.IObserver;
org.puremvc.haxe.patterns.observer.Observer = function(notifyMethod,notifyContext) { if( notifyMethod === $_ ) return; {
	this.setNotifyMethod(notifyMethod);
	this.setNotifyContext(notifyContext);
}}
org.puremvc.haxe.patterns.observer.Observer.__name__ = ["org","puremvc","haxe","patterns","observer","Observer"];
org.puremvc.haxe.patterns.observer.Observer.prototype.compareNotifyContext = function(object) {
	return object == this.context;
}
org.puremvc.haxe.patterns.observer.Observer.prototype.context = null;
org.puremvc.haxe.patterns.observer.Observer.prototype.getNotifyContext = function() {
	return this.context;
}
org.puremvc.haxe.patterns.observer.Observer.prototype.getNotifyMethod = function() {
	return $closure(this,"notify");
}
org.puremvc.haxe.patterns.observer.Observer.prototype.notify = null;
org.puremvc.haxe.patterns.observer.Observer.prototype.notifyObserver = function(notification) {
	(this.getNotifyMethod())(notification);
}
org.puremvc.haxe.patterns.observer.Observer.prototype.setNotifyContext = function(notifyContext) {
	this.context = notifyContext;
}
org.puremvc.haxe.patterns.observer.Observer.prototype.setNotifyMethod = function(notifyMethod) {
	this.notify = notifyMethod;
}
org.puremvc.haxe.patterns.observer.Observer.prototype.__class__ = org.puremvc.haxe.patterns.observer.Observer;
org.puremvc.haxe.patterns.observer.Observer.__interfaces__ = [org.puremvc.haxe.interfaces.IObserver];
org.puremvc.haxe.interfaces.IFacade = function() { }
org.puremvc.haxe.interfaces.IFacade.__name__ = ["org","puremvc","haxe","interfaces","IFacade"];
org.puremvc.haxe.interfaces.IFacade.prototype.hasCommand = null;
org.puremvc.haxe.interfaces.IFacade.prototype.hasMediator = null;
org.puremvc.haxe.interfaces.IFacade.prototype.hasProxy = null;
org.puremvc.haxe.interfaces.IFacade.prototype.notifyObservers = null;
org.puremvc.haxe.interfaces.IFacade.prototype.registerCommand = null;
org.puremvc.haxe.interfaces.IFacade.prototype.registerMediator = null;
org.puremvc.haxe.interfaces.IFacade.prototype.registerProxy = null;
org.puremvc.haxe.interfaces.IFacade.prototype.removeCommand = null;
org.puremvc.haxe.interfaces.IFacade.prototype.removeMediator = null;
org.puremvc.haxe.interfaces.IFacade.prototype.removeProxy = null;
org.puremvc.haxe.interfaces.IFacade.prototype.retrieveMediator = null;
org.puremvc.haxe.interfaces.IFacade.prototype.retrieveProxy = null;
org.puremvc.haxe.interfaces.IFacade.prototype.sendNotification = null;
org.puremvc.haxe.interfaces.IFacade.prototype.__class__ = org.puremvc.haxe.interfaces.IFacade;
org.puremvc.haxe.patterns.facade = {}
org.puremvc.haxe.patterns.facade.Facade = function(p) { if( p === $_ ) return; {
	org.puremvc.haxe.patterns.facade.Facade.instance = this;
	this.initializeFacade();
}}
org.puremvc.haxe.patterns.facade.Facade.__name__ = ["org","puremvc","haxe","patterns","facade","Facade"];
org.puremvc.haxe.patterns.facade.Facade.getInstance = function() {
	if(org.puremvc.haxe.patterns.facade.Facade.instance == null) org.puremvc.haxe.patterns.facade.Facade.instance = new org.puremvc.haxe.patterns.facade.Facade();
	return org.puremvc.haxe.patterns.facade.Facade.instance;
}
org.puremvc.haxe.patterns.facade.Facade.instance = null;
org.puremvc.haxe.patterns.facade.Facade.prototype.controller = null;
org.puremvc.haxe.patterns.facade.Facade.prototype.hasCommand = function(notificationName) {
	return this.controller.hasCommand(notificationName);
}
org.puremvc.haxe.patterns.facade.Facade.prototype.hasMediator = function(mediatorName) {
	return this.view.hasMediator(mediatorName);
}
org.puremvc.haxe.patterns.facade.Facade.prototype.hasProxy = function(proxyName) {
	return this.model.hasProxy(proxyName);
}
org.puremvc.haxe.patterns.facade.Facade.prototype.initializeController = function() {
	if(this.controller != null) return;
	this.controller = org.puremvc.haxe.core.Controller.getInstance();
}
org.puremvc.haxe.patterns.facade.Facade.prototype.initializeFacade = function() {
	this.initializeModel();
	this.initializeController();
	this.initializeView();
}
org.puremvc.haxe.patterns.facade.Facade.prototype.initializeModel = function() {
	if(this.model != null) return;
	this.model = org.puremvc.haxe.core.Model.getInstance();
}
org.puremvc.haxe.patterns.facade.Facade.prototype.initializeView = function() {
	if(this.view != null) return;
	this.view = org.puremvc.haxe.core.View.getInstance();
}
org.puremvc.haxe.patterns.facade.Facade.prototype.model = null;
org.puremvc.haxe.patterns.facade.Facade.prototype.notifyObservers = function(notification) {
	if(this.view != null) this.view.notifyObservers(notification);
}
org.puremvc.haxe.patterns.facade.Facade.prototype.registerCommand = function(notificationName,commandClassRef) {
	this.controller.registerCommand(notificationName,commandClassRef);
}
org.puremvc.haxe.patterns.facade.Facade.prototype.registerMediator = function(mediator) {
	if(this.view != null) this.view.registerMediator(mediator);
}
org.puremvc.haxe.patterns.facade.Facade.prototype.registerProxy = function(proxy) {
	this.model.registerProxy(proxy);
}
org.puremvc.haxe.patterns.facade.Facade.prototype.removeCommand = function(notificationName) {
	this.controller.removeCommand(notificationName);
}
org.puremvc.haxe.patterns.facade.Facade.prototype.removeMediator = function(mediatorName) {
	var mediator = null;
	if(this.view != null) mediator = this.view.removeMediator(mediatorName);
	return mediator;
}
org.puremvc.haxe.patterns.facade.Facade.prototype.removeProxy = function(proxyName) {
	var proxy = null;
	if(this.model != null) proxy = this.model.removeProxy(proxyName);
	return proxy;
}
org.puremvc.haxe.patterns.facade.Facade.prototype.retrieveMediator = function(mediatorName) {
	return this.view.retrieveMediator(mediatorName);
}
org.puremvc.haxe.patterns.facade.Facade.prototype.retrieveProxy = function(proxyName) {
	return this.model.retrieveProxy(proxyName);
}
org.puremvc.haxe.patterns.facade.Facade.prototype.sendNotification = function(notificationName,body,type) {
	this.notifyObservers(new org.puremvc.haxe.patterns.observer.Notification(notificationName,body,type));
}
org.puremvc.haxe.patterns.facade.Facade.prototype.view = null;
org.puremvc.haxe.patterns.facade.Facade.prototype.__class__ = org.puremvc.haxe.patterns.facade.Facade;
org.puremvc.haxe.patterns.facade.Facade.__interfaces__ = [org.puremvc.haxe.interfaces.IFacade];
StringBuf = function(p) { if( p === $_ ) return; {
	this.b = "";
}}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b += x;
}
StringBuf.prototype.addChar = function(c) {
	this.b += String.fromCharCode(c);
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b += s.substr(pos,len);
}
StringBuf.prototype.b = null;
StringBuf.prototype.toString = function() {
	return this.b;
}
StringBuf.prototype.__class__ = StringBuf;
org.puremvc.haxe.interfaces.IController = function() { }
org.puremvc.haxe.interfaces.IController.__name__ = ["org","puremvc","haxe","interfaces","IController"];
org.puremvc.haxe.interfaces.IController.prototype.executeCommand = null;
org.puremvc.haxe.interfaces.IController.prototype.hasCommand = null;
org.puremvc.haxe.interfaces.IController.prototype.registerCommand = null;
org.puremvc.haxe.interfaces.IController.prototype.removeCommand = null;
org.puremvc.haxe.interfaces.IController.prototype.__class__ = org.puremvc.haxe.interfaces.IController;
org.puremvc.haxe.core.Controller = function(p) { if( p === $_ ) return; {
	org.puremvc.haxe.core.Controller.instance = this;
	this.commandMap = new Hash();
	this.initializeController();
}}
org.puremvc.haxe.core.Controller.__name__ = ["org","puremvc","haxe","core","Controller"];
org.puremvc.haxe.core.Controller.getInstance = function() {
	if(org.puremvc.haxe.core.Controller.instance == null) org.puremvc.haxe.core.Controller.instance = new org.puremvc.haxe.core.Controller();
	return org.puremvc.haxe.core.Controller.instance;
}
org.puremvc.haxe.core.Controller.instance = null;
org.puremvc.haxe.core.Controller.prototype.commandMap = null;
org.puremvc.haxe.core.Controller.prototype.executeCommand = function(note) {
	var commandClassRef = this.commandMap.get(note.getName());
	if(commandClassRef == null) return;
	var commandInstance = Type.createInstance(commandClassRef,[]);
	commandInstance.execute(note);
}
org.puremvc.haxe.core.Controller.prototype.hasCommand = function(notificationName) {
	return this.commandMap.exists(notificationName);
}
org.puremvc.haxe.core.Controller.prototype.initializeController = function() {
	this.view = org.puremvc.haxe.core.View.getInstance();
}
org.puremvc.haxe.core.Controller.prototype.registerCommand = function(notificationName,commandClassRef) {
	if(!this.commandMap.exists(notificationName)) this.view.registerObserver(notificationName,new org.puremvc.haxe.patterns.observer.Observer($closure(this,"executeCommand"),this));
	this.commandMap.set(notificationName,commandClassRef);
}
org.puremvc.haxe.core.Controller.prototype.removeCommand = function(notificationName) {
	if(this.hasCommand(notificationName)) {
		this.view.removeObserver(notificationName,this);
		this.commandMap.remove(notificationName);
	}
}
org.puremvc.haxe.core.Controller.prototype.view = null;
org.puremvc.haxe.core.Controller.prototype.__class__ = org.puremvc.haxe.core.Controller;
org.puremvc.haxe.core.Controller.__interfaces__ = [org.puremvc.haxe.interfaces.IController];
org.puremvc.haxe.interfaces.IModel = function() { }
org.puremvc.haxe.interfaces.IModel.__name__ = ["org","puremvc","haxe","interfaces","IModel"];
org.puremvc.haxe.interfaces.IModel.prototype.hasProxy = null;
org.puremvc.haxe.interfaces.IModel.prototype.registerProxy = null;
org.puremvc.haxe.interfaces.IModel.prototype.removeProxy = null;
org.puremvc.haxe.interfaces.IModel.prototype.retrieveProxy = null;
org.puremvc.haxe.interfaces.IModel.prototype.__class__ = org.puremvc.haxe.interfaces.IModel;
org.puremvc.haxe.interfaces.IMediator = function() { }
org.puremvc.haxe.interfaces.IMediator.__name__ = ["org","puremvc","haxe","interfaces","IMediator"];
org.puremvc.haxe.interfaces.IMediator.prototype.getMediatorName = null;
org.puremvc.haxe.interfaces.IMediator.prototype.getViewComponent = null;
org.puremvc.haxe.interfaces.IMediator.prototype.handleNotification = null;
org.puremvc.haxe.interfaces.IMediator.prototype.listNotificationInterests = null;
org.puremvc.haxe.interfaces.IMediator.prototype.onRegister = null;
org.puremvc.haxe.interfaces.IMediator.prototype.onRemove = null;
org.puremvc.haxe.interfaces.IMediator.prototype.setViewComponent = null;
org.puremvc.haxe.interfaces.IMediator.prototype.__class__ = org.puremvc.haxe.interfaces.IMediator;
IntIter = function(min,max) { if( min === $_ ) return; {
	this.min = min;
	this.max = max;
}}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.max = null;
IntIter.prototype.min = null;
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
haxe = {}
haxe.Timer = function(time_ms) { if( time_ms === $_ ) return; {
	this.id = haxe.Timer.arr.length;
	haxe.Timer.arr[this.id] = this;
	this.timerId = window.setInterval("haxe.Timer.arr[" + this.id + "].run();",time_ms);
}}
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	}
}
haxe.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
haxe.Timer.prototype.id = null;
haxe.Timer.prototype.run = function() {
	null;
}
haxe.Timer.prototype.stop = function() {
	if(this.id == null) return;
	window.clearInterval(this.timerId);
	haxe.Timer.arr[this.id] = null;
	if(this.id > 100 && this.id == haxe.Timer.arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && haxe.Timer.arr[p] == null) p--;
		haxe.Timer.arr = haxe.Timer.arr.slice(0,p + 1);
	}
	this.id = null;
}
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.__class__ = haxe.Timer;
org.puremvc.haxe.core.Model = function(p) { if( p === $_ ) return; {
	org.puremvc.haxe.core.Model.instance = this;
	this.proxyMap = new Hash();
	this.initializeModel();
}}
org.puremvc.haxe.core.Model.__name__ = ["org","puremvc","haxe","core","Model"];
org.puremvc.haxe.core.Model.getInstance = function() {
	if(org.puremvc.haxe.core.Model.instance == null) org.puremvc.haxe.core.Model.instance = new org.puremvc.haxe.core.Model();
	return org.puremvc.haxe.core.Model.instance;
}
org.puremvc.haxe.core.Model.instance = null;
org.puremvc.haxe.core.Model.prototype.hasProxy = function(proxyName) {
	return this.proxyMap.exists(proxyName);
}
org.puremvc.haxe.core.Model.prototype.initializeModel = function() {
	null;
}
org.puremvc.haxe.core.Model.prototype.proxyMap = null;
org.puremvc.haxe.core.Model.prototype.registerProxy = function(proxy) {
	this.proxyMap.set(proxy.getProxyName(),proxy);
	proxy.onRegister();
}
org.puremvc.haxe.core.Model.prototype.removeProxy = function(proxyName) {
	var proxy = this.proxyMap.get(proxyName);
	if(proxy != null) {
		this.proxyMap.remove(proxyName);
		proxy.onRemove();
	}
	return proxy;
}
org.puremvc.haxe.core.Model.prototype.retrieveProxy = function(proxyName) {
	return this.proxyMap.get(proxyName);
}
org.puremvc.haxe.core.Model.prototype.__class__ = org.puremvc.haxe.core.Model;
org.puremvc.haxe.core.Model.__interfaces__ = [org.puremvc.haxe.interfaces.IModel];
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x);
	if(Math.isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
List = function(p) { if( p === $_ ) return; {
	this.length = 0;
}}
List.__name__ = ["List"];
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x;
	else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
List.prototype.first = function() {
	return (this.h == null?null:this.h[0]);
}
List.prototype.h = null;
List.prototype.isEmpty = function() {
	return (this.h == null);
}
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return (this.h != null);
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}}
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false;
		else s.b += sep;
		s.b += l[0];
		l = l[1];
	}
	return s.b;
}
List.prototype.last = function() {
	return (this.q == null?null:this.q[0]);
}
List.prototype.length = null;
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
List.prototype.q = null;
List.prototype.remove = function(v) {
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1];
			else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			return true;
		}
		prev = l;
		l = l[1];
	}
	return false;
}
List.prototype.toString = function() {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b += "{";
	while(l != null) {
		if(first) first = false;
		else s.b += ", ";
		s.b += l[0];
		l = l[1];
	}
	s.b += "}";
	return s.b;
}
List.prototype.__class__ = List;
js = {}
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype.__class__ = js.Lib;
org.puremvc.haxe.interfaces.ICommand = function() { }
org.puremvc.haxe.interfaces.ICommand.__name__ = ["org","puremvc","haxe","interfaces","ICommand"];
org.puremvc.haxe.interfaces.ICommand.prototype.execute = null;
org.puremvc.haxe.interfaces.ICommand.prototype.__class__ = org.puremvc.haxe.interfaces.ICommand;
ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
Type = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if(o.__enum__ != null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	if(c == null) return null;
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl;
	try {
		cl = eval(name);
	}
	catch( $e6 ) {
		{
			var e = $e6;
			{
				cl = null;
			}
		}
	}
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e;
	try {
		e = eval(name);
	}
	catch( $e7 ) {
		{
			var err = $e7;
			{
				e = null;
			}
		}
	}
	if(e == null || e.__ename__ == null) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	if(args.length <= 3) return new cl(args[0],args[1],args[2]);
	if(args.length > 8) throw "Too many arguments";
	return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
}
Type.createEmptyInstance = function(cl) {
	return new cl($_);
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.getInstanceFields = function(c) {
	var a = Reflect.fields(c.prototype);
	a.remove("__class__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__super__");
	a.remove("prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	return e.__constructs__;
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":{
		return ValueType.TBool;
	}break;
	case "string":{
		return ValueType.TClass(String);
	}break;
	case "number":{
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	}break;
	case "object":{
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	}break;
	case "function":{
		if(v.__name__ != null) return ValueType.TObject;
		return ValueType.TFunction;
	}break;
	case "undefined":{
		return ValueType.TNull;
	}break;
	default:{
		return ValueType.TUnknown;
	}break;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	if(a[0] != b[0]) return false;
	{
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
	}
	var e = a.__enum__;
	if(e != b.__enum__ || e == null) return false;
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.prototype.__class__ = Type;
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = (i != null?i.fileName + ":" + i.lineNumber + ": ":"");
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg);
	else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
	else null;
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	}
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":{
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				{
					var _g1 = 2, _g = o.length;
					while(_g1 < _g) {
						var i = _g1++;
						if(i != 2) str += "," + js.Boot.__string_rec(o[i],s);
						else str += js.Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			{
				var _g = 0;
				while(_g < l) {
					var i1 = _g++;
					str += ((i1 > 0?",":"")) + js.Boot.__string_rec(o[i1],s);
				}
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		}
		catch( $e8 ) {
			{
				var e = $e8;
				{
					return "???";
				}
			}
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = (o.hasOwnProperty != null);
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) continue;
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") continue;
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	}break;
	case "function":{
		return "<function>";
	}break;
	case "string":{
		return o;
	}break;
	default:{
		return String(o);
	}break;
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return (o.__enum__ == null);
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	}
	catch( $e9 ) {
		{
			var e = $e9;
			{
				if(cl == null) return false;
			}
		}
	}
	switch(cl) {
	case Int:{
		return Math.ceil(o%2147483648.0) === o;
	}break;
	case Float:{
		return typeof(o) == "number";
	}break;
	case Bool:{
		return o === true || o === false;
	}break;
	case String:{
		return typeof(o) == "string";
	}break;
	case Dynamic:{
		return true;
	}break;
	default:{
		if(o == null) return false;
		return o.__enum__ == cl || (cl == Class && o.__name__ != null) || (cl == Enum && o.__ename__ != null);
	}break;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = (document.all != null && window.opera == null);
	js.Lib.isOpera = (window.opera != null);
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	}
	Array.prototype.remove = function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	}
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}}
	}
	var cca = String.prototype.charCodeAt;
	String.prototype.cca = cca;
	String.prototype.charCodeAt = function(i) {
		var x = cca.call(this,i);
		if(isNaN(x)) return null;
		return x;
	}
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		}
		else if(len < 0) {
			len = this.length + len - pos;
		}
		return oldsub.apply(this,[pos,len]);
	}
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
org.puremvc.haxe.patterns.observer.Notification = function(name,body,type) { if( name === $_ ) return; {
	this.name = name;
	if(body != null) this.body = body;
	if(type != null) this.type = type;
}}
org.puremvc.haxe.patterns.observer.Notification.__name__ = ["org","puremvc","haxe","patterns","observer","Notification"];
org.puremvc.haxe.patterns.observer.Notification.prototype.body = null;
org.puremvc.haxe.patterns.observer.Notification.prototype.getBody = function() {
	return this.body;
}
org.puremvc.haxe.patterns.observer.Notification.prototype.getName = function() {
	return this.name;
}
org.puremvc.haxe.patterns.observer.Notification.prototype.getType = function() {
	return this.type;
}
org.puremvc.haxe.patterns.observer.Notification.prototype.name = null;
org.puremvc.haxe.patterns.observer.Notification.prototype.setBody = function(body) {
	this.body = body;
}
org.puremvc.haxe.patterns.observer.Notification.prototype.setType = function(type) {
	this.type = type;
}
org.puremvc.haxe.patterns.observer.Notification.prototype.toString = function() {
	var msg = "Notification Name: " + this.getName();
	msg += "\nBody:" + (this.body == null?"null":this.body.toString());
	msg += "\nType:" + (this.type == null?"null":this.type);
	return msg;
}
org.puremvc.haxe.patterns.observer.Notification.prototype.type = null;
org.puremvc.haxe.patterns.observer.Notification.prototype.__class__ = org.puremvc.haxe.patterns.observer.Notification;
org.puremvc.haxe.patterns.observer.Notification.__interfaces__ = [org.puremvc.haxe.interfaces.INotification];
Hash = function(p) { if( p === $_ ) return; {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	else null;
}}
Hash.__name__ = ["Hash"];
Hash.prototype.exists = function(key) {
	try {
		key = "$" + key;
		return this.hasOwnProperty.call(this.h,key);
	}
	catch( $e10 ) {
		{
			var e = $e10;
			{
				
				for(var i in this.h)
					if( i == key ) return true;
			;
				return false;
			}
		}
	}
}
Hash.prototype.get = function(key) {
	return this.h["$" + key];
}
Hash.prototype.h = null;
Hash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref["$" + i];
	}}
}
Hash.prototype.keys = function() {
	var a = new Array();
	
			for(var i in this.h)
				a.push(i.substr(1));
		;
	return a.iterator();
}
Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h["$" + key]);
	return true;
}
Hash.prototype.set = function(key,value) {
	this.h["$" + key] = value;
}
Hash.prototype.toString = function() {
	var s = new StringBuf();
	s.b += "{";
	var it = this.keys();
	{ var $it11 = it;
	while( $it11.hasNext() ) { var i = $it11.next();
	{
		s.b += i;
		s.b += " => ";
		s.b += Std.string(this.get(i));
		if(it.hasNext()) s.b += ", ";
	}
	}}
	s.b += "}";
	return s.b;
}
Hash.prototype.__class__ = Hash;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	Date.now = function() {
		return new Date();
	}
	Date.fromTime = function(t) {
		var d = new Date();
		d["setTime"](t);
		return d;
	}
	Date.fromString = function(s) {
		switch(s.length) {
		case 8:{
			var k = s.split(":");
			var d = new Date();
			d["setTime"](0);
			d["setUTCHours"](k[0]);
			d["setUTCMinutes"](k[1]);
			d["setUTCSeconds"](k[2]);
			return d;
		}break;
		case 10:{
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		}break;
		case 19:{
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		}break;
		default:{
			throw "Invalid date format : " + s;
		}break;
		}
	}
	Date.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + ((m < 10?"0" + m:"" + m)) + "-" + ((d < 10?"0" + d:"" + d)) + " " + ((h < 10?"0" + h:"" + h)) + ":" + ((mi < 10?"0" + mi:"" + mi)) + ":" + ((s < 10?"0" + s:"" + s));
	}
	Date.prototype.__class__ = Date;
	Date.__name__ = ["Date"];
}
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]}
	Dynamic = { __name__ : ["Dynamic"]}
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]}
	Class = { __name__ : ["Class"]}
	Enum = { }
	Void = { __ename__ : ["Void"]}
}
{
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	}
	Math.isNaN = function(i) {
		return isNaN(i);
	}
	Math.__name__ = ["Math"];
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
org.puremvc.haxe.patterns.proxy.Proxy.NAME = "Proxy";
haxe.Timer.arr = new Array();
js.Lib.onerror = null;
