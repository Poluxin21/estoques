"use client";

import { useState } from 'react';
import Link from 'next/link';
import { User } from '@/lib/types';
import Image from 'next/image';

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  
  const notifications = [
    { id: 1, text: 'Estoque baixo para Produto A', time: 'Há 10 minutos', read: false },
    { id: 2, text: 'Nova entrada registrada', time: 'Há 30 minutos', read: false },
    { id: 3, text: 'Novo fornecedor cadastrado', time: 'Há 2 horas', read: true },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center md:hidden">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg 
              className="h-6 w-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 justify-center md:justify-start">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Buscar..."
               className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-md transition duration-200"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg 
                className="h-5 w-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                if (isProfileOpen) setIsProfileOpen(false);
              }}
              className="relative p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {notifications.some(n => !n.read) && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700">Notificações</h3>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <ul>
                      {notifications.map((notification) => (
                        <li 
                          key={notification.id} 
                          className={`px-4 py-2 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                          <p className="text-sm text-gray-800">{notification.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-4 py-2 text-sm text-gray-500">Nenhuma notificação</p>
                  )}
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <Link 
                    href="/dashboard/notificacoes" 
                    className="text-xs text-indigo-600 hover:text-indigo-800"
                  >
                    Ver todas
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                if (isNotificationsOpen) setIsNotificationsOpen(false);
              }}
              className="flex items-center text-sm focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
                {user.image ? (
                  <Image 
                    src={user.image} 
                    alt={user.name || ""} 
                    width={32} 
                    height={32} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-gray-600 font-medium">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </span>
                )}
              </div>
              <span className="ml-2 text-gray-700 hidden md:block">{user.name}</span>
              <svg 
                className="ml-1 h-5 w-5 text-gray-400 hidden md:block" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <Link 
                  href="/dashboard/perfil" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Perfil
                </Link>
                <Link 
                  href="/dashboard/configuracoes" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Configurações
                </Link>
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                  }}
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}