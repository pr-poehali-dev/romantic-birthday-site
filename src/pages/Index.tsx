import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Index() {
  const [wishes, setWishes] = useState<{text: string, author: string}[]>([
    { text: "Желаю тебе самых ярких эмоций, бесконечного счастья и исполнения всех мечт! ❤️", author: "От твоего любимого" }
  ]);
  const [newWish, setNewWish] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [hearts, setHearts] = useState<{id: number, left: number, delay: number}[]>([]);
  
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

  const addWish = () => {
    if (newWish.trim() && newAuthor.trim()) {
      setWishes([...wishes, { text: newWish, author: newAuthor }]);
      setNewWish('');
      setNewAuthor('');
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

        {/* Секция воспоминаний */}
        <section className="py-20 px-4 bg-white/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-rose-600 mb-16">
              💫 Наши Воспоминания 💫
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memories.map((memory, index) => (
                <Card key={index} className="group overflow-hidden border-rose-200 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative">
                    <img 
                      src={memory.url} 
                      alt={memory.caption}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-medium">{memory.caption}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Интерактивные пожелания */}
        <section className="py-20 px-4 bg-gradient-to-r from-rose-50 to-pink-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-rose-600 mb-16">
              💌 Пожелания для Тебя 💌
            </h2>
            
            {/* Форма добавления пожелания */}
            <Card className="mb-12 p-6 border-rose-200 bg-white/90 backdrop-blur-sm animate-scale-in">
              <CardContent className="space-y-4">
                <h3 className="text-xl font-semibold text-rose-700 mb-4">
                  <Icon name="PenTool" className="inline mr-2" />
                  Добавить пожелание
                </h3>
                <Textarea
                  placeholder="Напишите ваше пожелание..."
                  value={newWish}
                  onChange={(e) => setNewWish(e.target.value)}
                  className="border-rose-200 focus:border-rose-400 resize-none"
                  rows={3}
                />
                <Input
                  placeholder="Ваше имя"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="border-rose-200 focus:border-rose-400"
                />
                <Button 
                  onClick={addWish}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white transition-all duration-300 hover:scale-105"
                  disabled={!newWish.trim() || !newAuthor.trim()}
                >
                  <Icon name="Heart" className="mr-2" />
                  Отправить с любовью
                </Button>
              </CardContent>
            </Card>

            {/* Список пожеланий */}
            <div className="space-y-6">
              {wishes.map((wish, index) => (
                <Card key={index} className="p-6 border-rose-200 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">💝</div>
                      <div className="flex-1">
                        <p className="text-gray-700 mb-2 italic text-lg leading-relaxed">"{wish.text}"</p>
                        <p className="text-rose-600 font-medium">— {wish.author}</p>
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
            <div className="text-6xl animate-pulse">
              💖✨🎂✨💖
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}