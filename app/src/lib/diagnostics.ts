// 실제 심리학 연구에서 사용되는 검증된 테스트들
// Based on: ECR-R, 5 Love Languages, RAS, Thomas-Kilmann, Gottman

export interface DiagnosticQuestion {
  id: string;
  text: string;
  category?: string; // 사랑의 언어, 갈등 스타일 등 하위 카테고리
  reverse?: boolean; // 역채점 여부
  options: {
    value: number;
    text: string;
  }[];
}

export interface DiagnosticTest {
  id: string;
  title: string;
  description: string;
  emoji: string;
  source?: string; // 출처
  scoringType: 'sum' | 'category' | 'dimension'; // 채점 방식
  questions: DiagnosticQuestion[];
  results: DiagnosticTestResult[];
}

export interface DiagnosticTestResult {
  range: [number, number];
  type: string;
  title: string;
  emoji: string;
  description: string;
  tips: string[];
}

// 5점 리커트 척도 기본 옵션
const likert5Options = [
  { value: 1, text: '전혀 아니다' },
  { value: 2, text: '대체로 아니다' },
  { value: 3, text: '보통이다' },
  { value: 4, text: '대체로 그렇다' },
  { value: 5, text: '매우 그렇다' },
];

const likert5OptionsReverse = [
  { value: 5, text: '전혀 아니다' },
  { value: 4, text: '대체로 아니다' },
  { value: 3, text: '보통이다' },
  { value: 2, text: '대체로 그렇다' },
  { value: 1, text: '매우 그렇다' },
];

const likert7Options = [
  { value: 1, text: '전혀 아니다' },
  { value: 2, text: '아니다' },
  { value: 3, text: '약간 아니다' },
  { value: 4, text: '보통이다' },
  { value: 5, text: '약간 그렇다' },
  { value: 6, text: '그렇다' },
  { value: 7, text: '매우 그렇다' },
];

