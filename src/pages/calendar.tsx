import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import {
  Search,
  ChevronRight,
  MessageCircleQuestion,
  SquareArrowRight,
  Settings,
  CalendarDays,
  Menu,
  Plus,
} from 'lucide-react';
import { format, addDays, startOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { motion, AnimatePresence } from 'framer-motion';

function Calendar() {
  type Evento = {
    titulo: string;
    dia: number; // 0 a 6 (Seg a Dom)
    hora: string; // formato "HH:00"
  };

  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    const eventosSalvos = localStorage.getItem('eventos');
    if (eventosSalvos) {
      setEventos(JSON.parse(eventosSalvos));
    }
  }, []);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tituloEvento, setTituloEvento] = useState('');
  const [diaEvento, setDiaEvento] = useState('0'); // 0 = Segunda
  const [horaEvento, setHoraEvento] = useState('07:00');

  const handleSalvarEvento = () => {
    const horaValida = /^([0-9]{2}):([0-9]{2})$/.test(horaEvento);
    const [h, m] = horaEvento.split(':').map(Number);

    if (!tituloEvento.trim()) {
      alert('Digite um título para o evento.');
      return;
    }

    if (!horaValida || h < 5 || h > 23 || (h === 23 && m > 0)) {
      alert('A hora deve estar entre 05:00 e 23:00.');
      return;
    }

    setEventos([
      ...eventos,
      {
        titulo: tituloEvento,
        dia: parseInt(diaEvento, 10),
        hora: horaEvento,
      },
    ]);

    // Resetar e fechar modal
    setTituloEvento('');
    setDiaEvento('0');
    setHoraEvento('07:00');
    setMostrarFormulario(false);

    const novosEventos = [
      ...eventos,
      {
        titulo: tituloEvento,
        dia: parseInt(diaEvento, 10),
        hora: horaEvento,
      },
    ];
    setEventos(novosEventos);
    localStorage.setItem('eventos', JSON.stringify(novosEventos));
  };

  const [termoBusca, setTermoBusca] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  const [darkMode, setDarkMode] = useState(false);

  const [view, setView] = useState<'semana' | 'mes' | 'ano'>('semana');

  const hours = Array.from(
    { length: 17 }, // de 05:00 até 23:00 => 19 horas
    (_, i) => `${(i + 7).toString().padStart(2, '0')}:00`,
  );

  const days = [
    { label: 'Seg', emoji: '🧘‍♂️' },
    { label: 'Ter', emoji: '☕' },
    { label: 'Qua', emoji: '🐪' },
    { label: 'Qui', emoji: '🧠' },
    { label: 'Sex', emoji: '🍸' },
    { label: 'Sáb', emoji: '🎨' },
    { label: 'Dom', emoji: '🐱' },
  ];

  const coresDias = [
    'bg-orange-300', // Seg
    'bg-blue-300', // Ter
    'bg-yellow-300', // Qua
    'bg-green-300', // Qui
    'bg-pink-300', // Sex
    'bg-purple-300', // Sáb
    'bg-red-300', // Dom
  ];

  const dataAtual = new Date();

  const getFormattedDate = () => {
    if (view === 'semana') {
      const start = new Date(dataAtual);
      const end = new Date(dataAtual);
      const day = dataAtual.getDay();

      start.setDate(dataAtual.getDate() - ((day + 6) % 7));

      end.setDate(start.getDate() + 6);

      const inicio = format(start, 'dd', { locale: ptBR });
      const fim = format(end, "dd 'de' MMMM yyyy", { locale: ptBR });

      return `${inicio} - ${fim}`;
    } else if (view === 'mes') {
      return format(dataAtual, 'MMMM yyyy', { locale: ptBR });
    } else {
      return format(dataAtual, 'yyyy', { locale: ptBR });
    }
  };

  const datasDaSemana = Array.from({ length: 7 }, (_, i) => {
    const inicioSemana = startOfWeek(dataAtual, { weekStartsOn: 1 });
    const data = addDays(inicioSemana, i);
    return {
      diaIndex: i,
      label: format(data, 'EEEE - dd/MM', { locale: ptBR }),
      data,
    };
  });

  const [isMenuOpen, setIsMenuOpen] = useState(true);

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  return (
    <>
      <main className="flex">
        {/* Menu lateral */}
        {isMenuOpen && (
          <div
            className="fixed flex flex-col justify-between gap-4 h-screen w-[300px] bg-cover bg-center"
            style={{ backgroundImage: "url('/menu.png')" }}
          >
            {/* Menu */}
            <div
              className="fixed flex flex-col justify-between gap-4 h-screen w-[300px] bg-cover bg-center"
              style={{
                backgroundImage: "url('/menu.png')",
              }}
            >
              <div className="flex flex-col gap-3">
                {/* Nome e Logo */}
                <div className="pt-3 flex justify-center">
                  <h1 className="text-4xl text-white relative font-bold after:content-[''] after:block after:w-[68px] after:h-[2px] after:bg-white after:ml-auto">
                    OrgaNotes
                  </h1>
                  <img src="/logo.png" alt="Logo" className="mt-2 h-8" />
                </div>
                <div className="w-full h-[1px] bg-white"></div>
                {/* Categorias */}
                <div className="px-3 mx-3 text-white bg-[#434561] flex justify-center gap-4 rounded-2xl">
                  <Link to={'/Estudos'}>
                    <div className="flex hover:text-[#CACCE5]  opacity-65 hover:underline transition duration-200 ease-in-out cursor-pointer px-2 py-2">
                      <h1>Estudos</h1>
                    </div>
                  </Link>

                  <Link to={'/Calendar'}>
                    <div className="flex  hover:text-[#CACCE5] hover:underline transition duration-200 ease-in-out cursor-pointer bg-[#3B3D58] px-2 py-2 rounded-xl">
                      <h1>Calendário</h1>
                    </div>
                  </Link>

                  <Link to={'/Notes'}>
                    <div className="flex hover:text-[#CACCE5] hover:underline  opacity-65 transition duration-200 ease-in-out cursor-pointer px-2 py-2">
                      <h1>Notas</h1>
                    </div>
                  </Link>
                </div>
                <div className="w-full h-[1px] bg-white"></div>
                {/* Barra de Pesquisa */}
                <div className="px-3 py-2 mx-3 text-white bg-[#434561] flex gap-4 rounded-2xl opacity-65 items-center">
                  <Search />
                  <input
                    type="text"
                    placeholder="Pesquisar..."
                    className="bg-transparent outline-none placeholder-white text-white w-full"
                  />
                </div>
                <div className="w-full h-[1px] bg-white"></div>
                {/* Calendario */}
                <div className="mx-3 text-white">
                  <button
                    onClick={toggle}
                    className="px-2 flex items-center gap-2 focus:outline-none"
                  >
                    <ChevronRight
                      className={`transition-transform duration-300 ${
                        isOpen ? 'rotate-90' : ''
                      }`}
                    />
                    <CalendarDays />
                    <h1 className="text-2xl">Calendário</h1>
                  </button>

                  <div
                    className={`transition-all duration-500 ease-in-out overflow-y-auto rounded-2xl ${
                      isOpen ? 'opacity-100 mt-2' : 'opacity-0'
                    }`}
                    style={{
                      maxHeight: isOpen ? '240px' : '0px', // ← Altura original restaurada
                      background:
                        'linear-gradient(180deg, rgba(71,72,120,0.9), rgba(122,123,194,0.7))',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      transition:
                        'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out',
                    }}
                  >
                    <div className="py-4 px-4">
                      {datasDaSemana.map(({ diaIndex, label }) => {
                        const eventosDoDia = eventos
                          .filter((e) => e.dia === diaIndex)
                          .sort((a, b) => {
                            const horaA = parseInt(a.hora.split(':')[0], 10);
                            const horaB = parseInt(b.hora.split(':')[0], 10);
                            return horaA - horaB;
                          });

                        return (
                          <div key={diaIndex} className="mb-4">
                            <h2 className="text-sm font-semibold text-white mb-1">
                              {label}
                            </h2>

                            {eventosDoDia.length > 0 ? (
                              <ul className="ml-2 text-gray-300 text-sm list-disc">
                                {eventosDoDia.map((evento, idx) => (
                                  <li key={idx}>
                                    <span className="font-medium">
                                      {evento.hora}
                                    </span>{' '}
                                    - {evento.titulo}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-500 text-xs ml-2">
                                Sem tarefas
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rodapé - Menu */}
              <div className="flex flex-col gap-2 px-5">
                <Link to="/" className="flex items-center gap-2 group">
                  <div className="bg-[#979ACB] rounded-full">
                    <MessageCircleQuestion className="text-white w-5 h-5" />
                  </div>
                  <span className="text-white transition-all duration-300 group-hover:underline group-hover:text-[#CACCE5]">
                    Suporte
                  </span>
                </Link>

                <Link to="/" className="flex items-center gap-2 group">
                  <div className="bg-[#979ACB] rounded-xl">
                    <SquareArrowRight className="text-white w-5 h-5" />
                  </div>
                  <span className="text-white transition-all duration-300 group-hover:underline group-hover:text-[#CACCE5]">
                    Sair
                  </span>
                </Link>

                <div className="w-full h-[1px] bg-white"></div>

                <div className="flex items-center gap-2 pb-4">
                  <Settings className="text-[#979ACB]" />
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="flex items-center gap-2 text-white hover:text-[#CACCE5] transition duration-300"
                  >
                    <span className="leading-none">Modo Noturno</span>
                    <div
                      className={`w-10 h-5 rounded-full relative transition-colors duration-300 flex items-center ${
                        darkMode ? 'bg-blue-500' : 'bg-[#979ACB]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform duration-300 ${
                          darkMode ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Calendário */}
        <div
          className={`flex flex-col gap-2 w-full transition-all duration-300 ${
            isMenuOpen ? 'ml-[300px]' : 'ml-0'
          } ${darkMode ? 'bg-[#1f1f2e] text-white' : 'bg-white text-gray-800'}`}
        >
          <div className="flex justify-between">
            <div className="flex px-6 py-4 gap-4 items-center">
              <button onClick={toggleMenu}>
                <Menu className="w-5 h-5" />
              </button>

              {/* Texto da data */}
              <span
                className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-700'}`}
              >
                {getFormattedDate()}
              </span>

              {/* Botão de seleção */}
              <select
                value={view}
                onChange={(e) =>
                  setView(e.target.value as 'semana' | 'mes' | 'ano')
                }
                className="border border-blue-600 text-blue-600 rounded px-2 py-1 text-sm"
              >
                <option value="semana">Semana</option>
                <option value="mes">Mês</option>
                <option value="ano">Ano</option>
              </select>
            </div>

            <div className="flex gap-3 items-center px-4">
              {/* Ícone de busca como botão */}
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="bg-[#F5F5F5] text-[#6A778B] p-2 rounded-2xl transition-all duration-300 hover:bg-[#e0e0e0] hover:shadow-md cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Barra de pesquisa com animação */}
              <AnimatePresence>
                {open && (
                  <motion.input
                    key="search"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '200px', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    type="text"
                    placeholder="Pesquisar..."
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none"
                  />
                )}
              </AnimatePresence>

              {/* Botão para abrir formulário */}
              <button
                onClick={() => setMostrarFormulario(true)}
                className="flex items-center gap-3 bg-[#434561] py-2 px-3 rounded-lg transition-all duration-300 hover:bg-[#5a5c7a] hover:shadow-md cursor-pointer"
              >
                <span className="text-white">Adicionar Evento</span>
                <Plus className="bg-white text-[#434561] rounded-full w-5 h-5 p-1" />
              </button>

              {/* Modal com formulário */}
              {mostrarFormulario && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div
                    className={`p-6 rounded shadow-lg w-80 ${
                      darkMode
                        ? 'bg-[#1f2130] text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    <h2 className="text-lg font-semibold mb-4">
                      Adicionar Evento
                    </h2>

                    <div className="flex flex-col gap-3 text-sm">
                      <div className="flex flex-col">
                        <label htmlFor="titulo">Título</label>
                        <input
                          id="titulo"
                          type="text"
                          value={tituloEvento}
                          onChange={(e) => setTituloEvento(e.target.value)}
                          className={`p-1 rounded border ${
                            darkMode
                              ? 'bg-[#2f3146] text-white border-[#555774]'
                              : 'bg-white text-black border-[#DADCE0]'
                          }`}
                          required
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="dia">Dia da Semana</label>
                        <select
                          id="dia"
                          value={diaEvento}
                          onChange={(e) => setDiaEvento(e.target.value)}
                          className={`p-1 rounded border ${
                            darkMode
                              ? 'bg-[#2f3146] text-white border-[#555774]'
                              : 'bg-white text-black border-[#DADCE0]'
                          }`}
                        >
                          <option value="0">Segunda</option>
                          <option value="1">Terça</option>
                          <option value="2">Quarta</option>
                          <option value="3">Quinta</option>
                          <option value="4">Sexta</option>
                          <option value="5">Sábado</option>
                          <option value="6">Domingo</option>
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="hora">Hora</label>
                        <input
                          id="hora"
                          type="time"
                          value={horaEvento}
                          onChange={(e) => setHoraEvento(e.target.value)}
                          className={`p-1 rounded border ${
                            darkMode
                              ? 'bg-[#2f3146] text-white border-[#555774]'
                              : 'bg-white text-black border-[#DADCE0]'
                          }`}
                          min="05:00"
                          max="23:00"
                          required
                        />
                      </div>

                      <div className="flex justify-between mt-3">
                        <button
                          onClick={() => setMostrarFormulario(false)}
                          className="text-red-500 hover:underline"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleSalvarEvento}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          Salvar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col w-full h-full">
            {/* Cabeçalho com emojis ao lado dos dias */}
            <div
              className={`grid grid-cols-8 text-center text-sm font-medium border-b ${
                darkMode
                  ? 'bg-[#2a2b3d] text-white border-gray-700'
                  : 'bg-white text-gray-800 border-gray-300'
              }`}
            >
              <div className="p-1"></div>
              {days.map((day, index) => (
                <div key={index} className="px-2 py-1">
                  <div className="flex items-center justify-center gap-1 text-xs">
                    <span>{day.emoji}</span>
                    <span>{day.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Corpo do calendário */}
            <div className="grid grid-cols-8 flex-1 text-xs">
              {hours.map((hour, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {/* Label da hora */}
                  <div
                    className={`text-center p-1 border ${
                      darkMode
                        ? 'bg-[#2f3148] text-white border-gray-700'
                        : 'bg-white text-black border-gray-300'
                    }`}
                  >
                    {hour}
                  </div>

                  {/* Células do calendário */}
                  {days.map((_, colIndex) => {
                    const eventosCelula = eventos.filter(
                      (e) => e.dia === colIndex && e.hora === hour,
                    );

                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`relative border h-12 px-1 py-0.5 overflow-hidden ${
                          darkMode
                            ? colIndex === 5 || colIndex === 6
                              ? 'bg-[#2e2e3f] border-gray-700'
                              : 'bg-[#252638] border-gray-700'
                            : colIndex === 5 || colIndex === 6
                              ? 'bg-gray-100 border-gray-200'
                              : 'bg-white border-gray-200'
                        }`}
                      >
                        {eventosCelula.map((evento, idx) => (
                          <div
                            key={idx}
                            className={`mb-1 px-2 py-1 rounded-md text-[11px] font-medium shadow-sm ${
                              darkMode ? 'text-white' : 'text-gray-800'
                            } ${coresDias[colIndex]} ${
                              termoBusca &&
                              evento.titulo
                                .toLowerCase()
                                .includes(termoBusca.toLowerCase())
                                ? 'ring-2 ring-green-500 scale-[1.02]'
                                : ''
                            }`}
                          >
                            <div className="text-[10px] font-semibold">
                              {evento.hora}
                            </div>
                            <div>{evento.titulo}</div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Calendar;
