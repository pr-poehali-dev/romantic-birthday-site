import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Index() {
  const [wishes] = useState<string[]>([
    "Желаю тебе самых ярких эмоций, бесконечного счастья и исполнения всех мечт! ❤️",
    "Пусть каждый день твоей жизни будет наполнен солнечным светом и теплыми объятиями! 🌞",
    "Желаю тебе крепкого здоровья, искренней любви и безграничного счастья! 💕",
    "Пусть все твои мечты сбываются, а сердце всегда поет от радости! 🎵",
    "Будь всегда такой же красивой, умной и неповторимой! Ты особенная! ✨",
    "Желаю тебе моря позитива, океан улыбок и вселенную любви! 🌊",
    "Пусть этот новый год жизни принесет только приятные сюрпризы! 🎁",
    "Оставайся всегда молодой душой и открытым сердцем! 💝"
  ]);
  const [hearts, setHearts] = useState<{id: number, left: number, delay: number}[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [confetti, setConfetti] = useState<{id: number, x: number, y: number, color: string, rotation: number, delay: number}[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    const generateHearts = () => {
      const newHearts = [];
      for (let i = 0; i < 15; i++) {
        newHearts.push({
          id: Date.now() + i,
          left: Math.random() * 100,
          delay: Math.random() * 8
        });
      }
      setHearts(newHearts);
    };
    
    generateHearts();
    const interval = setInterval(generateHearts, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % memories.length);
    }, 4000);
    
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          console.log('Автозапуск музыки ограничен браузером');
        });
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const generateConfetti = () => {
      const colors = ['#ff6b9d', '#c44569', '#f8b500', '#6a89cc', '#82ccdd', '#b8e994', '#ff9ff3', '#54a0ff'];
      const newConfetti = [];
      
      for (let i = 0; i < 80; i++) {
        newConfetti.push({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: -20,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          delay: Math.random() * 3
        });
      }
      
      setConfetti(newConfetti);
      
      setTimeout(() => {
        setConfetti([]);
      }, 6000);
    };
    
    const timer = setTimeout(generateConfetti, 500);
    return () => clearTimeout(timer);
  }, []);

  const playMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const memories = [
    {
      url: "https://cdn.poehali.dev/files/eedeaadc-aaa4-450f-9cf6-9f0443585045.jpg",
      caption: "Наши веселые моменты"
    },
    {
      url: "https://cdn.poehali.dev/files/dd86e54b-ac34-4cb9-820a-7910e2ced1a5.jpg", 
      caption: "Романтичный закат у озера"
    },
    {
      url: "https://cdn.poehali.dev/files/1779c9be-ad73-4fa0-8c27-d4eecc5692bd.jpg",
      caption: "Вместе навсегда"
    },
    {
      url: "https://cdn.poehali.dev/files/a9fbdf37-12ec-46ac-9d4e-ac29ee991da8.jpg",
      caption: "Счастливые моменты"
    },
    {
      url: "https://cdn.poehali.dev/files/f86c48f2-4a78-4c83-b683-3b5edbd55bac.jpg",
      caption: "В дороге жизни"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 relative overflow-hidden">
      {/* Анимированные сердечки */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="absolute text-2xl text-rose-400 animate-fall"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              top: '-50px'
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Конфетти */}
      <div className="fixed inset-0 pointer-events-none z-30">
        {confetti.map(piece => (
          <div
            key={piece.id}
            className="absolute w-3 h-3 animate-fall"
            style={{
              left: `${piece.x}%`,
              backgroundColor: piece.color,
              animationDelay: `${piece.delay}s`,
              animationDuration: '4s',
              transform: `rotate(${piece.rotation}deg)`,
              top: '-50px'
            }}
          />
        ))}
      </div>

      {/* Плавающие лепестки */}
      <div className="fixed top-10 left-10 text-pink-300 text-xl animate-float">🌸</div>
      <div className="fixed top-20 right-20 text-rose-300 text-lg animate-float-slow">🌹</div>
      <div className="fixed bottom-20 left-20 text-pink-400 text-xl animate-float">🌺</div>
      <div className="fixed bottom-32 right-32 text-rose-200 text-lg animate-float-slow">🌷</div>

      {/* Главный контент */}
      <div className="relative z-20">
        {/* Герой секция */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="mb-8">
              <img 
                src="/img/594c4a07-b451-4bd8-b468-f5037a03e132.jpg" 
                alt="Roses" 
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-rose-300 shadow-xl animate-scale-in"
              />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text text-transparent mb-6">
              С Днем Рождения!
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-700 mb-8 font-light">
              Моя дорогая, сегодня твой особенный день! ✨
            </p>
            
            <div className="flex justify-center space-x-4 text-4xl animate-bounce">
              <span className="animate-float">💕</span>
              <span className="animate-float-slow">🎂</span>
              <span className="animate-float">🎉</span>
              <span className="animate-float-slow">🌹</span>
              <span className="animate-float">💖</span>
            </div>
          </div>
        </section>

        {/* Слайдшоу воспоминаний */}
        <section className="py-20 px-4 bg-white/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-rose-600 mb-16">
              💫 Наши Воспоминания 💫
            </h2>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Главное слайдшоу */}
              <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                {memories.map((memory, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={memory.url}
                      alt={memory.caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{memory.caption}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-rose-300">💝</span>
                        <span className="text-lg opacity-90">Драгоценный момент</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Кнопки управления */}
                <button
                  onClick={() => setCurrentSlide(currentSlide === 0 ? memories.length - 1 : currentSlide - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  <Icon name="ChevronLeft" size={24} />
                </button>
                <button
                  onClick={() => setCurrentSlide((currentSlide + 1) % memories.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  <Icon name="ChevronRight" size={24} />
                </button>
              </div>
              
              {/* Индикаторы */}
              <div className="flex justify-center space-x-3 mt-6">
                {memories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-rose-500 scale-125'
                        : 'bg-rose-300 hover:bg-rose-400'
                    }`}
                  />
                ))}
              </div>
              
              {/* Миниатюры */}
              <div className="grid grid-cols-5 gap-3 mt-8">
                {memories.map((memory, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`relative h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                      index === currentSlide
                        ? 'ring-4 ring-rose-400 scale-105'
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={memory.url}
                      alt={memory.caption}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Пожелания */}
        <section className="py-20 px-4 bg-gradient-to-r from-rose-50 to-pink-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-rose-600 mb-16">
              💌 Пожелания для Тебя 💌
            </h2>
            
            {/* Список пожеланий */}
            <div className="space-y-6">
              {wishes.map((wish, index) => (
                <Card key={index} className="p-6 border-rose-200 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">💝</div>
                      <div className="flex-1">
                        <p className="text-gray-700 text-lg leading-relaxed italic">"{wish}"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Финальная секция */}
        <section className="py-20 px-4 bg-gradient-to-br from-rose-100 to-pink-100 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-rose-600 mb-8">
              🌟 Ты — Мое Все! 🌟
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Пусть этот день принесет тебе столько радости, сколько ты приносишь в мою жизнь каждый день. 
              Ты делаешь мир ярче своей улыбкой и теплее своим сердцем.
            </p>
            <div className="text-6xl animate-pulse mb-8">
              💖✨🎂✨💖
            </div>
            
            {/* Музыкальный плеер */}
            {isPlaying && (
              <div className="mt-8 flex items-center justify-center space-x-4 text-rose-600">
                <Icon name="Music" className="animate-pulse" size={24} />
                <span className="text-lg">♪ С Днем Рождения! ♪</span>
                <Button
                  onClick={playMusic}
                  variant="outline"
                  className="border-rose-300 text-rose-600 hover:bg-rose-50"
                >
                  <Icon name="Pause" className="mr-2" size={16} />
                  Пауза
                </Button>
              </div>
            )}
            
            {/* Скрытый аудиоплеер */}
            <audio
              ref={audioRef}
              loop
              preload="auto"
              className="hidden"
            >
              <source src="https://cdn.freesound.org/previews/414/414209_5063937-lq.mp3" type="audio/mpeg" />
              <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
            </audio>
          </div>
        </section>
      </div>
    </div>
  );
}