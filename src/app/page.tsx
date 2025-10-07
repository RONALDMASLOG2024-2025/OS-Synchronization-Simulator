'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SleepingBarberSimulator from '@/components/SleepingBarberSimulator';
import CigaretteSmokersSimulator from '@/components/CigaretteSmokersSimulator';
import { ThemeToggle } from '@/components/theme-toggle';
import { BookOpen, Github, GraduationCap, Sparkles, Scissors, Cigarette } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('barber');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  OS Synchronization Simulator
                </h1>
                <p className="text-xs text-muted-foreground">Interactive Learning Tool for Operating Systems</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <ThemeToggle />
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-accent rounded-lg transition-colors"
                title="View on GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <Card className="mb-8 border-2 border-blue-200 dark:border-blue-900 bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-blue-950 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <GraduationCap className="w-6 h-6 text-blue-600" />
              About Synchronization Problems
            </CardTitle>
            <CardDescription>
              Understanding process coordination in concurrent systems
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              This simulator demonstrates two classic synchronization problems in operating systems. These problems
              illustrate fundamental challenges in concurrent programming: managing shared resources, preventing race
              conditions, avoiding deadlocks, and ensuring fair access to resources.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  The Sleeping Barber Problem
                </h3>
                <p className="text-xs text-muted-foreground">
                  Models coordination between a barber and customers in a barbershop with limited waiting chairs.
                  Demonstrates mutex and semaphore usage for process synchronization.
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950/50 rounded-lg border border-purple-200 dark:border-purple-800 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  The Cigarette Smokers Problem
                </h3>
                <p className="text-xs text-muted-foreground">
                  Illustrates coordination between multiple processes waiting for specific resource combinations.
                  Shows how to handle conditional synchronization.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Simulators */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-14 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 p-1.5 border-2 border-blue-200 dark:border-blue-800 shadow-lg">
            <TabsTrigger 
              value="barber" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-xl transition-all duration-300 data-[state=active]:scale-105 font-semibold text-sm"
            >
              <Scissors className="w-4 h-4 mr-2" />
              Sleeping Barber
            </TabsTrigger>
            <TabsTrigger 
              value="smokers" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-xl transition-all duration-300 data-[state=active]:scale-105 font-semibold text-sm"
            >
              <Cigarette className="w-4 h-4 mr-2" />
              Cigarette Smokers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="barber" className="space-y-4 mt-6">
            <SleepingBarberSimulator />
          </TabsContent>

          <TabsContent value="smokers" className="space-y-4 mt-6">
            <CigaretteSmokersSimulator />
          </TabsContent>
        </Tabs>

        {/* Key Concepts */}
        <Card className="mt-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Key Synchronization Concepts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg hover:shadow-md transition-all bg-white dark:bg-slate-800/50">
                <h4 className="font-semibold text-sm mb-2">🔒 Mutual Exclusion</h4>
                <p className="text-xs text-muted-foreground">
                  Ensures only one process accesses a shared resource at a time, preventing race conditions.
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:shadow-md transition-all bg-white dark:bg-slate-800/50">
                <h4 className="font-semibold text-sm mb-2">🚦 Semaphores</h4>
                <p className="text-xs text-muted-foreground">
                  Synchronization primitives used to control access to shared resources and coordinate processes.
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:shadow-md transition-all bg-white dark:bg-slate-800/50">
                <h4 className="font-semibold text-sm mb-2">⚡ Race Conditions</h4>
                <p className="text-xs text-muted-foreground">
                  Situations where the outcome depends on the timing of uncontrolled events, leading to unpredictable results.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="font-medium">Built with Next.js, TypeScript, Tailwind CSS, and ShadCN UI</p>
          <p className="mt-1">Educational tool for understanding OS synchronization problems © 2025</p>
        </div>
      </footer>
    </div>
  );
}
