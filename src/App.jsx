import React, { useState, useEffect } from 'react';
import { Shuffle, Swords, Shield, Zap, Trophy, Sparkles, Skull, RefreshCw } from 'lucide-react';

import img5591 from './assets/imagesforthepresentationgame101/IMG_5591.png';
import img5593 from './assets/imagesforthepresentationgame101/IMG_5593.png';
import img5592 from './assets/imagesforthepresentationgame101/IMG_5592.png';

import img5588 from './assets/imagesforthepresentationgame101/IMG_5588.png';
import img5590 from './assets/imagesforthepresentationgame101/IMG_5590.png';
import img5589 from './assets/imagesforthepresentationgame101/IMG_5589.png';

import img5597 from './assets/imagesforthepresentationgame101/IMG_5597.png';
import img5596 from './assets/imagesforthepresentationgame101/IMG_5596.png';
import img5595 from './assets/imagesforthepresentationgame101/IMG_5595.png';

import img5583 from './assets/imagesforthepresentationgame101/IMG_5583.png';
import img5582 from './assets/imagesforthepresentationgame101/IMG_5582.png';
import img5584_1 from './assets/imagesforthepresentationgame101/IMG_5584_1.png';

import img5586 from './assets/imagesforthepresentationgame101/IMG_5586.png';
import img5587 from './assets/imagesforthepresentationgame101/IMG_5587.png';
import img5585 from './assets/imagesforthepresentationgame101/IMG_5585.png';

import "./index.css"

