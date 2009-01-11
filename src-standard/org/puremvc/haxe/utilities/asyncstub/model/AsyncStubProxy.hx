/*
 PureMVC Utility - Asynchronous Stub Port by Zjnue Brzavi <zjnue.brzavi@puremvc.org>
 Copyright (c) 2008, Philip Sexton <philip.sexton@puremvc.org>
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
package org.puremvc.haxe.utilities.asyncstub.model;

import org.puremvc.haxe.interfaces.IProxy;
import org.puremvc.haxe.patterns.proxy.Proxy;
    
/**
 * Can be used to simulate an asynchrounous activity.  Instantiate as a proxy, with or without
 * a name. The async activity is started by invoking the [asyncAction] method. There 
 * cannot be more than one activity running per stub instance.
 *
 * <p>Uses a random number for the async delay.  Set the max delay in msecs using the 
 * [maxDelayMSecs] property.</p>
 *
 * <p>When the async action completes, it invokes either a result method or a fault method,
 * similar to IResponder.  Use the [probabilityOfFault] property to govern random selection of 
 * the method.</p>
 *
 * <p>Includes the facility to set a [token] property that will be returned to the 
 * result/fault method, enabling the client app to track the stub instance that invoked the 
 * result/fault.  This facility is optional.  If the token is not set, no arguments are passed
 * to the result/fault method.</p>
 *
 * <p>See the demo StartupAsOrdered for an example of use.</p>
 */
class AsyncStubProxy<T> extends Proxy, implements IProxy
{
	public var maxDelayMSecs( default, default ) : Int;
	public var probabilityOfFault( default, default ) : Float;
	public var token( default, default ) : T;
	
	var clientResultFunction : T -> Void;
	var clientFaultFunction : T -> Void;
	var asyncInProgress : Bool;
	var timer : Timer;

	public function new( ?name : String = null )
	{
		super( name );
		maxDelayMSecs = 15000; // 15 secs
		probabilityOfFault = 0.;
		asyncInProgress = false;
	}
	
	public function asyncAction( resultFunction : T -> Void, ?faultFunction : T -> Void = null ) : Void {
		if( asyncInProgress )
			throw "AsyncStubProxy: Cannot have more than one async activity running per stub";
		
		asyncInProgress = true;
		clientResultFunction = resultFunction;
		clientFaultFunction = faultFunction;
		
		var onCompletion = calcCompletionFunction();
		var msecsDelay : Int = Std.int( Math.random() * maxDelayMSecs );
		timer = new Timer( onCompletion, msecsDelay, 1 );
		timer.start();
	}
	
	function calcCompletionFunction() : Void -> Void {
		if( clientFaultFunction == null )
			return onResult;
		else if( probabilityOfFault <= .01 )
			return onResult;
		else if( probabilityOfFault >= .99 )
			return onFault;
		else if( Math.random() <= probabilityOfFault )
			return onFault;
		else
			return onResult;
	}
	
	function onResult() : Void {
		timer.stop();
		asyncInProgress = false;
		clientResultFunction( token );
	}
	
	function onFault() : Void {
		timer.stop();
		asyncInProgress = false;
		clientFaultFunction( token );
	}
	
}

class Timer {
	
	var callBack : Void -> Void;
	var milliInterval : Int;
	var maxTicks : Int;
	var ticks : Int;
	var stopped : Bool;
	
	public function new( callBack : Void -> Void, ?milliInterval : Int = 1000, ?maxTicks : Int = -1 ) {
		this.callBack = callBack;
		this.milliInterval = milliInterval;
		this.maxTicks = maxTicks;
		ticks = 0;
		stopped = true;
	}

	public function start() {
		stopped = false;
		#if neko 
		tick();
		#else
		haxe.Timer.delay( tick, milliInterval );
		#end
	}
	
	public function stop() {
		stopped = true;
	}
	
	public function reset() {
		ticks = 0;
	}
	
	#if neko
	function tick() {
		var t1 = null;
		while( true ) {
			t1 = neko.vm.Thread.create( tock );
			t1.sendMessage( neko.vm.Thread.current() );
			neko.vm.Thread.readMessage( true );
			if( stopped || ticks == maxTicks )
				break;
			callBack();
			ticks++;
		}
	}
	
	function tock() {
		var main : neko.vm.Thread = neko.vm.Thread.readMessage(true);
		neko.Sys.sleep( milliInterval / 1000. );
		main.sendMessage("back to you");
	}
	#else
	function tick() {
		if( stopped || ticks == maxTicks )
			return;
		callBack();
		ticks++;
		haxe.Timer.delay( tick, milliInterval );
	}
	#end
	
}
