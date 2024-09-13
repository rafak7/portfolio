'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GithubIcon, LinkedinIcon, MailIcon, FileTextIcon, ExternalLinkIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import { FaJava, FaReact, FaPython, FaDocker, FaGitAlt } from 'react-icons/fa'
import { SiSpringboot, SiKotlin, SiJavascript, SiNextdotjs, SiRabbitmq, SiMongodb } from 'react-icons/si'

// Mock data for GitHub projects
const projects = [
  {
    name: "Blueguard",
    description: "Blueguard é uma aplicação Java robusta desenvolvida com Spring Boot, Lombok e HATEOAS. O projeto oferece um conjunto de APIs RESTful para gerenciar áreas marinhas, comunidades, marcações, observações e qualidade da água. Ele é projetado para ser escalável, fácil de manter e altamente eficiente.",
    url: "https://github.com/rafak7/GlobalSolution-JAVA",
    technologies: ["Java", "Spring Boot", "Lombok", "HATEOAS", "APIS"],
    image: "/images/blueguard.png"
  },
  {
    name: "Shop App",
    description: "Este App foi criado na intenção de aprimorar meus conhecimentos em Next.js, Tailwind CSS. Foi utilizado Next.js para criar as rotas da aplicação, criando uma loja de roupas com carrinho de compras funcional.",
    url: "https://github.com/rafak7/shopApp",
    liveUrl: "https://shop-liwx6uv2h-rafak7s-projects.vercel.app/",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/images/shop.png"
  },
  {
    name: "Encurtador de URL",
    description: "O objetivo é transformar URLs longas em versões mais compactas e fáceis de compartilhar. O serviço permite aos usuários inserir uma URL longa e obter uma versão curta que redireciona para a original. Além disso, inclui funcionalidades como monitoramento de cliques e análise de dados de uso.",
    url: "https://github.com/rafak7/encurtadorLinks-Spring",
    liveUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7217565917088497665/",
    technologies: ["Java", "Spring Boot", "Docker", "MongoDB"],
    image: "/images/links.png"
  }
]

// List of technologies/skills
const skills = [
  { name: "Java", icon: FaJava },
  { name: "Spring Boot", icon: SiSpringboot },
  { name: "Kotlin", icon: SiKotlin },
  { name: "React", icon: FaReact },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Python", icon: FaPython },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Docker", icon: FaDocker },
  { name: "RabbitMQ", icon: SiRabbitmq },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Git", icon: FaGitAlt }
]

// Mock data for work experience
const workExperience = [
  {
    company: "Net4Guest",
    position: "Estágio em Suporte Técnico",
    period: "05/2023 - Atualmente",
    description: "Atuando como estagiário em Suporte Técnico na Net4Guest. Responsabilidades incluem oferecer suporte aos usuários, resolver problemas técnicos, realizar manutenção preventiva e corretiva em sistemas e equipamentos, além de colaborar na implementação de soluções tecnológicas.",
    achievements: [
      "Desenvolvimento de habilidades em diagnóstico e resolução de problemas",
      "Aprimoramento de sistemas e atendimento ao cliente",
      "Foco em eficiência e qualidade no serviço prestado"
    ]
  }
]

// Mock data for education
const education = [
  {
    institution: "FIAP",
    degree: "Análise e Desenvolvimento de Sistemas",
    period: "CURSANDO",
    experience: "Experiência acadêmica",
    subjects: [
      "Domain Driven Design",
      "Responsive Web Development",
      "AI & Chatbot",
      "Advanced Business Development with .NET",
      "DevOps Tools & Cloud Computing",
      "Java Advanced",
      "Mobile Application Development",
      "Mastering Relational and Non-Relational Database",
      "Disruptive Architectures: IoT, IoB & Generative AI"
    ],
    description: "Curso abrangente focado em tecnologias modernas e práticas de desenvolvimento de software, preparando para os desafios do mercado de TI."
  }
]