const CardBattleGame = () => {
  const [gameState, setGameState] = useState('setup');
  const [player, setPlayer] = useState(null);
  const [bot, setBot] = useState(null);
  const [turnPhase, setTurnPhase] = useState('select');
  const [message, setMessage] = useState('Ready to battle?');
  const [attackResult, setAttackResult] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const allCards = [
    // Water
    { id: 1, name: 'Tidalynx', element: 'Water', attack: 77, hp: 164, maxHp: 164, speed: 70, weakness: ['Light'], color: 'from-blue-400 to-cyan-600', image: img5591 },
    { id: 2, name: 'Stormfin', element: 'Water', attack: 88, hp: 164, maxHp: 164, speed: 69, weakness: ['Light'], color: 'from-blue-500 to-blue-700', image: img5593 },
    { id: 3, name: 'Hydroclast', element: 'Water', attack: 82, hp: 160, maxHp: 160, speed: 83, weakness: ['Light'], color: 'from-cyan-400 to-blue-600', image: img5592 },
  
    // Fire
    { id: 4, name: 'Blazefang', element: 'Fire', attack: 98, hp: 120, maxHp: 120, speed: 60, weakness: ['Water'], color: 'from-red-500 to-orange-700', image: img5588 },
    { id: 5, name: 'FlareStorm', element: 'Fire', attack: 89, hp: 123, maxHp: 123, speed: 87, weakness: ['Water'], color: 'from-orange-500 to-red-600', image: img5590 },
    { id: 6, name: 'FireFiend', element: 'Fire', attack: 82, hp: 160, maxHp: 160, speed: 83, weakness: ['Water'], color: 'from-red-400 to-orange-600', image: img5589 },
  
    // Leaf
    { id: 7, name: 'Leaflad', element: 'Leaf', attack: 82, hp: 160, maxHp: 160, speed: 83, weakness: ['Fire'], color: 'from-green-400 to-emerald-600', image: img5597 },
    { id: 8, name: 'Mossback', element: 'Leaf', attack: 84, hp: 180, maxHp: 180, speed: 50, weakness: ['Fire'], color: 'from-green-500 to-green-700', image: img5596 },
    { id: 9, name: 'Vinelash', element: 'Leaf', attack: 94, hp: 103, maxHp: 103, speed: 93, weakness: ['Fire'], color: 'from-lime-400 to-green-600', image: img5595 },
  
    // Dark
    { id: 10, name: 'Voidclaw', element: 'Dark', attack: 85, hp: 148, maxHp: 148, speed: 97, weakness: ['Light'], color: 'from-purple-600 to-indigo-800', image: img5583 },
    { id: 11, name: 'Nightshade', element: 'Dark', attack: 92, hp: 146, maxHp: 146, speed: 79, weakness: ['Light'], color: 'from-indigo-600 to-purple-800', image: img5582 },
    { id: 12, name: 'Umberscale', element: 'Dark', attack: 87, hp: 198, maxHp: 198, speed: 15, weakness: ['Light'], color: 'from-slate-700 to-purple-900', image: img5584_1 },
  
    // Light
    { id: 13, name: 'Lumina', element: 'Light', attack: 77, hp: 136, maxHp: 136, speed: 86, weakness: ['Dark'], color: 'from-yellow-200 to-amber-400', image: img5586 },
    { id: 14, name: 'Radiant', element: 'Light', attack: 75, hp: 125, maxHp: 125, speed: 75, weakness: ['Dark'], color: 'from-amber-300 to-yellow-500', image: img5587 },
    { id: 15, name: 'Haloglide', element: 'Light', attack: 87, hp: 95, maxHp: 95, speed: 20, weakness: ['Dark'], color: 'from-yellow-300 to-orange-400', image: img5585 },
  ];
  
  

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startGame = () => {
    const shuffled = shuffleArray(allCards);
    const half = Math.floor(shuffled.length / 2);

    const playerDeck = shuffled.slice(0, half);
    const botDeck = shuffled.slice(half);

    const newPlayer = {
      deck: playerDeck.slice(4),
      hand: playerDeck.slice(0, 4),
      main: null,
      sub: null,
      bench: [],
      trophies: [],
      selectedCards: []
    };

    const newBot = {
      deck: botDeck.slice(4),
      hand: botDeck.slice(0, 4),
      main: null,
      sub: null,
      bench: [],
      trophies: [],
      selectedCards: []
    };

    setPlayer(newPlayer);
    setBot(newBot);
    setGameState('selectCards');
    setMessage('Select your cards: 1 Main Attacker, 1 Sub, and 2 Bench');

    setTimeout(() => {
      botSelectCards(newBot);
    }, 1000);
  };

  const botSelectCards = (botState) => {
    setMessage('Bot is choosing its fighters...');

    setTimeout(() => {
      const sortedBySpeed = [...botState.hand].sort((a, b) => b.speed - a.speed);
      const main = sortedBySpeed[0];
      const sub = sortedBySpeed[1];
      const bench = sortedBySpeed.slice(2, 4);

      const updatedBot = {
        ...botState,
        main: { ...main },
        sub: { ...sub },
        bench: bench.map(c => ({ ...c })),
        selectedCards: [main, sub, ...bench],
        hand: []
      };

      setBot(updatedBot);
      setMessage('Bot has chosen! Now select your cards.');
    }, 1500);
  };

  useEffect(() => {
    if (gameState === 'selectCards' && player && bot &&
      player.selectedCards.length === 4 &&
      bot.selectedCards.length === 4) {
      setTimeout(() => determineFirstTurn(), 1000);
    }
  }, [player, bot, gameState]);

  const selectCard = (card, role) => {
    if (player.selectedCards.find(c => c.id === card.id)) {
      return;
    }

    const newPlayer = { ...player };

    if (role === 'main' && !newPlayer.main) {
      newPlayer.main = { ...card };
      newPlayer.selectedCards.push(card);
      newPlayer.hand = newPlayer.hand.filter(c => c.id !== card.id);
    } else if (role === 'sub' && !newPlayer.sub) {
      newPlayer.sub = { ...card };
      newPlayer.selectedCards.push(card);
      newPlayer.hand = newPlayer.hand.filter(c => c.id !== card.id);
    } else if (role === 'bench' && newPlayer.bench.length < 2) {
      newPlayer.bench.push({ ...card });
      newPlayer.selectedCards.push(card);
      newPlayer.hand = newPlayer.hand.filter(c => c.id !== card.id);
    }

    setPlayer(newPlayer);

    if (newPlayer.selectedCards.length === 4) {
      setMessage('Cards selected! Waiting for bot...');
    }
  };

  const determineFirstTurn = () => {
    if (player.main.speed > bot.main.speed) {
      setMessage('You strike first! (Higher speed)');
      setGameState('playerTurn');
      setTurnPhase('action');
    } else if (bot.main.speed > player.main.speed) {
      setMessage('Bot strikes first! (Higher speed)');
      setGameState('botTurn');
      setTurnPhase('action');
      setTimeout(() => executeBotTurn(), 2000);
    } else {
      setMessage('Equal speed! You go first.');
      setGameState('playerTurn');
      setTurnPhase('action');
    }
  };

  const calculateDamage = (attacker, defender) => {
    let weaknessMultiplier = 1.0;

    if (defender.weakness.includes(attacker.element)) {
      weaknessMultiplier = 2.0;
    }

    const totalDamage = Math.floor(attacker.attack * weaknessMultiplier);
    const remainingHp = defender.hp - totalDamage;

    return {
      baseDamage: attacker.attack,
      weaknessMultiplier,
      totalDamage,
      hpBefore: defender.hp,
      remainingHp: remainingHp,
      isKnockedOut: remainingHp <= 0
    };
  };

  const executeAttack = (isPlayerAttacking) => {
    setIsAnimating(true);
    const attacker = isPlayerAttacking ? player.main : bot.main;
    const defender = isPlayerAttacking ? bot.main : player.main;

    setTimeout(() => {
      const result = calculateDamage(attacker, defender);
      setAttackResult(result);

      setTimeout(() => {
        setIsAnimating(false);

        if (result.isKnockedOut) {
          handleKnockout(isPlayerAttacking, defender);
        } else {
          updateDefenderHp(isPlayerAttacking, result.remainingHp);
        }
      }, 2000);
    }, 500);
  };

  const handleKnockout = (isPlayerAttacking, defeatedCard) => {
    if (isPlayerAttacking) {
      const newPlayer = { ...player };
      newPlayer.trophies.push(defeatedCard);
      setPlayer(newPlayer);

      const newBot = { ...bot };
      newBot.main = null;

      const availableCards = [newBot.sub, ...newBot.bench].filter(c => c !== null);

      if (availableCards.length === 0) {
        setBot(newBot);
        setGameState('gameOver');
        setMessage('🎉 VICTORY! You defeated all enemy fighters!');
        return;
      }

      setBot(newBot);
      setMessage('Enemy fighter defeated! Bot selecting new main...');
      setTurnPhase('selectNewMain');
      setGameState('playerTurn');

      setTimeout(() => {
        botSelectNewMain(newBot);
      }, 2000);

    } else {
      const newBot = { ...bot };
      newBot.trophies.push(defeatedCard);
      setBot(newBot);

      const newPlayer = { ...player };
      newPlayer.main = null;

      const availableCards = [newPlayer.sub, ...newPlayer.bench].filter(c => c !== null);

      if (availableCards.length === 0) {
        setPlayer(newPlayer);
        setGameState('gameOver');
        setMessage('💀 DEFEAT... Bot has conquered all your fighters!');
        return;
      }

      setPlayer(newPlayer);
      setGameState('playerTurn');
      setMessage('Your fighter was defeated! Select a new Main Attacker!');
      setTurnPhase('selectNewMain');
    }
  };

  const updateDefenderHp = (isPlayerAttacking, newHp) => {
    if (isPlayerAttacking) {
      const newBot = { ...bot };
      newBot.main = { ...bot.main, hp: newHp };
      setBot(newBot);
    } else {
      const newPlayer = { ...player };
      newPlayer.main = { ...player.main, hp: newHp };
      setPlayer(newPlayer);
    }

    setTimeout(() => switchTurn(), 1500);
  };

  const botSelectNewMain = (botState) => {
    const availableCards = [botState.sub, ...botState.bench].filter(c => c !== null);

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const newMain = availableCards[randomIndex];

    const newBot = { ...botState };
    newBot.main = { ...newMain, hp: newMain.maxHp };

    if (botState.sub && botState.sub.id === newMain.id) {
      newBot.sub = null;
    } else {
      newBot.bench = newBot.bench.filter(c => c && c.id !== newMain.id);
    }

    setBot(newBot);
    setGameState('playerTurn');
    setTurnPhase('action');
    setMessage('Bot has selected a new fighter! Your turn!');
  };

  const selectNewMain = (card) => {
    const newPlayer = { ...player };
    newPlayer.main = { ...card, hp: card.maxHp };

    if (player.sub && player.sub.id === card.id) {
      newPlayer.sub = null;
    } else {
      newPlayer.bench = newPlayer.bench.filter(c => c && c.id !== card.id);
    }

    setPlayer(newPlayer);
    setGameState('playerTurn');
    setTurnPhase('action');
    setMessage('Your turn! Attack or Swap!');
  };

  const swapMainAndSub = () => {
    if (!player.sub) {
      setMessage('No Sub available to swap!');
      return;
    }

    const newPlayer = { ...player };
    const temp = newPlayer.main;
    newPlayer.main = newPlayer.sub;
    newPlayer.sub = temp;

    setPlayer(newPlayer);
    setMessage('Swapped Main and Sub! Turn ending...');

    setTimeout(() => switchTurn(), 1500);
  };

  const executeBotTurn = () => {
    setTimeout(() => executeAttack(false), 1000);
  };

  const switchTurn = () => {
    const newState = gameState === 'playerTurn' ? 'botTurn' : 'playerTurn';
    setGameState(newState);
    setTurnPhase('action');
    setAttackResult(null);
    setMessage(newState === 'playerTurn' ? 'Your turn! Attack or Swap!' : "Bot's turn!");

    if (newState === 'botTurn') {
      setTimeout(() => {
        executeBotTurn();
      }, 1500);
    }
  };

  const endGame = () => {
    const pScore = player.trophies.length;
    const bScore = bot.trophies.length;

    if (pScore > bScore) {
      setMessage(`🏆 You win with ${pScore} trophies vs ${bScore}!`);
    } else if (bScore > pScore) {
      setMessage(`💀 Bot wins with ${bScore} trophies vs ${pScore}!`);
    } else {
      setMessage(`⚔️ Draw! ${pScore} trophies each!`);
    }

    setGameState('gameOver');
  };

  const CardComponent = ({ card, role, onClick, selected }) => (
    <div
      onClick={onClick}
      className={`rounded-xl p-1 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${selected ? 'ring-4 ring-yellow-300 shadow-2xl' : ''} ${card.hp < card.maxHp ? 'opacity-80 ring-2 ring-red-500' : ''} ${isAnimating && role === 'Main' ? 'animate-pulse' : ''}`}
      style={{ minWidth: '200px', maxWidth: '220px' }}
    >
      <div className="w-full h-[280px] overflow-hidden">
        {/* Full Card Image */}
        <img
            src={card.image}
            alt={card.name}
            className="w-full h-full object-cover -ml-1"
            style={{
              objectPosition: "10% 18%",
              transform: "scale(1.1)",
              transformOrigin: "center"
            }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-4 border-2 border-slate-700" style={{ display: 'none' }}>
          <div className="w-full h-64 bg-slate-700 rounded-lg mb-2 flex items-center justify-center border-2 border-slate-600">
            <p className="text-slate-500 text-sm">Card Image Not Found</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg text-white">{card.name}</h3>
            <div className="inline-block bg-slate-700 px-2 py-1 rounded text-sm text-white mt-1">
              {card.element}
            </div>
          </div>
        </div>

        {/* Role Badge Overlay */}
        {role && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-center bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 font-bold rounded-full px-4 py-2 shadow-lg border-2 border-yellow-300">
            {role}
          </div>
        )}

        {/* Damage Indicator Overlay */}
        {card.hp < card.maxHp && (
          <div className="absolute top-2 right-2 bg-red-600 text-white font-bold rounded-full px-3 py-1 text-sm shadow-lg border-2 border-red-300">
            {card.hp}/{card.maxHp} HP
          </div>
        )}
      </div>
    </div>
  );

  const getAvailableCards = (playerState) => {
    return [playerState.sub, ...playerState.bench].filter(c => c !== null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mb-2 drop-shadow-lg">
            ⚔️ BATTLE ARENA ⚔️
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="text-yellow-400" />
            <p className="text-yellow-300 text-sm font-semibold">Epic Card Battles</p>
            <Sparkles className="text-yellow-400" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-2xl p-4 mb-6 border-2 border-purple-500/30 shadow-2xl">
          <p className="text-white text-center font-bold text-lg drop-shadow">{message}</p>
          {attackResult && (
            <div className="mt-3 text-white text-sm text-center space-y-1 bg-black/30 rounded-lg p-3">
              <p className="text-yellow-300">⚡ Base Attack: {attackResult.baseDamage}</p>
              <p className="text-orange-300">🎯 Weakness Multiplier: {attackResult.weaknessMultiplier}x</p>
              <p className="text-red-400 font-bold">💥 Total Damage: {attackResult.totalDamage}</p>
              <p className="text-blue-300">❤️ HP Before: {attackResult.hpBefore}</p>
              <p className="font-bold text-xl mt-2">
                {attackResult.isKnockedOut ?
                  '💥 KNOCKED OUT! 💥' :
                  `❤️ Remaining HP: ${attackResult.remainingHp}`
                }
              </p>
            </div>
          )}
        </div>

        {gameState === 'setup' && (
          <div className="text-center space-y-6">
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-bold py-4 px-12 rounded-2xl text-2xl transform transition hover:scale-110 shadow-2xl border-4 border-yellow-300"
            >
              <Shuffle className="inline mr-3" size={32} />
              START BATTLE
            </button>

            <button
              onClick={() => setShowHowToPlay(!showHowToPlay)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg border-2 border-purple-300"
            >
              {showHowToPlay ? 'Hide' : 'Show'} How to Play
            </button>

            {showHowToPlay && (
              <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border-2 border-purple-500/50 text-left max-w-4xl mx-auto max-h-96 overflow-y-auto">
                <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">📖 How to Play</h2>

                <div className="space-y-6 text-white text-sm">
                  <section>
                    <h3 className="text-xl font-bold text-orange-400 mb-3">1. Game Setup</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-200">
                      <li><strong>Deck:</strong> 12 cards total (6 per player). Each card has Attack (ATK), Health Points (HP), Speed (SPD), and an Element.</li>
                      <li><strong>Team Composition:</strong>
                        <ul className="list-disc list-inside ml-6 mt-1">
                          <li><strong className="text-red-400">Main Attacker</strong> – the active combatant</li>
                          <li><strong className="text-blue-400">Sub</strong> – first backup, can swap with Main</li>
                          <li><strong className="text-green-400">Bench</strong> – two reserve cards</li>
                        </ul>
                      </li>
                      <li>Press START BATTLE, shuffle, split the deck evenly, then each player selects their Main, Sub, and Bench.</li>
                      <li><strong>Turn order:</strong> Decided by the highest SPD among the two Main attackers; the faster Main moves first.</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-orange-400 mb-3">2. Turn Structure</h3>
                    <div className="bg-black/30 p-4 rounded-lg space-y-2">
                      <div>
                        <p className="font-semibold text-yellow-300">Your Turn:</p>
                        <ul className="list-disc list-inside ml-4 text-gray-300">
                          <li>Click <strong className="text-red-400">ATTACK</strong> to damage opponent's Main</li>
                          <li>Click <strong className="text-blue-400">SWAP</strong> to exchange Main ↔ Sub (forfeit attack, end turn)</li>
                          <li>If opponent's Main is knocked out, they choose a new Main from Sub/Bench (enters with full HP)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-yellow-300">Bot/Opponent Turn:</p>
                        <ul className="list-disc list-inside ml-4 text-gray-300">
                          <li>Automatic attack using the same damage calculation</li>
                        </ul>
                      </div>
                      <p className="text-gray-400 italic">Turns repeat until a win condition is met.</p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-orange-400 mb-3">3. Combat Mechanics</h3>
                    <div className="bg-black/30 p-4 rounded-lg space-y-3">
                      <p className="font-semibold text-yellow-300">Damage Formula:</p>
                      <div className="text-sm space-y-1 text-gray-300 ml-4">
                        <p><strong>Damage = ATK × Weakness Multiplier</strong></p>
                        <p>• Weakness Multiplier = <strong>1</strong> (normal) or <strong>2</strong> (attacking a card's elemental weakness)</p>
                      </div>
                      <div className="mt-3">
                        <p className="font-semibold text-blue-300">Attack Sequence:</p>
                        <ol className="list-decimal list-inside ml-4 text-gray-300 text-sm">
                          <li>Compute damage</li>
                          <li>Subtract damage from the defender's current HP</li>
                          <li>If HP &gt; 0 → defender stays in play with reduced HP</li>
                          <li>If HP ≤ 0 → defender is knocked out and becomes a trophy</li>
                        </ol>
                      </div>
                      <p className="text-purple-400 font-semibold mt-2">⚠️ HP Persistence: Remaining HP carries over to the next attack on that card.</p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-orange-400 mb-3">4. Trophy & Victory Conditions</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-200">
                      <li><strong className="text-purple-400">Knockout Trophy:</strong> Each knocked-out card adds one trophy to the attacker's count (shown next to player names)</li>
                      <li><strong className="text-green-400">Complete Victory:</strong> Opponent has no cards left (Main, Sub, and Bench are all eliminated)</li>
                      <li><strong className="text-yellow-400">Early End:</strong> Click "End Game" - the player with the most trophies wins</li>
                    </ul>
                  </section>

                  <section className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 p-4 rounded-lg border-2 border-blue-500/50">
                    <h3 className="text-xl font-bold text-cyan-400 mb-3">⚡ Quick Reference Cheat Sheet</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-200 text-sm">
                      <li><strong>Turn Order:</strong> Higher SPD → first</li>
                      <li><strong>Attack:</strong> Press ATTACK, apply ATK × (1 or 2)</li>
                      <li><strong>Swap:</strong> Exchange Main ↔ Sub, forfeit attack, end turn</li>
                      <li><strong>HP:</strong> Carries over between attacks</li>
                      <li><strong>KO:</strong> HP ≤ 0 → trophy earned, pick new Main (full HP)</li>
                      <li><strong>Win:</strong> Eliminate all opponent cards or have the most trophies when ending early</li>
                    </ul>
                  </section>
                </div>
              </div>
            )}
          </div>
        )}

        {gameState === 'selectCards' && player && bot && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur rounded-2xl p-6 border-2 border-slate-700">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4 text-center drop-shadow-lg">Choose Your Fighters</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {player.hand.map(card => (
                  <div key={card.id}>
                    <CardComponent card={card} selected={player.selectedCards.find(c => c.id === card.id)} />
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => selectCard(card, 'main')}
                        disabled={player.main}
                        className="bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white text-xs px-3 py-2 rounded-lg flex-1 disabled:opacity-30 disabled:cursor-not-allowed font-bold shadow-lg"
                      >
                        Main
                      </button>
                      <button
                        onClick={() => selectCard(card, 'sub')}
                        disabled={player.sub}
                        className="bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-xs px-3 py-2 rounded-lg flex-1 disabled:opacity-30 disabled:cursor-not-allowed font-bold shadow-lg"
                      >
                        Sub
                      </button>
                      <button
                        onClick={() => selectCard(card, 'bench')}
                        disabled={player.bench.length >= 2}
                        className="bg-gradient-to-br from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white text-xs px-3 py-2 rounded-lg flex-1 disabled:opacity-30 disabled:cursor-not-allowed font-bold shadow-lg"
                      >
                        Bench
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {bot.selectedCards.length === 4 && (
              <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur rounded-2xl p-6 border-2 border-red-500">
                <h2 className="text-2xl font-bold text-red-300 mb-4 text-center">Bot's Team</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {bot.main && <CardComponent card={bot.main} role="Main" />}
                  {bot.sub && <CardComponent card={bot.sub} role="Sub" />}
                  {bot.bench.map((card, idx) => card && <CardComponent key={idx} card={card} role="Bench" />)}
                </div>
              </div>
            )}
          </div>
        )}

        {(gameState === 'playerTurn' || gameState === 'botTurn') && player && bot && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur-xl rounded-2xl p-6 border-2 border-red-500/50 shadow-2xl">
                <h2 className="text-2xl font-bold text-red-300 mb-4 flex items-center justify-between">
                  <span className="flex items-center"><Skull className="mr-2" /> BOT</span>
                  <span className="flex items-center text-lg bg-purple-900/50 px-3 py-1 rounded-lg">
                    <Trophy className="mr-2" size={20} />
                    {bot.trophies.length}
                  </span>
                </h2>
                {bot.main && (
                  <div className="flex justify-center">
                    <CardComponent card={bot.main} role="Main" />
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-xl rounded-2xl p-6 border-2 border-blue-500/50 shadow-2xl">
                <h2 className="text-2xl font-bold text-blue-300 mb-4 flex items-center justify-between">
                  <span className="flex items-center"><Sparkles className="mr-2" /> YOU</span>
                  <span className="flex items-center text-lg bg-purple-900/50 px-3 py-1 rounded-lg">
                    <Trophy className="mr-2" size={20} />
                    {player.trophies.length}
                  </span>
                </h2>
                {player.main && (
                  <div className="flex justify-center">
                    <CardComponent card={player.main} role="Main" />
                  </div>
                )}
              </div>
            </div>

            {turnPhase === 'action' && gameState === 'playerTurn' && !isAnimating && (
              <div className="text-center space-y-4">
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => executeAttack(true)}
                    className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold py-4 px-12 rounded-2xl text-2xl transform transition hover:scale-110 shadow-2xl border-4 border-red-300 animate-pulse"
                  >
                    <Swords className="inline mr-3" size={32} />
                    ATTACK!
                  </button>

                  <button
                    onClick={swapMainAndSub}
                    disabled={!player.sub}
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-4 px-12 rounded-2xl text-2xl transform transition hover:scale-110 shadow-2xl border-4 border-blue-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className="inline mr-3" size={32} />
                    SWAP
                  </button>
                </div>
                <p className="text-gray-400 text-sm">Swap will exchange your Main and Sub, then end your turn</p>
              </div>
            )}

            {turnPhase === 'selectNewMain' && gameState === 'playerTurn' && (
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border-2 border-yellow-500">
                <h3 className="text-yellow-400 font-bold text-xl mb-4 text-center">⚠️ Select New Main Attacker! ⚠️</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {getAvailableCards(player).map(card => (
                    <div key={card.id} onClick={() => selectNewMain(card)} className="cursor-pointer">
                      <CardComponent card={card} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={endGame}
                className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-3 px-8 rounded-xl shadow-lg border-2 border-gray-500"
              >
                End Game
              </button>
            </div>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-2xl p-8 border-2 border-yellow-500 shadow-2xl">
              <p className="text-4xl font-bold text-yellow-400 mb-4">{message}</p>
              <div className="flex justify-center gap-8 text-2xl">
                <div className="bg-blue-900/50 px-6 py-4 rounded-xl">
                  <p className="text-blue-300">Your Trophies</p>
                  <p className="text-4xl font-bold text-white">{player.trophies.length}</p>
                </div>
                <div className="bg-red-900/50 px-6 py-4 rounded-xl">
                  <p className="text-red-300">Bot Trophies</p>
                  <p className="text-4xl font-bold text-white">{bot.trophies.length}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-bold py-4 px-12 rounded-2xl text-2xl transform transition hover:scale-110 shadow-2xl border-4 border-yellow-300"
            >
              <Sparkles className="inline mr-3" size={28} />
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardBattleGame;
