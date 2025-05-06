import {
  User,
  Phone,
  Mail,
  LockKeyhole,
  Facebook,
  PersonStanding,
  ArrowRight,
  ListTodo,
  Twitter,
  Youtube,
  Instagram,
  Github,
  Check,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cellphoneNumber: '',
    receiveNotify: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, password, cellphoneNumber } = formData;

    if (!name || !email || !password || !cellphoneNumber) {
      alert('Todos os campos devem ser preenchidos.');
      return;
    }

    try {
      const response = await axios.post(
        'https://organotes-backend.onrender.com/auth/signUp',
        formData,
      );

      console.log('Cadastro realizado:', response.data);

      // Redirecionar para tela de login ou dashboard
      navigate('/login');
    } catch (error: any) {
      console.error(error.message);
      alert(`Erro ao cadastrar: ${error.message}`);
    }
  };

  return (
    <>
      <main className="relative bg-[#F1F3FE]">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat -z-10"
          style={{
            backgroundImage: "url('/bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: '0px -80px',
            height: '101vh',
            width: '100%',
          }}
        ></div>

        {/* Cabeçalho */}
        <header className="pt-8 px-56 lg:px-20">
          <div className="container mx-auto flex justify-between items-center">
            <div className="py-3 flex items-center">
              <h1 className="text-4xl relative font-bold after:content-[''] after:block after:w-[85px] after:h-[2px] after:bg-black after:ml-auto lg:text-2xl">
                Organotes
              </h1>
              <img src="/logo.png" alt="Logo" className="mt-1 h-8 lg:h-6" />
            </div>

            <div>
              <div className="flex text-2xl gap-25 lg:gap-15 lg:text-xl">
                <a href="#" className="relative group inline-block p-2">
                  <h1 className="relative z-10 text-black">Planos</h1>

                  <span
                    className="absolute inset-0 border-2 border-transparent rounded-xl 
                                    transition-all duration-500 ease-in-out 
                                    group-hover:border-[#979ACB] group-hover:border-t-2 group-hover:border-b-2
                                    group-hover:border-l-2 group-hover:border-r-2"
                  ></span>
                </a>

                <a href="#" className="relative group inline-block p-2">
                  <h1 className="relative z-10 text-black">Como Usar</h1>

                  <span
                    className="absolute inset-0 border-2 border-transparent rounded-xl 
                                    transition-all duration-500 ease-in-out 
                                    group-hover:border-[#979ACB] group-hover:border-t-2 group-hover:border-b-2
                                    group-hover:border-l-2 group-hover:border-r-2"
                  ></span>
                </a>

                <a href="#" className="relative group inline-block p-2">
                  <h1 className="relative z-10 text-black">Baixar</h1>

                  <span
                    className="absolute inset-0 border-2 border-transparent rounded-xl 
                                    transition-all duration-500 ease-in-out 
                                    group-hover:border-[#979ACB] group-hover:border-t-2 group-hover:border-b-2
                                    group-hover:border-l-2 group-hover:border-r-2"
                  ></span>
                </a>

                <a href="#" className="relative group inline-block p-2">
                  <h1 className="relative z-10 text-black">FAQ</h1>

                  <span
                    className="absolute inset-0 border-2 border-transparent rounded-xl 
                                    transition-all duration-500 ease-in-out 
                                    group-hover:border-[#979ACB] group-hover:border-t-2 group-hover:border-b-2
                                    group-hover:border-l-2 group-hover:border-r-2"
                  ></span>
                </a>

                <div className="relative rounded-2xl">
                  <div className="relative bg-[#F1F3FE] rounded-3xl border-2 border-[#979ACB] px-3 group hover:border-[#434561] transition-all duration-300 ease-in-out">
                    <Link to="/" className="relative inline-block p-2">
                      <h1 className="relative z-10 text-black">Faça Login</h1>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Parte de Login */}
        <nav className="px-56 lg:px-20 mt-[200px] lg:mt-[120px] mx-auto flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3 text-4xl font-bold">
              <h1>Lembre-se</h1>
              <h1>do que importa,</h1>
              <h1>conquiste seus estudos!</h1>
            </div>

            <div className="text-3xl text-[#434561] pb-4">
              <h1>Anote. Organize. Lembre-se.</h1>
            </div>

            <div className="flex flex-row justify-between">
              <a href="#" className="text-[#434561] ">
                <div className="border border-[#434561] hover:border-[#898EC7] hover:bg-[#434561] transition delay-30 hover:text-[#F1F3FE] rounded-3xl px-11 py-1">
                  <h1 className="text-xl">Inscreva-se</h1>
                </div>
              </a>

              <a
                href="#"
                className="text-[#F1F3FE] hover:text-[#434561] transition delay-30"
              >
                <div className="border border-[#898EC7] rounded-3xl px-7 py-1 bg-[#434561] hover:bg-[#F1F3FE]">
                  <h1 className="text-xl">Seja Premium</h1>
                </div>
              </a>
            </div>
          </div>

          <div className="w-[400px] lg:w-[600px] bg-[#434561C7] lg:mt-[-10px] opacity-85 relative left-[-150px] lg:left-[-50px] top-[-20px] rounded-2xl">
            <h1 className="text-3xl text-black px-7 pt-6 mb-23 lg:mb-5 relative after:content-[''] after:block after:w-[70px] after:h-[2px] after:bg-black">
              Inscreva-se
            </h1>

            <div className="flex flex-col gap-7 px-12 w-full max-w-4xl mx-auto">
              <form onSubmit={handleSubmit}>
                {/* Grid de campos principais */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Nome */}
                  <div className="flex flex-row gap-1 bg-[#CACCE599] rounded shadow-[0_10px_30px_rgba(0,0,0,0.3)] px-2 py-3">
                    <User size={33} />
                    <div className="border-l-2 border-gray-700 h-8"></div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Digite seu nome"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-transparent outline-none px-2 text-black placeholder-gray-700 placeholder:text-lg w-full min-w-0"
                    />
                  </div>

                  {/* E-mail */}
                  <div className="flex flex-row gap-1 bg-[#CACCE599] rounded shadow-[0_10px_30px_rgba(0,0,0,0.3)] px-2 py-3">
                    <Mail size={33} />
                    <div className="border-l-2 border-gray-700 h-8"></div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Digite seu e-mail"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-transparent outline-none px-2 text-black placeholder-gray-700 placeholder:text-lg w-full"
                    />
                  </div>

                  {/* Celular */}
                  <div className="flex flex-row gap-1 bg-[#CACCE599] rounded shadow-[0_10px_30px_rgba(0,0,0,0.3)] px-2 py-3">
                    <Phone size={33} />
                    <div className="border-l-2 border-gray-700 h-8"></div>
                    <input
                      type="text"
                      name="cellphoneNumber"
                      placeholder="Digite seu número"
                      value={formData.cellphoneNumber}
                      onChange={handleChange}
                      className="bg-transparent outline-none px-2 text-black placeholder-gray-700 placeholder:text-lg w-full"
                    />
                  </div>

                  {/* Senha */}
                  <div className="flex flex-row gap-1 bg-[#CACCE599] rounded shadow-[0_10px_30px_rgba(0,0,0,0.3)] px-2 py-3">
                    <LockKeyhole size={33} />
                    <div className="border-l-2 border-gray-700 h-8"></div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Digite sua senha"
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-transparent outline-none px-2 text-black placeholder-gray-700 placeholder:text-lg w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-5 mt-7">
                  {/* Checkbox de notificações */}
                  <label className="flex justify-center items-center gap-2 text-black text-lg">
                    <input
                      type="checkbox"
                      name="receiveNotify"
                      checked={formData.receiveNotify}
                      onChange={handleChange}
                      className="w-5 h-5 text-[#434561]"
                    />
                    Deseja receber notificações?
                  </label>

                  {/* Botão de envio */}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="text-[#FFFFFF] hover:text-[#434561] transition delay-30 flex justify-center items-center"
                    >
                      <div
                        className="rounded-2xl px-15 lg:px-10 py-2 bg-[#434561] hover:bg-[#F1F3FE] 
              transition-colors duration-300 ease-in-out"
                      >
                        <h1 className="text-2xl">Inscrever-se</h1>
                      </div>
                    </button>
                  </div>
                </div>
              </form>

              {/* Redes sociais */}
              <div className="flex justify-center gap-5 mb-15 lg:mb-5">
                <a
                  href="#"
                  className="bg-[#1877F2] rounded-full w-8 h-8 flex items-center justify-center 
                                border-2 border-transparent transition-all duration-300 ease-in-out 
                                hover:border-white"
                >
                  <Facebook className="text-white w-6 h-6" />
                </a>

                <a
                  href="#"
                  className="bg-[#FFFF] rounded-full w-8 h-8 flex items-center justify-center 
                                border-2 border-transparent transition-all duration-300 ease-in-out 
                                hover:border-black"
                >
                  <img src="./google.png" className="w-5 h-5" alt="Google" />
                </a>

                <a
                  href="#"
                  className="bg-[#FFFF] rounded-full w-8 h-8 flex items-center justify-center 
                                border-2 border-transparent transition-all duration-300 ease-in-out 
                                hover:border-black"
                >
                  <img src="./vk.png" className="w-5 h-5" alt="VK" />
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Estatísticas - OrgaNotes */}
        <div className="bg-[#979ACB] h-[180px] mt-36 lg:mt-[40px] flex justify-center items-center gap-40 lg:gap-25 mb-5">
          <div className="text-[#FFFFFF]">
            <div className="text-6xl lg:text-5xl flex items-center justify-start font-bold">
              <h1 className="">+</h1>
              <h1 className="ml-2">90K</h1>
            </div>
            <p className="mt-2 ml-1">Estudantes Cadastrados</p>
          </div>

          <div className="text-[#FFFFFF]">
            <div className="flex justify-start">
              <h1 className="text-6xl lg:text-5xl font-bold">+</h1>
              <div className="flex flex-col">
                <h1 className="ml-2 text-6xl lg:text-5xl font-bold">50</h1>
                <p className="text-center mt-2">Países</p>
              </div>
            </div>
          </div>

          <div className="text-[#FFFFFF]">
            <div className="text-6xl lg:text-5xl flex items-center justify-center font-bold">
              <h1 className="">40</h1>
              <h1 className="ml-2">%</h1>
            </div>
            <p className="text-center mt-2">Produtividade Aumentada</p>
          </div>

          <div className="text-[#FFFFFF]">
            <div className="text-6xl lg:text-5xl flex items-center justify-start font-bold">
              <h1 className="">+</h1>
              <h1 className="ml-2">500K</h1>
            </div>
            <p className="text-center mt-2">Tarefas Organizadas</p>
          </div>
        </div>

        {/* Funções - OrgaNotes */}
        <div className="flex px-56 lg:px-20 gap-20 mb-25">
          <div className="flex flex-col mt-25 gap-4 items-center">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl lg:text-2xl">FUNÇÕES</h1>
              <h1 className="font-bold text-3xl lg:text-2xl">ORGANOTES</h1>
              <p className="text-2xl lg:text-xl">
                Estude com as melhores ferramentas
              </p>
              <p className="text-2xl lg:text-xl">
                e alcance seu máximo potencial.
              </p>
            </div>

            <div className="relative bg-[#F1F3FE] rounded-3xl border-2 border-[#979ACB] px-3 group hover:border-[#434561] transition-all duration-300 ease-in-out">
              <a href="#" className="relative inline-block py-1 px-4">
                <h1 className="relative z-10 text-black text-lg">Acessar</h1>
              </a>
            </div>
          </div>

          <div className="flex gap-12 lg:gap-5 items-start">
            <div className="flex flex-col items-center gap-5 py-10 bg-[#979ACB] text-[#FFF] rounded-2xl px-5 mt-40 w-[270px] shadow-2xl">
              <PersonStanding className="bg-black p-1 w-10 h-10 rounded-full" />

              <h1 className="text-2xl">Agenda</h1>

              <p className="">
                Lorem ipsum dolor sit amet consectetur. In tincidunt donec
                tellus egestas eget massa. Malesuada id felis nibh justo
                ultricies faucibus quis ornare lectus.
              </p>

              <a
                href="#"
                className="text-[#2B2C3E] text-xl flex items-center hover:text-black relative 
                            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] 
                            after:bg-current after:transition-all after:duration-300 after:delay-200 hover:after:w-full"
              >
                <p>Saiba Mais</p>
                <ArrowRight className="mt-2 h-[18px]" />
              </a>
            </div>

            <div className="flex flex-col items-center gap-5 py-10 bg-[#434561] text-[#FFF] rounded-2xl px-5 w-[270px] shadow-2xl">
              <PersonStanding className="bg-[#FFF] text-black p-1 w-10 h-10 rounded-full" />

              <h1 className="text-2xl">Agenda</h1>

              <p className="">
                Lorem ipsum dolor sit amet consectetur. In tincidunt donec
                tellus egestas eget massa. Malesuada id felis nibh justo
                ultricies faucibus quis ornare lectus.
              </p>

              <a
                href="#"
                className="text-[#FFF] text-xl flex items-center relative 
                            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] 
                            after:bg-current after:transition-all after:duration-300 after:delay-200 hover:after:w-full"
              >
                <p>Saiba Mais</p>
                <ArrowRight className="mt-2 h-[18px]" />
              </a>
            </div>

            <div className="flex flex-col items-center gap-5 py-10 bg-[#979ACB] text-[#FFF] rounded-2xl px-5 mt-40 w-[270px] shadow-2xl">
              <ListTodo className="text-[#434561] p-1 w-10 h-10" />

              <h1 className="text-2xl">Agenda</h1>

              <p className="">
                Lorem ipsum dolor sit amet consectetur. In tincidunt donec
                tellus egestas eget massa. Malesuada id felis nibh justo
                ultricies faucibus quis ornare lectus.
              </p>

              <a
                href="#"
                className="text-[#2B2C3E] text-xl flex items-center hover:text-black relative 
                            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] 
                            after:bg-current after:transition-all after:duration-300 after:delay-200 hover:after:w-full"
              >
                <p>Saiba Mais</p>
                <ArrowRight className="mt-2 h-[18px]" />
              </a>
            </div>
          </div>
        </div>

        {/* Compatibilidade - OrgaNotes*/}
        <div className="px-56 lg:px-20 flex gap-70 mb-20">
          <div className="ml-10 relative">
            <img src="/Desktop.png" alt="imagem" className="w-full h-auto" />

            <img
              src="/Frame.png"
              alt="imagem"
              className="absolute bottom-[-40px] right-[-45px] w-1/3 h-auto"
            />
          </div>

          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="flex flex-col gap-1 justify-center">
              <h1 className="text-3xl">Compatível</h1>
              <h1 className="font-bold text-3xl">Desktop e Mobile</h1>
              <p className="text-2xl">Telas intuitivas e adaptáveis para uma</p>
              <p className="text-2xl">
                experiência perfeita no desktop e mobile.
              </p>
            </div>

            <div className="relative bg-[#F1F3FE] rounded-3xl border-2 border-[#979ACB] px-3 group hover:border-[#434561] transition-all duration-300 ease-in-out">
              <a href="#" className="relative inline-block py-1 px-4">
                <h1 className="relative z-10 text-black text-lg">Acessar</h1>
              </a>
            </div>
          </div>
        </div>

        {/* Organização - OrgaNotes*/}
        <div className="h-[1025px] bg-[#898EC7] relative flex justify-center items-center">
          <div
            className="absolute w-full h-[90%] bg-cover bg-no-repeat"
            style={{
              backgroundImage: "url('/Group.png')",
              backgroundSize: '85%',
              backgroundPosition: 'center',
            }}
          ></div>

          <div className="absolute flex justify-center items-center gap-10 lg:gap-3">
            <img
              src="/calendario.png"
              alt="Calendário"
              className="w-[650px] lg:w-[500px] h-auto relative -left-20"
            />

            <div className="flex flex-col items-center gap-2 relative -top-20">
              <img src="/frase.png" alt="Frase"></img>

              <a
                href="#"
                className="text-2xl text-[#FFF] bg-[#434561] px-4 py-1 rounded-3xl transition duration-300 ease-in-out hover:bg-[#5a5d7f] hover:scale-105"
              >
                Saiba Mais
              </a>
            </div>
          </div>
        </div>

        {/* Planos - OrgaNotes*/}
        <div className="flex flex-col">
          <div className="flex">
            <div className="mt-80 px-56">
              <img src="/frase-estudo.png" alt="frase estudo"></img>
            </div>

            <div className="mt-20 mr-10">
              <img src="/mao.png" alt="mão"></img>
            </div>
          </div>

          <div className="flex gap-20 mt-40 mb-30 justify-center items-start">
            <div className="bg-[#CACCE5] h-[540px] w-[350px] relative flex flex-col rounded-3xl px-10 py-15 gap-6 shadow-lg">
              <img
                src="/etiqueta.png"
                alt="etiqueta"
                className="absolute top-0 right-0 transform translate-x-[-50px] -translate-y-3"
              />

              <div className="flex flex-col gap-1 text-[#FFF]">
                <p>Plano Gratis</p>

                <p className="text-5xl">Essencial</p>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex gap-2">
                  <Check className="text-[#434561]" />
                  <p className="text-[#FFF]">
                    Organização de matérias e tarefas
                  </p>
                </div>

                <div className="flex gap-2">
                  <Check className="text-[#434561]" />
                  <p className="text-[#FFF]">
                    Lembretes e notificações básicas
                  </p>
                </div>

                <div className="flex gap-2">
                  <Check className="text-[#434561]" />
                  <p className="text-[#FFF]">
                    Organização de matérias e tarefas
                  </p>
                </div>

                <div className="flex gap-2">
                  <Check className="text-[#434561]" />
                  <p className="text-[#FFF]">Modo de estudo com cronômetro</p>
                </div>
              </div>
            </div>

            <div className="bg-[#979ACD] h-[540px] w-[350px] relative flex flex-col rounded-3xl px-10 py-15 gap-6 shadow-lg">
              <img
                src="/etiqueta.png"
                alt="etiqueta"
                className="absolute top-0 right-0 transform translate-x-[-50px] -translate-y-3"
              />

              <img
                src="/crown.png"
                alt="etiqueta"
                className="absolute top-0 right-0 transform translate-x-8 -translate-y-11"
              />

              <div className="flex flex-col gap-1 text-[#FFF]">
                <p>Plano Pago</p>

                <p className="text-5xl">Pro</p>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex gap-2">
                  <Check className="text-[#FFF]" />
                  <p className="text-[#FFF]">Tudo do plano avançado</p>
                </div>

                <div className="flex gap-2">
                  <Check className="text-[#FFF]" />
                  <p className="text-[#FFF]">Cronograma automático</p>
                </div>

                <div className="flex gap-2">
                  <Check className="text-[#FFF]" />
                  <p className="text-[#FFF]">Sincronização com smartwatch</p>
                </div>

                <div className="flex gap-2">
                  <Check className="text-[#FFF]" />
                  <p className="text-[#FFF]">Temas personalizados</p>
                </div>
              </div>
            </div>

            <div className="bg-[#CACCE5] h-[540px] w-[350px] relative flex flex-col rounded-3xl px-10 py-15 gap-6 shadow-lg">
              <img
                src="/etiqueta.png"
                alt="etiqueta"
                className="absolute top-0 right-0 transform translate-x-[-50px] -translate-y-3"
              />

              <div className="flex flex-col gap-1 text-[#FFF]">
                <p>Plano Pago</p>

                <p className="text-5xl">Avançado</p>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex gap-2">
                  <Check className="text-[#434561]" />
                  <p className="text-[#FFF]">Tudo do plano gratuito</p>
                </div>

                <div className="flex gap-2">
                  <Check className="text-[#434561]" />
                  <p className="text-[#FFF]">Notificações personalizadas</p>
                </div>

                <div className="flex gap-2">
                  <Check className="text-[#434561]" />
                  <p className="text-[#FFF]">Recompensas por metas de estudo</p>
                </div>

                <div className="flex gap-2">
                  <Check className="text-[#434561]" />
                  <p className="text-[#FFF]">
                    Relatórios de desempenho acadêmico
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé - OrgaNotes*/}
        <footer className="bg-[#434561] h-[300px] px-25 py-10">
          <div className="flex justify-between mb-12">
            <div className="flex flex-col gap-5">
              <p className="text-[#979ACB] text-3xl font-bold">OrgaNotes</p>

              <div className="text-[#FFF] text-xl">
                <p>A melhor forma de organizar</p>
                <p>sua vida acadêmica.</p>
              </div>
            </div>

            <div className="flex gap-40 text-lg mr-20 lg:mr-0">
              {/* Empresa - OrgaNotes*/}
              <div className="flex flex-col">
                <p className="text-[#2B2C3E]">Empresa</p>

                <div className="text-[#FFF] flex flex-col gap-1">
                  <a
                    href="#"
                    className="relative transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FFF] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                  >
                    Início
                  </a>

                  <a
                    href="#"
                    className="relative transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FFF] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                  >
                    Contate-nos
                  </a>

                  <a
                    href="#"
                    className="relative transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FFF] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                  >
                    Feedbacks
                  </a>

                  <a
                    href="#"
                    className="relative transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FFF] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                  >
                    Contato
                  </a>
                </div>
              </div>

              {/* Legal - OrgaNotes*/}
              <div className="flex flex-col">
                <p className="text-[#2B2C3E]">Legal</p>

                <div className="text-[#FFF] flex flex-col gap-1">
                  <a
                    href="#"
                    className="relative transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FFF] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                  >
                    Termos
                  </a>

                  <a
                    href="#"
                    className="relative transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FFF] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                  >
                    Sobre nós
                  </a>

                  <a
                    href="#"
                    className="relative transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FFF] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                  >
                    Time
                  </a>

                  <a
                    href="#"
                    className="relative transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FFF] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                  >
                    Privacidade
                  </a>
                </div>
              </div>

              {/* Recursos - OrgaNotes*/}
              <div className="flex flex-col">
                <p className="text-[#2B2C3E]">Recursos</p>

                <div className="text-[#FFF] flex flex-col gap-1">
                  <a
                    href="#"
                    className="relative transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FFF] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                  >
                    Blog
                  </a>

                  <a
                    href="#"
                    className="relative transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FFF] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                  >
                    Serviço
                  </a>

                  <a
                    href="#"
                    className="relative transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FFF] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                  >
                    Prodduto
                  </a>

                  <a
                    href="#"
                    className="relative transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FFF] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                  >
                    Preço
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <p className="text-[#FFF]">
              Todos os direitos reservados. Copyright © 2023
            </p>

            <div className="flex gap-8 text-[#FFF]">
              <a href="#">
                <Twitter />
              </a>

              <a href="#">
                <Youtube />
              </a>

              <a href="#">
                <Instagram />
              </a>

              <a href="#">
                <Github />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export default Cadastro;