export const diagnosticTests: DiagnosticTest[] = [
  // ===== 1. ECR-R 애착 유형 테스트 (단축형 12문항) =====
  {
    id: 'attachment-ecr',
    title: '애착 유형 테스트 (ECR-R)',
    description: 'Experiences in Close Relationships-Revised 기반 성인 애착 유형 검사입니다. 불안 차원과 회피 차원을 측정합니다.',
    emoji: '🔗',
    source: 'Fraley, Waller & Brennan (2000)',
    scoringType: 'dimension',
    questions: [
      // 불안 차원 (Anxiety) - 6문항
      {
        id: 'ecr-a1',
        text: '연인이 나를 진정으로 사랑하는지 자주 걱정된다',
        category: 'anxiety',
        options: likert7Options,
      },
      {
        id: 'ecr-a2',
        text: '연인이 나를 떠날까 봐 두렵다',
        category: 'anxiety',
        options: likert7Options,
      },
      {
        id: 'ecr-a3',
        text: '연인에게 버림받을까 봐 걱정된다',
        category: 'anxiety',
        options: likert7Options,
      },
      {
        id: 'ecr-a4',
        text: '연인의 관심과 애정이 필요한 만큼 얻지 못할까 걱정된다',
        category: 'anxiety',
        options: likert7Options,
      },
      {
        id: 'ecr-a5',
        text: '연인이 연락이 없으면 나쁜 일이 생긴 건 아닌지 불안하다',
        category: 'anxiety',
        options: likert7Options,
      },
      {
        id: 'ecr-a6',
        text: '내가 연인에게 느끼는 만큼 상대도 나를 원하지 않을까 걱정된다',
        category: 'anxiety',
        options: likert7Options,
      },
      // 회피 차원 (Avoidance) - 6문항
      {
        id: 'ecr-v1',
        text: '연인에게 속마음을 털어놓는 것이 불편하다',
        category: 'avoidance',
        options: likert7Options,
      },
      {
        id: 'ecr-v2',
        text: '연인에게 너무 가까워지는 것이 불편하다',
        category: 'avoidance',
        options: likert7Options,
      },
      {
        id: 'ecr-v3',
        text: '연인에게 의지하는 것이 어렵다',
        category: 'avoidance',
        options: likert7Options,
      },
      {
        id: 'ecr-v4',
        text: '연인이 너무 가까워지려 하면 불편해진다',
        category: 'avoidance',
        options: likert7Options,
      },
      {
        id: 'ecr-v5',
        text: '감정적으로 가까워지는 것보다 독립적인 것이 편하다',
        category: 'avoidance',
        options: likert7Options,
      },
      {
        id: 'ecr-v6',
        text: '나의 깊은 생각과 감정을 연인과 나누는 것이 어렵다',
        category: 'avoidance',
        options: likert7Options,
      },
    ],
    results: [
      {
        range: [0, 0], // 불안↓ 회피↓
        type: 'secure',
        title: '안정형 (Secure)',
        emoji: '💚',
        description: '친밀감과 독립성 사이에서 편안한 균형을 유지합니다. 연인을 신뢰하고, 자신도 사랑받을 자격이 있다고 느낍니다. 갈등 상황에서도 건설적으로 소통할 수 있습니다.',
        tips: [
          '현재의 건강한 관계 패턴을 유지하세요',
          '파트너의 애착 스타일을 이해하고 맞춰주는 연습을 하세요',
          '관계에서 솔직하고 개방적인 소통을 계속하세요',
          '파트너가 불안해할 때 안심시켜주는 역할을 해보세요',
        ],
      },
      {
        range: [1, 1], // 불안↑ 회피↓
        type: 'anxious',
        title: '불안형 (Anxious-Preoccupied)',
        emoji: '💛',
        description: '친밀감을 갈망하지만 버림받을까 두려워합니다. 연인의 작은 변화에도 민감하게 반응하고, 확인과 안심이 자주 필요합니다. 관계에 대한 생각이 많습니다.',
        tips: [
          '불안할 때 바로 연락하기보다 5분 기다려보세요',
          '연인의 행동을 부정적으로 해석하기 전에 직접 물어보세요',
          '자기 가치감을 연인 외의 것에서도 찾아보세요',
          '"레몬 프로토콜"로 상대의 상태를 먼저 확인하세요',
          '불안이 올라올 때 심호흡하고 현재에 집중하세요',
        ],
      },
      {
        range: [2, 2], // 불안↓ 회피↑
        type: 'avoidant',
        title: '회피형 (Dismissive-Avoidant)',
        emoji: '💙',
        description: '독립성과 자기 충족을 중시하며, 너무 가까워지는 것을 불편해합니다. 감정 표현이 어렵고, 친밀감보다 개인 공간을 선호합니다.',
        tips: [
          '하루에 한 번 작은 감정이라도 표현하는 연습을 하세요',
          '거리를 둘 때 상대에게 돌아올 시간을 알려주세요',
          '파트너의 친밀감 욕구를 부담이 아닌 사랑으로 받아들이세요',
          '"라임 프로토콜"로 시간이 필요할 때 명확히 소통하세요',
          '가까워지는 것이 독립성을 잃는 것이 아님을 기억하세요',
        ],
      },
      {
        range: [3, 3], // 불안↑ 회피↑
        type: 'fearful',
        title: '혼란형 (Fearful-Avoidant)',
        emoji: '💜',
        description: '친밀감을 원하면서도 두려워하는 양가감정이 있습니다. 가까워지면 밀어내고, 멀어지면 끌어당기는 패턴이 반복될 수 있습니다.',
        tips: [
          '자신의 밀당 패턴을 인식하는 것이 첫 번째 단계입니다',
          '안전한 관계에서 점진적으로 신뢰를 쌓아보세요',
          '과거 상처가 현재 관계에 영향을 주고 있음을 인식하세요',
          '전문 상담을 통해 애착 패턴을 탐색해보는 것을 권합니다',
          '작은 친밀감부터 시작해 점진적으로 확장하세요',
        ],
      },
    ],
  },

  // ===== 2. 5가지 사랑의 언어 테스트 (15문항) =====
  {
    id: 'love-language',
    title: '5가지 사랑의 언어 테스트',
    description: 'Gary Chapman의 이론 기반으로 당신이 사랑을 느끼고 표현하는 주요 방식을 알아봅니다.',
    emoji: '💝',
    source: 'Gary Chapman - The 5 Love Languages',
    scoringType: 'category',
    questions: [
      // 인정하는 말 (Words of Affirmation) - 3문항
      {
        id: 'll-w1',
        text: '연인이 "사랑해", "고마워", "대단해" 같은 말을 해주면 사랑받는 느낌이 든다',
        category: 'words',
        options: likert5Options,
      },
      {
        id: 'll-w2',
        text: '칭찬이나 격려의 말을 들으면 하루가 행복해진다',
        category: 'words',
        options: likert5Options,
      },
      {
        id: 'll-w3',
        text: '연인이 나의 노력을 말로 인정해주는 것이 중요하다',
        category: 'words',
        options: likert5Options,
      },
      // 함께하는 시간 (Quality Time) - 3문항
      {
        id: 'll-t1',
        text: '연인과 함께 시간을 보내는 것이 무엇보다 중요하다',
        category: 'time',
        options: likert5Options,
      },
      {
        id: 'll-t2',
        text: '연인이 나에게 온전히 집중해주면 사랑받는 느낌이 든다',
        category: 'time',
        options: likert5Options,
      },
      {
        id: 'll-t3',
        text: '함께 있을 때 핸드폰보다 나에게 관심을 가져주길 바란다',
        category: 'time',
        options: likert5Options,
      },
      // 선물 (Receiving Gifts) - 3문항
      {
        id: 'll-g1',
        text: '연인이 선물을 주면 마음을 담았다고 느껴져서 기쁘다',
        category: 'gifts',
        options: likert5Options,
      },
      {
        id: 'll-g2',
        text: '특별한 날에 선물이 없으면 서운하다',
        category: 'gifts',
        options: likert5Options,
      },
      {
        id: 'll-g3',
        text: '작은 선물이라도 나를 생각했다는 것에 감동받는다',
        category: 'gifts',
        options: likert5Options,
      },
      // 봉사 (Acts of Service) - 3문항
      {
        id: 'll-s1',
        text: '연인이 나를 위해 무언가 해주면(요리, 청소, 심부름 등) 사랑을 느낀다',
        category: 'service',
        options: likert5Options,
      },
      {
        id: 'll-s2',
        text: '행동으로 도움을 주는 것이 말보다 더 와닿는다',
        category: 'service',
        options: likert5Options,
      },
      {
        id: 'll-s3',
        text: '내가 바쁠 때 연인이 도와주면 정말 고맙다',
        category: 'service',
        options: likert5Options,
      },
      // 스킨십 (Physical Touch) - 3문항
      {
        id: 'll-p1',
        text: '손잡기, 포옹, 스킨십이 나에게 매우 중요하다',
        category: 'touch',
        options: likert5Options,
      },
      {
        id: 'll-p2',
        text: '스킨십 없이는 사랑받는다고 느끼기 어렵다',
        category: 'touch',
        options: likert5Options,
      },
      {
        id: 'll-p3',
        text: '연인의 가벼운 터치만으로도 기분이 좋아진다',
        category: 'touch',
        options: likert5Options,
      },
    ],
    results: [
      {
        range: [0, 0],
        type: 'words',
        title: '인정하는 말',
        emoji: '💬',
        description: '칭찬, 격려, 감사, 애정 표현의 말로 사랑을 느낍니다. "사랑해", "고마워", "잘했어" 같은 말이 당신에게 큰 의미가 있습니다.',
        tips: [
          '파트너에게 말로 표현해달라고 직접 요청하세요',
          '문자나 메모로도 애정 표현을 주고받으세요',
          '당신도 파트너에게 구체적인 칭찬을 해주세요',
          '비난이나 모욕적인 말에 특히 상처받을 수 있음을 알려주세요',
        ],
      },
      {
        range: [1, 1],
        type: 'time',
        title: '함께하는 시간',
        emoji: '⏰',
        description: '온전한 관심과 함께하는 시간으로 사랑을 느낍니다. 연인이 나에게 집중해주고 함께 활동하는 것이 중요합니다.',
        tips: [
          '정기적인 데이트 시간을 정해두세요',
          '함께 있을 때는 핸드폰을 내려놓고 눈을 맞추세요',
          '함께하는 새로운 활동을 시도해보세요',
          '장거리라면 영상통화 시간을 꼭 확보하세요',
        ],
      },
      {
        range: [2, 2],
        type: 'gifts',
        title: '선물',
        emoji: '🎁',
        description: '마음을 담은 선물로 사랑을 느낍니다. 선물의 가격보다 나를 생각하고 준비했다는 것 자체가 감동입니다.',
        tips: [
          '파트너가 언급한 것들을 메모해두세요',
          '특별한 날이 아니어도 작은 선물을 건네보세요',
          '직접 만든 것, 편지도 좋은 선물이에요',
          '선물을 받으면 꼭 기뻐하는 반응을 보여주세요',
        ],
      },
      {
        range: [3, 3],
        type: 'service',
        title: '봉사',
        emoji: '🤝',
        description: '나를 위한 행동과 도움으로 사랑을 느낍니다. 말보다 행동으로 보여주는 것이 더 와닿습니다.',
        tips: [
          '파트너가 해주는 행동을 사랑 표현으로 인식하세요',
          '"뭐 도와줄까?"라고 먼저 물어보세요',
          '작은 일이라도 해줬을 때 감사를 표현하세요',
          '파트너에게 구체적으로 원하는 도움을 알려주세요',
        ],
      },
      {
        range: [4, 4],
        type: 'touch',
        title: '스킨십',
        emoji: '🤗',
        description: '신체적 접촉으로 사랑을 느낍니다. 손잡기, 포옹, 가벼운 터치가 당신에게 큰 의미가 있습니다.',
        tips: [
          '일상에서 자연스러운 스킨십을 늘리세요',
          '장거리라면 만났을 때 충분한 스킨십 시간을 가지세요',
          '파트너의 스킨십 선호도와 경계도 존중하세요',
          '소파에서 가까이 앉기 같은 작은 것부터 시작하세요',
        ],
      },
    ],
  },

  // ===== 3. 관계 만족도 척도 RAS (7문항) =====
  {
    id: 'relationship-satisfaction',
    title: '관계 만족도 테스트 (RAS)',
    description: 'Relationship Assessment Scale - 현재 관계에 대한 전반적인 만족도를 측정하는 검증된 척도입니다.',
    emoji: '📊',
    source: 'Hendrick (1988)',
    scoringType: 'sum',
    questions: [
      {
        id: 'ras-1',
        text: '연인이 나의 욕구를 얼마나 잘 충족시켜주나요?',
        options: [
          { value: 1, text: '거의 못함' },
          { value: 2, text: '약간 못함' },
          { value: 3, text: '보통' },
          { value: 4, text: '대체로 잘함' },
          { value: 5, text: '매우 잘함' },
        ],
      },
      {
        id: 'ras-2',
        text: '전반적으로 현재 관계에 얼마나 만족하나요?',
        options: [
          { value: 1, text: '매우 불만족' },
          { value: 2, text: '불만족' },
          { value: 3, text: '보통' },
          { value: 4, text: '만족' },
          { value: 5, text: '매우 만족' },
        ],
      },
      {
        id: 'ras-3',
        text: '다른 사람들과 비교했을 때 나의 관계는 어떤가요?',
        options: [
          { value: 1, text: '훨씬 안좋음' },
          { value: 2, text: '약간 안좋음' },
          { value: 3, text: '비슷함' },
          { value: 4, text: '약간 좋음' },
          { value: 5, text: '훨씬 좋음' },
        ],
      },
      {
        id: 'ras-4',
        text: '관계를 시작하지 않았으면 좋겠다고 생각한 적이 얼마나 있나요?',
        reverse: true,
        options: [
          { value: 5, text: '전혀 없음' },
          { value: 4, text: '거의 없음' },
          { value: 3, text: '가끔' },
          { value: 2, text: '자주' },
          { value: 1, text: '매우 자주' },
        ],
      },
      {
        id: 'ras-5',
        text: '나의 관계가 처음 기대에 얼마나 부합하나요?',
        options: [
          { value: 1, text: '전혀 안함' },
          { value: 2, text: '약간' },
          { value: 3, text: '보통' },
          { value: 4, text: '대체로' },
          { value: 5, text: '완전히' },
        ],
      },
      {
        id: 'ras-6',
        text: '연인을 얼마나 사랑하나요?',
        options: [
          { value: 1, text: '별로' },
          { value: 2, text: '약간' },
          { value: 3, text: '보통' },
          { value: 4, text: '많이' },
          { value: 5, text: '정말 많이' },
        ],
      },
      {
        id: 'ras-7',
        text: '현재 관계에서 문제가 얼마나 있나요?',
        reverse: true,
        options: [
          { value: 5, text: '거의 없음' },
          { value: 4, text: '조금' },
          { value: 3, text: '보통' },
          { value: 2, text: '많음' },
          { value: 1, text: '매우 많음' },
        ],
      },
    ],
    results: [
      {
        range: [7, 15],
        type: 'low',
        title: '낮은 만족도',
        emoji: '😔',
        description: '현재 관계에 상당한 어려움을 겪고 있습니다. 근본적인 문제가 있을 수 있으며, 진지한 대화나 전문적 도움이 필요할 수 있습니다.',
        tips: [
          '파트너와 솔직하게 현재 관계에 대해 이야기해보세요',
          '구체적으로 무엇이 불만족스러운지 목록을 만들어보세요',
          '커플 상담을 고려해보세요',
          '관계를 계속할지 진지하게 생각해볼 시간이 필요합니다',
          '자신의 감정과 욕구를 먼저 정리해보세요',
        ],
      },
      {
        range: [16, 22],
        type: 'moderate-low',
        title: '다소 낮은 만족도',
        emoji: '😐',
        description: '관계에 개선이 필요한 부분들이 있습니다. 아직 회복 가능한 단계이며, 적극적인 노력으로 좋아질 수 있습니다.',
        tips: [
          '불만족스러운 부분을 파트너와 차분히 나눠보세요',
          '매주 "관계 점검" 시간을 가져보세요',
          '작은 긍정적 변화부터 시도해보세요',
          '상대방의 노력도 인정하고 감사를 표현하세요',
          '함께 새로운 활동을 시도해보세요',
        ],
      },
      {
        range: [23, 28],
        type: 'moderate-high',
        title: '보통-높은 만족도',
        emoji: '🙂',
        description: '전반적으로 건강한 관계를 유지하고 있습니다. 작은 개선점들을 다듬으면 더 좋은 관계가 될 수 있습니다.',
        tips: [
          '현재 잘 되고 있는 부분을 유지하세요',
          '작은 불만이 쌓이지 않도록 바로바로 소통하세요',
          '서로의 사랑의 언어를 알아보세요',
          '정기적인 데이트를 계획하세요',
          '감사 표현을 더 자주 해보세요',
        ],
      },
      {
        range: [29, 35],
        type: 'high',
        title: '높은 만족도',
        emoji: '😊',
        description: '매우 만족스러운 관계입니다. 서로를 잘 이해하고 지지하고 있으며, 건강한 관계 패턴을 가지고 있습니다.',
        tips: [
          '현재의 좋은 관계를 유지하세요',
          '관계에 안주하지 말고 계속 노력하세요',
          '새로운 경험을 함께 해보세요',
          '주변에 좋은 관계의 모델이 되어주세요',
          '감사한 마음을 계속 표현하세요',
        ],
      },
    ],
  },

  // ===== 4. Thomas-Kilmann 갈등 스타일 테스트 (10문항) =====
  {
    id: 'conflict-style',
    title: '갈등 해결 스타일 테스트',
    description: 'Thomas-Kilmann Conflict Mode Instrument 기반으로 갈등 상황에서의 대처 방식을 알아봅니다.',
    emoji: '⚡',
    source: 'Thomas & Kilmann (1974)',
    scoringType: 'category',
    questions: [
      // 경쟁형 (Competing)
      {
        id: 'tki-c1',
        text: '갈등 상황에서 내 의견이 옳다면 끝까지 주장하는 편이다',
        category: 'competing',
        options: likert5Options,
      },
      {
        id: 'tki-c2',
        text: '논쟁에서 이기는 것이 중요하다',
        category: 'competing',
        options: likert5Options,
      },
      // 회피형 (Avoiding)
      {
        id: 'tki-a1',
        text: '갈등이 생기면 대화를 피하거나 미루는 편이다',
        category: 'avoiding',
        options: likert5Options,
      },
      {
        id: 'tki-a2',
        text: '불편한 주제는 그냥 넘어가는 것이 낫다고 생각한다',
        category: 'avoiding',
        options: likert5Options,
      },
      // 협력형 (Collaborating)
      {
        id: 'tki-co1',
        text: '갈등 상황에서 서로 모두 만족할 수 있는 해결책을 찾으려 한다',
        category: 'collaborating',
        options: likert5Options,
      },
      {
        id: 'tki-co2',
        text: '문제 해결을 위해 상대방의 입장을 깊이 이해하려 노력한다',
        category: 'collaborating',
        options: likert5Options,
      },
      // 수용형 (Accommodating)
      {
        id: 'tki-ac1',
        text: '관계를 위해 내 의견을 양보하는 경우가 많다',
        category: 'accommodating',
        options: likert5Options,
      },
      {
        id: 'tki-ac2',
        text: '상대방을 기분 나쁘게 하느니 내가 참는 게 낫다',
        category: 'accommodating',
        options: likert5Options,
      },
      // 타협형 (Compromising)
      {
        id: 'tki-cp1',
        text: '서로 조금씩 양보해서 중간 지점을 찾는 것이 현실적이라고 생각한다',
        category: 'compromising',
        options: likert5Options,
      },
      {
        id: 'tki-cp2',
        text: '완벽한 해결책보다 빠른 합의가 더 중요할 때가 많다',
        category: 'compromising',
        options: likert5Options,
      },
    ],
    results: [
      {
        range: [0, 0],
        type: 'competing',
        title: '경쟁형',
        emoji: '🔥',
        description: '자신의 의견과 목표를 강하게 추구합니다. 확신이 있고 결단력이 있지만, 관계보다 승리를 우선시할 수 있습니다.',
        tips: [
          '상대방의 의견에도 일리가 있을 수 있음을 인정하세요',
          '"이기는 것"보다 "함께 해결하는 것"에 초점을 맞추세요',
          '대화를 부드럽게 시작하는 연습을 하세요',
          '상대방의 감정도 존중해주세요',
          '때로는 한 발 물러서는 것도 강함입니다',
        ],
      },
      {
        range: [1, 1],
        type: 'avoiding',
        title: '회피형',
        emoji: '🚪',
        description: '갈등 상황을 피하려는 경향이 있습니다. 평화를 중시하지만, 문제가 해결되지 않고 쌓일 수 있습니다.',
        tips: [
          '작은 문제부터 표현하는 연습을 시작하세요',
          '회피하면 문제가 더 커질 수 있음을 기억하세요',
          '"라임 프로토콜"로 시간을 벌되, 반드시 대화로 돌아오세요',
          '글로 먼저 정리한 후 대화해보세요',
          '안전하게 말할 수 있는 환경을 만들어달라고 요청하세요',
        ],
      },
      {
        range: [2, 2],
        type: 'collaborating',
        title: '협력형',
        emoji: '🤝',
        description: '서로의 욕구를 모두 충족시키는 해결책을 찾으려 합니다. 시간이 걸리지만 가장 이상적인 결과를 낼 수 있습니다.',
        tips: [
          '훌륭한 갈등 해결 방식입니다!',
          '시간이 오래 걸릴 수 있으니 인내심을 가지세요',
          '상대방도 협력할 준비가 됐는지 먼저 확인하세요',
          '작은 문제에는 타협이 더 효율적일 수 있어요',
          '상대방의 갈등 스타일도 이해해주세요',
        ],
      },
      {
        range: [3, 3],
        type: 'accommodating',
        title: '수용형',
        emoji: '🕊️',
        description: '관계의 조화를 위해 자신을 양보하는 편입니다. 배려심이 깊지만, 자신의 욕구가 무시될 수 있습니다.',
        tips: [
          '당신의 의견과 감정도 소중합니다',
          '중요한 문제에서는 양보하지 마세요',
          '억울함이 쌓이면 결국 폭발할 수 있어요',
          '"나도 ~하면 좋겠어"라고 말하는 연습을 하세요',
          '건강한 경계를 설정하는 것도 관계에 좋습니다',
        ],
      },
      {
        range: [4, 4],
        type: 'compromising',
        title: '타협형',
        emoji: '⚖️',
        description: '서로 조금씩 양보하여 중간 지점을 찾습니다. 실용적이고 효율적이지만, 완전한 만족은 어려울 수 있습니다.',
        tips: [
          '빠르고 공정한 해결 방식입니다',
          '때로는 깊은 협력이 더 나은 결과를 낼 수 있어요',
          '핵심 가치나 중요한 문제에서는 타협하지 마세요',
          '타협이 아닌 협력이 필요한 상황을 구분하세요',
          '상대방의 진짜 욕구가 무엇인지 파악해보세요',
        ],
      },
    ],
  },

  // ===== 5. Gottman 관계 건강도 테스트 (12문항) =====
  {
    id: 'gottman-health',
    title: '관계 건강도 테스트 (Gottman)',
    description: 'Gottman의 "관계의 4가지 독소" 이론 기반으로 관계의 위험 신호를 점검합니다.',
    emoji: '💊',
    source: 'John Gottman - The Four Horsemen',
    scoringType: 'category',
    questions: [
      // 비난 (Criticism) - 3문항
      {
        id: 'gh-cr1',
        text: '화가 나면 상대방의 성격이나 인격을 비난하게 된다 (예: "넌 항상 이기적이야")',
        category: 'criticism',
        options: likert5Options,
      },
      {
        id: 'gh-cr2',
        text: '불만을 말할 때 "넌 항상~", "넌 절대~" 같은 표현을 자주 사용한다',
        category: 'criticism',
        options: likert5Options,
      },
      {
        id: 'gh-cr3',
        text: '상대방의 잘못을 지적할 때 행동이 아닌 사람 자체를 탓하게 된다',
        category: 'criticism',
        options: likert5Options,
      },
      // 경멸 (Contempt) - 3문항
      {
        id: 'gh-co1',
        text: '연인을 무시하거나 비웃는 표정, 말투를 사용한 적이 있다',
        category: 'contempt',
        options: likert5Options,
      },
      {
        id: 'gh-co2',
        text: '연인에게 조롱, 빈정거림, 눈 굴리기 같은 행동을 한 적이 있다',
        category: 'contempt',
        options: likert5Options,
      },
      {
        id: 'gh-co3',
        text: '연인이 나보다 못하다거나 한심하다고 느낀 적이 있다',
        category: 'contempt',
        options: likert5Options,
      },
      // 방어 (Defensiveness) - 3문항
      {
        id: 'gh-de1',
        text: '연인이 불만을 말하면 변명하거나 역공격하게 된다',
        category: 'defensiveness',
        options: likert5Options,
      },
      {
        id: 'gh-de2',
        text: '"그건 네 잘못도 있잖아"라며 책임을 돌리는 편이다',
        category: 'defensiveness',
        options: likert5Options,
      },
      {
        id: 'gh-de3',
        text: '비판을 들으면 자동으로 방어적이 된다',
        category: 'defensiveness',
        options: likert5Options,
      },
      // 담쌓기/철수 (Stonewalling) - 3문항
      {
        id: 'gh-st1',
        text: '갈등 중 대화를 완전히 차단하고 침묵하는 경우가 있다',
        category: 'stonewalling',
        options: likert5Options,
      },
      {
        id: 'gh-st2',
        text: '감정이 격해지면 아예 자리를 피하거나 무시한다',
        category: 'stonewalling',
        options: likert5Options,
      },
      {
        id: 'gh-st3',
        text: '연인과 대화 중 마음의 문을 닫고 반응하지 않는 경우가 있다',
        category: 'stonewalling',
        options: likert5Options,
      },
    ],
    results: [
      {
        range: [12, 24],
        type: 'healthy',
        title: '건강한 관계',
        emoji: '💚',
        description: '4가지 독소가 거의 없는 건강한 소통 패턴을 가지고 있습니다. 현재의 좋은 관계 습관을 유지하세요.',
        tips: [
          '현재의 건강한 소통 방식을 계속 유지하세요',
          '갈등이 생겨도 존중을 잃지 않는 것이 핵심입니다',
          '가끔 관계를 점검하는 시간을 가지세요',
          '서로에 대한 감사를 자주 표현하세요',
        ],
      },
      {
        range: [25, 36],
        type: 'caution',
        title: '주의 필요',
        emoji: '💛',
        description: '일부 독소적 패턴이 나타나고 있습니다. 지금 인식하고 개선하면 관계가 더 좋아질 수 있습니다.',
        tips: [
          '어떤 독소가 주로 나타나는지 파악하세요',
          '비난 대신 "나" 메시지로 표현하는 연습을 하세요',
          '상대방을 존중하는 태도를 의식적으로 유지하세요',
          '감정이 격해지면 잠시 쉬는 시간을 가지세요',
          '긍정적인 상호작용을 늘려보세요',
        ],
      },
      {
        range: [37, 48],
        type: 'warning',
        title: '경고 단계',
        emoji: '🧡',
        description: '여러 독소적 패턴이 관계에 영향을 주고 있습니다. 적극적인 개선 노력이 필요합니다.',
        tips: [
          '4가지 독소에 대해 더 알아보고 인식하세요',
          '비난 → 불만 표현으로 바꾸는 연습을 하세요',
          '경멸의 해독제는 존중과 감사입니다',
          '방어 대신 책임을 일부라도 인정해보세요',
          '담쌓기 대신 "잠시 쉬고 다시 대화하자"고 말하세요',
          '커플 상담을 고려해보세요',
        ],
      },
      {
        range: [49, 60],
        type: 'danger',
        title: '위험 단계',
        emoji: '❤️‍🩹',
        description: '독소적 패턴이 심각한 수준입니다. Gottman 연구에 따르면 이런 패턴은 관계 실패를 예측합니다. 전문적 도움이 필요합니다.',
        tips: [
          '이 결과가 관계가 끝났다는 의미는 아닙니다',
          '변화하려는 의지가 있다면 회복 가능합니다',
          '커플 상담을 강력히 권장합니다',
          '개인 상담도 도움이 될 수 있습니다',
          'Gottman Method 기반 치료사를 찾아보세요',
          '서로 비난하지 말고 함께 문제를 해결하려는 자세가 중요합니다',
        ],
      },
    ],
  },
];