// Certifications
const certifications = [
  {
    name: "Java: aplicando a Orientação a Objetos",
    issuer: "Alura",
    date: "2023",
    url: "https://cursos.alura.com.br/user/rafael-linoseabra/course/java-aplicando-orientacao-objetos/certificate",
    image: "/images/java.png"
  },
  {
    name: "Python: começando com a linguagem",
    issuer: "Alura",
    date: "2022",
    url: "https://cursos.alura.com.br/user/rafael-linoseabra/course/python-introducao-a-linguagem/certificate",
    image: "/images/python.png"
  },
  {
    name: "React Native: criando um app",
    issuer: "Alura",
    date: "2022",
    url: "https://cursos.alura.com.br/user/rafael-linoseabra/course/react-native-comecando-zero/certificate",
    image: "/images/reactn.png"
  },
  {
    name: "Flask: crie uma webapp com Python",
    issuer: "Alura",
    date: "2023",
    url: "https://cursos.alura.com.br/user/rafael-linoseabra/course/flask-crie-webapp-python/certificate",
    image: "/images/flask1.png"
  },
  {
    name: "Flask: avançando no desenvolvimento web com Python",
    issuer: "Alura",
    date: "2023",
    url: "https://cursos.alura.com.br/user/rafael-linoseabra/course/flask-desenvolvimento-web/certificate",
    image: "/images/flask2.png"
  },
  {
    name: "Django: templates e boas práticas",
    issuer: "Alura",
    date: "2023",
    url: "https://cursos.alura.com.br/user/rafael-linoseabra/course/django-templates-boas-praticas/certificate",
    image: "/images/django.png"
  }
]

const MotionCard = motion(Card)

