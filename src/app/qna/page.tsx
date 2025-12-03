import Header from '@/components/Navigation/Header';

export default function QnAPage() {
  return (
    <>
      <Header title="QnA & 매칭" />
      <main className="px-4 py-6">
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-2 text-gray-900">전문가 매칭</h2>
            <p className="text-sm text-gray-600 mb-4">
              나에게 맞는 전문 트레이너를 찾아보세요.
            </p>
            <button className="w-full bg-black text-white py-3 rounded-lg font-semibold">
              트레이너 찾기
            </button>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">자주 묻는 질문</h2>
            <div className="space-y-3">
              <div className="border-b border-gray-200 pb-3">
                <p className="font-semibold text-sm mb-1 text-gray-900">
                  스트레칭은 언제 하는 게 좋나요?
                </p>
                <p className="text-xs text-gray-600">
                  운동 전 워밍업과 운동 후 쿨다운으로 나누어 실시하는 것이 좋습니다.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <p className="font-semibold text-sm mb-1 text-gray-900">
                  하루에 몇 번 스트레칭을 해야 하나요?
                </p>
                <p className="text-xs text-gray-600">
                  하루 2-3회, 각 10-15분씩 실시하는 것을 권장합니다.
                </p>
              </div>
              <div className="pb-3">
                <p className="font-semibold text-sm mb-1 text-gray-900">
                  부상 후 언제부터 스트레칭을 시작할 수 있나요?
                </p>
                <p className="text-xs text-gray-600">
                  전문의와 상담 후 단계적으로 시작하는 것이 안전합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">나의 질문</h2>
            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold">
              + 새 질문하기
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