// ===== 유틸리티 함수들 =====

export function getTestById(id: string): DiagnosticTest | undefined {
  return diagnosticTests.find((t) => t.id === id);
}

export interface DiagnosticResult {
  type: string;
  title: string;
  emoji: string;
  description: string;
  tips: string[];
}

// 점수 기반 결과 (RAS 등 sum 방식)
export function getResultByScore(testId: string, score: number): DiagnosticResult | null {
  const test = getTestById(testId);
  if (!test || test.scoringType !== 'sum') return null;

  for (const result of test.results) {
    if (score >= result.range[0] && score <= result.range[1]) {
      return {
        type: result.type,
        title: result.title,
        emoji: result.emoji,
        description: result.description,
        tips: result.tips,
      };
    }
  }
  return null;
}

// 카테고리 기반 결과 (사랑의 언어, 갈등 스타일 등)
export function getResultByCategory(testId: string, scores: Record<string, number>): DiagnosticResult | null {
  const test = getTestById(testId);
  if (!test || test.scoringType !== 'category') return null;

  // 가장 높은 점수의 카테고리 찾기
  let maxCategory = '';
  let maxScore = 0;

  for (const [category, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      maxCategory = category;
    }
  }

  const result = test.results.find((r) => r.type === maxCategory);
  if (!result) return null;

  return {
    type: result.type,
    title: result.title,
    emoji: result.emoji,
    description: result.description,
    tips: result.tips,
  };
}

