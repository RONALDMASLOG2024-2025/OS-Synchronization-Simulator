# OS Synchronization Simulator

An interactive web-based simulator for visualizing and understanding classic synchronization problems in Operating Systems.

## 📋 Overview

This project is an educational tool designed to help students and developers understand fundamental synchronization problems in concurrent programming and operating systems. It provides interactive visualizations of two classic synchronization problems:

1. **The Sleeping Barber Problem**
2. **The Cigarette Smokers Problem**

## 🎯 Purpose

Synchronization problems are fundamental concepts in operating systems and concurrent programming. This simulator aims to:

- Provide visual representations of abstract synchronization concepts
- Demonstrate how semaphores and mutexes solve coordination issues
- Help learners understand race conditions, deadlocks, and starvation
- Offer an interactive learning experience for OS concepts

## 🔍 Problems Covered

### 1. The Sleeping Barber Problem

**Description:**  
Models a barbershop with one barber, one barber chair, and a limited number of waiting chairs. The barber sleeps when no customers are present and wakes up when a customer arrives.

**Key Challenges:**
- Managing shared resources (barber chair and waiting chairs)
- Preventing race conditions (multiple customers being served simultaneously)
- Avoiding missed signals (barber sleeping while customers wait)
- Ensuring fair access without deadlocks or starvation

**Real-World Analogy:**  
Similar to a doctor's clinic with limited waiting seats where patients must wait their turn or leave if all seats are occupied.

**Solution Approach:**  
Uses semaphores to synchronize actions:
- `mutex` semaphore for mutual exclusion
- `customers` semaphore to count waiting customers
- `barbers` semaphore to signal barber readiness

### 2. The Cigarette Smokers Problem

**Description:**  
Involves three smokers and one agent. Each smoker has an infinite supply of one ingredient (tobacco, paper, or matches). The agent places two random ingredients on the table, and the smoker with the missing ingredient makes and smokes a cigarette.

**Key Challenges:**
- Coordinating multiple independent processes
- Ensuring only the correct smoker acts when conditions are met
- Preventing multiple smokers from accessing ingredients simultaneously
- Managing turn-taking between agent and smokers

**Real-World Analogy:**  
Three chefs in a kitchen, each specializing in one ingredient. A supplier provides two ingredients at random, and only the chef with the missing ingredient can prepare the dish.

**Solution Approach:**  
Uses semaphores and mutual exclusion:
- Agent signals which smoker should proceed
- Each smoker waits for the correct ingredient combination
- Mutex ensures only one smoker acts at a time

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd os-synchronization
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5.4
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** ShadCN UI
- **React:** 19.1.0

## 📚 Features

- **Interactive Visualizations:** Watch synchronization problems unfold in real-time
- **Step-by-Step Control:** Pause, play, and step through simulations
- **Configurable Parameters:** Adjust settings like number of waiting chairs, animation speed, etc.
- **Educational Tooltips:** Learn about each component and action
- **Responsive Design:** Works on desktop and mobile devices
- **Dark Mode Support:** Easy on the eyes during late-night study sessions

## 🎓 Educational Use

This simulator is perfect for:

- Computer Science students learning Operating Systems
- Self-learners studying concurrent programming
- Instructors teaching synchronization concepts
- Anyone interested in understanding process coordination

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as an educational project for understanding OS synchronization problems.

## 🙏 Acknowledgments

- Classic synchronization problems formulated by Edsger Dijkstra and others
- Inspired by operating system textbooks and courses
- Built with modern web technologies for accessibility

## 📖 Further Reading

- [Operating System Concepts by Silberschatz, Galvin, and Gagne](https://www.os-book.com/)
- [The Little Book of Semaphores by Allen B. Downey](https://greenteapress.com/semaphores/)
- [Concurrent Programming Documentation](https://en.wikipedia.org/wiki/Concurrent_computing)

---

**Happy Learning! 🎉**

If you find this simulator helpful, please give it a star ⭐
