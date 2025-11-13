import { useState, useEffect } from 'react';
import { Shuffle, Swords, Shield, Zap, Trophy, Sparkles, Skull } from 'lucide-react';
import './index.css'


const CardBattleGame = () => {
  const [gameState, setGameState] = useState('setup');
  const [player, setPlayer] = useState(null);
  const [bot, setBot] = useState(null);
  const [turnPhase, setTurnPhase] = useState('select');
  const [message, setMessage] = useState('Ready to battle?');
  const [attackResult, setAttackResult] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const allCards = [
    { id: 1, name: 'Thunderclaw', type: 'Lightning', attack: 55, defense: 40, speed: 90, weakness: { Fire: 1.0, Earth: 2.0 }, color: 'from-yellow-400 to-yellow-600', icon: '⚡' },
    { id: 2, name: 'Inferno Drake', type: 'Fire', attack: 84, defense: 78, speed: 100, weakness: { Water: 2.0, Earth: 2.0 }, color: 'from-orange-500 to-red-600', icon: '🔥' },
    { id: 3, name: 'Tidecrusher', type: 'Water', attack: 83, defense: 100, speed: 78, weakness: { Lightning: 2.0, Nature: 2.0 }, color: 'from-blue-400 to-cyan-600', icon: '💧' },
    { id: 4, name: 'Verdant Titan', type: 'Nature', attack: 82, defense: 83, speed: 80, weakness: { Fire: 2.0, Frost: 2.0 }, color: 'from-green-400 to-emerald-600', icon: '🌿' },
    { id: 5, name: 'Shadow Wraith', type: 'Dark', attack: 65, defense: 60, speed: 110, weakness: { Light: 2.0, Spirit: 2.0 }, color: 'from-purple-600 to-indigo-800', icon: '👻' },
    { id: 6, name: 'Storm Wyvern', type: 'Wind', attack: 134, defense: 95, speed: 80, weakness: { Lightning: 2.0, Earth: 2.0 }, color: 'from-sky-300 to-blue-500', icon: '🌪️' },
    { id: 7, name: 'Mystic Sage', type: 'Spirit', attack: 110, defense: 90, speed: 130, weakness: { Dark: 2.0, Void: 2.0 }, color: 'from-pink-400 to-purple-500', icon: '✨' },
    { id: 8, name: 'Crystal Oracle', type: 'Light', attack: 50, defense: 45, speed: 120, weakness: { Dark: 2.0, Void: 2.0 }, color: 'from-yellow-200 to-amber-400', icon: '💎' },
    { id: 9, name: 'Iron Golem', type: 'Earth', attack: 130, defense: 80, speed: 55, weakness: { Water: 2.0, Nature: 2.0 }, color: 'from-stone-400 to-stone-600', icon: '🗿' },
    { id: 10, name: 'Mountain Colossus', type: 'Earth', attack: 120, defense: 130, speed: 45, weakness: { Water: 2.0, Nature: 2.0 }, color: 'from-amber-600 to-brown-700', icon: '⛰️' },
    { id: 11, name: 'Frost Leviathan', type: 'Frost', attack: 85, defense: 80, speed: 60, weakness: { Fire: 2.0, Lightning: 2.0 }, color: 'from-cyan-300 to-blue-400', icon: '❄️' },
    { id: 12, name: 'Blaze Hound', type: 'Fire', attack: 110, defense: 80, speed: 95, weakness: { Water: 2.0, Earth: 2.0 }, color: 'from-red-500 to-orange-700', icon: '🔥' },
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
        main: { ...main, currentDefense: main.defense },
        sub: { ...sub, currentDefense: sub.defense },
        bench: bench.map(c => ({ ...c, currentDefense: c.defense })),
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
      newPlayer.main = { ...card, currentDefense: card.defense };
      newPlayer.selectedCards.push(card);
      newPlayer.hand = newPlayer.hand.filter(c => c.id !== card.id);
    } else if (role === 'sub' && !newPlayer.sub) {
      newPlayer.sub = { ...card, currentDefense: card.defense };
      newPlayer.selectedCards.push(card);
      newPlayer.hand = newPlayer.hand.filter(c => c.id !== card.id);
    } else if (role === 'bench' && newPlayer.bench.length < 2) {
      newPlayer.bench.push({ ...card, currentDefense: card.defense });
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
      setTurnPhase('attack');
    } else if (bot.main.speed > player.main.speed) {
      setMessage('Bot strikes first! (Higher speed)');
      setGameState('botTurn');
      setTurnPhase('attack');
      setTimeout(() => executeBotTurn(), 2000);
    } else {
      setMessage('Equal speed! You go first.');
      setGameState('playerTurn');
      setTurnPhase('attack');
    }
  };

  const calculateDamage = (attacker, defender) => {
    let weaknessMultiplier = 1.0;

    if (defender.weakness[attacker.type]) {
      weaknessMultiplier = defender.weakness[attacker.type];
    }

    const totalDamage = Math.floor(attacker.attack * weaknessMultiplier);
    const remainingDefense = defender.currentDefense - totalDamage;

    return {
      baseDamage: attacker.attack,
      weaknessMultiplier,
      totalDamage,
      defenseBlocked: defender.currentDefense,
      remainingDefense: remainingDefense,
      isKnockedOut: remainingDefense <= 0
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
          updateDefenderDefense(isPlayerAttacking, result.remainingDefense);
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

      const availableCards = [...newBot.hand, newBot.sub, ...newBot.bench].filter(c => c !== null);

      if (availableCards.length === 0) {
        setBot(newBot);
        setGameState('gameOver');
        setMessage('VICTORY! You defeated all enemy fighters!');
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

      const availableCards = [...newPlayer.hand, newPlayer.sub, ...newPlayer.bench].filter(c => c !== null);

      if (availableCards.length === 0) {
        setPlayer(newPlayer);
        setGameState('gameOver');
        setMessage('DEFEAT... Bot has conquered all your fighters!');
        return;
      }

      setPlayer(newPlayer);
      setGameState('playerTurn');
      setMessage('Your fighter was defeated! Select a new Main Attacker!');
      setTurnPhase('selectNewMain');
    }
  };

  const updateDefenderDefense = (isPlayerAttacking, newDefense) => {
    if (isPlayerAttacking) {
      const newBot = { ...bot };
      newBot.main = { ...bot.main, currentDefense: newDefense };
      setBot(newBot);
    } else {
      const newPlayer = { ...player };
      newPlayer.main = { ...player.main, currentDefense: newDefense };
      setPlayer(newPlayer);
    }

    setTimeout(() => switchTurn(), 1500);
  };

  const botSelectNewMain = (botState) => {
    const availableCards = [
      ...botState.hand,
      botState.sub,
      ...botState.bench
    ].filter(c => c !== null);

    // Pick random card for prototype
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const newMain = availableCards[randomIndex];

    const newBot = { ...botState };
    newBot.main = { ...newMain, currentDefense: newMain.defense };

    if (botState.hand.find(c => c && c.id === newMain.id)) {
      newBot.hand = newBot.hand.filter(c => c && c.id !== newMain.id);
    } else if (botState.sub && botState.sub.id === newMain.id) {
      newBot.sub = null;
    } else {
      newBot.bench = newBot.bench.filter(c => c && c.id !== newMain.id);
    }

    setBot(newBot);
    setGameState('playerTurn');
    setTurnPhase('attack');
    setMessage('Bot has selected a new fighter! Your turn!');
  };

  const selectNewMain = (card) => {
    const newPlayer = { ...player };
    newPlayer.main = { ...card, currentDefense: card.defense };

    if (player.hand.find(c => c && c.id === card.id)) {
      newPlayer.hand = newPlayer.hand.filter(c => c && c.id !== card.id);
    } else if (player.sub && player.sub.id === card.id) {
      newPlayer.sub = null;
    } else {
      newPlayer.bench = newPlayer.bench.filter(c => c && c.id !== card.id);
    }

    setPlayer(newPlayer);
    setGameState('playerTurn');
    setTurnPhase('attack');
    setMessage('Your turn! Attack!');
  };

  const executeBotTurn = () => {
    setTimeout(() => executeAttack(false), 1000);
  };

  const switchTurn = () => {
    const newState = gameState === 'playerTurn' ? 'botTurn' : 'playerTurn';
    setGameState(newState);
    setTurnPhase('attack');
    setAttackResult(null);
    setMessage(newState === 'playerTurn' ? 'Your turn! Attack!' : "Bot's turn!");

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
      setMessage(`You win with ${pScore} trophies vs ${bScore}!`);
    } else if (bScore > pScore) {
      setMessage(`Bot wins with ${bScore} trophies vs ${pScore}!`);
    } else {
      setMessage(`Draw! ${pScore} trophies each!`);
    }

    setGameState('gameOver');
  };

  const CardComponent = ({ card, role, onClick, selected }) => (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br ${card.color} rounded-xl p-1 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${selected ? 'ring-4 ring-yellow-300 shadow-2xl' : ''} ${card.currentDefense < card.defense ? 'opacity-80 ring-2 ring-red-500' : ''} ${isAnimating && role === 'Main' ? 'animate-pulse' : ''}`}
      style={{ minWidth: '160px', maxWidth: '180px' }}
    >
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-3 border-2 border-slate-700">
        <div className="text-center mb-2">
          <div className="text-4xl mb-1">{card.icon}</div>
          <h3 className="font-bold text-sm text-white">{card.name}</h3>
          <div className="inline-block bg-slate-700 px-2 py-0.5 rounded text-xs text-white mt-1">
            {card.type}
          </div>
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-xs bg-red-900/30 rounded px-2 py-1">
            <span className="flex items-center text-red-300"><Swords size={14} className="mr-1" />ATK</span>
            <span className="font-bold text-white">{card.attack}</span>
          </div>
          <div className="flex items-center justify-between text-xs bg-blue-900/30 rounded px-2 py-1">
            <span className="flex items-center text-blue-300"><Shield size={14} className="mr-1" />DEF</span>
            <span className="font-bold text-white">
              {card.currentDefense !== undefined ? card.currentDefense : card.defense}
              {card.currentDefense !== card.defense && card.currentDefense !== undefined && <span className="text-gray-400 ml-1">/{card.defense}</span>}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs bg-yellow-900/30 rounded px-2 py-1">
            <span className="flex items-center text-yellow-300"><Zap size={14} className="mr-1" />SPD</span>
            <span className="font-bold text-white">{card.speed}</span>
          </div>
        </div>
        {role && (
          <div className="mt-3 text-xs text-center bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 font-bold rounded px-2 py-1">
            {role}
          </div>
        )}
      </div>
    </div>
  );

  const getAvailableCards = (playerState) => {
    return [
      ...playerState.hand,
      playerState.sub,
      ...playerState.bench
    ].filter(c => c !== null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mb-2 drop-shadow-lg">
            ⚔️ BATTLE ARENA ⚔️
          </h1>
          <div className="flex items-center justify-center gap-2">
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-2xl p-4 mb-6 border-2 border-purple-500/30 shadow-2xl">
          <p className="text-white text-center font-bold text-lg drop-shadow">{message}</p>
          {attackResult && (
            <div className="mt-3 text-white text-sm text-center space-y-1 bg-black/30 rounded-lg p-3">
              <p className="text-yellow-300">⚡ Base Attack: {attackResult.baseDamage}</p>
              <p className="text-orange-300">Weakness Multiplier: {attackResult.weaknessMultiplier}x</p>
              <p className="text-red-400 font-bold">Total Damage: {attackResult.totalDamage}</p>
              <p className="text-blue-300">Defense: {attackResult.defenseBlocked}</p>
              <p className="font-bold text-xl mt-2">
                {attackResult.isKnockedOut ?
                  'KNOCKED OUT!' :
                  `Remaining Defense: ${attackResult.remainingDefense}`
                }
              </p>
            </div>
          )}
        </div>

        {gameState === 'setup' && (
          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-bold py-4 px-12 rounded-2xl text-2xl transform transition hover:scale-110 shadow-2xl border-4 border-yellow-300"
            >
              <Shuffle className="inline mr-3" size={32} />
              START BATTLE
            </button>
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

            {turnPhase === 'attack' && gameState === 'playerTurn' && !isAnimating && (
              <div className="text-center">
                <button
                  onClick={() => executeAttack(true)}
                  className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold py-4 px-12 rounded-2xl text-2xl transform transition hover:scale-110 shadow-2xl border-4 border-red-300 animate-pulse"
                >
                  <Swords className="inline mr-3" size={32} />
                  ATTACK!
                </button>
              </div>
            )}

            {turnPhase === 'selectNewMain' && gameState === 'playerTurn' && (
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border-2 border-yellow-500">
                <h3 className="text-yellow-400 font-bold text-xl mb-4 text-center">Select New Main Attacker!</h3>
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