// ECR-R 애착 유형 결과 (dimension 방식)
export interface AttachmentResult extends DiagnosticResult {
  anxietyScore: number;
  avoidanceScore: number;
  anxietyLevel: 'low' | 'high';
  avoidanceLevel: 'low' | 'high';
}

export function getAttachmentResult(anxietyScore: number, avoidanceScore: number): AttachmentResult | null {
  const test = getTestById('attachment-ecr');
  if (!test) return null;

  // 중간값 기준 (7점 척도 * 6문항 = 최대 42, 중간 21)
  const anxietyLevel = anxietyScore > 24 ? 'high' : 'low';
  const avoidanceLevel = avoidanceScore > 24 ? 'high' : 'low';

  let resultIndex: number;
  if (anxietyLevel === 'low' && avoidanceLevel === 'low') {
    resultIndex = 0; // secure
  } else if (anxietyLevel === 'high' && avoidanceLevel === 'low') {
    resultIndex = 1; // anxious
  } else if (anxietyLevel === 'low' && avoidanceLevel === 'high') {
    resultIndex = 2; // avoidant
  } else {
    resultIndex = 3; // fearful
  }

  const result = test.results[resultIndex];
  return {
    type: result.type,
    title: result.title,
    emoji: result.emoji,
    description: result.description,
    tips: result.tips,
    anxietyScore,
    avoidanceScore,
    anxietyLevel,
    avoidanceLevel,
  };
}

