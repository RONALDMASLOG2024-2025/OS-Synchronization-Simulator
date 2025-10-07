'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Play, Pause, RotateCcw, Cigarette, Leaf, FileText, Flame, Settings2, Zap, BookOpen, AlertTriangle, CheckCircle, Lightbulb, Code } from 'lucide-react';

type Ingredient = 'tobacco' | 'paper' | 'matches';

interface Smoker {
  id: number;
  has: Ingredient;
  needs: Ingredient[];
  status: 'waiting' | 'smoking' | 'done';
  smokesCount: number;
}

export default function CigaretteSmokersSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(2000);
  const [onTable, setOnTable] = useState<Ingredient[]>([]);
  const [agentStatus, setAgentStatus] = useState<'idle' | 'placing'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  
  const [smokers, setSmokers] = useState<Smoker[]>([
    { id: 1, has: 'tobacco', needs: ['paper', 'matches'], status: 'waiting', smokesCount: 0 },
    { id: 2, has: 'paper', needs: ['tobacco', 'matches'], status: 'waiting', smokesCount: 0 },
    { id: 3, has: 'matches', needs: ['tobacco', 'paper'], status: 'waiting', smokesCount: 0 },
  ]);

  const addLog = (message: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev].slice(0, 15));
  };

  const reset = () => {
    setIsRunning(false);
    setOnTable([]);
    setAgentStatus('idle');
    setSmokers([
      { id: 1, has: 'tobacco', needs: ['paper', 'matches'], status: 'waiting', smokesCount: 0 },
      { id: 2, has: 'paper', needs: ['tobacco', 'matches'], status: 'waiting', smokesCount: 0 },
      { id: 3, has: 'matches', needs: ['tobacco', 'paper'], status: 'waiting', smokesCount: 0 },
    ]);
    setLogs([]);
    addLog('🔄 Simulation reset');
  };

  const getIngredientIcon = (ingredient: Ingredient) => {
    switch (ingredient) {
      case 'tobacco': return <Leaf className="w-6 h-6" />;
      case 'paper': return <FileText className="w-6 h-6" />;
      case 'matches': return <Flame className="w-6 h-6" />;
    }
  };

  const getIngredientColor = (ingredient: Ingredient) => {
    switch (ingredient) {
      case 'tobacco': return 'text-green-600 dark:text-green-400';
      case 'paper': return 'text-blue-600 dark:text-blue-400';
      case 'matches': return 'text-red-600 dark:text-red-400';
    }
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSmokers(prev => {
        const smoking = prev.find(s => s.status === 'smoking');
        
        // If someone is smoking, finish their cigarette
        if (smoking) {
          addLog(`🚬 Smoker ${smoking.id} (has ${smoking.has}) finished smoking`);
          setOnTable([]);
          setAgentStatus('idle');
          
          return prev.map(s => 
            s.id === smoking.id 
              ? { ...s, status: 'waiting' as const, smokesCount: s.smokesCount + 1 }
              : s
          );
        }

        // If table is empty and agent is idle, place new ingredients
        if (onTable.length === 0 && agentStatus === 'idle') {
          const allIngredients: Ingredient[] = ['tobacco', 'paper', 'matches'];
          const shuffled = [...allIngredients].sort(() => Math.random() - 0.5);
          const selected = shuffled.slice(0, 2);
          
          setOnTable(selected);
          setAgentStatus('placing');
          addLog(`📋 Agent placed: ${selected.join(' + ')}`);
          
          return prev;
        }

        // If table has ingredients, check which smoker can smoke
        if (onTable.length === 2) {
          const canSmoke = prev.find(s => {
            const hasAllNeeded = onTable.every(ing => s.needs.includes(ing));
            return hasAllNeeded && s.status === 'waiting';
          });

          if (canSmoke) {
            addLog(`✅ Smoker ${canSmoke.id} (has ${canSmoke.has}) is making and smoking cigarette`);
            return prev.map(s =>
              s.id === canSmoke.id ? { ...s, status: 'smoking' as const } : s
            );
          }
        }

        return prev;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isRunning, onTable, agentStatus, speed]);

  const totalSmokes = smokers.reduce((sum, s) => sum + s.smokesCount, 0);

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 dark:border-purple-800 shadow-xl bg-gradient-to-br from-white to-purple-50 dark:from-slate-900 dark:to-purple-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
              <Cigarette className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            The Cigarette Smokers Problem
          </CardTitle>
          <CardDescription>
            Watch how three smokers coordinate with an agent to make cigarettes
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
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg shadow-md border-2 border-purple-200 dark:border-purple-800">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">{totalSmokes}</div>
            <div className="text-sm text-muted-foreground font-medium mt-1">Total Cigarettes Smoked</div>
          </div>

          {/* Visualization */}
          <div className="border-2 rounded-xl p-6 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950 dark:via-slate-900 dark:to-pink-950 space-y-6 shadow-inner">
            {/* Agent and Table */}
            <div className="text-center">
              <h3 className="text-sm font-semibold mb-4">Agent & Table</h3>
              <div className="flex flex-col items-center gap-4">
                <div className={`w-28 h-28 rounded-full border-4 flex items-center justify-center transition-all duration-500 shadow-lg ${
                  agentStatus === 'placing' 
                    ? 'bg-yellow-200 dark:bg-yellow-900 border-yellow-500 animate-pulse shadow-yellow-500/50' 
                    : 'bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-600'
                }`}>
                  <div className="text-center">
                    <div className="text-4xl">🤵</div>
                    <div className="text-xs font-semibold mt-1">Agent</div>
                  </div>
                </div>

                {/* Table */}
                <div className="w-full max-w-md">
                  <div className={`border-4 rounded-xl p-8 min-h-36 flex items-center justify-center gap-8 transition-all duration-300 ${
                    onTable.length > 0 
                      ? 'bg-amber-100 dark:bg-amber-950 border-amber-400 shadow-lg' 
                      : 'bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 border-dashed'
                  }`}>
                    {onTable.length === 0 ? (
                      <div className="text-gray-400 text-sm font-medium">Empty Table</div>
                    ) : (
                      onTable.map((ingredient, idx) => (
                        <div key={idx} className={`text-center ${getIngredientColor(ingredient)} animate-in zoom-in duration-300`}>
                          <div className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg mb-2">
                            {getIngredientIcon(ingredient)}
                          </div>
                          <div className="text-xs font-bold capitalize">{ingredient}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Smokers */}
            <div>
              <h3 className="text-sm font-semibold mb-4 text-center">Smokers</h3>
              <div className="grid grid-cols-3 gap-4">
                {smokers.map(smoker => (
                  <div
                    key={smoker.id}
                    className={`border-2 rounded-xl p-4 transition-all duration-300 ${
                      smoker.status === 'smoking'
                        ? 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-950 dark:to-green-900 border-green-500 shadow-xl scale-105 shadow-green-500/30'
                        : smoker.status === 'waiting'
                        ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-300 dark:border-blue-700'
                        : 'bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    <div className="text-center space-y-3">
                      <div className="text-4xl">
                        {smoker.status === 'smoking' ? '🚬' : '🧑'}
                      </div>
                      <div className="font-bold text-sm">Smoker {smoker.id}</div>
                      <Badge variant={smoker.status === 'smoking' ? 'default' : 'secondary'} className="text-xs">
                        {smoker.status === 'smoking' ? 'Smoking' : 'Waiting'}
                      </Badge>
                      
                      <div className="pt-2 border-t border-border">
                        <div className="text-xs text-muted-foreground mb-2">Has:</div>
                        <div className={`flex justify-center ${getIngredientColor(smoker.has)}`}>
                          <div className="p-2 rounded-full bg-white dark:bg-slate-800 shadow">
                            {getIngredientIcon(smoker.has)}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-border">
                        <div className="text-xs font-bold text-muted-foreground">
                          Smoked: <span className="text-purple-600 dark:text-purple-400">{smoker.smokesCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Event Log */}
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

          {/* Comprehensive Documentation */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Comprehensive Documentation
            </h3>
            
            <Accordion type="multiple" defaultValue={['problem']} className="space-y-3">
              {/* Problem Definition */}
              <AccordionItem value="problem" className="border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                <AccordionTrigger className="text-purple-900 dark:text-purple-100">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-purple-600" />
                    <strong>Problem Definition</strong>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="bg-white dark:bg-slate-900 p-6 max-h-[600px] overflow-y-auto">
                  <div className="space-y-6 pb-2">
                    <div>
                      <h4 className="font-semibold text-base mb-2 flex items-center gap-2 text-purple-700 dark:text-purple-300">
                        📖 What is the Cigarette Smokers Problem?
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        The Cigarette Smokers Problem is a classic synchronization problem that demonstrates the challenges of 
                        <strong> conditional synchronization</strong> and <strong>resource allocation</strong> in concurrent systems. 
                        It involves coordinating multiple processes that each require a specific combination of resources to proceed.
                      </p>
                      <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                        <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                          <strong>Scenario:</strong>
                        </p>
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                          <li><strong>Three smokers:</strong> Each has an infinite supply of one ingredient</li>
                          <li><strong>Smoker 1</strong> has tobacco 🌿</li>
                          <li><strong>Smoker 2</strong> has paper 📄</li>
                          <li><strong>Smoker 3</strong> has matches 🔥</li>
                          <li><strong>One agent:</strong> Randomly places two different ingredients on the table</li>
                          <li><strong>Goal:</strong> The smoker with the complementary ingredient picks up the items, makes and smokes a cigarette</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-base mb-2 flex items-center gap-2 text-orange-700 dark:text-orange-300">
                        ⚠️ Why is it Considered a Problem?
                      </h4>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        This problem demonstrates several challenging aspects of process synchronization:
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                          <h5 className="font-semibold text-sm text-red-700 dark:text-red-300 mb-1">🔴 Conditional Synchronization</h5>
                          <p className="text-xs text-muted-foreground">
                            Unlike simple mutual exclusion, smokers must wait for a <strong>specific condition</strong> to be met 
                            (their two needed ingredients on the table), not just any resource availability. This requires 
                            more complex signaling mechanisms.
                          </p>
                        </div>
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <h5 className="font-semibold text-sm text-yellow-700 dark:text-yellow-300 mb-1">🟡 Generalized Semaphores Insufficient</h5>
                          <p className="text-xs text-muted-foreground">
                            This problem is notable because it <strong>cannot be solved with just basic semaphores</strong>. 
                            It requires additional logic or more sophisticated primitives like condition variables or monitors 
                            to properly coordinate the smokers.
                          </p>
                        </div>
                        <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                          <h5 className="font-semibold text-sm text-purple-700 dark:text-purple-300 mb-1">🟣 Spurious Wakeups</h5>
                          <p className="text-xs text-muted-foreground">
                            If not implemented carefully, a smoker might wake up when ingredients are placed, but they're 
                            not the <strong>right combination</strong> for them, leading to wasted wake-ups and busy waiting.
                          </p>
                        </div>
                        <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                          <h5 className="font-semibold text-sm text-orange-700 dark:text-orange-300 mb-1">🟠 Resource Starvation</h5>
                          <p className="text-xs text-muted-foreground">
                            If the agent's random selection is not truly random or fair, one smoker might get many opportunities 
                            while another waits indefinitely, demonstrating the importance of <strong>fairness</strong> in scheduling.
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
                            🏭 Manufacturing Assembly Line
                          </h5>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Scenario:</strong> An assembly line where different stations require specific combinations of parts.
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-2">
                            <li><strong>Station 1:</strong> Has chassis, needs engine + wheels</li>
                            <li><strong>Station 2:</strong> Has engine, needs chassis + wheels</li>
                            <li><strong>Station 3:</strong> Has wheels, needs chassis + engine</li>
                            <li><strong>Parts supplier (agent):</strong> Delivers two random parts at a time</li>
                            <li><strong>Synchronization needed:</strong> Each station must wait for its specific combination of parts</li>
                            <li><strong>Challenge:</strong> Coordinating when each station can proceed based on available resources</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                          <h5 className="font-semibold text-sm text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                            🔬 Chemical Reaction Coordination
                          </h5>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Scenario:</strong> Automated laboratory where reactions require specific chemical combinations.
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-2">
                            <li><strong>Reactor 1:</strong> Has acid, needs base + catalyst</li>
                            <li><strong>Reactor 2:</strong> Has base, needs acid + catalyst</li>
                            <li><strong>Reactor 3:</strong> Has catalyst, needs acid + base</li>
                            <li><strong>Chemical dispenser (agent):</strong> Provides two random chemicals</li>
                            <li><strong>Safety constraint:</strong> Reaction only proceeds when all three components present</li>
                            <li><strong>Synchronization needed:</strong> Prevent premature reactions, ensure correct combinations</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                          <h5 className="font-semibold text-sm text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                            💾 Distributed Database Transactions
                          </h5>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Scenario:</strong> Distributed system where transactions need specific data replicas to commit.
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-2">
                            <li><strong>Node A:</strong> Has primary data, needs replica 1 + replica 2 for quorum</li>
                            <li><strong>Node B:</strong> Has replica 1, needs primary + replica 2</li>
                            <li><strong>Node C:</strong> Has replica 2, needs primary + replica 1</li>
                            <li><strong>Coordinator (agent):</strong> Grants locks on two random replicas</li>
                            <li><strong>Synchronization needed:</strong> Each node waits for specific lock combination</li>
                            <li><strong>Goal:</strong> Ensure data consistency through proper quorum-based locking</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                          <h5 className="font-semibold text-sm text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-2">
                            🎮 Multiplayer Game Item Crafting
                          </h5>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Scenario:</strong> MMO game where players craft items from component combinations.
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-2">
                            <li><strong>Player 1:</strong> Has iron ore, needs wood + coal to craft tool</li>
                            <li><strong>Player 2:</strong> Has wood, needs iron ore + coal</li>
                            <li><strong>Player 3:</strong> Has coal, needs iron ore + wood</li>
                            <li><strong>Loot system (agent):</strong> Drops two random materials</li>
                            <li><strong>Synchronization needed:</strong> Players wait for their missing materials</li>
                            <li><strong>Fairness concern:</strong> Ensure all players get opportunities to craft</li>
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
                <AccordionContent className="bg-white dark:bg-slate-900 p-6 max-h-[600px] overflow-y-auto">
                  <div className="space-y-6 pb-2">
                    <div>
                      <h4 className="font-semibold text-base mb-2 flex items-center gap-2 text-green-700 dark:text-green-300">
                        <Lightbulb className="w-5 h-5" />
                        Solution Approaches
                      </h4>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        The Cigarette Smokers Problem requires more sophisticated synchronization than basic semaphores. 
                        Here are proven solution strategies:
                      </p>
                      
                      <div className="space-y-3">
                        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                          <h5 className="font-semibold text-sm text-blue-700 dark:text-blue-300 mb-2">1️⃣ Semaphore + Pusher Process Solution</h5>
                          <p className="text-sm text-muted-foreground mb-3">
                            Introduces intermediate "pusher" processes that detect ingredient combinations and signal the appropriate smoker:
                          </p>
                          <div className="bg-white dark:bg-slate-900 p-3 rounded border border-blue-200 dark:border-blue-700">
                            <code className="text-xs font-mono block whitespace-pre-wrap text-blue-900 dark:text-blue-100">
{`// Semaphores
Semaphore tobacco = 0, paper = 0, matches = 0;
Semaphore smokerTobacco = 0, smokerPaper = 0, smokerMatches = 0;
Semaphore mutex = 1;
boolean isTobacco = false, isPaper = false, isMatches = false;

// Agent process
agent() {
  while (true) {
    int combo = random(3);  // 0, 1, or 2
    if (combo == 0) {       // Tobacco + Paper
      tobacco.signal();
      paper.signal();
    } else if (combo == 1) { // Tobacco + Matches
      tobacco.signal();
      matches.signal();
    } else {                // Paper + Matches
      paper.signal();
      matches.signal();
    }
  }
}

// Pusher processes (detect combinations)
pusherTobacco() {
  while (true) {
    tobacco.wait();
    mutex.wait();
    if (isPaper) {
      isPaper = false;
      smokerMatches.signal();  // Has matches, needs T+P
    } else if (isMatches) {
      isMatches = false;
      smokerPaper.signal();    // Has paper, needs T+M
    } else {
      isTobacco = true;
    }
    mutex.signal();
  }
}

pusherPaper() { /* Similar logic */ }
pusherMatches() { /* Similar logic */ }

// Smoker processes
smokerWithMatches() {
  while (true) {
    smokerMatches.wait();  // Wait for T+P
    smoke();
  }
}`}
                            </code>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            <strong>How it solves the problem:</strong>
                            <ul className="list-disc list-inside mt-1 space-y-1 ml-2">
                              <li>Pusher processes act as intermediaries that detect ingredient combinations</li>
                              <li>Mutex protects shared boolean flags indicating which ingredients are on table</li>
                              <li>Each pusher signals the appropriate smoker when their needed ingredients are available</li>
                              <li>Prevents spurious wakeups by only signaling when correct combination present</li>
                            </ul>
                          </div>
                        </div>

                        <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                          <h5 className="font-semibold text-sm text-purple-700 dark:text-purple-300 mb-2">2️⃣ Monitor with Condition Variables</h5>
                          <p className="text-sm text-muted-foreground mb-3">
                            Uses monitors to encapsulate synchronization logic cleanly:
                          </p>
                          <div className="bg-white dark:bg-slate-900 p-3 rounded border border-purple-200 dark:border-purple-700">
                            <code className="text-xs font-mono block whitespace-pre-wrap text-purple-900 dark:text-purple-100">
{`monitor SmokersTable {
  enum Ingredient { TOBACCO, PAPER, MATCHES }
  Ingredient[] onTable = [];
  condition smokerWithTobacco, smokerWithPaper, smokerWithMatches;
  
  procedure agentPlaces(ing1, ing2) {
    onTable = [ing1, ing2];
    
    // Signal appropriate smoker
    if (has(PAPER) && has(MATCHES)) {
      signal(smokerWithTobacco);
    } else if (has(TOBACCO) && has(MATCHES)) {
      signal(smokerWithPaper);
    } else if (has(TOBACCO) && has(PAPER)) {
      signal(smokerWithMatches);
    }
  }
  
  procedure smokerTakes(hasIngredient) {
    while (!canSmoke(hasIngredient)) {
      if (hasIngredient == TOBACCO) wait(smokerWithTobacco);
      else if (hasIngredient == PAPER) wait(smokerWithPaper);
      else wait(smokerWithMatches);
    }
    onTable = [];  // Clear table
  }
  
  boolean canSmoke(hasIngredient) {
    return onTable.length == 2 && !onTable.contains(hasIngredient);
  }
}`}
                            </code>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            <strong>Advantages:</strong> Cleaner abstraction, automatic mutual exclusion, easier to verify correctness, 
                            condition variables provide precise signaling.
                          </div>
                        </div>

                        <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                          <h5 className="font-semibold text-sm text-green-700 dark:text-green-300 mb-2">
                            3️⃣ This Simulator's Approach (State-Based Event System)
                          </h5>
                          <p className="text-sm text-muted-foreground mb-3">
                            Our implementation uses React state management with clear condition checking:
                          </p>
                          <div className="bg-white dark:bg-slate-900 p-3 rounded border border-green-200 dark:border-green-700">
                            <code className="text-xs font-mono block whitespace-pre-wrap text-green-900 dark:text-green-100">
{`// State management
const [onTable, setOnTable] = useState<Ingredient[]>([]);
const [smokers, setSmokers] = useState<Smoker[]>([
  { id: 1, has: 'tobacco', needs: ['paper', 'matches'], status: 'waiting' },
  { id: 2, has: 'paper', needs: ['tobacco', 'matches'], status: 'waiting' },
  { id: 3, has: 'matches', needs: ['tobacco', 'paper'], status: 'waiting' }
]);

// Main simulation loop
useEffect(() => {
  const interval = setInterval(() => {
    setSmokers(prev => {
      const smoking = prev.find(s => s.status === 'smoking');
      
      // Case 1: Someone is smoking - finish and clear table
      if (smoking) {
        logEvent(\`Smoker \${smoking.id} finished smoking\`);
        setOnTable([]);
        setAgentStatus('idle');
        return prev.map(s => 
          s.id === smoking.id 
            ? { ...s, status: 'waiting', smokesCount: s.smokesCount + 1 }
            : s
        );
      }
      
      // Case 2: Table empty - agent places new ingredients
      if (onTable.length === 0 && agentStatus === 'idle') {
        const allIngredients = ['tobacco', 'paper', 'matches'];
        const shuffled = allIngredients.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 2);
        
        setOnTable(selected);
        setAgentStatus('placing');
        logEvent(\`Agent placed: \${selected.join(' + ')}\`);
        return prev;
      }
      
      // Case 3: Check if any smoker can proceed
      if (onTable.length === 2) {
        const canSmoke = prev.find(s => {
          // Smoker can smoke if table has both needed ingredients
          const hasAllNeeded = onTable.every(ing => s.needs.includes(ing));
          return hasAllNeeded && s.status === 'waiting';
        });
        
        if (canSmoke) {
          logEvent(\`Smoker \${canSmoke.id} (has \${canSmoke.has}) smoking\`);
          return prev.map(s =>
            s.id === canSmoke.id 
              ? { ...s, status: 'smoking' } 
              : s
          );
        }
      }
      
      return prev;
    });
  }, speed);
  
  return () => clearInterval(interval);
}, [onTable, agentStatus, speed]);`}
                            </code>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            <strong>Key Features:</strong>
                            <ul className="list-disc list-inside mt-1 space-y-1 ml-2">
                              <li>Clear state machine with three distinct cases (smoking, placing, checking)</li>
                              <li>Condition checking uses <code className="bg-green-100 dark:bg-green-900 px-1 rounded">every()</code> to verify all needed ingredients present</li>
                              <li>Immutable state updates ensure predictable behavior</li>
                              <li>Visual feedback through status changes and event logging</li>
                              <li>Random ingredient selection ensures fairness over time</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-base mb-2 flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                        <Code className="w-5 h-5" />
                        Implementation Considerations
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
                          <h5 className="font-semibold text-sm text-indigo-700 dark:text-indigo-300 mb-2">✅ Best Practices</h5>
                          <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                            <li>Use specific condition checking (not just presence of resources)</li>
                            <li>Implement fair randomization for resource allocation</li>
                            <li>Clear state transitions to avoid ambiguity</li>
                            <li>Log events for debugging conditional synchronization</li>
                            <li>Handle all possible ingredient combinations</li>
                            <li>Prevent resource leaks (clear table after smoking)</li>
                            <li>Track statistics for fairness verification</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                          <h5 className="font-semibold text-sm text-red-700 dark:text-red-300 mb-2">❌ Common Pitfalls</h5>
                          <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                            <li>Don't use basic semaphores alone (insufficient)</li>
                            <li>Avoid checking for any resources (check specific combinations)</li>
                            <li>Don't forget to clear table after use</li>
                            <li>Never wake all smokers (only wake the correct one)</li>
                            <li>Don't assume fair distribution without tracking</li>
                            <li>Avoid race conditions in combination checking</li>
                            <li>Don't let agent place ingredients while smoker is smoking</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg border-2 border-amber-300 dark:border-amber-700">
                      <h4 className="font-semibold text-base mb-2 flex items-center gap-2 text-amber-800 dark:text-amber-200">
                        💡 Key Takeaways
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                        <li>The Cigarette Smokers Problem illustrates <strong>conditional synchronization</strong> - waiting for specific conditions, not just any resource</li>
                        <li>It proves that <strong>basic semaphores are insufficient</strong> for all synchronization problems - some require additional mechanisms</li>
                        <li>Solutions typically need <strong>intermediate processes or monitors</strong> to detect and signal specific conditions</li>
                        <li>Real-world parallels include resource allocation, transaction coordination, and event-driven systems</li>
                        <li>Modern solutions often use <strong>condition variables, channels, or reactive programming</strong> patterns</li>
                        <li>Fairness in random selection is crucial to prevent starvation in practice</li>
                        <li>This problem demonstrates why higher-level synchronization primitives were developed beyond basic semaphores</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Original Explanation (Kept for quick reference) */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4 rounded-lg border-2 border-purple-200 dark:border-purple-800">
            <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
              💡 Quick Reference - How it works:
            </h4>
            <ul className="text-sm space-y-1.5 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                Each smoker has <strong>one ingredient</strong> (tobacco, paper, or matches)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                The agent places <strong>two random ingredients</strong> on the table
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                The smoker with the <strong>missing ingredient</strong> can make a cigarette
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                Semaphores ensure only <strong>one smoker smokes at a time</strong>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                After smoking, the agent places new ingredients and the cycle repeats
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
