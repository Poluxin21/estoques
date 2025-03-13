"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Activity } from '@/lib/types';

export default function RecentActivity() {
  const [loading, setLoading] = useState<boolean>(true);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('https://api.atlas.estoques.dev/api/v1/recent-activity');
        if (!response.ok) {
          throw new Error('Falha ao carregar atividades');
        }
        const data = await response.json();
        
        setActivities(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar atividades recentes:', error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getActivityStyleByType = (type: Activity['type']) => {
    switch (type) {
      case 'entry':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          iconColor: 'text-green-500',
          icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
        };
      case 'out':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          iconColor: 'text-red-500',
          icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
        };
      case 'update':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-500',
          icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
        };
      case 'create':
        return {
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-800',
          iconColor: 'text-purple-500',
          icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          iconColor: 'text-gray-500',
          icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        };
    }
  };

  return (
    <div className="overflow-hidden">
      {loading ? (
        // Estado de carregamento
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-start animate-pulse">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
              <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Lista de atividades
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, activityIdx) => {
              const style = getActivityStyleByType(activity.type);
              
              return (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== activities.length - 1 ? (
                      <span
                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      ></span>
                    ) : null}
                    
                    <div className="relative flex items-start space-x-3">
                      <div>
                        <div className={`relative px-1 ${style.bgColor} ${style.textColor} h-10 w-10 rounded-full flex items-center justify-center`}>
                          <svg
                            className={`h-5 w-5 ${style.iconColor}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d={style.icon}
                            ></path>
                          </svg>
                        </div>
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <Link
                              href="#"
                              className="font-medium text-gray-900"
                            >
                              {activity.description}
                            </Link>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            Por {activity.userName} em {new Date(activity.timestamp).toLocaleDateString()} às {new Date(activity.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          
          {activities.length > 0 && (
            <div className="mt-4 text-center">
              <Link
                href="/dashboard/atividades"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                Ver todas as atividades
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
