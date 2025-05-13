import { Link } from 'react-router-dom';
import { useState } from 'react';
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
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { motion, AnimatePresence } from 'framer-motion';

function Calendar() {
  const [isOpen, setIsOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  const [darkMode, setDarkMode] = useState(false);

  const [view, setView] = useState<'semana' | 'mes' | 'ano'>('semana');

  const hours = Array.from(
    { length: 12 },
    (_, i) => `${i.toString().padStart(2, '0')}:00`,
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
  return (
    <>
      <main className="flex">
        {/* Menu */}
        <div
          className="flex flex-col justify-between gap-4 h-screen w-[300px] bg-cover bg-center"
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
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                } bg-[#2d2f45] rounded-xl px-4`}
              >
                <div className="py-4">
                  {/* Conteúdo adicional */}
                  <p>Conteúdo adicional do calendário.</p>
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

        {/* Calendário */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between">
            <div className="flex px-6 py-4 gap-4 items-center">
              <Menu className="w-5 h-5" />

              {/* Texto da data */}
              <span className="text-2xl text-gray-700">
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
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none"
                  />
                )}
              </AnimatePresence>

              <button
                onClick={() => console.log('Adicionar Evento clicado')}
                className="flex items-center gap-3 bg-[#434561] py-2 px-3 rounded-lg transition-all duration-300 hover:bg-[#5a5c7a] hover:shadow-md cursor-pointer"
              >
                <span className="text-white">Adicionar Evento</span>
                <Plus className="bg-white text-[#434561] rounded-full w-5 h-5 p-1" />
              </button>
            </div>
          </div>

          <div className="flex flex-col w-full h-full">
            {/* Cabeçalho com emojis ao lado dos dias */}
            <div className="grid grid-cols-8 bg-white text-gray-800 text-center text-sm font-medium border-b border-gray-300">
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
                  <div className="bg-white text-black text-center p-1 border border-gray-300">
                    {hour}
                  </div>

                  {/* Células do calendário */}
                  {days.map((_, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`border border-gray-200 h-12 ${
                        colIndex === 5 || colIndex === 6
                          ? 'bg-gray-100'
                          : 'bg-white'
                      }`}
                    ></div>
                  ))}
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
