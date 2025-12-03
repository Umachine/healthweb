'use client';

import { useState } from 'react';
import Header from '@/components/Navigation/Header';

interface ExerciseItem {
  id: string;
  name: string;
  defaultDuration: number; // 분 단위
  recordedTime: number; // 초 단위
}

export default function PlannerPage() {
  const [exercises, setExercises] = useState<ExerciseItem[]>([
    { id: '1', name: '아침 스트레칭', defaultDuration: 10, recordedTime: 0 },
    { id: '2', name: '운동 전 워밍업', defaultDuration: 15, recordedTime: 0 },
    { id: '3', name: '운동 후 쿨다운', defaultDuration: 20, recordedTime: 0 },
  ]);

  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExerciseClick = (exerciseId: string) => {
    if (activeExercise === exerciseId) {
      // 이미 활성화된 항목을 클릭하면 모달/상세보기
      return;
    }
    const exercise = exercises.find((e) => e.id === exerciseId);
    if (exercise) {
      setElapsedTime(exercise.recordedTime);
    }
    setActiveExercise(exerciseId);
  };

  const handleStart = (exerciseId: string) => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    const exercise = exercises.find((e) => e.id === exerciseId);
    if (!exercise) return;

    setElapsedTime(exercise.recordedTime);

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    setTimerInterval(interval);
  };

  const handleStop = (exerciseId: string) => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exerciseId
          ? { ...ex, recordedTime: elapsedTime }
          : ex
      )
    );

    setElapsedTime(0);
    setTimerInterval(null);
  };

  const handleClose = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setActiveExercise(null);
    setElapsedTime(0);
  };

  return (
    <>
      <Header title="플래너" />
      <main className="px-4 py-6">
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-2 text-gray-900">오늘의 운동 계획</h2>
            <p className="text-sm text-gray-600 mb-4">
              오늘 수행할 스트레칭 루틴을 확인하고 시간을 기록하세요.
            </p>
            <div className="space-y-2">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  onClick={() => handleExerciseClick(exercise.id)}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm text-gray-900">{exercise.name}</span>
                  <span className="text-xs text-gray-600">
                    {exercise.recordedTime > 0
                      ? `기록: ${formatTime(exercise.recordedTime)}`
                      : `${exercise.defaultDuration}분`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-2 text-gray-900">주간 목표</h2>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700">이번 주 진행률</span>
                <span className="font-semibold text-gray-900">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* 시간 기록 모달 */}
        {activeExercise && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {exercises.find((e) => e.id === activeExercise)?.name}
                </h3>
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {formatTime(elapsedTime)}
                </div>
                <p className="text-sm text-gray-600">기록된 시간</p>
              </div>

              <div className="flex gap-3">
                {!timerInterval ? (
                  <button
                    onClick={() => handleStart(activeExercise)}
                    className="flex-1 bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Start
                  </button>
                ) : (
                  <button
                    onClick={() => handleStop(activeExercise)}
                    className="flex-1 bg-red-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    Stop
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}