// Gottman 결과 (4가지 독소 개별 분석 포함)
export interface GottmanResult extends DiagnosticResult {
  scores: {
    criticism: number;
    contempt: number;
    defensiveness: number;
    stonewalling: number;
  };
  totalScore: number;
  mainIssue: string;
}

export function getGottmanResult(scores: Record<string, number>): GottmanResult | null {
  const test = getTestById('gottman-health');
  if (!test) return null;

  const totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0);

  // 가장 높은 독소 찾기
  let mainIssue = 'criticism';
  let maxScore = 0;
  for (const [category, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      mainIssue = category;
    }
  }

  // 총점 기준 결과 찾기
  let result = test.results[0];
  for (const r of test.results) {
    if (totalScore >= r.range[0] && totalScore <= r.range[1]) {
      result = r;
      break;
    }
  }

  const issueNames: Record<string, string> = {
    criticism: '비난',
    contempt: '경멸',
    defensiveness: '방어',
    stonewalling: '담쌓기',
  };

  return {
    type: result.type,
    title: result.title,
    emoji: result.emoji,
    description: result.description,
    tips: result.tips,
    scores: {
      criticism: scores.criticism || 0,
      contempt: scores.contempt || 0,
      defensiveness: scores.defensiveness || 0,
      stonewalling: scores.stonewalling || 0,
    },
    totalScore,
    mainIssue: issueNames[mainIssue] || mainIssue,
  };
}

// 기존 호환성을 위한 함수 (deprecated but kept for backward compatibility)
export function getResultDescription(testId: string, score: number): DiagnosticResult | null {
  const test = getTestById(testId);
  if (!test) return null;

  // 기존 방식 지원
  for (const result of test.results) {
    if (score >= result.range[0] && score <= result.range[1]) {
      return {
        type: result.type,
        title: result.title,
        emoji: result.emoji,
        description: result.description,
        tips: result.tips,
      };
    }
  }

  return null;
}
