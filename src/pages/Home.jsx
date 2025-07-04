import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Award, 
  Target, 
  TrendingUp, 
  Heart, 
  Stethoscope,
  Brain,
  ArrowRight,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Kanıta Dayalı İçerik',
      description: 'AAP, ESPGHAN ve TPK kılavuzlarına dayalı güncel bilgiler',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Brain,
      title: 'Interaktif Öğrenme',
      description: 'Oyunlaştırılmış eğitim modülleri ve interaktif örnekler',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Target,
      title: 'Pratik Araçlar',
      description: 'Doz hesaplayıcı, skorlama sistemleri ve tarama araçları',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: TrendingUp,
      title: 'İlerleme Takibi',
      description: 'Öğrenme ilerlemenizi takip edin ve rozetler kazanın',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const chapters = [
    {
      id: 'fundamentals',
      title: 'Temel İlkeler',
      subtitle: 'Pediatrik anamnez ve fizik muayene',
      progress: 85,
      topics: 12,
      duration: '45 dk',
      icon: Stethoscope,
      color: 'primary'
    },
    {
      id: 'development',
      title: 'Gelişimsel Değerlendirme',
      subtitle: 'Büyüme ve gelişim basamakları',
      progress: 60,
      topics: 8,
      duration: '30 dk',
      icon: Users,
      color: 'secondary'
    },
    {
      id: 'systems',
      title: 'Sistem Semiyolojisi',
      subtitle: 'Organ sistemlerine göre yaklaşım',
      progress: 40,
      topics: 15,
      duration: '75 dk',
      icon: Heart,
      color: 'success'
    },
    {
      id: 'tools',
      title: 'Pratik Araçlar',
      subtitle: 'Skorlama sistemleri ve hesaplayıcılar',
      progress: 90,
      topics: 6,
      duration: '20 dk',
      icon: Award,
      color: 'warning'
    }
  ];

  const stats = [
    { label: 'Aktif Kullanıcı', value: '2,500+', icon: Users },
    { label: 'Tamamlanan Modül', value: '15,000+', icon: CheckCircle },
    { label: 'Ortalama Puan', value: '4.8/5', icon: Star },
    { label: 'Güncelleme', value: 'Haftalık', icon: Clock }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Pediatrik Semiyoloji
                <span className="block text-gradient">Rehberi</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Kanıta dayalı, interaktif ve kapsamlı pediatrik semiyoloji eğitimi. 
                Hekimler için güvenilir bilgi kaynağı ve pratik araçlar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/chapters">
                  <Button size="lg" icon={BookOpen}>
                    Eğitime Başla
                  </Button>
                </Link>
                <Link to="/chapters">
                  <Button size="lg" variant="outline" icon={Target}>
                    Araçları Keşfet
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Neden PediaSemio?
            </h2>
            <p className="text-lg text-gray-600">
              Modern tıp eğitimi için tasarlanmış özellikler
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <Card.Title className="mb-2">{feature.title}</Card.Title>
                  <Card.Subtitle>{feature.description}</Card.Subtitle>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Eğitim Modülleri
            </h2>
            <p className="text-lg text-gray-600">
              Sistematik ve aşamalı öğrenme
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/chapters/${chapter.id}`}>
                  <Card hover className="relative overflow-hidden">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-${chapter.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <chapter.icon className={`w-6 h-6 text-${chapter.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <Card.Title className="mb-1">{chapter.title}</Card.Title>
                        <Card.Subtitle className="mb-3">{chapter.subtitle}</Card.Subtitle>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span>{chapter.topics} konu</span>
                          <span>{chapter.duration}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex-1 mr-4">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">İlerleme</span>
                              <span className="font-medium">{chapter.progress}%</span>
                            </div>
                            <div className="progress-bar h-2">
                              <div 
                                className="progress-fill" 
                                style={{ width: `${chapter.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                            Devam Et
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Hemen Başlayın
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Pediatrik semiyoloji bilginizi güçlendirin ve güven kazanın
            </p>
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 focus:ring-white">
              Ücretsiz Hesap Oluştur
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 