export function EnhancedPortfolioComponent() {
  const [activeTab, setActiveTab] = useState("projects")
  const [showChallenge, setShowChallenge] = useState(true)
  const [userInput, setUserInput] = useState("")

  useEffect(() => {
    const hasCompletedChallenge = localStorage.getItem("challengeCompleted")
    if (hasCompletedChallenge) {
      setShowChallenge(false)
    }
  }, [])

  const handleResumeClick = () => {
    window.open('/resume.pdf', '_blank')
  }

  const handleChallengeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userInput.trim().toLowerCase() === "</div>") {
      setShowChallenge(false)
      localStorage.setItem("challengeCompleted", "true")
    } else {
      alert("Incorreto! Tente novamente.")
    }
  }

  if (showChallenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-purple-300">Bem-vindo, Desenvolvedor!</h2>
          <p className="mb-4">Para acessar o site, você precisa resolver este simples desafio de codificação:</p>
          <pre className="bg-gray-700 p-4 rounded mb-4 overflow-x-auto">
            <code>
              {`<div>
  <h1>Olá, Mundo!</h1>
  <p>Esta div não está fechada corretamente.</p>`}
            </code>
          </pre>
          <p className="mb-4">O que está faltando para fechar a div corretamente?</p>
          <form onSubmit={handleChallengeSubmit} className="flex flex-col">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Digite o código faltante"
              className="p-2 mb-4 bg-gray-700 text-white rounded"
            />
            <button type="submit" className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition-colors">
              Enviar
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-purple-600 to-indigo-600">
        <motion.h1 
          className="text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Rafael Lino
        </motion.h1>
        <motion.p 
          className="text-2xl text-purple-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Desenvolvedor Backend
        </motion.p>
        <motion.div 
          className="mt-8 flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="https://github.com/rafak7" className="text-white hover:text-purple-200 transition-colors" target="_blank" rel="noopener noreferrer">
            <GithubIcon size={24} />
          </a>
          <a href="https://www.linkedin.com/in/rafael-lino7/" className="text-white hover:text-purple-200 transition-colors" target="_blank" rel="noopener noreferrer">
            <LinkedinIcon size={24} />
          </a>
          <a href="mailto:your.email@example.com" className="text-white hover:text-purple-200 transition-colors">
            <MailIcon size={24} />
          </a>
        </motion.div>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button variant="outline" className="bg-white text-purple-600 hover:bg-purple-100" onClick={handleResumeClick}>
            <FileTextIcon className="mr-2 h-4 w-4" /> Ver Currículo
          </Button>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-gray-800 p-1 rounded-lg">
            <TabsTrigger 
              value="projects" 
              className="px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded"
            >
              Projetos
            </TabsTrigger>
            <TabsTrigger 
              value="skills" 
              className="px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded"
            >
              Habilidades
            </TabsTrigger>
            <TabsTrigger 
              value="experience" 
              className="px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded"
            >
              Experiência
            </TabsTrigger>
            <TabsTrigger 
              value="education" 
              className="px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded"
            >
              Educação
            </TabsTrigger>
            <TabsTrigger 
              value="certifications" 
              className="px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded"
            >
              Certificações
            </TabsTrigger>
          </TabsList>
          <TabsContent value="projects">
            <section className="mb-20">
              <motion.h2 
                className="text-3xl font-bold mb-8 text-center text-purple-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Meus Projetos
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {projects.map((project, index) => (
                  <MotionCard 
                    key={index}
                    className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300 ease-in-out transform hover:-translate-y-2 w-full max-w-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CardHeader>
                      <Image src={project.image} alt={project.name} width={300} height={200} className="rounded-t-lg" />
                      <CardTitle className="text-xl font-semibold text-purple-300 mt-4">{project.name}</CardTitle>
                      <CardDescription className="text-gray-400">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="bg-purple-700 text-purple-100">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          <GithubIcon className="w-4 h-4 mr-2" />
                          View on GitHub
                        </a>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            <ExternalLinkIcon className="w-4 h-4 mr-2" />
                            Visit Site
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </MotionCard>
                ))}
              </div>
            </section>
          </TabsContent>
          <TabsContent value="skills">
            <section>
              <motion.h2 
                className="text-3xl font-bold mb-8 text-center text-purple-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Habilidades & Tecnologias
              </motion.h2>
              <motion.div 
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex flex-col items-center"
                  >
                    <Badge 
                      variant="outline" 
                      className="text-purple-300 border-purple-500 hover:bg-purple-800 transition-colors px-3 py-1 text-sm flex items-center gap-2"
                    >
                      <skill.icon className="w-5 h-5" />
                      {skill.name}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          </TabsContent>
          <TabsContent value="experience">
            <section>
              <motion.h2 
                className="text-3xl font-bold mb-8 text-center text-purple-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Experiência Profissional
              </motion.h2>
              <div className="space-y-8">
                {workExperience.map((job, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-800 p-6 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-semibold text-purple-300">{job.position}</h3>
                    <p className="text-gray-400">{job.company} | {job.period}</p>
                    <p className="mt-2 text-gray-300">{job.description}</p>
                    <ul className="mt-4 list-disc list-inside text-gray-300">
                      {job.achievements.map((achievement, achIndex) => (
                        <li key={achIndex}>{achievement}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>
          </TabsContent>
          <TabsContent value="education">
            <section>
              <motion.h2 
                className="text-3xl font-bold mb-8 text-center text-purple-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Educação
              </motion.h2>
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-800 p-6 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-semibold text-purple-300">{edu.degree}</h3>
                    <p className="text-gray-400">{edu.institution} | {edu.period}</p>
                    <p className="mt-2 text-gray-300">{edu.experience}</p>
                    <p className="mt-2 text-gray-300">{edu.description}</p>
                    <h4 className="mt-4 font-semibold text-purple-200">Subjects:</h4>
                    <ul className="mt-2 list-disc list-inside text-gray-300">
                      {edu.subjects.map((subject, subIndex) => (
                        <li key={subIndex}>{subject}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>
          </TabsContent>
          <TabsContent value="certifications">
            <section>
              <motion.h2 
                className="text-3xl font-bold mb-8 text-center text-purple-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Certificações
              </motion.h2>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-800 p-4 rounded-lg flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Image 
                      src={cert.image} 
                      alt={cert.name} 
                      width={80} 
                      height={80} 
                      className="mr-4 rounded"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-purple-300">{cert.name}</h3>
                      <p className="text-gray-400">{cert.issuer} | {cert.date}</p>
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                        View Certificate
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="mt-20 py-8 text-center text-gray-400">
        <p>&copy; 2024 Rafael Lino. All rights reserved.</p>
      </footer>
    </div>
  )
}