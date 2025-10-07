'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Play, Pause, RotateCcw, Plus, User, Armchair, Scissors, Settings2, Zap, TrendingUp, BookOpen, Lightbulb, Code, AlertTriangle, CheckCircle } from 'lucide-react';

// Types
interface Customer {
  id: number;
  status: 'waiting' | 'getting-haircut';
}

type BarberStatus = 'sleeping' | 'cutting' | 'idle';

// Modular Components
const StatCard = ({ value, label, variant = 'default' }: { value: number; label: string; variant?: 'success' | 'info' | 'danger' | 'default' }) => {
  const variants = {
    success: 'from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400',
    info: 'from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400',
    danger: 'from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400',
    default: 'from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400',
  };

  return (
    <div className={`text-center p-4 bg-gradient-to-br rounded-lg shadow-md border ${variants[variant]}`}>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </div>
  );
};

const BarberStation = ({ status, servingCustomer }: { status: BarberStatus; servingCustomer: Customer | undefined }) => {
  const statusConfig = {
    sleeping: { bg: 'bg-gray-200 dark:bg-gray-700', border: 'border-gray-400 dark:border-gray-600', emoji: '😴', label: 'Sleeping', animate: false },
    cutting: { bg: 'bg-green-200 dark:bg-green-900', border: 'border-green-500', emoji: '✂️', label: 'Cutting Hair', animate: true },
    idle: { bg: 'bg-yellow-200 dark:bg-yellow-900', border: 'border-yellow-500', emoji: '🧍', label: 'Idle', animate: false },
  };

  const config = statusConfig[status];

  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
        <Scissors className="w-5 h-5 text-blue-600" />
        Barber Station
      </h3>
      <div className="flex items-center justify-center gap-6">
        <div className={`w-36 h-36 rounded-full border-4 flex items-center justify-center transition-all duration-500 shadow-lg ${config.bg} ${config.border} ${config.animate ? 'animate-pulse shadow-green-500/50' : ''}`}>
          <div className="text-center">
            <div className="text-5xl mb-2">{config.emoji}</div>
            <Badge variant={status === 'cutting' ? 'default' : 'secondary'} className="text-xs">
              {config.label}
            </Badge>
          </div>
        </div>
        {servingCustomer && (
          <div className="w-28 h-28 rounded-full bg-blue-200 dark:bg-blue-900 border-4 border-blue-500 flex items-center justify-center shadow-lg animate-in slide-in-from-right">
            <div className="text-center">
              <User className="w-10 h-10 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
              <div className="text-sm font-semibold">#{servingCustomer.id}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const WaitingArea = ({ customers, chairCount }: { customers: Customer[]; chairCount: number }) => {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
        <Armchair className="w-5 h-5 text-purple-600" />
        Waiting Area ({customers.length}/{chairCount} chairs)
      </h3>
      <div className={`grid gap-3 ${chairCount <= 3 ? 'grid-cols-3' : chairCount <= 6 ? 'grid-cols-6' : 'grid-cols-5'}`}>
        {[...Array(chairCount)].map((_, idx) => {
          const customer = customers[idx];
          return (
            <div
              key={idx}
              className={`h-24 rounded-lg border-2 border-dashed flex items-center justify-center transition-all duration-300 ${
                customer 
                  ? 'bg-blue-100 dark:bg-blue-950 border-blue-400 shadow-md scale-105' 
                  : 'bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700'
              }`}
            >
              {customer ? (
                <div className="text-center animate-in fade-in zoom-in">
                  <User className="w-8 h-8 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
                  <div className="text-xs font-semibold">#{customer.id}</div>
                </div>
              ) : (
                <Armchair className="w-8 h-8 text-gray-300 dark:text-gray-700" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const EventLog = ({ logs }: { logs: string[] }) => {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
        📋 Event Log
      </h3>
      <div className="border-2 rounded-lg p-4 bg-slate-950 dark:bg-black text-green-400 font-mono text-xs h-40 overflow-y-auto shadow-inner">
        {logs.length === 0 ? (
          <div className="text-gray-500 text-center mt-12">Waiting for events...</div>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} className="mb-1 hover:bg-slate-900 px-1 rounded animate-in fade-in slide-in-from-top-1">
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Main Component
export default function SleepingBarberSimulator() {
  // State
  const [isRunning, setIsRunning] = useState(false);
  const [barberStatus, setBarberStatus] = useState<BarberStatus>('sleeping');
  const [waitingChairs, setWaitingChairs] = useState(3);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersServed, setCustomersServed] = useState(0);
  const [customersRejected, setCustomersRejected] = useState(0);
  const [speed, setSpeed] = useState(2000);
  const [nextCustomerId, setNextCustomerId] = useState(1);
  const [logs, setLogs] = useState<string[]>([]);
  const [arrivalRate, setArrivalRate] = useState(70);
  const [showSettings, setShowSettings] = useState(false);

  // Refs to prevent double processing
  const processingRef = useRef(false);
  const customerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const barberIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Logging
  const addLog = useCallback((message: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev].slice(0, 15));
  }, []);

  // Add Customer
  const addCustomer = useCallback(() => {
    setCustomers(prev => {
      const waitingCount = prev.filter(c => c.status === 'waiting').length;
      
      if (waitingCount >= waitingChairs) {
        addLog(`❌ Customer ${nextCustomerId} left - no chairs available`);
        setCustomersRejected(r => r + 1);
        setNextCustomerId(id => id + 1);
        return prev;
      }
      
      addLog(`✅ Customer ${nextCustomerId} arrived and is waiting`);
      const newCustomer: Customer = {
        id: nextCustomerId,
        status: 'waiting'
      };
      setNextCustomerId(id => id + 1);
      return [...prev, newCustomer];
    });
  }, [nextCustomerId, waitingChairs, addLog]);

  // Reset
  const reset = useCallback(() => {
    setIsRunning(false);
    setBarberStatus('sleeping');
    setCustomers([]);
    setCustomersServed(0);
    setCustomersRejected(0);
    setNextCustomerId(1);
    setLogs([]);
    processingRef.current = false;
    
    if (customerIntervalRef.current) {
      clearInterval(customerIntervalRef.current);
      customerIntervalRef.current = null;
    }
    if (barberIntervalRef.current) {
      clearInterval(barberIntervalRef.current);
      barberIntervalRef.current = null;
    }
    
    addLog('🔄 Simulation reset');
  }, [addLog]);

  // Barber logic - Process customers
  useEffect(() => {
    if (!isRunning) {
      if (barberIntervalRef.current) {
        clearInterval(barberIntervalRef.current);
        barberIntervalRef.current = null;
      }
      return;
    }

    barberIntervalRef.current = setInterval(() => {
      if (processingRef.current) return;
      processingRef.current = true;

      setCustomers(prev => {
        const waiting = prev.filter(c => c.status === 'waiting');
        const beingServed = prev.filter(c => c.status === 'getting-haircut');

        // Case 1: Barber finishing a haircut
        if (beingServed.length > 0) {
          const customer = beingServed[0];
          addLog(`✂️ Customer ${customer.id} finished haircut`);
          setCustomersServed(s => s + 1);
          
          const remaining = prev.filter(c => c.id !== customer.id);
          const stillWaiting = remaining.filter(c => c.status === 'waiting');
          
          if (stillWaiting.length === 0) {
            setBarberStatus('sleeping');
            addLog('😴 Barber went to sleep - no customers waiting');
          } else {
            setBarberStatus('idle');
          }
          
          processingRef.current = false;
          return remaining;
        }

        // Case 2: Barber idle or sleeping with waiting customers
        if ((barberStatus === 'sleeping' || barberStatus === 'idle') && waiting.length > 0) {
          const nextCustomer = waiting[0];
          setBarberStatus('cutting');
          
          if (barberStatus === 'sleeping') {
            addLog(`� Barber woke up! Starting to cut Customer ${nextCustomer.id}'s hair`);
          } else {
            addLog(`💈 Barber started cutting Customer ${nextCustomer.id}'s hair`);
          }
          
          processingRef.current = false;
          return prev.map(c => 
            c.id === nextCustomer.id ? { ...c, status: 'getting-haircut' as const } : c
          );
        }

        processingRef.current = false;
        return prev;
      });
    }, speed);

    return () => {
      if (barberIntervalRef.current) {
        clearInterval(barberIntervalRef.current);
        barberIntervalRef.current = null;
      }
    };
  }, [isRunning, barberStatus, speed, addLog]);

  // Customer arrival logic
  useEffect(() => {
    if (!isRunning) {
      if (customerIntervalRef.current) {
        clearInterval(customerIntervalRef.current);
        customerIntervalRef.current = null;
      }
      return;
    }

    customerIntervalRef.current = setInterval(() => {
      if (Math.random() * 100 < arrivalRate) {
        addCustomer();
      }
    }, speed * 1.5);

    return () => {
      if (customerIntervalRef.current) {
        clearInterval(customerIntervalRef.current);
        customerIntervalRef.current = null;
      }
    };
  }, [isRunning, speed, arrivalRate, addCustomer]);

  // Computed values
  const waitingCustomers = customers.filter(c => c.status === 'waiting');
  const servingCustomer = customers.find(c => c.status === 'getting-haircut');

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 dark:border-blue-800 shadow-xl bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-blue-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
              <Scissors className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            The Sleeping Barber Problem
          </CardTitle>
          <CardDescription>
            Watch how synchronization solves coordination between barber and customers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="flex gap-2 flex-wrap items-center">
            <Button 
              onClick={() => setIsRunning(!isRunning)}
              variant={isRunning ? "destructive" : "default"}
              size="lg"
              className="shadow-md"
            >
              {isRunning ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Start</>}
            </Button>
            <Button onClick={addCustomer} variant="outline" disabled={isRunning} size="lg">
              <Plus className="w-4 h-4" /> Add Customer
            </Button>
            <Button onClick={reset} variant="outline" size="lg">
              <RotateCcw className="w-4 h-4" /> Reset
            </Button>
            <Button 
              onClick={() => setShowSettings(!showSettings)} 
              variant="ghost" 
              size="lg"
              className="ml-auto"
            >
              <Settings2 className="w-4 h-4" /> Settings
            </Button>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <Card className="bg-muted/50 border-dashed">
              <CardHeader>
                <CardTitle className="text-sm">Simulation Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Armchair className="w-4 h-4" />
                      Waiting Chairs: {waitingChairs}
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={waitingChairs}
                      onChange={(e) => {
                        const num = parseInt(e.target.value);
                        if (num >= 1 && num <= 10) setWaitingChairs(num);
                      }}
                      disabled={isRunning}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Customer Arrival Rate: {arrivalRate}%
                    </label>
                    <Slider
                      value={[arrivalRate]}
                      onValueChange={(value) => setArrivalRate(value[0])}
                      min={10}
                      max={100}
                      step={10}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Animation Speed
                  </label>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => setSpeed(3000)} 
                      variant={speed === 3000 ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                    >
                      Slow
                    </Button>
                    <Button 
                      onClick={() => setSpeed(2000)} 
                      variant={speed === 2000 ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                    >
                      Normal
                    </Button>
                    <Button 
                      onClick={() => setSpeed(1000)} 
                      variant={speed === 1000 ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                    >
                      Fast
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard value={customersServed} label="Served" variant="success" />
            <StatCard value={waitingCustomers.length} label="Waiting" variant="info" />
            <StatCard value={customersRejected} label="Rejected" variant="danger" />
          </div>

          {/* Visualization */}
          <div className="border-2 rounded-xl p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950 dark:via-slate-900 dark:to-purple-950 shadow-inner">
            <BarberStation status={barberStatus} servingCustomer={servingCustomer} />
            <WaitingArea customers={waitingCustomers} chairCount={waitingChairs} />
          </div>

          {/* Event Log */}
          <EventLog logs={logs} />

          {/* Comprehensive Documentation */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Comprehensive Documentation
            </h3>
            
            <Accordion type="multiple" defaultValue={['problem']} className="space-y-3">
              {/* Problem Definition */}
              <AccordionItem value="problem" className="border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                <AccordionTrigger className="text-blue-900 dark:text-blue-100">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-blue-600" />
                    <strong>Problem Definition</strong>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="bg-white dark:bg-slate-900">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-base mb-2 flex items-center gap-2 text-blue-700 dark:text-blue-300">
                        📖 What is the Sleeping Barber Problem?
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        The Sleeping Barber Problem is a classic inter-process communication and synchronization problem in computer science. 
                        It involves coordinating access to a shared resource (the barber) between multiple processes (customers) in a way that 
                        prevents race conditions, deadlocks, and ensures fair resource allocation.
                      </p>
                      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          <strong>Core Components:</strong>
                        </p>
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                          <li><strong>Barber:</strong> A shared resource that can serve one customer at a time</li>
                          <li><strong>Waiting Room:</strong> Limited number of chairs for customers to wait</li>
                          <li><strong>Customers:</strong> Multiple processes arriving at random times</li>
                          <li><strong>Mutual Exclusion:</strong> Only one customer can be served at a time</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-base mb-2 flex items-center gap-2 text-orange-700 dark:text-orange-300">
                        ⚠️ Why is it Considered a Problem?
                      </h4>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        Without proper synchronization mechanisms, several critical issues can occur:
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                          <h5 className="font-semibold text-sm text-red-700 dark:text-red-300 mb-1">🔴 Race Conditions</h5>
                          <p className="text-xs text-muted-foreground">
                            Multiple customers might try to wake the barber simultaneously, or access waiting chairs concurrently, 
                            leading to unpredictable behavior and data corruption.
                          </p>
                        </div>
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <h5 className="font-semibold text-sm text-yellow-700 dark:text-yellow-300 mb-1">🟡 Deadlock</h5>
                          <p className="text-xs text-muted-foreground">
                            The barber might wait for customers while customers wait for the barber, creating a circular 
                            dependency where no progress can be made.
                          </p>
                        </div>
                        <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                          <h5 className="font-semibold text-sm text-purple-700 dark:text-purple-300 mb-1">🟣 Starvation</h5>
                          <p className="text-xs text-muted-foreground">
                            Some customers might wait indefinitely if new customers keep arriving and the queue 
                            management isn't fair (though our implementation uses FIFO to prevent this).
                          </p>
                        </div>
                        <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                          <h5 className="font-semibold text-sm text-orange-700 dark:text-orange-300 mb-1">🟠 Resource Waste</h5>
                          <p className="text-xs text-muted-foreground">
                            The barber sleeping when customers are waiting, or customers leaving because they can't 
                            determine if chairs are available, wastes CPU cycles and resources.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-base mb-2 flex items-center gap-2 text-green-700 dark:text-green-300">
                        🌍 Real-World Applications
                      </h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg border border-green-200 dark:border-green-800">
                          <h5 className="font-semibold text-sm text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                            🏥 Hospital Emergency Room Management
                          </h5>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Scenario:</strong> An emergency room has limited doctors (barbers) and a waiting area with limited seats (chairs).
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-2">
                            <li><strong>Patients arrive randomly</strong> at different times with varying urgency levels</li>
                            <li><strong>Doctors rest</strong> when no patients are waiting (sleeping barber)</li>
                            <li><strong>Patients must wait</strong> if doctors are busy and seats are available</li>
                            <li><strong>Patients leave</strong> if the waiting room is full (rejected customers)</li>
                            <li><strong>Synchronization needed:</strong> Proper queue management, doctor notification, patient tracking</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                          <h5 className="font-semibold text-sm text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                            💻 Web Server Request Processing
                          </h5>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Scenario:</strong> A web server has worker threads (barbers) and a request queue with limited size (chairs).
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-2">
                            <li><strong>HTTP requests arrive</strong> from clients at unpredictable rates</li>
                            <li><strong>Worker threads sleep</strong> when idle to conserve resources</li>
                            <li><strong>Requests queue up</strong> when all workers are busy</li>
                            <li><strong>New requests rejected</strong> with 503 Service Unavailable if queue is full</li>
                            <li><strong>Synchronization needed:</strong> Thread pool management, request queuing, load balancing</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                          <h5 className="font-semibold text-sm text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                            🖨️ Print Spooler System
                          </h5>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Scenario:</strong> A network printer (barber) serves multiple computers (customers) with a print queue (waiting room).
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-2">
                            <li><strong>Print jobs arrive</strong> from various users throughout the day</li>
                            <li><strong>Printer enters sleep mode</strong> when no jobs are queued (energy saving)</li>
                            <li><strong>Jobs wait in queue</strong> when printer is busy with current job</li>
                            <li><strong>Jobs rejected</strong> if spooler buffer is full</li>
                            <li><strong>Synchronization needed:</strong> Queue management, printer wake-up, job status tracking</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Solutions */}
              <AccordionItem value="solution" className="border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                <AccordionTrigger className="text-green-900 dark:text-green-100">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <strong>Solutions & Implementation</strong>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="bg-white dark:bg-slate-900">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-base mb-2 flex items-center gap-2 text-green-700 dark:text-green-300">
                        <Lightbulb className="w-5 h-5" />
                        Synchronization Mechanisms
                      </h4>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        The Sleeping Barber Problem can be solved using various synchronization primitives. Here are the most common approaches:
                      </p>
                      
                      <div className="space-y-3">
                        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                          <h5 className="font-semibold text-sm text-blue-700 dark:text-blue-300 mb-2">1️⃣ Semaphore-Based Solution</h5>
                          <p className="text-sm text-muted-foreground mb-3">
                            Uses three semaphores to coordinate between barber and customers:
                          </p>
                          <div className="bg-white dark:bg-slate-900 p-3 rounded border border-blue-200 dark:border-blue-700">
                            <code className="text-xs font-mono block whitespace-pre-wrap text-blue-900 dark:text-blue-100">
{`// Semaphore declarations
Semaphore customers = 0;      // Number of customers waiting
Semaphore barber = 0;         // Barber ready to cut hair
Semaphore mutex = 1;          // Protect waiting count access
int waiting = 0;              // Number of customers waiting
int chairs = N;               // Number of waiting chairs

// Customer process
customerArrival() {
  mutex.wait();               // Lock
  if (waiting < chairs) {
    waiting++;                // Sit in waiting room
    mutex.signal();           // Unlock
    customers.signal();       // Wake barber if sleeping
    barber.wait();            // Wait for barber
    getHaircut();
  } else {
    mutex.signal();           // Unlock
    leaveShop();              // No chairs, leave
  }
}

// Barber process
barberProcess() {
  while (true) {
    customers.wait();         // Sleep until customer arrives
    mutex.wait();             // Lock
    waiting--;                // Customer leaving waiting room
    mutex.signal();           // Unlock
    barber.signal();          // Ready to cut hair
    cutHair();                // Serve customer
  }
}`}
                            </code>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            <strong>How it solves the problem:</strong>
                            <ul className="list-disc list-inside mt-1 space-y-1 ml-2">
                              <li><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">mutex</code> ensures atomic access to shared waiting count</li>
                              <li><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">customers</code> signals barber when customer arrives</li>
                              <li><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">barber</code> signals customer when ready to serve</li>
                              <li>Prevents race conditions through mutual exclusion</li>
                              <li>Avoids deadlock with proper signal ordering</li>
                            </ul>
                          </div>
                        </div>

                        <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                          <h5 className="font-semibold text-sm text-purple-700 dark:text-purple-300 mb-2">2️⃣ Monitor-Based Solution</h5>
                          <p className="text-sm text-muted-foreground mb-3">
                            Uses a monitor with condition variables for cleaner synchronization:
                          </p>
                          <div className="bg-white dark:bg-slate-900 p-3 rounded border border-purple-200 dark:border-purple-700">
                            <code className="text-xs font-mono block whitespace-pre-wrap text-purple-900 dark:text-purple-100">
{`monitor BarberShop {
  int waiting = 0;
  int chairs = N;
  condition customerReady, barberReady;
  
  procedure customerArrival() {
    if (waiting < chairs) {
      waiting++;
      signal(customerReady);  // Wake barber
      wait(barberReady);      // Wait for service
      waiting--;
    } else {
      // Shop full, leave
      return;
    }
  }
  
  procedure barberService() {
    if (waiting == 0) {
      wait(customerReady);   // Sleep until customer
    }
    signal(barberReady);     // Ready to serve
    cutHair();
  }
}`}
                            </code>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            <strong>Advantages:</strong> Higher-level abstraction, automatic mutual exclusion within monitor, 
                            easier to understand and maintain, less error-prone than semaphores.
                          </div>
                        </div>

                        <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                          <h5 className="font-semibold text-sm text-green-700 dark:text-green-300 mb-2">
                            3️⃣ This Simulator's Approach (Event-Driven State Machine)
                          </h5>
                          <p className="text-sm text-muted-foreground mb-3">
                            Our implementation uses React state management with careful synchronization:
                          </p>
                          <div className="bg-white dark:bg-slate-900 p-3 rounded border border-green-200 dark:border-green-700">
                            <code className="text-xs font-mono block whitespace-pre-wrap text-green-900 dark:text-green-100">
{`// State management
const [customers, setCustomers] = useState<Customer[]>([]);
const [barberStatus, setBarberStatus] = useState('sleeping');
const processingRef = useRef(false);  // Prevent concurrent processing

// Customer arrival (separate interval)
useEffect(() => {
  const interval = setInterval(() => {
    if (Math.random() * 100 < arrivalRate) {
      setCustomers(prev => {
        if (prev.filter(c => c.status === 'waiting').length >= chairs) {
          logEvent('Customer rejected - shop full');
          return prev;  // Shop full
        }
        logEvent('Customer arrived');
        return [...prev, { id: nextId++, status: 'waiting' }];
      });
    }
  }, speed * 1.5);
  return () => clearInterval(interval);
}, [arrivalRate, speed]);

// Barber processing (separate interval)
useEffect(() => {
  const interval = setInterval(() => {
    if (processingRef.current) return;  // Guard against concurrent
    processingRef.current = true;
    
    setCustomers(prev => {
      const waiting = prev.filter(c => c.status === 'waiting');
      const serving = prev.filter(c => c.status === 'getting-haircut');
      
      if (serving.length > 0) {
        // Finish current customer
        logEvent('Customer finished');
        setBarberStatus(waiting.length > 0 ? 'idle' : 'sleeping');
        return prev.filter(c => c.id !== serving[0].id);
      }
      
      if (waiting.length > 0 && barberStatus !== 'cutting') {
        // Start serving next customer
        logEvent('Barber woke up, starting haircut');
        setBarberStatus('cutting');
        return prev.map(c => 
          c.id === waiting[0].id 
            ? { ...c, status: 'getting-haircut' } 
            : c
        );
      }
      
      return prev;
    });
    
    processingRef.current = false;
  }, speed);
  return () => clearInterval(interval);
}, [speed, barberStatus]);`}
                            </code>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            <strong>Key Features:</strong>
                            <ul className="list-disc list-inside mt-1 space-y-1 ml-2">
                              <li><code className="bg-green-100 dark:bg-green-900 px-1 rounded">processingRef</code> prevents race conditions (acts like mutex)</li>
                              <li>Separate intervals for arrival and processing avoid conflicts</li>
                              <li>Immutable state updates ensure predictable behavior</li>
                              <li>FIFO queue (array) ensures fairness and prevents starvation</li>
                              <li>Event logging provides visibility into synchronization</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-base mb-2 flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                        <Code className="w-5 h-5" />
                        Implementation Best Practices
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
                          <h5 className="font-semibold text-sm text-indigo-700 dark:text-indigo-300 mb-2">✅ Do's</h5>
                          <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                            <li>Use proper locking mechanisms (mutex, semaphores)</li>
                            <li>Implement atomic operations for shared variables</li>
                            <li>Design with clear state transitions</li>
                            <li>Add timeout mechanisms to prevent indefinite waits</li>
                            <li>Log events for debugging and monitoring</li>
                            <li>Use FIFO queues for fairness</li>
                            <li>Clean up resources properly (clear intervals)</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                          <h5 className="font-semibold text-sm text-red-700 dark:text-red-300 mb-2">❌ Don'ts</h5>
                          <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                            <li>Don't access shared state without synchronization</li>
                            <li>Avoid busy-waiting (polling in tight loops)</li>
                            <li>Don't create circular dependencies in locking</li>
                            <li>Never assume execution order without guarantees</li>
                            <li>Don't ignore race condition possibilities</li>
                            <li>Avoid global mutable state when possible</li>
                            <li>Don't forget to release locks/semaphores</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg border-2 border-amber-300 dark:border-amber-700">
                      <h4 className="font-semibold text-base mb-2 flex items-center gap-2 text-amber-800 dark:text-amber-200">
                        💡 Key Takeaways
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                        <li>The Sleeping Barber Problem teaches fundamental concepts in concurrent programming and resource management</li>
                        <li>Proper synchronization is critical - without it, race conditions and deadlocks will occur</li>
                        <li>Multiple solution approaches exist (semaphores, monitors, message passing) - choose based on your platform</li>
                        <li>Real-world applications are everywhere: servers, databases, operating systems, embedded systems</li>
                        <li>Modern solutions often use higher-level abstractions (async/await, channels) built on these primitives</li>
                        <li>Testing concurrent systems is challenging - simulators like this help visualize and understand behavior</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Original Explanation (Kept for quick reference) */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
              💡 Quick Reference - How it works:
            </h4>
            <ul className="text-sm space-y-1.5 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                The barber <strong>sleeps</strong> when no customers are waiting
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                Customers <strong>wake the barber</strong> when they arrive
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                If all chairs are full, new customers <strong>leave</strong>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                Semaphores ensure <strong>proper synchronization</strong> and prevent race conditions
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
