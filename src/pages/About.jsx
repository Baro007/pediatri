import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, BookOpen, Target, Users, Award, Heart, Github, Mail, Globe } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const About = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Kanıta Dayalı İçerik",
      description: "AAP, ESPGHAN ve TPK kılavuzları temel alınarak hazırlanmış güncel içerik"
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "Hedef Kitle Odaklı",
      description: "Aile hekimleri ve pediatri asistanları için özel olarak tasarlanmış"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "İnteraktif Öğrenme",
      description: "Quiz sistemi ve gamification ile etkileşimli öğrenme deneyimi"
    },
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: "Başarı Takibi",
      description: "İlerleme takibi, rozetler ve başarı ölçütleri ile motivasyon"
    }
  ];

  const team = [
    {
      name: "Dr. Sadık Barış Adıgüzel",
      role: "Proje Geliştiricisi",
      description: "Pediatrik semiyoloji uzmanı ve yazılım geliştirici",
      avatar: "/api/placeholder/80/80"
    }
  ];

  const stats = [
    { label: "Bölüm", value: "4+", description: "Ana eğitim modülü" },
    { label: "Konu", value: "50+", description: "Detaylı konular" },
    { label: "Quiz", value: "100+", description: "İnteraktif sorular" },
    { label: "Saat", value: "20+", description: "Eğitim içeriği" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-xl">
                <Stethoscope size={32} className="text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent mb-6"
            >
              PediaSemio Hakkında
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Pediatrik semiyolojide kanıta dayalı, interaktif ve oyunlaştırılmış eğitim platformu. 
              Hekimlerin tanısal yetkinliğini artırmayı ve hasta bakım kalitesini yükseltmeyi hedefleyen modern bir eğitim aracı.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <Card variant="glass" className="p-8">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Misyonumuz</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Birinci basamak sağlık hizmetlerinde görev yapan aile hekimleri ile pediatri ihtisasının 
                ilk yıllarındaki asistan hekimlere, sık karşılaşılan pediatrik durumlarda kanıta dayalı, 
                sistematik ve etkili bir yaklaşım sunmak.
              </p>
            </Card>

            <Card variant="glass" className="p-8">
              <div className="flex items-center mb-4">
                <Heart className="w-8 h-8 text-red-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Vizyonumuz</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Pediatrik hasta bakımında kaliteyi artırmak, hekimlerin karar verme sürecini hızlandırmak 
                ve sonuç olarak çocuk sağlığı alanında daha iyi sonuçlar elde etmek.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Özelliklerimiz</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern teknoloji ile pediatrik eğitimi bir araya getiren kapsamlı özellikler
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 group">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Platform İstatistikleri</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="glass" className="p-6 text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-800 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.description}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Ekibimiz</h2>
            <p className="text-xl text-gray-600">
              Pediatrik semiyoloji alanında uzman ekibimiz
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">SB</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">İletişim</h2>
            <p className="text-xl text-gray-600 mb-8">
              Sorularınız, önerileriniz veya katkılarınız için bizimle iletişime geçin
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" className="flex items-center space-x-2">
                <Github size={16} />
                <span>GitHub</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Mail size={16} />
                <span>E-posta</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Globe size={16} />
                <span>Web Site</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 